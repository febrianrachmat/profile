"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/content";
import Reveal from "../Reveal";
import { ExternalLinkIcon, GitHubIcon } from "../Icons";

type FilterId = "all" | ProjectCategory;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "Show All" },
  ...projectCategories.map((category) => ({
    id: category.id,
    label: category.label,
  })),
];

function ProjectLinks({ project }: { project: Project }) {
  const primaryLink = project.link ?? project.repo ?? project.repos?.[0]?.url ?? project.apiLink;

  if (!primaryLink) return null;

  const isExternal = Boolean(project.link || project.apiLink);

  return (
    <a
      href={primaryLink}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:border-accent"
    >
      View Project
      {isExternal ? (
        <ExternalLinkIcon className="h-4 w-4" />
      ) : (
        <GitHubIcon className="h-4 w-4" />
      )}
    </a>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0];

  if (!activeProject) return null;

  const categoryLabel =
    projectCategories.find((category) => category.id === activeProject.category)?.label ??
    activeProject.category;

  return (
    <section id="projects" className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24" aria-label="Projects">
      <div className="section-container">
        <Reveal>
          <h2 className="section-title">Curated Projects</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`filter-pill ${
                  filter === item.id ? "filter-pill-active" : "filter-pill-inactive"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal delay={0.1}>
            <div className="relative mx-auto h-[320px] w-full max-w-md sm:h-[380px]">
              {filteredProjects.map((project, index) => {
                const offset =
                  (index - activeIndex + filteredProjects.length) %
                  filteredProjects.length;

                if (offset > 2) return null;

                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View ${project.title}`}
                    className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
                    style={{
                      zIndex: 10 - offset,
                      transform: `translateY(${offset * 18}px) scale(${1 - offset * 0.04})`,
                      opacity: offset === 0 ? 1 : 0.92 - offset * 0.12,
                    }}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                      <div className="relative aspect-[16/10] bg-bg-muted">
                        <Image
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-center text-sm text-ink-soft">
              * Click on stacked cards above to see other projects
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                  <span>{categoryLabel}</span>
                  <span aria-hidden>•</span>
                  <span>{activeProject.period}</span>
                </div>

                <h3 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-base text-ink-muted">{activeProject.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  {activeProject.description}
                </p>

                {activeProject.keyFeatures && activeProject.keyFeatures.length > 0 && (
                  <ul className="mt-6 space-y-2 text-sm text-ink-muted">
                    {activeProject.keyFeatures.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{feature}</span>
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
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      {repo.label}
                    </a>
                  ))}
                  {activeProject.repo && !activeProject.repos?.length && (
                    <a
                      href={activeProject.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {activeProject.apiLink && (
                    <a
                      href={activeProject.apiLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      API Docs
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
