import { NextRequest, NextResponse } from "next/server";
import {
  generateQrCodePngBuffer,
  generateQrCodeSvgString,
  getProfessionDetailUrl,
} from "@/lib/qr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "dokter";
  const format = (searchParams.get("format") || "svg").toLowerCase();
  const customBaseUrl = searchParams.get("baseUrl") || undefined;
  const download = searchParams.get("download") === "1";

  const cleanSlug = slug.replace(/[^a-z0-9-_]/gi, "").toLowerCase() || "dokter";
  const targetUrl = getProfessionDetailUrl(cleanSlug, customBaseUrl);

  try {
    if (format === "png") {
      const buffer = await generateQrCodePngBuffer(targetUrl);
      const headers: Record<string, string> = {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      };
      if (download) {
        headers["Content-Disposition"] = `attachment; filename="qr-${cleanSlug}.png"`;
      }
      return new NextResponse(new Uint8Array(buffer), { status: 200, headers });
    }

    const svg = await generateQrCodeSvgString(targetUrl);
    const headers: Record<string, string> = {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    };
    if (download) {
      headers["Content-Disposition"] = `attachment; filename="qr-${cleanSlug}.svg"`;
    }
    return new NextResponse(svg, { status: 200, headers });
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    return NextResponse.json(
      { error: "Gagal membuat QR code" },
      { status: 500 }
    );
  }
}

