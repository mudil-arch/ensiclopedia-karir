import fs from "fs";
import path from "path";
import { CareerDatabase, Profession, RumpunPekerjaan } from "@/types/career";
import { INITIAL_DATABASE } from "@/data/initial-data";

const DB_DIR = path.join(process.cwd(), "src", "data");
const DB_PATH = path.join(DB_DIR, "db.json");

function ensureDatabaseFile(): CareerDatabase {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATABASE, null, 2), "utf-8");
      return structuredClone(INITIAL_DATABASE);
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw) as CareerDatabase;
    if (!parsed.rumpun || !parsed.professions) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATABASE, null, 2), "utf-8");
      return structuredClone(INITIAL_DATABASE);
    }
    return parsed;
  } catch (error) {
    console.warn("Fallback to INITIAL_DATABASE due to read/write constraint:", error);
    return structuredClone(INITIAL_DATABASE);
  }
}

export function getDatabase(): CareerDatabase {
  return ensureDatabaseFile();
}

export function saveDatabase(db: CareerDatabase): boolean {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to save database to disk:", error);
    return false;
  }
}

export function getAllRumpun(includeInactive = false): RumpunPekerjaan[] {
  const db = getDatabase();
  const list = includeInactive ? db.rumpun : db.rumpun.filter((r) => r.active);
  return [...list].sort((a, b) => a.order - b.order);
}

export function getRumpunBySlug(slug: string): RumpunPekerjaan | undefined {
  const db = getDatabase();
  return db.rumpun.find((r) => r.slug === slug);
}

export function getAllProfessions(includeUnpublished = false): Profession[] {
  const db = getDatabase();
  const list = includeUnpublished
    ? db.professions
    : db.professions.filter((p) => p.published);
  return [...list].sort((a, b) => a.cardNumber.localeCompare(b.cardNumber));
}

export function getProfessionBySlug(
  slug: string,
  includeUnpublished = false
): Profession | undefined {
  const db = getDatabase();
  return db.professions.find(
    (p) => p.slug === slug && (includeUnpublished || p.published)
  );
}

export function getProfessionsByRumpun(
  rumpunSlug: string,
  includeUnpublished = false
): Profession[] {
  return getAllProfessions(includeUnpublished).filter(
    (p) => p.rumpunSlug === rumpunSlug
  );
}

export function incrementPageView(slug: string): number {
  const db = getDatabase();
  if (!db.analytics) {
    db.analytics = { pageViews: {}, lastUpdated: new Date().toISOString() };
  }
  const current = db.analytics.pageViews[slug] || 0;
  db.analytics.pageViews[slug] = current + 1;
  db.analytics.lastUpdated = new Date().toISOString();
  saveDatabase(db);
  return db.analytics.pageViews[slug];
}

