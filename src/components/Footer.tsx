import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MapPin, QrCode, ShieldCheck, Compass, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="text-white border-t mt-20"
      style={{
        background: "var(--color-ink)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: "var(--color-accent)" }}
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif font-semibold text-lg text-white tracking-tight">
                  {siteConfig.siteName}
                </p>
                <p
                  className="text-xs uppercase font-medium tracking-wider"
                  style={{ color: "var(--color-gold)" }}
                >
                  Media Bimbingan & Konseling Karier SMA/SMK
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {siteConfig.siteDescription}
            </p>
            <div
              className="p-3.5 rounded-xl text-xs leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {siteConfig.footerNote}
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Navigasi Utama
            </h2>
            <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profesi" className="hover:text-white transition-colors">
                  Jelajahi Katalog Profesi
                </Link>
              </li>
              <li>
                <Link href="/kuis-minat" className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: "var(--color-gold)" }}>
                  <span>Kuis Minat Karier (RIASEC)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-amber-500/20 text-amber-300">
                    Interaktif
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/rumpun" className="hover:text-white transition-colors">
                  Rumpun Pekerjaan
                </Link>
              </li>
              <li>
                <Link href="/bandingkan" className="hover:text-white transition-colors">
                  Bandingkan Profesi
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Tentang Kartu Karier & RIASEC
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Seri Kartu & Panel Guru BK */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Seri Kartu Tenaga Kesehatan (01–04)
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link
                  href="/profesi/dokter"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[11px] font-mono font-bold" style={{ color: "#38bdf8" }}>01/04</span>
                  <span className="text-xs font-medium text-white/90">Dokter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi/perawat"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[11px] font-mono font-bold" style={{ color: "#f472b6" }}>02/04</span>
                  <span className="text-xs font-medium text-white/90">Perawat</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi/apoteker"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[11px] font-mono font-bold" style={{ color: "#34d399" }}>03/04</span>
                  <span className="text-xs font-medium text-white/90">Apoteker</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi/bidan"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[11px] font-mono font-bold" style={{ color: "#c084fc" }}>04/04</span>
                  <span className="text-xs font-medium text-white/90">Bidan</span>
                </Link>
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap gap-2.5">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                Panel Admin Guru BK
              </Link>
              <Link
                href="/tentang#qr-guide"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <QrCode className="w-3.5 h-3.5" style={{ color: "#34d399" }} aria-hidden="true" />
                Panduan QR Kartu Fisik
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <p>
            © {new Date().getFullYear()} {siteConfig.siteName}. Dirancang untuk eksplorasi karier siswa SMA/SMK Indonesia.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Privasi Siswa Dijamin</span>
            <span>•</span>
            <span>Tanpa Pelacakan Data Sensitif</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
