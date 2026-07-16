import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/session";
import { logAdminAction } from "@/lib/audit";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown_ip";

    const lead = await db.lead.update({
      where: { id },
      data: { status },
    });

    await logAdminAction("STATUS_UPDATE", { leadId: id, newStatus: status }, ip);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
