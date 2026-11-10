// The sitemap, written at build time from the same content the pages read. Drafts never appear.
import type { APIRoute } from "astro";
import { getCaseStudies, getPosts, postHref } from "@/lib/content";

export const GET: APIRoute = async ({ site }) => {
  const [caseStudies, posts] = await Promise.all([getCaseStudies(), getPosts()]);
  const paths = ["/", "/blog", ...caseStudies.map((w) => `/work/${w.id}`), ...posts.map(postHref)];
  // GitHub Pages serves each page as a folder, so the canonical URL ends in a slash.
  const urls = paths.map((p) => `  <url><loc>${new URL(p.endsWith("/") ? p : `${p}/`, site).href}</loc></url>`).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
