"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

/** Perspective tilt toward the cursor — springs back on leave. */
export default function Tilt({
  children,
  className,
  max = 10,
  glare = true,
}: TiltProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const spring = { stiffness: 220, damping: 20, mass: 0.4 };
  const springX = useSpring(rotateX, spring);
  const springY = useSpring(rotateY, spring);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 55%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * max * 2);
    rotateY.set((px - 0.5) * max * 2);
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
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="relative">
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg, mixBlendMode: "soft-light" }}
          />
        )}
      </div>
    </motion.div>
  );
}
