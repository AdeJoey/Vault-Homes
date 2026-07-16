import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone, preferredArea, budgetMin, budgetMax,
      assetType, buyingTimeline, useCase, cashBuyer, riskPreference,
      preferredContactMethod, source, sourcePage, utmSource,
      utmMedium, utmCampaign
    } = body;

    if (!fullName || (!email && !phone) || !preferredArea || !assetType || !buyingTimeline) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        leadType: "INVESTOR",
        fullName,
        email,
        phone,
        preferredContactMethod,
        preferredArea,
        budgetMin: budgetMin ? parseFloat(budgetMin) : null,
        budgetMax: budgetMax ? parseFloat(budgetMax) : null,
        assetType,
        buyingTimeline,
        useCase,
        cashBuyer: cashBuyer === true || cashBuyer === "true",
        riskPreference,
        source,
        sourcePage,
        utmSource,
        utmMedium,
        utmCampaign
      }
    });

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      status: "new",
      message: "You’re on the investor access list."
    }, { status: 201 });

  } catch (error) {
    console.error("Investor Lead Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
