"use client";

import React from "react";
import Link from "next/link";
import { Profession, RIASEC_DEFINITIONS } from "@/types/career";
import { getAccentTheme } from "@/lib/theme";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import { Bookmark, Scale, ArrowRight, Sparkles } from "lucide-react";

export function ProfessionCard({ profession }: { profession: Profession }) {
  const theme = getAccentTheme(profession.accentColor);
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare } =
    useUserPrefs();

  const favored = isFavorite(profession.slug);
  const compared = isInCompare(profession.slug);

  const primarySoftSkills = profession.softSkills
    .filter((s) => s.isPrimaryOnCard)
    .slice(0, 3);
  const displaySkills =
    primarySoftSkills.length > 0
      ? primarySoftSkills
      : profession.softSkills.slice(0, 3);

  return (
    <article
      className={`group relative flex flex-col rounded-3xl bg-white border-2 ${theme.borderSoft} hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden`}
    >
      {/* Top Trading Card Header Bar */}
      <div
        className={`px-5 py-3 flex items-center justify-between border-b ${theme.borderSoft} ${theme.bgSoft}`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${theme.badgeBg} ${theme.badgeText}`}
          >
            {profession.rumpunName}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {profession.cardNumber && (
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold tracking-wider">
              #{profession.cardNumber}
            </span>
          )}
          <button
            type="button"
            onClick={() => toggleFavorite(profession.slug)}
            aria-pressed={favored}
            aria-label={
              favored
                ? `Hapus ${profession.name} dari profesi favorit`
                : `Simpan ${profession.name} ke profesi favorit`
            }
            className={`p-1.5 rounded-lg border transition-colors ${
              favored
                ? "bg-rose-50 border-rose-200 text-rose-600"
                : "bg-white border-slate-200 text-slate-400 hover:text-rose-600"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={favored ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(profession.slug)}
            aria-pressed={compared}
            aria-label={
              compared
                ? `Hapus ${profession.name} dari perbandingan`
                : `Tambahkan ${profession.name} untuk dibandingkan`
            }
            className={`p-1.5 rounded-lg border transition-colors ${
              compared
                ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                : "bg-white border-slate-200 text-slate-400 hover:text-indigo-600"
            }`}
          >
            <Scale className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Illustration Frame */}
      <div className="relative px-5 pt-4">
        <div className="relative w-full aspect-[5/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60">
          <img
            src={profession.illustrationUrl}
            alt={`Ilustrasi profesi ${profession.name}`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            loading="lazy"
          />
          {/* Floating RIASEC Badges */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 mr-0.5">
              RIASEC:
            </span>
            {profession.riasecCodes.map((code) => {
              const info = RIASEC_DEFINITIONS[code];
              return (
                <span
                  key={code}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-extrabold ${info.badgeSolid}`}
                >
                  <span>{code}</span>
                  <span className="hidden sm:inline font-medium text-[10px] opacity-90">
                    {info.nameEn}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
            <Link href={`/profesi/${profession.slug}`} className="focus:outline-none">
              {profession.name}
            </Link>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {profession.summary}
          </p>
        </div>

        {/* 3 Primary Soft Skills on Card */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>3 Soft Skill Utama Kartu</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {displaySkills.map((sk) => (
              <span
                key={sk.name}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                {sk.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href={`/profesi/${profession.slug}`}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white ${theme.buttonBg} ${theme.buttonHover} shadow-sm transition-all`}
          >
            <span>Lihat Profil {profession.name}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

