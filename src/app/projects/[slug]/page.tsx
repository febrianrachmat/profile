import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { profile, projects, projectSlug } from "@/lib/content";
import CaseStudyView from "@/components/CaseStudyView";

type Params = Promise<{ slug: string }>;

function findProject(slug: string) {
  return projects.find(
    (project) => project.caseStudy && projectSlug(project) === slug,
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.caseStudy)
    .map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  const title = `${project.title} case study · ${profile.name}`;
  const description = `${project.subtitle.en}. ${project.description.en}`;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!findProject(slug)) notFound();
  return <CaseStudyView slug={slug} />;
}
