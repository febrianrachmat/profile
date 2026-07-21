"use client";

import { craftIntro, skillTiers, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
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
      <div className="section-container py-16 sm:py-20 lg:py-24">
        <Reveal>
          <h2 className="section-title">{t(ui.craftTitle, locale)}</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {t(craftIntro, locale)}
          </p>
        </Reveal>
      </div>

      <div className="space-y-2 border-y border-border bg-bg-muted/30 py-2">
        <SkillMarquee items={coreItems} duration={45} />
        <SkillMarquee items={growingItems} reverse duration={50} />
      </div>

      <div className="section-container grid gap-6 py-12 sm:grid-cols-2">
        {skillTiers.map((tier, index) => (
          <Reveal key={tier.label.en} delay={index * 0.05}>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t(tier.label, locale)}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{t(tier.description, locale)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-muted"
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
