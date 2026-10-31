"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import {
  Compass,
  Search,
  Menu,
  X,
  Bookmark,
  Scale,
  ShieldCheck,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { favorites, compareList } = useUserPrefs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) {
      router.push("/profesi");
    } else {
      router.push(`/profesi?q=${encodeURIComponent(quickQuery.trim())}`);
    }
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <a
        href="#main-content"
        className="visually-hidden focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-700 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-lg"
      >
        Lewati ke konten utama
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Identity / Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all">
              <Compass className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                {siteConfig.siteShortName}
              </span>
              <span className="text-xs font-medium text-blue-600 mt-0.5">
                {siteConfig.siteSubtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Utama"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/profesi"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname.startsWith("/profesi")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Jelajahi Profesi
            </Link>
            <Link
              href="/rumpun"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname.startsWith("/rumpun")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Rumpun Pekerjaan
            </Link>
            <Link
              href="/tentang"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/tentang"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Tentang
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Compare Pill */}
            <Link
              href="/bandingkan"
              className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                pathname === "/bandingkan"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              aria-label={`Bandingkan profesi (${compareList.length} dipilih)`}
            >
              <Scale className="w-4 h-4 text-indigo-600" aria-hidden="true" />
              <span className="hidden lg:inline">Bandingkan</span>
              {compareList.length > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Favorites shortcut */}
            <Link
              href="/profesi?favorit=1"
              className="relative inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={`Profesi tersimpan (${favorites.length})`}
            >
              <Bookmark className="w-4 h-4 text-rose-600" aria-hidden="true" />
              {favorites.length > 0 && (
                <span className="text-xs font-bold text-rose-700">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-expanded={searchOpen}
              aria-label="Cari profesi"
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t border-slate-100">
            <form onSubmit={handleQuickSearch} className="flex gap-2">
              <label htmlFor="header-quick-search" className="visually-hidden">
                Cari nama profesi, rumpun, atau keterampilan
              </label>
              <input
                id="header-quick-search"
                type="search"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Ketik nama profesi (mis. Dokter, Apoteker), rumpun, atau keterampilan..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
              >
                Cari
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg"
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
              pathname === "/"
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/profesi"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
              pathname.startsWith("/profesi")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Jelajahi Profesi
          </Link>
          <Link
            href="/rumpun"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
              pathname.startsWith("/rumpun")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Rumpun Pekerjaan
          </Link>
          <Link
            href="/bandingkan"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold ${
              pathname === "/bandingkan"
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>Bandingkan Profesi</span>
            {compareList.length > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-600 text-white">
                {compareList.length}
              </span>
            )}
          </Link>
          <Link
            href="/tentang"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
              pathname === "/tentang"
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Tentang
          </Link>
          <div className="pt-2 mt-2 border-t border-slate-100">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              Panel Admin Guru BK
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

