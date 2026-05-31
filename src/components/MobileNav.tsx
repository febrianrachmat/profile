"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const navItems = [
  { id: "about", key: "navAbout" as const },
  { id: "projects", key: "navProjects" as const },
  { id: "skills", key: "navSkills" as const },
  { id: "contact", key: "navContact" as const },
];

export default function MobileNav() {
  const { t } = useI18n();
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
    <nav
      className="fixed inset-x-0 bottom-4 z-[80] flex justify-center px-4 lg:hidden"
      aria-label="Section navigation"
    >
      <ul className="flex items-center gap-1 rounded-full border border-navy-lighter bg-navy-light/80 p-1 shadow-lg backdrop-blur-md">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`block rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                active === item.id
                  ? "bg-accent/15 text-accent"
                  : "text-slate hover:text-slate-lighter"
              }`}
            >
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
