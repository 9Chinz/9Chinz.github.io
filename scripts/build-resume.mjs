// Builds the resume (.docx, then .pdf) from src/content/profile.yaml.
//   pnpm resume                                   public PDF, no phone  -> public/resume.pdf
//   RESUME_PHONE="..." pnpm resume:private        also private/resume/resume-latest.docx/.pdf (git-ignored), WITH the phone
// The phone number is read from the environment only. It is never stored in this repo.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, LevelFormat, Packer, Paragraph, TabStopType, TextRun,
} from "docx";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = join(root, ".resume-build"); // git-ignored scratch: docx, pdf, preview PNG
const privateDir = resolve(root, "private/resume");
const wantPrivate = process.argv.includes("--private");

const profile = parse(readFileSync(join(root, "src/content/profile.yaml"), "utf8"));
const r = profile.resume;
if (!r) throw new Error("profile.yaml has no resume: block");

const phone = process.env.RESUME_PHONE?.trim();
if (wantPrivate && !phone) throw new Error('resume:private needs RESUME_PHONE="..." in the environment');

// ---- docx helpers (same look as the old generator, kept in private/scripts/build-resume.cjs) ----
const FONT = "Calibri";
const BLUEPRINT = "1E34B4"; // the brand colour (DESIGN.md): name, section heads and rules, links
const LINK = BLUEPRINT;
const RIGHT = 10440;
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 20, bold: o.bold ?? false, color: o.color });
const link = (text, url, o = {}) =>
  new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: FONT, size: o.size ?? 20, bold: o.bold ?? false, color: LINK })] });

// "**bold**" and "[label](url)" (label is rendered bold + linked)
function rich(s) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0, m;
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push(run(s.slice(last, m.index)));
    parts.push(m[1] ? run(m[1], { bold: true }) : link(m[2], m[3], { bold: true }));
    last = re.lastIndex;
  }
  if (last < s.length) parts.push(run(s.slice(last)));
  return parts;
}

const section = (title) =>
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUEPRINT, space: 2 } },
    spacing: { before: 110, after: 40 },
    children: [run(title, { bold: true, size: 21, color: BLUEPRINT })],
  });
const twoCol = (left, right, before, after = 0) =>
  new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }], spacing: { before, after }, children: [run(left, { bold: true }), run(`\t${right}`)] });
const bullet = (s) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { before: 18, after: 18 }, children: rich(s) });
const line = (label, value) => new Paragraph({ spacing: { before: 14, after: 14 }, children: [run(`${label}:  `, { bold: true }), ...rich(value)] });

// "2026-09" -> "09/2026"
const mmyyyy = (iso) => (iso === "Present" ? iso : iso.split("-").reverse().join("/"));
const range = (a, b) => `${mmyyyy(a)} – ${mmyyyy(b)}`;
const shortUrl = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// ---- content ----
const sep = () => run("  •  ", { size: 17 });
const contactItems = [
  ...(wantPrivate ? [[run(phone, { size: 17 })]] : []),
  [link(profile.email, `mailto:${profile.email}`, { size: 17 })],
  [link(shortUrl(profile.links.linkedin), profile.links.linkedin, { size: 17 })],
  [link(shortUrl(profile.links.github), profile.links.github, { size: 17 })],
  [link(shortUrl(r.website), r.website, { size: 17 })],
  [run(r.availability, { size: 17 })],
];
const contact = contactItems.flatMap((item, i) => (i ? [sep(), ...item] : item));

const experience = profile.experience.flatMap((x) => {
  const over = r.experience.find((e) => e.org === x.org);
  if (!over) throw new Error(`resume.experience has no entry for "${x.org}"`);
  return [
    twoCol(x.org, over.place, 80),
    ...x.roles.map((role, i) => twoCol(role.title, range(role.start, role.end), 0, i === x.roles.length - 1 ? 40 : 0)),
    ...over.bullets.map(bullet),
  ];
});

const projects = r.projects.map(
  (p) =>
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
      spacing: { before: 40 },
      children: [...rich(`[${p.title}](${p.url}): ${p.description}`), run(`\t${range(p.start, p.end)}`)],
    }),
);

const ed = profile.education;
const children = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [run(profile.name, { bold: true, size: 36, color: BLUEPRINT })] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUEPRINT, space: 4 } },
    children: contact,
  }),
  section("Summary"),
  new Paragraph({ spacing: { after: 20 }, children: rich(r.summary) }),
  section("Experience"),
  ...experience,
  section("Projects"),
  ...projects,
  section("Skills"),
  ...r.skills.map((s) => line(s.label, s.items.join(", "))),
  section("Education"),
  twoCol(ed.school, r.education.place, 60),
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
    children: [run(`${r.education.degree}.  GPA: ${ed.gpa}`), run(`\t${mmyyyy(ed.end)}`)],
  }),
  new Paragraph({ spacing: { before: 20 }, children: [run("Relevant Coursework: ", { bold: true }), run(r.education.coursework.join(", "))] }),
];

const doc = new Document({
  creator: profile.name,
  title: `${profile.name} – Resume`,
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering: {
    config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 220 } } } }] }],
  },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 760, right: 900, bottom: 700, left: 900 } } }, children }],
});

// ---- output ----
const which = (cmd) => {
  try { return execFileSync("which", [cmd], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return null; }
};
const soffice = which("soffice") ?? ["/Applications/LibreOffice.app/Contents/MacOS/soffice"].find(existsSync) ?? null;

// Converts a docx to a PDF next to it; returns the PDF path or null when LibreOffice is missing.
function toPdf(docxPath) {
  if (!soffice) return null;
  execFileSync(soffice, ["--headless", `-env:UserInstallation=file://${join(buildDir, "lo-profile")}`, "--convert-to", "pdf", "--outdir", dirname(docxPath), docxPath], { stdio: "pipe" });
  return docxPath.replace(/\.docx$/, ".pdf");
}
function pageCount(pdf) {
  if (!which("pdfinfo")) return 1; // cannot check; assume fine
  return Number(execFileSync("pdfinfo", [pdf], { encoding: "utf8" }).match(/^Pages:\s+(\d+)/m)?.[1]);
}
function preview(pdf, base) {
  if (!which("pdftoppm")) return null;
  execFileSync("pdftoppm", ["-r", "100", "-png", "-singlefile", pdf, base]);
  return `${base}.png`;
}

mkdirSync(buildDir, { recursive: true });
const docxPath = join(buildDir, wantPrivate ? "resume-private.docx" : "resume.docx");
writeFileSync(docxPath, await Packer.toBuffer(doc));

const pdfPath = toPdf(docxPath);
if (!pdfPath) {
  console.warn("LibreOffice (soffice) not found: wrote the .docx only, no PDF.");
  process.exit(1);
}
const n = pageCount(pdfPath);
if (n !== 1) throw new Error(`Resume is ${n} pages; it must fit on one. Shorten a bullet in profile.yaml.`);
const png = preview(pdfPath, join(buildDir, wantPrivate ? "resume-private" : "resume"));

if (wantPrivate) {
  mkdirSync(privateDir, { recursive: true });
  copyFileSync(docxPath, join(privateDir, "resume-latest.docx"));
  copyFileSync(pdfPath, join(privateDir, "resume-latest.pdf"));
  console.log(`wrote ${join(privateDir, "resume-latest.docx")} and .pdf (with phone, git-ignored)`);
} else {
  copyFileSync(pdfPath, join(root, "public/resume.pdf"));
  console.log("wrote public/resume.pdf (no phone)");
}
if (png) console.log(`preview: ${png}`);
