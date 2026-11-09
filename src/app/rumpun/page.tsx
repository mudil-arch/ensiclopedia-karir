import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProfessions, getAllRumpun } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { getAccentTheme } from "@/lib/theme";
import { RumpunIcon } from "@/components/RumpunIcon";
import { ArrowRight, Compass, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Daftar Rumpun Pekerjaan | ${siteConfig.siteShortName}`,
  description:
    "Jelajahi 10 rumpun pekerjaan di Indonesia untuk memahami karakteristik aktivitas kerja dan berbagai pilihan profesi bagi siswa SMA/SMK.",
};

export default function RumpunIndexPage() {
  const rumpunList = getAllRumpun(false);
  const professions = getAllProfessions(false);

  const countByRumpun: Record<string, number> = {};
  for (const p of professions) {
    countByRumpun[p.rumpunSlug] = (countByRumpun[p.rumpunSlug] || 0) + 1;
  }

  return (
    <div className="pb-16 space-y-12 bg-[var(--color-parchment)] min-h-screen">
      <section className="hero-bg text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white/80 bg-white/10 border border-white/15">
            <Compass className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span>Katalog 10 Rumpun Karier Nasional</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight"
          >
            Rumpun Pekerjaan di Indonesia
          </h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed">
            Setiap rumpun pekerjaan memiliki karakteristik aktivitas kerja,
            lingkungan, dan mata pelajaran pendukung yang berbeda. Pilih rumpun
            di bawah ini untuk memulai eksplorasimu.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rumpunList.map((r) => {
            const theme = getAccentTheme(r.accentColor);
            const count = countByRumpun[r.slug] || 0;
            return (
              <article
                key={r.id}
                className={`rounded-3xl bg-white border-2 ${theme.borderSoft} hover:border-slate-300 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
                      >
                        <RumpunIcon name={r.iconName} className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900">
                          <Link href={`/rumpun/${r.slug}`}>{r.name}</Link>
                        </h2>
                        <span
                          className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            count > 0
                              ? `${theme.badgeBg} ${theme.badgeText}`
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {count > 0
                            ? `${count} Kartu Profesi Tersedia`
                            : "Dapat Ditambahkan via Admin"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {r.fullDescription}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Karakteristik Aktivitas Utama:
                    </h3>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {r.workCharacteristics.slice(0, 2).map((wc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`w-4 h-4 ${theme.textPrimary} shrink-0 mt-0.5`}
                            aria-hidden="true"
                          />
                          <span>{wc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {r.exampleSubjects.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/rumpun/${r.slug}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white ${theme.buttonBg} ${theme.buttonHover} transition-colors shrink-0`}
                  >
                    <span>Jelajahi {r.name}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

