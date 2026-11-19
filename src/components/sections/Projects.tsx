"use client";

import Image from "next/image";
import Link from "next/link";
import {
  projectCategories,
  projects,
  projectSlug,
  ui,
  type Project,
} from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";
import ProjectNotice from "../ProjectNotice";
import { ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from "../Icons";

const caseStudyProjects = projects.filter((project) => project.caseStudy);
const otherProjects = projects.filter((project) => !project.caseStudy);

function CaseStudyCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const card = project.caseStudy!.card;

  return (
    <Link
      href={`/projects/${projectSlug(project)}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-accent/50 focus-visible:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-muted">
        <Image
          src={card.image ?? project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
          {t(card.kicker, locale)}
        </p>
        <h3 className="font-display text-4xl leading-none text-ink">
          {project.title}
        </h3>
        <p className="text-base leading-relaxed text-ink-muted">
          {t(card.summary, locale)}
        </p>
        <p className="text-sm text-ink-soft">{t(card.proof, locale)}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold text-ink">
          {t(ui.readCaseStudy, locale)}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { locale } = useLocale();
  const category = projectCategories.find((c) => c.id === project.category);
  const repos =
    project.repos ??
    (project.repo ? [{ label: ui.code, url: project.repo }] : []);

  return (
    <li className="border-b border-border py-5">
      <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-5 gap-y-3 sm:grid-cols-[96px_minmax(0,1fr)_auto]">
        <div className="relative h-12 w-[72px] overflow-hidden rounded-lg bg-bg-muted sm:h-[60px] sm:w-24">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-ink">
            {project.title}
            <span className="font-normal text-ink-soft">
              {" "}
              · {t(project.subtitle, locale)}
            </span>
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">
            {category ? t(category.label, locale) : project.category} ·{" "}
            {project.tech.slice(0, 3).join(", ")}
          </p>
        </div>
        <p className="col-span-2 -my-2 flex flex-wrap gap-x-6 text-[0.95rem] sm:col-span-1 sm:my-0 sm:gap-x-5">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-ink transition-colors hover:text-accent sm:min-h-0"
            >
              {t(ui.demo, locale)}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {repos.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-ink transition-colors hover:text-accent sm:min-h-0"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              {t(repo.label, locale)}
            </a>
          ))}
          {project.apiLink && (
            <a
              href={project.apiLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-ink transition-colors hover:text-accent sm:min-h-0"
            >
              {t(ui.apiDocs, locale)}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </p>
      </div>
      {project.notice && (
        <ProjectNotice notice={project.notice} className="mt-4 sm:ml-[116px]" />
      )}
    </li>
  );
}

export default function Projects() {
  const { locale } = useLocale();

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-border section-y"
      aria-labelledby="projects-title"
    >
      <div className="section-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-label mb-4">{t(ui.selectedWork, locale)}</p>
              <h2
                id="projects-title"
                className="font-display text-[clamp(2.75rem,6vw,4rem)] leading-none tracking-[-0.02em] text-ink"
              >
                {t(ui.caseStudies, locale)}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-ink-muted">
              {t(ui.caseStudiesIntro, locale)}
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {caseStudyProjects.map((project, i) => (
            <li key={project.title}>
              <Reveal delay={0.06 * i} className="h-full">
                <CaseStudyCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <h3 className="section-label mb-2 mt-20">{t(ui.moreProjects, locale)}</h3>
          <ul className="border-t border-border">
            {otherProjects.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
