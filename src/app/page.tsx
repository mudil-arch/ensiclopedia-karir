import React from "react";
import { getAllProfessions, getAllRumpun } from "@/lib/db";
import { HomeExplorerClient } from "@/components/HomeExplorerClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const professions = getAllProfessions(false);
  const rumpunList = getAllRumpun(false);

  return (
    <HomeExplorerClient
      professions={professions}
      rumpunList={rumpunList}
    />
  );
}

