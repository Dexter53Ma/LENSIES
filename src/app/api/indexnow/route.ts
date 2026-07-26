import { NextResponse } from "next/server";

const INDEXNOW_KEY = "lensies-co-indexnow-2026";
const SITE_URL = "https://www.lensies.co";

export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const urls = body.urls || [`${SITE_URL}/`];

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.lensies.co",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/api/indexnow`,
        urlList: urls,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, submitted: urls.length });
    }

    return NextResponse.json({ success: false, status: response.status }, { status: 500 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to submit" }, { status: 500 });
  }
}
