"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/content";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setDone(true);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(100);
      setDone(true);
      sessionStorage.setItem("introSeen", "1");
      return;
    }
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("introSeen", "1");
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo-rf.png"
              alt={`${profile.name} logo`}
              width={1024}
              height={682}
              priority
              className="h-40 w-auto drop-shadow-2xl sm:h-45"
            />
          </motion.div>
          <div className="mt-8 h-px w-48 overflow-hidden bg-navy-lighter">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${count}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-sm text-slate">{count}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
