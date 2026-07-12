export type ProjectCategory = "fullstack" | "frontend" | "backend";

export type ProjectRepo = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  keyFeatures?: string[];
  tech: string[];
  category: ProjectCategory;
  image: string;
  link?: string;
  repo?: string;
  repos?: ProjectRepo[];
  apiLink?: string;
};

export const projectCategories: {
  id: ProjectCategory;
  label: string;
}[] = [
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

export type SkillTier = {
  label: string;
  description: string;
  items: string[];
};

export const profile = {
  name: "Rachmat Febrian",
  handle: "febrianrachmat",
  initials: "FR",
  role: "Full Stack Software Engineer",
  avatarUrl: "/profile.png",
  logoUrl: "/logo-rf.png",
  heroHeadline: "Rachmat Febrian",
  tagline:
    "I build fast, accessible, and well-crafted web experiences from front-end to back-end.",
  email: "febrian.rachmat11@gmail.com",
  whatsapp: "6282231344399",
  location: "Indonesia",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/febrianrachmat",
    linkedin: "https://www.linkedin.com/in/rachmatfebrian/",
    twitter: "",
    instagram: "https://www.instagram.com/rachmatfebrian/",
  },
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const marqueePhrases = [
  "A career-changer who ships real products.",
  "A full stack engineer who builds end to end.",
];

export type AboutLine = {
  text: string;
  style: "bold" | "italic" | "pill";
};

export const aboutHeadline: AboutLine[] = [
  { text: "A career-changer who", style: "bold" },
  { text: "ships real products.", style: "italic" },
  { text: "A full stack engineer", style: "bold" },
  { text: "who builds", style: "bold" },
  { text: "end to end.", style: "pill" },
];

export type AboutSegment = {
  text: string;
  bold?: boolean;
};

export const about: AboutSegment[][] = [
  [
    {
      text: "I'm a career-changer who pivoted into tech without any prior IT background. What started as curiosity quickly became a deliberate path — and I've been building ",
    },
    { text: "production-ready software", bold: true },
    { text: " ever since." },
  ],
  [
    {
      text: "I'm 7+ months into the Full Stack Software Engineer program at RevoU (started October 2025), going from fundamentals to deploying real applications across the entire stack.",
    },
  ],
  [
    {
      text: "My goal is to contribute as a full stack engineer, ",
    },
    {
      text: "turning ideas into thoughtful, user-focused digital products through clean code and technical execution.",
      bold: true,
    },
  ],
];

export const craftIntro =
  "Combining a career-changer's drive with modern full stack development to build interfaces and systems that are scalable, accessible, and ready for production.";

export const skillTiers: SkillTier[] = [
  {
    label: "Core Stack",
    description: "Technologies I use daily and am most confident building with",
    items: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma", "TypeScript"],
  },
  {
    label: "Familiar / Growing",
    description: "Technologies I've worked with and continue to deepen",
    items: ["Vue.js", "GraphQL", "MongoDB", "Docker", "Python", "Framer Motion"],
  },
];

export const projects: Project[] = [
  {
    title: "Kinova",
    subtitle: "Physiotherapy Booking Platform",
    period: "Capstone · 2026",
    description:
      "My capstone full-stack platform that digitizes physiotherapy clinic operations — replacing manual phone bookings and fragmented communication with a unified web app for patients, physiotherapists, and clinic admins. Each role gets a tailored dashboard: patients book sessions and consult online, therapists manage schedules and chat in real time, and admins monitor clinic performance through analytics.",
    keyFeatures: [
      "Real-time live chat powered by Server-Sent Events (SSE)",
      "End-to-end appointment flow with payment gateway and Google OAuth",
      "Role-based access control (JWT) with admin analytics dashboard",
    ],
    tech: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "JWT", "SSE"],
    category: "fullstack",
    image: "/projects/kinova.png",
    link: "https://kinova-zeta.vercel.app/",
    repos: [
      {
        label: "Frontend",
        url: "https://github.com/Revou-FSSE-Oct25/crack-fe-febrianrachmat",
      },
      {
        label: "Backend",
        url: "https://github.com/Revou-FSSE-Oct25/crack-be-febrianrachmat",
      },
    ],
    apiLink: "https://crack-be-febrianrachmat-production.up.railway.app/docs",
  },
  {
    title: "VELDT",
    subtitle: "Premium Fashion E-Commerce",
    period: "Frontend · 2026",
    description:
      "Premium fashion e-commerce with editorial homepage, bento shop grid, cart and checkout flow, bilingual UI (EN/ID), and admin demo.",
    tech: ["Next.js", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS"],
    category: "frontend",
    image: "/projects/veldt.png",
    link: "https://e-commerce-eight-vert-tzera30n9h.vercel.app/en",
    repo: "https://github.com/febrianrachmat/e-commerce",
  },
  {
    title: "VELMONT",
    subtitle: "Luxury Hotel Booking",
    period: "Frontend · 2026",
    description:
      "Luxury hotel booking showcase with availability calendar, multi-step booking flow, gallery lightbox, and premium motion design.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "shadcn/ui"],
    category: "frontend",
    image: "/projects/velmont.png",
    link: "https://hotel-green-iota.vercel.app/",
    repo: "https://github.com/febrianrachmat/hotel",
  },
  {
    title: "RevoBank",
    subtitle: "Banking REST API",
    period: "Backend · 2026",
    description:
      "Banking REST API with JWT auth, account management, and transactions (deposit, withdraw, transfer). Deployed on Railway with Swagger documentation.",
    tech: ["NestJS", "Prisma", "PostgreSQL", "JWT", "Swagger"],
    category: "backend",
    image: "/projects/revobank.png",
    repo: "https://github.com/Revou-FSSE-Oct25/milestone-4-febrianrachmat-1",
    apiLink: "https://revobank-backend-production.up.railway.app/api",
  },
];

export const contactCopy = {
  heading: "Let's Start Something",
  intro:
    "I'm currently open to new opportunities and collaborations. If you think my engineering skills are a good fit for your team, let's start a dialogue.",
};
