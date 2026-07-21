"use client";

import { contactCopy, profile, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import Boop from "../Boop";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "../Icons";

const socialLinks = [
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: profile.socials.github,
    icon: GitHubIcon,
  },
  {
    label: "Instagram",
    href: profile.socials.instagram,
    icon: InstagramIcon,
  },
] as const;

export default function Contact() {
  const { locale } = useLocale();
  const waMessage = encodeURIComponent(t(ui.waMessage, locale));
  const waLink = `https://wa.me/${profile.whatsapp}?text=${waMessage}`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-16 text-center sm:py-20 lg:py-28"
      aria-label={t(ui.contactMe, locale)}
    >
      <div className="section-container">
        <Reveal>
          <h2 className="section-title justify-center">
            {t(contactCopy.heading, locale)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {t(contactCopy.intro, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Magnetic className="mt-10">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-mono text-sm font-semibold text-bg shadow-lg shadow-accent/20 transition-colors hover:bg-accent-dark"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t(ui.hello, locale)}
            </a>
          </Magnetic>

          <div className="mt-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
              {t(ui.findMeOnline, locale)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <Boop rotation={-10} scale={1.15}>
                    <Icon className="h-5 w-5" />
                  </Boop>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-muted">
            <MailIcon className="h-4 w-4" />
            <span>{t(ui.orEmailMe, locale)}</span>
            <a
              href={`mailto:${profile.email}`}
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {profile.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
