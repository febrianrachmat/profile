import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "projects");

const targets = [
  { slug: "flowpilot", url: "https://flowpilot-drab.vercel.app/" },
  {
    slug: "flowpilot-boards",
    url: "https://flowpilot-drab.vercel.app/",
    scrollTo: "Boards that stay in sync",
  },
  {
    slug: "flowpilot-cta",
    url: "https://flowpilot-drab.vercel.app/",
    scrollTo: "Ready when your team is",
  },
  { slug: "flowpilot-login", url: "https://flowpilot-drab.vercel.app/login" },
  {
    slug: "flowpilot-register",
    url: "https://flowpilot-drab.vercel.app/register",
  },
  { slug: "kinova", url: "https://kinova-zeta.vercel.app/" },
  {
    slug: "veldt",
    url: "https://e-commerce-eight-vert-tzera30n9h.vercel.app/en",
  },
  { slug: "velmont", url: "https://hotel-green-iota.vercel.app/" },
  {
    slug: "revobank",
    url: "https://revobank-backend-production.up.railway.app/api",
  },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});

for (const target of targets) {
  const page = await context.newPage();
  console.log(`Capturing ${target.slug} from ${target.url}`);

  try {
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(2500);

    if (target.scrollTo) {
      const locator = page.getByText(target.scrollTo).first();
      if ((await locator.count()) > 0) {
        await locator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);
      }
    }

    const filePath = path.join(outputDir, `${target.slug}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Saved ${filePath}`);
  } catch (error) {
    console.error(`Failed ${target.slug}:`, error.message);
    process.exitCode = 1;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("Done.");
