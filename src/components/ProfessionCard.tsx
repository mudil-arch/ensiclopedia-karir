"use client";

import React from "react";
import Link from "next/link";
import { Profession, RIASEC_DEFINITIONS } from "@/types/career";
import { getAccentTheme } from "@/lib/theme";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import { Bookmark, Scale, ArrowRight } from "lucide-react";

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
    <article className="card-trading group flex flex-col bg-white scroll-reveal">
      {/* ── Card Header Bar — colored stripe ── */}
      <div
        className="relative h-2 w-full shrink-0"
        style={{ background: theme.hexPrimary }}
        aria-hidden="true"
      />

      {/* ── Meta row ── */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {/* Rumpun badge */}
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
            style={{
              background: `${theme.hexPrimary}18`,
              color: theme.hexPrimary,
            }}
          >
            {profession.rumpunName}
          </span>
        </div>

        {/* Card number + actions */}
        <div className="flex items-center gap-1.5">
          {profession.cardNumber && (
            <span
              className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded"
              style={{
                background: "var(--color-ink)",
                color: "#fff",
              }}
            >
              #{profession.cardNumber}
            </span>
          )}

          {/* Favorite button */}
          <button
            type="button"
            onClick={() => toggleFavorite(profession.slug)}
            aria-pressed={favored}
            aria-label={
              favored
                ? `Hapus ${profession.name} dari favorit`
                : `Simpan ${profession.name} ke favorit`
            }
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              favored
                ? "bg-rose-50 text-rose-600"
                : "text-[var(--color-ink-soft)] hover:text-rose-600 hover:bg-rose-50"
            }`}
          >
            <Bookmark
              className="w-3.5 h-3.5"
              fill={favored ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>

          {/* Compare button */}
          <button
            type="button"
            onClick={() => toggleCompare(profession.slug)}
            aria-pressed={compared}
            aria-label={
              compared
                ? `Hapus ${profession.name} dari perbandingan`
                : `Tambah ${profession.name} untuk dibandingkan`
            }
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              compared
                ? "bg-indigo-50 text-indigo-600"
                : "text-[var(--color-ink-soft)] hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Illustration Frame ── */}
      <div className="relative mx-4 rounded-xl overflow-hidden aspect-[4/3] bg-[var(--color-cream)]">
        <img
          src={profession.illustrationUrl}
          alt={`Ilustrasi profesi ${profession.name}`}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          loading="lazy"
        />

        {/* RIASEC overlay badges */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
          {profession.riasecCodes.map((code) => {
            const info = RIASEC_DEFINITIONS[code];
            return (
              <span
                key={code}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-extrabold backdrop-blur-sm ${info.badgeSolid}`}
                title={`RIASEC: ${code} — ${info.nameEn}`}
              >
                <span>{code}</span>
                <span className="hidden sm:inline font-medium text-[9px] opacity-90">
                  {info.nameEn}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Content Body ── */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Name */}
        <div>
          <h3
            className="font-serif text-lg font-semibold leading-snug group-hover:text-[var(--color-accent)] transition-colors"
            style={{ color: "var(--color-ink)" }}
          >
            <Link
              href={`/profesi/${profession.slug}`}
              className="focus:outline-none after:absolute after:inset-0"
            >
              {profession.name}
            </Link>
          </h3>
          <p
            className="text-xs mt-1 leading-relaxed line-clamp-2"
            style={{ color: "var(--color-ink-soft)" }}
          >
            {profession.summary}
          </p>
        </div>

        {/* 3 Soft Skills */}
        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {displaySkills.map((sk) => (
              <span
                key={sk.name}
                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[var(--color-cream)] text-[var(--color-ink-soft)]"
              >
                {sk.name}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <Link
          href={`/profesi/${profession.slug}`}
          className="mt-auto w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{
            background: theme.hexPrimary,
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <span>Lihat Profil Lengkap</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
