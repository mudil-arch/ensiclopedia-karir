import React from "react";
import Link from "next/link";
import { Compass, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold">
            404 — Halaman Tidak Ditemukan
          </span>
          <h1
            id="main-content"
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2"
          >
            Kartu atau Halaman Profesi Belum Tersedia
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Maaf, alamat URL yang kamu tuju tidak ditemukan atau kartu profesi
            tersebut masih dalam tahap penyusunan oleh tim Bimbingan dan
            Konseling.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/profesi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>Lihat Profesi Aktif</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

