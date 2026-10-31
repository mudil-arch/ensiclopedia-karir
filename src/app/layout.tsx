import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { UserPrefsProvider } from "@/components/UserPrefsProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} — Ensiklopedia Profesi Siswa SMA/SMK`,
    template: `%s`,
  },
  description: siteConfig.siteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <UserPrefsProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </UserPrefsProvider>
      </body>
    </html>
  );
}

