import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/session";
import { logAdminAction } from "@/lib/audit";

// GET all confirmed matches using raw SQL to bypass stale Prisma client
export async function GET() {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const matches = await db.$queryRaw<any[]>`
      SELECT * FROM matches ORDER BY confirmed_at DESC
    `;

    // Enrich with lead data using existing Lead model (fully typed)
    const enriched = await Promise.all(
      matches.map(async (match: any) => {
        const seller = await db.lead.findUnique({ where: { id: match.seller_id } });
        const investor = await db.lead.findUnique({ where: { id: match.investor_id } });
        return {
          id: match.id,
          sellerId: match.seller_id,
          investorId: match.investor_id,
          notes: match.notes,
          confirmedAt: match.confirmed_at,
          seller,
          investor,
        };
      })
    );

    return NextResponse.json({ matches: enriched });
  } catch (error) {
    console.error("GET /api/admin/matches error:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

// POST — confirm an introduction using raw SQL insert
export async function POST(request: Request) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { sellerId, investorId, notes } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown_ip";

    if (!sellerId || !investorId) {
      return NextResponse.json({ error: "sellerId and investorId required" }, { status: 400 });
    }

    // Generate a cuid-like ID manually (timestamp + random)
    const matchId = `match_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const now = new Date().toISOString();

    await db.$executeRaw`
      INSERT INTO matches (id, seller_id, investor_id, notes, confirmed_at)
      VALUES (${matchId}, ${sellerId}, ${investorId}, ${notes || null}, ${now})
    `;

    // Auto-update both leads to "matched" using the typed Prisma client
    await db.lead.update({ where: { id: sellerId }, data: { status: "matched" } });
    await db.lead.update({ where: { id: investorId }, data: { status: "matched" } });

    await logAdminAction("MATCH_CONFIRMED", { sellerId, investorId, matchId }, ip);

    return NextResponse.json({ success: true, matchId });
  } catch (error) {
    console.error("POST /api/admin/matches error:", error);
    return NextResponse.json({ error: "Failed to confirm match" }, { status: 500 });
  }
}
