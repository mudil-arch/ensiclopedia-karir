import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/config/site";

export function getProfessionDetailUrl(slug: string, customBaseUrl?: string): string {
  const base = (customBaseUrl || siteConfig.baseUrl).replace(/\/+$/, "");
  return `${base}/profesi/${slug}`;
}

export async function generateQrCodeSvgString(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 4,
    width: 512,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });
}

export async function generateQrCodePngBuffer(url: string): Promise<Buffer> {
  return QRCode.toBuffer(url, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 4,
    width: 600,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });
}

export async function generateQrCodeDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 4,
    width: 600,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });
}

export async function saveProfessionQrCodeFiles(
  slug: string,
  customBaseUrl?: string
): Promise<{ svgPath: string; pngPath: string; targetUrl: string }> {
  const targetUrl = getProfessionDetailUrl(slug, customBaseUrl);
  const qrDir = path.join(process.cwd(), "public", "qr");

  try {
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }
    const svgContent = await generateQrCodeSvgString(targetUrl);
    const pngBuffer = await generateQrCodePngBuffer(targetUrl);

    const svgFile = path.join(qrDir, `${slug}.svg`);
    const pngFile = path.join(qrDir, `${slug}.png`);

    fs.writeFileSync(svgFile, svgContent, "utf-8");
    fs.writeFileSync(pngFile, pngBuffer);
  } catch (err) {
    console.warn("Could not write static QR files to disk (e.g. read-only fs):", err);
  }

  return {
    svgPath: `/qr/${slug}.svg`,
    pngPath: `/qr/${slug}.png`,
    targetUrl,
  };
}

