import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProfessions } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { RiasecQuizClient } from "@/components/RiasecQuizClient";

export const metadata: Metadata = {
  title: `Kuis Minat Karier (Holland RIASEC) | ${siteConfig.siteShortName}`,
  description:
    "Refleksi minat aktivitas kerja interaktif untuk siswa SMA/SMK berdasarkan teori Holland RIASEC. Temukan kecenderungan kepribadian kerjamu dan profesi yang relevan.",
};

export default function RiasecQuizPage() {
  const professions = getAllProfessions(false);

  return (
    <div className="bg-[var(--color-parchment)] min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto px-4 py-20 text-center text-sm text-[var(--color-ink-soft)]">
            Menyiapkan kuis minat...
          </div>
        }
      >
        <RiasecQuizClient professions={professions} />
      </Suspense>
    </div>
  );
}

