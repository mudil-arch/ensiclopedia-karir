import { CareerDatabase, Profession, RumpunPekerjaan } from "@/types/career";

export const INITIAL_RUMPUN: RumpunPekerjaan[] = [
  {
    id: "rumpun-kesehatan",
    slug: "kesehatan",
    name: "Kesehatan",
    shortDescription:
      "Pelayanan medis, keperawatan, kefarmasian, kebidanan, serta peningkatan kualitas kesehatan masyarakat.",
    fullDescription:
      "Rumpun Kesehatan mencakup berbagai profesi yang berfokus pada upaya promotif (peningkatan kesehatan), preventif (pencegahan penyakit), kuratif (pengobatan), dan rehabilitatif (pemulihan). Profesi di rumpun ini menuntut landasan ilmiah yang kuat, kepedulian tinggi terhadap keselamatan manusia, serta kepatuhan pada standar etika dan regulasi kesehatan nasional.",
    workCharacteristics: [
      "Berinteraksi langsung dengan pasien, keluarga pasien, dan tim kesehatan lintas profesi.",
      "Menggunakan peralatan medis, instrumen laboratorium, serta rekam medis elektronik.",
      "Membutuhkan ketelitian tinggi karena setiap keputusan berdampak pada keselamatan jiwa.",
      "Mengikuti standar prosedur operasional (SOP) dan kode etik profesi yang diatur undang-undang.",
    ],
    exampleSubjects: ["Biologi", "Kimia", "Kesehatan Masyarakat", "Anatomi & Fisiologi"],
    accentColor: "blue",
    iconName: "HeartPulse",
    active: true,
    order: 1,
  },
  {
    id: "rumpun-pendidikan",
    slug: "pendidikan",
    name: "Pendidikan",
    shortDescription:
      "Pengajaran, bimbingan dan konseling, pengembangan kurikulum, serta fasilitasi belajar sepanjang hayat.",
    fullDescription:
      "Rumpun Pendidikan menaungi profesi yang membimbing perkembangan intelektual, karakter, keterampilan, dan potensi peserta didik di berbagai jenjang. Termasuk di dalamnya guru mata pelajaran, guru Bimbingan dan Konseling (BK), dosen, pengembang teknologi pembelajaran, serta pengelola satuan pendidikan.",
    workCharacteristics: [
      "Merancang strategi pembelajaran dan asesmen yang sesuai dengan perkembangan peserta didik.",
      "Membimbing, mendengarkan, dan memfasilitasi eksplorasi potensi serta pemecahan masalah belajar.",
      "Berkomunikasi secara empatik dengan siswa, rekan pendidik, dan orang tua/wali.",
      "Terus memperbarui wawasan keilmuan dan metode pedagogi yang relevan.",
    ],
    exampleSubjects: ["Psikologi Pendidikan", "Bahasa Indonesia", "Sosiologi", "Teknologi Pembelajaran"],
    accentColor: "amber",
    iconName: "GraduationCap",
    active: true,
    order: 2,
  },
  {
    id: "rumpun-teknologi-dan-digital",
    slug: "teknologi-dan-digital",
    name: "Teknologi dan Digital",
    shortDescription:
      "Pengembangan perangkat lunak, sains data, keamanan siber, jaringan komputer, dan sistem informasi.",
    fullDescription:
      "Rumpun Teknologi dan Digital berfokus pada perancangan, pembangunan, pemeliharaan, dan pengamanan sistem komputasi serta produk digital yang memecahkan masalah di berbagai sektor kehidupan.",
    workCharacteristics: [
      "Menganalisis masalah secara logis dan menerjemahkannya ke dalam arsitektur sistem atau kode program.",
      "Mengolah dan menginterpretasikan data untuk mendukung pengambilan keputusan berbasis bukti.",
      "Bekerja secara kolaboratif menggunakan metodologi pengembangan perangkat lunak modern.",
      "Adaptif terhadap perkembangan bahasa pemrograman, kecerdasan buatan, dan standar keamanan siber.",
    ],
    exampleSubjects: ["Informatika", "Matematika", "Logika Pemrograman", "Statistika"],
    accentColor: "indigo",
    iconName: "Cpu",
    active: true,
    order: 3,
  },
  {
    id: "rumpun-bisnis-dan-keuangan",
    slug: "bisnis-dan-keuangan",
    name: "Bisnis dan Keuangan",
    shortDescription:
      "Manajemen organisasi, akuntansi, perbankan, kewirausahaan, pemasaran, dan perencanaan ekonomi.",
    fullDescription:
      "Rumpun Bisnis dan Keuangan mencakup profesi yang mengelola sumber daya organisasi, arus keuangan, strategi pemasaran, audit, serta pengembangan usaha agar berjalan efektif, etis, dan berkelanjutan.",
    workCharacteristics: [
      "Menganalisis laporan keuangan, tren pasar, dan risiko usaha secara terukur.",
      "Merancang strategi operasional, pemasaran, dan pengelolaan sumber daya manusia.",
      "Melakukan negosiasi, presentasi bisnis, serta pelayanan nasabah atau mitra.",
      "Menjaga integritas data transaksi dan kepatuhan perpajakan serta regulasi bisnis.",
    ],
    exampleSubjects: ["Ekonomi", "Akuntansi", "Matematika Terapan", "Kewirausahaan"],
    accentColor: "teal",
    iconName: "Briefcase",
    active: true,
    order: 4,
  },
  {
    id: "rumpun-teknik-dan-industri",
    slug: "teknik-dan-industri",
    name: "Teknik dan Industri",
    shortDescription:
      "Rekayasa sipil, mesin, elektro, manufaktur, energi, keselamatan kerja, dan konstruksi infrastruktur.",
    fullDescription:
      "Rumpun Teknik dan Industri menerapkan prinsip matematika, fisika, dan ilmu rekayasa untuk merancang infrastruktur, mesin produksi, jaringan energi, serta proses manufaktur yang aman dan efisien.",
    workCharacteristics: [
      "Merancang spesifikasi teknis, gambar kerja, dan simulasi sistem rekayasa.",
      "Mengawasi jalannya produksi di pabrik atau pembangunan di lokasi proyek lapangan.",
      "Menerapkan standar Keselamatan dan Kesehatan Kerja (K3) secara ketat.",
      "Menguji kualitas material, keandalan mesin, dan efisiensi rantai produksi.",
    ],
    exampleSubjects: ["Fisika", "Matematika Lanjut", "Gambar Teknik", "Kimia Industri"],
    accentColor: "orange",
    iconName: "Wrench",
    active: true,
    order: 5,
  },
  {
    id: "rumpun-pertanian-dan-lingkungan",
    slug: "pertanian-dan-lingkungan",
    name: "Pertanian dan Lingkungan",
    shortDescription:
      "Agroteknologi, ketahanan pangan, kehutanan, kelautan, perikanan, dan konservasi lingkungan hidup.",
    fullDescription:
      "Rumpun Pertanian dan Lingkungan berfokus pada pengelolaan sumber daya hayati, produksi pangan berkelanjutan, teknologi hasil pertanian, kehutanan, kelautan, serta pelestarian ekosistem bumi.",
    workCharacteristics: [
      "Menggabungkan pengamatan lapangan (lahan, kebun, hutan, perairan) dengan analisis laboratorium.",
      "Mengembangkan budidaya tanaman, ternak, atau perikanan yang produktif dan ramah lingkungan.",
      "Mengkaji dampak lingkungan dan merancang program rehabilitasi ekosistem.",
      "Bekerja bersama petani, masyarakat pesisir, industri pangan, dan lembaga konservasi.",
    ],
    exampleSubjects: ["Biologi", "Kimia", "Geografi", "Agribisnis & Ekologi"],
    accentColor: "green",
    iconName: "Sprout",
    active: true,
    order: 6,
  },
  {
    id: "rumpun-seni-desain-dan-media",
    slug: "seni-desain-dan-media",
    name: "Seni, Desain, dan Media",
    shortDescription:
      "Desain komunikasi visual, animasi, arsitektur interior, jurnalistik, penyiaran, dan industri kreatif.",
    fullDescription:
      "Rumpun Seni, Desain, dan Media mewadahi profesi yang menggabungkan kepekaan estetika, kekuatan bercerita (storytelling), dan teknologi media untuk menyampaikan pesan, menciptakan karya seni, atau merancang solusi visual yang fungsional.",
    workCharacteristics: [
      "Mengeksplorasi konsep kreatif, sketsa visual, audio, video, atau naskah cerita.",
      "Menerjemahkan kebutuhan pengguna atau pesan publik ke dalam karya desain yang komunikatif.",
      "Menggunakan perangkat lunak desain grafis, penyuntingan multimedia, atau instrumen seni.",
      "Berkolaborasi dalam tim produksi kreatif dengan tenggat waktu dan brief yang dinamis.",
    ],
    exampleSubjects: ["Seni Budaya", "Desain Komunikasi Visual", "Bahasa Indonesia & Inggris", "Prakarya"],
    accentColor: "purple",
    iconName: "Palette",
    active: true,
    order: 7,
  },
  {
    id: "rumpun-hukum-dan-pelayanan-publik",
    slug: "hukum-dan-pelayanan-publik",
    name: "Hukum dan Pelayanan Publik",
    shortDescription:
      "Penegakan hukum, advokasi, administrasi negara, hubungan internasional, dan layanan masyarakat.",
    fullDescription:
      "Rumpun Hukum dan Pelayanan Publik berfokus pada penegakan keadilan, penyusunan kebijakan publik, kepastian regulasi, diplomasi, serta penyelenggaraan layanan pemerintahan yang transparan bagi warga negara.",
    workCharacteristics: [
      "Mengkaji peraturan perundang-undangan, dokumen hukum, dan kebijakan publik secara kritis.",
      "Memberikan pendampingan hukum, mediasi, atau pelayanan administrasi kepada masyarakat.",
      "Menyusun argumen hukum, naskah akademik, atau laporan tata kelola pemerintahan.",
      "Menjunjung tinggi integritas, keadilan, dan etika profesi pelayanan publik.",
    ],
    exampleSubjects: ["Pendidikan Pancasila & Kewarganegaraan", "Sejarah", "Sosiologi", "Bahasa Indonesia"],
    accentColor: "blue",
    iconName: "Scale",
    active: true,
    order: 8,
  },
  {
    id: "rumpun-transportasi-dan-logistik",
    slug: "transportasi-dan-logistik",
    name: "Transportasi dan Logistik",
    shortDescription:
      "Transportasi darat, laut, udara, manajemen rantai pasok (supply chain), dan distribusi barang/penumpang.",
    fullDescription:
      "Rumpun Transportasi dan Logistik berperan vital menghubungkan wilayah kepulauan Indonesia melalui pengelolaan operasional penerbangan, pelayaran, perkeretaapian, angkutan darat, serta rantai pasok logistik.",
    workCharacteristics: [
      "Mengoperasikan atau mengendalikan sarana transportasi sesuai standar keselamatan ketat.",
      "Merencanakan rute distribusi, pergudangan, dan efisiensi waktu pengiriman.",
      "Berkoordinasi dengan otoritas pelabuhan, bandara, stasiun, dan bea cukai.",
      "Membutuhkan kesiapsiagaan fisik, disiplin waktu, dan ketangguhan kerja terstruktur.",
    ],
    exampleSubjects: ["Geografi", "Fisika", "Matematika", "Bahasa Inggris Maritim/Penerbangan"],
    accentColor: "cyan",
    iconName: "Truck",
    active: true,
    order: 9,
  },
  {
    id: "rumpun-pariwisata-dan-perhotelan",
    slug: "pariwisata-dan-perhotelan",
    name: "Pariwisata dan Perhotelan",
    shortDescription:
      "Manajemen perhotelan, kuliner, perjalanan wisata, ekowisata, dan penyelenggaraan acara (MICE).",
    fullDescription:
      "Rumpun Pariwisata dan Perhotelan mengelola pengalaman perjalanan, akomodasi, seni kuliner, pelestarian budaya destinasi, serta penyelenggaraan konvensi dan acara berskala nasional maupun internasional.",
    workCharacteristics: [
      "Memberikan pelayanan prima (hospitality) kepada wisatawan domestik dan mancanegara.",
      "Mengelola operasional hotel, restoran, destinasi wisata, atau perjalanan tur.",
      "Menguasai komunikasi lintas budaya dan keterampilan bahasa asing.",
      "Menjaga standar kebersihan, keamanan pangan, dan kenyamanan tamu.",
    ],
    exampleSubjects: ["Bahasa Inggris & Bahasa Asing", "Geografi Pariwisata", "Tata Boga / Kuliner", "Ekonomi Kreatif"],
    accentColor: "rose",
    iconName: "Compass",
    active: true,
    order: 10,
  },
];

const STANDARD_RIASEC_DISCLAIMER =
  "Catatan Edukatif: Kombinasi kode RIASEC di atas merupakan gambaran kecenderungan aktivitas kerja sebagai titik awal eksplorasi karier editorial, bukan hasil tes psikometrik mutlak atau diagnosis kepribadian. Satu profesi dapat ditekuni oleh individu dengan beragam kombinasi minat dan gaya kerja.";

