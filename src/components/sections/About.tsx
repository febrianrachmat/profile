"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { about, aboutHeadline, aboutShift, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";

const riseEase = [0.22, 1, 0.36, 1] as const;
const clipEase = [0.16, 1, 0.3, 1] as const;

function HeadlineLine({
  text,
  tone,
  index,
  reduced,
}: {
  text: string;
  tone: string;
  index: number;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <p ref={ref} className="overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className={`block font-display text-[clamp(2.4rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em] ${tone}`}
        initial={reduced ? false : { y: "110%" }}
        animate={reduced || inView ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: 0.85,
          delay: index * 0.07,
          ease: clipEase,
        }}
      >
        {text}
      </motion.span>
    </p>
  );
}

function AboutHeadline() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  return (
    <div className="space-y-1 sm:space-y-2">
      {aboutHeadline.map((line, index) => {
        const text = t(line.text, locale);
        const tone =
          line.style === "italic"
            ? "italic text-ink-soft"
            : line.style === "pill"
              ? "italic text-accent"
              : "text-ink";

        return (
          <HeadlineLine
            key={line.text.en}
            text={text}
            tone={tone}
            index={index}
            reduced={reduced}
          />
        );
      })}
    </div>
  );
}

export default function About() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-border"
      aria-label={t(ui.aboutLabel, locale)}
    >
      <div className="section-container pb-12 pt-16 sm:pt-20 lg:pb-16 lg:pt-24">
        <motion.p
          className="section-label mb-8"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: riseEase }}
        >
          {t(ui.aboutLabel, locale)}
        </motion.p>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.78fr)] lg:gap-14 xl:gap-20">
          <AboutHeadline />
          <div className="space-y-6 text-base leading-relaxed text-ink-muted sm:text-lg lg:pt-2">
            {about.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.12 + index * 0.08,
                  ease: riseEase,
                }}
              >
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
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="section-container grid lg:grid-cols-2">
          <motion.div
            className="border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: riseEase }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              {t(aboutShift.thenPeriod, locale)}
            </p>
            <p className="mt-3 font-display text-display-md italic text-ink">
              {t(aboutShift.thenLabel, locale)}
            </p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-muted">
              {t(aboutShift.thenBody, locale)}
            </p>
          </motion.div>

          <motion.div
            className="grid items-center gap-8 py-10 sm:grid-cols-[minmax(0,1fr)_11.5rem] lg:py-14 lg:pl-12"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: riseEase }}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                {t(aboutShift.nowPeriod, locale)}
              </p>
              <p className="mt-3 font-display text-display-md text-ink">
                {t(aboutShift.nowLabel, locale)}
              </p>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-muted">
                {t(aboutShift.nowBody, locale)}
              </p>
            </div>
            <a
              href="#projects"
              aria-label={t(aboutShift.nowImageAlt, locale)}
              className="photo-print block rotate-2"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-bg-muted">
                <Image
                  src="/projects/kinova.png"
                  alt=""
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                />
                <div className="photo-grain" aria-hidden />
                <div className="photo-vignette" aria-hidden />
              </div>
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
