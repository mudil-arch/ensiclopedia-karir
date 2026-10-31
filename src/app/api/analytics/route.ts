import { NextRequest, NextResponse } from "next/server";
import { getDatabase, incrementPageView } from "@/lib/db";

export async function GET() {
  const db = getDatabase();
  return NextResponse.json({
    analytics: db.analytics || { pageViews: {}, lastUpdated: new Date().toISOString() },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = String(body?.slug || "").trim();
    if (!slug) {
      return NextResponse.json({ error: "Slug diperlukan" }, { status: 400 });
    }
    const views = incrementPageView(slug);
    return NextResponse.json({ slug, views });
  } catch {
    return NextResponse.json({ error: "Gagal mencatat kunjungan" }, { status: 400 });
  }
}

