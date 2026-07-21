"use client";

import Image from "next/image";
import { profile, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";
import { ExternalLinkIcon } from "../Icons";

export default function Hero() {
  const { locale } = useLocale();

  return (
    <section className="border-b border-border" aria-label="Introduction">
      <div className="section-container py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <p className="section-label">{t(ui.profileLabel, locale)}</p>
              {profile.openToWork && (
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  {t(ui.openToWork, locale)}
                </span>
              )}
            </div>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              {profile.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {t(profile.tagline, locale)}
            </p>
            <p className="mt-4 font-mono text-sm text-ink-soft">
              {t(profile.role, locale)} · {t(profile.location, locale)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:border-accent"
              >
                {t(ui.viewProjects, locale)}
              </a>
              {profile.resumeUrl && profile.resumeUrl !== "#" && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  {t(ui.downloadResume, locale)}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                {t(ui.contactMe, locale)}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="justify-self-center lg:justify-self-end">
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-border bg-bg-muted shadow-sm sm:h-56 sm:w-56">
              <Image
                src={profile.avatarUrl}
                alt={`Professional headshot of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 640px) 192px, 224px"
                className="object-cover object-[center_15%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
