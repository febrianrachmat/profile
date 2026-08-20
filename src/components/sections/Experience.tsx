"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { timeline, ui, type TimelineItem } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import { revealHidden, revealTransition } from "@/lib/motion";
import Reveal from "../Reveal";
import {
  BriefcaseIcon,
  CertificateIcon,
  GraduationIcon,
} from "../Icons";

const typeLabels = {
  education: { en: "Education", id: "Pendidikan" },
  work: { en: "Project", id: "Proyek" },
  certification: { en: "Certification", id: "Sertifikasi" },
} as const;

const typeIcons = {
  work: BriefcaseIcon,
  education: GraduationIcon,
  certification: CertificateIcon,
} as const;

function isCurrent(item: TimelineItem) {
  return (
    item.period.en.toLowerCase().includes("present") ||
    item.period.id.toLowerCase().includes("sekarang")
  );
}

function TimelineNode({
  item,
  index,
  active,
  onActivate,
}: {
  item: TimelineItem;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const Icon = typeIcons[item.type];
  const current = isCurrent(item);

  return (
    <motion.li
      className="relative"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      initial={reduced ? false : revealHidden}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={revealTransition(index * 0.06)}
    >
      <article
        className={`group relative grid gap-5 rounded-card border p-5 transition-[border-color,background-color,box-shadow] duration-200 ease-out sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-6 ${
          active || current
            ? "border-accent/30 bg-surface shadow-[0_12px_40px_-24px_rgb(var(--color-accent)/0.45)]"
            : "border-transparent bg-transparent hover:border-border hover:bg-surface/70"
        }`}
      >
        <div className="relative z-10 flex shrink-0 items-start">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-card border transition-colors duration-200 ease-out sm:h-14 sm:w-14 ${
              active || current
                ? "border-accent bg-accent text-bg"
                : "border-border bg-bg-muted text-ink-soft group-hover:border-accent/40 group-hover:text-accent"
            }`}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
              {t(item.period, locale)}
            </span>
            {current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {t(ui.experienceNow, locale)}
              </span>
            )}
            <span className="badge">
              {t(typeLabels[item.type], locale)}
            </span>
          </div>

          <h3 className="mt-3 font-display text-display-sm text-ink">
            {t(item.title, locale)}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-accent">
            {t(item.organization, locale)}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            {t(item.description, locale)}
          </p>

          {item.highlights && item.highlights.length > 0 && (
            <ul className="mt-5 grid gap-2 sm:grid-cols-1">
              {item.highlights.map((highlight, i) => (
                <motion.li
                  key={highlight.en}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={revealTransition(0.08 + i * 0.05)}
                  className="flex gap-3 rounded-xl border border-border/80 bg-bg-muted/50 px-3.5 py-2.5 text-sm text-ink-muted"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span>{t(highlight, locale)}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </motion.li>
  );
}

export default function Experience() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(timeline[0]?.id ?? "");
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-border bg-bg-muted/30 section-y"
      aria-label={t(ui.experienceTitle, locale)}
    >
      <div className="section-container">
        <Reveal>
          <p className="section-label mb-4">journey</p>
          <h2 className="section-title">{t(ui.experienceTitle, locale)}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {t(ui.experienceIntro, locale)}
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mt-10 space-y-3 sm:mt-12 sm:space-y-4">
          <span
            className="absolute left-[23px] top-6 bottom-6 w-px bg-border sm:left-[27px]"
            aria-hidden
          />
          {!reduced && (
            <motion.span
              className="absolute left-[23px] top-6 bottom-6 w-px origin-top bg-accent sm:left-[27px]"
              style={{ scaleY }}
              aria-hidden
            />
          )}
          {timeline.map((item, index) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={index}
              active={activeId === item.id}
              onActivate={() => setActiveId(item.id)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
