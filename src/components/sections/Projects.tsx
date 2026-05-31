"use client";

import { projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import Reveal from "../Reveal";
import Tilt from "../Tilt";
import Boop from "../Boop";
import { ExternalLinkIcon, FolderIcon, GitHubIcon } from "../Icons";

export default function Projects() {
  const { t, lang } = useI18n();

  return (
    <section id="projects" className="scroll-mt-24 py-12 lg:py-24" aria-label="Projects">
      <Reveal>
        <h3 className="section-heading mb-8">{t("projectsTitle")}</h3>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.05} className="h-full">
            <Tilt className="h-full">
            <article className="card card-interactive group flex h-full flex-col rounded-xl p-6 hover:-translate-y-1">
              <div className="mb-4 flex items-center justify-between">
                <Boop rotation={-10} scale={1.15} y={-2}>
                  <FolderIcon className="h-9 w-9 text-accent" />
                </Boop>
                <div className="flex items-center gap-3 text-slate-light">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("viewCode")}
                      className="transition-colors hover:text-accent"
                    >
                      <GitHubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("viewProject")}
                      className="transition-colors hover:text-accent"
                    >
                      <ExternalLinkIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-slate-lighter transition-colors group-hover:text-accent">
                {project.title}
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                {project.description[lang]}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-slate">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
