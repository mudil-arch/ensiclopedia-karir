import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "kk_admin_session";

function getAdminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "kartu-karier-default-session-secret-change-in-prod-2025";
}

export function getExpectedAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "GuruBK2025!";
}

export function createSessionToken(username = "admin"): string {
  const payload = `${username}.${Date.now()}`;
  const hmac = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${hmac}`;
}

export function verifySessionToken(token?: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [username, timestampStr, signature] = parts;
  const payload = `${username}.${timestampStr}`;
  const expectedSig = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("hex");

  if (signature.length !== expectedSig.length) return false;
  const validSig = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig)
  );
  if (!validSig) return false;

  const timestamp = Number(timestampStr);
  if (Number.isNaN(timestamp)) return false;
  // Valid for 24 hours
  const maxAgeMs = 24 * 60 * 60 * 1000;
  return Date.now() - timestamp < maxAgeMs;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

