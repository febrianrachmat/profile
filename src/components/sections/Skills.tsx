"use client";

import { skillTiers } from "@/lib/content";
import Reveal from "../Reveal";

const tierStyles = [
  "border-accent/30 bg-accent/5",
  "border-white/10 bg-navy/40",
  "border-white/5 bg-navy/20",
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-12 lg:py-24" aria-label="Skills">
      <Reveal>
        <h3 className="section-heading mb-8">Skills & Technologies</h3>
      </Reveal>
      <div className="space-y-5">
        {skillTiers.map((tier, i) => (
          <Reveal key={tier.label} delay={i * 0.05}>
            <div className={`card rounded-xl border p-6 ${tierStyles[i] ?? tierStyles[2]}`}>
              <div className="mb-4">
                <h4 className="font-mono text-sm uppercase tracking-widest text-accent">
                  {tier.label}
                </h4>
                <p className="mt-1 text-sm text-slate">{tier.description}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:text-accent ${
                      i === 0
                        ? "bg-accent/10 font-medium text-slate-lighter"
                        : "bg-navy text-slate-light"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
