"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { navItems, profile } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./Icons";

export default function Header() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 16);
    if (menuOpen || reduced) {
      setHidden(false);
      return;
    }
    setHidden(latest > 88 && latest > previous);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        scrolled
          ? "border-border/70 bg-bg/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
      animate={reduced ? undefined : { y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-container flex items-center justify-between py-4">
        <Link
          href="#"
          className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
          aria-label={`${profile.name} home`}
        >
          <Image
            src={profile.logoUrl}
            alt={`${profile.name} logo`}
            width={1024}
            height={682}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-8" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {t(item.label, locale)}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </a>
            );
          })}
          <button
            onClick={toggleLocale}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-ink-muted transition-[color,border-color,transform] duration-200 ease-out hover:scale-105 hover:border-ink hover:text-ink"
            aria-label={t({ en: "Toggle language", id: "Ganti bahasa" }, locale)}
          >
            {locale === "en" ? "ID" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="icon-btn h-9 w-9"
            aria-label={t({ en: "Toggle theme", id: "Ganti tema" }, locale)}
            aria-pressed={theme === "light"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {theme === "dark" ? (
                  <SunIcon className="h-4 w-4" />
                ) : (
                  <MoonIcon className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLocale}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-ink-muted transition-colors duration-200 hover:text-ink"
            aria-label={t({ en: "Toggle language", id: "Ganti bahasa" }, locale)}
          >
            {locale === "en" ? "ID" : "EN"}
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={
              menuOpen
                ? t({ en: "Close menu", id: "Tutup menu" }, locale)
                : t({ en: "Open menu", id: "Buka menu" }, locale)
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{t({ en: "Menu", id: "Menu" }, locale)}</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ease-out ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ease-out ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-border bg-bg/95 px-6 py-4 backdrop-blur-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-1 text-sm transition-colors duration-200 ${
                    active === item.id ? "text-accent" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t(item.label, locale)}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="py-1 text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {locale === "en"
                  ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                  : theme === "dark"
                    ? "Mode terang"
                    : "Mode gelap"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </motion.header>
  );
}
