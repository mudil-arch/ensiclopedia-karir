"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Profession,
  RumpunPekerjaan,
  RIASEC_DEFINITIONS,
  RiasecCode,
  STANDARD_SOFT_SKILLS,
} from "@/types/career";
import { getAccentTheme } from "@/lib/theme";
import { ProfessionCard } from "@/components/ProfessionCard";
import { RumpunIcon } from "@/components/RumpunIcon";
import {
  Search,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface RumpunDetailClientProps {
  rumpun: RumpunPekerjaan;
  professions: Profession[];
  allRumpun: RumpunPekerjaan[];
}

export function RumpunDetailClient({
  rumpun,
  professions,
  allRumpun,
}: RumpunDetailClientProps) {
  const theme = getAccentTheme(rumpun.accentColor);
  const [query, setQuery] = useState("");
  const [selectedRiasec, setSelectedRiasec] = useState<RiasecCode | "all">(
    "all"
  );
  const [selectedSkill, setSelectedSkill] = useState("all");

  const filtered = useMemo(() => {
    return professions.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.softSkills.some((s) => s.name.toLowerCase().includes(q)) ||
        p.hardSkills.some((h) => h.name.toLowerCase().includes(q));

      const matchR =
        selectedRiasec === "all" || p.riasecCodes.includes(selectedRiasec);

      const matchS =
        selectedSkill === "all" ||
        p.softSkills.some(
          (s) => s.name.toLowerCase() === selectedSkill.toLowerCase()
        );

      return matchQ && matchR && matchS;
    });
  }, [professions, query, selectedRiasec, selectedSkill]);

  return (
    <div className="pb-16 space-y-12">
      {/* Header Banner */}
      <section className={`${theme.bgHeader} text-white py-12 sm:py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/rumpun"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/85 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Daftar Rumpun Pekerjaan</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-extrabold uppercase tracking-wider">
                <RumpunIcon name={rumpun.iconName} className="w-4 h-4" />
                <span>Rumpun Pekerjaan</span>
              </div>
              <h1
                id="main-content"
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight"
              >
                Rumpun {rumpun.name}
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {rumpun.fullDescription}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shrink-0 min-w-[220px] text-center">
              <span className="block text-3xl sm:text-4xl font-extrabold">
                {professions.length}
              </span>
              <span className="text-xs sm:text-sm text-white/85 font-semibold">
                Profesi Terpublikasi
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Karakteristik Aktivitas Kerja & Mata Pelajaran Pendukung */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Karakteristik Aktivitas Kerja di Rumpun {rumpun.name}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {rumpun.workCharacteristics.map((wc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-sm text-slate-700"
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${theme.textPrimary} shrink-0 mt-0.5`}
                    aria-hidden="true"
                  />
                  <span>{wc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen
                className={`w-5 h-5 ${theme.textPrimary}`}
                aria-hidden="true"
              />
              <h2 className="text-lg font-extrabold text-slate-900">
                Mata Pelajaran Terkait
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Bidang belajar di SMA/SMK yang mendukung kesiapan masuk ke rumpun{" "}
              {rumpun.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {rumpun.exampleSubjects.map((sub) => (
                <span
                  key={sub}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.badgeBg} ${theme.badgeText}`}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & Pencarian dalam Rumpun */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label
                htmlFor="rumpun-search"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Cari Profesi di Rumpun {rumpun.name}
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="rumpun-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Ketik nama profesi atau keahlian di bidang ${rumpun.name}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor="rumpun-riasec-filter"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Filter Tipe Minat RIASEC
              </label>
              <select
                id="rumpun-riasec-filter"
                value={selectedRiasec}
                onChange={(e) =>
                  setSelectedRiasec(e.target.value as RiasecCode | "all")
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="all">Semua Tipe RIASEC</option>
                {(Object.keys(RIASEC_DEFINITIONS) as RiasecCode[]).map((c) => (
                  <option key={c} value={c}>
                    {c} — {RIASEC_DEFINITIONS[c].nameEn} (
                    {RIASEC_DEFINITIONS[c].nameId})
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="rumpun-skill-filter"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Filter Soft Skill
              </label>
              <select
                id="rumpun-skill-filter"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="all">Semua Soft Skill</option>
                {STANDARD_SOFT_SKILLS.map((sk) => (
                  <option key={sk} value={sk}>
                    {sk}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Daftar Kartu Profesi dalam Rumpun */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Daftar Profesi Rumpun {rumpun.name} ({filtered.length})
            </h2>
          </div>

          {professions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Rumpun {rumpun.name} Siap Diisi Kartu Profesi Baru
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Saat ini seri kartu awal berfokus pada Rumpun Kesehatan (Dokter,
                Perawat, Apoteker, Bidan). Guru BK atau Admin dapat langsung
                menambahkan profesi untuk rumpun {rumpun.name} melalui Panel
                Admin tanpa mengubah kode website.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/rumpun/kesehatan"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold"
                >
                  Lihat Rumpun Kesehatan (4 Profesi Aktif)
                </Link>
                <Link
                  href="/admin"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold"
                >
                  Tambah Profesi di Panel Admin
                </Link>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
              <p className="font-bold text-slate-800">
                Tidak ada profesi yang sesuai dengan filter pencarian.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedRiasec("all");
                  setSelectedSkill("all");
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((prof) => (
                <ProfessionCard key={prof.id} profession={prof} />
              ))}
            </div>
          )}
        </section>

        {/*Jelajahi Rumpun Lainnya */}
        <section className="pt-8 border-t border-slate-200 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Jelajahi Rumpun Pekerjaan Lainnya
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {allRumpun
              .filter((r) => r.slug !== rumpun.slug)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/rumpun/${r.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 transition-colors"
                >
                  <RumpunIcon name={r.iconName} className="w-4 h-4 text-blue-600" />
                  <span>{r.name}</span>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

