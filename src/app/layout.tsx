import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role.en}`,
  description: profile.tagline.en,
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} · ${profile.role.en}`,
    description: profile.tagline.en,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
