export type ProjectCategory = "fullstack" | "frontend" | "backend";

export type ProjectRepo = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  description: string;
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

export type SkillGroup = {
  category: string;
  items: string[];
};

export const profile = {
  name: "Rachmat Febrian",
  initials: "FR",
  role: "Full Stack Software Engineer",
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
  "Hi! I'm Febrian, a software engineer who loves building digital products at the intersection of beautiful design and clean, scalable code.",
  "As a full stack engineer, I'm comfortable handling the entire development lifecycle — from designing user-friendly interfaces and building reliable APIs to deploying applications to production.",
  "In my spare time, I enjoy exploring new technologies, contributing to open-source projects, and sipping coffee while reading documentation.",
];

export const projects: Project[] = [
  {
    title: "Kinova",
    description:
      "Physiotherapy booking and consultation platform with patient, physiotherapist, and admin roles — booking, live chat (SSE), payments, OAuth, and admin analytics.",
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

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML & CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "REST API", "GraphQL"],
  },
  {
    category: "Database & DevOps",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Docker", "Git", "Vercel"],
  },
];
