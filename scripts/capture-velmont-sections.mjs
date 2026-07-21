import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "projects");
const base = "https://hotel-green-iota.vercel.app";

const sections = [
  { slug: "velmont", hash: "" },
  { slug: "velmont-suites", hash: "#suites", link: /suites/i },
  { slug: "velmont-gallery", hash: "#gallery", link: /gallery/i },
  { slug: "velmont-dining", hash: "#dining", link: /dining/i },
  { slug: "velmont-experiences", hash: "#experiences", link: /experiences/i },
  { slug: "velmont-about", hash: "#about", link: /about/i },
  { slug: "velmont-book", path: "/book" },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

const saved = [];

for (const section of sections) {
  try {
    if (section.path) {
      await page.goto(`${base}${section.path}`, {
        waitUntil: "networkidle",
        timeout: 90000,
      });
    } else {
      await page.goto(`${base}/${section.hash}`, {
        waitUntil: "networkidle",
        timeout: 90000,
      });
      if (section.link) {
        try {
          await page.getByRole("link", { name: section.link }).first().click({
            timeout: 3000,
          });
        } catch {
          /* hash navigation may already work */
        }
      }
    }
    await page.waitForTimeout(2200);
    const filePath = path.join(outputDir, `${section.slug}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log("saved", section.slug);
    saved.push(`/projects/${section.slug}.png`);
  } catch (error) {
    console.log("fail", section.slug, error.message);
  }
}

await browser.close();
console.log(saved);
