import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "projects");

const sites = [
  {
    slug: "veldt",
    base: "https://e-commerce-eight-vert-tzera30n9h.vercel.app",
    home: "/en",
    prefer: [
      "/en",
      "/en/shop",
      "/en/cart",
      "/en/checkout",
      "/en/about",
      "/en/product",
      "/id",
      "/id/shop",
    ],
  },
  {
    slug: "velmont",
    base: "https://hotel-green-iota.vercel.app",
    home: "/",
    prefer: [
      "/",
      "/rooms",
      "/booking",
      "/gallery",
      "/about",
      "/contact",
      "/en",
      "/id",
    ],
  },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

async function dismissOverlays() {
  for (const name of [/close/i, /tutup/i, /accept/i, /got it/i, /dismiss/i]) {
    try {
      await page.getByRole("button", { name }).first().click({ timeout: 1000 });
    } catch {
      /* optional */
    }
  }
}

async function capture(slug, url) {
  console.log(`Capturing ${slug} ← ${url}`);
  const res = await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  const status = res?.status() ?? 0;
  if (status >= 400) {
    console.log(`  skip (${status})`);
    return false;
  }
  await page.waitForTimeout(2200);
  await dismissOverlays();
  await page.waitForTimeout(400);
  const filePath = path.join(outputDir, `${slug}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`  saved ${filePath}`);
  return true;
}

const saved = {};

for (const site of sites) {
  saved[site.slug] = [];
  const homeUrl = `${site.base}${site.home}`;
  await page.goto(homeUrl, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  await dismissOverlays();

  const links = await page.$$eval("a[href]", (anchors) =>
    [
      ...new Set(
        anchors
          .map((a) => a.getAttribute("href"))
          .filter(
            (h) =>
              h &&
              (h.startsWith("/") || h.includes("vercel.app")) &&
              !h.startsWith("//") &&
              !h.includes("#") &&
              !h.startsWith("mailto:") &&
              !h.startsWith("tel:"),
          )
          .map((h) => {
            try {
              if (h.startsWith("http")) {
                const u = new URL(h);
                return u.pathname + u.search;
              }
              return h.split("?")[0];
            } catch {
              return null;
            }
          })
          .filter(Boolean),
      ),
    ].slice(0, 40),
  );

  console.log(`\n${site.slug} links:`, links.join(", ") || "(none)");

  const candidates = [
    ...new Set([
      site.home,
      ...site.prefer,
      ...links.filter((href) => {
        const depth = href.split("/").filter(Boolean).length;
        return depth <= 3 && !/login|register|auth|admin|api/i.test(href);
      }),
    ]),
  ].slice(0, 12);

  let count = 0;
  for (const route of candidates) {
    if (count >= 8) break;
    const slug =
      route === site.home || route === "/"
        ? site.slug
        : `${site.slug}-${route
            .replace(/^\//, "")
            .replace(/\//g, "-")
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase() || "page"}`;

    const ok = await capture(slug, `${site.base}${route}`);
    if (ok) {
      saved[site.slug].push(`/projects/${slug}.png`);
      count += 1;
    }
  }
}

await browser.close();
console.log("\nSaved:");
for (const [slug, files] of Object.entries(saved)) {
  console.log(slug, files);
}
console.log("Done.");
