"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useUserPrefs } from "@/components/UserPrefsProvider";
import {
  Search,
  Menu,
  X,
  Bookmark,
  Scale,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { favorites, compareList } = useUserPrefs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      quickQuery.trim()
        ? `/profesi?q=${encodeURIComponent(quickQuery.trim())}`
        : "/profesi"
    );
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setQuickQuery("");
  };

  const navItems = [
    { href: "/", label: "Beranda", exact: true, badge: null },
    { href: "/profesi", label: "Jelajahi Profesi", exact: false, badge: null },
    { href: "/kuis-minat", label: "Kuis Minat", exact: true, badge: "RIASEC" },
    { href: "/rumpun", label: "Rumpun Pekerjaan", exact: false, badge: null },
    { href: "/tentang", label: "Tentang", exact: true, badge: null },
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/97 shadow-[0_2px_16px_-4px_rgba(26,22,18,0.12)] backdrop-blur-md"
          : "bg-[var(--color-parchment)]/95 backdrop-blur-sm"
      }`}
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(26,22,18,0.08)"
          : "1px solid transparent",
      }}
    >
      {/* Skip to content */}
      <a
        href="#main-content"
        className="visually-hidden focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-semibold focus:shadow-lg"
        style={{ background: "var(--color-accent)", color: "#fff" }}
      >
        Lewati ke konten utama
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">

          {/* ── Logo / Brand ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Icon mark */}
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: "var(--color-accent)" }}
            >
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="font-serif text-sm sm:text-base font-semibold italic"
                style={{ color: "var(--color-ink)", letterSpacing: "-0.01em" }}
              >
                {siteConfig.siteShortName}
              </span>
              <span
                className="text-[0.625rem] sm:text-xs font-sans font-medium uppercase tracking-widest"
                style={{ color: "var(--color-accent)", letterSpacing: "0.12em" }}
              >
                {siteConfig.siteSubtitle}
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav aria-label="Utama" className="hidden md:flex items-center gap-0.5">
            {navItems.map(({ href, label, exact, badge }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                  )}
                  <span>{label}</span>
                  {badge && (
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(200,70,10,0.12)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Compare pill */}
            <Link
              href="/bandingkan"
              className={`relative inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                pathname === "/bandingkan"
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
              }`}
              aria-label={`Bandingkan profesi (${compareList.length} dipilih)`}
            >
              <Scale className="w-4 h-4" aria-hidden="true" />
              <span className="hidden lg:inline">Bandingkan</span>
              {compareList.length > 0 && (
                <span
                  className="inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 text-[10px] font-bold rounded-full text-white"
                  style={{ background: "var(--color-accent)" }}
                >
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Favorites shortcut */}
            <Link
              href="/profesi?favorit=1"
              className="relative inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cream)] transition-colors"
              aria-label={`Profesi tersimpan (${favorites.length})`}
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" style={{ color: favorites.length > 0 ? "var(--color-accent)" : undefined }} />
              {favorites.length > 0 && (
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--color-accent)" }}
                >
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen((p) => !p)}
              aria-expanded={searchOpen}
              aria-label="Cari profesi"
              className={`p-2.5 rounded-lg transition-colors ${
                searchOpen
                  ? "bg-[var(--color-cream)] text-[var(--color-accent)]"
                  : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
              }`}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              className="md:hidden p-2.5 rounded-lg text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* ── Expandable Search Bar ── */}
        {searchOpen && (
          <div
            className="py-3 border-t animate-slide-up"
            style={{ borderColor: "rgba(26,22,18,0.08)" }}
          >
            <form onSubmit={handleQuickSearch} className="flex gap-2 items-center">
              <label htmlFor="header-quick-search" className="visually-hidden">
                Cari nama profesi, rumpun, atau keterampilan
              </label>
              <div className="flex-1 relative">
                <Search
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
                  aria-hidden="true"
                />
                <input
                  id="header-quick-search"
                  type="search"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Ketik nama profesi, rumpun, atau keterampilan…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--color-cream)] border border-transparent focus:border-[var(--color-accent)] focus:bg-white transition-all text-[var(--color-ink)]"
                  style={{ outline: "none" }}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="btn-primary py-2.5 px-5 text-sm"
              >
                Cari
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi mobile"
          className="md:hidden border-t bg-[var(--color-parchment)] px-4 pt-2 pb-5 shadow-xl animate-slide-up"
          style={{ borderColor: "rgba(26,22,18,0.08)" }}
        >
          {navItems.map(({ href, label, exact, badge }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium my-0.5 transition-colors ${
                  active
                    ? "bg-[var(--color-cream)] text-[var(--color-accent)] font-semibold"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span>{label}</span>
                {badge && (
                  <span
                    className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(200,70,10,0.12)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}

          <Link
            href="/bandingkan"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium my-0.5 transition-colors ${
              pathname === "/bandingkan"
                ? "bg-[var(--color-cream)] text-[var(--color-accent)] font-semibold"
                : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
            }`}
          >
            <span>Bandingkan Profesi</span>
            {compareList.length > 0 && (
              <span
                className="px-2 py-0.5 text-xs rounded-full text-white font-bold"
                style={{ background: "var(--color-accent)" }}
              >
                {compareList.length}
              </span>
            )}
          </Link>

          <div
            className="pt-3 mt-2 border-t"
            style={{ borderColor: "rgba(26,22,18,0.08)" }}
          >
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
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
