"use client";

import { getSkillIconUrl } from "@/lib/skillIcons";

export type SkillMarqueeItem = {
  name: string;
};

type SkillMarqueeProps = {
  items: SkillMarqueeItem[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  muted?: boolean;
};

function SkillPill({ name, muted }: { name: string; muted?: boolean }) {
  return (
    <div
      className={`group relative flex shrink-0 items-center gap-3 rounded-full border bg-surface px-4 py-2.5 shadow-sm transition-[transform,border-color,opacity] duration-200 ease-out hover:z-10 hover:scale-105 hover:border-accent/40 ${
        muted
          ? "border-border/70 opacity-70 hover:opacity-100"
          : "border-border"
      }`}
      title={name}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-muted">
        <img
          src={getSkillIconUrl(name)}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
          loading="lazy"
        />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-ink sm:text-base">
        {name}
      </span>
      <span className="skill-tooltip" role="tooltip">
        {name}
      </span>
    </div>
  );
}

export default function SkillMarquee({
  items,
  reverse = false,
  duration = 45,
  className = "",
  muted = false,
}: SkillMarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={`marquee-fade overflow-hidden py-4 ${className}`}>
      <div
        className={`marquee-track items-center gap-4 sm:gap-5 ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((item, index) => (
          <SkillPill
            key={`${item.name}-${index}`}
            name={item.name}
            muted={muted}
          />
        ))}
      </div>
    </div>
  );
}
