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
import { siteConfig } from "@/config/site";
import { getAccentTheme } from "@/lib/theme";
import { ProfessionCard } from "@/components/ProfessionCard";
import { RumpunIcon } from "@/components/RumpunIcon";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import {
  Search,
  Sparkles,
  ArrowRight,
  QrCode,
  Scale,
  Compass,
  Clock,
  Bookmark,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

interface HomeExplorerClientProps {
  professions: Profession[];
  rumpunList: RumpunPekerjaan[];
}

export function HomeExplorerClient({
  professions,
  rumpunList,
}: HomeExplorerClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRumpun, setSelectedRumpun] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedRiasec, setSelectedRiasec] = useState<RiasecCode | "all">("all");

  const { recentlyViewed, favorites } = useUserPrefs();

  // Filter professions responsively
  const filteredProfessions = useMemo(() => {
    return professions.filter((prof) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        prof.name.toLowerCase().includes(q) ||
        prof.rumpunName.toLowerCase().includes(q) ||
        prof.summary.toLowerCase().includes(q) ||
        prof.softSkills.some((s) => s.name.toLowerCase().includes(q)) ||
        prof.hardSkills.some((h) => h.name.toLowerCase().includes(q));

      const matchesRumpun =
        selectedRumpun === "all" || prof.rumpunSlug === selectedRumpun;

      const matchesSkill =
        selectedSkill === "all" ||
        prof.softSkills.some(
          (s) => s.name.toLowerCase() === selectedSkill.toLowerCase()
        ) ||
        prof.hardSkills.some((h) =>
          h.name.toLowerCase().includes(selectedSkill.toLowerCase())
        );

      const matchesRiasec =
        selectedRiasec === "all" || prof.riasecCodes.includes(selectedRiasec);

      return matchesQuery && matchesRumpun && matchesSkill && matchesRiasec;
    });
  }, [
    professions,
    searchQuery,
    selectedRumpun,
    selectedSkill,
    selectedRiasec,
  ]);

  const recentProfessions = useMemo(() => {
    return recentlyViewed
      .map((slug) => professions.find((p) => p.slug === slug))
      .filter((p): p is Profession => Boolean(p));
  }, [recentlyViewed, professions]);

  const countByRumpun = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of professions) {
      map[p.rumpunSlug] = (map[p.rumpunSlug] || 0) + 1;
    }
    return map;
  }, [professions]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white pt-10 pb-16 sm:py-20">
        {/* Decorative Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#60a5fa 1.25px, transparent 1.25px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold">
                <QrCode className="w-4 h-4 text-blue-300" aria-hidden="true" />
                <span>Pendamping Career Profile Trading Card SMA/SMK</span>
              </div>

              <h1
                id="main-content"
                tabIndex={-1}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white"
              >
                {siteConfig.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                {siteConfig.heroDescription}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#pencarian-profesi"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all"
                >
                  <span>Jelajahi Profesi</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#eksplorasi-minat-riasec"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
                >
                  <Compass className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>Temukan Minat Karier</span>
                </a>
              </div>

              {/* Quick Trust Pills */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Terhubung QR Kartu Fisik</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Referensi Resmi Indonesia</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Panduan Minat RIASEC</span>
                </div>
              </div>
            </div>

            {/* Right Visual Illustration: Interactive Trading Card Stack */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500 text-white text-xs font-extrabold tracking-wider">
                      SERI 01–04
                    </span>
                    <span className="text-sm font-bold text-white">
                      Kartu Karier Kesehatan
                    </span>
                  </div>
                  <span className="text-xs text-blue-200 font-mono">
                    QR Ready
                  </span>
                </div>

                {/* Mini Interactive Grid of the 4 Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {professions.slice(0, 4).map((prof) => (
                    <Link
                      key={prof.slug}
                      href={`/profesi/${prof.slug}`}
                      className="group bg-white rounded-2xl p-3 text-slate-900 hover:scale-[1.02] transition-all shadow-md"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                        <span>{prof.rumpunName}</span>
                        <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                          {prof.cardNumber}
                        </span>
                      </div>
                      <div className="aspect-[5/4] rounded-xl overflow-hidden bg-slate-100 mb-2">
                        <img
                          src={prof.illustrationUrl}
                          alt={`Kartu profesi ${prof.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600">
                          {prof.name}
                        </p>
                        <div className="flex gap-1">
                          {prof.riasecCodes.map((c) => (
                            <span
                              key={c}
                              className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
                  <span>Pindai QR pada kartu fisik atau klik kartu di atas</span>
                  <Link
                    href="/profesi"
                    className="font-bold text-white underline hover:text-blue-200"
                  >
                    Semua Kartu →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PENCARIAN PROFESI RESPONSIF */}
      <section
        id="pencarian-profesi"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Search className="w-6 h-6 text-blue-600" aria-hidden="true" />
                <span>Cari dan Temukan Profesi</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Filter langsung berdasarkan nama profesi, rumpun pekerjaan, kata
                kunci keterampilan, atau minat kerja RIASEC.
              </p>
            </div>
            {(searchQuery ||
              selectedRumpun !== "all" ||
              selectedSkill !== "all" ||
              selectedRiasec !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRumpun("all");
                  setSelectedSkill("all");
                  setSelectedRiasec("all");
                }}
                className="self-start md:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
              >
                Reset Filter Pencarian
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6">
            {/* Input Nama / Kata Kunci */}
            <div className="md:col-span-5">
              <label
                htmlFor="home-search-input"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Nama Profesi / Kata Kunci
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="home-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cth: Dokter, Perawat, obat, ibu hamil..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-blue-600"
                />
              </div>
            </div>

            {/* Select Rumpun Pekerjaan */}
            <div className="md:col-span-4">
              <label
                htmlFor="home-rumpun-select"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Rumpun Pekerjaan
              </label>
              <select
                id="home-rumpun-select"
                value={selectedRumpun}
                onChange={(e) => setSelectedRumpun(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-blue-600"
              >
                <option value="all">Semua Rumpun Pekerjaan</option>
                {rumpunList.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}{" "}
                    {countByRumpun[r.slug]
                      ? `(${countByRumpun[r.slug]} profesi)`
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Keterampilan */}
            <div className="md:col-span-3">
              <label
                htmlFor="home-skill-select"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Kata Kunci Keterampilan
              </label>
              <select
                id="home-skill-select"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-blue-600"
              >
                <option value="all">Semua Keterampilan</option>
                {STANDARD_SOFT_SKILLS.map((sk) => (
                  <option key={sk} value={sk}>
                    Soft Skill: {sk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Cepat RIASEC */}
          <div
            id="eksplorasi-minat-riasec"
            className="mt-5 pt-5 border-t border-slate-100"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <SlidersHorizontal
                className="w-4 h-4 text-blue-600"
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Filter Cepat Minat Aktivitas Kerja (Holland RIASEC):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedRiasec("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRiasec === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Semua Tipe
              </button>
              {(Object.keys(RIASEC_DEFINITIONS) as RiasecCode[]).map((code) => {
                const info = RIASEC_DEFINITIONS[code];
                const active = selectedRiasec === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() =>
                      setSelectedRiasec(active ? "all" : code)
                    }
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      active
                        ? `${info.badgeSolid} border-transparent shadow-sm`
                        : `${info.colorBg} ${info.colorText} ${info.colorBorder} hover:opacity-90`
                    }`}
                  >
                    <span className="font-extrabold">{code}</span>
                    <span>— {info.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Status Count */}
          <div
            aria-live="polite"
            className="mt-5 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-600"
          >
            <span>
              Menampilkan{" "}
              <strong className="text-slate-900">
                {filteredProfessions.length}
              </strong>{" "}
              dari {professions.length} profesi yang dipublikasikan.
            </span>
          </div>
        </div>
      </section>

      {/* 3. PROFESI PILIHAN / HASIL PENCARIAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-1">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Katalog Kartu Profesi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Profesi Pilihan & Seri Kartu Aktif
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Setiap kartu dilengkapi ilustrasi, kode minat RIASEC, 3 soft skill
              utama, dan halaman profil lengkap berbasis sumber resmi.
            </p>
          </div>
          <Link
            href="/profesi"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            <span>Buka Halaman Eksplorasi Penuh</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {filteredProfessions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
            <p className="text-lg font-bold text-slate-800">
              Tidak ada profesi yang cocok dengan kriteria pencarianmu.
            </p>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Coba gunakan kata kunci yang lebih umum atau tampilkan kembali
              semua rumpun pekerjaan.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedRumpun("all");
                setSelectedSkill("all");
                setSelectedRiasec("all");
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
            >
              Tampilkan Semua Profesi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProfessions.map((prof) => (
              <ProfessionCard key={prof.id} profession={prof} />
            ))}
          </div>
        )}
      </section>

      {/* RECENTLY VIEWED OR FAVORITES BAR (IF ANY) */}
      {(recentProfessions.length > 0 || favorites.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Jejak Eksplorasi Kamu di Perangkat Ini</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Lanjutkan Membaca atau Kelola Profesi Favoritmu
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Disimpan secara lokal di perambanmu tanpa perlu membuat akun atau
                mengisi data pribadi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {recentProfessions.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/profesi/${rp.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-white border border-slate-700 transition-colors"
                >
                  <span className="font-mono text-blue-400">
                    #{rp.cardNumber}
                  </span>
                  <span>{rp.name}</span>
                </Link>
              ))}
              {favorites.length > 0 && (
                <Link
                  href="/profesi?favorit=1"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs sm:text-sm font-bold text-white transition-colors"
                >
                  <Bookmark className="w-4 h-4" aria-hidden="true" />
                  <span>Lihat {favorites.length} Favorit</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. RUMPUN PEKERJAAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-1">
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>10 Rumpun Karier Nasional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Jelajahi Berdasarkan Rumpun Pekerjaan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Sistem Kartu Karier dirancang terbuka untuk berbagai bidang profesi
              di Indonesia. Klik salah satu rumpun untuk melihat karakteristik
              aktivitas kerja dan daftar profesinya.
            </p>
          </div>
          <Link
            href="/rumpun"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Lihat Semua Rumpun</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {rumpunList.map((r) => {
            const theme = getAccentTheme(r.accentColor);
            const count = countByRumpun[r.slug] || 0;
            return (
              <Link
                key={r.id}
                href={`/rumpun/${r.slug}`}
                className={`group flex flex-col justify-between p-5 rounded-2xl bg-white border-2 ${theme.borderSoft} hover:border-slate-300 shadow-sm hover:shadow-md transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center`}
                    >
                      <RumpunIcon name={r.iconName} className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        count > 0
                          ? `${theme.badgeBg} ${theme.badgeText}`
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {count > 0 ? `${count} Profesi` : "Siap Dikembangkan"}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {r.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600">
                  <span>Buka Rumpun</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. AJAKAN EKSPLORASI & BANDINGKAN PROFESI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Fitur Perbandingan Karier Siswa</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Bingung Memilih di Antara Beberapa Profesi? Bandingkan Secara
                Berdampingan!
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
                Kamu bisa memilih dua hingga tiga profesi sekaligus (misalnya{" "}
                <strong>Dokter</strong>, <strong>Perawat</strong>, dan{" "}
                <strong>Apoteker</strong>) untuk membandingkan kecenderungan
                minat RIASEC, aktivitas harian, jenjang pendidikan di Indonesia,
                serta keterampilan yang dibutuhkan.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/bandingkan"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-sm sm:text-base shadow-lg transition-all"
              >
                <Scale className="w-5 h-5 text-blue-700" aria-hidden="true" />
                <span>Bandingkan Profesi Sekarang</span>
              </Link>
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <span>Pelajari Cara Kerja Kartu & RIASEC</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

