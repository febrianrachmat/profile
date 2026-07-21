"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useAnimationFrame,
} from "framer-motion";
import { profile } from "@/lib/content";

/**
 * Lightweight CSS/Framer 3D mark — no Three.js.
 * Idle float + mouse-driven perspective rotation.
 */
export default function HeroMark3D() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(12);
  const rotateY = useMotionValue(-18);
  const floatY = useMotionValue(0);

  const spring = { stiffness: 120, damping: 16, mass: 0.5 };
  const springX = useSpring(rotateX, spring);
  const springY = useSpring(rotateY, spring);
  const springFloat = useSpring(floatY, { stiffness: 40, damping: 12 });

  useAnimationFrame((t) => {
    if (reduced) return;
    floatY.set(Math.sin(t / 900) * 6);
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set(8 + (0.5 - py) * 22);
    rotateY.set(-12 + (px - 0.5) * 28);
  };

  const handleLeave = () => {
    rotateX.set(12);
    rotateY.set(-18);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="pointer-events-auto absolute -left-6 -top-8 z-20 sm:-left-10 sm:-top-10"
      aria-hidden
    >
      <motion.div
        style={{
          y: reduced ? 0 : springFloat,
          rotateX: reduced ? 10 : springX,
          rotateY: reduced ? -14 : springY,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Back plate */}
        <div
          className="absolute inset-0 rounded-2xl bg-accent/25 blur-md"
          style={{ transform: "translateZ(-18px) scale(1.05)" }}
        />

        {/* Main 3D card */}
        <div
          className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_18px_40px_-18px_rgb(var(--color-accent)/0.55)] sm:h-24 sm:w-24"
          style={{ transform: "translateZ(24px)" }}
        >
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "linear-gradient(145deg, rgb(var(--color-accent) / 0.18), transparent 55%, rgb(var(--color-accent) / 0.08))",
            }}
          />
          <Image
            src={profile.logoUrl}
            alt=""
            width={96}
            height={64}
            className="relative z-10 h-10 w-auto sm:h-12"
            priority
          />
          {/* Edge highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              boxShadow:
                "inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -1px 0 rgb(0 0 0 / 0.06)",
            }}
          />
        </div>

        {/* Floating accent chip */}
        <div
          className="absolute -bottom-2 -right-2 h-7 w-7 rounded-lg border border-accent/30 bg-accent shadow-md sm:h-8 sm:w-8"
          style={{ transform: "translateZ(42px) rotateZ(12deg)" }}
        />
      </motion.div>
    </div>
  );
}
