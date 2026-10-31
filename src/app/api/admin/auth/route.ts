import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getExpectedAdminPassword,
  isAdminAuthenticated,
} from "@/lib/auth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = String(body?.password || "");
    const expected = getExpectedAdminPassword();

    if (password !== expected) {
      return NextResponse.json(
        { error: "Kata sandi admin tidak sesuai. Silakan periksa kembali." },
        { status: 401 }
      );
    }

    const token = createSessionToken("admin");
    const response = NextResponse.json({
      success: true,
      message: "Berhasil masuk ke Panel Admin.",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Permintaan login tidak valid." },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Berhasil keluar dari Panel Admin.",
  });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}

