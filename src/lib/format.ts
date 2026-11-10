// Formatting only: these never add content.

// "Chatuchak, Bangkok · Hybrid" -> "Chatuchak, Bangkok, Hybrid": no middle-dot meta strings.
export const plain = (s: string) => s.replace(/\s*·\s*/g, ", ");

export const end = (s: string) => (s === "Present" ? "now" : s);

// Months from "YYYY-MM" to "YYYY-MM" or "Present", counted the way LinkedIn counts: both months included.
// "Present" is the month the site was built; the deploy workflow rebuilds monthly so it stays current.
export function monthsBetween(start: string, finish: string, now = new Date()): number {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = finish === "Present" ? [now.getUTCFullYear(), now.getUTCMonth() + 1] : finish.split("-").map(Number);
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}
// 31 -> "2 yrs 7 mos", 12 -> "1 yr", 3 -> "3 mos", 1 -> "1 mo"
export function duration(totalMonths: number): string {
  const y = Math.floor(totalMonths / 12), m = totalMonths % 12;
  const part = (n: number, one: string, many: string) => (n ? `${n} ${n === 1 ? one : many}` : "");
  return [part(y, "yr", "yrs"), part(m, "mo", "mos")].filter(Boolean).join(" ");
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// "2025-02" -> "February 2025"
export function monthName(iso: string): string {
  const [y, m] = iso.split("-");
  return `${months[Number(m) - 1]} ${y}`;
}

// Date -> "2026-11-03"
export const isoDay = (d: Date) => d.toISOString().slice(0, 10);

// "https://www.thaipbs.or.th/localelection/home" -> "thaipbs.or.th"
export const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");
// ... -> "thaipbs.or.th/localelection/home"
export const hostPath = (url: string) => `${host(url)}${new URL(url).pathname.replace(/\/$/, "")}`;

// Resume text may carry "**bold**" and "[label](url)"; the site shows it as plain text.
export const stripMarkup = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\(.+?\)/g, "$1");

export const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Split rendered Markdown HTML at each <h2> into its sections. Text before the first h2 is dropped. */
export function splitSections(html: string): { id: string; heading: string; html: string }[] {
  return html
    .split(/(?=<h2[\s>])/)
    .filter((chunk) => chunk.startsWith("<h2"))
    .map((chunk) => {
      const m = chunk.match(/^<h2([^>]*)>([\s\S]*?)<\/h2>/);
      const id = m?.[1].match(/id="([^"]+)"/)?.[1] ?? "";
      const heading = (m?.[2] ?? "").replace(/<[^>]+>/g, "").trim();
      return { id, heading, html: chunk };
    });
}
