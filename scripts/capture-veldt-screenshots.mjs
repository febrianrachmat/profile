import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "projects");
const base = "https://e-commerce-eight-vert-tzera30n9h.vercel.app";

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
  await page.waitForTimeout(2500);
  await dismissOverlays();
  await page.waitForTimeout(500);
  const filePath = path.join(outputDir, `${slug}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`  saved ${filePath}`);
  return true;
}

await capture("veldt", `${base}/en`);

await page.goto(`${base}/en`, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(1500);

const links = await page.$$eval("a[href]", (anchors) =>
  [
    ...new Set(
      anchors
        .map((a) => a.getAttribute("href"))
        .filter(Boolean)
        .map((h) => {
          try {
            if (h.startsWith("http")) {
              const u = new URL(h);
              if (!u.hostname.includes("vercel.app")) return null;
              return u.pathname;
            }
            if (h.startsWith("/") && !h.startsWith("//")) return h.split("?")[0];
            return null;
          } catch {
            return null;
          }
        })
        .filter(Boolean),
    ),
  ],
);

console.log("Home links:", links.join(", ") || "(none)");

const shopPath =
  links.find((href) => /\/en\/products\/?$/.test(href)) ??
  links.find((href) => /\/en\/shop\/?$/.test(href)) ??
  links.find((href) => /products?|shop/i.test(href) && href.split("/").filter(Boolean).length <= 2) ??
  "/en/products";

await capture("veldt-shop", `${base}${shopPath}`);

await page.goto(`${base}${shopPath}`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await page.waitForTimeout(1500);

const productLinks = await page.$$eval("a[href]", (anchors) =>
  [
    ...new Set(
      anchors
        .map((a) => a.getAttribute("href"))
        .filter(Boolean)
        .map((h) => {
          try {
            if (h.startsWith("http")) {
              const u = new URL(h);
              return u.pathname;
            }
            if (h.startsWith("/")) return h.split("?")[0];
            return null;
          } catch {
            return null;
          }
        })
        .filter(
          (h) =>
            h &&
            /\/products?\/[^/]+/i.test(h),
        ),
    ),
  ],
);

console.log("Product links:", productLinks.slice(0, 8).join(", ") || "(none)");

const productA = productLinks[0];
const productB = productLinks[1] ?? productLinks[0];

if (productA) {
  await capture("veldt-product", `${base}${productA}`);
} else {
  await capture("veldt-product", `${base}/en/products`);
}

if (productB && productB !== productA) {
  await capture("veldt-product-alt", `${base}${productB}`);
} else if (productA) {
  await page.goto(`${base}${productA}`, {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.waitForTimeout(1200);
  const thumbs = page.locator("button, img, [role='button']").filter({
    has: page.locator("img"),
  });
  if ((await thumbs.count()) > 1) {
    await thumbs.nth(1).click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(800);
  }
  const filePath = path.join(outputDir, "veldt-product-alt.png");
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`  saved ${filePath}`);
}

await browser.close();
console.log("Done.");
