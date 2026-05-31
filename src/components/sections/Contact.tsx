"use client";

import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { MailIcon, WhatsAppIcon } from "../Icons";

export default function Contact() {
  const { t } = useI18n();

  const waMessage = encodeURIComponent(
    `Halo ${profile.name}, saya tertarik untuk terhubung dengan Anda.`
  );
  const waLink = `https://wa.me/${profile.whatsapp}?text=${waMessage}`;

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
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-4 font-mono text-sm font-semibold text-[#0a192f] shadow-lg shadow-accent/20 transition-colors hover:bg-accent-dark hover:text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t("contactWhatsapp")}
          </a>
        </Magnetic>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate">
          <MailIcon className="h-4 w-4" />
          <span>{t("contactOrEmail")}</span>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline font-medium text-accent"
          >
            {profile.email}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
