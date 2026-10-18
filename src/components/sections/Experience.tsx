"use client";

import { motion, useReducedMotion } from "framer-motion";
import { timeline, ui, type TimelineItem } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";

const riseEase = [0.22, 1, 0.36, 1] as const;

const typeLabels = {
  education: { en: "Education", id: "Pendidikan" },
  work: { en: "Project", id: "Proyek" },
  internship: { en: "Internship", id: "Magang" },
  certification: { en: "Certification", id: "Sertifikasi" },
} as const;

function isCurrent(item: TimelineItem) {
  return (
    item.period.en.toLowerCase().includes("present") ||
    item.period.id.toLowerCase().includes("sekarang")
  );
}

export default function Experience() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-border bg-bg-muted/40"
      aria-label={t(ui.experienceTitle, locale)}
    >
      <div className="section-container py-16 sm:py-20 lg:py-28">
        <Reveal>
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div>
            <p className="section-label mb-5">journey</p>
            <h2 className="font-display text-[clamp(3.1rem,7.5vw,5.75rem)] italic leading-[0.86] tracking-[-0.04em] text-ink">
              {t(ui.experienceTitle, locale)}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg lg:justify-self-end lg:text-right">
            {t(ui.experienceIntro, locale)}
          </p>
          </div>
        </Reveal>

        <ol className="mt-14 border-t border-border sm:mt-16">
          {timeline.map((item) => {
            const current = isCurrent(item);
            return (
              <motion.li
                key={item.id}
                className="group grid gap-3 border-b border-border py-8 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-10 sm:py-10"
                initial={reduced ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, ease: riseEase }}
              >
                <div>
                  <p
                    className={`font-display text-display-sm italic leading-none transition-colors duration-200 ${
                      current
                        ? "text-accent"
                        : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {t(item.period, locale)}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {t(typeLabels[item.type], locale)}
                    {current ? ` · ${t(ui.experienceNow, locale)}` : ""}
                  </p>
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-display-sm text-ink">
                    {t(item.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-accent">
                    {t(item.organization, locale)}
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                    {t(item.description, locale)}
                  </p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-5 max-w-2xl space-y-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight.en}
                          className="grid grid-cols-[1rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed text-ink-muted"
                        >
                          <span className="text-accent" aria-hidden>
                            —
                          </span>
                          <span>{t(highlight, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
