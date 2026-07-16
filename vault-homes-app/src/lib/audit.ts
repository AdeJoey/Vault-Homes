import { prisma as db } from "./db";

export async function logAdminAction(action: string, details?: any, ipAddress?: string) {
  try {
    await db.auditLog.create({
      data: {
        action,
        details: details ? JSON.stringify(details) : null,
        ipAddress: ipAddress || null,
      }
    });
  } catch (error) {
    console.error("Audit log failed to write:", error);
  }
}
