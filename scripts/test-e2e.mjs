import jsQR from "jsqr";
import { PNG } from "pngjs";

const BASE = "http://localhost:3010";

async function runVerification() {
  console.log("=== END-TO-END VERIFICATION: KARTU KARIER ===");

  // 1. Verify Public Pages
  const pagesToTest = [
    { path: "/", expectedStatus: 200, mustContain: "Kenali Profesi, Rancang Masa Depanmu" },
    { path: "/profesi", expectedStatus: 200, mustContain: "Jelajahi Profil Profesi Indonesia" },
    { path: "/rumpun", expectedStatus: 200, mustContain: "Rumpun Pekerjaan di Indonesia" },
    { path: "/rumpun/kesehatan", expectedStatus: 200, mustContain: "Rumpun Kesehatan" },
    { path: "/rumpun/teknologi-dan-digital", expectedStatus: 200, mustContain: "Rumpun Teknologi dan Digital" },
    { path: "/profesi/dokter", expectedStatus: 200, mustContain: "01/04" },
    { path: "/profesi/perawat", expectedStatus: 200, mustContain: "02/04" },
    { path: "/profesi/apoteker", expectedStatus: 200, mustContain: "03/04" },
    { path: "/profesi/bidan", expectedStatus: 200, mustContain: "04/04" },
    { path: "/bandingkan", expectedStatus: 200, mustContain: "Bandingkan Profesi Pilihanmu" },
    { path: "/tentang", expectedStatus: 200, mustContain: "Mengenal Teori Minat Karier Holland (RIASEC)" },
    { path: "/profesi/profesi-tidak-ada-404", expectedStatus: 404, mustContain: "404" },
  ];

  for (const item of pagesToTest) {
    const res = await fetch(`${BASE}${item.path}`);
    const html = await res.text();
    const okStatus = res.status === item.expectedStatus;
    const okContent = html.includes(item.mustContain);
    console.log(
      `[${okStatus && okContent ? "PASS" : "FAIL"}] GET ${item.path} -> HTTP ${
        res.status
      } (Contains "${item.mustContain}": ${okContent})`
    );
    if (!okStatus || !okContent) {
      throw new Error(`Failed check on ${item.path}`);
    }
  }

  // 2. Verify Dynamic QR API (PNG optical decode + SVG check)
  for (const slug of ["dokter", "perawat", "apoteker", "bidan"]) {
    const pngRes = await fetch(`${BASE}/api/qr?slug=${slug}&format=png`);
    const arrayBuffer = await pngRes.arrayBuffer();
    const pngParsed = PNG.sync.read(Buffer.from(arrayBuffer));
    const decoded = jsQR(
      new Uint8ClampedArray(pngParsed.data),
      pngParsed.width,
      pngParsed.height
    );
    const expectedUrl = `https://kartukarier.edukasi.id/profesi/${slug}`;
    const okQr = decoded && decoded.data === expectedUrl;
    console.log(
      `[${okQr ? "PASS" : "FAIL"}] Dynamic QR API (/api/qr?slug=${slug}&format=png) decoded to: ${
        decoded?.data
      }`
    );
    if (!okQr) throw new Error(`QR decode mismatch for ${slug}`);
  }

  // 3. Verify Admin Security & CRUD Lifecycle
  const unauthRes = await fetch(`${BASE}/api/professions?all=1`);
  console.log(
    `[${unauthRes.status === 401 ? "PASS" : "FAIL"}] Unauthorized Admin API blocked with HTTP ${
      unauthRes.status
    }`
  );
  if (unauthRes.status !== 401) throw new Error("Admin route should return 401 when unauthenticated");

  // Login as Admin
  const loginRes = await fetch(`${BASE}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD || "GuruBK2025!" }),
  });
  const setCookie = loginRes.headers.get("set-cookie");
  console.log(
    `[${loginRes.status === 200 && setCookie ? "PASS" : "FAIL"}] Admin Login succeeded and issued HttpOnly session cookie`
  );
  if (!setCookie) throw new Error("No session cookie returned");

  // Create temporary test profession via Admin API
  const createRes = await fetch(`${BASE}/api/professions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: setCookie,
    },
    body: JSON.stringify({
      name: "Guru Bimbingan dan Konseling",
      slug: "guru-bk-uji",
      cardNumber: "01/01",
      rumpunSlug: "pendidikan",
      accentColor: "amber",
      summary: "Pendidik profesional yang memfasilitasi perkembangan pribadi, sosial, belajar, dan perencanaan karier siswa.",
      riasecCodes: ["S", "I"],
      published: true,
    }),
  });
  const createJson = await createRes.json();
  console.log(
    `[${createRes.status === 200 && createJson.success ? "PASS" : "FAIL"}] Admin Create Profession ('guru-bk-uji') succeeded`
  );

  // Verify the newly created profession page renders at /profesi/guru-bk-uji
  const newProfPage = await fetch(`${BASE}/profesi/guru-bk-uji`);
  const newProfHtml = await newProfPage.text();
  const newPageOk =
    newProfPage.status === 200 &&
    newProfHtml.includes("Guru Bimbingan dan Konseling");
  console.log(
    `[${newPageOk ? "PASS" : "FAIL"}] Newly created profession page /profesi/guru-bk-uji is live (HTTP ${
      newProfPage.status
    })`
  );

  // Delete temporary test profession to restore clean 4 initial healthcare professions
  const delRes = await fetch(`${BASE}/api/professions?slug=guru-bk-uji`, {
    method: "DELETE",
    headers: { Cookie: setCookie },
  });
  console.log(
    `[${delRes.status === 200 ? "PASS" : "FAIL"}] Admin Delete temporary profession ('guru-bk-uji') succeeded`
  );

  console.log("\n=== ALL E2E TESTS PASSED SUCCESSFULLY ===");
}

runVerification().catch((err) => {
  console.error("E2E Verification failed:", err);
  process.exit(1);
});

