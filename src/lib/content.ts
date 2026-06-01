export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
};

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
    title: "E-Commerce Platform",
    description:
      "Full stack e-commerce platform with shopping cart, payments, and admin dashboard.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management app with real-time updates and kanban boards.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
  {
    title: "Personal Finance Tracker",
    description:
      "Personal finance tracker with data visualization and automatic spending categories.",
    tech: ["Vue.js", "Express", "Chart.js", "PostgreSQL"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
  },
  {
    title: "Weather Dashboard",
    description:
      "Weather dashboard with 7-day forecast and favorite locations using public APIs.",
    tech: ["React", "Tailwind CSS", "OpenWeather API"],
    link: "#",
    repo: "https://github.com/febrianrachmat",
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
