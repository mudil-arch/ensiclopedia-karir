import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Compass, QrCode, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-extrabold text-white text-base tracking-tight">
                  {siteConfig.siteName}
                </p>
                <p className="text-xs text-blue-400">
                  Media Layanan Bimbingan & Konseling Karier SMA/SMK
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.siteDescription}
            </p>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              {siteConfig.footerNote}
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigasi Utama
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi"
                  className="hover:text-white transition-colors"
                >
                  Jelajahi Katalog Profesi
                </Link>
              </li>
              <li>
                <Link
                  href="/rumpun"
                  className="hover:text-white transition-colors"
                >
                  Rumpun Pekerjaan
                </Link>
              </li>
              <li>
                <Link
                  href="/bandingkan"
                  className="hover:text-white transition-colors"
                >
                  Bandingkan Profesi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-white transition-colors"
                >
                  Tentang Kartu Karier & RIASEC
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Seri Kartu Awal & Admin */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Seri Kartu Tenaga Kesehatan (01–04)
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link
                  href="/profesi/dokter"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <span className="text-xs font-mono text-blue-400">01/04</span>
                  <span>Dokter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi/perawat"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <span className="text-xs font-mono text-pink-400">02/04</span>
                  <span>Perawat</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi/apoteker"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <span className="text-xs font-mono text-emerald-400">03/04</span>
                  <span>Apoteker</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profesi/bidan"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  <span className="text-xs font-mono text-purple-400">04/04</span>
                  <span>Bidan</span>
                </Link>
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                Panel Admin Ensiklopedia
              </Link>
              <Link
                href="/tentang#qr-guide"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <QrCode className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Panduan QR Kartu Fisik
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.siteName}. Dikembangkan untuk
            eksplorasi karier siswa SMA/SMK di Indonesia.
          </p>
          <p>
            Privasi Terjaga: Tanpa pelacakan data pribadi sensitif siswa.
          </p>
        </div>
      </div>
    </footer>
  );
}

