"use client";

import { about, aboutHeadline } from "@/lib/content";
import Reveal from "../Reveal";

function AboutHeadline() {
  return (
    <div className="space-y-1 sm:space-y-2">
      {aboutHeadline.map((line) => {
        if (line.style === "italic") {
          return (
            <p
              key={line.text}
              className="text-3xl font-semibold italic text-ink-soft sm:text-4xl lg:text-5xl lg:leading-tight"
            >
              {line.text}
            </p>
          );
        }

        if (line.style === "pill") {
          return (
            <p key={line.text} className="pt-1">
              <span className="inline-block rounded-full bg-bg-muted px-4 py-1 text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
                {line.text}
              </span>
            </p>
          );
        }

        return (
          <p
            key={line.text}
            className="text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl lg:leading-tight"
          >
            {line.text}
          </p>
        );
      })}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-border" aria-label="About me">
      <div className="section-container grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-28">
        <Reveal>
          <AboutHeadline />
        </Reveal>

        <div className="space-y-6 text-base leading-relaxed text-ink-muted sm:text-lg">
          {about.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p>
                {paragraph.map((segment, segmentIndex) =>
                  segment.bold ? (
                    <strong key={segmentIndex} className="font-semibold text-ink">
                      {segment.text}
                    </strong>
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  ),
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
