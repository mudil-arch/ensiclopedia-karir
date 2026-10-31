import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import jsQR from "jsqr";
import { PNG } from "pngjs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kartukarier.edukasi.id";
const SLUGS = ["dokter", "perawat", "apoteker", "bidan"];

const qrDir = path.join(process.cwd(), "public", "qr");
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

console.log("=== GENERATING & VERIFYING QR CODES ===");
console.log(`Base Production URL: ${BASE_URL}\n`);

let allPassed = true;

for (const slug of SLUGS) {
  const targetUrl = `${BASE_URL.replace(/\/+$/, "")}/profesi/${slug}`;
  const svgPath = path.join(qrDir, `${slug}.svg`);
  const pngPath = path.join(qrDir, `${slug}.png`);

  // 1. Generate SVG
  const svgString = await QRCode.toString(targetUrl, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 4,
    width: 512,
    color: { dark: "#0f172a", light: "#ffffff" },
  });
  fs.writeFileSync(svgPath, svgString, "utf-8");

  // 2. Generate PNG
  const pngBuffer = await QRCode.toBuffer(targetUrl, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 4,
    width: 600,
    color: { dark: "#0f172a", light: "#ffffff" },
  });
  fs.writeFileSync(pngPath, pngBuffer);

  // 3. Decode & Verify PNG with jsQR
  const pngData = PNG.sync.read(pngBuffer);
  const decoded = jsQR(
    new Uint8ClampedArray(pngData.data),
    pngData.width,
    pngData.height
  );

  const isMatch = decoded && decoded.data === targetUrl;
  if (!isMatch) {
    allPassed = false;
  }

  console.log(`[${isMatch ? "PASS" : "FAIL"}] Slug: "${slug}"`);
  console.log(`  Expected URL : ${targetUrl}`);
  console.log(`  Decoded QR   : ${decoded ? decoded.data : "FAILED TO DECODE"}`);
  console.log(`  Saved Files  : /public/qr/${slug}.svg & /public/qr/${slug}.png\n`);
}

if (!allPassed) {
  console.error("ERROR: One or more QR codes failed decoding verification!");
  process.exit(1);
} else {
  console.log("SUCCESS: All 4 initial healthcare profession QR codes generated and verified via optical decoding (jsQR)!");
}

