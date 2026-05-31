"use client";

import { skills } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import Reveal from "../Reveal";

export default function Skills() {
  const { t, lang } = useI18n();

  return (
    <section id="skills" className="scroll-mt-24 py-12 lg:py-24" aria-label="Skills">
      <Reveal>
        <h3 className="section-heading mb-8">
          <span className="mono text-lg">04.</span> {t("skillsTitle")}
        </h3>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.category.en} delay={i * 0.05}>
            <div className="card rounded-xl p-6">
              <h4 className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
                {group.category[lang]}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-navy px-3 py-1.5 text-sm text-slate-light transition-colors hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
