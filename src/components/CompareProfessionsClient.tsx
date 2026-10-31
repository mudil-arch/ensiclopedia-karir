"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Profession, RIASEC_DEFINITIONS } from "@/types/career";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import { Scale, Plus, X, ArrowRight, CheckCircle2 } from "lucide-react";

export function CompareProfessionsClient({
  professions,
}: {
  professions: Profession[];
}) {
  const { compareList, toggleCompare, clearCompare } = useUserPrefs();

  const selectedProfessions = useMemo(() => {
    return compareList
      .map((slug) => professions.find((p) => p.slug === slug))
      .filter((p): p is Profession => Boolean(p));
  }, [compareList, professions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Selector Pills */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Pilih 2 hingga 3 Profesi untuk Dibandingkan ({selectedProfessions.length}/3)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Klik pada nama profesi di bawah ini untuk menambahkan atau
              melepaskannya dari tabel perbandingan.
            </p>
          </div>
          {selectedProfessions.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              Kosongkan Pilihan
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {professions.map((p) => {
            const active = compareList.includes(p.slug);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => toggleCompare(p.slug)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="font-mono text-xs opacity-75">
                  #{p.cardNumber}
                </span>
                <span>{p.name}</span>
                {active ? (
                  <X className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4 text-slate-400" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedProfessions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Belum Ada Profesi yang Dipilih
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Silakan klik minimal dua tombol profesi di atas (misalnya{" "}
            <strong>Dokter</strong> dan <strong>Apoteker</strong>) untuk melihat
            perbandingan berdampingan.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <caption className="visually-hidden">
              Tabel perbandingan karakteristik, minat RIASEC, pendidikan, dan
              keterampilan antarprofesi pilihan siswa
            </caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th
                  scope="col"
                  className="p-5 w-48 text-xs font-extrabold uppercase tracking-wider text-slate-500"
                >
                  Aspek Perbandingan
                </th>
                {selectedProfessions.map((p) => (
                  <th key={p.slug} scope="col" className="p-5 align-top">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-xs font-bold">
                          #{p.cardNumber}
                        </span>
                        <span className="text-xs font-bold text-indigo-600">
                          {p.rumpunName}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {p.name}
                      </h3>
                      <Link
                        href={`/profesi/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                      >
                        <span>Buka Halaman Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {/* Row 1: Ringkasan */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Ringkasan Peran
                </th>
                {selectedProfessions.map((p) => (
                  <td
                    key={p.slug}
                    className="p-5 text-slate-700 leading-relaxed align-top"
                  >
                    {p.summary}
                  </td>
                ))}
              </tr>

              {/* Row 2: Kode RIASEC */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Kecenderungan Minat (RIASEC)
                </th>
                {selectedProfessions.map((p) => (
                  <td key={p.slug} className="p-5 align-top space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {p.riasecCodes.map((c) => (
                        <span
                          key={c}
                          className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${RIASEC_DEFINITIONS[c].badgeSolid}`}
                        >
                          {c} — {RIASEC_DEFINITIONS[c].nameEn}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-600">
                      {p.riasecDetails[0]?.relevanceReason}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row 3: Pendidikan & Lisensi */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Jalur Pendidikan & Lisensi Indonesia
                </th>
                {selectedProfessions.map((p) => (
                  <td key={p.slug} className="p-5 align-top space-y-2">
                    <p className="font-bold text-slate-900">
                      {p.educationAndPathway.generalEducationLevel}
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {p.professionRequirementsSummary.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 4: Soft Skills */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Soft Skill Utama
                </th>
                {selectedProfessions.map((p) => (
                  <td key={p.slug} className="p-5 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {p.softSkills.map((sk) => (
                        <span
                          key={sk.name}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            sk.isPrimaryOnCard
                              ? "bg-amber-100 text-amber-900 font-bold"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 5: Hard Skills */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Hard Skill Teknis
                </th>
                {selectedProfessions.map((p) => (
                  <td key={p.slug} className="p-5 align-top">
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {p.hardSkills.map((hk) => (
                        <li key={hk.name} className="font-semibold">
                          • {hk.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 6: Lingkungan Kerja */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Lingkungan Kerja
                </th>
                {selectedProfessions.map((p) => (
                  <td key={p.slug} className="p-5 align-top">
                    <ul className="space-y-1 text-xs text-slate-700">
                      {p.workEnvironments.map((env, idx) => (
                        <li key={idx}>
                          <strong className="text-slate-900">
                            {env.place}:
                          </strong>{" "}
                          {env.description}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 7: Mata Pelajaran Pendukung */}
              <tr>
                <th
                  scope="row"
                  className="p-5 font-extrabold text-slate-900 bg-slate-50/60 align-top"
                >
                  Mata Pelajaran SMA/SMK Pendukung
                </th>
                {selectedProfessions.map((p) => (
                  <td key={p.slug} className="p-5 align-top">
                    <ul className="space-y-1 text-xs text-slate-700">
                      {p.studentPreparation.relevantSubjects.map((sub, idx) => (
                        <li key={idx}>• {sub}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

