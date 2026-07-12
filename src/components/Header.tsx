"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, profile } from "@/lib/content";
import { useTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./Icons";

export default function Header() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="section-container flex items-center justify-between py-4">
        <Link
          href="#"
          className="inline-flex items-center transition-opacity hover:opacity-80"
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

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-colors ${
                active === item.id ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-ink hover:text-ink"
            aria-label="Toggle theme"
            aria-pressed={theme === "light"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-border bg-bg px-6 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-1 text-sm ${
                    active === item.id ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="py-1 text-sm text-ink-soft"
              >
                Switch to {theme === "dark" ? "light" : "dark"} mode
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
