import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProfessions, getProfessionBySlug } from "@/lib/db";
import { RIASEC_DEFINITIONS } from "@/types/career";
import { getAccentTheme } from "@/lib/theme";
import { siteConfig } from "@/config/site";
import { ProfessionDetailActions } from "@/components/ProfessionDetailActions";
import {
  CheckCircle2,
  Briefcase,
  Clock,
  Building2,
  GraduationCap,
  TrendingUp,
  Compass,
  Sparkles,
  Wrench,
  AlertTriangle,
  Rocket,
  BookOpen,
  ExternalLink,
  Users,
  ArrowLeft,
  ArrowRight,
  Layers,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);
  if (!profession) {
    return {
      title: `Profesi Tidak Ditemukan | ${siteConfig.siteShortName}`,
    };
  }
  return {
    title: `${profession.name} (Kartu #${profession.cardNumber}) — Rumpun ${profession.rumpunName} | ${siteConfig.siteShortName}`,
    description: profession.summary,
  };
}

export default async function ProfessionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);

  if (!profession) {
    notFound();
  }

  const theme = getAccentTheme(profession.accentColor);
  const allPublished = getAllProfessions(false);

  // Determine previous and next cards in the same rumpun or card series
  const sameSeries = allPublished.filter(
    (p) => p.rumpunSlug === profession.rumpunSlug
  );
  const currentIndex = sameSeries.findIndex((p) => p.slug === profession.slug);
  const prevProfession =
    currentIndex > 0 ? sameSeries[currentIndex - 1] : undefined;
  const nextProfession =
    currentIndex >= 0 && currentIndex < sameSeries.length - 1
      ? sameSeries[currentIndex + 1]
      : undefined;

  // Check which related professions have active pages
  const publishedSlugs = new Set(allPublished.map((p) => p.slug));

  return (
    <div className="pb-16 space-y-10 sm:space-y-14">
      {/* SECTION 1: IDENTITAS PROFESI */}
      <section className={`${theme.bgHeader} text-white pt-8 pb-12 sm:py-14`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/80 mb-6"
          >
            <Link href="/" className="hover:text-white underline-offset-4 hover:underline">
              Beranda
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/rumpun/${profession.rumpunSlug}`}
              className="hover:text-white underline-offset-4 hover:underline"
            >
              Rumpun {profession.rumpunName}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-bold text-white" aria-current="page">
              {profession.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Identity Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                {profession.cardNumber && (
                  <span className="px-3 py-1 rounded-xl bg-slate-950/60 border border-white/25 font-mono text-xs sm:text-sm font-extrabold tracking-wider">
                    KARTU #{profession.cardNumber}
                  </span>
                )}
                <Link
                  href={`/rumpun/${profession.rumpunSlug}`}
                  className="px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-xs sm:text-sm font-bold transition-colors"
                >
                  Rumpun: {profession.rumpunName}
                </Link>
                {profession.cardSeriesName && (
                  <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-medium text-white/90">
                    {profession.cardSeriesName}
                  </span>
                )}
              </div>

              <h1
                id="main-content"
                tabIndex={-1}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
              >
                {profession.name}
              </h1>

              <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-2xl">
                {profession.summary}
              </p>

              {/* Quick RIASEC & Soft Skills Summary Row */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-950/35 px-3.5 py-2 rounded-2xl border border-white/15">
                  <span className="text-xs font-semibold text-white/80">
                    Minat RIASEC:
                  </span>
                  {profession.riasecCodes.map((code) => {
                    const info = RIASEC_DEFINITIONS[code];
                    return (
                      <span
                        key={code}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white text-slate-900 text-xs font-extrabold"
                      >
                        <span>{code}</span>
                        <span>({info.nameEn})</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Client Action Buttons (Share, Favorite, Compare, QR, Print) */}
              <div className="pt-2">
                <ProfessionDetailActions profession={profession} />
              </div>
            </div>

            {/* Right Physical Trading Card Visual Preview */}
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-sm bg-white text-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-white/40">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${theme.badgeBg} ${theme.badgeText}`}
                    >
                      {profession.rumpunName}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                      {profession.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      NO. KARTU
                    </span>
                    <span className="font-mono text-sm font-extrabold text-slate-900">
                      {profession.cardNumber}
                    </span>
                  </div>
                </div>

                <div className="aspect-[5/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-3">
                  <img
                    src={profession.illustrationUrl}
                    alt={`Ilustrasi Kartu Profesi ${profession.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-12 gap-3 items-center pt-1">
                  <div className="col-span-8 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500">
                        RIASEC:
                      </span>
                      {profession.riasecCodes.map((c) => (
                        <span
                          key={c}
                          className={`px-2 py-0.5 rounded-md text-xs font-extrabold ${RIASEC_DEFINITIONS[c].badgeSolid}`}
                        >
                          {c} — {RIASEC_DEFINITIONS[c].nameEn}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                        3 Soft Skill Utama Kartu:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {profession.softSkills
                          .filter((s) => s.isPrimaryOnCard)
                          .slice(0, 3)
                          .map((s) => (
                            <span
                              key={s.name}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-semibold"
                            >
                              {s.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={profession.qrCodeUrl}
                      alt={`QR Code Kartu ${profession.name}`}
                      className="w-16 h-16"
                    />
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                      SCAN PROFIL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK IN-PAGE TABLE OF CONTENTS */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <nav
          aria-label="Daftar Isi Halaman Profesi"
          className="bg-white rounded-2xl shadow-md border border-slate-200 p-3 sm:p-4 flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-semibold text-slate-700"
        >
          <span className="text-slate-400 font-bold px-2 shrink-0">
            Lompat ke:
          </span>
          <a
            href="#mengenal-profesi"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            1. Mengenal
          </a>
          <a
            href="#tugas-tanggung-jawab"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            2. Tugas Utama
          </a>
          <a
            href="#aktivitas-harian"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            3. Aktivitas Harian
          </a>
          <a
            href="#pendidikan-jalur-masuk"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            4. Pendidikan & STR/SIP
          </a>
          <a
            href="#prospek-karier"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            5. Prospek
          </a>
          <a
            href="#riasec-section"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            6. Minat RIASEC
          </a>
          <a
            href="#keterampilan-section"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            7. Soft & Hard Skill
          </a>
          <a
            href="#tantangan-profesi"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            8. Tantangan
          </a>
          <a
            href="#persiapan-siswa"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            9. Persiapan SMA/SMK
          </a>
          <a
            href="#sumber-referensi"
            className="px-3 py-1.5 rounded-xl hover:bg-slate-100 shrink-0"
          >
            10. Sumber Resmi
          </a>
        </nav>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SECTION 2: MENGENAL PROFESI */}
        <section
          id="mengenal-profesi"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <BookOpen className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 02 • Pengantar Profesi
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Mengenal Profesi {profession.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-700">
                Apa Itu Profesi {profession.name}?
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {profession.description.whatIsIt}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-700">
                Tujuan Utama Pekerjaan Ini
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {profession.description.mainPurpose}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-800">
                Masalah yang Diselesaikan
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {profession.description.problemSolved}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-purple-700">
                Penerima Manfaat Pekerjaan
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {profession.description.beneficiaries}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: TUGAS DAN TANGGUNG JAWAB */}
        <section
          id="tugas-tanggung-jawab"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <Briefcase className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 03 • Lingkup Kerja Spesifik
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Tugas dan Tanggung Jawab Utama ({profession.tasksAndResponsibilities.length} Tugas Inti)
              </h2>
            </div>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profession.tasksAndResponsibilities.map((task, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70"
              >
                <span
                  className={`w-7 h-7 rounded-xl ${theme.buttonBg} text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5`}
                >
                  {idx + 1}
                </span>
                <span className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {task}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* SECTION 4 & 5: AKTIVITAS SEHARI-HARI & LINGKUNGAN KERJA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Section 4: Aktivitas Sehari-hari */}
          <section
            id="aktivitas-harian"
            className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div
                className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
              >
                <Clock className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Bagian 04 • Gambaran Keseharian
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Aktivitas Sehari-hari
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">
                  A. Aktivitas Rutin
                </h3>
                <ul className="space-y-2">
                  {profession.dailyActivities.routine.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-blue-600 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">
                  B. Aktivitas Pemecahan Masalah
                </h3>
                <ul className="space-y-2">
                  {profession.dailyActivities.problemSolving.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-indigo-600 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">
                  C. Interaksi dengan Orang Lain
                </h3>
                <ul className="space-y-2">
                  {profession.dailyActivities.interactions.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-rose-600 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">
                  D. Penggunaan Alat & Teknologi
                </h3>
                <ul className="space-y-2">
                  {profession.dailyActivities.toolsAndTech.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">
                  E. Kondisi Kerja yang Dihadapi
                </h3>
                <ul className="space-y-2">
                  {profession.dailyActivities.workingConditions.map(
                    (item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-amber-600 shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
                {profession.dailyActivities.variationDisclaimer}
              </div>
            </div>
          </section>

          {/* Section 5: Lingkungan Kerja */}
          <section
            id="lingkungan-kerja"
            className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div
                className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
              >
                <Building2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Bagian 05 • Tempat Praktik
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Lingkungan Kerja
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Berikut adalah tempat kerja yang lazim bagi seorang{" "}
              <strong>{profession.name}</strong> di Indonesia:
            </p>

            <div className="space-y-3.5">
              {profession.workEnvironments.map((env, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {env.place}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {env.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION 6: PENDIDIKAN DAN JALUR MASUK PROFESI */}
        <section
          id="pendidikan-jalur-masuk"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <GraduationCap className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 06 • Jalur Pendidikan & Lisensi Resmi di Indonesia
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Pendidikan, Registrasi, dan Jalur Masuk Profesi
              </h2>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                Jenjang Pendidikan Umum di Indonesia
              </span>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                {profession.educationAndPathway.generalEducationLevel}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profession.professionRequirementsSummary.map((req, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-white border border-blue-200 text-xs font-bold text-blue-900"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                Program Studi & Tahap Pembelajaran
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {profession.educationAndPathway.studyPrograms.map((sp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">•</span>
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                Pendidikan Profesi, Uji Kompetensi, STR & SIP
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {profession.educationAndPathway.professionalEducationAndLicense.map(
                  (lic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-600">•</span>
                      <span>{lic}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Distinction between Mandatory, Common, and Added Value */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/40 space-y-2.5">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-xs font-extrabold uppercase">
                1. Persyaratan Wajib (Regulasi)
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {profession.educationAndPathway.mandatoryRequirements.map(
                  (m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-rose-600">✓</span>
                      <span>{m}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-2.5">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-extrabold uppercase">
                2. Persyaratan yang Lazim
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {profession.educationAndPathway.commonExpectations.map(
                  (c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">✓</span>
                      <span>{c}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-2.5">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-extrabold uppercase">
                3. Nilai Tambah (Kompetensi Plus)
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {profession.educationAndPathway.addedValueSkills.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">+</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">
              Jalur Vokasi / Alternatif & Catatan Regulasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profession.educationAndPathway.alternativePathways}
            </p>
            {profession.educationAndPathway.regulatoryNote && (
              <p className="text-xs font-semibold text-slate-600 pt-1">
                Dasar Hukum Utama: {profession.educationAndPathway.regulatoryNote}
              </p>
            )}
          </div>
        </section>

        {/* SECTION 7: PROSPEK DAN PERKEMBANGAN KARIER */}
        <section
          id="prospek-karier"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <TrendingUp className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 07 • Pengembangan Masa Depan
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Prospek dan Perkembangan Karier
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Bidang & Sektor Tempat Bekerja
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {profession.careerProspects.sectors.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Contoh Spesialisasi & Jalur Pengembangan
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {profession.careerProspects.specializations.map((sp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Peluang Berkembang ke Peran Lain
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {profession.careerProspects.roleProgression.map((rp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{rp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Faktor yang Memengaruhi Kebutuhan Tenaga Kerja
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {profession.careerProspects.laborDemandFactors.map((lf, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{lf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <h3 className="text-sm font-extrabold text-indigo-950">
              Pengaruh Teknologi, Otomatisasi, dan Perkembangan Industri
            </h3>
            <p className="text-sm text-indigo-900 leading-relaxed">
              {profession.careerProspects.technologyAndIndustryImpact}
            </p>
          </div>

          <p className="text-xs text-slate-500 italic">
            {profession.careerProspects.ethicalDisclaimer}
          </p>
        </section>

        {/* SECTION 8: RIASEC — HOLLAND CAREER INTEREST */}
        <section
          id="riasec-section"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 08 • Kecenderungan Aktivitas Kerja
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                RIASEC — Holland Career Interest
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profession.riasecDetails.map((detail) => {
              const meta = RIASEC_DEFINITIONS[detail.code];
              return (
                <div
                  key={detail.code}
                  className={`p-6 rounded-3xl border-2 ${meta.colorBorder} ${meta.colorBg} space-y-4`}
                >
                  <div className="flex items-center gap-4">
                    {/* Letter in Colored Circle */}
                    <div
                      className={`w-14 h-14 rounded-full ${meta.badgeSolid} flex items-center justify-center text-2xl font-extrabold shadow-md shrink-0`}
                    >
                      {detail.code}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                        Tipe Holland RIASEC
                      </span>
                      <h3 className={`text-xl font-extrabold ${meta.colorText}`}>
                        {meta.nameEn}{" "}
                        <span className="text-sm font-semibold opacity-85">
                          ({meta.nameId})
                        </span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-600 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200/60">
                    Karakteristik Umum: {meta.summary}
                  </p>

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                      Mengapa Tipe {meta.nameEn} Relevan dengan {profession.name}?
                    </h4>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      {detail.relevanceReason}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                      Contoh Aktivitas Profesi yang Sesuai:
                    </h4>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      {detail.matchingActivities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* All 6 RIASEC Legend Reference */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Mengenal Keenam Tipe RIASEC (John L. Holland):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {(Object.keys(RIASEC_DEFINITIONS) as Array<keyof typeof RIASEC_DEFINITIONS>).map(
                (k) => {
                  const r = RIASEC_DEFINITIONS[k];
                  const isHighlighted = profession.riasecCodes.includes(k);
                  return (
                    <div
                      key={k}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                        isHighlighted
                          ? "bg-white border-slate-400 shadow-sm"
                          : "bg-slate-100/70 border-slate-200 opacity-80"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full ${r.badgeSolid} font-extrabold flex items-center justify-center shrink-0`}
                      >
                        {r.code}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{r.nameEn}</p>
                        <p className="text-slate-600 leading-snug">
                          {r.summary}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <p className="text-xs text-slate-600 pt-2 border-t border-slate-200 leading-relaxed">
              {profession.riasecDisclaimer}
            </p>
          </div>
        </section>

        {/* SECTION 9: SOFT SKILL DAN HARD SKILL */}
        <section
          id="keterampilan-section"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 09 • Kompetensi Utama
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Soft Skill dan Hard Skill yang Dibutuhkan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Soft Skills Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles
                    className="w-5 h-5 text-amber-500"
                    aria-hidden="true"
                  />
                  <span>A. Soft Skill (Keterampilan Nonteknis & Sikap)</span>
                </h3>
              </div>

              <div className="space-y-3.5">
                {profession.softSkills.map((sk) => (
                  <div
                    key={sk.name}
                    className={`p-4 rounded-2xl border ${
                      sk.isPrimaryOnCard
                        ? "bg-amber-50/50 border-amber-200"
                        : "bg-slate-50 border-slate-200"
                    } space-y-1.5`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {sk.name}
                      </h4>
                      {sk.isPrimaryOnCard && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                          Utama di Kartu Fisik
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700">
                      <strong className="text-slate-900">Mengapa dibutuhkan:</strong>{" "}
                      {sk.reasonNeeded}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/70">
                      <strong className="text-slate-800">Contoh penerapan:</strong>{" "}
                      {sk.applicationExample}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hard Skills Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" aria-hidden="true" />
                <span>B. Hard Skill (Keterampilan Teknis Spesifik)</span>
              </h3>

              <div className="space-y-3.5">
                {profession.hardSkills.map((hk) => (
                  <div
                    key={hk.name}
                    className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-1.5"
                  >
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {hk.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700">
                      <strong className="text-slate-900">Mengapa dibutuhkan:</strong>{" "}
                      {hk.reasonNeeded}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/70">
                      <strong className="text-slate-800">Contoh penerapan:</strong>{" "}
                      {hk.applicationExample}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: TANTANGAN PROFESI */}
        <section
          id="tantangan-profesi"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 10 • Pertimbangan Realistis & Seimbang
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Tantangan dan Hal yang Perlu Dipertimbangkan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Tuntutan dan Tanggung Jawab
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {profession.challenges.demandsAndResponsibilities.map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">•</span>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Tantangan yang Lazim Dihadapi
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {profession.challenges.commonChallenges.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Risiko atau Tekanan Kerja
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {profession.challenges.risksAndPressures.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
              <h3 className="text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" aria-hidden="true" />
                <span>Refleksi Diri Sebelum Memilih Profesi Ini</span>
              </h3>
              <ul className="space-y-2 text-sm text-amber-950">
                {profession.challenges.considerationsBeforeChoosing.map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">?</span>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 11: CARA MULAI MEMPERSIAPKAN DIRI (UNTUK SISWA SMA/SMK) */}
        <section
          id="persiapan-siswa"
          className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-white/15 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-300">
                Bagian 11 • Langkah Aksi Pelajar SMA/SMK
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Cara Mulai Mempersiapkan Diri Sejak di Bangku SMA/SMK
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <h3 className="text-sm font-extrabold text-blue-200 uppercase tracking-wider">
                1. Mata Pelajaran Relevan
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-100">
                {profession.studentPreparation.relevantSubjects.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <h3 className="text-sm font-extrabold text-emerald-200 uppercase tracking-wider">
                2. Proyek Sederhana yang Bisa Dicoba
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-100">
                {profession.studentPreparation.simpleProjects.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <h3 className="text-sm font-extrabold text-amber-200 uppercase tracking-wider">
                3. Kegiatan Ekstrakurikuler
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-100">
                {profession.studentPreparation.extracurriculars.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <h3 className="text-sm font-extrabold text-pink-200 uppercase tracking-wider">
                4. Pengalaman Organisasi & Sukarela
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-100">
                {profession.studentPreparation.orgAndVolunteering.map(
                  (s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <h3 className="text-sm font-extrabold text-purple-200 uppercase tracking-wider">
                5. Sumber Belajar Pemula
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-100">
                {profession.studentPreparation.beginnerResources.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-blue-600/30 border border-blue-400/40 space-y-2">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                6. Ide Pertanyaan Saat Wawancara Praktisi
              </h3>
              <ul className="space-y-1.5 text-sm text-blue-100">
                {profession.studentPreparation.practitionerInterviewQuestions.map(
                  (q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-300 font-bold">“</span>
                      <span>{q}”</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 12: FAKTA DAN SUMBER INFORMASI RESMI */}
        <section
          id="sumber-referensi"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print-break-inside-avoid"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 12 • Akuntabilitas & Verifikasi Data
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Fakta dan Sumber Informasi Resmi
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            Informasi mengenai pendidikan, registrasi, dan standar profesi{" "}
            <strong>{profession.name}</strong> pada halaman ini mengacu pada
            peraturan perundang-undangan, kementerian, dan organisasi profesi
            resmi di Indonesia:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profession.references.map((ref, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold">
                      {ref.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      Diverifikasi: {ref.verifiedDate}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider pt-1">
                    {ref.institution}
                  </p>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {ref.title}
                  </h3>
                </div>
                <div>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-4"
                  >
                    <span>Buka Sumber Resmi ({ref.institution})</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 13: PROFESI TERKAIT */}
        <section
          id="profesi-terkait"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 no-print"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${theme.badgeBg} ${theme.textPrimary} flex items-center justify-center shrink-0`}
            >
              <Users className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Bagian 13 • Jejaring Kolaborasi Kerja
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Profesi Terkait dengan {profession.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profession.relatedProfessions.map((rel, idx) => {
              const hasActivePage =
                rel.slug && publishedSlugs.has(rel.slug);
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-base text-slate-900">
                        {rel.name}
                      </h3>
                      {hasActivePage ? (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Tersedia
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-semibold">
                          Info Terkait
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {rel.relationship}
                    </p>
                  </div>

                  {hasActivePage && rel.slug && (
                    <Link
                      href={`/profesi/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 pt-2 border-t border-slate-200/80"
                    >
                      <span>Buka Profil {rel.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 14: NAVIGASI ANTARKARTU */}
        <section
          aria-label="Navigasi Antarkartu Profesi"
          className="no-print bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-mono font-extrabold text-sm">
                {profession.cardNumber}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Navigasi Seri Kartu Fisik • Rumpun {profession.rumpunName}
                </p>
                <p className="text-base font-extrabold text-white">
                  Kartu #{profession.cardNumber} — {profession.name}
                </p>
              </div>
            </div>

            <Link
              href={`/rumpun/${profession.rumpunSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-200 transition-colors"
            >
              <Layers className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>Kembali ke Rumpun {profession.rumpunName}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            {prevProfession ? (
              <Link
                href={`/profesi/${prevProfession.slug}`}
                className="group flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition-all"
              >
                <ArrowLeft
                  className="w-5 h-5 text-blue-400 group-hover:-translate-x-1 transition-transform shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-xs text-slate-400">
                    Kartu Sebelumnya (#{prevProfession.cardNumber})
                  </span>
                  <span className="font-extrabold text-base text-white">
                    {prevProfession.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-500 flex items-center">
                Ini adalah kartu pertama dalam seri rumpun {profession.rumpunName}.
              </div>
            )}

            {nextProfession ? (
              <Link
                href={`/profesi/${nextProfession.slug}`}
                className="group flex items-center justify-end gap-3.5 p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-right transition-all"
              >
                <div>
                  <span className="block text-xs text-slate-400">
                    Kartu Berikutnya (#{nextProfession.cardNumber})
                  </span>
                  <span className="font-extrabold text-base text-white">
                    {nextProfession.name}
                  </span>
                </div>
                <ArrowRight
                  className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-500 flex items-center justify-end text-right">
                Ini adalah kartu terakhir yang tersedia dalam seri rumpun{" "}
                {profession.rumpunName}.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

