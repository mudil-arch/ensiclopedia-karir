import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { RumpunPekerjaan } from "@/types/career";

export async function GET() {
  const db = getDatabase();
  return NextResponse.json({ rumpun: db.rumpun });
}

export async function POST(request: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json(
      { error: "Akses ditolak. Anda harus login sebagai admin." },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as Partial<RumpunPekerjaan>;
    const name = (body.name || "").trim();
    const slug = (body.slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!name || !slug || !body.shortDescription) {
      return NextResponse.json(
        { error: "Nama rumpun, slug, dan deskripsi singkat wajib diisi." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const existingIdx = db.rumpun.findIndex(
      (r) => r.id === body.id || r.slug === slug
    );

    const rumpunItem: RumpunPekerjaan = {
      id: body.id || `rumpun-${slug}`,
      slug,
      name,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription || body.shortDescription,
      workCharacteristics:
        body.workCharacteristics && body.workCharacteristics.length > 0
          ? body.workCharacteristics
          : [
              "Menjalankan aktivitas kerja profesional sesuai kompetensi rumpun.",
              "Berkolaborasi dengan pemangku kepentingan di sektor terkait.",
            ],
      exampleSubjects:
        body.exampleSubjects && body.exampleSubjects.length > 0
          ? body.exampleSubjects
          : ["Pengetahuan Umum", "Bahasa Indonesia", "Literasi Digital"],
      accentColor: body.accentColor || "blue",
      iconName: body.iconName || "Briefcase",
      active: body.active ?? true,
      order: body.order ?? db.rumpun.length + 1,
    };

    if (existingIdx >= 0) {
      db.rumpun[existingIdx] = rumpunItem;
    } else {
      db.rumpun.push(rumpunItem);
    }

    saveDatabase(db);
    return NextResponse.json({ success: true, rumpun: rumpunItem });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan data rumpun pekerjaan." },
      { status: 500 }
    );
  }
}

