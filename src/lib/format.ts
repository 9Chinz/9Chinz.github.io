// Formatting only: these never add content.

// "Chatuchak, Bangkok · Hybrid" -> "Chatuchak, Bangkok, Hybrid": no middle-dot meta strings.
export const plain = (s: string) => s.replace(/\s*·\s*/g, ", ");

export const end = (s: string) => (s === "Present" ? "now" : s);

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
