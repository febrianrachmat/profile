"use client";

import { useEffect, useState } from "react";

export default function Spotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) {
      setEnabled(false);
      return;
    }
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="spotlight"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(100, 255, 218, 0.06), transparent 40%)`,
      }}
      aria-hidden
    />
  );
}
