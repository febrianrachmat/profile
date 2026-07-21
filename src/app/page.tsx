"use client";

import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import { profile, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";

export default function Home() {
  const { locale } = useLocale();

  return (
    <>
      <Loader />
      <ScrollProgress />
      <Spotlight />
      <a
        href="#main-content"
        className="sr-only z-[110] rounded-md bg-ink px-4 py-2 font-mono text-sm font-semibold text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {t(ui.skipToContent, locale)}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
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
