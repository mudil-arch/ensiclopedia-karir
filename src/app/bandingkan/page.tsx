import React from "react";
import type { Metadata } from "next";
import { getAllProfessions } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { CompareProfessionsClient } from "@/components/CompareProfessionsClient";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: `Bandingkan Profesi Berdampingan | ${siteConfig.siteShortName}`,
  description:
    "Bandingkan dua hingga tiga profesi berdasarkan minat RIASEC, jalur pendidikan, keterampilan, dan aktivitas kerja.",
};

export default function ComparePage() {
  const professions = getAllProfessions(false);

  return (
    <div className="pb-16 bg-[var(--color-parchment)] min-h-screen">
      <section className="hero-bg text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white/80 bg-white/10 border border-white/15">
            <Scale className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span>Alat Bantu Refleksi Pilihan Karier</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight"
          >
            Bandingkan Profesi Pilihanmu
          </h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed">
            Amati persamaan dan perbedaan antarprofesi mulai dari aktivitas
            harian, jalur studi di Indonesia, kecenderungan minat RIASEC, hingga
            mata pelajaran pendukung di SMA/SMK.
          </p>
        </div>
      </section>

      <CompareProfessionsClient professions={professions} />
    </div>
  );
}

