"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export default function Spotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  // Off on the server and on touch or reduced-motion devices.
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="spotlight"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgb(var(--spotlight) / 0.06), transparent 40%)`,
      }}
      aria-hidden
    />
  );
}
