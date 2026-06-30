export type ProjectCategory = "fullstack" | "frontend" | "backend";

export type ProjectRepo = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
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
  initials: "FR",
  role: "Full Stack Software Engineer",
  avatarUrl: "/profile.png",
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
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const about = [
  "Hi! I'm Rachmat Febrian — a career-changer who made the leap into tech without any prior IT background. What started as curiosity quickly turned into a deliberate pivot, and I've been building real software ever since.",
  "I'm currently 7+ months into the Full Stack Software Engineer program at RevoU (started October 2025), where I've gone from fundamentals to shipping production-ready applications across the entire stack.",
  "On the frontend, I work confidently with React and Next.js. On the backend, I build with NestJS, PostgreSQL, Prisma, and Docker — from API design and database modeling to deployment. So far, I've built and deployed 4 real-world projects, with Kinova as my capstone flagship.",
];

export const projects: Project[] = [
  {
    title: "Kinova",
    description:
      "My capstone full-stack platform that digitizes physiotherapy clinic operations — replacing manual phone bookings and fragmented communication with a unified web app for patients, physiotherapists, and clinic admins. Each role gets a tailored dashboard: patients book sessions and consult online, therapists manage schedules and chat in real time, and admins monitor clinic performance through analytics.",
    keyFeatures: [
      "Real-time live chat powered by Server-Sent Events (SSE) — lightweight one-way streaming that keeps conversations instant without the complexity of WebSockets",
      "End-to-end appointment flow with integrated payment gateway and Google OAuth, so users can sign up and pay in a few clicks",
      "Role-based access control (JWT) across three user types, with an admin analytics dashboard for appointment trends and clinic insights",
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
    description:
      "Banking REST API with JWT auth, account management, and transactions (deposit, withdraw, transfer). Deployed on Railway with Swagger documentation.",
    tech: ["NestJS", "Prisma", "PostgreSQL", "JWT", "Swagger"],
    category: "backend",
    image: "/projects/revobank.png",
    repo: "https://github.com/Revou-FSSE-Oct25/milestone-4-febrianrachmat-1",
    apiLink: "https://revobank-backend-production.up.railway.app/api",
  },
];

export const skillTiers: SkillTier[] = [
  {
    label: "Core Stack",
    description: "Technologies I use daily and am most confident building with",
    items: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma", "TypeScript"],
  },
  {
    label: "Familiar / Growing",
    description: "Technologies I've worked with and continue to deepen",
    items: ["Vue.js", "GraphQL", "MongoDB", "Docker"],
  },
  {
    label: "Basic / Supporting",
    description: "Tools I use to support development and UI polish",
    items: ["Python", "Framer Motion"],
  },
];
