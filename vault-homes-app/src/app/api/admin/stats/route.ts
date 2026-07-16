import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";

import { requireAdminAuth } from "@/lib/session";

export async function GET() {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalSellers = await db.lead.count({ where: { leadType: "SELLER" } });
    const totalInvestors = await db.lead.count({ where: { leadType: "INVESTOR" } });
    const newLeads = await db.lead.count({ where: { status: "new" } });

    // Use raw SQL since Match model may not be in generated client yet
    const matchCountResult = await db.$queryRaw<[{ count: bigint }]>`SELECT COUNT(*) as count FROM matches`;
    const matchesFound = Number(matchCountResult[0]?.count ?? 0);

    const recentActivity = await db.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        leadType: true,
        status: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      stats: {
        totalSellers,
        totalInvestors,
        newLeads,
        matchesFound
      },
      recentActivity
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
