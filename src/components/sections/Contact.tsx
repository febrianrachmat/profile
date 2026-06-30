"use client";

import { profile } from "@/lib/content";
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
  const waMessage = encodeURIComponent(
    `Hi ${profile.name}, I'd like to connect with you.`
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
          Get In Touch
        </h3>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-slate">
          I&apos;m open to new opportunities, collaborations, or a friendly hello.
          Reach out via WhatsApp, email, or connect with me on social media.
        </p>
        <Magnetic className="mt-8">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-4 font-mono text-sm font-semibold text-[#0a192f] shadow-lg shadow-accent/20 transition-colors hover:bg-accent-dark hover:text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Hello !
          </a>
        </Magnetic>
        <div className="mt-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate">
            Find me online
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-sm text-slate-light transition-colors hover:border-accent hover:text-accent"
              >
                <Boop rotation={-10} scale={1.15}>
                  <Icon className="h-5 w-5" />
                </Boop>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-slate">
          <MailIcon className="h-4 w-4" />
          <span>or email me at</span>
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
