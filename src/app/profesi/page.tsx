import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProfessions, getAllRumpun } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { ProfesiCatalogClient } from "@/components/ProfesiCatalogClient";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `Jelajahi Katalog Profesi | ${siteConfig.siteShortName}`,
  description:
    "Katalog lengkap kartu profesi interaktif untuk siswa SMA/SMK. Filter berdasarkan rumpun pekerjaan, minat RIASEC, dan keterampilan.",
};

export default function ProfesiIndexPage() {
  const professions = getAllProfessions(false);
  const rumpunList = getAllRumpun(false);

  return (
    <div className="pb-16">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Ensiklopedia Profesi</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Jelajahi Profil Profesi Indonesia
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Temukan informasi mendalam tentang tugas harian, lingkungan kerja,
            jalur pendidikan, lisensi profesi, kecenderungan minat RIASEC, serta
            langkah persiapan sejak bangku SMA/SMK.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-slate-600">
            Memuat katalog profesi...
          </div>
        }
      >
        <ProfesiCatalogClient
          professions={professions}
          rumpunList={rumpunList}
        />
      </Suspense>
    </div>
  );
}

