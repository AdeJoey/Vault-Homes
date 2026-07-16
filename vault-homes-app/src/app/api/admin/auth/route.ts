import { NextResponse } from "next/server";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAdminAction } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown_ip";
    
    // Apply Rate Limiting
    if (!checkRateLimit(ip)) {
      await logAdminAction("LOGIN_RATE_LIMITED", null, ip);
      return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
    }

    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      await logAdminAction("LOGIN_FAILED", null, ip);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const sessionToken = await encrypt({ isAdmin: true, time: Date.now() });

    // Set HTTP-only cookie
    (await cookies()).set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    await logAdminAction("LOGIN_SUCCESS", null, ip);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
