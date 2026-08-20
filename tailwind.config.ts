import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          muted: "rgb(var(--color-bg-muted) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          dark: "rgb(var(--color-accent-dark) / <alpha-value>)",
        },
        marquee: "rgb(var(--color-marquee) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        display: [
          "clamp(3.25rem, 8vw, 5.75rem)",
          { lineHeight: "0.98", letterSpacing: "-0.035em" },
        ],
        "display-md": [
          "clamp(2rem, 4.2vw, 3.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        "display-sm": [
          "clamp(1.5rem, 2.6vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        section: "7rem",
      },
      borderRadius: {
        card: "1.25rem",
        "4xl": "2rem",
      },
      transitionDuration: {
        250: "250ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
