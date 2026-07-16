import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "fallback_secret_key";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function requireAdminAuth() {
  const { cookies } = await import("next/headers");
  const sessionCookie = (await cookies()).get("admin_session")?.value;
  if (!sessionCookie) return false;
  
  const parsed = await decrypt(sessionCookie);
  if (!parsed || !parsed.isAdmin) return false;
  
  return true;
}
