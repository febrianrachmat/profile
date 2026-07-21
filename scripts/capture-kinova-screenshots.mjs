import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "projects");
const base = "https://kinova-zeta.vercel.app";

const targets = [
  { slug: "kinova", path: "/" },
  { slug: "kinova-services", path: "/services" },
  { slug: "kinova-about", path: "/about" },
  { slug: "kinova-therapists", path: "/therapists" },
  { slug: "kinova-login", path: "/login" },
  { slug: "kinova-booking", path: "/booking" },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});

const page = await context.newPage();

async function dismissBanners() {
  for (const name of [/tutup/i, /close/i]) {
    try {
      await page.getByRole("button", { name }).first().click({ timeout: 1500 });
    } catch {
      /* optional */
    }
  }
}

console.log("Discovering links from home…");
await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2000);
await dismissBanners();

const homeLinks = await page.$$eval("a[href]", (anchors) =>
  [
    ...new Set(
      anchors
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && h.startsWith("/") && !h.startsWith("//")),
    ),
  ].slice(0, 50),
);
console.log("Home links:", homeLinks.join(", ") || "(none)");

const extra = homeLinks
  .filter((href) => !targets.some((t) => t.path === href))
  .slice(0, 6)
  .map((href) => ({
    slug: `kinova-${href.replace(/^\//, "").replace(/\//g, "-") || "home"}`,
    path: href,
  }));

const allTargets = [...targets, ...extra];
const saved = [];

for (const target of allTargets) {
  const url = `${base}${target.path}`;
  console.log(`Capturing ${target.slug} ← ${url}`);

  try {
    const res = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 90000,
    });
    const status = res?.status() ?? 0;
    if (status >= 400) {
      console.log(`  skip (${status})`);
      continue;
    }

    await page.waitForTimeout(2200);
    await dismissBanners();
    await page.waitForTimeout(400);

    const filePath = path.join(outputDir, `${target.slug}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`  saved ${filePath}`);
    saved.push({ slug: target.slug, path: target.path, file: `/projects/${target.slug}.png` });
  } catch (error) {
    console.error(`  failed: ${error.message}`);
  }
}

await browser.close();
console.log("\nSaved screenshots:");
for (const item of saved) {
  console.log(`- ${item.file} (${item.path})`);
}
console.log("Done.");
