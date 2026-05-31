"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  TwitterIcon,
} from "./Icons";

const navItems = [
  { id: "about", key: "navAbout" as const },
  { id: "projects", key: "navProjects" as const },
  { id: "skills", key: "navSkills" as const },
  { id: "contact", key: "navContact" as const },
];

export default function Sidebar() {
  const { t, lang, toggle } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[45%] lg:max-w-md lg:flex-col lg:justify-between lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-lighter sm:text-5xl">
            {profile.name}
          </h1>
          <h2 className="mt-3 text-lg font-medium text-slate-lighter sm:text-xl">
            {profile.role[lang]}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-slate">
            {profile.tagline[lang]}
          </p>
        </div>

        {/* Desktop nav */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page jump links">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="group flex items-center py-1">
                  <span
                    className={`mr-4 h-px bg-slate transition-all duration-200 group-hover:w-16 group-hover:bg-accent ${
                      active === item.id ? "w-16 bg-accent" : "w-8"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-slate-lighter ${
                      active === item.id ? "text-slate-lighter" : "text-slate"
                    }`}
                  >
                    {t(item.key)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <motion.div
        className="mt-10 flex items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate transition-colors hover:text-accent">
          <GitHubIcon className="h-6 w-6" />
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate transition-colors hover:text-accent">
          <LinkedInIcon className="h-6 w-6" />
        </a>
        <a href={profile.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter / X" className="text-slate transition-colors hover:text-accent">
          <TwitterIcon className="h-5 w-5" />
        </a>
        <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-slate transition-colors hover:text-accent">
          <InstagramIcon className="h-6 w-6" />
        </a>

        <button
          onClick={toggleTheme}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-navy-lighter text-slate-light transition-colors hover:border-accent hover:text-accent"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={toggle}
          className="flex items-center gap-1 rounded-full border border-navy-lighter px-3 py-1.5 font-mono text-xs font-semibold text-slate-light transition-colors hover:border-accent hover:text-accent"
          aria-label="Toggle language"
        >
          <span className={lang === "en" ? "text-accent" : ""}>EN</span>
          <span className="text-slate">/</span>
          <span className={lang === "id" ? "text-accent" : ""}>ID</span>
        </button>
      </motion.div>
    </header>
  );
}
