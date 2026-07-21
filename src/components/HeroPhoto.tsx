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

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [28, -28]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.35 };
  const springX = useSpring(rotateX, spring);
  const springY = useSpring(rotateY, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.35), transparent 50%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 12);
    rotateY.set((px - 0.5) * 14);
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
      className="relative h-48 w-48 sm:h-56 sm:w-56"
    >
      <div className="absolute -inset-3 rounded-[1.35rem] bg-accent/10 blur-2xl" aria-hidden />
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-bg-muted shadow-[0_20px_50px_-28px_rgb(var(--color-ink)/0.45)]">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src={profile.avatarUrl}
            alt={`Professional headshot of ${profile.name}`}
            fill
            priority
            sizes="(max-width: 640px) 192px, 224px"
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
