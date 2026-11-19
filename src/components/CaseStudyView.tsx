"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  profile,
  projectCategories,
  projects,
  projectSlug,
  ui,
} from "@/lib/content";
import { t, useLocale, type LocalizedString } from "@/lib/i18n";
import { easeOut } from "@/lib/motion";
import Header from "./Header";
import ProjectNotice from "./ProjectNotice";
import Reveal from "./Reveal";
import ScrollProgress from "./ScrollProgress";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubIcon,
} from "./Icons";

function SectionHeading({
  index,
  label,
}: {
  index: number;
  label: LocalizedString;
}) {
  const { locale } = useLocale();
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <h2 className="font-display text-[clamp(2rem,4.4vw,3.25rem)] italic leading-none tracking-[-0.03em] text-ink">
        {t(label, locale)}
      </h2>
    </div>
  );
}

export default function CaseStudyView({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const project = projects.find((p) => projectSlug(p) === slug);
  const shots = project?.images?.length ? project.images : project ? [project.image] : [];
  // The cover already opens the page, so the gallery starts on the next shot.
  const [activeShot, setActiveShot] = useState(shots.length > 1 ? 1 : 0);

  if (!project?.caseStudy) return null;
  const cs = project.caseStudy;

  const categoryLabel =
    projectCategories.find((c) => c.id === project.category)?.label ?? {
      en: project.category,
      id: project.category,
    };

  let section = 0;
  const nextSection = () => ++section;

  return (
    <>
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only z-[110] rounded-md bg-ink px-4 py-2 font-mono text-sm font-semibold text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {t(ui.skipToContent, locale)}
      </a>
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_12%_8%,rgb(var(--color-accent)/0.08),transparent_52%)]"
            aria-hidden
          />
          <div className="section-container relative">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
              {t(ui.backToProjects, locale)}
            </Link>

            <Reveal>
              <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                {t(ui.caseStudy, locale)}
                <span className="text-border"> · </span>
                <span className="text-ink-soft">{t(categoryLabel, locale)}</span>
              </p>
              <h1 className="mt-5 font-display text-[clamp(3.5rem,11vw,8rem)] italic leading-[0.84] tracking-[-0.04em] text-ink">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl font-display text-2xl italic leading-snug text-ink-soft sm:text-3xl">
                {t(project.subtitle, locale)}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="mt-12 grid gap-8 border-y border-border py-6 sm:grid-cols-3">
                <div>
                  <dt className="section-label mb-2">{t(ui.csRole, locale)}</dt>
                  <dd className="text-sm leading-relaxed text-ink-muted">{t(cs.role, locale)}</dd>
                </div>
                <div>
                  <dt className="section-label mb-2">{t(ui.csTimeline, locale)}</dt>
                  <dd className="text-sm leading-relaxed text-ink-muted">{t(cs.timeline, locale)}</dd>
                </div>
                <div>
                  <dt className="section-label mb-2">{t(ui.csStack, locale)}</dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary group">
                    {t(ui.liveDemo, locale)}
                    <ExternalLinkIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                {project.repos?.map((repo) => (
                  <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="btn btn-secondary group">
                    <GitHubIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                    {t(repo.label, locale)}
                  </a>
                ))}
                {project.repo && !project.repos?.length && (
                  <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-secondary group">
                    <GitHubIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                    {t(ui.code, locale)}
                  </a>
                )}
                {project.apiLink && (
                  <a href={project.apiLink} target="_blank" rel="noreferrer" className="btn btn-secondary group">
                    <ExternalLinkIcon className="h-4 w-4" />
                    {t(ui.apiDocs, locale)}
                  </a>
                )}
              </div>

              {project.notice && (
                <ProjectNotice notice={project.notice} className="mt-8" />
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="photo-print mt-14">
                <div className="relative aspect-[16/9] overflow-hidden bg-bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} home page`}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover object-top"
                  />
                  <div className="photo-grain" aria-hidden />
                </div>
              </div>
            </Reveal>

            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {cs.stats.map((stat, i) => (
                <Reveal key={stat.value + i} delay={0.04 * i}>
                  <li className="border-l border-border pl-4">
                    <p className="font-display text-5xl italic leading-none text-ink sm:text-6xl">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm leading-snug text-ink-soft">{t(stat.label, locale)}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Problem */}
        <section className="border-b border-border section-y">
          <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <SectionHeading index={nextSection()} label={ui.csProblem} />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="space-y-6 text-lg leading-relaxed text-ink-muted">
                {cs.problem.map((p) => (
                  <p key={p.en}>{t(p, locale)}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Flow */}
        <section className="border-b border-border section-y">
          <div className="section-container">
            <Reveal>
              <SectionHeading index={nextSection()} label={ui.csFlow} />
              <p className="section-label mb-6">{t(cs.flow.title, locale)}</p>
            </Reveal>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {cs.flow.steps.map((step, i) => (
                <Reveal key={step.label.en} delay={0.06 * i}>
                  <li className="relative h-full rounded-2xl border border-border bg-surface p-5 lg:mr-8">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                      {t(step.label, locale)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(step.note, locale)}</p>
                    {i < cs.flow.steps.length - 1 && (
                      <ArrowRightIcon
                        className="absolute -right-6 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-accent lg:block"
                      />
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
            {cs.flow.footnote && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-soft">
                  {t(cs.flow.footnote, locale)}
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* Decisions */}
        <section className="border-b border-border section-y">
          <div className="section-container">
            <Reveal>
              <SectionHeading index={nextSection()} label={ui.csDecisions} />
            </Reveal>
            <div className="space-y-6">
              {cs.decisions.map((d, i) => (
                <Reveal key={d.title.en} delay={0.04 * i}>
                  <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                    <h3 className="flex items-baseline gap-4 font-display text-2xl italic leading-tight text-ink sm:text-3xl">
                      <span className="font-mono text-[11px] not-italic tracking-[0.2em] text-accent">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {t(d.title, locale)}
                    </h3>
                    <dl className="mt-6 grid gap-6 md:grid-cols-3">
                      {(
                        [
                          [ui.csContext, d.context],
                          [ui.csChoice, d.choice],
                          [ui.csTradeoff, d.tradeoff],
                        ] as const
                      ).map(([label, body]) => (
                        <div key={label.en}>
                          <dt className="section-label mb-2">{t(label, locale)}</dt>
                          <dd className="text-sm leading-relaxed text-ink-muted">{t(body, locale)}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="border-b border-border section-y">
          <div className="section-container">
            <Reveal>
              <SectionHeading index={nextSection()} label={ui.csChallenges} />
            </Reveal>
            <div className="grid gap-10 md:grid-cols-3">
              {cs.challenges.map((c, i) => (
                <Reveal key={c.title.en} delay={0.05 * i}>
                  <h3 className="text-lg font-semibold leading-snug text-ink">{t(c.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t(c.body, locale)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Screens */}
        {shots.length > 1 && (
          <section className="border-b border-border section-y">
            <div className="section-container">
              <Reveal>
                <SectionHeading index={nextSection()} label={ui.csScreens} />
              </Reveal>
              <Reveal delay={0.06}>
                <div className="photo-print">
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg-muted">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={shots[activeShot]}
                        className="absolute inset-0"
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduced ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                      >
                        <Image
                          src={shots[activeShot]}
                          alt={`${project.title} screenshot ${activeShot + 1}`}
                          fill
                          sizes="(max-width: 1280px) 100vw, 1200px"
                          className="object-cover object-top"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {shots.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveShot(i)}
                      aria-label={`${project.title} screenshot ${i + 1}`}
                      aria-pressed={i === activeShot}
                      className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-md border transition-[opacity,border-color] duration-200 sm:h-20 sm:w-36 ${
                        i === activeShot
                          ? "border-accent opacity-100"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={src} alt="" fill sizes="144px" className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Outcome */}
        <section className="border-b border-border section-y">
          <div className="section-container grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading index={nextSection()} label={ui.csOutcome} />
              <ul className="space-y-4">
                {cs.outcome.map((o, i) => (
                  <li key={o.en} className="grid grid-cols-[auto_1fr] gap-4 text-base leading-relaxed text-ink-muted">
                    <span className="font-mono text-[10px] leading-7 tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{t(o, locale)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06}>
              <SectionHeading index={nextSection()} label={ui.csNext} />
              <ul className="space-y-4">
                {cs.next.map((n) => (
                  <li key={n.en} className="grid grid-cols-[auto_1fr] gap-4 text-base leading-relaxed text-ink-muted">
                    <span className="leading-7 text-accent" aria-hidden>→</span>
                    <span>{t(n, locale)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="section-y">
          <div className="section-container text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] italic leading-none tracking-[-0.03em] text-ink">
                {t(ui.csCtaTitle, locale)}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-ink-muted">{t(ui.csCtaBody, locale)}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/#contact" className="btn btn-primary">
                  {t(ui.contactMe, locale)}
                </Link>
                <Link href="/#projects" className="btn btn-secondary">
                  {t(ui.backToProjects, locale)}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-border py-8">
          <div className="section-container text-center font-mono text-xs tracking-wider text-ink-soft">
            <p>
              © {new Date().getFullYear()} {profile.name}.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
