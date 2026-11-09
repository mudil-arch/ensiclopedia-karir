"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Profession,
  RIASEC_DEFINITIONS,
  RiasecCode,
} from "@/types/career";
import { ProfessionCard } from "@/components/ProfessionCard";
import {
  Compass,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Printer,
  CheckCircle2,
  AlertCircle,
  Award,
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  category: RiasecCode;
  activityExample: string;
}

const QUIZ_QUESTIONS: Question[] = [
  // Realistic (R)
  {
    id: 1,
    category: "R",
    text: "Merakit, memperbaiki alat elektronik, mesin, atau bekerja dengan tangan di luar ruangan.",
    activityExample: "Misal: bongkar pasang komputer, merakit mebel, servis motor, atau berkebun praktis.",
  },
  {
    id: 2,
    category: "R",
    text: "Mengoperasikan peralatan teknis, perangkat uji laboratorium, atau kendaraan operasional.",
    activityExample: "Misal: menggunakan mikroskop, multimeter listrik, sensor digital, atau mesin cetak 3D.",
  },
  // Investigative (I)
  {
    id: 3,
    category: "I",
    text: "Mencari tahu penyebab suatu masalah biologis, ilmiah, atau medis yang kompleks hingga tuntas.",
    activityExample: "Misal: meneliti mengapa penyakit menyebar, cara kerja molekul obat, atau fenomena alam.",
  },
  {
    id: 4,
    category: "I",
    text: "Menganalisis data, membaca grafik penelitian, dan memecahkan teka-teki logika yang butuh ketelitian tinggi.",
    activityExample: "Misal: coding logika algoritma, eksperimen kimia, atau membaca laporan survei ilmiah.",
  },
  // Artistic (A)
  {
    id: 5,
    category: "A",
    text: "Mengekspresikan ide dan emosi melalui desain visual, menulis cerita, musik, atau konten kreatif.",
    activityExample: "Misal: menggambar poster digital, menulis naskah video, fotografi, atau arsitektur bangunan.",
  },
  {
    id: 6,
    category: "A",
    text: "Menciptakan cara-cara baru yang tidak kaku dalam menyelesaikan masalah atau menyampaikan pesan.",
    activityExample: "Misal: membuat kampanye edukasi interaktif atau merancang tata letak ruang pameran.",
  },
  // Social (S)
  {
    id: 7,
    category: "S",
    text: "Mendengarkan keluh kesah orang lain, merawat orang yang sakit, atau mendampingi orang yang membutuhkan bantuan.",
    activityExample: "Misal: relawan posko kesehatan, mendampingi lansia/anak, atau konsultasi sebaya.",
  },
  {
    id: 8,
    category: "S",
    text: "Mengajar adik kelas, melatih suatu keterampilan, atau memfasilitasi diskusi agar orang lain berkembang.",
    activityExample: "Misal: tutor sebaya matematika, melatih PMR/Pramuka, atau memandu kelompok belajar.",
  },
  // Enterprising (E)
  {
    id: 9,
    category: "E",
    text: "Memimpin tim organisasi sekolah, membagi tugas ke anggota, dan memastikan target kelompok tercapai.",
    activityExample: "Misal: ketua panitia pentas seni sekolah, koordinator acara sosial, atau kapten tim.",
  },
  {
    id: 10,
    category: "E",
    text: "Mempresentasikan ide untuk meyakinkan orang lain, bernegosiasi, atau mengelola proyek kewirausahaan.",
    activityExample: "Misal: menjual produk hasil kreasi siswa, pitch ide proposal, atau debat publik.",
  },
  // Conventional (C)
  {
    id: 11,
    category: "C",
    text: "Menata arsip data, menyusun jadwal rapi, dan memastikan prosedur resmi dipatuhi langkah demi langkah.",
    activityExample: "Misal: membuat pembukuan keuangan kas kelas yang teliti, mendokumentasikan notula rapat.",
  },
  {
    id: 12,
    category: "C",
    text: "Bekerja dengan angka, formulir administratif terstruktur, dan memeriksa tidak ada kesalahan kecil.",
    activityExample: "Misal: merekap daftar presensi, mengelola basis data formulir, atau mengecek takaran resep.",
  },
];

const SCORE_LABELS = [
  { value: 1, label: "Kurang Tertarik", scoreText: "1 poin" },
  { value: 2, label: "Netral / Ragu", scoreText: "2 poin" },
  { value: 3, label: "Tertarik", scoreText: "3 poin" },
  { value: 4, label: "Sangat Antusias!", scoreText: "4 poin" },
];

