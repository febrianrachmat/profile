"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, profile } from "@/lib/content";
import { useTheme } from "@/lib/theme";
import Boop from "./Boop";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  TwitterIcon,
} from "./Icons";

export default function Sidebar() {
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
          <Image
            src="/logo-rf.png"
            alt={`${profile.name} logo`}
            width={1024}
            height={682}
            priority
            className="mb-6 h-35 w-auto drop-shadow-lg sm:h-40"
          />
          <h1 className="text-gradient inline-block pb-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <h2 className="mt-3 text-lg font-medium text-slate-lighter sm:text-xl">
            {profile.role}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-slate">
            {profile.tagline}
          </p>
          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent px-5 py-2.5 font-mono text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              Resume
            </a>
          )}
        </div>

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
                    {item.label}
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
          <Boop rotation={-12} scale={1.25}>
            <GitHubIcon className="h-6 w-6" />
          </Boop>
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate transition-colors hover:text-accent">
          <Boop rotation={-12} scale={1.25}>
            <LinkedInIcon className="h-6 w-6" />
          </Boop>
        </a>
        {profile.socials.twitter && (
          <a href={profile.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter / X" className="text-slate transition-colors hover:text-accent">
            <Boop rotation={-12} scale={1.25}>
              <TwitterIcon className="h-5 w-5" />
            </Boop>
          </a>
        )}
        <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-slate transition-colors hover:text-accent">
          <Boop rotation={-12} scale={1.25}>
            <InstagramIcon className="h-6 w-6" />
          </Boop>
        </a>

        <button
          onClick={toggleTheme}
          className="ml-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-navy-lighter text-slate-light transition-colors hover:border-accent hover:text-accent"
          aria-label="Toggle theme"
          aria-pressed={theme === "light"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              {theme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.div>
    </header>
  );
}
