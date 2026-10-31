export interface SiteConfig {
  siteName: string;
  siteShortName: string;
  siteSubtitle: string;
  siteDescription: string;
  baseUrl: string;
  heroTitle: string;
  heroDescription: string;
  navigation: {
    label: string;
    href: string;
  }[];
  footerNote: string;
  version: string;
}

export const siteConfig: SiteConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "KARTU KARIER — Career Explorer",
  siteShortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "KARTU KARIER",
  siteSubtitle: process.env.NEXT_PUBLIC_SITE_SUBTITLE || "Career Explorer",
  siteDescription:
    "Ensiklopedia profesi interaktif dan pendamping Career Profile Trading Card untuk mendukung eksplorasi serta perencanaan karier siswa SMA/SMK di Indonesia.",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://kartukarier.edukasi.id",
  heroTitle: "Kenali Profesi, Rancang Masa Depanmu",
  heroDescription:
    "Pendamping Kartu Profesi untuk siswa SMA/SMK. Pindai QR code pada kartu fisik atau jelajahi beragam pilihan profesi, jalur pendidikan, keterampilan, dan aktivitas kerja nyata di Indonesia.",
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "Jelajahi Profesi", href: "/profesi" },
    { label: "Rumpun Pekerjaan", href: "/rumpun" },
    { label: "Bandingkan", href: "/bandingkan" },
    { label: "Tentang", href: "/tentang" },
  ],
  footerNote:
    "Website ini berfungsi membantu siswa mengenali berbagai pilihan karier dan membuat keputusan yang lebih terinformasi bersama Guru Bimbingan dan Konseling serta orang tua — bukan alat penentu masa depan secara otomatis.",
  version: "1.0.0",
};

