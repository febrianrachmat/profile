"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./content";

type Dict = Record<string, Record<Lang, string>>;

export const ui: Dict = {
  navAbout: { id: "Tentang", en: "About" },
  navProjects: { id: "Projek", en: "Projects" },
  navSkills: { id: "Keahlian", en: "Skills" },
  navContact: { id: "Kontak", en: "Contact" },
  loading: { id: "Memuat", en: "Loading" },
  resume: { id: "Resume", en: "Resume" },
  aboutTitle: { id: "Tentang Saya", en: "About Me" },
  experienceTitle: { id: "Pengalaman", en: "Experience" },
  projectsTitle: { id: "Projek Pilihan", en: "Featured Projects" },
  skillsTitle: { id: "Keahlian & Teknologi", en: "Skills & Technologies" },
  contactTitle: { id: "Hubungi Saya", en: "Get In Touch" },
  contactBody: {
    id: "Aku selalu terbuka untuk berdiskusi tentang peluang baru, kolaborasi, atau sekadar menyapa. Jangan ragu untuk menghubungi!",
    en: "I'm always open to discussing new opportunities, collaborations, or just to say hi. Feel free to reach out!",
  },
  contactButton: { id: "Kirim Email", en: "Say Hello" },
  viewProject: { id: "Lihat projek", en: "View project" },
  viewCode: { id: "Lihat kode", en: "View code" },
  builtWith: {
    id: "Dibuat dengan Next.js & Tailwind CSS, di-deploy di Vercel.",
    en: "Built with Next.js & Tailwind CSS, deployed on Vercel.",
  },
};

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof ui) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("lang")) as Lang | null;
    if (stored === "id" || stored === "en") {
      setLangState(stored);
    } else if (typeof navigator !== "undefined" && navigator.language.startsWith("id")) {
      setLangState("id");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const toggle = () => setLang(lang === "en" ? "id" : "en");
  const t = (key: keyof typeof ui) => ui[key]?.[lang] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
