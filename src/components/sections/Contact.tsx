"use client";

import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { MailIcon } from "../Icons";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-12 text-center lg:py-32"
      aria-label="Contact"
    >
      <Reveal>
        <h3 className="text-3xl font-bold text-slate-lighter sm:text-4xl">
          {t("contactTitle")}
        </h3>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-slate">
          {t("contactBody")}
        </p>
        <Magnetic className="mt-8">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-accent px-7 py-4 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
          >
            <MailIcon className="h-4 w-4" />
            {t("contactButton")}
          </a>
        </Magnetic>
      </Reveal>
    </section>
  );
}
