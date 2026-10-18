"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { profile, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import HeroPhoto from "../HeroPhoto";
import { ArrowRightIcon, ExternalLinkIcon } from "../Icons";

const HeroScene3D = dynamic(() => import("../HeroScene3D"), {
  ssr: false,
});

const nameEase = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const [first, last] = profile.heroHeadline.split(" ");

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      aria-label="Introduction"
    >
      <div className="section-container pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <motion.div
              className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: nameEase }}
            >
              <p className="section-label">{t(ui.profileLabel, locale)}</p>
              {profile.openToWork && (
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  {t(ui.openToWork, locale)}
                </span>
              )}
            </motion.div>

            <h1 className="font-display text-[clamp(3.15rem,15vw,8.4rem)] leading-[0.8] tracking-[-0.045em] text-ink">
              {[first, last].filter(Boolean).map((line, index) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
                >
                  <motion.span
                    className={`block ${index === 1 ? "italic text-ink-soft" : ""}`}
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.15,
                      delay: 0.05 + index * 0.14,
                      ease: nameEase,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-muted sm:text-xl"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: nameEase }}
            >
              {t(profile.tagline, locale)}
            </motion.p>
            <motion.p
              className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52, ease: nameEase }}
            >
              {t(profile.role, locale)}
              <span className="text-border"> · </span>
              {t(profile.location, locale)}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: nameEase }}
            >
              <a href="#projects" className="btn btn-primary group">
                {t(ui.viewProjects, locale)}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </a>
              {profile.resumeUrl && profile.resumeUrl !== "#" && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary group"
                >
                  {t(ui.downloadResume, locale)}
                  <ExternalLinkIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <a href="#contact" className="btn btn-secondary">
                {t(ui.contactMe, locale)}
              </a>
            </motion.div>
          </div>

          <motion.div
            className="relative z-0 isolate justify-self-center lg:justify-self-end"
            style={{ perspective: 1200 }}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: nameEase }}
          >
            <HeroScene3D />
            <HeroPhoto />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
