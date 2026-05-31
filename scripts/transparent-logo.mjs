import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "..", "public", "logo-original.png");
const out = join(__dirname, "..", "public", "logo-rf.png");

const LO = 16; // luminance fully transparent at/below
const HI = 48; // luminance fully opaque at/above

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
for (let i = 0; i < data.length; i += channels) {
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  let alpha;
  if (lum <= LO) alpha = 0;
  else if (lum >= HI) alpha = 255;
  else alpha = Math.round(((lum - LO) / (HI - LO)) * 255);
  data[i + 3] = alpha;
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(out);

console.log(`Wrote transparent logo: ${width}x${height} -> ${out}`);
