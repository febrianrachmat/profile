import type { LocalizedString } from "./i18n";

export type ProjectCategory = "fullstack" | "frontend" | "backend";

export type ProjectRepo = {
  label: LocalizedString;
  url: string;
};

export type Project = {
  title: string;
  subtitle: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  keyFeatures?: LocalizedString[];
  tech: string[];
  category: ProjectCategory;
  image: string;
  /** Extra screenshots shown as a gallery under the active project */
  images?: string[];
  link?: string;
  repo?: string;
  repos?: ProjectRepo[];
  apiLink?: string;
  /** Short status note shown with the project, e.g. hosting that has lapsed */
  notice?: LocalizedString;
  /** Long-form write-up rendered at /projects/[slug] */
  caseStudy?: CaseStudy;
};

export type CaseStudyDecision = {
  title: LocalizedString;
  context: LocalizedString;
  choice: LocalizedString;
  tradeoff: LocalizedString;
};

export type CaseStudy = {
  /** What the homepage card shows */
  card: {
    kicker: LocalizedString;
    summary: LocalizedString;
    proof: LocalizedString;
    /** Card image when it should differ from the project cover */
    image?: string;
  };
  role: LocalizedString;
  timeline: LocalizedString;
  stats: { value: string; label: LocalizedString }[];
  problem: LocalizedString[];
  flow: {
    title: LocalizedString;
    steps: { label: LocalizedString; note: LocalizedString }[];
    footnote?: LocalizedString;
  };
  decisions: CaseStudyDecision[];
  challenges: { title: LocalizedString; body: LocalizedString }[];
  outcome: LocalizedString[];
  next: LocalizedString[];
};

