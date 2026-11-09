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
  ArrowRight,
  QrCode,
  Scale,
  Compass,
  Clock,
  Bookmark,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
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
  const [filterOpen, setFilterOpen] = useState(false);

  const { recentlyViewed, favorites } = useUserPrefs();

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
  }, [professions, searchQuery, selectedRumpun, selectedSkill, selectedRiasec]);

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

  const hasActiveFilter =
    searchQuery || selectedRumpun !== "all" || selectedSkill !== "all" || selectedRiasec !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRumpun("all");
    setSelectedSkill("all");
    setSelectedRiasec("all");
  };

  return (
    <div className="bg-[var(--color-parchment)]">

      {/* ═══════════════════════════════════════════════════════
          1.  HERO — editorial dark with warm gradient
          ═══════════════════════════════════════════════════════ */}
      <section
        className="hero-bg relative overflow-hidden"
        aria-labelledby="main-content"
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Decorative circles */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-8 pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--color-teal-brand) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-20 sm:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* ── Left Copy ── */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-7">

              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <QrCode className="w-3.5 h-3.5" aria-hidden="true" />
                  Kartu Profesi Fisik + Digital
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1
                  id="main-content"
                  tabIndex={-1}
                  className="font-serif text-4xl sm:text-5xl xl:text-6xl font-semibold text-white leading-[1.1]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {siteConfig.heroTitle}
                </h1>
                <p
                  className="text-base sm:text-lg leading-relaxed max-w-lg"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {siteConfig.heroDescription}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a href="#pencarian-profesi" className="btn-primary">
                  Jelajahi Profesi
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="#eksplorasi-riasec" className="btn-ghost">
                  <Compass className="w-4 h-4" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                  Minat Karier (RIASEC)
                </a>
              </div>

              {/* Trust row */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                  QR Code Terintegrasi
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                  Referensi Resmi Indonesia
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                  Panduan Holland RIASEC
                </span>
              </div>
            </div>

            {/* ── Right — Trading Card Preview ── */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div
                className="relative mx-auto max-w-sm"
                style={{ perspective: "1000px" }}
              >
                {/* Stacked card shadow effect */}
                <div
                  className="absolute inset-x-4 top-3 h-full rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    transform: "rotate(2deg)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-2 top-1.5 h-full rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    transform: "rotate(1deg)",
                  }}
                  aria-hidden="true"
                />

                {/* Main card container */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold tracking-wider"
                        style={{
                          background: "var(--color-accent)",
                          color: "#fff",
                        }}
                      >
                        SERI 01–04
                      </span>
                      <span className="text-sm font-semibold text-white/80">
                        Kartu Karier Kesehatan
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest"
                      style={{ color: "var(--color-gold)" }}
                    >
                      QR READY
                    </span>
                  </div>

                  {/* Mini card grid */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {professions.slice(0, 4).map((prof, i) => (
                      <Link
                        key={prof.slug}
                        href={`/profesi/${prof.slug}`}
                        className="group bg-white rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-200 shadow-md"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        {/* Top bar */}
                        <div
                          className="h-1.5"
                          style={{
                            background: getAccentTheme(prof.accentColor).hexPrimary,
                          }}
                        />
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-[9px] font-bold uppercase tracking-widest"
                              style={{ color: "var(--color-ink-soft)" }}
                            >
                              {prof.rumpunName}
                            </span>
                            <span
                              className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                              style={{
                                background: "var(--color-ink)",
                                color: "#fff",
                              }}
                            >
                              #{prof.cardNumber}
                            </span>
                          </div>
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-cream)] mb-2">
                            <img
                              src={prof.illustrationUrl}
                              alt={`Kartu profesi ${prof.name}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-xs text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                              {prof.name}
                            </p>
                            <div className="flex gap-0.5">
                              {prof.riasecCodes.map((c) => (
                                <span
                                  key={c}
                                  className="w-4 h-4 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
                                  style={{
                                    background: getAccentTheme(prof.accentColor).hexPrimary,
                                  }}
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div
                    className="flex items-center justify-between px-5 py-3 text-xs"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    <span>Pindai QR atau ketuk kartu di atas</span>
                    <Link
                      href="/profesi"
                      className="font-semibold text-white/70 hover:text-white transition-colors"
                    >
                      Semua →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2.  SEARCH & FILTER — elevated card over hero
          ═══════════════════════════════════════════════════════ */}
      <section
        id="pencarian-profesi"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16 relative z-20"
      >
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ border: "1px solid rgba(26,22,18,0.08)" }}
        >
          {/* Top row */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-7 py-5"
            style={{ borderBottom: "1px solid rgba(26,22,18,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--color-cream)" }}
              >
                <Search className="w-4 h-4" style={{ color: "var(--color-ink-soft)" }} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[var(--color-ink)]">
                  Cari dan Temukan Profesi
                </h2>
                <p className="text-xs text-[var(--color-ink-soft)]">
                  Filter berdasarkan nama, rumpun, keterampilan, atau minat RIASEC
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{
                    background: "var(--color-cream)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  Reset Filter
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilterOpen((p) => !p)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  background: filterOpen ? "var(--color-accent)" : "var(--color-cream)",
                  color: filterOpen ? "#fff" : "var(--color-ink-soft)",
                }}
                aria-expanded={filterOpen}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                Filter Lanjutan
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Search input */}
          <div className="px-5 sm:px-7 py-5">
            <div className="relative max-w-2xl">
              <Search
                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-ink-soft)" }}
                aria-hidden="true"
              />
              <label htmlFor="home-search-input" className="visually-hidden">
                Nama profesi atau kata kunci
              </label>
              <input
                id="home-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cth: Dokter, Perawat, komunikasi, ibu hamil…"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-[var(--color-cream)] focus:bg-white transition-colors"
                style={{
                  color: "var(--color-ink)",
                  border: "1.5px solid transparent",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1.5px solid var(--color-accent)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(200,70,10,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1.5px solid transparent";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Result count */}
            <p
              aria-live="polite"
              className="mt-3 text-xs font-medium"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Menampilkan{" "}
              <strong className="text-[var(--color-ink)] font-bold">
                {filteredProfessions.length}
              </strong>{" "}
              dari {professions.length} profesi dipublikasikan.
            </p>
          </div>

          {/* Collapsible advanced filters */}
          {filterOpen && (
            <div
              className="px-5 sm:px-7 pb-6 space-y-5 animate-slide-up"
              style={{ borderTop: "1px solid rgba(26,22,18,0.06)" }}
            >
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rumpun select */}
                <div>
                  <label
                    htmlFor="home-rumpun-select"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    Rumpun Pekerjaan
                  </label>
                  <select
                    id="home-rumpun-select"
                    value={selectedRumpun}
                    onChange={(e) => setSelectedRumpun(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--color-cream)] appearance-none cursor-pointer"
                    style={{
                      color: "var(--color-ink)",
                      border: "1.5px solid rgba(26,22,18,0.1)",
                    }}
                  >
                    <option value="all">Semua Rumpun Pekerjaan</option>
                    {rumpunList.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name}
                        {countByRumpun[r.slug]
                          ? ` (${countByRumpun[r.slug]} profesi)`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Keterampilan select */}
                <div>
                  <label
                    htmlFor="home-skill-select"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    Kata Kunci Keterampilan
                  </label>
                  <select
                    id="home-skill-select"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[var(--color-cream)] appearance-none cursor-pointer"
                    style={{
                      color: "var(--color-ink)",
                      border: "1.5px solid rgba(26,22,18,0.1)",
                    }}
                  >
                    <option value="all">Semua Keterampilan</option>
                    {STANDARD_SOFT_SKILLS.map((sk) => (
                      <option key={sk} value={sk}>
                        {sk}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RIASEC filter chips */}
              <div id="eksplorasi-riasec">
                <div
                  className="flex items-center gap-2 mb-3"
                >
                  <Compass className="w-4 h-4" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">
                    Filter Minat Aktivitas Kerja (Holland RIASEC)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRiasec("all")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedRiasec === "all"
                        ? "text-white shadow-sm"
                        : "hover:opacity-80"
                    }`}
                    style={{
                      background: selectedRiasec === "all" ? "var(--color-ink)" : "var(--color-cream)",
                      color: selectedRiasec === "all" ? "#fff" : "var(--color-ink-soft)",
                    }}
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
                        onClick={() => setSelectedRiasec(active ? "all" : code)}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
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
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3.  PROFESSION CARDS GRID
          ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="section-label">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Katalog Kartu Profesi
            </div>
            <h2
              className="font-serif text-2xl sm:text-3xl font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              {hasActiveFilter ? "Hasil Pencarian" : "Profesi Pilihan & Seri Kartu Aktif"}
            </h2>
            <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] max-w-xl">
              Setiap kartu dilengkapi ilustrasi, kode RIASEC, soft skill utama, dan
              halaman profil lengkap berbasis referensi resmi Indonesia.
            </p>
          </div>
          <Link
            href="/profesi"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors shrink-0"
            style={{ color: "var(--color-accent)" }}
          >
            Lihat Semua Profesi
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {filteredProfessions.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center space-y-4"
            style={{
              background: "var(--color-cream)",
              border: "1px solid rgba(26,22,18,0.07)",
            }}
          >
            <p className="font-serif text-xl font-semibold text-[var(--color-ink)]">
              Tidak ada profesi yang cocok.
            </p>
            <p className="text-sm text-[var(--color-ink-soft)] max-w-sm mx-auto">
              Coba gunakan kata kunci lebih umum atau hapus filter aktif.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-primary text-sm py-2.5 px-5 mx-auto"
            >
              Tampilkan Semua Profesi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProfessions.map((prof) => (
              <ProfessionCard key={prof.id} profession={prof} />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════
          4.  RECENTLY VIEWED / FAVORITES
          ═══════════════════════════════════════════════════════ */}
      {(recentProfessions.length > 0 || favorites.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{
              background: "var(--color-ink)",
              color: "#fff",
            }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                Eksplorasi Terakhir
              </div>
              <h3 className="font-serif text-lg font-semibold">
                Lanjutkan membaca atau kelola favoritmu
              </h3>
              <p className="text-xs opacity-40">
                Tersimpan di perangkat ini — tanpa akun, tanpa data pribadi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {recentProfessions.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/profesi/${rp.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="font-mono opacity-50">#{rp.cardNumber}</span>
                  <span>{rp.name}</span>
                </Link>
              ))}
              {favorites.length > 0 && (
                <Link
                  href="/profesi?favorit=1"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs text-white transition-all"
                  style={{ background: "var(--color-accent)" }}
                >
                  <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                  {favorites.length} Favorit
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          5.  RUMPUN PEKERJAAN GRID
          ═══════════════════════════════════════════════════════ */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="section-label">
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                10 Rumpun Karier Nasional
              </div>
              <h2
                className="font-serif text-2xl sm:text-3xl font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                Jelajahi Berdasarkan Rumpun Pekerjaan
              </h2>
              <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] max-w-xl">
                Sistem terbuka untuk berbagai bidang profesi di Indonesia.
                Klik salah satu rumpun untuk melihat karakteristik dan daftar profesinya.
              </p>
            </div>
            <Link
              href="/rumpun"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors shrink-0"
              style={{ color: "var(--color-accent)" }}
            >
              Lihat Semua Rumpun
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {rumpunList.map((r) => {
              const theme = getAccentTheme(r.accentColor);
              const count = countByRumpun[r.slug] || 0;
              return (
                <Link
                  key={r.id}
                  href={`/rumpun/${r.slug}`}
                  className="rumpun-card group flex flex-col bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                  style={{
                    border: "1px solid rgba(26,22,18,0.07)",
                    color: theme.hexPrimary,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 transition-colors"
                    style={{
                      background: `${theme.hexPrimary}15`,
                    }}
                  >
                    <RumpunIcon name={r.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Name */}
                  <h3
                    className="font-semibold text-sm sm:text-base leading-tight mb-1"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {r.name}
                  </h3>

                  {/* Count */}
                  <span
                    className="text-[11px] font-bold mt-auto pt-2"
                    style={{ color: count > 0 ? theme.hexPrimary : "var(--color-ink-soft)", opacity: 0.7 }}
                  >
                    {count > 0 ? `${count} Profesi` : "Siap Dikembangkan"}
                  </span>

                  {/* Hover arrow */}
                  <div
                    className="flex items-center gap-1 text-[11px] font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: theme.hexPrimary }}
                  >
                    Jelajahi
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6.  CTA SECTION — Compare + About
          ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Compare CTA card */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between gap-6"
            style={{
              background: "var(--color-ink)",
              color: "#fff",
              minHeight: "280px",
            }}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 mb-4">
                <Scale className="w-3.5 h-3.5" aria-hidden="true" />
                Fitur Perbandingan
              </div>
              <h2
                className="font-serif text-2xl sm:text-3xl font-semibold leading-tight"
              >
                Bingung memilih antara beberapa profesi?
              </h2>
              <p className="mt-3 text-sm opacity-55 leading-relaxed">
                Bandingkan minat RIASEC, aktivitas harian, jenjang pendidikan,
                dan keterampilan dua hingga tiga profesi secara berdampingan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/bandingkan" className="btn-primary">
                <Scale className="w-4 h-4" aria-hidden="true" />
                Bandingkan Sekarang
              </Link>
              <Link href="/tentang" className="btn-ghost text-sm">
                Pelajari RIASEC
              </Link>
            </div>
          </div>

          {/* RIASEC info card */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between gap-6"
            style={{
              background: "var(--color-teal-brand)",
              color: "#fff",
              minHeight: "280px",
            }}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 mb-4">
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                Holland RIASEC
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                Kenali minat kerja dan tipe aktivitasmu
              </h2>
              <p className="mt-3 text-sm opacity-60 leading-relaxed">
                Teori Holland membagi minat aktivitas kerja ke dalam enam tipe —
                R, I, A, S, E, C. Temukan profesi yang sesuai kecenderunganmu.
              </p>
            </div>
            <Link
              href="/tentang#riasec"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              Pelajari Panduan RIASEC
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
