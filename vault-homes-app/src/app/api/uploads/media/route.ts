import { NextResponse } from "next/server";

// MOCKED UPLOAD ENDPOINT
// This will just pretend to upload to S3/Vercel Blob and return a fake URL
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Mock delay to simulate network upload
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock URL (In a real app, you'd push the stream to Vercel Blob or AWS S3 here)
    const mockUrl = `https://mock-storage.vault-homes.com/uploads/${Date.now()}_${file.name}`;

    return NextResponse.json({
      success: true,
      url: mockUrl
    }, { status: 200 });

  } catch (error) {
    console.error("Media Upload Error:", error);
    return NextResponse.json({ message: "Internal server error during upload" }, { status: 500 });
  }
}
