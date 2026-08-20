"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** A thin accent bar across the top of the page that fills with scroll. */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-accent"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      aria-hidden
    />
  );
}
