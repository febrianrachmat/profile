"use client";

import { craftIntro, skillTiers, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import { getSkillIconUrl } from "@/lib/skillIcons";
import SkillMarquee from "../SkillMarquee";
import Reveal from "../Reveal";

export default function Skills() {
  const { locale } = useLocale();
  const coreItems = skillTiers[0].items.map((name) => ({ name }));
  const growingItems = skillTiers[1].items.map((name) => ({ name }));

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-border bg-bg-muted/50"
      aria-label={t(ui.craftTitle, locale)}
    >
      <div className="section-container pt-16 pb-12 sm:pt-20 lg:pt-section">
        <Reveal>
          <h2 className="section-title">{t(ui.craftTitle, locale)}</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {t(craftIntro, locale)}
          </p>
        </Reveal>
      </div>

      <div className="space-y-2 border-y border-border bg-bg-muted/30 py-2">
        <SkillMarquee items={coreItems} duration={45} />
        <SkillMarquee items={growingItems} reverse duration={50} muted />
      </div>

      <div className="section-container grid gap-6 py-12 sm:grid-cols-2">
        {skillTiers.map((tier, index) => {
          const isCore = index === 0;
          return (
            <Reveal key={tier.label.en} delay={index * 0.05}>
              <div
                className={`rounded-card border p-6 transition-[border-color,background-color] duration-200 ease-out ${
                  isCore
                    ? "border-accent/25 bg-surface"
                    : "border-border bg-surface/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {t(tier.label, locale)}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{t(tier.description, locale)}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tier.items.map((item) => (
                    <li key={item} className="group relative">
                      <span
                        title={item}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-[transform,border-color,opacity] duration-200 ease-out hover:scale-105 hover:border-accent/40 ${
                          isCore
                            ? "border-border text-ink-muted"
                            : "border-border/70 text-ink-soft opacity-75 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={getSkillIconUrl(item)}
                          alt=""
                          width={16}
                          height={16}
                          className={`object-contain ${isCore ? "h-4 w-4" : "h-3.5 w-3.5"}`}
                          loading="lazy"
                        />
                        {item}
                      </span>
                      <span className="skill-tooltip">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
