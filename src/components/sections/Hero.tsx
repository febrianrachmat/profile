"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { profile, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import { staggerContainer, staggerItem } from "@/lib/motion";
import HeroPhoto from "../HeroPhoto";
import { ArrowRightIcon, ExternalLinkIcon } from "../Icons";

const HeroScene3D = dynamic(() => import("../HeroScene3D"), {
  ssr: false,
});

export default function Hero() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border" aria-label="Introduction">
      <div className="section-container section-y">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:gap-20">
          <motion.div
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={reduced ? undefined : staggerContainer}
          >
            <motion.div
              variants={reduced ? undefined : staggerItem}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <p className="section-label">{t(ui.profileLabel, locale)}</p>
              {profile.openToWork && (
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  {t(ui.openToWork, locale)}
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={reduced ? undefined : staggerItem}
              className="max-w-4xl font-display text-display text-ink"
            >
              {profile.heroHeadline}
            </motion.h1>

            <motion.p
              variants={reduced ? undefined : staggerItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"
            >
              {t(profile.tagline, locale)}
            </motion.p>

            <motion.p
              variants={reduced ? undefined : staggerItem}
              className="mt-4 font-mono text-sm text-ink-soft"
            >
              {t(profile.role, locale)} · {t(profile.location, locale)}
            </motion.p>

            <motion.div
              variants={reduced ? undefined : staggerItem}
              className="mt-8 flex flex-wrap gap-3"
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
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="justify-self-center lg:justify-self-end"
          >
            <div className="relative z-0 isolate" style={{ perspective: 1200 }}>
              <HeroScene3D />
              <HeroPhoto />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
