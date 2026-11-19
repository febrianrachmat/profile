import type { MetadataRoute } from "next";
import { projects, projectSlug } from "@/lib/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://profile-seven-swart.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects
      .filter((project) => project.caseStudy)
      .map((project) => ({
        url: `${siteUrl}/projects/${projectSlug(project)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
