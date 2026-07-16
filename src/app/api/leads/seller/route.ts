import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone, propertyLocation, propertyType,
      sellingTimeline, occupancyStatus, priceExpectation, notes,
      preferredContactMethod, source, sourcePage, utmSource,
      utmMedium, utmCampaign, photoUrls, videoUrls, documentUrls
    } = body;

    if (!fullName || (!email && !phone) || !propertyLocation || !propertyType || !sellingTimeline) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        leadType: "SELLER",
        fullName,
        email,
        phone,
        preferredContactMethod,
        propertyLocation,
        propertyType,
        sellingTimeline,
        occupancyStatus,
        priceExpectation,
        notes,
        photoUrls: photoUrls ? JSON.stringify(photoUrls) : null,
        videoUrls: videoUrls ? JSON.stringify(videoUrls) : null,
        documentUrls: documentUrls ? JSON.stringify(documentUrls) : null,
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
      message: "Your property has been submitted for private review."
    }, { status: 201 });

  } catch (error) {
    console.error("Seller Lead Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
