import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const sourceLead = await db.lead.findUnique({ where: { id } });
    if (!sourceLead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    if (sourceLead.leadType?.toUpperCase() === "SELLER") {
      const sellerPrice = parseFloat(sourceLead.priceExpectation?.replace(/,/g, '') || "0");

      const potentialInvestors = await db.lead.findMany({
        where: {
          leadType: "INVESTOR",
          status: { in: ["new", "reviewing", "approved"] },
        }
      });

      const matched = potentialInvestors.filter(inv => {
        const invBudgetMax = inv.budgetMax || 0;
        const budgetMatches = invBudgetMax === 0 || invBudgetMax >= sellerPrice;

        const sellerLoc = (sourceLead.propertyLocation || "").toLowerCase();
        const invLoc = (inv.preferredArea || "").toLowerCase();
        const locationMatches = sellerLoc.length === 0 || invLoc.length === 0 ||
          sellerLoc.includes(invLoc) || invLoc.includes(sellerLoc);

        return budgetMatches && locationMatches;
      });

      return NextResponse.json({ matches: matched });
    }

    return NextResponse.json({ matches: [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to find matches" }, { status: 500 });
  }
}
