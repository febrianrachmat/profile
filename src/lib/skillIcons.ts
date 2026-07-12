const skillIconSlugs: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  NestJS: "nestjs",
  PostgreSQL: "postgresql",
  Prisma: "prisma",
  TypeScript: "typescript",
  "Vue.js": "vuedotjs",
  GraphQL: "graphql",
  MongoDB: "mongodb",
  Docker: "docker",
  Python: "python",
  "Framer Motion": "framer",
};

export function getSkillIconSlug(name: string) {
  return skillIconSlugs[name] ?? "github";
}

export function getSkillIconUrl(name: string) {
  const slug = getSkillIconSlug(name);
  return `https://cdn.simpleicons.org/${slug}`;
}
