"use client";

import { about } from "@/lib/content";
import Reveal from "../Reveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-12 lg:py-24" aria-label="About me">
      <Reveal>
        <h3 className="section-heading mb-8">About Me</h3>
      </Reveal>
      <div className="space-y-4 text-base leading-relaxed text-slate">
        {about.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
