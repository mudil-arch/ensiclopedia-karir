import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RIASEC_DEFINITIONS, RiasecCode } from "@/types/career";
import { getAllProfessions } from "@/lib/db";
import {
  Compass,
  QrCode,
  Layers,
  BookOpen,
  ShieldCheck,
  Users,
  Download,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Tentang ${siteConfig.siteShortName} & Panduan RIASEC`,
  description:
    "Mengenal fungsi Kartu Karier fisik, sistem QR code, struktur informasi profesi, serta pengantar teori minat karier Holland RIASEC untuk layanan Bimbingan dan Konseling SMA/SMK.",
};

export default function TentangPage() {
  const professions = getAllProfessions(false);

  return (
    <div className="pb-16 space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-extrabold uppercase tracking-wider">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Media Layanan Bimbingan dan Konseling Karier</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Tentang {siteConfig.siteName}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Media edukasi karier interaktif yang menghubungkan kartu profesi
            fisik (<em>Career Profile Trading Card</em>) dengan ensiklopedia
            profesi digital berbasis QR untuk mendukung eksplorasi dan
            perencanaan karier siswa SMA/SMK di Indonesia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Tujuan & Filosofi Edukasi */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Mengapa {siteConfig.siteShortName} Dikembangkan?
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Banyak siswa SMA/SMK baru mengenal nama-nama profesi secara
                permukaan tanpa mengetahui apa aktivitas harian sebenarnya,
                masalah apa yang diselesaikan, bagaimana jalur pendidikan dan
                lisensi resminya di Indonesia, serta tantangan nyata di balik
                profesi tersebut.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                <strong>{siteConfig.siteShortName}</strong> dirancang sebagai
                jembatan antara media fisik yang menyenangkan di ruang kelas/BK
                dengan basis pengetahuan digital yang mendalam, akurat, dan
                mudah diakses melalui ponsel.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
                <strong>Prinsip Etika Bimbingan dan Konseling:</strong> Website
                ini <em>bukan</em> alat penentu masa depan otomatis atau
                pengganti konseling tatap muka. Website ini berfungsi membantu
                siswa mengenali berbagai pilihan karier dan membuat keputusan
                yang lebih terinformasi bersama Guru Bimbingan dan Konseling
                serta orang tua.
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Users className="w-6 h-6 text-blue-600" aria-hidden="true" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Untuk Siswa SMA/SMK
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mengeksplorasi pilihan studi lanjut, memahami keterampilan
                  yang perlu dilatih sekarang, dan membandingkan berbagai
                  profesi.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <BookOpen
                  className="w-6 h-6 text-indigo-600"
                  aria-hidden="true"
                />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Untuk Guru BK & Pendidik
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Media layanan bimbingan klasikal, kelompok, maupun konseling
                  karier individual yang interaktif dan terverifikasi.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 sm:col-span-2">
                <ShieldCheck
                  className="w-6 h-6 text-emerald-600"
                  aria-hidden="true"
                />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Untuk Orang Tua / Wali
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menjadi bahan diskusi keluarga yang objektif mengenai jalur
                  pendidikan vokasi maupun akademik, persyaratan lisensi
                  profesi, dan prospek kerja di Indonesia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Cara Kerja Kartu Fisik & QR Code */}
        <section
          id="qr-guide"
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
              <QrCode className="w-4 h-4" aria-hidden="true" />
              <span>Integrasi Fisik & Digital</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Fungsi Kartu Profesi Fisik & Sistem QR Code
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
              Setiap kartu fisik menampilkan ringkasan visual profesi: Nama dan
              Rumpun, Ilustrasi, 2 kode RIASEC, 3 Soft Skill utama, Nomor Seri
              Kartu, serta QR Code. Saat QR Code dipindai kamera ponsel, siswa
              langsung diarahkan ke URL permanen halaman detail profesi terkait.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {professions.slice(0, 4).map((prof) => (
              <div
                key={prof.slug}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>{prof.rumpunName}</span>
                  <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded">
                    #{prof.cardNumber}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <img
                    src={prof.qrCodeUrl}
                    alt={`QR Code untuk profesi ${prof.name}`}
                    className="w-36 h-36"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Kartu {prof.cardNumber} — {prof.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    /profesi/{prof.slug}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-1 w-full">
                  <a
                    href={`/api/qr?slug=${prof.slug}&format=png&download=1`}
                    download={`qr-${prof.slug}.png`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>PNG</span>
                  </a>
                  <a
                    href={`/api/qr?slug=${prof.slug}&format=svg&download=1`}
                    download={`qr-${prof.slug}.svg`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>SVG</span>
                  </a>
                  <Link
                    href={`/profesi/${prof.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold"
                  >
                    <span>Buka</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Penjelasan Teori Holland RIASEC */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-600">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Landasan Konseptual Minat Karier</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Mengenal Teori Minat Karier Holland (RIASEC)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              Teori RIASEC yang dikembangkan oleh psikolog karier{" "}
              <strong>John L. Holland</strong> mengelompokkan kecenderungan
              minat dan lingkungan aktivitas kerja ke dalam enam tipe utama. Pada
              Kartu Karier, setiap profesi menampilkan{" "}
              <strong>dua kode RIASEC yang relevan</strong> untuk membantu siswa
              membayangkan sifat kegiatan sehari-hari di profesi tersebut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(Object.keys(RIASEC_DEFINITIONS) as RiasecCode[]).map((code) => {
              const info = RIASEC_DEFINITIONS[code];
              return (
                <div
                  key={code}
                  className={`p-5 rounded-2xl border-2 ${info.colorBorder} ${info.colorBg} space-y-3`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-11 h-11 rounded-full ${info.badgeSolid} font-extrabold text-lg flex items-center justify-center shadow-sm`}
                    >
                      {info.code}
                    </span>
                    <div>
                      <h3 className={`text-lg font-extrabold ${info.colorText}`}>
                        {info.nameEn}
                      </h3>
                      <span className="text-xs font-semibold text-slate-600">
                        {info.nameId}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {info.summary}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2
                className="w-4 h-4 text-emerald-600"
                aria-hidden="true"
              />
              <span>Cara Membaca Kode RIASEC secara Bijak</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kode RIASEC pada kartu profesi merupakan gambaran kecenderungan
              aktivitas kerja (titik awal eksplorasi editorial),{" "}
              <strong>bukan syarat mutlak</strong> dan{" "}
              <strong>bukan diagnosis kepribadian</strong>. Seseorang dengan
              kombinasi minat yang berbeda tetap dapat berhasil dan berkembang
              dalam suatu profesi dengan menemukan spesialisasi atau peran yang
              sesuai.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