export function RiasecQuizClient({
  professions,
}: {
  professions: Profession[];
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hitung skor per kategori
  const scores = useMemo(() => {
    const raw: Record<RiasecCode, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    for (const q of QUIZ_QUESTIONS) {
      const ans = answers[q.id] || 0;
      raw[q.category] += ans;
    }

    return raw;
  }, [answers]);

  // Urutkan kategori dari skor tertinggi
  const rankedCategories = useMemo(() => {
    const entries = (Object.keys(scores) as RiasecCode[]).map((code) => ({
      code,
      score: scores[code],
      maxScore: 8, // 2 pertanyaan x max 4 poin
      percent: Math.round((scores[code] / 8) * 100),
      info: RIASEC_DEFINITIONS[code],
    }));

    return entries.sort((a, b) => b.score - a.score);
  }, [scores]);

  // Dua kode teratas (Holland code)
  const topTwoCodes = useMemo(() => {
    return [rankedCategories[0].code, rankedCategories[1].code] as [
      RiasecCode,
      RiasecCode
    ];
  }, [rankedCategories]);

  // Profesi yang cocok dengan salah satu atau kedua kode tertinggi
  const matchedProfessions = useMemo(() => {
    const [c1, c2] = topTwoCodes;
    return professions
      .map((p) => {
        let matchScore = 0;
        if (p.riasecCodes.includes(c1)) matchScore += 2;
        if (p.riasecCodes.includes(c2)) matchScore += 1;
        return { profession: p, matchScore };
      })
      .filter((item) => item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .map((item) => item.profession);
  }, [professions, topTwoCodes]);

  const canSubmit = answeredCount === totalQuestions;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* ── Header Pengantar ── */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-cream)] border border-[rgba(26,22,18,0.08)] text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)]">
          <Compass className="w-4 h-4" aria-hidden="true" />
          <span>Eksplorasi Minat Holland RIASEC</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[var(--color-ink)] leading-tight">
          Temukan Gaya Aktivitas Kerja Paling Cocok Untukmu
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-ink-soft)] leading-relaxed">
          Jawab 12 pertanyaan singkat tentang aktivitas yang paling kamu sukai.
          Sistem akan menghitung 2 kode minat RIASEC utamamu dan merekomendasikan
          profesi dari ensiklopedia ini.
        </p>

        {/* Progress bar fixed indicator */}
        <div className="pt-4 max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-ink-soft)]">
            <span>Kemajuan Pengisian:</span>
            <span>
              {answeredCount} dari {totalQuestions} pertanyaan ({progressPercent}%)
            </span>
          </div>
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Jika belum disubmit: Tampilkan Form Kuis ── */}
      {!isSubmitted && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedValue = answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-2xl bg-white border transition-all ${
                    selectedValue
                      ? "border-[rgba(200,70,10,0.3)] shadow-sm bg-gradient-to-r from-white via-white to-[var(--color-cream)]/30"
                      : "border-[rgba(26,22,18,0.08)] shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        selectedValue
                          ? "bg-[var(--color-accent)] text-white"
                          : "bg-[var(--color-cream)] text-[var(--color-ink-soft)]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <p className="font-medium text-sm sm:text-base text-[var(--color-ink)] leading-relaxed">
                        {q.text}
                      </p>
                      <p className="text-xs text-[var(--color-ink-soft)]/75 italic">
                        {q.activityExample}
                      </p>
                    </div>
                  </div>

                  {/* Skala Pilihan Radio Buttons */}
                  <div className="mt-4 pt-4 border-t border-[rgba(26,22,18,0.06)] grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SCORE_LABELS.map((opt) => {
                      const isChosen = selectedValue === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.value)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center transition-all ${
                            isChosen
                              ? "bg-[var(--color-accent)] text-white shadow-md font-bold scale-[1.02]"
                              : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[rgba(200,70,10,0.08)]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tombol Lihat Hasil */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[rgba(26,22,18,0.08)] shadow-lg">
            <div>
              <p className="text-sm font-bold text-[var(--color-ink)]">
                {canSubmit
                  ? "Semua pertanyaan telah dijawab!"
                  : `Masih ada ${totalQuestions - answeredCount} pertanyaan yang belum dipilih.`}
              </p>
              <p className="text-xs text-[var(--color-ink-soft)]">
                Hasil tes diproses langsung di perambanmu secara instan dan rahasia.
              </p>
            </div>

            <button
              type="button"
              disabled={!canSubmit}
              onClick={() => {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`btn-primary px-8 py-3.5 text-base ${
                !canSubmit ? "opacity-50 cursor-not-allowed" : "shadow-xl"
              }`}
            >
              <span>Hitung Minat RIASEC Saya</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* ── Jika sudah disubmit: Tampilkan Hasil dan Rekomendasi Profesi ── */}
      {isSubmitted && (
        <div className="space-y-12 animate-slide-up">
          {/* Card Hasil Utama */}
          <div className="card-trading p-6 sm:p-10 bg-white border-2 border-[var(--color-gold)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(26,22,18,0.08)]">
              <div>
                <span className="section-label">
                  <Award className="w-4 h-4" aria-hidden="true" />
                  Profil Holland RIASEC Kamu
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
                  Kombinasi Dominan: {topTwoCodes[0]} + {topTwoCodes[1]}
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                  ({RIASEC_DEFINITIONS[topTwoCodes[0]].nameId} &{" "}
                  {RIASEC_DEFINITIONS[topTwoCodes[1]].nameId})
                </p>
              </div>

              {/* Action buttons print / reset */}
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[rgba(26,22,18,0.1)] transition-colors"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>

            {/* Dua tipe teratas penjelasan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {topTwoCodes.map((code, rank) => {
                const info = RIASEC_DEFINITIONS[code];
                return (
                  <div
                    key={code}
                    className={`p-6 rounded-2xl border ${info.colorBorder} ${info.colorBg}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-base text-white ${info.badgeSolid}`}
                      >
                        {code}
                      </span>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                          Peringkat #{rank + 1}
                        </span>
                        <h3 className="font-bold text-lg text-slate-900 leading-tight">
                          {info.nameEn} ({info.nameId})
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {info.summary}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Rincian Skor 6 Dimensi Holland */}
            <div className="mt-8 pt-6 border-t border-[rgba(26,22,18,0.08)] space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--color-ink)]">
                Distribusi Minat di Seluruh 6 Dimensi RIASEC:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {rankedCategories.map((item) => (
                  <div
                    key={item.code}
                    className="p-3.5 rounded-xl bg-[var(--color-cream)] border border-[rgba(26,22,18,0.06)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[var(--color-ink)] text-white text-xs font-bold flex items-center justify-center">
                        {item.code}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[var(--color-ink)]">
                          {item.info.nameEn}
                        </p>
                        <p className="text-[11px] text-[var(--color-ink-soft)]">
                          {item.info.nameId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[var(--color-accent)]">
                        {item.score}/8 poin
                      </span>
                      <div className="w-16 h-1.5 bg-white rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[var(--color-accent)] rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Catatan Etika & Refleksi BK */}
            <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>Catatan Penting Guru BK:</strong> Hasil kuis ini bukan vonis
                mutlak masa depanmu. Ini adalah cermin awal untuk mengenali hal-hal
                yang membuatmu bersemangat. Setiap profesi membutuhkan perpaduan
                berbagai minat, dan minatmu akan terus berkembang seiring pengalaman baru.
              </div>
            </div>
          </div>

          {/* Rekomendasi Profesi di Ensiklopedia */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="section-label">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Rekomendasi Ensiklopedia
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]">
                  Profesi yang Mengandung Kode Minatmu ({topTwoCodes.join(", ")})
                </h3>
                <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                  Profesi-profesi di bawah ini melibatkan aktivitas kerja yang
                  selaras dengan hasil refleksimu.
                </p>
              </div>
              <Link
                href="/profesi"
                className="btn-ghost text-xs text-[var(--color-ink)] hover:text-white shrink-0"
              >
                Lihat Semua Profesi
              </Link>
            </div>

            {matchedProfessions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchedProfessions.map((prof) => (
                  <ProfessionCard key={prof.id} profession={prof} />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-[rgba(26,22,18,0.08)] text-center space-y-3">
                <p className="font-medium text-slate-800">
                  Belum ada kartu profesi terbit dengan kombinasi ini pada rilis awal.
                </p>
                <p className="text-xs text-slate-600">
                  Guru BK dapat menambahkan profesi baru melalui Panel Admin.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

