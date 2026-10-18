"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type RefObject,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  projectCategories,
  projects,
  ui,
  type Project,
  type ProjectCategory,
} from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import { easeOut } from "@/lib/motion";
import Reveal from "../Reveal";
import Tilt from "../Tilt";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubIcon,
} from "../Icons";

type FilterId = "all" | ProjectCategory;

const PROJECT_MS = 14000;
const SHOT_MS = 4500;

function useShowcaseClock({
  enabled,
  paused,
  projectCount,
  shotCount,
  resetKey,
  onNextProject,
  onNextShot,
}: {
  enabled: boolean;
  paused: boolean;
  projectCount: number;
  shotCount: number;
  resetKey: number;
  onNextProject: () => void;
  onNextShot: () => void;
}) {
  const projectBar = useRef<HTMLSpanElement>(null);
  const shotBar = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(paused);
  const counts = useRef({ projectCount, shotCount });
  const callbacks = useRef({ onNextProject, onNextShot });

  pausedRef.current = paused;
  counts.current = { projectCount, shotCount };
  callbacks.current = { onNextProject, onNextShot };

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let last = performance.now();
    let projectElapsed = 0;
    let shotElapsed = 0;

    const loop = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;

      if (!pausedRef.current) {
        if (counts.current.projectCount > 1) {
          projectElapsed += delta;
          if (projectElapsed >= PROJECT_MS) {
            projectElapsed = 0;
            shotElapsed = 0;
            callbacks.current.onNextProject();
          }
        }
        if (counts.current.shotCount > 1) {
          shotElapsed += delta;
          if (shotElapsed >= SHOT_MS) {
            shotElapsed = 0;
            callbacks.current.onNextShot();
          }
        }
      }

      if (projectBar.current) {
        const scale =
          counts.current.projectCount > 1 ? projectElapsed / PROJECT_MS : 0;
        projectBar.current.style.transform = `scaleX(${scale})`;
      }
      if (shotBar.current) {
        const scale = counts.current.shotCount > 1 ? shotElapsed / SHOT_MS : 0;
        shotBar.current.style.transform = `scaleX(${scale})`;
      }

      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [enabled, resetKey]);

  return { projectBar, shotBar };
}

