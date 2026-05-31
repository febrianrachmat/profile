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
        navy: {
          DEFAULT: "#0a192f",
          light: "#112240",
          lighter: "#233554",
        },
        slate: {
          DEFAULT: "#8892b0",
          light: "#a8b2d1",
          lighter: "#ccd6f6",
        },
        accent: {
          DEFAULT: "#64ffda",
          dark: "#0f9b8e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