export function projectSlug(project: Pick<Project, "title">): string {
  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const projectCategories: {
  id: ProjectCategory;
  label: LocalizedString;
}[] = [
  { id: "fullstack", label: { en: "Full Stack", id: "Full Stack" } },
  { id: "frontend", label: { en: "Frontend", id: "Frontend" } },
  { id: "backend", label: { en: "Backend", id: "Backend" } },
];

export type SkillTier = {
  label: LocalizedString;
  description: LocalizedString;
  items: string[];
};

export type AboutLine = {
  text: LocalizedString;
  style: "bold" | "italic" | "pill";
};

export type AboutSegment = {
  text: LocalizedString;
  bold?: boolean;
};

export type TimelineItem = {
  id: string;
  period: LocalizedString;
  title: LocalizedString;
  organization: LocalizedString;
  /** One line; the matching case study (same id as its slug) holds the detail */
  summary: LocalizedString;
  type: "education" | "work" | "internship" | "certification";
};

export const profile = {
  name: "Rachmat Febrian",
  handle: "febrianrachmat",
  initials: "FR",
  role: {
    en: "Full Stack Software Engineer",
    id: "Full Stack Software Engineer",
  } satisfies LocalizedString,
  avatarUrl: "/profile.png",
  logoUrl: "/logo-rf.png",
  heroHeadline: "Rachmat Febrian",
  tagline: {
    en: "I build fast, accessible, and well-crafted web experiences from front-end to back-end.",
    id: "Saya membangun pengalaman web yang cepat, accessible, dan rapi — dari front-end hingga back-end.",
  } satisfies LocalizedString,
  email: "febrian.rachmat11@gmail.com",
  whatsapp: "6282231344399",
  location: {
    en: "Surabaya, Indonesia",
    id: "Surabaya, Indonesia",
  } satisfies LocalizedString,
  resumeUrl: "/resume.pdf?v=20261010",
  openToWork: true,
  socials: {
    github: "https://github.com/febrianrachmat",
    linkedin: "https://www.linkedin.com/in/rachmatfebrian/",
    twitter: "",
    instagram: "https://www.instagram.com/rachmatfebrian/",
  },
};

export const navItems = [
  { id: "projects", label: { en: "Projects", id: "Proyek" } },
  { id: "about", label: { en: "About", id: "Tentang" } },
  { id: "experience", label: { en: "Experience", id: "Pengalaman" } },
  { id: "skills", label: { en: "Skills", id: "Keahlian" } },
  { id: "contact", label: { en: "Contact", id: "Kontak" } },
] as const;

export const ui = {
  skipToContent: { en: "Skip to content", id: "Lewati ke konten" },
  profileLabel: { en: "profile", id: "profil" },
  openToWork: { en: "Open to work", id: "Terbuka untuk kerja" },
  viewProjects: { en: "View Projects", id: "Lihat Proyek" },
  downloadResume: { en: "Download Resume", id: "Unduh CV" },
  contactMe: { en: "Contact Me", id: "Hubungi Saya" },
  curatedProjects: { en: "Curated Projects", id: "Proyek Pilihan" },
  viewProject: { en: "View Project", id: "Lihat Proyek" },
  code: { en: "Code", id: "Kode" },
  apiDocs: { en: "API Docs", id: "Dokumentasi API" },
  craftTitle: { en: "Craft & Technology", id: "Keahlian & Teknologi" },
  experienceTitle: { en: "Experience & Education", id: "Pengalaman & Pendidikan" },
  experienceIntro: {
    en: "From physiotherapy clinics to shipping production software — a deliberate path of learning, building, and deploying.",
    id: "Dari klinik fisioterapi hingga merilis software produksi — jalur belajar, membangun, dan deploy yang disengaja.",
  },
  experienceNow: { en: "Current", id: "Sekarang" },
  hello: { en: "Hello !", id: "Halo !" },
  findMeOnline: { en: "Find me online", id: "Temukan saya di" },
  orEmailMe: { en: "or email me at", id: "atau email ke" },
  waMessage: {
    en: "Hi Rachmat Febrian, I'd like to connect with you.",
    id: "Halo Rachmat Febrian, saya ingin terhubung dengan Anda.",
  },
  switchTheme: {
    en: (mode: "light" | "dark") => `Switch to ${mode} mode`,
    id: (mode: "light" | "dark") =>
      mode === "light" ? "Mode terang" : "Mode gelap",
  },
  toggleTheme: { en: "Toggle theme", id: "Ganti tema" },
  toggleLanguage: { en: "Toggle language", id: "Ganti bahasa" },
  menu: { en: "Menu", id: "Menu" },
  openMenu: { en: "Open menu", id: "Buka menu" },
  closeMenu: { en: "Close menu", id: "Tutup menu" },
  notFoundTitle: { en: "Page not found", id: "Halaman tidak ditemukan" },
  notFoundBody: {
    en: "The page you're looking for doesn't exist or has been moved.",
    id: "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
  },
  backHome: { en: "Back to home", id: "Kembali ke beranda" },
  aboutLabel: { en: "about", id: "tentang" },
  caseStudy: { en: "Case study", id: "Studi kasus" },
  selectedWork: { en: "Selected work", id: "Karya pilihan" },
  caseStudies: { en: "Case studies", id: "Studi kasus" },
  caseStudiesIntro: {
    en: "How each one was built: the problem, the decisions and their trade-offs, and what I'd do next.",
    id: "Bagaimana masing-masing dibangun: masalahnya, keputusan beserta trade-off-nya, dan langkah berikutnya.",
  },
  moreProjects: { en: "More projects", id: "Proyek lainnya" },
  demo: { en: "Demo", id: "Demo" },
  statusNote: { en: "Status", id: "Status" },
  readCaseStudy: { en: "Read case study", id: "Baca studi kasus" },
  nextCaseStudy: { en: "Next case study", id: "Studi kasus berikutnya" },
  backToProjects: { en: "All projects", id: "Semua proyek" },
  liveDemo: { en: "Live demo", id: "Demo live" },
  csRole: { en: "My role", id: "Peran saya" },
  csTimeline: { en: "Timeline", id: "Durasi" },
  csStack: { en: "Stack", id: "Stack" },
  csProblem: { en: "The problem", id: "Masalahnya" },
  csFlow: { en: "How it flows", id: "Alurnya" },
  csDecisions: { en: "Key decisions", id: "Keputusan teknis" },
  csContext: { en: "Context", id: "Konteks" },
  csChoice: { en: "Decision", id: "Keputusan" },
  csTradeoff: { en: "Trade-off", id: "Trade-off" },
  csChallenges: { en: "Hard parts", id: "Bagian tersulit" },
  csScreens: { en: "Inside the product", id: "Isi produknya" },
  csOutcome: { en: "Outcome", id: "Hasil" },
  csNext: { en: "What I'd do next", id: "Yang akan saya lakukan berikutnya" },
  csCtaTitle: {
    en: "Want the full story?",
    id: "Mau cerita lengkapnya?",
  },
  csCtaBody: {
    en: "I'm happy to walk through the code, the schema, or the trade-offs on a call.",
    id: "Saya senang menjelaskan kode, skema database, atau trade-off-nya lewat call.",
  },
} as const;

export const aboutShift = {
  thenPeriod: { en: "2018 — 2023", id: "2018 — 2023" },
  thenLabel: { en: "Clinic", id: "Klinik" },
  thenBody: {
    en: "Physiotherapy at Airlangga. Internships, research, and patients — then a deliberate turn toward software.",
    id: "Fisioterapi di Airlangga. Magang, penelitian, dan pasien — lalu belokan yang disengaja ke software.",
  },
  nowPeriod: { en: "2026", id: "2026" },
  nowLabel: { en: "Product", id: "Produk" },
  nowBody: {
    en: "Interfaces that ship: a physiotherapy booking platform, product reviews, and a maternal storefront.",
    id: "Antarmuka yang rilis: platform booking fisioterapi, ulasan produk, dan toko ibu dan anak.",
  },
  nowImageAlt: {
    en: "Kinova, a physiotherapy booking platform",
    id: "Kinova, platform booking fisioterapi",
  },
} as const;

export const aboutHeadline: AboutLine[] = [
  {
    text: { en: "A career-changer who", id: "Seorang career-changer yang" },
    style: "bold",
  },
  {
    text: { en: "ships real products.", id: "merilis produk nyata." },
    style: "italic",
  },
  {
    text: { en: "A full stack engineer", id: "Seorang full stack engineer" },
    style: "bold",
  },
  {
    text: { en: "who builds", id: "yang membangun" },
    style: "bold",
  },
  {
    text: { en: "end to end.", id: "dari ujung ke ujung." },
    style: "pill",
  },
];

export const about: AboutSegment[][] = [
  [
    {
      text: {
        en: "As a Physiotherapy graduate, I discovered my passion for solving problems beyond the clinic by building ",
        id: "Sebagai lulusan Fisioterapi, saya menemukan passion untuk menyelesaikan masalah di luar klinik dengan membangun ",
      },
      bold: false,
    },
    {
      text: {
        en: "digital solutions that improve people's lives",
        id: "solusi digital yang meningkatkan kualitas hidup",
      },
      bold: true,
    },
    {
      text: {
        en: ". While working in healthcare, I realized many challenges could be addressed through technology — inspiring my transition into software engineering.",
        id: ". Saat bekerja di bidang kesehatan, saya melihat banyak tantangan bisa diatasi lewat teknologi — dan itu mendorong transisi saya ke software engineering.",
      },
    },
  ],
  [
    {
      text: {
        en: "I completed an intensive Full Stack Software Engineering program at RevoU (Oct 2025 – May 2026), building and deploying applications such as a physiotherapy booking platform and a banking API with React, Next.js, NestJS, TypeScript, PostgreSQL, Prisma, and Docker.",
        id: "Saya menyelesaikan program Full Stack Software Engineering intensif di RevoU (Okt 2025 – Mei 2026), membangun dan deploy aplikasi seperti platform booking fisioterapi dan banking API dengan React, Next.js, NestJS, TypeScript, PostgreSQL, Prisma, dan Docker.",
      },
    },
  ],
  [
    {
      text: {
        en: "I'm seeking opportunities as a ",
        id: "Saya mencari peluang sebagai ",
      },
    },
    {
      text: {
        en: "Full Stack or Front End Software Engineer",
        id: "Full Stack atau Front End Software Engineer",
      },
      bold: true,
    },
    {
      text: {
        en: ", combining engineering skills with my healthcare perspective to build scalable, user-centered products.",
        id: ", menggabungkan skill engineering dengan perspektif kesehatan untuk membangun produk yang scalable dan berfokus pada pengguna.",
      },
    },
  ],
];

export const craftIntro: LocalizedString = {
  en: "Combining a career-changer's drive with modern full stack development to build interfaces and systems that are scalable, accessible, and ready for production.",
  id: "Menggabungkan semangat career-changer dengan pengembangan full stack modern untuk membangun antarmuka dan sistem yang scalable, accessible, dan siap produksi.",
};

export const skillTiers: SkillTier[] = [
  {
    label: { en: "Core Stack", id: "Stack Utama" },
    description: {
      en: "Technologies I use daily and am most confident building with",
      id: "Teknologi yang saya gunakan sehari-hari dan paling percaya diri",
    },
    items: [
      "Next.js",
      "React",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
    ],
  },
  {
    label: { en: "Familiar / Growing", id: "Familiar / Berkembang" },
    description: {
      en: "Technologies I've worked with and continue to deepen",
      id: "Teknologi yang pernah saya pakai dan terus saya dalami",
    },
    items: [
      "Vue.js",
      "GraphQL",
      "MongoDB",
      "Docker",
      "Python",
      "Framer Motion",
      "Neon",
      "OpsCtrl",
      "Sentry",
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "mamabear",
    period: { en: "Aug – Oct 2026", id: "Agu – Okt 2026" },
    title: {
      en: "MamaBear — Virtual Internship",
      id: "MamaBear — Virtual Internship",
    },
    organization: {
      en: "RevoU × MamaBear · Frontend",
      id: "RevoU × MamaBear · Frontend",
    },
    summary: {
      en: "Built the AI care chat and fixed the cart and order flows.",
      id: "Membangun chat AI serta memperbaiki alur keranjang dan pesanan.",
    },
    type: "internship",
  },
  {
    id: "shark",
    period: { en: "Jul – Aug 2026", id: "Jul – Agu 2026" },
    title: {
      en: "SHARK — Product Reviews",
      id: "SHARK — Product Reviews",
    },
    organization: {
      en: "Frontend Lead",
      id: "Frontend Lead",
    },
    summary: {
      en: "Led four frontend engineers on a product reviews and rating module.",
      id: "Memimpin empat frontend engineer di modul ulasan dan rating produk.",
    },
    type: "work",
  },
  {
    id: "kinova",
    period: { en: "Mar 2026 – Present", id: "Mar 2026 – Sekarang" },
    title: { en: "Kinova — Capstone Project", id: "Kinova — Proyek Capstone" },
    organization: { en: "RevoU · Full Stack", id: "RevoU · Full Stack" },
    summary: {
      en: "Designed and built a physiotherapy booking platform on my own.",
      id: "Merancang dan membangun platform booking fisioterapi seorang diri.",
    },
    type: "work",
  },
  {
    id: "revou",
    period: { en: "Oct 2025 – May 2026", id: "Okt 2025 – Mei 2026" },
    title: {
      en: "Full Stack Software Engineering",
      id: "Full Stack Software Engineering",
    },
    organization: { en: "RevoU", id: "RevoU" },
    summary: {
      en: "Intensive program where I built VELDT, VELMONT, and the RevoBank API.",
      id: "Program intensif tempat saya membangun VELDT, VELMONT, dan RevoBank API.",
    },
    type: "education",
  },
  {
    id: "revou-cert",
    period: { en: "Jun 2026", id: "Jun 2026" },
    title: {
      en: "Full Stack Software Engineering Certificate",
      id: "Sertifikat Full Stack Software Engineering",
    },
    organization: { en: "Issued by RevoU", id: "Diterbitkan oleh RevoU" },
    summary: {
      en: "Completed the program with deployed capstone and milestone projects.",
      id: "Menyelesaikan program dengan capstone dan milestone project yang di-deploy.",
    },
    type: "certification",
  },
  {
    id: "airlangga",
    period: { en: "Aug 2018 – Nov 2023", id: "Agu 2018 – Nov 2023" },
    title: { en: "Bachelor of Physiotherapy", id: "Sarjana Fisioterapi" },
    organization: {
      en: "Airlangga University · GPA 3.45",
      id: "Universitas Airlangga · IPK 3.45",
    },
    summary: {
      en: "Clinical internships and a thesis on core exercise and vertical jump in athletes.",
      id: "Magang klinis dan skripsi tentang core exercise dan vertical jump pada atlet.",
    },
    type: "education",
  },
];

export const projects: Project[] = [
  {
    title: "MamaBear",
    subtitle: {
      en: "Maternal E-Commerce — Frontend",
      id: "E-Commerce Ibu & Anak — Frontend",
    },
    period: { en: "Frontend · Aug–Oct 2026", id: "Frontend · Agu–Okt 2026" },
    description: {
      en: "Storefront for pregnancy, breastfeeding, and postpartum care — nutrition, maternal essentials, and baby supplies. On the RevoU × MamaBear internship I built the AI care chat in Next.js: product cards inside replies, markdown answers with quick replies, WhatsApp handoff, and conversation history, plus cart promo and order-status fixes.",
      id: "Toko untuk kehamilan, menyusui, dan pemulihan pasca melahirkan — nutrisi, kebutuhan ibu, dan perlengkapan bayi. Di internship RevoU × MamaBear saya membangun chat AI di Next.js: kartu produk di dalam balasan, jawaban markdown dengan quick reply, tombol WhatsApp, dan riwayat percakapan, plus perbaikan promo keranjang dan label status pesanan.",
    },
    keyFeatures: [
      {
        en: "Greeting mascot asks “Butuh bantuan, Mama?” and opens the care chat",
        id: "Maskot sapaan bertanya “Butuh bantuan, Mama?” lalu membuka chat",
      },
      {
        en: "AI replies render product cards, markdown, and quick-reply chips",
        id: "Balasan AI menampilkan kartu produk, markdown, dan chip quick reply",
      },
      {
        en: "WhatsApp numbers become clickable handoff buttons, with history from the AI API",
        id: "Nomor WhatsApp jadi tombol handoff, dengan riwayat dari API AI",
      },
      {
        en: "Cart promo discount, free-shipping progress, and clearer order status labels",
        id: "Diskon promo keranjang, progres gratis ongkir, dan label status pesanan yang lebih jelas",
      },
      {
        en: "Fumadocs site with a public user guide and a password-protected developer guide",
        id: "Situs Fumadocs dengan panduan pengguna publik dan panduan developer yang diproteksi password",
      },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    category: "frontend",
    image: "/projects/mamabear-mascot.png",
    images: [
      "/projects/mamabear-mascot.png",
      "/projects/mamabear-replies.png",
      "/projects/mamabear-history.png",
      "/projects/mamabear-cart.png",
    ],
    link: "https://vi-mamabear-frontend.vercel.app/",
    repo: "https://github.com/khankhanfauzan/vi-mamabear-frontend",
    caseStudy: {
      card: {
        kicker: { en: "Frontend · Internship", id: "Frontend · Magang" },
        summary: {
          en: "An AI care chat for a maternal store: product cards in replies, WhatsApp handoff, and conversation history.",
          id: "Chat AI untuk toko ibu dan anak: kartu produk di balasan, handoff WhatsApp, dan riwayat percakapan.",
        },
        proof: { en: "7 chat tickets · 15 tests · protected docs site", id: "7 tiket chat · 15 test · situs dokumentasi terproteksi" },
        image: "/projects/mamabear-replies.png",
      },
      role: {
        en: "Frontend intern on a repo with 7 contributors. I owned the AI chat UI and how replies render, fixed cart and order bugs, and set up the developer docs site. A teammate connected sending to the AI endpoint.",
        id: "Frontend intern di repo dengan 7 kontributor. Saya memegang UI chat AI dan cara balasan dirender, memperbaiki bug keranjang dan pesanan, serta menyiapkan situs dokumentasi developer. Rekan tim menyambungkan pengiriman pesan ke endpoint AI.",
      },
      timeline: {
        en: "Aug – Oct 2026 · RevoU × MamaBear virtual internship",
        id: "Agu – Okt 2026 · Virtual internship RevoU × MamaBear",
      },
      stats: [
        { value: "7", label: { en: "chat tickets I shipped, from mock widget to AI assistant", id: "tiket chat yang saya selesaikan, dari widget mock ke asisten AI" } },
        { value: "6", label: { en: "cart and order bugs I tracked down and fixed", id: "bug keranjang dan pesanan yang saya telusuri dan perbaiki" } },
        { value: "15", label: { en: "tests I added across chat, cart, and orders", id: "test yang saya tambahkan di chat, keranjang, dan pesanan" } },
        { value: "8", label: { en: "pages in the docs site I set up", id: "halaman di situs dokumentasi yang saya siapkan" } },
      ],
      problem: [
        {
          en: "MamaBear sells nutrition and essentials for pregnant and breastfeeding mothers. Customers keep asking the same things: which product helps milk supply, what is on promo this month, where is my order. Getting a human answer means a WhatsApp chat with customer service.",
          id: "MamaBear menjual nutrisi dan kebutuhan untuk ibu hamil dan menyusui. Pelanggan terus menanyakan hal yang sama: produk mana yang membantu ASI, promo apa bulan ini, di mana pesanan saya. Untuk mendapat jawaban dari manusia, mereka harus chat WhatsApp dengan customer service.",
        },
        {
          en: "The backend exposes an AI chat API. My job was the part customers actually see: an assistant that lives inside the storefront, shows real products instead of just naming them, reads cleanly on a phone, and hands off to a human when it should.",
          id: "Backend menyediakan API chat AI. Tugas saya adalah bagian yang benar-benar dilihat pelanggan: asisten yang hidup di dalam toko, menampilkan produk sungguhan alih-alih hanya menyebut namanya, nyaman dibaca di HP, dan menyerahkan ke manusia saat perlu.",
        },
      ],
      flow: {
        title: {
          en: "From a message to a rendered reply",
          id: "Dari pesan sampai balasan tampil",
        },
        steps: [
          {
            label: { en: "Ask", id: "Tanya" },
            note: { en: "Typed message or quick-reply chip; max 1,000 characters, send locked while waiting", id: "Pesan diketik atau chip quick reply; maks 1.000 karakter, tombol kirim terkunci saat menunggu" },
          },
          {
            label: { en: "Send", id: "Kirim" },
            note: { en: "POST /ai/chat, wired by a teammate", id: "POST /ai/chat, disambungkan oleh rekan tim" },
          },
          {
            label: { en: "Normalize", id: "Normalisasi" },
            note: { en: "The reply becomes a typed message: text, role, and products", id: "Balasan menjadi pesan bertipe: teks, role, dan produk" },
          },
          {
            label: { en: "Render", id: "Render" },
            note: { en: "Markdown, product cards, and a WhatsApp button", id: "Markdown, kartu produk, dan tombol WhatsApp" },
          },
        ],
        footnote: {
          en: "Reopening a conversation loads GET /ai/history/:id through the same normalizer, so past replies and new ones look identical.",
          id: "Membuka kembali percakapan memuat GET /ai/history/:id lewat normalizer yang sama, sehingga balasan lama dan baru tampil identik.",
        },
      },
      decisions: [
        {
          title: {
            en: "One normalizer between the AI API and the UI",
            id: "Satu normalizer di antara API AI dan UI",
          },
          context: {
            en: "AI payloads were not uniform. Text could arrive as content, message, text, or reply; roles as user, human, or customer; prices as numbers or strings.",
            id: "Payload AI tidak seragam. Teks bisa datang sebagai content, message, text, atau reply; role sebagai user, human, atau customer; harga sebagai angka atau string.",
          },
          choice: {
            en: "Every payload is parsed once, at the service boundary, into typed messages and products. Invalid products are dropped instead of crashing the chat, and components only ever see clean types. Tests pin the parsing rules.",
            id: "Setiap payload di-parse sekali di batas service menjadi pesan dan produk bertipe. Produk yang tidak valid dibuang alih-alih membuat chat crash, dan komponen hanya menerima tipe yang bersih. Test mengunci aturan parsing-nya.",
          },
          tradeoff: {
            en: "More defensive code than the happy path needs. It paid off when a teammate wired live sending and reused my product normalizer, so live replies and history render the same way.",
            id: "Kode defensif lebih banyak dari yang dibutuhkan happy path. Hasilnya terbayar saat rekan tim menyambungkan pengiriman live dan memakai ulang normalizer produk saya, sehingga balasan live dan riwayat dirender dengan cara yang sama.",
          },
        },
        {
          title: {
            en: "Phone numbers in AI text become a handoff button",
            id: "Nomor telepon di teks AI menjadi tombol handoff",
          },
          context: {
            en: "When the AI escalates to a human, it writes a WhatsApp number inside the sentence, often wrapped in bold or brackets. On a phone, a raw number is awkward to copy and easy to mistype.",
            id: "Saat AI mengarahkan ke manusia, ia menulis nomor WhatsApp di dalam kalimat, sering dibungkus bold atau kurung. Di HP, nomor mentah sulit disalin dan mudah salah ketik.",
          },
          choice: {
            en: "One shared pattern detects Indonesian mobile numbers (08, 62, +62), turns them into wa.me links, and renders a WhatsApp button. The number is then stripped from the text so it isn't shown twice.",
            id: "Satu pola bersama mendeteksi nomor HP Indonesia (08, 62, +62), mengubahnya menjadi link wa.me, dan menampilkan tombol WhatsApp. Nomornya lalu dihapus dari teks agar tidak tampil dua kali.",
          },
          tradeoff: {
            en: "Regex on free text is brittle. The first version left empty brackets and stray asterisks behind. A cleanup pass and nine tests now cover bold, brackets, and the ordinary parentheses that must stay.",
            id: "Regex pada teks bebas itu rapuh. Versi pertama meninggalkan kurung kosong dan tanda bintang. Kini ada langkah pembersihan dan sembilan test yang mencakup bold, kurung, dan kurung biasa yang harus tetap ada.",
          },
        },
        {
          title: {
            en: "Markdown replies without raw HTML",
            id: "Balasan markdown tanpa HTML mentah",
          },
          context: {
            en: "The AI answers with lists and bold text. Showing the asterisks looks broken, but inserting model output into the page as HTML is a security risk.",
            id: "AI menjawab dengan daftar dan teks bold. Menampilkan tanda bintang terlihat rusak, tapi menyisipkan output model ke halaman sebagai HTML berisiko secara keamanan.",
          },
          choice: {
            en: "Replies go through react-markdown with GitHub-flavored markdown, which builds React elements and does not render raw HTML. Quick-reply chips cover the common asks: promos, milk-supply products, healthy snacks, and order status.",
            id: "Balasan diproses react-markdown dengan GitHub-flavored markdown, yang membangun elemen React dan tidak merender HTML mentah. Chip quick reply mencakup pertanyaan umum: promo, produk pelancar ASI, camilan sehat, dan status pesanan.",
          },
          tradeoff: {
            en: "A markdown parser joins the chat bundle. In exchange, replies read like a person wrote them and the model can't inject markup into the store.",
            id: "Parser markdown ikut masuk bundle chat. Gantinya, balasan terbaca seperti ditulis manusia dan model tidak bisa menyisipkan markup ke toko.",
          },
        },
      ],
      challenges: [
        {
          title: {
            en: "A cart that removed the wrong item",
            id: "Keranjang yang menghapus item yang salah",
          },
          body: {
            en: "Removing an item kept only that item, because a filter condition was inverted. The promo took 15% instead of 10%, the free-shipping bar hit 100% at Rp400k while the threshold was Rp500k, two API paths were wrong, and a logged-in user's merged cart never reached the UI. I fixed each one, moved the numbers into named constants, and added store tests.",
            id: "Menghapus item justru menyisakan item itu saja, karena kondisi filter terbalik. Promo memotong 15% padahal 10%, progress gratis ongkir mencapai 100% di Rp400 ribu padahal batasnya Rp500 ribu, dua path API salah, dan keranjang hasil merge setelah login tidak pernah tampil di UI. Saya memperbaiki semuanya, memindahkan angka ke konstanta bernama, dan menambahkan test store.",
          },
        },
        {
          title: {
            en: "Order statuses from three vocabularies",
            id: "Status pesanan dari tiga kosakata",
          },
          body: {
            en: "Order status strings came from the backend, the payment provider, and legacy data: pending, payment-pending, CANCELED, and more. They are now normalized into one canonical set, so customers always see the right label, such as Menunggu Pembayaran or Dibatalkan.",
            id: "String status pesanan datang dari backend, payment provider, dan data lama: pending, payment-pending, CANCELED, dan lainnya. Sekarang semuanya dinormalisasi ke satu set baku, sehingga pelanggan selalu melihat label yang benar, seperti Menunggu Pembayaran atau Dibatalkan.",
          },
        },
        {
          title: {
            en: "Docs that don't leak through side doors",
            id: "Dokumentasi yang tidak bocor lewat pintu samping",
          },
          body: {
            en: "I set up a Fumadocs site with a public user guide and a developer guide behind Basic Auth. Locking the pages wasn't enough: search, llms.txt, and preview images could still expose developer content, so they read from a filtered public source. Credentials are compared in constant time, and with no password set, the developer guide stays closed.",
            id: "Saya menyiapkan situs Fumadocs dengan panduan pengguna publik dan panduan developer di balik Basic Auth. Mengunci halamannya saja tidak cukup: pencarian, llms.txt, dan gambar preview masih bisa membuka isi developer, jadi semuanya membaca dari sumber publik yang sudah difilter. Kredensial dibandingkan secara constant-time, dan tanpa password, panduan developer tetap tertutup.",
          },
        },
      ],
      outcome: [
        {
          en: "The chat grew from a mock widget into the storefront's AI assistant: greeting mascot, product cards, markdown answers, quick replies, WhatsApp handoff, and conversation history.",
          id: "Chat berkembang dari widget mock menjadi asisten AI toko: maskot sapaan, kartu produk, jawaban markdown, quick reply, handoff WhatsApp, dan riwayat percakapan.",
        },
        {
          en: "Cart totals, the free-shipping bar, and order labels now match what the business actually offers.",
          id: "Total keranjang, progress gratis ongkir, dan label pesanan kini sesuai dengan yang benar-benar ditawarkan bisnis.",
        },
        {
          en: "The team has one place for documentation, with the developer guide kept private.",
          id: "Tim punya satu tempat untuk dokumentasi, dengan panduan developer tetap privat.",
        },
      ],
      next: [
        {
          en: "Stream AI replies as they are generated instead of waiting for the full answer.",
          id: "Streaming balasan AI saat sedang dibuat, bukan menunggu jawaban lengkap.",
        },
        {
          en: "Ask the backend for a structured handoff field, so the WhatsApp button no longer depends on regex over free text.",
          id: "Meminta backend menyediakan field handoff terstruktur, agar tombol WhatsApp tidak lagi bergantung pada regex atas teks bebas.",
        },
      ],
    },
  },
  {
    title: "SHARK",
    subtitle: {
      en: "Product Reviews — Frontend Lead",
      id: "Product Reviews — Frontend Lead",
    },
    period: { en: "Frontend Lead · 2026", id: "Frontend Lead · 2026" },
    description: {
      en: "Editorial product-review experience treated like a magazine spread: honest ratings, readable reviews, and typography with room to breathe. As frontend lead I owned the Next.js UI — product page, review list, and submit flow — talking to a real NestJS API in an Nx monorepo, not mocks.",
      id: "Pengalaman product-review editorial yang diperlakukan seperti spread majalah: rating yang jujur, ulasan yang bisa dibaca, dan tipografi yang punya napas. Sebagai frontend lead saya bertanggung jawab atas UI Next.js — halaman produk, daftar ulasan, dan alur submit — terhubung ke API NestJS nyata di monorepo Nx, bukan mock.",
    },
    keyFeatures: [
      {
        en: "Led the frontend: editorial PDP, rating summary, and review list with empty/loading states",
        id: "Memimpin frontend: PDP editorial, ringkasan rating, dan daftar ulasan dengan state empty/loading",
      },
      {
        en: "Full reviews page with infinite scroll and a form to write a new review",
        id: "Halaman ulasan penuh dengan infinite scroll dan form untuk menulis ulasan baru",
      },
      {
        en: "Nx monorepo: Next.js frontend, NestJS product/review APIs, Prisma and PostgreSQL",
        id: "Monorepo Nx: frontend Next.js, API produk/review NestJS, Prisma dan PostgreSQL",
      },
    ],
    tech: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Nx",
      "TypeScript",
    ],
    category: "frontend",
    image: "/projects/shark.png",
    images: [
      "/projects/shark.png",
      "/projects/shark-product.png",
      "/projects/shark-product-reviews.png",
    ],
    link: "https://shark-prd-implementation.vercel.app/",
    repo: "https://github.com/khankhanfauzan/shark-prd-implementation",
    caseStudy: {
      card: {
        kicker: { en: "Frontend lead · Team", id: "Frontend lead · Tim" },
        summary: {
          en: "A product reviews module on a real NestJS API, with infinite scroll and an accessible star rating input.",
          id: "Modul ulasan produk di atas API NestJS sungguhan, dengan infinite scroll dan input rating bintang yang aksesibel.",
        },
        proof: { en: "Led 4 engineers · 0 components changed on an API switch", id: "Memimpin 4 engineer · 0 komponen berubah saat API berganti" },
      },
      role: {
        en: "Frontend lead for a team of four frontend engineers, alongside a PM and a backend team. I built most of the Next.js app: the data layer, reviews feed, review form, and star rating components.",
        id: "Frontend lead untuk tim berisi empat frontend engineer, bersama seorang PM dan tim backend. Saya membangun sebagian besar app Next.js: lapisan data, feed ulasan, form ulasan, dan komponen rating bintang.",
      },
      timeline: {
        en: "Jul – Aug 2026 · team project, Nx monorepo",
        id: "Jul – Agu 2026 · proyek tim, monorepo Nx",
      },
      stats: [
        { value: "4", label: { en: "frontend engineers on the team I led", id: "frontend engineer di tim yang saya pimpin" } },
        { value: "15", label: { en: "of the 28 commits to the frontend app", id: "dari 28 commit ke app frontend" } },
        { value: "2", label: { en: "PRD user stories delivered on a real API", id: "user story PRD selesai di atas API sungguhan" } },
        { value: "0", label: { en: "components changed when the API moved to cursor pagination", id: "komponen yang berubah saat API pindah ke cursor pagination" } },
      ],
      problem: [
        {
          en: "SHARK is an e-commerce product page with a reviews and rating module, built from a product requirements document. Two user stories landed on our team: shoppers should see an overall rating at a glance, and they should be able to read every review and add their own.",
          id: "SHARK adalah halaman produk e-commerce dengan modul ulasan dan rating, dibangun dari dokumen kebutuhan produk (PRD). Dua user story menjadi tanggung jawab tim kami: pembeli bisa melihat rating keseluruhan sekilas, dan bisa membaca semua ulasan serta menambahkan ulasannya sendiri.",
        },
        {
          en: "The bar was explicit: real data from the NestJS backend, not mock data, with loading and empty states, infinite scroll on the full reviews page, and an editorial look that still reads well on a phone. The frontend started as a mockup, so my job was turning it into an app that talks to a real API.",
          id: "Standarnya tegas: data asli dari backend NestJS, bukan data mock, dengan state loading dan empty, infinite scroll di halaman ulasan lengkap, dan tampilan editorial yang tetap nyaman dibaca di HP. Frontend dimulai sebagai mockup, jadi tugas saya mengubahnya menjadi aplikasi yang bicara dengan API sungguhan.",
        },
      ],
      flow: {
        title: {
          en: "A review, from form to rating",
          id: "Sebuah ulasan, dari form sampai rating",
        },
        steps: [
          {
            label: { en: "Write", id: "Tulis" },
            note: { en: "Stars by mouse or keyboard; name and text checked with Zod", id: "Bintang lewat mouse atau keyboard; nama dan teks dicek dengan Zod" },
          },
          {
            label: { en: "Submit", id: "Kirim" },
            note: { en: "POST to the NestJS API; its validation messages show in the form", id: "POST ke API NestJS; pesan validasinya tampil di form" },
          },
          {
            label: { en: "Refresh", id: "Segarkan" },
            note: { en: "Reviews, rating summary, and product are invalidated together", id: "Ulasan, ringkasan rating, dan produk di-invalidate bersamaan" },
          },
          {
            label: { en: "Read", id: "Baca" },
            note: { en: "New average with partial stars; the feed loads 10 at a time", id: "Rata-rata baru dengan bintang parsial; feed memuat 10 per halaman" },
          },
        ],
        footnote: {
          en: "The product page reuses the reviews already nested in GET /product, so it makes one request fewer than the first version.",
          id: "Halaman produk memakai ulasan yang sudah ada di dalam GET /product, sehingga butuh satu request lebih sedikit dibanding versi pertama.",
        },
      },
      decisions: [
        {
          title: {
            en: "All server state in TanStack Query, behind one hook file",
            id: "Semua state server di TanStack Query, di balik satu file hook",
          },
          context: {
            en: "One review touches three views: the feed, the rating summary, and the product page. Syncing them by hand after a submit is where stale numbers come from.",
            id: "Satu ulasan menyentuh tiga tampilan: feed, ringkasan rating, dan halaman produk. Menyinkronkannya secara manual setelah submit adalah sumber angka yang basi.",
          },
          choice: {
            en: "Every request lives in one hooks file with shared query keys. Submitting a review invalidates reviews, rating summary, and product together, and the cache refetches whatever is on screen.",
            id: "Setiap request ada di satu file hook dengan query key bersama. Mengirim ulasan meng-invalidate ulasan, ringkasan rating, dan produk sekaligus, lalu cache mengambil ulang apa pun yang sedang tampil.",
          },
          tradeoff: {
            en: "One extra round trip per submit instead of an optimistic update. It paid off later: when the PM moved the API from offset to cursor pagination, the frontend change was a few lines in the hook, API client, and types, with no component touched.",
            id: "Ada satu round trip tambahan per submit, bukan optimistic update. Hasilnya terbayar belakangan: saat PM memindahkan API dari offset ke cursor pagination, perubahan di frontend hanya beberapa baris di hook, API client, dan types, tanpa menyentuh komponen.",
          },
        },
        {
          title: {
            en: "Infinite scroll that stops when the API fails",
            id: "Infinite scroll yang berhenti saat API gagal",
          },
          context: {
            en: "My first version was a hand-rolled IntersectionObserver. If loading the next page failed while the sentinel was still on screen, the observer was recreated and fired again, so it could keep hitting a failing API.",
            id: "Versi pertama saya memakai IntersectionObserver buatan sendiri. Jika memuat halaman berikutnya gagal sementara sentinel masih terlihat, observer dibuat ulang dan terpicu lagi, sehingga bisa terus memanggil API yang sedang gagal.",
          },
          choice: {
            en: "I moved to react-infinite-scroll-hook and disabled it while a next-page error is showing, with a spinner while loading and a footer for the error and end states.",
            id: "Saya beralih ke react-infinite-scroll-hook dan menonaktifkannya selama error halaman berikutnya tampil, dengan spinner saat memuat dan footer untuk state error dan akhir daftar.",
          },
          tradeoff: {
            en: "A small dependency instead of my own observer code. In return, a broken page no longer turns into a retry loop.",
            id: "Satu dependency kecil sebagai ganti kode observer buatan sendiri. Gantinya, halaman yang gagal tidak lagi berubah menjadi loop retry.",
          },
        },
        {
          title: {
            en: "A star rating you can use without a mouse",
            id: "Rating bintang yang bisa dipakai tanpa mouse",
          },
          context: {
            en: "Rating is the heart of the review form. A row of clickable star icons looks right but is invisible to screen readers and unreachable by keyboard.",
            id: "Rating adalah inti dari form ulasan. Deretan ikon bintang yang bisa diklik memang terlihat benar, tapi tidak terbaca screen reader dan tidak bisa dijangkau keyboard.",
          },
          choice: {
            en: "The input is a radiogroup with one radio per star. Arrow keys, Home, and End change the value, only the selected star is in the tab order, and hovering previews the choice. The read-only rating fills stars partially, so 4.8 looks like 4.8.",
            id: "Input-nya berupa radiogroup dengan satu radio per bintang. Tombol panah, Home, dan End mengubah nilai, hanya bintang terpilih yang masuk urutan tab, dan hover menampilkan preview pilihan. Rating read-only mengisi bintang secara parsial, sehingga 4,8 terlihat seperti 4,8.",
          },
          tradeoff: {
            en: "About 150 lines for what could have been five buttons. Worth it for the field every reviewer has to fill in.",
            id: "Sekitar 150 baris untuk sesuatu yang bisa saja lima tombol. Sepadan untuk field yang wajib diisi setiap pengulas.",
          },
        },
      ],
      challenges: [
        {
          title: {
            en: "From mockup to real data without a freeze",
            id: "Dari mockup ke data asli tanpa membekukan pekerjaan",
          },
          body: {
            en: "I first built the product and review UI as a mockup with shadcn/ui, so the screens could take shape before the API was wired. Once the NestJS endpoints were ready, one change replaced every mock with typed API calls, loading skeletons, and error states, and deleted the mock data.",
            id: "Saya membangun UI produk dan ulasan sebagai mockup dengan shadcn/ui lebih dulu, agar tampilannya terbentuk sebelum API disambungkan. Begitu endpoint NestJS siap, satu perubahan mengganti semua mock dengan panggilan API bertipe, skeleton loading, dan state error, lalu menghapus data mock.",
          },
        },
        {
          title: {
            en: "Readable errors from the backend",
            id: "Error dari backend yang bisa dibaca",
          },
          body: {
            en: "NestJS validation errors arrive as an array of messages. The API client joins them into one sentence, and the form shows it under the submit button, so a rejected review explains itself instead of failing silently.",
            id: "Error validasi NestJS datang sebagai array pesan. API client menggabungkannya menjadi satu kalimat, dan form menampilkannya di bawah tombol kirim, sehingga ulasan yang ditolak menjelaskan alasannya alih-alih gagal diam-diam.",
          },
        },
        {
          title: {
            en: "An editorial look that still reads on a phone",
            id: "Tampilan editorial yang tetap terbaca di HP",
          },
          body: {
            en: "I redesigned the landing, product, and reviews pages like a magazine spread. Editorial type is easy to get wrong on small screens, so I followed up the same day: the description text and main button got enough contrast to read, and the header buttons became a consistent pair.",
            id: "Saya mendesain ulang halaman landing, produk, dan ulasan seperti spread majalah. Tipografi editorial mudah meleset di layar kecil, jadi saya menindaklanjutinya di hari yang sama: teks deskripsi dan tombol utama diberi kontras yang cukup untuk dibaca, dan tombol header dibuat serasi.",
          },
        },
      ],
      outcome: [
        {
          en: "Both user stories ship on live data: the rating summary with partial stars, the product page preview, the full reviews feed with infinite scroll, and the review form.",
          id: "Kedua user story berjalan di atas data live: ringkasan rating dengan bintang parsial, preview di halaman produk, feed ulasan lengkap dengan infinite scroll, dan form ulasan.",
        },
        {
          en: "The data layer absorbed a pagination change from the backend without touching the UI.",
          id: "Lapisan data menyerap perubahan pagination dari backend tanpa menyentuh UI.",
        },
        {
          en: "The feed, form, and rating components I wrote are still the ones in the repository today.",
          id: "Komponen feed, form, dan rating yang saya tulis masih menjadi yang dipakai di repository hingga sekarang.",
        },
      ],
      next: [
        {
          en: "Add tests for the review form and star input; the reviews module has none yet.",
          id: "Menambahkan test untuk form ulasan dan input bintang; modul ulasan belum punya test.",
        },
        {
          en: "Show a new review instantly with an optimistic update, then reconcile with the server.",
          id: "Menampilkan ulasan baru seketika dengan optimistic update, lalu menyelaraskannya dengan server.",
        },
      ],
    },
  },
  {
    title: "Set Point",
    subtitle: {
      en: "Padel Tournament Platform",
      id: "Platform Turnamen Padel",
    },
    period: { en: "Full-Stack · 2026", id: "Full-Stack · 2026" },
    description: {
      en: "Production-grade SaaS for padel tournament operations — organizers run events from registration through drawing, scheduling, live scoring, standings, and playoffs to champion declaration, while guests follow the action without an account.",
      id: "SaaS production-grade untuk operasional turnamen padel — organizer menjalankan event dari registrasi hingga drawing, jadwal, live scoring, klasemen, dan playoff sampai juara diumumkan, sementara penonton mengikuti tanpa akun.",
    },
    keyFeatures: [
      {
        en: "Organizer MVP: tournaments, categories, teams, courts, and full lifecycle",
        id: "Organizer MVP: turnamen, kategori, tim, lapangan, dan lifecycle lengkap",
      },
      {
        en: "Domain engines for drawing, schedule, scoring, standings, and playoff brackets",
        id: "Domain engine untuk drawing, jadwal, scoring, klasemen, dan bracket playoff",
      },
      {
        en: "Referee desk for live scoring plus public spectator tournament views",
        id: "Meja wasit untuk live scoring plus tampilan turnamen publik untuk penonton",
      },
    ],
    tech: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "TanStack Query",
      "Zod",
    ],
    category: "fullstack",
    image: "/projects/setpoint.png",
    images: [
      "/projects/setpoint.png",
      "/projects/setpoint-tournaments.png",
      "/projects/setpoint-login.png",
    ],
    link: "https://setpoint-five.vercel.app/",
    repos: [
      {
        label: { en: "Frontend", id: "Frontend" },
        url: "https://github.com/febrianrachmat/FE-SetPoint",
      },
      {
        label: { en: "Backend", id: "Backend" },
        url: "https://github.com/febrianrachmat/BE-SetPoint",
      },
    ],
  },
  {
    title: "FlowPilot",
    subtitle: {
      en: "Collaborative Project Management SaaS",
      id: "SaaS Manajemen Proyek Kolaboratif",
    },
    period: { en: "Full-Stack · 2026", id: "Full-Stack · 2026" },
    description: {
      en: "Production-ready project management SaaS with live Kanban boards, threaded comments, file sharing, workspace invites, and activity timelines — so teams ship with a shared pulse instead of scattered chat threads.",
      id: "SaaS manajemen proyek production-ready dengan Kanban board real-time, komentar berantai, berbagi file, undangan workspace, dan timeline aktivitas — agar tim deliver dengan satu sumber kebenaran, bukan chat yang tercerai.",
    },
    keyFeatures: [
      {
        en: "Live Kanban boards with Backlog → Doing → Done sync across the team",
        id: "Kanban board live dengan sync Backlog → Doing → Done antar anggota tim",
      },
      {
        en: "Workspace collaboration: comments, files, invites, and activity timeline",
        id: "Kolaborasi workspace: komentar, file, undangan, dan timeline aktivitas",
      },
      {
        en: "JWT + refresh token rotation with NestJS Clean Architecture and Prisma",
        id: "JWT + refresh token rotation dengan Clean Architecture NestJS dan Prisma",
      },
    ],
    tech: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "TanStack Query",
      "Zustand",
    ],
    category: "fullstack",
    image: "/projects/flowpilot.png",
    images: [
      "/projects/flowpilot.png",
      "/projects/flowpilot-boards.png",
      "/projects/flowpilot-cta.png",
      "/projects/flowpilot-login.png",
      "/projects/flowpilot-register.png",
    ],
    link: "https://flowpilot-drab.vercel.app/",
    repos: [
      {
        label: { en: "Frontend", id: "Frontend" },
        url: "https://github.com/febrianrachmat/FE-SaaS-Project",
      },
      {
        label: { en: "Backend", id: "Backend" },
        url: "https://github.com/febrianrachmat/BE-SaaS-Project",
      },
    ],
  },
  {
    title: "Kinova",
    subtitle: {
      en: "Physiotherapy Booking Platform",
      id: "Platform Booking Fisioterapi",
    },
    period: { en: "Capstone · 2026", id: "Capstone · 2026" },
    description: {
      en: "Full-stack platform that digitizes physiotherapy clinic operations — replacing manual phone bookings with a unified web app for patients, physiotherapists, and clinic admins. Each role gets a tailored dashboard with real-time chat, appointment flows, and analytics.",
      id: "Platform full-stack yang mendigitalisasi operasional klinik fisioterapi — menggantikan booking manual via telepon dengan web app terpadu untuk pasien, fisioterapis, dan admin klinik. Setiap role punya dashboard khusus dengan chat real-time, alur appointment, dan analytics.",
    },
    keyFeatures: [
      {
        en: "Real-time live chat powered by Server-Sent Events (SSE)",
        id: "Live chat real-time dengan Server-Sent Events (SSE)",
      },
      {
        en: "End-to-end appointment flow with simulated payments, built to plug in a real payment gateway, plus Google OAuth",
        id: "Alur appointment end-to-end dengan pembayaran simulasi yang siap diintegrasikan ke payment gateway sungguhan, plus Google OAuth",
      },
      {
        en: "Role-based access control (JWT) with admin analytics dashboard",
        id: "Role-based access control (JWT) dengan dashboard analytics admin",
      },
    ],
    tech: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "JWT", "SSE"],
    category: "fullstack",
    image: "/projects/kinova.png",
    images: [
      "/projects/kinova.png",
      "/projects/kinova-services.png",
      "/projects/kinova-about.png",
      "/projects/kinova-patient-therapists.png",
      "/projects/kinova-patient-appointment.png",
      "/projects/kinova-patient-chat.png",
      "/projects/kinova-admin-dashboard.png",
      "/projects/kinova-admin-analytics.png",
    ],
    link: "https://kinova-zeta.vercel.app/",
    repos: [
      {
        label: { en: "Frontend", id: "Frontend" },
        url: "https://github.com/Revou-FSSE-Oct25/crack-fe-febrianrachmat",
      },
      {
        label: { en: "Backend", id: "Backend" },
        url: "https://github.com/Revou-FSSE-Oct25/crack-be-febrianrachmat",
      },
    ],
    notice: {
      en: "The backend's Railway hosting has expired, so login, booking, and chat on the live demo are offline. The code, tests, Swagger setup, and docs are intact in the repositories and ready to redeploy.",
      id: "Hosting backend di Railway sudah expired, sehingga login, booking, dan chat di demo live sedang offline. Kode, test, setup Swagger, dan dokumentasinya tetap utuh di repository dan siap di-deploy ulang.",
    },
    caseStudy: {
      card: {
        kicker: { en: "Full stack · Solo capstone", id: "Full stack · Capstone solo" },
        summary: {
          en: "A physiotherapy booking platform for patients, therapists, and admins, with live chat over SSE.",
          id: "Platform booking fisioterapi untuk pasien, terapis, dan admin, dengan live chat lewat SSE.",
        },
        proof: { en: "3 roles · 15 models · 179 backend tests", id: "3 role · 15 model · 179 test backend" },
      },
      role: {
        en: "Solo developer: product scope, database design, NestJS API, Next.js frontend, tests, and deployment",
        id: "Solo developer: scope produk, desain database, API NestJS, frontend Next.js, testing, dan deployment",
      },
      timeline: {
        en: "Mar – Jul 2026 · RevoU capstone",
        id: "Mar – Jul 2026 · Capstone RevoU",
      },
      stats: [
        { value: "3", label: { en: "roles, each with its own dashboard", id: "role, masing-masing dengan dashboard" } },
        { value: "15", label: { en: "Prisma models behind the API", id: "model Prisma di balik API" } },
        { value: "179", label: { en: "backend test cases, incl. real-DB integration", id: "test case backend, termasuk integrasi DB nyata" } },
        { value: "230+", label: { en: "commits across frontend and backend", id: "commit di frontend dan backend" } },
      ],
      problem: [
        {
          en: "Small physiotherapy clinics still run on phone calls and chat apps. Patients call to ask who is free, admins juggle schedules by hand, and proof of payment lives in screenshots. During my clinical internships the friction was never the booking itself. It was the handoffs between patient, therapist, and admin.",
          id: "Klinik fisioterapi kecil masih berjalan lewat telepon dan aplikasi chat. Pasien menelepon untuk tanya siapa yang kosong, admin mengatur jadwal manual, dan bukti bayar tersimpan di screenshot. Selama magang klinis, masalahnya bukan proses booking itu sendiri, melainkan serah-terima antara pasien, terapis, dan admin.",
        },
        {
          en: "Kinova puts all three roles on one platform. Patients consult a verified physiotherapist online, then book a clinic or home visit. Therapists manage their availability. Admins verify therapists, confirm payments, and track the numbers.",
          id: "Kinova menyatukan ketiga role dalam satu platform. Pasien berkonsultasi online dengan fisioterapis terverifikasi, lalu booking kunjungan klinik atau home visit. Terapis mengatur ketersediaannya. Admin memverifikasi terapis, mengonfirmasi pembayaran, dan memantau angka.",
        },
      ],
      flow: {
        title: {
          en: "Consultation lifecycle (pay-first)",
          id: "Lifecycle konsultasi (bayar dulu)",
        },
        steps: [
          {
            label: { en: "Requested", id: "Requested" },
            note: { en: "Patient picks a therapist; the fee is snapshotted", id: "Pasien memilih terapis; tarif di-snapshot" },
          },
          {
            label: { en: "Accepted", id: "Accepted" },
            note: { en: "Therapist agrees to take the session", id: "Terapis menyetujui sesi" },
          },
          {
            label: { en: "In progress", id: "In progress" },
            note: { en: "Admin confirms payment and chat unlocks", id: "Admin konfirmasi bayar, chat terbuka" },
          },
          {
            label: { en: "Completed", id: "Completed" },
            note: { en: "Patient or therapist closes the session", id: "Pasien atau terapis menutup sesi" },
          },
        ],
        footnote: {
          en: "Cancel or refund is allowed from any non-terminal step and locks the chat again. In progress can only be reached through payment, never set directly.",
          id: "Cancel atau refund bisa dari langkah mana pun yang belum final dan mengunci chat lagi. Status in progress hanya bisa dicapai lewat pembayaran, tidak bisa di-set langsung.",
        },
      },
      decisions: [
        {
          title: {
            en: "Server-Sent Events instead of WebSockets for chat",
            id: "Server-Sent Events, bukan WebSocket, untuk chat",
          },
          context: {
            en: "Consultation chat has to feel live, but it is one-to-one, low volume, and the API runs as a single Node service.",
            id: "Chat konsultasi harus terasa live, tapi sifatnya satu-lawan-satu, volumenya kecil, dan API berjalan sebagai satu service Node.",
          },
          choice: {
            en: "Messages are sent over plain REST and received over an SSE stream. The stream uses the same JWT header, sends a keep-alive ping every 30s, and takes a “since” cursor so a reconnect never duplicates messages.",
            id: "Pesan dikirim lewat REST biasa dan diterima lewat stream SSE. Stream memakai header JWT yang sama, mengirim ping keep-alive tiap 30 detik, dan menerima cursor “since” agar reconnect tidak menduplikasi pesan.",
          },
          tradeoff: {
            en: "The stream polls the database every ~2.5s instead of pushing on write. No Redis or socket gateway to run, but delivery is near-real-time rather than instant, and it would need pub/sub to scale to many rooms.",
            id: "Stream melakukan polling ke database tiap ~2,5 detik, bukan push saat pesan ditulis. Tidak perlu menjalankan Redis atau socket gateway, tapi pengiriman near-real-time, bukan instan, dan butuh pub/sub untuk skala banyak room.",
          },
        },
        {
          title: {
            en: "Status changes as a server-side state machine",
            id: "Perubahan status sebagai state machine di server",
          },
          context: {
            en: "Three roles touch the same consultation and booking. Checks that live only in the UI would let a crafted request skip payment.",
            id: "Tiga role menyentuh konsultasi dan booking yang sama. Validasi yang hanya ada di UI memungkinkan request buatan melewati pembayaran.",
          },
          choice: {
            en: "Each role gets an explicit transition matrix in the service layer. In progress is set only by payment confirmation, and chat endpoints refuse to send until the consultation is paid.",
            id: "Setiap role punya matriks transisi eksplisit di service layer. Status in progress hanya di-set oleh konfirmasi pembayaran, dan endpoint chat menolak kirim pesan sebelum konsultasi dibayar.",
          },
          tradeoff: {
            en: "More service code and a test per transition. In return, every illegal jump returns a 400 with a business error code instead of corrupting data.",
            id: "Kode service lebih banyak dan perlu test per transisi. Gantinya, setiap lompatan ilegal mengembalikan 400 dengan kode error bisnis, bukan merusak data.",
          },
        },
        {
          title: {
            en: "Payment modeled as a lifecycle, not a gateway",
            id: "Pembayaran dimodelkan sebagai lifecycle, bukan gateway",
          },
          context: {
            en: "A real payment provider was out of scope for the capstone, but the product still had to behave like money was moving.",
            id: "Integrasi payment provider sungguhan di luar scope capstone, tapi produknya tetap harus berperilaku seolah ada uang yang bergerak.",
          },
          choice: {
            en: "A simulated transaction goes Pending → Paid → Refunded and is confirmed by an admin. It belongs to exactly one consultation or booking, and the therapist's fee is copied into the request so later price changes never apply retroactively.",
            id: "Transaksi simulasi berjalan Pending → Paid → Refunded dan dikonfirmasi admin. Transaksi terhubung ke tepat satu konsultasi atau booking, dan tarif terapis disalin ke request agar perubahan harga tidak berlaku mundur.",
          },
          tradeoff: {
            en: "No real money moves. But the states, refunds, and side effects have the same shape a gateway webhook would drive, so swapping one in only touches the confirm step.",
            id: "Tidak ada uang sungguhan. Tapi status, refund, dan efek sampingnya punya bentuk yang sama dengan yang digerakkan webhook gateway, jadi menggantinya hanya menyentuh langkah konfirmasi.",
          },
        },
      ],
      challenges: [
        {
          title: {
            en: "Patients who pay shouldn't wait forever",
            id: "Pasien yang sudah bayar tidak boleh menunggu selamanya",
          },
          body: {
            en: "Every consultation has an SLA tier: 24 hours by default, or 10 minutes for a fast session, which is only offered while the therapist is online. A scheduled job looks for paid sessions with no therapist reply past the deadline, refunds them, cancels the consultation, and notifies both sides.",
            id: "Setiap konsultasi punya tier SLA: 24 jam secara default, atau 10 menit untuk sesi cepat, yang hanya ditawarkan saat terapis online. Scheduled job mencari sesi berbayar yang belum dibalas terapis melewati batas waktu, me-refund, membatalkan konsultasi, dan memberi notifikasi ke kedua pihak.",
          },
        },
        {
          title: {
            en: "Two patients, one slot",
            id: "Dua pasien, satu slot",
          },
          body: {
            en: "Booking a slot marks it unavailable and cancelling releases it. Rescheduling claims the new slot before releasing the old one, so a failure halfway never leaves a patient with no slot or two patients with the same one.",
            id: "Booking slot menandainya tidak tersedia dan cancel melepasnya kembali. Reschedule mengklaim slot baru sebelum melepas slot lama, sehingga kegagalan di tengah jalan tidak membuat pasien kehilangan slot atau dua pasien mendapat slot yang sama.",
          },
        },
        {
          title: {
            en: "Testing against a real database",
            id: "Testing dengan database sungguhan",
          },
          body: {
            en: "Mocked unit tests can't catch a broken Prisma query or a wrong write order. I added an integration suite that runs the full journey (slot, consultation, booking, chat, payment, notifications) plus role and ownership negative paths against a dedicated Postgres in CI, run serially to avoid deadlocks during table resets.",
            id: "Unit test dengan mock tidak bisa menangkap query Prisma yang rusak atau urutan write yang salah. Saya menambahkan integration suite yang menjalankan alur lengkap (slot, konsultasi, booking, chat, pembayaran, notifikasi) plus negative path role dan ownership terhadap Postgres khusus di CI, dijalankan serial untuk menghindari deadlock saat reset tabel.",
          },
        },
      ],
      outcome: [
        {
          en: "The full patient journey works end to end: consult, pay, chat, book a visit, and leave a review.",
          id: "Alur pasien lengkap berjalan end-to-end: konsultasi, bayar, chat, booking kunjungan, dan memberi ulasan.",
        },
        {
          en: "Every endpoint is documented in Swagger, with an ERD and 20+ technical docs in the repo.",
          id: "Semua endpoint terdokumentasi di Swagger, dengan ERD dan 20+ dokumen teknis di repo.",
        },
        {
          en: "CI runs unit coverage, integration tests against Postgres, and a production build on every push to main.",
          id: "CI menjalankan coverage unit test, integration test terhadap Postgres, dan build produksi di setiap push ke main.",
        },
      ],
      next: [
        {
          en: "Replace the polling SSE loop with Postgres LISTEN/NOTIFY or Redis pub/sub for instant delivery.",
          id: "Mengganti loop polling SSE dengan Postgres LISTEN/NOTIFY atau Redis pub/sub agar pengiriman instan.",
        },
        {
          en: "Plug a real payment gateway webhook into the existing transaction lifecycle.",
          id: "Menyambungkan webhook payment gateway sungguhan ke lifecycle transaksi yang sudah ada.",
        },
      ],
    },
  },
  {
    title: "VELDT",
    subtitle: {
      en: "Premium Fashion E-Commerce",
      id: "E-Commerce Fashion Premium",
    },
    period: { en: "Frontend · 2026", id: "Frontend · 2026" },
    description: {
      en: "Premium fashion e-commerce with editorial homepage, bento shop grid, cart and checkout flow, bilingual UI (EN/ID), and admin demo — focused on fast performance and seamless UX across devices.",
      id: "E-commerce fashion premium dengan homepage editorial, bento shop grid, cart & checkout, UI bilingual (EN/ID), dan admin demo — fokus pada performa cepat dan UX mulus di berbagai perangkat.",
    },
    keyFeatures: [
      {
        en: "Editorial homepage with bento-style product grid",
        id: "Homepage editorial dengan grid produk bento-style",
      },
      {
        en: "Full cart and checkout flow with bilingual UI (EN/ID)",
        id: "Alur cart & checkout lengkap dengan UI bilingual (EN/ID)",
      },
      {
        en: "State management with TanStack Query and Zustand",
        id: "State management dengan TanStack Query dan Zustand",
      },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
    ],
    category: "frontend",
    image: "/projects/veldt.png",
    images: [
      "/projects/veldt.png",
      "/projects/veldt-shop.png",
      "/projects/veldt-product.png",
      "/projects/veldt-product-alt.png",
    ],
    link: "https://e-commerce-eight-vert-tzera30n9h.vercel.app/en",
    repo: "https://github.com/febrianrachmat/e-commerce",
  },
  {
    title: "VELMONT",
    subtitle: {
      en: "Luxury Hotel Booking",
      id: "Booking Hotel Mewah",
    },
    period: { en: "Frontend · 2026", id: "Frontend · 2026" },
    description: {
      en: "Luxury hotel booking showcase with availability calendar, multi-step booking flow, gallery lightbox, multilingual support, and premium motion design — delivering fast page performance across desktop and mobile.",
      id: "Showcase booking hotel mewah dengan kalender ketersediaan, alur booking multi-step, gallery lightbox, dukungan multibahasa, dan motion design premium — performa cepat di desktop dan mobile.",
    },
    keyFeatures: [
      {
        en: "Interactive availability calendar and multi-step reservation flow",
        id: "Kalender ketersediaan interaktif dan alur reservasi multi-step",
      },
      {
        en: "Gallery lightbox with premium Framer Motion animations",
        id: "Gallery lightbox dengan animasi Framer Motion premium",
      },
      {
        en: "Responsive design with shadcn/ui component library",
        id: "Desain responsif dengan komponen shadcn/ui",
      },
    ],
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "shadcn/ui"],
    category: "frontend",
    image: "/projects/velmont.png",
    images: [
      "/projects/velmont.png",
      "/projects/velmont-suites.png",
      "/projects/velmont-gallery.png",
      "/projects/velmont-dining.png",
      "/projects/velmont-experiences.png",
      "/projects/velmont-book.png",
    ],
    link: "https://hotel-green-iota.vercel.app/",
    repo: "https://github.com/febrianrachmat/hotel",
  },
  {
    title: "RevoBank",
    subtitle: {
      en: "Banking REST API",
      id: "Banking REST API",
    },
    period: { en: "Backend · 2026", id: "Backend · 2026" },
    description: {
      en: "Production-ready banking REST API with JWT authentication, user and account management, and transaction APIs (deposit, withdraw, transfer). Built with modular NestJS architecture, Prisma migrations, and Swagger documentation.",
      id: "Banking REST API production-ready dengan autentikasi JWT, manajemen user & akun, dan API transaksi (deposit, withdraw, transfer). Dibangun dengan arsitektur modular NestJS, Prisma migrations, dan dokumentasi Swagger.",
    },
    keyFeatures: [
      {
        en: "JWT authentication with secure account management",
        id: "Autentikasi JWT dengan manajemen akun yang aman",
      },
      {
        en: "Transaction APIs: deposit, withdraw, and inter-account transfer",
        id: "API transaksi: deposit, withdraw, dan transfer antar akun",
      },
      {
        en: "Modular NestJS architecture with Swagger API documentation",
        id: "Arsitektur modular NestJS dengan dokumentasi API Swagger",
      },
    ],
    tech: ["NestJS", "Prisma", "PostgreSQL", "JWT", "Swagger"],
    category: "backend",
    image: "/projects/revobank.png",
    repo: "https://github.com/Revou-FSSE-Oct25/milestone-4-febrianrachmat-1",
    notice: {
      en: "The Railway hosting for this API has expired, so the live Swagger docs are offline. The code, migrations, and Swagger setup are intact in the repository and ready to redeploy.",
      id: "Hosting Railway untuk API ini sudah expired, sehingga dokumentasi Swagger live sedang offline. Kode, migrasi, dan setup Swagger tetap utuh di repository dan siap di-deploy ulang.",
    },
  },
];

export const contactCopy = {
  heading: { en: "Let's Start Something", id: "Mari Mulai Sesuatu" },
  intro: {
    en: "I'm currently open to new opportunities and collaborations. If you think my engineering skills are a good fit for your team, let's start a dialogue.",
    id: "Saat ini saya terbuka untuk peluang dan kolaborasi baru. Jika skill engineering saya cocok untuk tim Anda, mari mulai percakapan.",
  },
};
