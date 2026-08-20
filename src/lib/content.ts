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
};

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
  description: LocalizedString;
  highlights?: LocalizedString[];
  type: "education" | "work" | "certification";
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
  resumeUrl: "/resume.pdf",
  openToWork: true,
  socials: {
    github: "https://github.com/febrianrachmat",
    linkedin: "https://www.linkedin.com/in/rachmatfebrian/",
    twitter: "",
    instagram: "https://www.instagram.com/rachmatfebrian/",
  },
};

export const navItems = [
  { id: "about", label: { en: "About", id: "Tentang" } },
  { id: "experience", label: { en: "Experience", id: "Pengalaman" } },
  { id: "skills", label: { en: "Skills", id: "Keahlian" } },
  { id: "projects", label: { en: "Projects", id: "Proyek" } },
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
  projectsIntro: {
    en: "A stacked showcase of shipped work — flip through cards, then dive into screenshots and links.",
    id: "Showcase bertumpuk dari karya yang sudah live — geser kartu, lalu lihat screenshot dan tautan.",
  },
  showAll: { en: "Show All", id: "Semua" },
  viewProject: { en: "View Project", id: "Lihat Proyek" },
  code: { en: "Code", id: "Kode" },
  apiDocs: { en: "API Docs", id: "Dokumentasi API" },
  projectScreenshots: {
    en: "Screenshots",
    id: "Screenshot",
  },
  projectStackHint: {
    en: "Click the front card to cycle — or tap a card behind it.",
    id: "Klik kartu depan untuk berganti — atau ketuk kartu di belakangnya.",
  },
  nextProject: {
    en: "Next project",
    id: "Proyek berikutnya",
  },
  openProjectDetail: {
    en: "View",
    id: "Lihat",
  },
  noProjectsInCategory: {
    en: "No projects in this category.",
    id: "Tidak ada proyek di kategori ini.",
  },
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
    id: "kinova",
    period: { en: "Mar 2026 – Present", id: "Mar 2026 – Sekarang" },
    title: { en: "Kinova — Capstone Project", id: "Kinova — Proyek Capstone" },
    organization: { en: "RevoU · Full Stack", id: "RevoU · Full Stack" },
    description: {
      en: "Designed and developed a full-stack physiotherapy booking platform connecting patients with physiotherapists through online consultations, appointment scheduling, and home-visit services.",
      id: "Merancang dan mengembangkan platform booking fisioterapi full-stack yang menghubungkan pasien dengan fisioterapis melalui konsultasi online, penjadwalan, dan layanan home visit.",
    },
    highlights: [
      {
        en: "Secure JWT auth with role-based access for patients, therapists, and admins",
        id: "Autentikasi JWT dengan RBAC untuk pasien, terapis, dan admin",
      },
      {
        en: "Real-time live chat via Server-Sent Events (SSE)",
        id: "Live chat real-time via Server-Sent Events (SSE)",
      },
      {
        en: "Deployed on Vercel (frontend) and Railway (backend)",
        id: "Deploy di Vercel (frontend) dan Railway (backend)",
      },
    ],
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
    description: {
      en: "Intensive bootcamp building and deploying full-stack web applications using React, Next.js, NestJS, PostgreSQL, Prisma, Docker, Railway, and Vercel through hands-on industry projects.",
      id: "Bootcamp intensif membangun dan deploy aplikasi web full-stack menggunakan React, Next.js, NestJS, PostgreSQL, Prisma, Docker, Railway, dan Vercel melalui proyek industri.",
    },
    highlights: [
      {
        en: "Built VELDT e-commerce, VELMONT hotel booking, and RevoBank API",
        id: "Membangun e-commerce VELDT, hotel booking VELMONT, dan RevoBank API",
      },
      {
        en: "Agile teamwork, code reviews, and production deployments",
        id: "Kerja tim agile, code review, dan deployment produksi",
      },
    ],
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
    description: {
      en: "Completed the intensive Full Stack Software Engineering program with deployed capstone and milestone projects.",
      id: "Menyelesaikan program Full Stack Software Engineering intensif dengan capstone dan milestone project yang di-deploy.",
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
    description: {
      en: "Completed clinical internships and academic research. Thesis on the effect of core exercise on vertical jump in athletes. Developed teamwork, critical thinking, leadership, and patient communication skills.",
      id: "Menyelesaikan magang klinis dan penelitian akademik. Skripsi tentang efek core exercise terhadap vertical jump atlet. Mengembangkan teamwork, critical thinking, leadership, dan komunikasi pasien.",
    },
    type: "education",
  },
];

export const projects: Project[] = [
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
        en: "End-to-end appointment flow with payment gateway and Google OAuth",
        id: "Alur appointment end-to-end dengan payment gateway dan Google OAuth",
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
    apiLink: "https://crack-be-febrianrachmat-production.up.railway.app/docs",
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
      en: "Production-ready banking REST API with JWT authentication, user and account management, and transaction APIs (deposit, withdraw, transfer). Built with modular NestJS architecture, Prisma migrations, and Swagger documentation on Railway.",
      id: "Banking REST API production-ready dengan autentikasi JWT, manajemen user & akun, dan API transaksi (deposit, withdraw, transfer). Dibangun dengan arsitektur modular NestJS, Prisma migrations, dan dokumentasi Swagger di Railway.",
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
        en: "Modular NestJS architecture with Swagger docs on Railway",
        id: "Arsitektur modular NestJS dengan dokumentasi Swagger di Railway",
      },
    ],
    tech: ["NestJS", "Prisma", "PostgreSQL", "JWT", "Swagger"],
    category: "backend",
    image: "/projects/revobank.png",
    repo: "https://github.com/Revou-FSSE-Oct25/milestone-4-febrianrachmat-1",
    apiLink: "https://revobank-backend-production.up.railway.app/api",
  },
];

export const contactCopy = {
  heading: { en: "Let's Start Something", id: "Mari Mulai Sesuatu" },
  intro: {
    en: "I'm currently open to new opportunities and collaborations. If you think my engineering skills are a good fit for your team, let's start a dialogue.",
    id: "Saat ini saya terbuka untuk peluang dan kolaborasi baru. Jika skill engineering saya cocok untuk tim Anda, mari mulai percakapan.",
  },
};
