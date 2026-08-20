export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.15,
  base: 0.2,
  slow: 0.25,
  reveal: 0.55,
} as const;

export const revealY = 20;

export const revealTransition = (delay = 0) => ({
  duration: duration.reveal,
  ease: easeOut,
  delay,
});

export const revealHidden = { opacity: 0, y: revealY };
export const revealVisible = { opacity: 1, y: 0 };

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem = {
  hidden: revealHidden,
  visible: {
    ...revealVisible,
    transition: revealTransition(),
  },
};
