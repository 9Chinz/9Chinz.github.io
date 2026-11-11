// Renders the brand images from HTML with headless Chrome (set CHROME_PATH if Chrome is not in /Applications).
//   pnpm brand   (node scripts/build-brand.mjs)
//   scripts/og-site.html         -> public/images/og-site.png            (1200x630 share card)
//   scripts/linkedin-banner.html -> private/brand/linkedin-banner.png    (1584x396, git-ignored, uploaded by hand)
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const images = [
  ["scripts/og-site.html", "public/images/og-site.png", 1200, 630],
  ["scripts/linkedin-banner.html", "private/brand/linkedin-banner.png", 1584, 396],
];
for (const [src, dest, w, h] of images) {
  const out = join(root, dest);
  mkdirSync(dirname(out), { recursive: true });
  execFileSync(chrome, [
    "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=${w},${h}`,
    "--virtual-time-budget=2000", `--screenshot=${out}`, pathToFileURL(join(root, src)).href,
  ], { stdio: "ignore" });
  console.log(`wrote ${dest}`);
}
