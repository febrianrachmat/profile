"use client";

import { about, experiences } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import Reveal from "../Reveal";
import { ExternalLinkIcon } from "../Icons";

export default function About() {
  const { t, lang } = useI18n();

  return (
    <>
      <section id="about" className="scroll-mt-24 py-12 lg:py-24" aria-label="About me">
        <Reveal>
          <h3 className="section-heading mb-8">{t("aboutTitle")}</h3>
        </Reveal>
        <div className="space-y-4 text-base leading-relaxed text-slate">
          {about[lang].map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 py-12 lg:py-16" aria-label="Experience">
        <Reveal>
          <h3 className="section-heading mb-8">{t("experienceTitle")}</h3>
        </Reveal>
        <ol className="space-y-3">
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <li className="row-hover group relative rounded-lg p-4 sm:p-6">
                <div className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <p className="pt-1 font-mono text-xs uppercase tracking-wide text-slate">
                    {exp.period[lang]}
                  </p>
                  <div>
                    <h4 className="font-semibold text-slate-lighter">
                      {exp.role[lang]}
                      <span className="text-accent"> · </span>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-accent"
                      >
                        {exp.company}
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </a>
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {exp.description[lang]}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
