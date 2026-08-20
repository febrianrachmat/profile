"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  projectCategories,
  projects,
  ui,
  type Project,
  type ProjectCategory,
} from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";
import Tilt from "../Tilt";
import { ExternalLinkIcon, GitHubIcon } from "../Icons";

type FilterId = "all" | ProjectCategory;

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

function ProjectCardFace({
  project,
  imageSrc,
  indexLabel,
}: {
  project: Project;
  imageSrc?: string;
  indexLabel?: string;
}) {
  return (
    <div className="group overflow-hidden rounded-card border border-border bg-surface shadow-[0_18px_50px_-28px_rgb(var(--color-ink)/0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-muted">
        <Image
          src={imageSrc ?? project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          aria-hidden
        />
        {indexLabel && (
          <span className="absolute left-4 top-4 rounded-full border border-bg/20 bg-ink/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-bg backdrop-blur-sm">
            {indexLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function ProjectGallery({
  images,
  activeSrc,
  onSelect,
  projectTitle,
}: {
  images: string[];
  activeSrc: string;
  onSelect: (src: string) => void;
  projectTitle: string;
}) {
  const { locale } = useLocale();

  return (
    <div className="mt-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
          {t(ui.projectScreenshots, locale)}
        </p>
        <p className="font-mono text-[10px] tracking-wider text-ink-soft">
          {images.findIndex((src) => src === activeSrc) + 1}/{images.length}
        </p>
      </div>
      <div className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1">
        {images.map((src, index) => {
          const selected = src === activeSrc;
          return (
            <button
              key={src}
              type="button"
              onClick={() => onSelect(src)}
              aria-label={`${projectTitle} screenshot ${index + 1}`}
              aria-pressed={selected}
              className={`relative h-[4.25rem] w-[6.5rem] shrink-0 overflow-hidden rounded-lg border transition duration-200 sm:h-20 sm:w-28 ${
                selected
                  ? "border-ink ring-2 ring-accent/30"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="112px"
                className="object-cover object-top"
              />
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
  }, [filter]);

  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0];

  useEffect(() => {
    setPreviewSrc(null);
  }, [activeProject?.title]);

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

  const gallery = activeProject.images?.length
    ? activeProject.images
    : [activeProject.image];
  const activeImage = previewSrc ?? activeProject.image;
  const hasGallery = gallery.length > 1;

  const categoryLabel =
    projectCategories.find((category) => category.id === activeProject.category)
      ?.label ?? { en: activeProject.category, id: activeProject.category };

  const activeIndexLabel = String(activeIndex + 1).padStart(2, "0");

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-border section-y"
      aria-label={t(ui.curatedProjects, locale)}
    >
      <div className="section-container">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">{t(ui.curatedProjects, locale)}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                {t(ui.projectsIntro, locale)}
              </p>
            </div>
            <p className="font-mono text-xs tracking-[0.2em] text-ink-soft">
              {activeIndexLabel} / {String(filteredProjects.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <LayoutGroup>
            <div className="mt-8 flex flex-wrap gap-3">
              {filters.map((item) => {
                const selected = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`relative filter-pill ${
                      selected
                        ? "border-transparent text-bg"
                        : "filter-pill-inactive"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="project-filter-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgb(var(--color-accent)/0.12),transparent_55%)]"
                aria-hidden
              />

              <div
                className="relative mx-auto h-[300px] w-full max-w-md sm:h-[380px]"
                style={{ perspective: 1100 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filter}
                    className="absolute inset-0"
                    initial={reduced ? false : { opacity: 0, y: 18, rotateX: 8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -14, rotateX: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {filteredProjects.map((project, index) => {
                      const offset =
                        (index - activeIndex + filteredProjects.length) %
                        filteredProjects.length;

                      if (offset > 2) return null;

                      const stackStyle = {
                        zIndex: 10 - offset,
                        transform: `translateY(${offset * 20}px) scale(${1 - offset * 0.045})`,
                        opacity: offset === 0 ? 1 : 0.9 - offset * 0.14,
                      } as const;

                      if (offset === 0) {
                        return (
                          <Tilt
                            key={project.title}
                            max={8}
                            className="absolute inset-x-0 top-0 z-10"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setActiveIndex(
                                  (activeIndex + 1) % filteredProjects.length,
                                )
                              }
                              aria-label={`${t(ui.nextProject, locale)} — ${project.title}`}
                              className="w-full text-left"
                            >
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeImage}
                                  initial={reduced ? false : { opacity: 0.45 }}
                                  animate={{ opacity: 1 }}
                                  exit={reduced ? undefined : { opacity: 0.45 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ProjectCardFace
                                    project={project}
                                    imageSrc={activeImage}
                                    indexLabel={activeIndexLabel}
                                  />
                                </motion.div>
                              </AnimatePresence>
                            </button>
                          </Tilt>
                        );
                      }

                      return (
                        <button
                          key={project.title}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-label={`${t(ui.openProjectDetail, locale)} ${project.title}`}
                          className="absolute inset-x-0 top-0 w-full text-left transition-all duration-500 ease-out"
                          style={stackStyle}
                        >
                          <ProjectCardFace
                            project={project}
                            indexLabel={String(index + 1).padStart(2, "0")}
                          />
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="relative mt-8 text-center text-sm text-ink-soft">
                {t(ui.projectStackHint, locale)}
              </p>

              {hasGallery && (
                <div className="relative mx-auto mt-2 max-w-md">
                  <ProjectGallery
                    images={gallery}
                    activeSrc={activeImage}
                    onSelect={setPreviewSrc}
                    projectTitle={activeProject.title}
                  />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${activeProject.title}`}
                initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.28 }}
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                  <span className="font-mono text-xs tracking-[0.18em] text-accent">
                    {activeIndexLabel}
                  </span>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span>{t(categoryLabel, locale)}</span>
                  <span aria-hidden>•</span>
                  <span>{t(activeProject.period, locale)}</span>
                </div>

                <h3 className="mt-4 font-display text-display-md text-ink">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-base text-ink-muted sm:text-lg">
                  {t(activeProject.subtitle, locale)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.tech.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={reduced ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.03 }}
                      className="badge"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  {t(activeProject.description, locale)}
                </p>

                {activeProject.keyFeatures &&
                  activeProject.keyFeatures.length > 0 && (
                    <ul className="mt-6 space-y-2.5 text-sm text-ink-muted">
                      {activeProject.keyFeatures.map((feature) => (
                        <li key={feature.en} className="flex gap-2.5">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden
                          />
                          <span>{t(feature, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                <div className="mt-8 flex flex-wrap gap-3">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
