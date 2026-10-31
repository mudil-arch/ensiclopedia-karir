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
    <div className="pb-16">
      <section className="bg-gradient-to-br from-indigo-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-extrabold uppercase tracking-wider">
            <Scale className="w-4 h-4" aria-hidden="true" />
            <span>Alat Bantu Refleksi Pilihan Karier</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Bandingkan Profesi Pilihanmu
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
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

