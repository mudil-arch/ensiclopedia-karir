"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Profession,
  RumpunPekerjaan,
  RIASEC_DEFINITIONS,
  RiasecCode,
  STANDARD_SOFT_SKILLS,
} from "@/types/career";
import { ProfessionCard } from "@/components/ProfessionCard";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import { Search, Bookmark, SlidersHorizontal } from "lucide-react";

interface ProfesiCatalogClientProps {
  professions: Profession[];
  rumpunList: RumpunPekerjaan[];
}

export function ProfesiCatalogClient({
  professions,
  rumpunList,
}: ProfesiCatalogClientProps) {
  const searchParams = useSearchParams();
  const { favorites } = useUserPrefs();

  const [query, setQuery] = useState("");
  const [selectedRumpun, setSelectedRumpun] = useState("all");
  const [selectedRiasec, setSelectedRiasec] = useState<RiasecCode | "all">(
    "all"
  );
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  useEffect(() => {
    const qParam = searchParams.get("q");
    const favParam = searchParams.get("favorit");
    const rumpunParam = searchParams.get("rumpun");
    if (qParam !== null) setQuery(qParam);
    if (favParam === "1") setOnlyFavorites(true);
    if (rumpunParam) setSelectedRumpun(rumpunParam);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return professions.filter((p) => {
      if (onlyFavorites && !favorites.includes(p.slug)) return false;

      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.rumpunName.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.softSkills.some((s) => s.name.toLowerCase().includes(q)) ||
        p.hardSkills.some((h) => h.name.toLowerCase().includes(q));

      const matchRumpun =
        selectedRumpun === "all" || p.rumpunSlug === selectedRumpun;

      const matchRiasec =
        selectedRiasec === "all" || p.riasecCodes.includes(selectedRiasec);

      const matchSkill =
        selectedSkill === "all" ||
        p.softSkills.some(
          (s) => s.name.toLowerCase() === selectedSkill.toLowerCase()
        );

      return matchQ && matchRumpun && matchRiasec && matchSkill;
    });
  }, [
    professions,
    onlyFavorites,
    favorites,
    query,
    selectedRumpun,
    selectedRiasec,
    selectedSkill,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Filter Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="w-5 h-5 text-blue-600"
              aria-hidden="true"
            />
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Filter & Pencarian Ensiklopedia Profesi
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOnlyFavorites((prev) => !prev)}
            aria-pressed={onlyFavorites}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              onlyFavorites
                ? "bg-rose-600 text-white border-rose-600"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={onlyFavorites ? "currentColor" : "none"}
              aria-hidden="true"
            />
            <span>Hanya Profesi Favorit ({favorites.length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label
              htmlFor="catalog-search"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Kata Kunci Profesi / Aktivitas
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari profesi, tugas, atau keahlian..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="catalog-rumpun"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Rumpun Pekerjaan
            </label>
            <select
              id="catalog-rumpun"
              value={selectedRumpun}
              onChange={(e) => setSelectedRumpun(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            >
              <option value="all">Semua Rumpun</option>
              {rumpunList.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="catalog-riasec"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Minat Kerja RIASEC
            </label>
            <select
              id="catalog-riasec"
              value={selectedRiasec}
              onChange={(e) =>
                setSelectedRiasec(e.target.value as RiasecCode | "all")
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            >
              <option value="all">Semua Tipe RIASEC</option>
              {(Object.keys(RIASEC_DEFINITIONS) as RiasecCode[]).map((c) => (
                <option key={c} value={c}>
                  {c} — {RIASEC_DEFINITIONS[c].nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="catalog-skill"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Soft Skill
            </label>
            <select
              id="catalog-skill"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
            >
              <option value="all">Semua Skill</option>
              {STANDARD_SOFT_SKILLS.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-4">
        <div
          aria-live="polite"
          className="flex items-center justify-between text-sm text-slate-600"
        >
          <span>
            Ditemukan{" "}
            <strong className="text-slate-900">{filtered.length}</strong>{" "}
            profesi
          </span>
          {(query ||
            selectedRumpun !== "all" ||
            selectedRiasec !== "all" ||
            selectedSkill !== "all" ||
            onlyFavorites) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedRumpun("all");
                setSelectedRiasec("all");
                setSelectedSkill("all");
                setOnlyFavorites(false);
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Atur Ulang Semua Filter
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <p className="text-lg font-extrabold text-slate-800">
              Belum ada profesi yang sesuai dengan filter tersebut.
            </p>
            <p className="text-sm text-slate-600">
              Coba ubah filter pencarian atau nonaktifkan filter Hanya Favorit.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedRumpun("all");
                setSelectedRiasec("all");
                setSelectedSkill("all");
                setOnlyFavorites(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold"
            >
              Tampilkan Semua Profesi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProfessionCard key={p.id} profession={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

