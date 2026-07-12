"use client";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
};

export default function Marquee({
  items,
  reverse = false,
  duration = 35,
  className = "",
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-border py-5 ${className}`}>
      <div
        className={`marquee-track gap-10 sm:gap-14 ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shrink-0 whitespace-nowrap font-display text-2xl text-marquee sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
