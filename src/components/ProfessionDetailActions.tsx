"use client";

import React, { useEffect, useState } from "react";
import { Profession } from "@/types/career";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import { siteConfig } from "@/config/site";
import {
  Bookmark,
  Share2,
  Printer,
  QrCode,
  Scale,
  Check,
  Download,
} from "lucide-react";

export function ProfessionDetailActions({
  profession,
}: {
  profession: Profession;
}) {
  const {
    isFavorite,
    toggleFavorite,
    isInCompare,
    toggleCompare,
    addRecentlyViewed,
  } = useUserPrefs();

  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [compareNotice, setCompareNotice] = useState<string | null>(null);

  const favored = isFavorite(profession.slug);
  const compared = isInCompare(profession.slug);

  useEffect(() => {
    addRecentlyViewed(profession.slug);
    // Record aggregate privacy-friendly page view
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: profession.slug }),
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profession.slug]);

  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `${siteConfig.baseUrl}/profesi/${profession.slug}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Profil Profesi ${profession.name} — ${siteConfig.siteShortName}`,
          text: profession.summary,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleCompareClick = () => {
    const res = toggleCompare(profession.slug);
    if (res.message) {
      setCompareNotice(res.message);
      setTimeout(() => setCompareNotice(null), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const productionUrl = `${siteConfig.baseUrl.replace(/\/+$/, "")}/profesi/${
    profession.slug
  }`;

  return (
    <div className="no-print space-y-2">
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Share Link Button */}
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-sm transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" aria-hidden="true" />
              <span>Tautan Disalin!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span>Bagikan Tautan</span>
            </>
          )}
        </button>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={() => toggleFavorite(profession.slug)}
          aria-pressed={favored}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
            favored
              ? "bg-rose-600 border-rose-400 text-white"
              : "bg-white/15 hover:bg-white/25 border-white/25 text-white"
          }`}
        >
          <Bookmark
            className="w-4 h-4"
            fill={favored ? "currentColor" : "none"}
            aria-hidden="true"
          />
          <span>{favored ? "Tersimpan di Favorit" : "Simpan Favorit"}</span>
        </button>

        {/* Compare Button */}
        <button
          type="button"
          onClick={handleCompareClick}
          aria-pressed={compared}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
            compared
              ? "bg-amber-500 border-amber-300 text-slate-950"
              : "bg-white/15 hover:bg-white/25 border-white/25 text-white"
          }`}
        >
          <Scale className="w-4 h-4" aria-hidden="true" />
          <span>{compared ? "Dalam Perbandingan" : "Bandingkan"}</span>
        </button>

        {/* QR Code & Printable Card Trigger */}
        <button
          type="button"
          onClick={() => setShowQrModal((prev) => !prev)}
          aria-expanded={showQrModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-extrabold shadow-sm transition-all"
        >
          <QrCode className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <span>QR Code & Kartu Fisik</span>
        </button>

        {/* Print Profile Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          <span>Cetak Profil</span>
        </button>
      </div>

      {compareNotice && (
        <p
          role="status"
          aria-live="polite"
          className="text-xs font-semibold text-amber-200"
        >
          {compareNotice}
        </p>
      )}

      {/* Expandable QR Code & Downloadable Trading Card Preview */}
      {showQrModal && (
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="p-3 rounded-2xl bg-white border-2 border-slate-200 shrink-0">
              <img
                src={`/api/qr?slug=${profession.slug}&format=svg`}
                alt={`QR Code menuju halaman detail profesi ${profession.name}`}
                className="w-40 h-40"
              />
            </div>
            <div className="space-y-3 text-left flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-bold">
                <span>Kartu #{profession.cardNumber}</span>
                <span>•</span>
                <span>{profession.name}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                QR Code Resmi Profesi {profession.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pindai QR code ini menggunakan kamera ponsel untuk langsung
                membuka halaman detail profesi:
              </p>
              <code className="block px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono break-all">
                {productionUrl}
              </code>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`/api/qr?slug=${profession.slug}&format=png&download=1`}
                  download={`qr-${profession.slug}.png`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Unduh QR (PNG)</span>
                </a>
                <a
                  href={`/api/qr?slug=${profession.slug}&format=svg&download=1`}
                  download={`qr-${profession.slug}.svg`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Unduh QR (SVG Vektor)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

