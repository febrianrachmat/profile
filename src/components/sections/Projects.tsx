"use client";

import Image from "next/image";
import { projectCategories, projects } from "@/lib/content";
import Reveal from "../Reveal";
import Tilt from "../Tilt";
import Boop from "../Boop";
import { ExternalLinkIcon, FolderIcon, GitHubIcon } from "../Icons";

function ProjectLinks({
  link,
  repo,
  repos,
  apiLink,
}: {
  link?: string;
  repo?: string;
  repos?: { label: string; url: string }[];
  apiLink?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2 text-slate-light">
      {repos?.map((item) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${item.label} code`}
          title={item.label}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <GitHubIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{item.label}</span>
        </a>
      ))}
      {repo && !repos?.length && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          aria-label="View code"
          className="transition-colors hover:text-accent"
        >
          <GitHubIcon className="h-5 w-5" />
        </a>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label="View live demo"
          title="Live demo"
          className="transition-colors hover:text-accent"
        >
          <ExternalLinkIcon className="h-5 w-5" />
        </a>
      )}
      {apiLink && (
        <a
          href={apiLink}
          target="_blank"
          rel="noreferrer"
          aria-label="View API documentation"
          title="API docs"
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          <span className="hidden sm:inline">API</span>
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-12 lg:py-24" aria-label="Projects">
      <Reveal>
        <h3 className="section-heading mb-8">Featured Projects</h3>
      </Reveal>

      <div className="space-y-12">
        {projectCategories.map((category, categoryIndex) => {
          const categoryProjects = projects.filter(
            (project) => project.category === category.id,
          );

          if (categoryProjects.length === 0) return null;

          return (
            <div key={category.id}>
              <Reveal delay={categoryIndex * 0.05}>
                <h4 className="mb-5 font-mono text-sm uppercase tracking-widest text-accent">
                  {category.label}
                </h4>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2">
                {categoryProjects.map((project, i) => (
                  <Reveal key={project.title} delay={i * 0.05} className="h-full">
                    <Tilt className="h-full">
                      <article className="card card-interactive group flex h-full flex-col overflow-hidden rounded-xl hover:-translate-y-1">
                        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-navy/40">
                          <Image
                            src={project.image}
                            alt={`${project.title} project screenshot`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <Boop rotation={-10} scale={1.15} y={-2}>
                            <FolderIcon className="h-9 w-9 shrink-0 text-accent" />
                          </Boop>
                          <ProjectLinks
                            link={project.link}
                            repo={project.repo}
                            repos={project.repos}
                            apiLink={project.apiLink}
                          />
                        </div>
                        <h5 className="text-lg font-semibold text-slate-lighter transition-colors group-hover:text-accent">
                          {project.title}
                        </h5>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                          {project.description}
                        </p>
                        {project.keyFeatures && project.keyFeatures.length > 0 && (
                          <div className="mt-4">
                            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                              Key Features
                            </p>
                            <ul className="space-y-1.5 text-sm leading-relaxed text-slate">
                              {project.keyFeatures.map((feature) => (
                                <li key={feature} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-slate">
                          {project.tech.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
