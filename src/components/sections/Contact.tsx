"use client";

import { contactCopy, profile, ui } from "@/lib/content";
import { t, useLocale } from "@/lib/i18n";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
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
      className="relative scroll-mt-24 overflow-hidden section-y text-center"
      aria-label={t(ui.contactMe, locale)}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_50%_0%,rgb(var(--color-accent)/0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="section-container relative">
        <Reveal>
          <p className="section-label mb-6">{t(ui.contactMe, locale)}</p>
          <h2 className="section-title mx-auto max-w-3xl">
            {t(contactCopy.heading, locale)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {t(contactCopy.intro, locale)}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Magnetic className="mt-10" strength={0.22}>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary px-8 py-4 text-base shadow-[0_16px_40px_-18px_rgb(var(--color-accent)/0.95)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t(ui.hello, locale)}
            </a>
          </Magnetic>

          <div className="mt-12">
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
                  className="btn btn-secondary group"
                >
                  <Icon className="h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-110" />
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
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              {profile.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
