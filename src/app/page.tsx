"use client";

import Loader from "@/components/Loader";
import Spotlight from "@/components/Spotlight";
import ScrollProgress from "@/components/ScrollProgress";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
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
        className="sr-only z-[110] rounded-md bg-accent px-4 py-2 font-mono text-sm font-semibold text-[#0a192f] focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Loader />
      <ScrollProgress />
      <Spotlight />
      <main
        id="main-content"
        className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 sm:px-10 lg:flex lg:gap-12 lg:px-16"
      >
        <Sidebar />
        <div className="pb-24 lg:w-[55%] lg:py-24">
          <About />
          <Projects />
          <Skills />
          <Contact />
          <footer className="pb-12 pt-4 text-center font-mono text-xs text-slate">
            <p>
              © {new Date().getFullYear()} {profile.name}.
            </p>
          </footer>
        </div>
      </main>
      <MobileNav />
    </>
  );
}
