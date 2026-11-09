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
    <div className="pb-16 bg-[var(--color-parchment)] min-h-screen">
      <section className="hero-bg text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white/80 bg-white/10 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span>Katalog Lengkap Kartu Karier</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight"
          >
            Jelajahi Profil Profesi Indonesia
          </h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed">
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