function ProjectLinks({ project }: { project: Project }) {
  const { locale } = useLocale();
  const primaryLink =
    project.link ?? project.repo ?? project.repos?.[0]?.url ?? project.apiLink;

  if (!primaryLink) return null;

  const isExternal = Boolean(project.link || project.apiLink);

  return (
    <a
      href={primaryLink}
      target="_blank"
      rel="noreferrer"
      className="btn btn-primary group"
    >
      {t(ui.viewProject, locale)}
      {isExternal ? (
        <ExternalLinkIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : (
        <GitHubIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
      )}
    </a>
  );
}

function PhotoPrint({
  src,
  alt,
  sizes,
  priority = false,
  drift = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  drift?: boolean;
}) {
  return (
    <div className="photo-print">
      <div className="relative aspect-[3/2] overflow-hidden bg-bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover object-top ${
            drift ? "project-frame-drift" : ""
          }`}
          style={drift ? { ["--shot-ms" as string]: `${SHOT_MS}ms` } : undefined}
        />
        <div className="photo-grain" aria-hidden />
        <div className="photo-vignette" aria-hidden />
      </div>
    </div>
  );
}

function PolaroidGallery({
  images,
  activeSrc,
  onSelect,
  projectTitle,
  shotBar,
}: {
  images: string[];
  activeSrc: string;
  onSelect: (src: string) => void;
  projectTitle: string;
  shotBar: RefObject<HTMLSpanElement | null>;
}) {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>("[data-shot-active='true']");
    if (!scroller || !active) return;
    const left =
      active.offsetLeft - scroller.clientWidth / 2 + active.clientWidth / 2;
    scroller.scrollTo({
      left,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [activeSrc, reduced]);

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
          {t(ui.projectScreenshots, locale)}
        </p>
        <p className="relative font-mono text-[10px] tracking-[0.2em] text-ink-soft">
          {String(images.findIndex((src) => src === activeSrc) + 1).padStart(2, "0")}
          <span className="text-border"> / </span>
          {String(images.length).padStart(2, "0")}
          <span className="absolute -bottom-1.5 left-0 h-px w-full bg-border" aria-hidden>
            <span
              ref={shotBar}
              className="block h-full w-full origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </p>
      </div>
      <div ref={scrollerRef} className="flex items-end gap-3 overflow-x-auto pb-3">
        {images.map((src, index) => {
          const selected = src === activeSrc;
          const tilt = reduced ? 0 : index % 2 === 0 ? -2.5 : 2.8;
          return (
            <button
              key={src}
              type="button"
              data-shot-active={selected ? "true" : "false"}
              onClick={() => onSelect(src)}
              aria-label={`${projectTitle} screenshot ${index + 1}`}
              aria-pressed={selected}
              className={`group/polaroid relative h-20 w-[6.75rem] shrink-0 overflow-hidden bg-surface p-1 shadow-[0_12px_28px_-18px_rgb(var(--color-ink)/0.7)] transition-[opacity,box-shadow] duration-200 ease-out sm:h-24 sm:w-32 ${
                selected
                  ? "shot-float z-10 opacity-100"
                  : "opacity-70 hover:z-10 hover:opacity-100"
              }`}
              style={{
                ["--tilt" as string]: `${tilt}deg`,
                transform: selected && !reduced ? undefined : `rotate(${tilt}deg)`,
              }}
            >
              <span className="relative block h-full w-full overflow-hidden bg-bg-muted">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
                <span className="photo-grain opacity-[0.1]" aria-hidden />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Projects() {
  const { locale } = useLocale();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<FilterId>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [clockKey, setClockKey] = useState(0);
  const filterReady = useRef(false);

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: t(ui.showAll, locale) },
    ...projectCategories.map((category) => ({
      id: category.id,
      label: t(category.label, locale),
    })),
  ];

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    setActiveIndex(0);
    setPreviewSrc(null);
    if (filterReady.current) setClockKey((key) => key + 1);
    filterReady.current = true;
  }, [filter]);

  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0];
  const gallery = activeProject?.images?.length
    ? activeProject.images
    : activeProject
      ? [activeProject.image]
      : [];
  const galleryRef = useRef(gallery);
  const coverRef = useRef(activeProject?.image ?? "");
  const countRef = useRef(filteredProjects.length);
  galleryRef.current = gallery;
  coverRef.current = activeProject?.image ?? "";
  countRef.current = filteredProjects.length;

  const { projectBar, shotBar } = useShowcaseClock({
    enabled: !reduced && Boolean(activeProject),
    paused,
    projectCount: filteredProjects.length,
    shotCount: gallery.length,
    resetKey: clockKey,
    onNextProject: () => {
      setActiveIndex((index) => (index + 1) % Math.max(countRef.current, 1));
      setPreviewSrc(null);
    },
    onNextShot: () => {
      const shots = galleryRef.current;
      const cover = coverRef.current;
      if (shots.length < 2) return;
      setPreviewSrc((current) => {
        const shown = current ?? cover;
        const index = Math.max(0, shots.indexOf(shown));
        const next = shots[(index + 1) % shots.length];
        return next === cover ? null : next;
      });
    },
  });

  useEffect(() => {
    setPreviewSrc(null);
  }, [activeProject?.title]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setPreviewSrc(null);
    setClockKey((key) => key + 1);
  };

  const selectShot = (src: string) => {
    setPreviewSrc(src);
    setClockKey((key) => key + 1);
  };

  const pauseDeck = () => setPaused(true);
  const resumeDeck = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setPaused(false);
    }
  };

  const titleWords = t(ui.curatedProjects, locale).split(" ");
  const titleLead = titleWords[0] ?? "";
  const titleRest = titleWords.slice(1).join(" ");

  if (!activeProject) {
    return (
      <section
        id="projects"
        className="scroll-mt-24 border-b border-border section-y"
        aria-label={t(ui.curatedProjects, locale)}
      >
        <div className="section-container">
          <h2 className="section-title">{t(ui.curatedProjects, locale)}</h2>
          <p className="mt-8 text-ink-soft">{t(ui.noProjectsInCategory, locale)}</p>
        </div>
      </section>
    );
  }

  const activeImage = previewSrc ?? activeProject.image;
  const hasGallery = gallery.length > 1;
  const nextIndex = (activeIndex + 1) % filteredProjects.length;
  const prevIndex =
    (activeIndex - 1 + filteredProjects.length) % filteredProjects.length;
  const nextProject =
    filteredProjects.length > 1 ? filteredProjects[nextIndex] : null;

  const categoryLabel =
    projectCategories.find((category) => category.id === activeProject.category)
      ?.label ?? { en: activeProject.category, id: activeProject.category };

  const activeIndexLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(filteredProjects.length).padStart(2, "0");

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden border-b border-border section-y"
      aria-label={t(ui.curatedProjects, locale)}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_12%_8%,rgb(var(--color-accent)/0.08),transparent_52%)]"
        aria-hidden
      />

      <div className="section-container relative">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
            <div>
              <p className="section-label mb-5">{activeIndexLabel} / {totalLabel}</p>
              <h2 className="font-display text-[clamp(3.25rem,9vw,6.5rem)] leading-[0.84] tracking-[-0.04em] text-ink">
                <span className="italic">{titleLead}</span>
                {titleRest ? (
                  <span className="mt-1 block pl-[0.12em]">{titleRest}</span>
                ) : null}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg lg:justify-self-end lg:text-right">
              {t(ui.projectsIntro, locale)}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <nav
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-border py-4"
            aria-label={t(ui.curatedProjects, locale)}
          >
            {filters.map((item, index) => {
              const selected = filter === item.id;
              return (
                <span key={item.id} className="inline-flex items-center gap-3">
                  {index > 0 && (
                    <span className="text-ink-soft/40" aria-hidden>
                      /
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`catalog-link ${selected ? "catalog-link-active" : ""}`}
                  >
                    {item.label}
                    {selected && (
                      <span className="mt-1 block h-px w-full bg-accent" />
                    )}
                  </button>
                </span>
              );
            })}
          </nav>
        </Reveal>

        <div
          className={`projects-autoplay mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start lg:gap-16 xl:gap-20 ${
            paused ? "is-paused" : ""
          }`}
          onMouseEnter={pauseDeck}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={pauseDeck}
          onBlurCapture={resumeDeck}
        >
          <Reveal delay={0.08}>
            <div className="relative">
              {nextProject && (
                <button
                  type="button"
                  onClick={() => goTo(nextIndex)}
                  aria-label={`${t(ui.openProjectDetail, locale)} ${nextProject.title}`}
                  className="absolute -right-3 top-10 z-0 hidden w-[46%] origin-bottom-right opacity-40 transition-[opacity,transform] duration-300 ease-out hover:opacity-70 sm:block lg:-right-6"
                  style={{
                    transform: reduced ? undefined : "rotate(5deg) translateY(12px)",
                  }}
                >
                  <PhotoPrint
                    src={nextProject.image}
                    alt=""
                    sizes="280px"
                  />
                </button>
              )}

              <Tilt max={6} className="relative z-10">
                <button
                  type="button"
                  onClick={() => goTo(nextIndex)}
                  aria-label={`${t(ui.nextProject, locale)} — ${activeProject.title}`}
                  className="group relative w-full text-left"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeProject.title}-${activeImage}-${clockKey}`}
                      initial={reduced ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                    >
                      <PhotoPrint
                        src={activeImage}
                        alt={`${activeProject.title} project screenshot`}
                        sizes="(max-width: 1024px) 100vw, 640px"
                        priority
                        drift={!reduced}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <span
                    className="pointer-events-none absolute inset-x-2 bottom-2 z-20 h-0.5 bg-ink/10 sm:inset-x-2.5 sm:bottom-2.5"
                    aria-hidden
                  >
                    <span
                      ref={projectBar}
                      className="block h-full w-full origin-left bg-accent"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                </button>
              </Tilt>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                  {activeIndexLabel}
                  <span className="text-border"> — </span>
                  {activeProject.title}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(prevIndex)}
                    className="icon-btn h-8 w-8"
                    aria-label={`${t(ui.openProjectDetail, locale)} ${filteredProjects[prevIndex].title}`}
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(nextIndex)}
                    className="icon-btn h-8 w-8"
                    aria-label={t(ui.nextProject, locale)}
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="mt-3 max-w-md text-xs leading-relaxed text-ink-soft">
                {t(ui.projectStackHint, locale)}
              </p>

              {hasGallery && (
                <PolaroidGallery
                  images={gallery}
                  activeSrc={activeImage}
                  onSelect={selectShot}
                  projectTitle={activeProject.title}
                  shotBar={shotBar}
                />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative lg:pt-4">
              <span
                className="pointer-events-none absolute -right-2 -top-10 font-display text-[clamp(5rem,14vw,9rem)] italic leading-none text-ink/[0.045] sm:-top-14"
                aria-hidden
              >
                {activeIndexLabel}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${filter}-${activeProject.title}`}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                    {t(categoryLabel, locale)}
                    <span className="text-border"> · </span>
                    <span className="text-ink-soft">
                      {t(activeProject.period, locale)}
                    </span>
                  </p>

                  <h3 className="mt-5 font-display text-[clamp(2.6rem,5.4vw,4.75rem)] italic leading-[0.9] tracking-[-0.03em] text-ink">
                    {activeProject.title}
                  </h3>
                  <p className="mt-4 max-w-md font-display text-xl italic leading-snug text-ink-soft sm:text-2xl">
                    {t(activeProject.subtitle, locale)}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {activeProject.tech.map((tech, i) => (
                      <motion.li
                        key={tech}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + i * 0.03, duration: 0.35, ease: easeOut }}
                        className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted"
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>

                  <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-muted">
                    {t(activeProject.description, locale)}
                  </p>

                  {activeProject.keyFeatures &&
                    activeProject.keyFeatures.length > 0 && (
                      <ul className="mt-7 space-y-3">
                        {activeProject.keyFeatures.map((feature, i) => (
                          <li
                            key={feature.en}
                            className="grid grid-cols-[auto_1fr] gap-4 text-sm leading-relaxed text-ink-muted"
                          >
                            <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{t(feature, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                  <div className="mt-9 flex flex-wrap gap-3">
                    <ProjectLinks project={activeProject} />
                    {activeProject.repos?.map((repo) => (
                      <a
                        key={repo.url}
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary group"
                      >
                        <GitHubIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                        {t(repo.label, locale)}
                      </a>
                    ))}
                    {activeProject.repo && !activeProject.repos?.length && (
                      <a
                        href={activeProject.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary group"
                      >
                        <GitHubIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                        {t(ui.code, locale)}
                      </a>
                    )}
                    {activeProject.apiLink && (
                      <a
                        href={activeProject.apiLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary group"
                      >
                        <ExternalLinkIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        {t(ui.apiDocs, locale)}
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <ol className="mt-12 border-t border-border pt-6">
                {filteredProjects.map((project, index) => {
                  const selected = index === activeIndex;
                  return (
                    <li key={project.title}>
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        className={`group flex w-full items-baseline gap-4 py-2.5 text-left transition-colors duration-200 ease-out ${
                          selected ? "text-ink" : "text-ink-soft hover:text-ink"
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-xl leading-none sm:text-2xl ${
                            selected ? "italic" : ""
                          }`}
                        >
                          {project.title}
                        </span>
                        {selected && (
                          <span className="ml-auto hidden h-px flex-1 max-w-16 bg-accent sm:block" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