export const INITIAL_PROFESSIONS: Profession[] = [
  {
    id: "prof-dokter",
    name: "Dokter",
    slug: "dokter",
    cardNumber: "01/04",
    cardSeriesName: "Seri Tenaga Kesehatan",
    rumpunSlug: "kesehatan",
    rumpunName: "Kesehatan",
    accentColor: "blue",
    summary:
      "Tenaga medis profesional yang memeriksa, mendiagnosis, mengobati, serta mencegah penyakit untuk menjaga dan memulihkan kualitas kesehatan individu maupun masyarakat.",
    description: {
      whatIsIt:
        "Dokter adalah tenaga medis yang telah menyelesaikan pendidikan akademik kedokteran dan pendidikan profesi dokter, serta memiliki kompetensi dan kewenangan resmi untuk menyelenggarakan praktik kedokteran.",
      mainPurpose:
        "Memelihara, meningkatkan derajat kesehatan, mencegah timbulnya penyakit, menegakkan diagnosis secara ilmiah, dan memberikan terapi atau tindakan medis yang tepat serta aman bagi pasien.",
      problemSolved:
        "Mengatasi gangguan kesehatan fisik maupun mental pasien, menemukan penyebab keluhan medis melalui pemeriksaan sistematis, menangani kegawatdaruratan medis, serta mencegah penyebaran penyakit di masyarakat.",
      beneficiaries:
        "Pasien dari seluruh kelompok usia (bayi, anak, remaja, dewasa, hingga lansia), keluarga pasien yang membutuhkan edukasi kesehatan, serta masyarakat luas melalui program kesehatan preventif.",
    },
    tasksAndResponsibilities: [
      "Melakukan wawancara medis (anamnesis) secara empatik dan terstruktur untuk menggali riwayat keluhan pasien serta riwayat kesehatan keluarga.",
      "Melakukan pemeriksaan fisik menyeluruh (inspeksi, palpasi, perkusi, auskultasi) menggunakan instrumen medis standar seperti stetoskop, tensimeter, dan otoskop.",
      "Menentukan kebutuhan pemeriksaan penunjang (seperti tes darah di laboratorium, rontgen, atau EKG) serta menginterpretasikan hasilnya secara klinis.",
      "Menegakkan diagnosis medis berdasarkan bukti ilmiah (evidence-based medicine) dan menyusun rencana tatalaksana terapi obat maupun tindakan medis.",
      "Memberikan pertolongan pertama dan tindakan penyelamatan jiwa (life support) pada kondisi gawat darurat medis atau trauma.",
      "Menjelaskan kondisi penyakit, pilihan pengobatan, risiko tindakan (informed consent), serta edukasi pencegahan penyakit kepada pasien dan keluarga dengan bahasa yang mudah dipahami.",
      "Mendokumentasikan seluruh hasil pemeriksaan, diagnosis, dan terapi ke dalam Rekam Medis secara akurat, lengkap, dan rahasia.",
      "Melakukan rujukan medis secara tepat waktu ke dokter spesialis atau fasilitas pelayanan kesehatan tingkat lanjut apabila kondisi pasien membutuhkan penanganan spesialistik.",
    ],
    dailyActivities: {
      routine: [
        "Memeriksa pasien rawat jalan di poliklinik atau puskesmas dan melakukan visite (kunjungan pemeriksaan) pasien rawat inap di bangsal rumah sakit.",
        "Memperbarui catatan perkembangan pasien terintegrasi pada sistem rekam medis elektronik.",
        "Berkoordinasi dengan perawat, apoteker, bidan, dan tenaga laboratorium terkait rencana perawatan harian pasien.",
      ],
      problemSolving: [
        "Menganalisis gejala klinis yang tidak khas atau kompleks untuk membedakan beberapa kemungkinan penyakit (diagnosis banding).",
        "Mengambil keputusan klinis secara cepat dan tepat saat menghadapi pasien kritis di Instalasi Gawat Darurat (IGD).",
        "Menyesuaikan terapi obat apabila pasien memiliki alergi atau penyakit penyerta (komorbid).",
      ],
      interactions: [
        "Berdiskusi langsung dengan pasien dan keluarga untuk membangun kepercayaan serta menenangkan kecemasan mereka.",
        "Berkolaborasi erat dengan perawat, apoteker, ahli gizi, dan tenaga kesehatan lain dalam tim pelayanan terpadu.",
        "Menyampaikan penyuluhan kesehatan kepada kader posyandu atau komunitas warga.",
      ],
      toolsAndTech: [
        "Instrumen diagnostik dasar (stetoskop, sphygmomanometer/tensimeter, termometer medis, pulse oximeter, oftalmoskop).",
        "Peralatan tindakan medis darurat (defibrilator/AED, alat bantu napas, set bedah minor/hecting set).",
        "Sistem Informasi Manajemen Rumah Sakit (SIMRS), Rekam Medis Elektronik (RME), dan platform telemedisin resmi.",
      ],
      workingConditions: [
        "Bekerja di dalam ruangan steril atau klinik yang terang, namun dapat pula bertugas di lapangan saat bakti sosial atau tanggap bencana.",
        "Memiliki sistem kerja giliran (shift) termasuk jaga malam, akhir pekan, atau hari libur terutama bagi dokter yang bertugas di IGD dan rawat inap.",
        "Memerlukan penggunaan Alat Pelindung Diri (APD) standar untuk mencegah paparan infeksi.",
      ],
      variationDisclaimer:
        "Catatan: Aktivitas aktual seorang dokter dapat berbeda-beda bergantung pada tempat bekerja (Puskesmas, Rumah Sakit, Klinik Pratama, atau lembaga riset), jenjang spesialisasi, dan tingkat pengalaman.",
    },
    workEnvironments: [
      {
        place: "Rumah Sakit (Umum & Khusus)",
        description:
          "Bertugas di Instalasi Gawat Darurat (IGD), poliklinik rawat jalan, ruang rawat inap, maupun ruang tindakan medis.",
      },
      {
        place: "Puskesmas & Klinik Pratama",
        description:
          "Menjadi garda terdepan layanan kesehatan primer (Fasilitas Kesehatan Tingkat Pertama) yang dekat dengan masyarakat.",
      },
      {
        place: "Institusi Pendidikan & Lembaga Riset Medis",
        description:
          "Menjadi dosen fakultas kedokteran, peneliti biomedis, atau pengembang kebijakan kesehatan.",
      },
      {
        place: "Layanan Kesehatan Kerja & Tanggap Darurat",
        description:
          "Dokter perusahaan/industri (hiperkes), layanan evakuasi medis, atau tim medis kemanusiaan.",
      },
    ],
    educationAndPathway: {
      generalEducationLevel:
        "Sarjana Kedokteran (S.Ked) dilanjutkan dengan Pendidikan Profesi Dokter (dr.).",
      studyPrograms: [
        "Program Studi Sarjana Kedokteran (Tahap Akademik, umumnya 3,5–4 tahun).",
        "Program Pendidikan Profesi Dokter / Kepaniteraan Klinik (Koas) di rumah sakit pendidikan (umumnya 1,5–2 tahun).",
      ],
      professionalEducationAndLicense: [
        "Lulus Uji Kompetensi Mahasiswa Program Profesi Dokter (UKMPPD) yang mencakup ujian teori berbasis komputer (CBT) dan ujian praktik klinis terstruktur (OSCE).",
        "Mengikuti Program Internsip Dokter Indonesia (PIDI) dari Kementerian Kesehatan untuk pemantapan kemandirian praktik.",
        "Memiliki Surat Tanda Registrasi (STR) dan Surat Izin Praktik (SIP) sesuai ketentuan Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan.",
      ],
      mandatoryRequirements: [
        "Menyelesaikan pendidikan Sarjana Kedokteran dan Profesi Dokter dari perguruan tinggi terakreditasi.",
        "Lulus uji kompetensi nasional (UKMPPD) dan mengucapkan Lafal Sumpah Dokter.",
        "Memiliki STR aktif dan SIP yang diterbitkan oleh pemerintah daerah/sistem perizinan resmi sesuai tempat praktik.",
      ],
      commonExpectations: [
        "Menguasai ilmu biomedis dasar, patofisiologi penyakit, farmakoterapi, dan keterampilan klinis dasar.",
        "Memiliki kesiapan belajar sepanjang hayat (long-life learner) karena ilmu kedokteran terus berkembang.",
      ],
      addedValueSkills: [
        "Penguasaan bahasa Inggris untuk membaca jurnal ilmiah kedokteran internasional.",
        "Kemampuan komunikasi publik dan literasi kesehatan digital.",
        "Pelatihan tambahan kegawatdaruratan seperti ATLS (Advanced Trauma Life Support) atau ACLS (Advanced Cardiac Life Support).",
      ],
      alternativePathways:
        "Profesi Dokter diatur secara ketat oleh undang-undang sehingga wajib menempuh Pendidikan Kedokteran dan Profesi Dokter. Namun, bagi siswa yang tertarik pada dunia medis dengan jalur studi berbeda (vokasi/sarjana non-dokter), tersedia profesi kesehatan lain seperti Perawat, Bidan, Apoteker, Ahli Gizi, Fisioterapis, atau Analis Kesehatan.",
      regulatoryNote:
        "Diatur dalam Undang-Undang Republik Indonesia Nomor 17 Tahun 2023 tentang Kesehatan serta regulasi Kementerian Kesehatan RI dan Konsil Kesehatan Indonesia.",
    },
    professionRequirementsSummary: [
      "Pendidikan S1 Kedokteran + Profesi Dokter (dr.)",
      "Lulus Uji Kompetensi (UKMPPD)",
      "Program Internsip Dokter Indonesia (PIDI)",
      "Surat Tanda Registrasi (STR) & Surat Izin Praktik (SIP)",
    ],
    careerProspects: {
      sectors: [
        "Pelayanan Kesehatan Pemerintah (Rumah Sakit Pemerintah, Puskesmas, Kementerian Kesehatan, TNI/Polri).",
        "Pelayanan Kesehatan Swasta (Rumah Sakit Swasta, Klinik Utama/Pratama, Layanan Kesehatan Korporasi).",
        "Akademisi, Penelitian Biomedis, dan Industri Farmasi/Alat Kesehatan.",
        "Organisasi Kesehatan Nasional maupun Internasional (seperti Dinas Kesehatan, BPJS Kesehatan, atau lembaga kemanusiaan).",
      ],
      specializations: [
        "Melanjutkan Pendidikan Dokter Spesialis (Sp.) seperti Spesialis Anak (Sp.A), Penyakit Dalam (Sp.PD), Bedah (Sp.B), Obstetri & Ginekologi (Sp.OG), Jantung (Sp.JP), Mata (Sp.M), dan lebih dari 30 bidang spesialisasi lainnya.",
        "Pendidikan Dokter Layanan Primer / Kedokteran Keluarga Layanan Primer (Sp.KKLP).",
      ],
      roleProgression: [
        "Dokter Umum Fungsional → Dokter Spesialis / Subspesialis (Konsultan).",
        "Manajemen Rumah Sakit (Direktur Medis, Kepala Puskesmas, Manajer Pelayanan Pasien).",
        "Peneliti Klinis, Dosen Kedokteran, atau Perumus Kebijakan Kesehatan Publik.",
      ],
      laborDemandFactors: [
        "Pertumbuhan jumlah penduduk dan meningkatnya kesadaran masyarakat terhadap pencegahan penyakit.",
        "Kebutuhan pemerataan tenaga medis di berbagai daerah di Indonesia, termasuk wilayah luar Pulau Jawa dan daerah kepulauan.",
        "Meningkatnya beban penyakit tidak menular (seperti diabetes dan hipertensi) serta kebutuhan layanan kesehatan lansia.",
      ],
      technologyAndIndustryImpact:
        "Perkembangan Rekam Medis Elektronik, telemedisin, dan kecerdasan buatan (AI) diagnostik membantu dokter menganalisis data medis lebih cepat. Namun, empati manusiawi, pemeriksaan fisik langsung, pertimbangan etis, dan komunikasi terapeutik dengan pasien tidak dapat digantikan oleh mesin.",
      ethicalDisclaimer:
        "Informasi prospek ini bersifat edukatif berdasarkan perkembangan sektor kesehatan nasional dan bukan jaminan penempatan kerja atau besaran penghasilan tertentu.",
    },
    riasecCodes: ["I", "S"],
    riasecDetails: [
      {
        code: "I",
        relevanceReason:
          "Pekerjaan dokter sangat lekat dengan proses investigasi ilmiah: mengumpulkan petunjuk dari gejala pasien, menganalisis hasil laboratorium, dan menarik kesimpulan diagnosis berbasis bukti medis.",
        matchingActivities: [
          "Menganalisis hubungan antara keluhan demam, hasil pemeriksaan darah, dan riwayat perjalanan pasien.",
          "Mempelajari literatur medis terbaru untuk memilih terapi obat yang paling efektif dan aman.",
        ],
      },
      {
        code: "S",
        relevanceReason:
          "Inti dari praktik kedokteran adalah menolong manusia. Dokter berinteraksi setiap hari dengan pasien yang sedang sakit atau cemas, sehingga membutuhkan kepedulian, kemampuan mendengarkan, dan edukasi yang membimbing.",
        matchingActivities: [
          "Menjelaskan rencana pengobatan kepada pasien dan keluarganya dengan sabar serta penuh empati.",
          "Membimbing masyarakat mengenai pola hidup bersih dan sehat untuk mencegah penyakit.",
        ],
      },
    ],
    riasecDisclaimer: STANDARD_RIASEC_DISCLAIMER,
    softSkills: [
      {
        name: "Empati",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Pasien datang dalam kondisi rentan, sakit, atau khawatir; empati membuat pasien merasa dihargai dan didengarkan.",
        applicationExample:
          "Mendengarkan keluhan pasien lansia dengan sabar tanpa memotong pembicaraan serta memahami kekhawatiran keluarganya.",
      },
      {
        name: "Komunikasi",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Istilah medis yang rumit harus diterjemahkan menjadi penjelasan yang jernih agar pasien memahami kondisinya dan patuh menjalani pengobatan.",
        applicationExample:
          "Menjelaskan cara kerja obat dan tanda bahaya penyakit kepada orang tua pasien anak menggunakan bahasa sehari-hari yang jelas.",
      },
      {
        name: "Pemecahan Masalah",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Setiap pasien memiliki kondisi biologis yang unik; dokter harus mampu mengurai gejala yang kompleks menjadi langkah penanganan yang tepat.",
        applicationExample:
          "Menentukan prioritas tindakan penyelamatan pada pasien kecelakaan di IGD ketika waktu sangat terbatas.",
      },
      {
        name: "Ketelitian",
        reasonNeeded:
          "Kesalahan kecil dalam membaca hasil pemeriksaan atau menghitung dosis obat dapat berdampak serius pada keselamatan pasien.",
        applicationExample:
          "Memeriksa kembali riwayat alergi obat dan fungsi ginjal pasien sebelum menuliskan resep terapi.",
      },
      {
        name: "Kerja Sama",
        reasonNeeded:
          "Pelayanan kesehatan modern dilakukan secara tim bersama perawat, apoteker, bidan, dan tenaga medis lainnya.",
        applicationExample:
          "Berdiskusi dengan apoteker dan perawat ruangan saat merencanakan perawatan terpadu bagi pasien rawat inap.",
      },
    ],
    hardSkills: [
      {
        name: "Anamnesis dan Pemeriksaan Fisik Klinis",
        reasonNeeded:
          "Merupakan fondasi utama untuk mengenali tanda-tanda penyakit pada tubuh pasien sebelum melakukan tes lanjutan.",
        applicationExample:
          "Menggunakan stetoskop untuk mendengarkan bunyi napas paru-paru dan detak jantung pasien secara sistematis.",
      },
      {
        name: "Penalaran Klinis & Penegakan Diagnosis",
        reasonNeeded:
          "Mengintegrasikan ilmu anatomi, fisiologi, dan patologi untuk menyimpulkan penyebab penyakit secara akurat.",
        applicationExample:
          "Menggabungkan data keluhan nyeri dada, rekam jantung (EKG), dan enzim darah untuk mendeteksi gangguan jantung.",
      },
      {
        name: "Tindakan Medis Dasar & Kegawatdaruratan",
        reasonNeeded:
          "Dokter harus sigap melakukan prosedur medis dasar dan bantuan hidup dasar/lanjut saat kondisi darurat.",
        applicationExample:
          "Melakukan resusitasi jantung paru (RJP), penjahitan luka (hecting), atau pemasangan alat bantu medis darurat.",
      },
      {
        name: "Penyusunan Terapi & Peresepan Rasional",
        reasonNeeded:
          "Memilih jenis obat, dosis, dan durasi terapi yang tepat sesuai kondisi klinis pasien.",
        applicationExample:
          "Menyusun resep pengobatan yang tepat indikasi dan tepat dosis berdasarkan berat badan pasien anak.",
      },
    ],
    challenges: {
      demandsAndResponsibilities: [
        "Masa pendidikan dan pelatihan yang relatif panjang (sekitar 5,5 hingga 6 tahun termasuk profesi dan internsip) serta membutuhkan komitmen belajar yang konsisten.",
        "Tanggung jawab moral, etika, dan hukum yang tinggi terhadap keselamatan pasien.",
      ],
      commonChallenges: [
        "Mengelola kelelahan fisik dan mental saat menjalani jadwal jaga malam (shift) atau menghadapi lonjakan jumlah pasien.",
        "Menghadapi situasi emosional ketika harus menyampaikan kabar buruk (breaking bad news) kepada keluarga pasien.",
      ],
      risksAndPressures: [
        "Risiko paparan penyakit menular di lingkungan kerja apabila tidak disiplin menerapkan prosedur keselamatan dan Alat Pelindung Diri.",
        "Tekanan pengambilan keputusan cepat pada situasi gawat darurat.",
      ],
      considerationsBeforeChoosing: [
        "Apakah kamu menyukai ilmu Biologi, Kimia, dan cara kerja tubuh manusia?",
        "Apakah kamu siap menempuh proses pendidikan yang panjang dan terus belajar seumur hidup?",
        "Apakah kamu memiliki ketulusan untuk melayani orang yang sedang sakit dengan sabar tanpa membeda-bedakan latar belakang?",
      ],
    },
    studentPreparation: {
      relevantSubjects: [
        "Biologi (khususnya sistem organ manusia, biologi sel, mikroorganisme, dan genetika).",
        "Kimia (reaksi kimia, senyawa organik, dan larutan yang menjadi dasar ilmu obat/farmakologi).",
        "Bahasa Indonesia & Bahasa Inggris (untuk komunikasi empatik dan membaca literatur ilmiah).",
      ],
      simpleProjects: [
        "Membuat poster atau infografis edukasi kesehatan bagi teman sekolah (misalnya tentang pencegahan anemia pada remaja atau bahaya rokok).",
        "Menulis artikel populer singkat tentang cara kerja sistem imun tubuh berdasarkan sumber Kementerian Kesehatan.",
      ],
      extracurriculars: [
        "Palang Merah Remaja (PMR) atau Usaha Kesehatan Sekolah (UKS) untuk melatih pertolongan pertama dan kepedulian kesehatan.",
        "Kelompok Ilmiah Remaja (KIR) untuk mengasah kebiasaan berpikir kritis dan metode ilmiah.",
      ],
      orgAndVolunteering: [
        "Terlibat dalam kegiatan donor darah sekolah, kampanye gizi remaja, atau bakti sosial kesehatan di lingkungan tempat tinggal.",
        "Melatih kepemimpinan dan kerja sama tim melalui kepanitiaan kegiatan sosial di OSIS atau komunitas.",
      ],
      beginnerResources: [
        "Portal edukasi kesehatan resmi Kementerian Kesehatan RI (Ayo Sehat Kemkes).",
        "Buku pengantar anatomi dan fisiologi manusia untuk pelajar SMA/SMK.",
      ],
      practitionerInterviewQuestions: [
        "Apa pengalaman paling berkesan bagi Dokter saat membantu pasien sembuh?",
        "Bagaimana cara Dokter menjaga keseimbangan waktu belajar, bekerja di rumah sakit, dan beristirahat?",
        "Keterampilan nonteknis (soft skill) apa yang menurut Dokter paling penting dilatih sejak bangku SMA/SMK?",
      ],
    },
    relatedProfessions: [
      {
        name: "Perawat",
        slug: "perawat",
        relationship:
          "Mitra utama dokter dalam memberikan asuhan keperawatan berkesinambungan dan memantau kondisi harian pasien.",
      },
      {
        name: "Apoteker",
        slug: "apoteker",
        relationship:
          "Bekerja sama memastikan terapi obat yang diresepkan dokter aman, tepat dosis, dan bebas dari interaksi obat yang merugikan.",
      },
      {
        name: "Bidan",
        slug: "bidan",
        relationship:
          "Berkolaborasi erat dalam pelayanan kesehatan ibu hamil, persalinan, nifas, serta rujukan kegawatdaruratan maternal dan neonatal.",
      },
      {
        name: "Ahli Gizi (Nutrisionis)",
        relationship:
          "Bersinergi merancang terapi nutrisi medis yang mendukung proses penyembuhan pasien.",
      },
    ],
    references: [
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan (Lembaran Negara RI Tahun 2023 Nomor 105)",
        url: "https://peraturan.bpk.go.id/Details/258028/uu-no-17-tahun-2023",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Konsil Kedokteran Indonesia / Konsil Kesehatan Indonesia",
        title: "Standar Kompetensi Dokter Indonesia (SKDI)",
        url: "https://kki.go.id",
        verifiedDate: "2025-02-01",
        category: "Standar Kompetensi",
      },
      {
        institution: "Kementerian Kesehatan Republik Indonesia",
        title: "Portal SatuSehat SDMK & Informasi Tenaga Medis dan Tenaga Kesehatan",
        url: "https://satusehat.kemkes.go.id/sdmk",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Kementerian Pendidikan Tinggi, Sains, dan Teknologi (PDDikti)",
        title: "Pangkalan Data Pendidikan Tinggi — Informasi Program Studi Kedokteran & Profesi Dokter",
        url: "https://pddikti.kemdiktisaintek.go.id",
        verifiedDate: "2025-02-01",
        category: "Pendidikan",
      },
    ],
    qrCodeUrl: "/qr/dokter.svg",
    illustrationUrl: "/illustrations/dokter.svg",
    published: true,
    updatedAt: "2025-02-15T08:00:00.000Z",
  },
  {
    id: "prof-perawat",
    name: "Perawat",
    slug: "perawat",
    cardNumber: "02/04",
    cardSeriesName: "Seri Tenaga Kesehatan",
    rumpunSlug: "kesehatan",
    rumpunName: "Kesehatan",
    accentColor: "pink",
    summary:
      "Tenaga kesehatan profesional yang memberikan asuhan keperawatan secara holistik (biologis, psikologis, sosial, dan spiritual) untuk mendampingi pemulihan dan kemandirian pasien.",
    description: {
      whatIsIt:
        "Perawat adalah seseorang yang telah lulus pendidikan tinggi Keperawatan, baik di dalam maupun luar negeri yang diakui oleh Pemerintah sesuai dengan ketentuan peraturan perundang-undangan, serta memiliki kompetensi memberikan asuhan keperawatan.",
      mainPurpose:
        "Memenuhi kebutuhan dasar manusia pasien (seperti oksigenasi, nutrisi, kenyamanan, keamanan, dan mobilisasi), memantau perkembangan kondisi klinis secara berkesinambungan, serta memfasilitasi pemulihan kesehatan individu, keluarga, dan komunitas.",
      problemSolved:
        "Membantu pasien yang mengalami keterbatasan fisik atau emosional akibat sakit agar tetap mendapatkan perawatan yang aman, mencegah komplikasi selama masa perawatan, serta mendampingi keluarga agar mampu merawat anggota keluarganya secara mandiri.",
      beneficiaries:
        "Pasien rawat inap maupun rawat jalan di segala usia, keluarga pasien, kelompok rentan, serta masyarakat di komunitas dan fasilitas kesehatan.",
    },
    tasksAndResponsibilities: [
      "Melakukan pengkajian keperawatan secara menyeluruh terhadap kondisi fisik, psikologis, sosial, dan kebutuhan dasar pasien saat mulai dirawat.",
      "Menetapkan diagnosis keperawatan dan menyusun rencana intervensi asuhan keperawatan berdasarkan Standar Asuhan Keperawatan Indonesia.",
      "Memantau dan mencatat tanda-tanda vital pasien (tekanan darah, suhu tubuh, frekuensi nadi, laju pernapasan, dan saturasi oksigen) secara berkala.",
      "Melaksanakan tindakan keperawatan seperti perawatan luka, pemasangan dan pemantauan infus, pemberian oksigen, serta bantuan pemenuhan kebutuhan dasar pasien.",
      "Memberikan obat kepada pasien sesuai rencana terapi medis dengan menerapkan prinsip keselamatan pasien (seperti Enam Benar Pemberian Obat: benar pasien, benar obat, benar dosis, benar cara, benar waktu, dan benar dokumentasi).",
      "Melakukan serah terima pasien (handover/operan jaga) secara terstruktur antar-shift perawat agar perawatan pasien berjalan berkesinambungan selama 24 jam.",
      "Memberikan edukasi kesehatan dan dukungan emosional kepada pasien serta keluarga untuk persiapan perawatan di rumah (discharge planning).",
      "Mendokumentasikan seluruh proses pengkajian, tindakan, dan evaluasi respons pasien ke dalam rekam asuhan keperawatan secara tertib.",
    ],
    dailyActivities: {
      routine: [
        "Melakukan operan jaga (timbang terima pasien) di awal dan akhir shift bersama tim perawat.",
        "Mengukur tanda-tanda vital pasien, membantu kebersihan diri pasien, dan memastikan jadwal pemberian obat tepat waktu.",
        "Mencatat perkembangan kondisi pasien dan asupan cairan/nutrisi pada lembar observasi atau sistem elektronik.",
      ],
      problemSolving: [
        "Mengenali tanda-tanda awal penurunan kondisi pasien (early warning system) dan segera mengambil langkah penanganan awal serta melaporkannya kepada dokter penanggung jawab.",
        "Menyesuaikan teknik perawatan luka atau posisi tidur pasien untuk mencegah luka tekan (dekubitus) pada pasien tirah baring lama.",
      ],
      interactions: [
        "Mendampingi pasien dengan komunikasi terapeutik yang menenangkan selama berada di ruang perawatan.",
        "Berkoordinasi dengan dokter, apoteker, ahli gizi, dan fisioterapis mengenai perkembangan harian pasien.",
        "Melatih keluarga pasien tentang cara merawat pasien secara aman ketika kembali ke rumah.",
      ],
      toolsAndTech: [
        "Alat pemeriksaan tanda vital (tensimeter digital/manual, termometer, pulse oximeter, stetoskop).",
        "Peralatan asuhan keperawatan (infusion pump, syringe pump, set perawatan luka steril, nebulizer, monitor pasien).",
        "Sistem dokumentasi keperawatan elektronik berbasis Standar Diagnosis, Luaran, dan Intervensi Keperawatan Indonesia (SDKI, SLKI, SIKI).",
      ],
      workingConditions: [
        "Bekerja dalam sistem tim dengan pembagian waktu shift (pagi, sore, malam) terutama di layanan rawat inap dan instalasi gawat darurat.",
        "Aktif bergerak di ruang perawatan untuk memantau beberapa pasien secara responsif.",
        "Menerapkan prosedur Pencegahan dan Pengendalian Infeksi (PPI) secara disiplin.",
      ],
      variationDisclaimer:
        "Catatan: Aktivitas kerja perawat dapat bervariasi sesuai unit penempatan (seperti ruang rawat inap, IGD, ICU, kamar bedah, puskesmas, atau perawatan kesehatan masyarakat/home care).",
    },
    workEnvironments: [
      {
        place: "Rumah Sakit (Berbagai Unit Pelayanan)",
        description:
          "Ruang rawat inap anak/dewasa, Instalasi Gawat Darurat (IGD), Intensive Care Unit (ICU), Kamar Operasi (OK), dan poliklinik.",
      },
      {
        place: "Puskesmas & Keperawatan Komunitas",
        description:
          "Memberikan pelayanan kesehatan dasar, kunjungan rumah (perkesmas), serta penyuluhan kesehatan masyarakat.",
      },
      {
        place: "Klinik Kesehatan, Layanan Home Care & Rehabilitasi",
        description:
          "Mendampingi perawatan jangka panjang, perawatan lansia (gerontik), atau layanan pemulihan pasca-rawat.",
      },
      {
        place: "Institusi Pendidikan, Industri & Layanan Kemanusiaan",
        description:
          "Menjadi pendidik keperawatan, perawat kesehatan kerja di perusahaan, atau tim kesehatan tanggap bencana.",
      },
    ],
    educationAndPathway: {
      generalEducationLevel:
        "Tersedia jalur Pendidikan Vokasi (Diploma Tiga / D3 Keperawatan) dan jalur Pendidikan Akademik-Profesi (Sarjana Keperawatan + Profesi Ners).",
      studyPrograms: [
        "Jalur Vokasi: Diploma Tiga (D3) Keperawatan (umumnya 3 tahun, bergelar A.Md.Kep.) untuk menjadi Perawat Vokasi.",
        "Jalur Akademik & Profesi: Sarjana Keperawatan (S.Kep., umumnya 4 tahun) dilanjutkan Program Profesi Ners (Ns., umumnya 1 tahun).",
      ],
      professionalEducationAndLicense: [
        "Lulus Uji Kompetensi Nasional Perawat (UKOM) sesuai jenjang pendidikannya.",
        "Memiliki Surat Tanda Registrasi (STR) Perawat dan Surat Izin Praktik Perawat (SIPP) sesuai ketentuan peraturan perundang-undangan.",
      ],
      mandatoryRequirements: [
        "Lulus dari program studi D3 Keperawatan atau S1 Keperawatan + Profesi Ners yang terakreditasi.",
        "Lulus Uji Kompetensi Nasional dan memiliki STR serta SIPP aktif untuk menjalankan praktik keperawatan.",
      ],
      commonExpectations: [
        "Memahami standar asuhan keperawatan (SDKI, SLKI, SIKI), keselamatan pasien (patient safety), dan komunikasi terapeutik.",
        "Memiliki ketahanan fisik yang baik, kesabaran, dan kesiapan bekerja dalam tim.",
      ],
      addedValueSkills: [
        "Sertifikasi pelatihan khusus seperti Basic Trauma Cardiac Life Support (BTCLS), keperawatan intensif (ICU), atau perawatan luka modern.",
        "Kemampuan bahasa asing (seperti Bahasa Inggris atau Bahasa Jepang) bagi yang berminat pada peluang kerja keperawatan internasional melalui skema resmi pemerintah.",
      ],
      alternativePathways:
        "Siswa lulusan SMK Keperawatan (Asisten Tenaga Kesehatan) dapat bekerja sebagai asisten tenaga kesehatan sesuai batas kewenangannya, namun untuk menjadi Perawat profesional pemegang STR tetap wajib melanjutkan pendidikan tinggi ke jenjang D3 Keperawatan atau S1 Keperawatan + Profesi Ners.",
      regulatoryNote:
        "Diatur dalam Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan (serta riwayat pengaturan pada UU Nomor 38 Tahun 2014 tentang Keperawatan) dan standar organisasi profesi Persatuan Perawat Nasional Indonesia (PPNI).",
    },
    professionRequirementsSummary: [
      "D3 Keperawatan (A.Md.Kep.) atau S1 Keperawatan + Profesi Ners (Ns.)",
      "Lulus Uji Kompetensi Nasional Perawat",
      "Surat Tanda Registrasi (STR) Perawat",
      "Surat Izin Praktik Perawat (SIPP)",
    ],
    careerProspects: {
      sectors: [
        "Fasilitas Pelayanan Kesehatan Pemerintah (RSUP, RSUD, Puskesmas, Kementerian Kesehatan).",
        "Rumah Sakit Swasta, Klinik Utama/Pratama, dan Layanan Perawatan Rumah (Home Care).",
        "Kesehatan dan Keselamatan Kerja (Occupational Health Nurse) di sektor industri, energi, dan pertambangan.",
        "Lembaga Pendidikan Kesehatan serta Penempatan Tenaga Kesehatan di Luar Negeri melalui skema kerja sama resmi pemerintah (seperti G-to-G).",
      ],
      specializations: [
        "Jenjang Spesialis Keperawatan (setelah Ners dan Magister Keperawatan), seperti Spesialis Keperawatan Medikal Bedah, Keperawatan Anak, Keperawatan Maternitas, Keperawatan Jiwa, Keperawatan Komunitas, atau Keperawatan Kardiovaskular.",
        "Perawat Mahir di unit khusus seperti Kamar Bedah, Hemodialisis (Cuci Darah), atau Gawat Darurat.",
      ],
      roleProgression: [
        "Perawat Pelaksana → Ketua Tim Keperawatan (Katim) → Kepala Ruangan (Karu) → Manajer/Bidang Keperawatan Rumah Sakit.",
        "Pendidik Klinis (Clinical Instructor), Dosen Keperawatan, atau Praktisi Mandiri Keperawatan sesuai kewenangan SIPP.",
      ],
      laborDemandFactors: [
        "Perawat merupakan komponen tenaga kesehatan dengan jumlah kebutuhan terbesar di rumah sakit dan puskesmas karena mendampingi pasien selama 24 jam.",
        "Meningkatnya populasi lansia dan kebutuhan perawatan penyakit kronis baik di dalam negeri maupun global.",
      ],
      technologyAndIndustryImpact:
        "Alat pemantau pasien pintar (smart patient monitoring) dan dokumentasi elektronik mempermudah pencatatan data tanda vital, sehingga perawat dapat mencurahkan lebih banyak waktu untuk sentuhan kemanusiaan, pendampingan emosional, dan edukasi pasien.",
      ethicalDisclaimer:
        "Informasi prospek karier ini disusun untuk tujuan edukasi perencanaan karier siswa dan tidak menjamin kepastian rekrutmen atau nominal pendapatan tertentu.",
    },
    riasecCodes: ["S", "C"],
    riasecDetails: [
      {
        code: "S",
        relevanceReason:
          "Perawat berada paling dekat dengan pasien setiap hari. Aktivitas utamanya adalah merawat, mendampingi, memberi semangat, serta mengajarkan cara hidup sehat kepada pasien dan keluarganya.",
        matchingActivities: [
          "Menenangkan pasien yang cemas sebelum menjalani tindakan medis melalui komunikasi terapeutik.",
          "Membimbing keluarga pasien cara merawat luka atau memberikan nutrisi yang benar di rumah.",
        ],
      },
      {
        code: "C",
        relevanceReason:
          "Asuhan keperawatan menuntut keteraturan, kepatuhan ketat pada prosedur keselamatan pasien, jadwal pemberian obat yang terukur, serta pencatatan rekam keperawatan yang rapi.",
        matchingActivities: [
          "Memeriksa kesesuaian identitas gelang pasien, nama obat, dosis, dan jam pemberian secara sistematis.",
          "Mendokumentasikan grafik tanda-tanda vital dan keseimbangan cairan pasien setiap pergantian shift.",
        ],
      },
    ],
    riasecDisclaimer: STANDARD_RIASEC_DISCLAIMER,
    softSkills: [
      {
        name: "Empati",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Perawat mendampingi pasien pada saat-saat paling sulit; kepekaan memahami rasa nyeri dan ketidaknyamanan pasien adalah kunci asuhan yang bermutu.",
        applicationExample:
          "Segera membantu memperbaiki posisi bantal dan memberikan selimut ketika melihat pasien menggigil atau kesulitan tidur.",
      },
      {
        name: "Komunikasi",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Perawat menjadi jembatan informasi antara pasien, keluarga, dan dokter serta harus mampu melakukan operan jaga yang akurat.",
        applicationExample:
          "Menyampaikan laporan perkembangan kondisi pasien secara ringkas, terstruktur, dan jelas kepada dokter maupun rekan perawat shift berikutnya.",
      },
      {
        name: "Kerja Sama",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Perawatan pasien selama 24 jam tidak mungkin dilakukan sendirian; dibutuhkan kekompakan antarperawat dan kolaborasi lintas profesi.",
        applicationExample:
          "Saling membantu rekan satu tim saat menangani pasien baru di ruang rawat inap atau saat tindakan resusitasi darurat.",
      },
      {
        name: "Ketelitian",
        reasonNeeded:
          "Memastikan setiap prosedur perawatan, pemantauan cairan infus, dan pemberian obat berjalan sesuai standar keselamatan pasien.",
        applicationExample:
          "Menghitung tetesan infus per menit secara cermat agar cairan yang masuk ke tubuh pasien tepat sesuai instruksi medis.",
      },
      {
        name: "Adaptabilitas",
        reasonNeeded:
          "Kondisi pasien di rumah sakit dapat berubah sewaktu-waktu, sehingga perawat harus sigap menyesuaikan prioritas tindakan.",
        applicationExample:
          "Tetap tenang dan terorganisir ketika beberapa pasien di bangsal membutuhkan bantuan dalam waktu yang hampir bersamaan.",
      },
    ],
    hardSkills: [
      {
        name: "Proses Asuhan Keperawatan (Pengkajian–Evaluasi)",
        reasonNeeded:
          "Kerangka kerja ilmiah perawat untuk mengidentifikasi masalah keperawatan dan mengevaluasi keberhasilan perawatan pasien.",
        applicationExample:
          "Menyusun rencana asuhan keperawatan pada pasien sesak napas menggunakan panduan SDKI, SLKI, dan SIKI.",
      },
      {
        name: "Keterampilan Tindakan Klinis Keperawatan",
        reasonNeeded:
          "Melaksanakan prosedur teknis perawatan dengan aman, steril, dan meminimalkan rasa nyeri pada pasien.",
        applicationExample:
          "Melakukan perawatan luka secara aseptik, pemasangan kateter/infus, dan pengambilan sampel pemeriksaan sesuai kewenangan.",
      },
      {
        name: "Pemantauan Tanda Vital & Peringatan Dini (EWS)",
        reasonNeeded:
          "Mendeteksi lebih awal apabila terjadi perburukan kondisi klinis pasien di ruang perawatan.",
        applicationExample:
          "Menghitung skor Early Warning System (EWS) dari data nadi, napas, suhu, dan tekanan darah untuk menentukan tindak lanjut segera.",
      },
      {
        name: "Penerapan Keselamatan Pasien & Pengendalian Infeksi",
        reasonNeeded:
          "Melindungi pasien dan tenaga kesehatan dari risiko infeksi rumah sakit (HAIs) maupun insiden keselamatan.",
        applicationExample:
          "Menerapkan enam langkah cuci tangan WHO pada lima momen penting perawatan serta pemilahan limbah medis dengan benar.",
      },
    ],
    challenges: {
      demandsAndResponsibilities: [
        "Menjaga kewaspadaan dan kualitas pelayanan yang sama baiknya pada shift pagi, sore, maupun dini hari.",
        "Mengelola beban fisik karena sering berdiri, berjalan, dan membantu mobilisasi pasien.",
      ],
      commonChallenges: [
        "Menghadapi pasien atau keluarga pasien yang sedang panik, lelah, atau tidak sabar sehingga menuntut kematangan regulasi emosi.",
        "Menyeimbangkan waktu antara tindakan perawatan langsung di sisi tempat tidur pasien dengan kelengkapan administrasi dokumentasi.",
      ],
      risksAndPressures: [
        "Risiko cedera otot/punggung jika tidak menerapkan postur ergonomi yang benar saat memindahkan pasien, serta risiko paparan infeksi.",
        "Kelelahan emosional (compassion fatigue) jika tidak diimbangi dengan manajemen stres dan dukungan tim yang sehat.",
      ],
      considerationsBeforeChoosing: [
        "Apakah kamu senang berinteraksi dekat dengan orang lain dan tulus membantu mereka memenuhi kebutuhan dasarnya saat sakit?",
        "Apakah kamu nyaman bekerja dalam tim yang terstruktur dan mengikuti jadwal kerja shift?",
        "Apakah kamu siap melatih kesabaran, ketenangan, dan ketelitian dalam situasi yang sibuk?",
      ],
    },
    studentPreparation: {
      relevantSubjects: [
        "Biologi (anatomi tubuh manusia, sistem pernapasan, peredaran darah, dan mikrobiologi dasar).",
        "Pendidikan Jasmani & Kesehatan (kebugaran fisik dan pertolongan pertama).",
        "Bahasa Indonesia & Bahasa Inggris (untuk komunikasi interpersonal dan dokumentasi).",
      ],
      simpleProjects: [
        "Membuat panduan visual langkah-langkah Pertolongan Pertama Pada Kecelakaan (P3K) di sekolah atau rumah.",
        "Berlatih mengukur tekanan darah dan frekuensi nadi anggota keluarga menggunakan tensimeter digital di rumah sambil mencatat hasilnya secara rapi.",
      ],
      extracurriculars: [
        "Palang Merah Remaja (PMR) — sangat relevan untuk melatih keterampilan perawatan keluarga, pertolongan pertama, dan kepedulian.",
        "Pramuka atau kegiatan pecinta alam untuk mengasah ketangguhan fisik, kerja sama regu, dan kesiapsiagaan.",
      ],
      orgAndVolunteering: [
        "Menjadi petugas piket Usaha Kesehatan Sekolah (UKS) saat upacara atau kegiatan olahraga sekolah.",
        "Mengikuti kegiatan kunjungan sosial ke panti werdha (lansia) atau posyandu di lingkungan sekitar.",
      ],
      beginnerResources: [
        "Informasi organisasi profesi Persatuan Perawat Nasional Indonesia (PPNI) dan modul Pertolongan Pertama PMI.",
        "Materi edukasi Pencegahan dan Pengendalian Infeksi dasar dari Kementerian Kesehatan RI.",
      ],
      practitionerInterviewQuestions: [
        "Bagaimana suasana kerja tim perawat saat pergantian shift di rumah sakit?",
        "Apa perbedaan utama antara jalur pendidikan D3 Keperawatan dan S1 Profesi Ners ketika sudah bekerja?",
        "Bagaimana cara Kakak/Bapak/Ibu Perawat tetap tenang dan ramah ketika menghadapi pasien yang sedang cemas?",
      ],
    },
    relatedProfessions: [
      {
        name: "Dokter",
        slug: "dokter",
        relationship:
          "Bermitra erat dalam merencanakan dan mengevaluasi terapi medis serta perawatan harian pasien.",
      },
      {
        name: "Bidan",
        slug: "bidan",
        relationship:
          "Memiliki irisan keterampilan asuhan klinis dan sering bekerja bersama di puskesmas maupun rumah sakit ibu dan anak.",
      },
      {
        name: "Apoteker",
        slug: "apoteker",
        relationship:
          "Berkoordinasi dalam penyiapan, distribusi, dan pemantauan keamanan pemberian obat kepada pasien rawat inap.",
      },
      {
        name: "Fisioterapis",
        relationship:
          "Bekerja sama membantu latihan gerak dan pemulihan fungsi fisik pasien selama masa rehabilitasi.",
      },
    ],
    references: [
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan",
        url: "https://peraturan.bpk.go.id/Details/258028/uu-no-17-tahun-2023",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Undang-Undang Nomor 38 Tahun 2014 tentang Keperawatan (Referensi Historis Rumpun Keperawatan)",
        url: "https://peraturan.bpk.go.id/Details/38782/uu-no-38-tahun-2014",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Persatuan Perawat Nasional Indonesia (PPNI)",
        title: "Standar Asuhan Keperawatan Indonesia (SDKI, SLKI, SIKI) & Organisasi Profesi Perawat",
        url: "https://ppni-inna.org",
        verifiedDate: "2025-02-01",
        category: "Organisasi Profesi",
      },
      {
        institution: "Kementerian Kesehatan Republik Indonesia",
        title: "Keputusan Menteri Kesehatan Nomor HK.01.07/MENKES/425/2020 tentang Standar Profesi Perawat",
        url: "https://peraturan.bpk.go.id/Details/152516/kepmenkes-no-hk0107menkes4252020-tahun-2020",
        verifiedDate: "2025-02-01",
        category: "Standar Kompetensi",
      },
    ],
    qrCodeUrl: "/qr/perawat.svg",
    illustrationUrl: "/illustrations/perawat.svg",
    published: true,
    updatedAt: "2025-02-15T08:00:00.000Z",
  },
  {
    id: "prof-apoteker",
    name: "Apoteker",
    slug: "apoteker",
    cardNumber: "03/04",
    cardSeriesName: "Seri Tenaga Kesehatan",
    rumpunSlug: "kesehatan",
    rumpunName: "Kesehatan",
    accentColor: "green",
    summary:
      "Tenaga kesehatan ahli di bidang kefarmasian yang memastikan mutu, keamanan, khasiat sediaan obat, serta memberikan pelayanan informasi dan konseling penggunaan obat yang rasional kepada pasien.",
    description: {
      whatIsIt:
        "Apoteker adalah sarjana farmasi yang telah lulus sebagai Apoteker dan telah mengucapkan sumpah jabatan Apoteker, serta memiliki keahlian dan kewenangan dalam praktik kefarmasian mulai dari pembuatan, pengendalian mutu, pengamanan, pengadaan, penyimpanan, pendistribusian obat, hingga pelayanan farmasi klinis.",
      mainPurpose:
        "Menjamin setiap obat, bahan obat, obat tradisional, dan kosmetika yang digunakan masyarakat memenuhi standar mutu, khasiat, dan keamanan, serta memastikan pasien menggunakan obat dengan cara, dosis, dan waktu yang tepat.",
      problemSolved:
        "Mencegah kesalahan pengobatan (medication error), mengidentifikasi interaksi antar-obat atau efek samping obat yang berbahaya, mengatasi masalah stabilitas dan ketersediaan obat, serta merumuskan sediaan farmasi yang berkualitas.",
      beneficiaries:
        "Pasien yang menebus resep atau membeli obat di apotek/rumah sakit, tenaga medis (dokter dan perawat) yang membutuhkan informasi farmakoterapi, serta masyarakat luas sebagai konsumen produk kesehatan.",
    },
    tasksAndResponsibilities: [
      "Melakukan pengkajian resep (skrining administratif, farmasetik, dan klinis) untuk memastikan ketepatan dosis, indikasi, serta tidak adanya interaksi obat yang membahayakan pasien.",
      "Menyiapkan, meracik (compounding), dan menyerahkan sediaan obat sesuai standar prosedur kefarmasian yang higienis dan akurat.",
      "Memberikan Pelayanan Informasi Obat (PIO) dan konseling langsung kepada pasien mengenai cara pakai, waktu minum obat, cara penyimpanan, serta kemungkinan efek samping obat.",
      "Melakukan Pemantauan Terapi Obat (PTO) dan visite bersama tim medis di ruang rawat inap rumah sakit untuk mengoptimalkan efektivitas pengobatan pasien.",
      "Mengelola perencanaan, pengadaan, penerimaan, dan penyimpanan perbekalan farmasi (termasuk vaksin dengan rantai dingin/cold chain dan obat narkotika/psikotropika) sesuai regulasi.",
      "Merancang formulasi, melakukan uji stabilitas, serta mengawasi proses produksi dan pemastian mutu (Quality Assurance/Quality Control) di industri farmasi.",
      "Memantau dan melaporkan kejadian Efek Samping Obat (ESO / MESO) dalam rangka farmakovigilans untuk keselamatan masyarakat.",
      "Mengedukasi masyarakat mengenai penggunaan obat secara bijak (seperti Gerakan Masyarakat Cerdas Menggunakan Obat / GeMa CerMat dan pencegahan resistensi antibiotik).",
    ],
    dailyActivities: {
      routine: [
        "Memverifikasi resep yang masuk, memeriksa kesesuaian dosis dan ketersediaan obat di apotek atau instalasi farmasi rumah sakit.",
        "Memeriksa suhu lemari pendingin penyimpanan vaksin/insulin dan kelembapan ruang penyimpanan obat secara berkala.",
        "Memberikan penjelasan tatap muka kepada pasien saat penyerahan obat di ruang konseling apotek.",
      ],
      problemSolving: [
        "Mengidentifikasi adanya potensi interaksi obat ketika seorang pasien menerima beberapa resep sekaligus dari poliklinik berbeda, lalu mendiskusikan solusi alternatifnya dengan dokter penulis resep.",
        "Menghitung penyesuaian dosis obat secara presisi untuk pasien anak-anak atau pasien dengan gangguan fungsi ginjal/hati.",
        "Menemukan penyebab ketidaksesuaian hasil uji kelarutan tablet di laboratorium pengawasan mutu industri farmasi.",
      ],
      interactions: [
        "Melakukan konseling empatik kepada pasien agar patuh menuntaskan pengobatan (misalnya terapi antibiotik atau obat hipertensi rutin).",
        "Berdiskusi dengan dokter dan perawat mengenai pemilihan sediaan obat yang paling tepat bagi kondisi pasien.",
        "Membimbing Tenaga Vokasi Farmasi (Asisten Apoteker / TTK) dalam operasional pelayanan kefarmasian harian.",
      ],
      toolsAndTech: [
        "Peralatan peracikan dan laboratorium farmasi (neraca analitik presisi tinggi, mortir dan stamper, alat uji disolusi, spektrofotometer, HPLC).",
        "Sistem manajemen inventori farmasi, e-prescribing (resep elektronik), dan basis data interaksi obat klinis.",
        "Fasilitas penyimpanan khusus (vaccine refrigerator dengan pemantau suhu terkalibrasi, lemari khusus narkotika/psikotropika berlapis ganda).",
      ],
      workingConditions: [
        "Lingkungan kerja yang bersih, teratur, ber-AC dengan pengaturan suhu dan pencahayaan terkontrol untuk menjaga mutu obat.",
        "Di industri atau laboratorium riset, bekerja di ruang bersih (cleanroom) dengan pakaian pelindung khusus sesuai standar Cara Pembuatan Obat yang Baik (CPOB).",
        "Membutuhkan konsentrasi tinggi dan kepatuhan ketat pada regulasi Badan POM dan Kementerian Kesehatan.",
      ],
      variationDisclaimer:
        "Catatan: Peran harian Apoteker sangat bervariasi tergantung bidang yang ditekuni — apakah di pelayanan klinis (Rumah Sakit, Apotek, Puskesmas), di Industri Farmasi/Kosmetika (R&D, Produksi, QC/QA), di Distribusi (PBF), atau di lembaga pengawas seperti BPOM.",
    },
    workEnvironments: [
      {
        place: "Instalasi Farmasi Rumah Sakit, Puskesmas & Apotek Komunitas",
        description:
          "Berfokus pada pelayanan farmasi klinis, pengkajian resep, konseling pasien, dan pengelolaan perbekalan kesehatan.",
      },
      {
        place: "Industri Farmasi, Obat Bahan Alam & Kosmetika",
        description:
          "Bekerja di bagian Research & Development (R&D), Produksi, Quality Control (QC), Quality Assurance (QA), atau Registrasi Produk.",
      },
      {
        place: "Pedagang Besar Farmasi (PBF) & Rantai Pasok Kesehatan",
        description:
          "Menjadi Apoteker Penanggung Jawab yang memastikan Cara Distribusi Obat yang Baik (CDOB) ke seluruh Indonesia.",
      },
      {
        place: "Lembaga Regulasi, Pemerintahan & Pendidikan",
        description:
          "Badan Pengawas Obat dan Makanan (BPOM), Kementerian Kesehatan, Dinas Kesehatan, laboratorium pengujian, serta perguruan tinggi.",
      },
    ],
    educationAndPathway: {
      generalEducationLevel:
        "Sarjana Farmasi (S.Farm.) dilanjutkan dengan Pendidikan Profesi Apoteker (apt.).",
      studyPrograms: [
        "Program Studi Sarjana Farmasi (S1 Farmasi, umumnya ditempuh selama 4 tahun).",
        "Program Studi Pendidikan Profesi Apoteker (PSPA, umumnya ditempuh selama 1 tahun termasuk Praktik Kerja Profesi Apoteker/PKPA di rumah sakit, apotek, industri, dan distribusi).",
      ],
      professionalEducationAndLicense: [
        "Lulus Uji Kompetensi Mahasiswa Program Profesi Apoteker Indonesia (UKMPPAI) yang meliputi metode Computer-Based Test (CBT) dan Objective Structured Clinical Examination (OSCE).",
        "Mengucapkan Sumpah Apoteker dan memiliki Surat Tanda Registrasi (STR) serta Surat Izin Praktik Apoteker (SIPA).",
      ],
      mandatoryRequirements: [
        "Menyelesaikan pendidikan S1 Farmasi dan Profesi Apoteker dari perguruan tinggi terakreditasi.",
        "Lulus uji kompetensi nasional (UKMPPAI) serta memegang STR dan SIPA aktif untuk berpraktik.",
      ],
      commonExpectations: [
        "Menguasai kimia farmasi, farmakologi (cara kerja obat di tubuh), farmasetika (formulasi obat), dan farmasi klinis.",
        "Memahami standar Cara Pembuatan Obat yang Baik (CPOB), Cara Distribusi Obat yang Baik (CDOB), dan Standar Pelayanan Kefarmasian.",
      ],
      addedValueSkills: [
        "Kemampuan analisis instrumen laboratorium modern dan pemahaman regulasi registrasi obat/kosmetika.",
        "Keterampilan komunikasi konseling dan kewirausahaan bagi yang ingin mengelola apotek mandiri.",
      ],
      alternativePathways:
        "Bagi siswa SMK Farmasi atau lulusan D3 Farmasi, terdapat profesi Tenaga Vokasi Farmasi (dahulu dikenal sebagai Tenaga Teknis Kefarmasian / Asisten Apoteker) yang dapat langsung bekerja membantu pelayanan kefarmasian sesuai kewenangannya. Untuk menjadi Apoteker penuh dengan kewenangan penanggung jawab, tetap perlu melanjutkan ke jenjang S1 Farmasi dan Profesi Apoteker.",
      regulatoryNote:
        "Diatur dalam Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan, Peraturan Pemerintah Nomor 51 Tahun 2009 tentang Pekerjaan Kefarmasian, serta regulasi Kementerian Kesehatan dan BPOM RI.",
    },
    professionRequirementsSummary: [
      "Pendidikan S1 Farmasi (S.Farm.) + Profesi Apoteker (apt.)",
      "Lulus Uji Kompetensi Nasional (UKMPPAI)",
      "Surat Tanda Registrasi (STR) Apoteker",
      "Surat Izin Praktik Apoteker (SIPA)",
    ],
    careerProspects: {
      sectors: [
        "Pelayanan Kesehatan (Rumah Sakit Pemerintah/Swasta, Puskesmas, Apotek Jaringan maupun Mandiri, Klinik).",
        "Industri Manufaktur (Industri Farmasi Nasional/Multinasional, Industri Obat Tradisional/Herbal Terstandar, Industri Kosmetika & Skincare).",
        "Distribusi Farmasi (Pedagang Besar Farmasi / Logistik Vaksin dan Obat).",
        "Regulator & Riset (BPOM, Kementerian Kesehatan, Lembaga Riset Nasional, dan Perguruan Tinggi).",
      ],
      specializations: [
        "Apoteker Spesialis (seperti Spesialis Farmasi Nuklir atau Spesialis Farmasi Klinis).",
        "Peminatan di bidang Farmasi Rumah Sakit, Farmasi Industri (Formulator/QA/QC), Regulatory Affairs, atau Farmakoekonomi.",
      ],
      roleProgression: [
        "Di Pelayanan: Apoteker Pendamping → Apoteker Penanggung Jawab Apotek (APA) / Kepala Instalasi Farmasi Rumah Sakit.",
        "Di Industri: Staf R&D/QC/Produksi → Manajer Pemastian Mutu (QA Manager) / Plant Director.",
      ],
      laborDemandFactors: [
        "Kewajiban regulasi bahwa setiap apotek, instalasi farmasi rumah sakit, industri farmasi, dan distributor obat wajib memiliki Apoteker Penanggung Jawab.",
        "Perkembangan pesat industri kesehatan, kemandirian bahan baku obat nasional, obat bahan alam Indonesia, serta industri kosmetika yang aman.",
      ],
      technologyAndIndustryImpact:
        "Otomatisasi pengemasan obat dan resep elektronik mengurangi beban administratif, sehingga peran Apoteker semakin bergeser dari sekadar penyedia produk (drug oriented) menjadi pemberi asuhan kefarmasian yang berfokus pada keselamatan pasien (patient oriented) serta inovasi formulasi.",
      ethicalDisclaimer:
        "Gambaran prospek ini bertujuan membuka wawasan bidang kerja kefarmasian bagi siswa dan bukan jaminan penempatan atau penghasilan tertentu.",
    },
    riasecCodes: ["I", "C"],
    riasecDetails: [
      {
        code: "I",
        relevanceReason:
          "Apoteker mendalami sains kimia dan biologi untuk meneliti senyawa obat, menganalisis cara kerja obat di dalam tubuh, serta memecahkan masalah terapi dan interaksi obat secara ilmiah.",
        matchingActivities: [
          "Menganalisis struktur kimia obat, mekanisme farmakologi, dan kemungkinan interaksi antar-obat pada resep pasien.",
          "Melakukan eksperimen formulasi dan pengujian mutu sediaan tablet atau sirup di laboratorium.",
        ],
      },
      {
        code: "C",
        relevanceReason:
          "Praktik kefarmasian menuntut ketelitian tinggi, kepatuhan pada standar prosedur operasional (CPOB/CDOB), perhitungan dosis miligram yang presisi, serta pencatatan stok dan pelaporan regulasi yang tertib.",
        matchingActivities: [
          "Memeriksa kelengkapan legalitas resep, menghitung dosis racikan secara akurat, dan melakukan pelabelan obat dengan cermat.",
          "Mendokumentasikan kartu stok dan pelaporan penggunaan obat golongan narkotika/psikotropika sesuai aturan resmi.",
        ],
      },
    ],
    riasecDisclaimer: STANDARD_RIASEC_DISCLAIMER,
    softSkills: [
      {
        name: "Ketelitian",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Perbedaan angka desimal pada dosis miligram atau kemiripan nama obat (Look-Alike Sound-Alike / LASA) membutuhkan kecermatan tinggi agar pasien tetap aman.",
        applicationExample:
          "Melakukan pengecekan ganda (double check) pada nama obat, kekuatan sediaan (misal 5 mg vs 50 mg), dan aturan pakai sebelum obat diserahkan kepada pasien.",
      },
      {
        name: "Komunikasi",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Obat yang bermutu tinggi sekalipun tidak akan bekerja optimal jika pasien salah memahami cara penggunaannya.",
        applicationExample:
          "Mendemonstrasikan cara penggunaan alat semprot asma (inhaler) atau pena insulin kepada pasien dan meminta pasien mengulanginya untuk memastikan pemahaman.",
      },
      {
        name: "Pemecahan Masalah",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Apoteker harus mampu mencari solusi klinis maupun teknis ketika terjadi masalah terkait obat (Drug Related Problems) atau kendala formulasi.",
        applicationExample:
          "Memberikan rekomendasi penggantian bentuk sediaan obat dari tablet ke suspensi cair bagi pasien lansia yang mengalami kesulitan menelan.",
      },
      {
        name: "Kerja Sama",
        reasonNeeded:
          "Berada dalam ekosistem kolaborasi interprofesional bersama dokter, perawat, dan tenaga vokasi farmasi.",
        applicationExample:
          "Menghubungi dokter penulis resep secara santun dan kolaboratif untuk mengonfirmasi penyesuaian dosis obat pasien.",
      },
      {
        name: "Empati",
        reasonNeeded:
          "Memahami kendala yang dihadapi pasien dalam menjalani pengobatan jangka panjang sehingga pasien merasa didukung.",
        applicationExample:
          "Membantu menyusun jadwal minum obat harian yang praktis bagi pasien dengan banyak jenis obat agar tidak terlupa.",
      },
    ],
    hardSkills: [
      {
        name: "Farmakologi & Pengkajian Terapi Klinis",
        reasonNeeded:
          "Memahami perjalanan obat di dalam tubuh (farmakokinetik) dan efek obat terhadap tubuh (farmakodinamik).",
        applicationExample:
          "Mendeteksi bahwa obat A dapat menurunkan efektivitas obat B jika diminum bersamaan, lalu mengatur jeda waktu minumnya.",
      },
      {
        name: "Formulasi, Peracikan & Teknologi Sediaan Farmasi",
        reasonNeeded:
          "Mengubah zat aktif obat menjadi bentuk sediaan (tablet, kapsul, salep, sirup, injeksi steril) yang stabil dan aman digunakan.",
        applicationExample:
          "Menentukan bahan tambahan (eksipien) yang tepat agar tablet obat mudah hancur dan diserap di saluran pencernaan.",
      },
      {
        name: "Analisis Kimia Farmasi & Pengawasan Mutu",
        reasonNeeded:
          "Memastikan kadar zat aktif dan kemurnian obat sesuai persyaratan Farmakope Indonesia.",
        applicationExample:
          "Menguji kadar zat aktif sampel obat di laboratorium menggunakan instrumen Kromatografi Cair Kinerja Tinggi (HPLC).",
      },
      {
        name: "Manajemen Perbekalan Farmasi & Regulasi",
        reasonNeeded:
          "Menjaga rantai pasok obat agar tidak rusak, kedaluwarsa, atau disalahgunakan.",
        applicationExample:
          "Mengelola penyimpanan obat dengan sistem FEFO (First Expired, First Out) dan memelihara rantai dingin vaksin pada suhu 2–8 °C.",
      },
    ],
    challenges: {
      demandsAndResponsibilities: [
        "Tanggung jawab hukum dan etika yang besar sebagai penanggung jawab mutu serta keamanan obat yang beredar dan dikonsumsi pasien.",
        "Kewajiban menjaga integritas tinggi untuk mencegah penyalahgunaan obat keras maupun obat golongan khusus.",
      ],
      commonChallenges: [
        "Membaca dan mengonfirmasi resep yang kurang jelas atau mengatasi kekosongan stok obat tertentu dengan mencarikan alternatif yang setara atas persetujuan dokter.",
        "Mengedukasi masyarakat yang masih sering membeli obat keras (seperti antibiotik) tanpa resep dokter atau terpengaruh informasi kesehatan yang keliru.",
      ],
      risksAndPressures: [
        "Di laboratorium atau industri, berinteraksi dengan bahan kimia dan zat aktif obat sehingga wajib mematuhi prosedur keselamatan kerja laboratorium.",
        "Tuntutan akurasi tinggi (zero defect mindset) dalam penimbangan, pelabelan, dan pengawasan mutu.",
      ],
      considerationsBeforeChoosing: [
        "Apakah kamu menyukai pelajaran Kimia dan Biologi serta tertarik mempelajari bagaimana senyawa obat bekerja menyembuhkan penyakit?",
        "Apakah kamu termasuk pribadi yang teliti, rapi, dan menyukai prosedur ilmiah yang terukur?",
        "Apakah kamu tertarik mengombinasikan kemampuan sains laboratorium dengan komunikasi edukasi kepada masyarakat?",
      ],
    },
    studentPreparation: {
      relevantSubjects: [
        "Kimia (stoikiometri, kimia organik, larutan penyangga, kelarutan, dan analisis kimia).",
        "Biologi (fisiologi manusia, mikrobiologi, dan botani/tanaman obat).",
        "Matematika (perhitungan rasio, konsentrasi larutan, dan statistika dasar).",
      ],
      simpleProjects: [
        "Mengamati kemasan obat di kotak P3K rumah untuk mengenali penggolongan logo obat (lingkaran hijau: obat bebas, biru: bebas terbatas, merah dengan huruf K: obat keras, serta logo jamu/herbal terstandar/fitofarmaka).",
        "Membuat proyek inventarisasi Tanaman Obat Keluarga (TOGA) di lingkungan rumah atau sekolah beserta kajian manfaat ilmiahnya.",
      ],
      extracurriculars: [
        "Kelompok Ilmiah Remaja (KIR) bidang Kimia/Biologi atau klub sains laboratorium sekolah.",
        "Palang Merah Remaja (PMR) untuk mengenal pengelolaan obat pertolongan pertama.",
      ],
      orgAndVolunteering: [
        "Berpartisipasi dalam kampanye edukasi 'Tanya Lima O' (Obat ini apa namanya, apa khasiatnya, berapa dosisnya, bagaimana cara pakainya, apa efek sampingnya) di sekolah.",
        "Mengelola administrasi atau inventaris organisasi sekolah untuk melatih ketertiban pencatatan.",
      ],
      beginnerResources: [
        "Portal edukasi Badan Pengawas Obat dan Makanan (BPOM RI) dan aplikasi Cek BPOM untuk belajar mengenali izin edar produk.",
        "Panduan Gerakan Masyarakat Cerdas Menggunakan Obat (GeMa CerMat) dari Kementerian Kesehatan RI.",
      ],
      practitionerInterviewQuestions: [
        "Apa perbedaan keseharian kerja Apoteker yang bertugas di Rumah Sakit/Apotek dibandingkan dengan Apoteker di Industri Farmasi?",
        "Mengapa pasien tidak boleh sembarangan mengonsumsi antibiotik tanpa resep dan pengawasan?",
        "Pelajaran kimia atau biologi apa di SMA/SMK yang paling sering terpakai saat kuliah Farmasi?",
      ],
    },
    relatedProfessions: [
      {
        name: "Dokter",
        slug: "dokter",
        relationship:
          "Bermitra dalam penentuan terapi obat yang efektif dan aman sesuai diagnosis medis pasien.",
      },
      {
        name: "Perawat",
        slug: "perawat",
        relationship:
          "Bekerja sama dalam distribusi obat pasien rawat inap dan pemantauan efek terapi obat di bangsal.",
      },
      {
        name: "Bidan",
        slug: "bidan",
        relationship:
          "Bersinergi dalam penyediaan suplemen kehamilan, imunisasi dasar, dan obat pelayanan kesehatan ibu dan anak.",
      },
      {
        name: "Tenaga Vokasi Farmasi (TTK)",
        relationship:
          "Mitra kerja langsung Apoteker dalam penyiapan perbekalan farmasi dan pelayanan teknis kefarmasian.",
      },
    ],
    references: [
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan",
        url: "https://peraturan.bpk.go.id/Details/258028/uu-no-17-tahun-2023",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Peraturan Pemerintah Nomor 51 Tahun 2009 tentang Pekerjaan Kefarmasian",
        url: "https://peraturan.bpk.go.id/Details/4977/pp-no-51-tahun-2009",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Kementerian Kesehatan Republik Indonesia",
        title: "Peraturan Menteri Kesehatan Nomor 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Rumah Sakit & Permenkes Nomor 73 Tahun 2016 di Apotek",
        url: "https://peraturan.bpk.go.id/Details/114486/permenkes-no-73-tahun-2016",
        verifiedDate: "2025-02-01",
        category: "Standar Kompetensi",
      },
      {
        institution: "Ikatan Apoteker Indonesia (IAI)",
        title: "Informasi Organisasi Profesi & Standar Kompetensi Apoteker Indonesia",
        url: "https://iai.id",
        verifiedDate: "2025-02-01",
        category: "Organisasi Profesi",
      },
    ],
    qrCodeUrl: "/qr/apoteker.svg",
    illustrationUrl: "/illustrations/apoteker.svg",
    published: true,
    updatedAt: "2025-02-15T08:00:00.000Z",
  },
  {
    id: "prof-bidan",
    name: "Bidan",
    slug: "bidan",
    cardNumber: "04/04",
    cardSeriesName: "Seri Tenaga Kesehatan",
    rumpunSlug: "kesehatan",
    rumpunName: "Kesehatan",
    accentColor: "purple",
    summary:
      "Tenaga kesehatan profesional yang mendampingi kesehatan perempuan sepanjang siklus reproduksi, mulai dari masa kehamilan, persalinan, nifas, hingga tumbuh kembang bayi baru lahir dan balita.",
    description: {
      whatIsIt:
        "Bidan adalah seorang perempuan yang telah menyelesaikan program pendidikan Kebidanan baik di dalam maupun di luar negeri yang diakui secara sah oleh Pemerintah Pusat dan telah memenuhi persyaratan untuk melakukan praktik Kebidanan.",
      mainPurpose:
        "Menjaga keselamatan dan kesejahteraan ibu serta bayi melalui asuhan kebidanan yang berkesinambungan, memberdayakan perempuan dan keluarga, serta menurunkan risiko komplikasi kehamilan, persalinan, dan stunting pada anak.",
      problemSolved:
        "Memantau kesehatan ibu hamil agar tanda bahaya kehamilan terdeteksi sejak dini, menolong persalinan normal secara aman, mendampingi perawatan masa nifas dan menyusui (ASI eksklusif), serta memantau imunisasi dan tumbuh kembang bayi/balita.",
      beneficiaries:
        "Remaja putri dan calon pengantin (kesehatan reproduksi), ibu hamil, ibu bersalin, ibu nifas dan menyusui, bayi baru lahir (neonatus), balita, serta keluarga dan komunitas.",
    },
    tasksAndResponsibilities: [
      "Melakukan pemeriksaan kehamilan terpadu (Antenatal Care / ANC) secara berkala untuk memantau kesehatan ibu dan pertumbuhan janin di dalam kandungan.",
      "Menolong persalinan fisiologis (normal) dengan menerapkan standar Asuhan Persalinan Normal (APN) yang bersih, aman, dan menghormati kenyamanan ibu.",
      "Melakukan perawatan segera pada bayi baru lahir, termasuk Inisiasi Menyusu Dini (IMD), pemeriksaan fisik neonatus, serta pemberian imunisasi dasar sesuai kewenangan.",
      "Memberikan asuhan masa nifas (pasca-melahirkan) untuk memantau pemulihan kesehatan ibu, mendukung keberhasilan menyusui (konseling laktasi), dan kesehatan mental ibu.",
      "Mendeteksi secara dini tanda bahaya atau risiko komplikasi pada kehamilan, persalinan, nifas, maupun bayi baru lahir, serta melakukan stabilisasi awal dan rujukan tepat waktu ke rumah sakit/dokter spesialis.",
      "Memberikan pelayanan konseling Kesehatan Reproduksi perempuan dan pelayanan Keluarga Berencana (KB) sesuai ketentuan peraturan perundang-undangan.",
      "Memantau pertumbuhan dan perkembangan bayi serta balita (berat badan, panjang/tinggi badan, lingkar kepala) menggunakan Buku Kesehatan Ibu dan Anak (Buku KIA) dalam upaya pencegahan stunting.",
      "Melakukan pencatatan dan pelaporan pelayanan Kesehatan Ibu dan Anak (kohort ibu dan bayi) secara akurat.",
    ],
    dailyActivities: {
      routine: [
        "Memeriksa tekanan darah ibu hamil, mengukur tinggi fundus uteri, dan mendengarkan detak jantung janin di ruang pemeriksaan KIA.",
        "Mengisi dan menjelaskan catatan pada Buku Kesehatan Ibu dan Anak (Buku KIA) bersama ibu dan suami/keluarga.",
        "Melayani penimbangan balita, imunisasi dasar, serta penyuluhan gizi ibu dan anak di Posyandu atau Puskesmas.",
      ],
      problemSolving: [
        "Mengenali gejala preeklampsia (tekanan darah tinggi pada kehamilan) atau posisi janin tidak normal sejak dini, lalu mengoordinasikan rujukan terencana ke rumah sakit.",
        "Melakukan penanganan awal kegawatdaruratan maternal dan neonatal apabila terjadi perdarahan pasca-persalinan atau bayi kesulitan bernapas saat lahir.",
      ],
      interactions: [
        "Mendampingi ibu yang sedang menghadapi kontraksi persalinan dengan penuh kesabaran, ketenangan, dan dukungan emosional.",
        "Berkomunikasi erat dengan dokter spesialis obstetri dan ginekologi (Sp.OG), dokter spesialis anak (Sp.A), perawat, dan kader kesehatan desa/kelurahan.",
        "Mengedukasi remaja putri tentang kesehatan reproduksi dan pencegahan anemia.",
      ],
      toolsAndTech: [
        "Alat pemeriksaan kehamilan (Fetal Doppler atau Laennec untuk detak jantung janin, pita ukur LILA/fundus, tensimeter, timbangan ibu dan bayi).",
        "Partograf (lembar pemantauan kemajuan persalinan) dan Buku Kesehatan Ibu dan Anak (Buku KIA).",
        "Set pertolongan persalinan steril (partus set), inkubator bayi/penghangat bayi (infant warmer), dan aplikasi pencatatan kohort KIA elektronik.",
      ],
      workingConditions: [
        "Bekerja di ruang bersalin (kamar bersalin/VK), poli KIA Puskesmas, klinik bersalin, atau tempat praktik mandiri bidan.",
        "Siap siaga karena proses kelahiran bayi dapat berlangsung kapan saja, baik siang maupun malam hari.",
        "Sering terjun langsung ke tengah masyarakat desa atau kelurahan dalam kegiatan Posyandu dan kelas ibu hamil.",
      ],
      variationDisclaimer:
        "Catatan: Aktivitas kerja Bidan dapat berbeda sesuai tempat pengabdian, misalnya antara Bidan di Rumah Sakit, Bidan Puskesmas/Desa yang banyak membina komunitas, atau Bidan Praktik Mandiri.",
    },
    workEnvironments: [
      {
        place: "Puskesmas, Pustu & Poskesdes/Polindes",
        description:
          "Menjadi ujung tombak pelayanan Kesehatan Ibu dan Anak (KIA), Posyandu, dan pembinaan kesehatan keluarga di masyarakat.",
      },
      {
        place: "Rumah Sakit Umum & Rumah Sakit Ibu dan Anak (RSIA)",
        description:
          "Bertugas di Kamar Bersalin (VK), ruang nifas, ruang perinatologi, dan poliklinik kebidanan.",
      },
      {
        place: "Tempat Praktik Mandiri Bidan (TPMB) & Klinik Pratama",
        description:
          "Menyelenggarakan layanan kebidanan primer secara mandiri bagi masyarakat sekitar sesuai persyaratan izin praktik.",
      },
      {
        place: "Institusi Pendidikan & Program Kesehatan Masyarakat",
        description:
          "Menjadi dosen/instruktur kebidanan atau pengelola program kesehatan ibu, anak, dan gizi di dinas kesehatan/lembaga sosial.",
      },
    ],
    educationAndPathway: {
      generalEducationLevel:
        "Tersedia jalur Pendidikan Vokasi (Diploma Tiga / D3 Kebidanan) dan jalur Pendidikan Akademik-Profesi (Sarjana Kebidanan / D4 + Pendidikan Profesi Bidan).",
      studyPrograms: [
        "Jalur Vokasi: Diploma Tiga (D3) Kebidanan (umumnya 3 tahun, bergelar A.Md.Keb.) untuk menjadi Bidan Vokasi.",
        "Jalur Akademik & Profesi: Sarjana Kebidanan (S.Keb.) atau Sarjana Terapan Kebidanan (S.Tr.Keb.) dilanjutkan Program Pendidikan Profesi Bidan (Bdn.).",
      ],
      professionalEducationAndLicense: [
        "Lulus Uji Kompetensi Nasional Bidan Indonesia sesuai jenjang pendidikannya.",
        "Memiliki Surat Tanda Registrasi (STR) Bidan dan Surat Izin Praktik Bidan (SIPB).",
      ],
      mandatoryRequirements: [
        "Sesuai regulasi kebidanan di Indonesia, profesi Bidan ditempuh oleh perempuan yang lulus dari pendidikan tinggi Kebidanan terakreditasi.",
        "Wajib lulus Uji Kompetensi dan memiliki STR serta SIPB aktif untuk menjalankan praktik kebidanan.",
        "Berdasarkan ketentuan perundang-undangan kebidanan, penyelenggaraan Praktik Mandiri Bidan mensyaratkan kualifikasi Pendidikan Profesi Bidan.",
      ],
      commonExpectations: [
        "Menguasai asuhan kehamilan, persalinan normal, nifas, bayi baru lahir, keluarga berencana, dan deteksi dini komplikasi.",
        "Memiliki empati keibuan, ketenangan dalam situasi kritis, dan kemampuan komunikasi komunitas yang kuat.",
      ],
      addedValueSkills: [
        "Pelatihan Penanganan Kegawatdaruratan Maternal dan Neonatal (seperti PPGDON / PONED).",
        "Keterampilan konseling menyusui (laktasi), pijat bayi sehat, dan edukasi kelas ibu hamil.",
      ],
      alternativePathways:
        "Lulusan D3 Kebidanan dapat langsung bekerja sebagai Bidan Vokasi di fasilitas pelayanan kesehatan (seperti Rumah Sakit, Puskesmas, atau Klinik), dan dapat melanjutkan studi alih jenjang (bridging) ke Sarjana Kebidanan dan Pendidikan Profesi Bidan untuk memperluas kewenangan praktik mandiri.",
      regulatoryNote:
        "Diatur dalam Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan (serta riwayat pengaturan pada UU Nomor 4 Tahun 2019 tentang Kebidanan) dan standar organisasi profesi Ikatan Bidan Indonesia (IBI).",
    },
    professionRequirementsSummary: [
      "D3 Kebidanan (A.Md.Keb.) atau S1/D4 Kebidanan + Profesi Bidan (Bdn.)",
      "Lulus Uji Kompetensi Nasional Bidan",
      "Surat Tanda Registrasi (STR) Bidan",
      "Surat Izin Praktik Bidan (SIPB)",
    ],
    careerProspects: {
      sectors: [
        "Layanan Kesehatan Pemerintah (Puskesmas, Rumah Sakit Daerah/Pusat, Dinas Kesehatan, BKKBN).",
        "Fasilitas Kesehatan Swasta (Rumah Sakit Ibu dan Anak, Rumah Sakit Umum, Klinik Bersalin).",
        "Praktik Mandiri Bidan (bagi pemegang kualifikasi Profesi Bidan sesuai regulasi).",
        "Pendidikan Kebidanan dan Program Pemberdayaan Kesehatan Ibu & Anak.",
      ],
      specializations: [
        "Pengembangan keahlian di bidang Konselor Laktasi, Asuhan Kebidanan Komunitas, Kesehatan Reproduksi Remaja, atau Manajemen Pelayanan KIA.",
        "Studi lanjut Magister (S2) Kebidanan atau Kesehatan Masyarakat (KIA/Kespro).",
      ],
      roleProgression: [
        "Bidan Pelaksana → Bidan Koordinator (Bikor) Puskesmas / Kepala Ruang Bersalin Rumah Sakit.",
        "Pengelola Tempat Praktik Mandiri Bidan (TPMB) terstandar (seperti jaringan Bidan Delima).",
        "Dosen Kebidanan atau Analis Kebijakan Kesehatan Ibu dan Anak.",
      ],
      laborDemandFactors: [
        "Komitmen nasional Indonesia untuk menurunkan Angka Kematian Ibu (AKI), Angka Kematian Bayi (AKB), serta percepatan penurunan stunting membutuhkan peran aktif bidan hingga ke tingkat desa/kelurahan.",
        "Kebutuhan pendampingan kesehatan reproduksi, kehamilan, dan tumbuh kembang anak yang berkelanjutan di setiap keluarga.",
      ],
      technologyAndIndustryImpact:
        "Aplikasi pemantauan kehamilan digital, USG dasar terarah di layanan primer, dan pencatatan kohort elektronik membantu deteksi dini risiko kehamilan. Sementara itu, kehadiran fisik dan dukungan psikologis bidan saat mendampingi ibu bersalin tetap tak tergantikan.",
      ethicalDisclaimer:
        "Uraian prospek ini disajikan untuk membantu siswa memahami ruang lingkup karier kebidanan dan bukan janji kepastian kerja atau penghasilan tertentu.",
    },
    riasecCodes: ["S", "C"],
    riasecDetails: [
      {
        code: "S",
        relevanceReason:
          "Bidan membangun hubungan pendampingan yang sangat dekat dengan ibu dan keluarga. Membimbing ibu hamil, menenangkan ibu saat melahirkan, serta menyuluh kader posyandu adalah aktivitas sosial yang sarat kepedulian.",
        matchingActivities: [
          "Memfasilitasi Kelas Ibu Hamil untuk berbagi pengetahuan nutrisi, senam hamil, dan persiapan persalinan.",
          "Memberikan dukungan emosional dan bimbingan menyusui kepada ibu yang baru pertama kali melahirkan.",
        ],
      },
      {
        code: "C",
        relevanceReason:
          "Keselamatan ibu dan bayi sangat bergantung pada pemantauan yang teratur dan terdokumentasi rapi, seperti pengisian grafik partograf saat persalinan dan pencatatan kurva pertumbuhan anak di Buku KIA.",
        matchingActivities: [
          "Mencatat pembukaan jalan lahir, kontraksi, dan detak jantung janin secara berkala pada lembar Partograf untuk memastikan persalinan berjalan aman.",
          "Mendata jadwal imunisasi dasar dan grafik berat badan balita secara tertib.",
        ],
      },
    ],
    riasecDisclaimer: STANDARD_RIASEC_DISCLAIMER,
    softSkills: [
      {
        name: "Empati",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Proses kehamilan dan melahirkan membawa perubahan fisik dan emosi yang besar bagi seorang ibu; empati bidan memberikan rasa aman dan kekuatan.",
        applicationExample:
          "Mendampingi ibu yang merasa takut menghadapi persalinan pertama dengan tutur kata yang lembut dan menenangkan.",
      },
      {
        name: "Komunikasi",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Bidan harus mampu memberikan instruksi yang jelas saat persalinan serta mengedukasi keluarga dengan menghormati latar belakang budaya setempat.",
        applicationExample:
          "Menjelaskan pentingnya pemberian ASI eksklusif selama 6 bulan kepada ibu dan nenek bayi dengan pendekatan yang santun dan persuasif.",
      },
      {
        name: "Kerja Sama",
        isPrimaryOnCard: true,
        reasonNeeded:
          "Pertolongan persalinan dan rujukan kegawatdaruratan membutuhkan koordinasi sigap bersama tim kesehatan, kader, dan keluarga pasien.",
        applicationExample:
          "Bekerja sama dengan dokter spesialis kandungan dan perawat perinatologi saat menangani rujukan ibu hamil berisiko tinggi.",
      },
      {
        name: "Ketelitian",
        reasonNeeded:
          "Bidan memantau dua kehidupan sekaligus (ibu dan janin/bayi), sehingga tanda bahaya sekecil apa pun harus terpantau dengan cermat.",
        applicationExample:
          "Memeriksa kelengkapan plasenta dan memantau kontraksi rahim pasca-persalinan secara teliti untuk mencegah perdarahan.",
      },
      {
        name: "Adaptabilitas",
        reasonNeeded:
          "Mampu bekerja secara efektif baik di rumah sakit modern maupun di fasilitas kesehatan masyarakat dengan kondisi geografis yang beragam.",
        applicationExample:
          "Menyesuaikan metode penyuluhan kesehatan ibu dan anak agar mudah diterima oleh warga di berbagai komunitas.",
      },
    ],
    hardSkills: [
      {
        name: "Asuhan Kehamilan (ANC) & Deteksi Dini Risiko",
        reasonNeeded:
          "Memastikan kondisi ibu dan janin sehat serta mengenali komplikasi sebelum terlambat.",
        applicationExample:
          "Melakukan pemeriksaan palpasi abdomen (Leopold) untuk mengetahui letak dan posisi janin serta memantau detak jantung janin.",
      },
      {
        name: "Asuhan Persalinan Normal (APN) & Penggunaan Partograf",
        reasonNeeded:
          "Menolong kelahiran bayi secara bersih, aman, dan sesuai tahapan klinis standar.",
        applicationExample:
          "Memimpin proses persalinan normal dengan 60 langkah Asuhan Persalinan Normal dan memantau grafik partograf.",
      },
      {
        name: "Asuhan Nifas, Laktasi & Bayi Baru Lahir",
        reasonNeeded:
          "Masa 28 hari pertama kehidupan bayi dan masa nifas ibu merupakan periode kritis yang membutuhkan perawatan tepat.",
        applicationExample:
          "Memfasilitasi Inisiasi Menyusu Dini (IMD), menjaga kehangatan tubuh bayi baru lahir, dan merawat tali pusat secara higienis.",
      },
      {
        name: "Konseling Kesehatan Reproduksi, KB & Pemantauan Tumbuh Kembang",
        reasonNeeded:
          "Membantu keluarga merencanakan kehamilan yang sehat dan memastikan tumbuh kembang anak optimal bebas stunting.",
        applicationExample:
          "Mengukur tinggi dan berat badan balita, memplot pada grafik KMS/Buku KIA, serta memberikan konseling gizi seimbang.",
      },
    ],
    challenges: {
      demandsAndResponsibilities: [
        "Memegang tanggung jawab atas keselamatan dua nyawa sekaligus (ibu dan bayi) dalam setiap asuhan kebidanan.",
        "Kesiapsiagaan waktu karena persalinan sering terjadi di luar jam kerja reguler.",
      ],
      commonChallenges: [
        "Menghadapi mitos atau kebiasaan tradisional seputar kehamilan dan perawatan bayi di masyarakat yang kurang sesuai dengan prinsip kesehatan medis, sehingga perlu pendekatan edukasi yang bijaksana.",
        "Tantangan akses geografis ketika bertugas mendampingi ibu hamil di wilayah pedesaan atau kepulauan.",
      ],
      risksAndPressures: [
        "Tekanan psikologis dan kecekatan tinggi saat menghadapi komplikasi persalinan mendadak yang membutuhkan tindakan stabilisasi dan rujukan cepat.",
        "Risiko paparan cairan tubuh saat menolong persalinan sehingga disiplin penggunaan Alat Pelindung Diri sangat wajib.",
      ],
      considerationsBeforeChoosing: [
        "Apakah kamu memiliki kepedulian yang kuat terhadap kesehatan perempuan, ibu, dan anak-anak?",
        "Apakah kamu siap belajar keterampilan klinis sekaligus keterampilan komunikasi masyarakat?",
        "Perhatikan bahwa sesuai regulasi kebidanan di Indonesia, pendidikan profesi Bidan dikhususkan bagi peserta didik perempuan.",
      ],
    },
    studentPreparation: {
      relevantSubjects: [
        "Biologi (sistem reproduksi manusia, perkembangan embrio/janin, gizi, dan kesehatan masyarakat).",
        "Sosiologi & Antropologi (untuk memahami dinamika keluarga dan budaya masyarakat Indonesia).",
        "Bahasa Indonesia (untuk komunikasi konseling dan penyuluhan).",
      ],
      simpleProjects: [
        "Mempelajari isi Buku Kesehatan Ibu dan Anak (Buku KIA) terbitan Kementerian Kesehatan untuk memahami bagaimana tumbuh kembang anak dan kesehatan ibu dipantau.",
        "Membuat media edukasi kreatif tentang pentingnya tablet tambah darah bagi remaja putri untuk mencegah anemia.",
      ],
      extracurriculars: [
        "Palang Merah Remaja (PMR) atau Pusat Informasi dan Konseling Remaja (PIK-R) di sekolah.",
        "Kegiatan pramuka atau kerelawanan sosial yang melatih kedekatan dengan masyarakat.",
      ],
      orgAndVolunteering: [
        "Mengikuti kegiatan observasi atau membantu administrasi di Posyandu balita di lingkungan RT/RW saat hari libur.",
        "Aktif menjadi pendidik sebaya (peer educator) kesehatan remaja di sekolah.",
      ],
      beginnerResources: [
        "Buku Kesehatan Ibu dan Anak (Buku KIA) Kementerian Kesehatan RI.",
        "Portal resmi Ikatan Bidan Indonesia (IBI) dan kanal edukasi Kesehatan Ibu dan Anak Kemkes.",
      ],
      practitionerInterviewQuestions: [
        "Bagaimana perasaan Ibu Bidan ketika berhasil membantu kelahiran seorang bayi dengan selamat?",
        "Bagaimana cara Ibu Bidan memberi pengertian kepada keluarga pasien jika ibu hamil harus segera dirujuk ke rumah sakit?",
        "Apa suka duka bertugas sebagai bidan di Puskesmas atau di tengah masyarakat?",
      ],
    },
    relatedProfessions: [
      {
        name: "Dokter",
        slug: "dokter",
        relationship:
          "Berkolaborasi erat dalam pemeriksaan kehamilan terpadu dan penanganan rujukan komplikasi kebidanan (khususnya dengan Dokter Umum, Sp.OG, dan Sp.A).",
      },
      {
        name: "Perawat",
        slug: "perawat",
        relationship:
          "Bekerja berdampingan di puskesmas, klinik, dan ruang perawatan ibu serta bayi baru lahir di rumah sakit.",
      },
      {
        name: "Apoteker",
        slug: "apoteker",
        relationship:
          "Bekerja sama dalam penyediaan vitamin kehamilan, vaksin imunisasi, serta obat-obatan pelayanan kesehatan ibu dan anak.",
      },
      {
        name: "Penyuluh Kesehatan Masyarakat",
        relationship:
          "Bersinergi dalam menggerakkan Posyandu, pencegahan stunting, dan pemberdayaan keluarga sehat.",
      },
    ],
    references: [
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Undang-Undang Nomor 17 Tahun 2023 tentang Kesehatan",
        url: "https://peraturan.bpk.go.id/Details/258028/uu-no-17-tahun-2023",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Pemerintah Republik Indonesia",
        title: "Undang-Undang Nomor 4 Tahun 2019 tentang Kebidanan (Referensi Historis Rumpun Kebidanan)",
        url: "https://peraturan.bpk.go.id/Details/103977/uu-no-4-tahun-2019",
        verifiedDate: "2025-02-01",
        category: "Regulasi",
      },
      {
        institution: "Kementerian Kesehatan Republik Indonesia",
        title: "Keputusan Menteri Kesehatan Nomor HK.01.07/MENKES/320/2020 tentang Standar Profesi Bidan",
        url: "https://peraturan.bpk.go.id/Details/152509/kepmenkes-no-hk0107menkes3202020-tahun-2020",
        verifiedDate: "2025-02-01",
        category: "Standar Kompetensi",
      },
      {
        institution: "Ikatan Bidan Indonesia (IBI)",
        title: "Profil Organisasi Profesi Ikatan Bidan Indonesia & Standar Pelayanan Kebidanan",
        url: "https://ibi.or.id",
        verifiedDate: "2025-02-01",
        category: "Organisasi Profesi",
      },
    ],
    qrCodeUrl: "/qr/bidan.svg",
    illustrationUrl: "/illustrations/bidan.svg",
    published: true,
    updatedAt: "2025-02-15T08:00:00.000Z",
  },
];

export const INITIAL_DATABASE: CareerDatabase = {
  rumpun: INITIAL_RUMPUN,
  professions: INITIAL_PROFESSIONS,
  analytics: {
    pageViews: {
      dokter: 142,
      perawat: 118,
      apoteker: 109,
      bidan: 115,
    },
    lastUpdated: "2025-02-15T08:00:00.000Z",
  },
};

