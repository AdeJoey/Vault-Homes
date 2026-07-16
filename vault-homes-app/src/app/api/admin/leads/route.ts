import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";

import { requireAdminAuth } from "@/lib/session";

export async function GET(request: Request) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    const leads = await db.lead.findMany({
      where: type ? { leadType: type } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
