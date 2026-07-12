"use client";

import Image from "next/image";
import { profile } from "@/lib/content";
import Reveal from "../Reveal";

export default function Hero() {
  return (
    <section className="border-b border-border" aria-label="Introduction">
      <div className="section-container py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <Reveal>
            <p className="section-label mb-6">profile</p>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              {profile.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {profile.tagline}
            </p>
            <p className="mt-4 font-mono text-sm text-ink-soft">
              {profile.role} · {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="justify-self-center lg:justify-self-end">
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-border bg-bg-muted shadow-sm sm:h-56 sm:w-56">
              <Image
                src={profile.avatarUrl}
                alt={`Professional headshot of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 640px) 192px, 224px"
                className="object-cover object-[center_15%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
