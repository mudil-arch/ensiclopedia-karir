"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserPrefsContextType {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  compareList: string[];
  toggleCompare: (slug: string) => { added: boolean; message?: string };
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  recentlyViewed: string[];
  addRecentlyViewed: (slug: string) => void;
}

const UserPrefsContext = createContext<UserPrefsContextType | undefined>(undefined);

const FAV_KEY = "kk_favorites_v1";
const COMPARE_KEY = "kk_compare_v1";
const RECENT_KEY = "kk_recent_v1";

export function UserPrefsProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedFav = localStorage.getItem(FAV_KEY);
      if (savedFav) setFavorites(JSON.parse(savedFav));

      const savedCompare = localStorage.getItem(COMPARE_KEY);
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedRecent = localStorage.getItem(RECENT_KEY);
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  const toggleCompare = (slug: string): { added: boolean; message?: string } => {
    let result = { added: false, message: "" };
    setCompareList((prev) => {
      if (prev.includes(slug)) {
        const next = prev.filter((item) => item !== slug);
        try {
          localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
        } catch {}
        result = { added: false, message: "Dihapus dari daftar perbandingan." };
        return next;
      }
      if (prev.length >= 3) {
        result = {
          added: false,
          message: "Maksimal 3 profesi dapat dibandingkan sekaligus.",
        };
        return prev;
      }
      const next = [...prev, slug];
      try {
        localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      } catch {}
      result = { added: true, message: "Ditambahkan ke perbandingan profesi." };
      return next;
    });
    return result;
  };

  const isInCompare = (slug: string) => compareList.includes(slug);

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.removeItem(COMPARE_KEY);
    } catch {}
  };

  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== slug);
      const next = [slug, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <UserPrefsContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </UserPrefsContext.Provider>
  );
}

export function useUserPrefs() {
  const ctx = useContext(UserPrefsContext);
  if (!ctx) {
    throw new Error("useUserPrefs must be used within a UserPrefsProvider");
  }
  return ctx;
}

