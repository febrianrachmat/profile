"use client";

import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { profile } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[110] rounded-md bg-ink px-4 py-2 font-mono text-sm font-semibold text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <footer className="border-t border-border py-8">
          <div className="section-container text-center font-mono text-xs text-ink-soft">
            <p>
              © {new Date().getFullYear()} {profile.name}.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
