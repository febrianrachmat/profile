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
  Neon: "neon",
  Sentry: "sentry",
};

const skillIconUrls: Record<string, string> = {
  OpsCtrl: "/skills/opsctrl.png",
};

export function getSkillIconSlug(name: string) {
  return skillIconSlugs[name] ?? "github";
}

export function getSkillIconUrl(name: string) {
  if (skillIconUrls[name]) return skillIconUrls[name];
  const slug = getSkillIconSlug(name);
  return `https://cdn.simpleicons.org/${slug}`;
}
