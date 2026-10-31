"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AccentColorKey,
  Profession,
  ReferenceSource,
  RIASEC_DEFINITIONS,
  RiasecCode,
  RumpunPekerjaan,
  STANDARD_SOFT_SKILLS,
} from "@/types/career";
import { ACCENT_THEMES } from "@/lib/theme";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  QrCode,
  Download,
  Search,
  LogOut,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  BarChart3,
} from "lucide-react";

const EMPTY_PROFESSION_FORM = {
  id: "",
  name: "",
  slug: "",
  cardNumber: "05/10",
  cardSeriesName: "Seri Eksplorasi Karier",
  rumpunSlug: "kesehatan",
  accentColor: "blue" as AccentColorKey,
  summary: "",
  whatIsIt: "",
  mainPurpose: "",
  problemSolved: "",
  beneficiaries: "",
  tasksText: "",
  educationLevel: "",
  studyProgramsText: "",
  licenseText: "",
  riasec1: "I" as RiasecCode,
  riasec1Reason: "",
  riasec2: "S" as RiasecCode,
  riasec2Reason: "",
  primarySoftSkills: ["Komunikasi", "Empati", "Pemecahan Masalah"] as string[],
  hardSkillsText: "",
  illustrationUrl: "/illustrations/default-profesi.svg",
  refInstitution: "Kementerian Pendidikan Tinggi, Sains, dan Teknologi (PDDikti)",
  refTitle: "Informasi Program Studi dan Kompetensi Lulusan",
  refUrl: "https://pddikti.kemdiktisaintek.go.id",
  published: true,
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [rumpunList, setRumpunList] = useState<RumpunPekerjaan[]>([]);
  const [pageViews, setPageViews] = useState<Record<string, number>>({});
  const [loadingData, setLoadingData] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "profesi" | "form-profesi" | "rumpun" | "qr-generator"
  >("profesi");

  const [searchAdmin, setSearchAdmin] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Profession Form state
  const [formState, setFormState] = useState(EMPTY_PROFESSION_FORM);
  const [editingOriginalProf, setEditingOriginalProf] =
    useState<Profession | null>(null);

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<Profession | null>(null);

  // Rumpun Form state
  const [rumpunForm, setRumpunForm] = useState({
    id: "",
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    accentColor: "blue" as AccentColorKey,
    iconName: "Briefcase",
    active: true,
  });

  // Custom QR Generator state
  const [qrSlugInput, setQrSlugInput] = useState("dokter");
  const [qrBaseUrlInput, setQrBaseUrlInput] = useState(siteConfig.baseUrl);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/professions?all=1");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setProfessions(data.professions || []);
      setRumpunList(data.rumpun || []);
      setPageViews(data.analytics?.pageViews || {});
      setAuthenticated(true);
    } catch {
      setStatusMessage({
        type: "error",
        text: "Gagal memuat data ensiklopedia.",
      });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) {
          fetchAdminData();
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Gagal masuk.");
        return;
      }
      setPasswordInput("");
      await fetchAdminData();
    } catch {
      setAuthError("Terjadi gangguan jaringan saat login.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  };

  const filteredProfessions = useMemo(() => {
    const q = searchAdmin.trim().toLowerCase();
    return professions.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.rumpunName.toLowerCase().includes(q) ||
        p.cardNumber.toLowerCase().includes(q)
    );
  }, [professions, searchAdmin]);

  const startCreateNewProfession = () => {
    setEditingOriginalProf(null);
    setFormState({
      ...EMPTY_PROFESSION_FORM,
      cardNumber: `0${professions.length + 1}/10`,
    });
    setActiveTab("form-profesi");
  };

  const startEditProfession = (prof: Profession) => {
    setEditingOriginalProf(prof);
    const primarySkills = prof.softSkills
      .filter((s) => s.isPrimaryOnCard)
      .map((s) => s.name);

    setFormState({
      id: prof.id,
      name: prof.name,
      slug: prof.slug,
      cardNumber: prof.cardNumber,
      cardSeriesName: prof.cardSeriesName || "Seri Tenaga Kesehatan",
      rumpunSlug: prof.rumpunSlug,
      accentColor: prof.accentColor,
      summary: prof.summary,
      whatIsIt: prof.description.whatIsIt,
      mainPurpose: prof.description.mainPurpose,
      problemSolved: prof.description.problemSolved,
      beneficiaries: prof.description.beneficiaries,
      tasksText: prof.tasksAndResponsibilities.join("\n"),
      educationLevel: prof.educationAndPathway.generalEducationLevel,
      studyProgramsText: prof.educationAndPathway.studyPrograms.join("\n"),
      licenseText:
        prof.educationAndPathway.professionalEducationAndLicense.join("\n"),
      riasec1: prof.riasecCodes[0],
      riasec1Reason: prof.riasecDetails[0]?.relevanceReason || "",
      riasec2: prof.riasecCodes[1],
      riasec2Reason: prof.riasecDetails[1]?.relevanceReason || "",
      primarySoftSkills:
        primarySkills.length > 0
          ? primarySkills
          : prof.softSkills.slice(0, 3).map((s) => s.name),
      hardSkillsText: prof.hardSkills.map((h) => h.name).join("\n"),
      illustrationUrl: prof.illustrationUrl,
      refInstitution: prof.references[0]?.institution || "",
      refTitle: prof.references[0]?.title || "",
      refUrl: prof.references[0]?.url || "",
      published: prof.published,
    });
    setActiveTab("form-profesi");
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFormState((prev) => ({
          ...prev,
          illustrationUrl: reader.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfession = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formState.name.trim() || !formState.summary.trim()) {
      setStatusMessage({
        type: "error",
        text: "Nama profesi dan ringkasan wajib diisi.",
      });
      return;
    }

    const cleanSlug = (formState.slug || formState.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const tasks = formState.tasksText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const studyPrograms = formState.studyProgramsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const licenses = formState.licenseText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const hardSkillNames = formState.hardSkillsText
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const softSkillsPayload = formState.primarySoftSkills.map((skName) => {
      const existing = editingOriginalProf?.softSkills.find(
        (s) => s.name === skName
      );
      return (
        existing || {
          name: skName,
          isPrimaryOnCard: true,
          reasonNeeded: `Dibutuhkan dalam menjalankan aktivitas kerja ${formState.name} secara efektif.`,
          applicationExample: `Menerapkan ${skName.toLowerCase()} saat berinteraksi dengan pengguna layanan dan rekan sejawat.`,
        }
      );
    });

    const hardSkillsPayload =
      hardSkillNames.length > 0
        ? hardSkillNames.map((hkName) => {
            const existing = editingOriginalProf?.hardSkills.find(
              (h) => h.name === hkName
            );
            return (
              existing || {
                name: hkName,
                reasonNeeded: `Kompetensi teknis inti pada profesi ${formState.name}.`,
                applicationExample: `Melaksanakan prosedur ${hkName.toLowerCase()} sesuai standar operasional.`,
              }
            );
          })
        : editingOriginalProf?.hardSkills;

    const referencesPayload: ReferenceSource[] =
      editingOriginalProf?.references &&
      editingOriginalProf.references.length > 1
        ? editingOriginalProf.references
        : [
            {
              institution:
                formState.refInstitution ||
                "Kementerian Pendidikan Tinggi, Sains, dan Teknologi",
              title:
                formState.refTitle ||
                `Standar Pendidikan & Kompetensi ${formState.name}`,
              url: formState.refUrl || "https://pddikti.kemdiktisaintek.go.id",
              verifiedDate: new Date().toISOString().slice(0, 10),
              category: "Pendidikan",
            },
          ];

    const payload: Partial<Profession> = {
      ...(editingOriginalProf || {}),
      id: formState.id || undefined,
      name: formState.name.trim(),
      slug: cleanSlug,
      cardNumber: formState.cardNumber.trim(),
      cardSeriesName: formState.cardSeriesName.trim(),
      rumpunSlug: formState.rumpunSlug,
      accentColor: formState.accentColor,
      summary: formState.summary.trim(),
      description: {
        whatIsIt: formState.whatIsIt.trim() || formState.summary.trim(),
        mainPurpose:
          formState.mainPurpose.trim() ||
          "Memberikan pelayanan profesional sesuai standar kompetensi bidang.",
        problemSolved:
          formState.problemSolved.trim() ||
          "Membantu menyelesaikan permasalahan teknis dan kebutuhan masyarakat di bidang terkait.",
        beneficiaries:
          formState.beneficiaries.trim() ||
          "Masyarakat luas, pengguna layanan, dan institusi kerja.",
      },
      tasksAndResponsibilities:
        tasks.length > 0 ? tasks : editingOriginalProf?.tasksAndResponsibilities,
      educationAndPathway: {
        generalEducationLevel:
          formState.educationLevel.trim() ||
          editingOriginalProf?.educationAndPathway.generalEducationLevel ||
          "Pendidikan Vokasi (D3/D4) atau Sarjana (S1) dan Pendidikan Profesi Terkait",
        studyPrograms:
          studyPrograms.length > 0
            ? studyPrograms
            : [formState.name.trim()],
        professionalEducationAndLicense:
          licenses.length > 0
            ? licenses
            : ["Uji Kompetensi & Sertifikasi/Registrasi Resmi Sesuai Regulasi"],
        mandatoryRequirements:
          editingOriginalProf?.educationAndPathway.mandatoryRequirements || [
            "Menyelesaikan pendidikan formal pada program studi terakreditasi.",
            "Memenuhi persyaratan sertifikasi atau izin praktik sesuai ketentuan yang berlaku.",
          ],
        commonExpectations:
          editingOriginalProf?.educationAndPathway.commonExpectations || [
            "Menguasai landasan keilmuan dan keterampilan praktis profesi.",
          ],
        addedValueSkills:
          editingOriginalProf?.educationAndPathway.addedValueSkills || [
            "Literasi digital, komunikasi lintas budaya, dan penguasaan bahasa asing.",
          ],
        alternativePathways:
          editingOriginalProf?.educationAndPathway.alternativePathways ||
          "Dapat ditempuh melalui jalur pendidikan vokasi maupun akademik sesuai aturan sektor terkait.",
      },
      riasecCodes: [formState.riasec1, formState.riasec2],
      riasecDetails: [
        {
          code: formState.riasec1,
          relevanceReason:
            formState.riasec1Reason.trim() ||
            editingOriginalProf?.riasecDetails[0]?.relevanceReason ||
            `Tipe ${RIASEC_DEFINITIONS[formState.riasec1].nameEn} relevan dengan aktivitas kerja utama ${formState.name}.`,
          matchingActivities:
            editingOriginalProf?.riasecDetails[0]?.matchingActivities || [
              `Melaksanakan analisis dan tugas inti sebagai ${formState.name}.`,
            ],
        },
        {
          code: formState.riasec2,
          relevanceReason:
            formState.riasec2Reason.trim() ||
            editingOriginalProf?.riasecDetails[1]?.relevanceReason ||
            `Tipe ${RIASEC_DEFINITIONS[formState.riasec2].nameEn} mendukung kolaborasi dan keteraturan kerja ${formState.name}.`,
          matchingActivities:
            editingOriginalProf?.riasecDetails[1]?.matchingActivities || [
              `Berinteraksi dan mengelola prosedur kerja sesuai standar profesi.`,
            ],
        },
      ],
      softSkills: softSkillsPayload,
      hardSkills: hardSkillsPayload,
      illustrationUrl: formState.illustrationUrl,
      references: referencesPayload,
      published: formState.published,
    };

    try {
      const res = await fetch("/api/professions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({
          type: "error",
          text: data.error || "Gagal menyimpan profesi.",
        });
        return;
      }
      await fetchAdminData();
      setStatusMessage({
        type: "success",
        text: `Profesi "${data.profession.name}" berhasil disimpan dan QR code diperbarui!`,
      });
      setActiveTab("profesi");
    } catch {
      setStatusMessage({
        type: "error",
        text: "Terjadi kesalahan jaringan saat menyimpan profesi.",
      });
    }
  };

  const handleTogglePublish = async (prof: Profession) => {
    try {
      const res = await fetch("/api/professions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prof, published: !prof.published }),
      });
      if (res.ok) {
        await fetchAdminData();
        setStatusMessage({
          type: "success",
          text: `Status publikasi "${prof.name}" diubah menjadi ${
            !prof.published ? "Dipublikasikan" : "Disembunyikan (Draft)"
          }.`,
        });
      }
    } catch {}
  };

  const confirmDeleteProfession = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(
        `/api/professions?slug=${encodeURIComponent(deleteTarget.slug)}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: `Profesi "${deleteTarget.name}" telah dihapus.`,
        });
        setDeleteTarget(null);
        await fetchAdminData();
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Gagal menghapus profesi.",
      });
    }
  };

  const handleSaveRumpun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rumpunForm.name.trim() || !rumpunForm.shortDescription.trim()) {
      setStatusMessage({
        type: "error",
        text: "Nama rumpun dan deskripsi singkat wajib diisi.",
      });
      return;
    }

    const res = await fetch("/api/rumpun", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rumpunForm),
    });
    const data = await res.json();
    if (res.ok) {
      await fetchAdminData();
      setRumpunForm({
        id: "",
        name: "",
        slug: "",
        shortDescription: "",
        fullDescription: "",
        accentColor: "blue",
        iconName: "Briefcase",
        active: true,
      });
      setStatusMessage({
        type: "success",
        text: `Rumpun "${data.rumpun.name}" berhasil disimpan.`,
      });
    } else {
      setStatusMessage({
        type: "error",
        text: data.error || "Gagal menyimpan rumpun.",
      });
    }
  };

  // Render Login View if not authenticated
  if (authenticated === false) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h1
                id="main-content"
                tabIndex={-1}
                className="text-xl font-extrabold text-slate-900"
              >
                Login Panel Admin
              </h1>
              <p className="text-xs text-slate-500">
                Pengelolaan Ensiklopedia Kartu Karier & QR Code
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Kata Sandi Administrator / Guru BK
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi admin..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            {authError && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700"
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-colors"
            >
              Masuk ke Panel Admin
            </button>
          </form>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">
              Catatan Lingkungan Pengembangan:
            </p>
            <p>
              Kata sandi diatur melalui variabel lingkungan server{" "}
              <code className="font-mono bg-slate-200 px-1 rounded">
                ADMIN_PASSWORD
              </code>
              . Untuk pengujian lokal saat ini, kata sandi default adalah{" "}
              <code className="font-mono font-bold text-blue-700">
                GuruBK2025!
              </code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authenticated === null || loadingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-slate-600">
        Memuat Panel Admin Ensiklopedia...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Panel Pengelolaan Ensiklopedia Karier</span>
          </div>
          <h1
            id="main-content"
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-extrabold"
          >
            Dashboard Admin & Generator QR Kartu Karier
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Kelola data profesi, rumpun pekerjaan, nomor kartu, kode minat
            RIASEC, referensi resmi, dan unduh QR code siap cetak.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={startCreateNewProfession}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-sm"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Tambah Profesi Baru</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2.5 text-sm font-bold">
            {statusMessage.type === "success" ? (
              <CheckCircle2
                className="w-5 h-5 text-emerald-600 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="w-5 h-5 text-rose-600 shrink-0"
                aria-hidden="true"
              />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs font-bold underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("profesi")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors ${
            activeTab === "profesi"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Daftar Profesi ({professions.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("form-profesi")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors ${
            activeTab === "form-profesi"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {editingOriginalProf
            ? `Edit Profesi: ${editingOriginalProf.name}`
            : "Formulir Tambah / Edit Profesi"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rumpun")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors ${
            activeTab === "rumpun"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Kelola Rumpun Pekerjaan ({rumpunList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("qr-generator")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors ${
            activeTab === "qr-generator"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Generator & Unduh QR Code
        </button>
      </div>

      {/* TAB 1: DAFTAR PROFESI */}
      {activeTab === "profesi" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchAdmin}
                  onChange={(e) => setSearchAdmin(e.target.value)}
                  placeholder="Cari profesi berdasarkan nama, nomor kartu, atau rumpun..."
                  aria-label="Cari profesi dalam basis data"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <BarChart3 className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>Statistik Kunjungan Agregat Aktif (Ramah Privasi)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500 bg-slate-50">
                    <th scope="col" className="p-4">
                      No. Kartu
                    </th>
                    <th scope="col" className="p-4">
                      Profesi & Slug URL
                    </th>
                    <th scope="col" className="p-4">
                      Rumpun & Warna
                    </th>
                    <th scope="col" className="p-4">
                      RIASEC
                    </th>
                    <th scope="col" className="p-4">
                      Kunjungan
                    </th>
                    <th scope="col" className="p-4">
                      Status
                    </th>
                    <th scope="col" className="p-4 text-right">
                      Tindakan Admin
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {filteredProfessions.map((prof) => (
                    <tr key={prof.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-mono font-bold text-slate-900">
                        #{prof.cardNumber}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prof.illustrationUrl}
                            alt=""
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900">
                              {prof.name}
                            </p>
                            <p className="text-xs font-mono text-slate-500">
                              /profesi/{prof.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800">
                          {prof.rumpunName}
                        </span>
                        <span className="block text-xs text-slate-500">
                          Aksen: {prof.accentColor}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {prof.riasecCodes.map((c) => (
                            <span
                              key={c}
                              className={`px-2 py-0.5 rounded text-xs font-extrabold ${RIASEC_DEFINITIONS[c].badgeSolid}`}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-xs font-bold text-slate-700">
                        {pageViews[prof.slug] || 0}x dilihat
                      </td>
                      <td className="p-4">
                        {prof.published ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                            Dipublikasikan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                            Disembunyikan
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/profesi/${prof.slug}`}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            aria-label={`Pratinjau halaman ${prof.name}`}
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(prof)}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            aria-label={
                              prof.published
                                ? `Sembunyikan ${prof.name}`
                                : `Publikasikan ${prof.name}`
                            }
                          >
                            {prof.published ? (
                              <EyeOff className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => startEditProfession(prof)}
                            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700"
                            aria-label={`Edit profesi ${prof.name}`}
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(prof)}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700"
                            aria-label={`Hapus profesi ${prof.name}`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FORMULIR TAMBAH / EDIT PROFESI */}
      {activeTab === "form-profesi" && (
        <form
          onSubmit={handleSaveProfession}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingOriginalProf
                  ? `Edit Profil Profesi: ${editingOriginalProf.name}`
                  : "Tambah Kartu Profesi Baru"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                QR code untuk profesi ini akan otomatis dibuat menuju URL{" "}
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                  /profesi/
                  {formState.slug ||
                    formState.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
                    "slug-profesi"}
                </code>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("profesi")}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
            >
              Batal
            </button>
          </div>

          {/* 1. Identitas & Kartu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="form-prof-name"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Nama Profesi *
              </label>
              <input
                id="form-prof-name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((p) => ({
                    ...p,
                    name: e.target.value,
                    slug:
                      editingOriginalProf?.slug ||
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, ""),
                  }))
                }
                placeholder="Cth: Guru Bimbingan dan Konseling"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="form-prof-slug"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Slug URL Permanen *
              </label>
              <input
                id="form-prof-slug"
                type="text"
                required
                value={formState.slug}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, slug: e.target.value }))
                }
                placeholder="Cth: guru-bk"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="form-prof-card"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Nomor Kartu Fisik
              </label>
              <input
                id="form-prof-card"
                type="text"
                value={formState.cardNumber}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, cardNumber: e.target.value }))
                }
                placeholder="Cth: 01/04"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="form-prof-rumpun"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Rumpun Pekerjaan *
              </label>
              <select
                id="form-prof-rumpun"
                value={formState.rumpunSlug}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, rumpunSlug: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                {rumpunList.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="form-prof-color"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Warna Aksen Kartu
              </label>
              <select
                id="form-prof-color"
                value={formState.accentColor}
                onChange={(e) =>
                  setFormState((p) => ({
                    ...p,
                    accentColor: e.target.value as AccentColorKey,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                {(Object.keys(ACCENT_THEMES) as AccentColorKey[]).map((ck) => (
                  <option key={ck} value={ck}>
                    {ACCENT_THEMES[ck].label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="form-prof-status"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Status Publikasi
              </label>
              <select
                id="form-prof-status"
                value={formState.published ? "1" : "0"}
                onChange={(e) =>
                  setFormState((p) => ({
                    ...p,
                    published: e.target.value === "1",
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="1">Dipublikasikan (Tampil di Katalog)</option>
                <option value="0">Disembunyikan (Draft)</option>
              </select>
            </div>
          </div>

          {/* 2. Ringkasan & Mengenal Profesi */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="form-prof-summary"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Ringkasan Satu Kalimat (Tampil di Kartu) *
              </label>
              <textarea
                id="form-prof-summary"
                rows={2}
                required
                value={formState.summary}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, summary: e.target.value }))
                }
                placeholder="Ringkasan jelas mengenai peran utama profesi ini..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="form-prof-what"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Apa Itu Profesi Ini?
                </label>
                <textarea
                  id="form-prof-what"
                  rows={3}
                  value={formState.whatIsIt}
                  onChange={(e) =>
                    setFormState((p) => ({ ...p, whatIsIt: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="form-prof-purpose"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Tujuan Utama Pekerjaan
                </label>
                <textarea
                  id="form-prof-purpose"
                  rows={3}
                  value={formState.mainPurpose}
                  onChange={(e) =>
                    setFormState((p) => ({
                      ...p,
                      mainPurpose: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>
          </div>

          {/* 3. RIASEC & Soft Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                Pengaturan 2 Kode RIASEC
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="form-riasec-1"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Kode RIASEC Pertama
                  </label>
                  <select
                    id="form-riasec-1"
                    value={formState.riasec1}
                    onChange={(e) =>
                      setFormState((p) => ({
                        ...p,
                        riasec1: e.target.value as RiasecCode,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {(Object.keys(RIASEC_DEFINITIONS) as RiasecCode[]).map(
                      (c) => (
                        <option key={c} value={c}>
                          {c} — {RIASEC_DEFINITIONS[c].nameEn}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="form-riasec-2"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Kode RIASEC Kedua
                  </label>
                  <select
                    id="form-riasec-2"
                    value={formState.riasec2}
                    onChange={(e) =>
                      setFormState((p) => ({
                        ...p,
                        riasec2: e.target.value as RiasecCode,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {(Object.keys(RIASEC_DEFINITIONS) as RiasecCode[]).map(
                      (c) => (
                        <option key={c} value={c}>
                          {c} — {RIASEC_DEFINITIONS[c].nameEn}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="form-riasec1-reason"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Alasan Relevansi RIASEC Pertama
                </label>
                <input
                  id="form-riasec1-reason"
                  type="text"
                  value={formState.riasec1Reason}
                  onChange={(e) =>
                    setFormState((p) => ({
                      ...p,
                      riasec1Reason: e.target.value,
                    }))
                  }
                  placeholder="Jelaskan kaitan tipe ini dengan aktivitas kerja nyata..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                Pilih 3 Soft Skill Utama Kartu
              </h3>
              <div className="flex flex-wrap gap-2">
                {STANDARD_SOFT_SKILLS.map((sk) => {
                  const checked = formState.primarySoftSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => {
                        setFormState((p) => {
                          if (p.primarySoftSkills.includes(sk)) {
                            return {
                              ...p,
                              primarySoftSkills: p.primarySoftSkills.filter(
                                (item) => item !== sk
                              ),
                            };
                          }
                          return {
                            ...p,
                            primarySoftSkills: [...p.primarySoftSkills, sk],
                          };
                        });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        checked
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      {sk}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Tugas, Pendidikan, dan Ilustrasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="form-prof-tasks"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Tugas & Tanggung Jawab (Satu baris per tugas)
              </label>
              <textarea
                id="form-prof-tasks"
                rows={5}
                value={formState.tasksText}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, tasksText: e.target.value }))
                }
                placeholder="Tuliskan 5 sampai 8 tugas spesifik profesi..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="form-prof-edu"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Jenjang Pendidikan Umum di Indonesia
                </label>
                <input
                  id="form-prof-edu"
                  type="text"
                  value={formState.educationLevel}
                  onChange={(e) =>
                    setFormState((p) => ({
                      ...p,
                      educationLevel: e.target.value,
                    }))
                  }
                  placeholder="Cth: S1 Kedokteran + Pendidikan Profesi Dokter"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="form-prof-illustration"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Pilih / Unggah Ilustrasi Profesi
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="form-prof-illustration"
                    value={formState.illustrationUrl}
                    onChange={(e) =>
                      setFormState((p) => ({
                        ...p,
                        illustrationUrl: e.target.value,
                      }))
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="/illustrations/dokter.svg">
                      Ilustrasi Dokter (/illustrations/dokter.svg)
                    </option>
                    <option value="/illustrations/perawat.svg">
                      Ilustrasi Perawat (/illustrations/perawat.svg)
                    </option>
                    <option value="/illustrations/apoteker.svg">
                      Ilustrasi Apoteker (/illustrations/apoteker.svg)
                    </option>
                    <option value="/illustrations/bidan.svg">
                      Ilustrasi Bidan (/illustrations/bidan.svg)
                    </option>
                    <option value="/illustrations/default-profesi.svg">
                      Ilustrasi Umum (/illustrations/default-profesi.svg)
                    </option>
                  </select>
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer shrink-0">
                    <span>Unggah File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="visually-hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="form-ref-inst"
                    className="block text-xs font-bold uppercase text-slate-700 mb-1"
                  >
                    Lembaga Sumber Referensi
                  </label>
                  <input
                    id="form-ref-inst"
                    type="text"
                    value={formState.refInstitution}
                    onChange={(e) =>
                      setFormState((p) => ({
                        ...p,
                        refInstitution: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="form-ref-url"
                    className="block text-xs font-bold uppercase text-slate-700 mb-1"
                  >
                    Tautan Sumber Resmi
                  </label>
                  <input
                    id="form-ref-url"
                    type="url"
                    value={formState.refUrl}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, refUrl: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("profesi")}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold shadow-sm"
            >
              Simpan Profesi & Buat QR Code
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: KELOLA RUMPUN PEKERJAAN */}
      {activeTab === "rumpun" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <span>Daftar Rumpun Pekerjaan ({rumpunList.length})</span>
            </h2>
            <div className="divide-y divide-slate-200">
              {rumpunList.map((r) => (
                <div
                  key={r.id}
                  className="py-3.5 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">
                      {r.name}{" "}
                      <span className="text-xs font-mono text-slate-400">
                        (/rumpun/{r.slug})
                      </span>
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {r.shortDescription}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setRumpunForm({
                        id: r.id,
                        name: r.name,
                        slug: r.slug,
                        shortDescription: r.shortDescription,
                        fullDescription: r.fullDescription,
                        accentColor: r.accentColor,
                        iconName: r.iconName,
                        active: r.active,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 shrink-0"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSaveRumpun}
            className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 h-fit"
          >
            <h2 className="text-lg font-extrabold text-slate-900">
              Tambah / Edit Rumpun Pekerjaan
            </h2>
            <div>
              <label
                htmlFor="rumpun-form-name"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Nama Rumpun *
              </label>
              <input
                id="rumpun-form-name"
                type="text"
                required
                value={rumpunForm.name}
                onChange={(e) =>
                  setRumpunForm((p) => ({
                    ...p,
                    name: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-"),
                  }))
                }
                placeholder="Cth: Kelautan dan Perikanan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="rumpun-form-short"
                className="block text-xs font-bold uppercase text-slate-700 mb-1"
              >
                Deskripsi Singkat *
              </label>
              <textarea
                id="rumpun-form-short"
                rows={3}
                required
                value={rumpunForm.shortDescription}
                onChange={(e) =>
                  setRumpunForm((p) => ({
                    ...p,
                    shortDescription: e.target.value,
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold"
            >
              Simpan Rumpun Pekerjaan
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: GENERATOR & UNDUH QR CODE */}
      {activeTab === "qr-generator" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-blue-600" aria-hidden="true" />
              <span>Generator QR Code Kartu Fisik (PNG & SVG)</span>
            </h2>
            <p className="text-sm text-slate-600">
              Buat atau perbarui QR code resolusi tinggi dengan koreksi
              kesalahan tingkat tinggi (Level H) dan ruang kosong (quiet zone)
              standar cetak untuk kartu profesi fisik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div>
                <label
                  htmlFor="qr-gen-slug"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Pilih Profesi atau Ketik Slug Baru
                </label>
                <div className="flex gap-2">
                  <select
                    id="qr-gen-slug"
                    value={qrSlugInput}
                    onChange={(e) => setQrSlugInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {professions.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        Kartu #{p.cardNumber} — {p.name} (/profesi/{p.slug})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="qr-gen-baseurl"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Domain Produksi / Base URL Tujuan QR
                </label>
                <input
                  id="qr-gen-baseurl"
                  type="url"
                  value={qrBaseUrlInput}
                  onChange={(e) => setQrBaseUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  URL Lengkap yang Dikodekan di Dalam QR:
                </span>
                <p className="font-mono text-sm font-bold text-blue-700 break-all">
                  {qrBaseUrlInput.replace(/\/+$/, "")}/profesi/{qrSlugInput}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`/api/qr?slug=${encodeURIComponent(
                    qrSlugInput
                  )}&baseUrl=${encodeURIComponent(
                    qrBaseUrlInput
                  )}&format=png&download=1`}
                  download={`qr-${qrSlugInput}.png`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Unduh QR Code (PNG 600×600px)</span>
                </a>
                <a
                  href={`/api/qr?slug=${encodeURIComponent(
                    qrSlugInput
                  )}&baseUrl=${encodeURIComponent(
                    qrBaseUrlInput
                  )}&format=svg&download=1`}
                  download={`qr-${qrSlugInput}.svg`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Unduh QR Code (SVG Vektor Cetak)</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-md">
                <img
                  src={`/api/qr?slug=${encodeURIComponent(
                    qrSlugInput
                  )}&baseUrl=${encodeURIComponent(qrBaseUrlInput)}&format=svg`}
                  alt={`Pratinjau QR Code untuk ${qrSlugInput}`}
                  className="w-48 h-48"
                />
              </div>
              <p className="text-xs font-bold text-slate-600 mt-3">
                Pratinjau Langsung (Siap Dipindai Kamera Ponsel)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <h3
              id="delete-modal-title"
              className="text-lg font-extrabold text-slate-900"
            >
              Konfirmasi Hapus Profesi
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus profesi{" "}
              <strong>{deleteTarget.name}</strong> (Kartu #
              {deleteTarget.cardNumber})? Tindakan ini akan menghapus halaman{" "}
              <code className="font-mono">/profesi/{deleteTarget.slug}</code>.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteProfession}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold"
              >
                Ya, Hapus Profesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

