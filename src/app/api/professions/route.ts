import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { saveProfessionQrCodeFiles } from "@/lib/qr";
import { Profession } from "@/types/career";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "1";
  const db = getDatabase();

  if (includeAll) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: "Akses ditolak. Silakan login admin terlebih dahulu." },
        { status: 401 }
      );
    }
    return NextResponse.json({
      professions: db.professions,
      rumpun: db.rumpun,
      analytics: db.analytics,
    });
  }

  return NextResponse.json({
    professions: db.professions.filter((p) => p.published),
    rumpun: db.rumpun.filter((r) => r.active),
  });
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
    const body = (await request.json()) as Partial<Profession>;
    const name = (body.name || "").trim();
    const rawSlug = (body.slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!name || !rawSlug || !body.rumpunSlug || !body.summary) {
      return NextResponse.json(
        {
          error:
            "Nama profesi, slug URL, rumpun pekerjaan, dan ringkasan wajib diisi.",
        },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const existingIndex = db.professions.findIndex(
      (p) => p.id === body.id || p.slug === rawSlug
    );

    const rumpunObj = db.rumpun.find((r) => r.slug === body.rumpunSlug);
    const rumpunName = rumpunObj ? rumpunObj.name : body.rumpunName || "Umum";

    // Generate static QR code files for this profession
    await saveProfessionQrCodeFiles(rawSlug);

    const now = new Date().toISOString();
    const newProfession: Profession = {
      id: body.id || `prof-${rawSlug}-${Date.now()}`,
      name,
      slug: rawSlug,
      cardNumber: body.cardNumber || "05/10",
      cardSeriesName: body.cardSeriesName || `Seri ${rumpunName}`,
      rumpunSlug: body.rumpunSlug,
      rumpunName,
      accentColor: body.accentColor || (rumpunObj?.accentColor ?? "blue"),
      summary: body.summary,
      description: body.description || {
        whatIsIt: body.summary,
        mainPurpose: "Melaksanakan tugas profesional sesuai standar kompetensi bidang.",
        problemSolved: "Membantu masyarakat dan organisasi menyelesaikan kebutuhan di bidang terkait.",
        beneficiaries: "Masyarakat umum, pengguna layanan, dan organisasi.",
      },
      tasksAndResponsibilities:
        body.tasksAndResponsibilities && body.tasksAndResponsibilities.length > 0
          ? body.tasksAndResponsibilities
          : [
              "Melaksanakan analisis kebutuhan dan perencanaan kerja sesuai standar operasional.",
              "Melakukan tindakan teknis dan pelayanan profesional secara bertanggung jawab.",
              "Berkoordinasi dengan rekan sejawat dan pemangku kepentingan terkait.",
              "Mendokumentasikan hasil pekerjaan dan melakukan evaluasi berkala.",
              "Mematuhi kode etik profesi serta standar keselamatan kerja.",
            ],
      dailyActivities: body.dailyActivities || {
        routine: ["Menyiapkan peralatan kerja dan meninjau agenda pelayanan harian."],
        problemSolving: ["Menganalisis kendala teknis atau kebutuhan pengguna layanan dan merumuskan solusi."],
        interactions: ["Berkomunikasi dengan klien/masyarakat dan berkolaborasi dalam tim lintas fungsi."],
        toolsAndTech: ["Menggunakan instrumen kerja standar dan sistem informasi digital bidang terkait."],
        workingConditions: ["Bekerja di lingkungan fasilitas layanan, kantor, laboratorium, atau lapangan sesuai penugasan."],
        variationDisclaimer:
          "Catatan: Aktivitas aktual dapat berbeda sesuai tempat kerja, spesialisasi, dan tingkat pengalaman.",
      },
      workEnvironments:
        body.workEnvironments && body.workEnvironments.length > 0
          ? body.workEnvironments
          : [
              {
                place: "Institusi Layanan / Organisasi Terkait",
                description: "Menjalankan peran profesional pada unit kerja yang relevan.",
              },
            ],
      educationAndPathway: body.educationAndPathway || {
        generalEducationLevel: "Pendidikan Vokasi (D3/D4) atau Sarjana (S1) serta Pendidikan Profesi/Sertifikasi sesuai bidang.",
        studyPrograms: [name],
        professionalEducationAndLicense: ["Sertifikasi kompetensi atau registrasi profesi sesuai ketentuan bidang."],
        mandatoryRequirements: ["Memenuhi kualifikasi pendidikan dan kompetensi yang dipersyaratkan."],
        commonExpectations: ["Menguasai pengetahuan dasar bidang dan etika kerja."],
        addedValueSkills: ["Komunikasi efektif, literasi digital, dan kemampuan bahasa asing."],
        alternativePathways: "Jalur pendidikan vokasi, pelatihan berbasis kompetensi, atau studi sarjana sesuai regulasi sektor.",
      },
      professionRequirementsSummary:
        body.professionRequirementsSummary && body.professionRequirementsSummary.length > 0
          ? body.professionRequirementsSummary
          : ["Kualifikasi Pendidikan Terkait", "Sertifikasi / Lisensi Kompetensi"],
      careerProspects: body.careerProspects || {
        sectors: ["Sektor Pemerintah", "Sektor Swasta / Industri", "Praktik / Wirausaha Mandiri"],
        specializations: ["Pengembangan keahlian spesialis sesuai cabang keilmuan."],
        roleProgression: ["Staf / Praktisi Muda → Praktisi Senior → Koordinator / Manajer Unit"],
        laborDemandFactors: ["Perkembangan kebutuhan masyarakat dan transformasi industri di Indonesia."],
        technologyAndIndustryImpact:
          "Pemanfaatan teknologi digital membantu efisiensi kerja namun tetap membutuhkan keahlian analisis dan pertimbangan manusia.",
        ethicalDisclaimer:
          "Informasi prospek bersifat edukatif dan bukan jaminan pekerjaan atau penghasilan tertentu.",
      },
      riasecCodes: body.riasecCodes || ["I", "S"],
      riasecDetails: body.riasecDetails || [
        {
          code: body.riasecCodes?.[0] || "I",
          relevanceReason: "Relevan dengan aktivitas analisis dan pemecahan masalah di bidang ini.",
          matchingActivities: ["Mengkaji data dan menentukan langkah kerja yang tepat."],
        },
        {
          code: body.riasecCodes?.[1] || "S",
          relevanceReason: "Relevan dengan aktivitas komunikasi, pelayanan, atau kerja sama tim.",
          matchingActivities: ["Berinteraksi dan memberikan edukasi/layanan kepada masyarakat."],
        },
      ],
      riasecDisclaimer:
        body.riasecDisclaimer ||
        "Tipe RIASEC merupakan gambaran kecenderungan aktivitas kerja, bukan syarat mutlak atau diagnosis kepribadian.",
      softSkills:
        body.softSkills && body.softSkills.length > 0
          ? body.softSkills
          : [
              {
                name: "Komunikasi",
                isPrimaryOnCard: true,
                reasonNeeded: "Menyampaikan informasi dengan jelas kepada rekan kerja dan masyarakat.",
                applicationExample: "Menjelaskan prosedur atau hasil kerja secara runtut dan santun.",
              },
              {
                name: "Empati",
                isPrimaryOnCard: true,
                reasonNeeded: "Memahami kebutuhan dan sudut pandang orang yang dilayani.",
                applicationExample: "Mendengarkan permasalahan pengguna layanan dengan seksama.",
              },
              {
                name: "Pemecahan Masalah",
                isPrimaryOnCard: true,
                reasonNeeded: "Mencari jalan keluar yang efektif saat menghadapi kendala di lapangan.",
                applicationExample: "Menganalisis akar masalah dan mengambil keputusan tepat.",
              },
            ],
      hardSkills:
        body.hardSkills && body.hardSkills.length > 0
          ? body.hardSkills
          : [
              {
                name: `Kompetensi Teknis ${name}`,
                reasonNeeded: "Menjalankan tugas inti profesi sesuai standar mutu.",
                applicationExample: "Menerapkan prosedur kerja standar secara akurat.",
              },
            ],
      challenges: body.challenges || {
        demandsAndResponsibilities: ["Menjaga kualitas kerja dan tanggung jawab etika profesi."],
        commonChallenges: ["Beradaptasi dengan dinamika kebutuhan pengguna layanan dan perkembangan teknologi."],
        risksAndPressures: ["Mengelola waktu dan ketelitian di bawah tenggat kerja."],
        considerationsBeforeChoosing: ["Pertimbangkan kesesuaian minat belajar dan kesiapan mengembangkan kompetensi."],
      },
      studentPreparation: body.studentPreparation || {
        relevantSubjects: ["Mata pelajaran rumpun terkait di SMA/SMK"],
        simpleProjects: ["Membuat proyek observasi atau rangkuman profil profesi."],
        extracurriculars: ["Kegiatan ekstrakurikuler yang melatih kepemimpinan dan keterampilan bidang."],
        orgAndVolunteering: ["Aktif dalam organisasi siswa atau kegiatan sosial masyarakat."],
        beginnerResources: ["Buku pengantar bidang dan informasi resmi kementerian/organisasi profesi."],
        practitionerInterviewQuestions: [
          "Apa kegiatan sehari-hari yang paling menarik dalam profesi ini?",
          "Persiapan apa yang sebaiknya dilakukan siswa SMA/SMK sejak dini?",
        ],
      },
      relatedProfessions: body.relatedProfessions || [],
      references:
        body.references && body.references.length > 0
          ? body.references
          : [
              {
                institution: "Kementerian Pendidikan Tinggi, Sains, dan Teknologi (PDDikti)",
                title: "Informasi Program Studi Perguruan Tinggi Indonesia",
                url: "https://pddikti.kemdiktisaintek.go.id",
                verifiedDate: now.slice(0, 10),
                category: "Pendidikan",
              },
            ],
      qrCodeUrl: `/qr/${rawSlug}.svg`,
      illustrationUrl: body.illustrationUrl || "/illustrations/default-profesi.svg",
      published: body.published ?? true,
      updatedAt: now,
    };

    if (existingIndex >= 0) {
      db.professions[existingIndex] = newProfession;
    } else {
      db.professions.push(newProfession);
    }

    saveDatabase(db);
    return NextResponse.json({
      success: true,
      profession: newProfession,
    });
  } catch (error) {
    console.error("Error saving profession:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan data profesi." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json(
      { error: "Akses ditolak. Anda harus login sebagai admin." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json(
      { error: "Parameter slug profesi diperlukan." },
      { status: 400 }
    );
  }

  const db = getDatabase();
  const initialLen = db.professions.length;
  db.professions = db.professions.filter((p) => p.slug !== slug);

  if (db.professions.length === initialLen) {
    return NextResponse.json(
      { error: "Profesi tidak ditemukan." },
      { status: 404 }
    );
  }

  saveDatabase(db);
  return NextResponse.json({
    success: true,
    message: `Profesi '${slug}' berhasil dihapus.`,
  });
}

