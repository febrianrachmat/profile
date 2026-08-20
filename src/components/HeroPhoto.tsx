"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { profile } from "@/lib/content";

/** Profile photo with scroll parallax + mouse tilt. */
export default function HeroPhoto() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.03]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spring = { stiffness: 180, damping: 22, mass: 0.4 };
  const springX = useSpring(rotateX, spring);
  const springY = useSpring(rotateY, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 52%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 8);
    rotateY.set((px - 0.5) * 10);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        y,
        rotateX: reduced ? 0 : springX,
        rotateY: reduced ? 0 : springY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="relative z-10 h-52 w-52 sm:h-60 sm:w-60 lg:h-64 lg:w-64"
    >
      <div
        className="absolute -inset-4 rounded-[1.6rem] bg-accent/20 blur-2xl"
        aria-hidden
      />
      <div className="absolute -inset-px rounded-card bg-gradient-to-br from-accent/45 via-border to-transparent opacity-80" aria-hidden />
      <div className="relative h-full w-full overflow-hidden rounded-card border border-border bg-bg-muted shadow-[0_24px_56px_-28px_rgb(var(--color-ink)/0.55)]">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src={profile.avatarUrl}
            alt={`Professional headshot of ${profile.name}`}
            fill
            priority
            sizes="(max-width: 640px) 208px, 256px"
            className="object-cover object-[center_15%]"
          />
        </motion.div>
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glareBg, mixBlendMode: "soft-light" }}
          />
        )}
      </div>
    </motion.div>
  );
}
