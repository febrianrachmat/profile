import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LocaleProvider } from "@/lib/i18n";
import { profile } from "@/lib/content";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://profile-seven-swart.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} · Full Stack Software Engineer`,
  description: profile.tagline.en,
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "NestJS",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${profile.name} · Full Stack Software Engineer`,
    description: profile.tagline.en,
    url: "/",
    siteName: profile.name,
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · Full Stack Software Engineer`,
    description: profile.tagline.en,
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const localeInitScript = `(function(){try{var l=localStorage.getItem('locale');if(l!=='en'&&l!=='id'){l='en';}document.documentElement.lang=l;}catch(e){document.documentElement.lang='en';}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full Stack Software Engineer",
  email: profile.email,
  url: siteUrl,
  image: `${siteUrl}${profile.avatarUrl}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surabaya",
    addressCountry: "ID",
  },
  sameAs: [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.instagram,
  ].filter(Boolean),
  knowsAbout: [
    "Next.js",
    "React",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${outfit.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
