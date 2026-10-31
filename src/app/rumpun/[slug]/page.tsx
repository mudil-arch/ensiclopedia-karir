import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllRumpun,
  getProfessionsByRumpun,
  getRumpunBySlug,
} from "@/lib/db";
import { siteConfig } from "@/config/site";
import { RumpunDetailClient } from "@/components/RumpunDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rumpun = getRumpunBySlug(slug);
  if (!rumpun) {
    return {
      title: `Rumpun Tidak Ditemukan | ${siteConfig.siteShortName}`,
    };
  }
  return {
    title: `Rumpun ${rumpun.name} — Eksplorasi Profesi | ${siteConfig.siteShortName}`,
    description: rumpun.shortDescription,
  };
}

export default async function RumpunDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rumpun = getRumpunBySlug(slug);

  if (!rumpun || !rumpun.active) {
    notFound();
  }

  const professions = getProfessionsByRumpun(slug, false);
  const allRumpun = getAllRumpun(false);

  return (
    <RumpunDetailClient
      rumpun={rumpun}
      professions={professions}
      allRumpun={allRumpun}
    />
  );
}

