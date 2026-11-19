"use client";

import Link from "next/link";
import {
  projects,
  projectSlug,
  timeline,
  ui,
  type TimelineItem,
} from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";
import { ArrowRightIcon } from "../Icons";

const typeLabels = {
  education: { en: "Education", id: "Pendidikan" },
  work: { en: "Project", id: "Proyek" },
  internship: { en: "Internship", id: "Magang" },
  certification: { en: "Certification", id: "Sertifikasi" },
} as const;

function isCurrent(item: TimelineItem) {
  return (
    item.period.en.toLowerCase().includes("present") ||
    item.period.id.toLowerCase().includes("sekarang")
  );
}

// A timeline entry links to the case study whose slug matches its id.
function caseStudySlug(item: TimelineItem) {
  const project = projects.find(
    (p) => p.caseStudy && projectSlug(p) === item.id,
  );
  return project ? projectSlug(project) : null;
}

export default function Experience() {
  const { locale } = useLocale();

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-border section-y"
      aria-labelledby="experience-title"
    >
      <div className="section-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-label mb-4">journey</p>
              <h2
                id="experience-title"
                className="font-display text-[clamp(2.75rem,6vw,4rem)] italic leading-none tracking-[-0.02em] text-ink"
              >
                {t(ui.experienceTitle, locale)}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-ink-muted">
              {t(ui.experienceIntro, locale)}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <ol className="mt-12 border-t border-border">
            {timeline.map((item) => {
              const current = isCurrent(item);
              const slug = caseStudySlug(item);
              return (
                <li
                  key={item.id}
                  className="grid gap-x-8 gap-y-2 border-b border-border py-6 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-baseline"
                >
                  <p className="font-mono text-[13px] text-ink-soft">
                    <span className={current ? "text-accent" : undefined}>
                      {t(item.period, locale)}
                    </span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.16em]">
                      {t(typeLabels[item.type], locale)}
                      {current ? ` · ${t(ui.experienceNow, locale)}` : ""}
                    </span>
                  </p>
                  <div className="min-w-0">
                    <h3 className="font-medium text-ink">
                      {t(item.title, locale)}
                      <span className="font-normal text-accent">
                        {" "}
                        · {t(item.organization, locale)}
                      </span>
                    </h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">
                      {t(item.summary, locale)}
                    </p>
                  </div>
                  {slug ? (
                    <Link
                      href={`/projects/${slug}`}
                      className="group inline-flex items-center gap-1.5 text-[0.95rem] text-ink transition-colors hover:text-accent"
                    >
                      {t(ui.caseStudy, locale)}
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <span aria-hidden className="hidden sm:block" />
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
