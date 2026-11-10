// Read the content collections. Pages ask here, never call getCollection themselves.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type Work = CollectionEntry<"work">;
export type Post = CollectionEntry<"posts">;

export async function getProfile() {
  const entry = await getEntry("profile", "profile");
  if (!entry) throw new Error("src/content/profile.yaml is missing");
  return entry.data;
}

export async function getWork(): Promise<Work[]> {
  const all = await getCollection("work");
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getCaseStudies() {
  return (await getWork()).filter((w) => w.data.caseStudy);
}

/** Published Posts, newest first. Drafts are included only under `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection("posts", (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const postHref = (p: Post) => `/blog/${p.id}`;

/** Minutes to read the body at 220 words a minute, code included, never less than one. */
export function readingMinutes(body = ""): number {
  const words = body
    .replace(/^---[\s\S]*?---/, "")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.round(words / 220));
}
