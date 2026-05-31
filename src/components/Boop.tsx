"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type BoopProps = {
  children: ReactNode;
  rotation?: number;
  scale?: number;
  x?: number;
  y?: number;
  timing?: number;
  className?: string;
};

/**
 * A "boop" micro-interaction (à la Josh W. Comeau): the element springs into a
 * transform on hover and settles back even while still hovered.
 */
export default function Boop({
  children,
  rotation = 0,
  scale = 1,
  x = 0,
  y = 0,
  timing = 200,
  className,
}: BoopProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setActive(false), timing);
    return () => window.clearTimeout(id);
  }, [active, timing]);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      style={{ display: "inline-flex" }}
      onMouseEnter={() => setActive(true)}
      animate={
        active
          ? { rotate: rotation, scale, x, y }
          : { rotate: 0, scale: 1, x: 0, y: 0 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {children}
    </motion.span>
  );
}
