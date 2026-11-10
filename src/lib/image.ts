// Build-time helpers for files under public/images.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Builds run from the project root; bundled pages no longer sit beside src/.
const publicDir = resolve("public");

/** The WebP twin that sits next to a .jpg or .png. */
export const webp = (src: string) => src.replace(/\.(jpe?g|png)$/, ".webp");

/** A resized twin, e.g. /images/a.jpg at 800 is /images/a-800.webp. */
export const sized = (src: string, w: number, ext = "webp") => src.replace(/\.(jpe?g|png|webp)$/, `-${w}.${ext}`);

/** True when the file exists in public/, so a missing twin never becomes a broken source. */
export const exists = (src: string) => existsSync(publicDir + src);

/** A srcset of the candidates that exist, e.g. srcset([[a, 800], [b, 1600]]) is "a 800w, b 1600w". */
export const srcset = (candidates: [src: string, width: number][]) =>
  candidates.filter(([src]) => exists(src)).map(([src, w]) => `${src} ${w}w`).join(", ") || undefined;

/** Pixel size of a PNG or JPEG in public/, read from its header, so share tags state the real size. */
export function imageSize(src: string): { width: number; height: number } | undefined {
  let b: Buffer;
  try {
    b = readFileSync(publicDir + src);
  } catch {
    return undefined;
  }
  if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b[0] !== 0xff || b[1] !== 0xd8) return undefined;
  for (let i = 2; i + 9 < b.length; ) {
    if (b[i] !== 0xff) return undefined;
    const marker = b[i + 1];
    // SOF0-SOF15 carry the frame size; C4, C8 and CC are other tables.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return undefined;
}
