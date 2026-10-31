export type RiasecCode = "R" | "I" | "A" | "S" | "E" | "C";

export interface RiasecMetadata {
  code: RiasecCode;
  nameEn: string;
  nameId: string;
  summary: string;
  colorBg: string;
  colorText: string;
  colorBorder: string;
  badgeSolid: string;
}

export const RIASEC_DEFINITIONS: Record<RiasecCode, RiasecMetadata> = {
  R: {
    code: "R",
    nameEn: "Realistic",
    nameId: "Realistis",
    summary:
      "Menyukai aktivitas praktis, penggunaan alat, mesin, keterampilan fisik, atau pekerjaan lapangan secara langsung.",
    colorBg: "bg-amber-50",
    colorText: "text-amber-800",
    colorBorder: "border-amber-200",
    badgeSolid: "bg-amber-600 text-white",
  },
  I: {
    code: "I",
    nameEn: "Investigative",
    nameId: "Investigatif",
    summary:
      "Menyukai analisis, penelitian ilmiah, pemecahan masalah kompleks, observasi, dan penalaran sistematis.",
    colorBg: "bg-sky-50",
    colorText: "text-sky-800",
    colorBorder: "border-sky-200",
    badgeSolid: "bg-sky-600 text-white",
  },
  A: {
    code: "A",
    nameEn: "Artistic",
    nameId: "Artistik",
    summary:
      "Menyukai kreativitas, ekspresi diri, perancangan visual/tulisan, inovasi ide, dan penciptaan karya.",
    colorBg: "bg-purple-50",
    colorText: "text-purple-800",
    colorBorder: "border-purple-200",
    badgeSolid: "bg-purple-600 text-white",
  },
  S: {
    code: "S",
    nameEn: "Social",
    nameId: "Sosial",
    summary:
      "Menyukai membantu sesama, mengajar, membimbing, merawat, berkomunikasi, atau bekerja bersama orang banyak.",
    colorBg: "bg-rose-50",
    colorText: "text-rose-800",
    colorBorder: "border-rose-200",
    badgeSolid: "bg-rose-600 text-white",
  },
  E: {
    code: "E",
    nameEn: "Enterprising",
    nameId: "Enterprising (Wirausaha & Kepemimpinan)",
    summary:
      "Menyukai memimpin tim, memengaruhi orang lain, bernegosiasi, mengelola proyek, atau mengembangkan usaha.",
    colorBg: "bg-orange-50",
    colorText: "text-orange-800",
    colorBorder: "border-orange-200",
    badgeSolid: "bg-orange-600 text-white",
  },
  C: {
    code: "C",
    nameEn: "Conventional",
    nameId: "Konvensional",
    summary:
      "Menyukai pengelolaan data, ketelitian tinggi, kepatuhan pada standar prosedur, dokumentasi, dan keteraturan.",
    colorBg: "bg-emerald-50",
    colorText: "text-emerald-800",
    colorBorder: "border-emerald-200",
    badgeSolid: "bg-emerald-600 text-white",
  },
};

export type SoftSkillName =
  | "Komunikasi"
  | "Empati"
  | "Kerja Sama"
  | "Ketelitian"
  | "Kepemimpinan"
  | "Kreativitas"
  | "Adaptabilitas"
  | "Pemecahan Masalah";

export const STANDARD_SOFT_SKILLS: SoftSkillName[] = [
  "Komunikasi",
  "Empati",
  "Kerja Sama",
  "Ketelitian",
  "Kepemimpinan",
  "Kreativitas",
  "Adaptabilitas",
  "Pemecahan Masalah",
];

export type AccentColorKey =
  | "blue"
  | "pink"
  | "green"
  | "purple"
  | "amber"
  | "indigo"
  | "teal"
  | "orange"
  | "cyan"
  | "rose";

export interface ProfessionDescription {
  whatIsIt: string;
  mainPurpose: string;
  problemSolved: string;
  beneficiaries: string;
}

export interface DailyActivities {
  routine: string[];
  problemSolving: string[];
  interactions: string[];
  toolsAndTech: string[];
  workingConditions: string[];
  variationDisclaimer: string;
}

export interface WorkEnvironmentItem {
  place: string;
  description: string;
}

export interface EducationAndPathway {
  generalEducationLevel: string;
  studyPrograms: string[];
  professionalEducationAndLicense: string[];
  mandatoryRequirements: string[];
  commonExpectations: string[];
  addedValueSkills: string[];
  alternativePathways: string;
  regulatoryNote?: string;
}

export interface CareerProspects {
  sectors: string[];
  specializations: string[];
  roleProgression: string[];
  laborDemandFactors: string[];
  technologyAndIndustryImpact: string;
  ethicalDisclaimer: string;
}

export interface ProfessionRiasecDetail {
  code: RiasecCode;
  relevanceReason: string;
  matchingActivities: string[];
}

export interface SkillItem {
  name: string;
  isPrimaryOnCard?: boolean;
  reasonNeeded: string;
  applicationExample: string;
}

export interface ProfessionChallenges {
  demandsAndResponsibilities: string[];
  commonChallenges: string[];
  risksAndPressures: string[];
  considerationsBeforeChoosing: string[];
}

export interface StudentPreparation {
  relevantSubjects: string[];
  simpleProjects: string[];
  extracurriculars: string[];
  orgAndVolunteering: string[];
  beginnerResources: string[];
  practitionerInterviewQuestions: string[];
}

export interface RelatedProfessionItem {
  name: string;
  slug?: string;
  relationship: string;
}

export interface ReferenceSource {
  institution: string;
  title: string;
  url: string;
  verifiedDate: string;
  category: "Regulasi" | "Pendidikan" | "Organisasi Profesi" | "Standar Kompetensi";
}

export interface Profession {
  id: string;
  name: string;
  slug: string;
  cardNumber: string; // e.g., "01/04"
  cardSeriesName?: string; // e.g., "Seri Tenaga Kesehatan"
  rumpunSlug: string;
  rumpunName: string;
  accentColor: AccentColorKey;
  summary: string;
  description: ProfessionDescription;
  tasksAndResponsibilities: string[]; // 5 to 8 realistic tasks
  dailyActivities: DailyActivities;
  workEnvironments: WorkEnvironmentItem[];
  educationAndPathway: EducationAndPathway;
  professionRequirementsSummary: string[];
  careerProspects: CareerProspects;
  riasecCodes: [RiasecCode, RiasecCode];
  riasecDetails: [ProfessionRiasecDetail, ProfessionRiasecDetail];
  riasecDisclaimer: string;
  softSkills: SkillItem[];
  hardSkills: SkillItem[];
  challenges: ProfessionChallenges;
  studentPreparation: StudentPreparation;
  relatedProfessions: RelatedProfessionItem[];
  references: ReferenceSource[];
  qrCodeUrl: string; // e.g., "/qr/dokter.svg"
  illustrationUrl: string; // e.g., "/illustrations/dokter.svg"
  published: boolean;
  updatedAt: string;
}

export interface RumpunPekerjaan {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  workCharacteristics: string[];
  exampleSubjects: string[];
  accentColor: AccentColorKey;
  iconName: string;
  active: boolean;
  order: number;
}

export interface CareerDatabase {
  rumpun: RumpunPekerjaan[];
  professions: Profession[];
  analytics: {
    pageViews: Record<string, number>;
    lastUpdated: string;
  };
}

