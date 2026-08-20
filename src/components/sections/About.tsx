"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about, aboutHeadline, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import { revealHidden, revealTransition } from "@/lib/motion";
import Reveal from "../Reveal";

function AboutHeadline() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  return (
    <div className="space-y-1 sm:space-y-2">
      {aboutHeadline.map((line, index) => {
        const text = t(line.text, locale);

        const motionProps = reduced
          ? {}
          : {
              initial: revealHidden,
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-40px" },
              transition: revealTransition(index * 0.07),
            };

        if (line.style === "italic") {
          return (
            <motion.p
              key={line.text.en}
              {...motionProps}
              className="font-display text-display-md italic leading-[1.12] text-ink-soft"
            >
              {text}
            </motion.p>
          );
        }

        if (line.style === "pill") {
          return (
            <motion.p key={line.text.en} {...motionProps} className="pt-2">
              <span className="inline-block rounded-full bg-accent px-5 py-1.5 font-display text-display-md leading-none text-bg">
                {text}
              </span>
            </motion.p>
          );
        }

        return (
          <motion.p
            key={line.text.en}
            {...motionProps}
            className="font-display text-display-md leading-[1.12] text-ink"
          >
            {text}
          </motion.p>
        );
      })}
    </div>
  );
}

export default function About() {
  const { locale } = useLocale();

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden border-b border-border"
      aria-label={t(ui.aboutLabel, locale)}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_0%_0%,rgb(var(--color-accent)/0.07),transparent_55%),radial-gradient(700px_circle_at_100%_80%,rgb(var(--color-accent)/0.05),transparent_50%)]"
        aria-hidden
      />

      <div className="section-container relative section-y">
        <Reveal>
          <p className="section-label mb-8">{t(ui.aboutLabel, locale)}</p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 xl:gap-20">
          <AboutHeadline />

          <div className="space-y-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            {about.map((paragraph, index) => (
              <Reveal key={index} delay={0.08 + index * 0.06}>
                <p>
                  {paragraph.map((segment, segmentIndex) =>
                    segment.bold ? (
                      <strong
                        key={segmentIndex}
                        className="font-medium text-accent"
                      >
                        {t(segment.text, locale)}
                      </strong>
                    ) : (
                      <span key={segmentIndex}>{t(segment.text, locale)}</span>
                    ),
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
