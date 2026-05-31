export type Lang = "id" | "en";

export type Project = {
  title: string;
  description: Record<Lang, string>;
  tech: string[];
  link?: string;
  repo?: string;
};

export type SkillGroup = {
  category: Record<Lang, string>;
  items: string[];
};

export const profile = {
  // Ganti dengan datamu sendiri / Replace with your own data
  name: "Rachmat Febrian",
  initials: "FR",
  role: {
    id: "Full Stack Software Engineer",
    en: "Full Stack Software Engineer",
  } as Record<Lang, string>,
  tagline: {
    id: "Aku membangun pengalaman web yang cepat, mudah diakses, dan rapi dari sisi front-end hingga back-end.",
    en: "I build fast, accessible, and well-crafted web experiences from front-end to back-end.",
  } as Record<Lang, string>,
  email: "febrian.rachmat11@gmail.com",
  whatsapp: "6282231344399",
  location: {
    id: "Indonesia",
    en: "Indonesia",
  } as Record<Lang, string>,
  resumeUrl: "#",
  socials: {
    github: "https://github.com/febrianrachmat",
    linkedin: "https://www.linkedin.com/in/rachmatfebrian/",
    twitter: "",
    instagram: "https://www.instagram.com/rachmatfebrian/",
  },
};

export const about: Record<Lang, string[]> = {
  id: [
    "Halo! Aku Febrian, seorang software engineer yang senang membangun produk digital di persimpangan antara desain yang indah dan kode yang bersih dan skalabel.",
    "Sebagai full stack engineer, aku terbiasa menangani keseluruhan siklus pengembangan — mulai dari merancang antarmuka yang ramah pengguna, membangun API yang andal, hingga men-deploy aplikasi ke produksi.",
    "Di waktu luang, aku suka mengeksplorasi teknologi baru, berkontribusi ke proyek open-source, dan menikmati kopi sambil membaca dokumentasi.",
  ],
  en: [
    "Hi! I'm Febrian, a software engineer who loves building digital products at the intersection of beautiful design and clean, scalable code.",
    "As a full stack engineer, I'm comfortable handling the entire development lifecycle — from designing user-friendly interfaces and building reliable APIs to deploying applications to production.",
    "In my spare time, I enjoy exploring new technologies, contributing to open-source projects, and sipping coffee while reading documentation.",
  ],
};

export const experiences = [
  {
    period: { id: "2023 — Sekarang", en: "2023 — Present" } as Record<Lang, string>,
    role: { id: "Full Stack Engineer", en: "Full Stack Engineer" } as Record<Lang, string>,
    company: "Perusahaan Teknologi",
    url: "#",
    description: {
      id: "Membangun dan memelihara fitur produk inti menggunakan React, Next.js, dan Node.js. Berkolaborasi dengan tim lintas fungsi untuk mengirimkan fitur berkualitas tinggi.",
      en: "Build and maintain core product features using React, Next.js, and Node.js. Collaborate with cross-functional teams to ship high-quality features.",
    } as Record<Lang, string>,
    tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    period: { id: "2021 — 2023", en: "2021 — 2023" } as Record<Lang, string>,
    role: { id: "Frontend Developer", en: "Frontend Developer" } as Record<Lang, string>,
    company: "Startup Digital",
    url: "#",
    description: {
      id: "Mengembangkan antarmuka pengguna yang responsif dan dapat diakses. Meningkatkan performa dan pengalaman pengguna pada aplikasi web utama.",
      en: "Developed responsive and accessible user interfaces. Improved performance and user experience on the main web application.",
    } as Record<Lang, string>,
    tech: ["JavaScript", "Vue.js", "SCSS", "REST API"],
  },
];

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: {
      id: "Platform e-commerce full stack dengan keranjang belanja, pembayaran, dan dashboard admin.",
      en: "Full stack e-commerce platform with shopping cart, payments, and admin dashboard.",
    },
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
  {
    title: "Task Management App",
    description: {
      id: "Aplikasi manajemen tugas kolaboratif dengan pembaruan real-time dan papan kanban.",
      en: "Collaborative task management app with real-time updates and kanban boards.",
    },
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
  {
    title: "Personal Finance Tracker",
    description: {
      id: "Pelacak keuangan pribadi dengan visualisasi data dan kategori pengeluaran otomatis.",
      en: "Personal finance tracker with data visualization and automatic spending categories.",
    },
    tech: ["Vue.js", "Express", "Chart.js", "PostgreSQL"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
  {
    title: "Weather Dashboard",
    description: {
      id: "Dashboard cuaca dengan prakiraan 7 hari dan lokasi favorit menggunakan API publik.",
      en: "Weather dashboard with 7-day forecast and favorite locations using public APIs.",
    },
    tech: ["React", "Tailwind CSS", "OpenWeather API"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
];

export const skills: SkillGroup[] = [
  {
    category: { id: "Bahasa", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML & CSS"],
  },
  {
    category: { id: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: { id: "Backend", en: "Backend" },
    items: ["Node.js", "Express", "NestJS", "REST API", "GraphQL"],
  },
  {
    category: { id: "Database & DevOps", en: "Database & DevOps" },
    items: ["PostgreSQL", "MongoDB", "Prisma", "Docker", "Git", "Vercel"],
  },
];
