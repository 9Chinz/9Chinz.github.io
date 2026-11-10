// A Case Study's system as a technical drawing. Hover, focus or tap a part to read its note.
// Facts on the record are drawn in pen (solid); every guess is a pencil draft (dashed) marked "Chin to confirm".
// The parts and links come from the work item's `caseStudy.drawing` frontmatter.
// Every note sits in one grid cell, so the panel is as tall as the longest note and never jumps;
// the active one cross-fades in CSS (site.css, .dw-note).
import { useEffect, useState, type ReactNode } from "react";

export type Part = {
  id: string;
  ref: string; // drawing reference, e.g. "A"
  label: string;
  sub?: string;
  note?: string;
  confirm?: string; // what Chin still has to confirm about this part
  draft: boolean;
  chips?: string[]; // sub-parts inside a part, unordered; drawn in pencil when the part is a draft
};
export type Link = { from: string; to: string; label?: string; draft: boolean };

type Props = { parts: Part[]; links: Link[]; title: string };

function Note({ note, todo }: { note?: string; todo?: string }) {
  return (
    <>
      {note && <p>{note}</p>}
      {todo && (
        <p className="gap" role="note">
          <span>
            <strong>Chin to confirm:</strong> {todo}
          </span>
        </p>
      )}
    </>
  );
}

const Lead = ({ draft, label, dir }: { draft: boolean; label?: string; dir: "right" | "left" }) => (
  <div className="dw-lead" data-draft={draft} aria-hidden="true">
    <svg viewBox="0 0 64 12" preserveAspectRatio="none" className={dir === "left" ? "flip" : undefined}>
      <line x1="2" y1="6" x2="58" y2="6" />
      <path d="M53 2l6 4-6 4" />
    </svg>
    {label && <span className="dw-lead-label">{label}</span>}
  </div>
);

export default function Drawing({ parts, links, title }: Props) {
  const [active, setActive] = useState(parts.find((p) => !p.draft)?.id ?? parts[0].id);
  const hasDraft = parts.some((p) => p.draft);
  // The island hydrates when it scrolls into view; a part that took keyboard focus before then gets its note.
  useEffect(() => {
    const id = (document.activeElement as HTMLElement | null)?.closest<HTMLElement>(".dw-part")?.dataset.part;
    if (id) setActive(id);
  }, []);

  const partEl = (p: Part): ReactNode => (
    <button
      key={p.id}
      type="button"
      className="dw-part"
      data-part={p.id}
      data-draft={p.draft}
      data-active={p.id === active}
      aria-pressed={p.id === active}
      aria-controls="dw-note"
      onMouseEnter={() => setActive(p.id)}
      onFocus={() => setActive(p.id)}
      onClick={(e) => {
        setActive(p.id);
        // Stacked on a phone, the note sits under all the parts: a tap brings it into view if it is off screen.
        const note = document.getElementById("dw-note");
        if (e.detail > 0 && note && note.getBoundingClientRect().top > innerHeight - 48) {
          const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
          note.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "auto" });
        }
      }}
    >
      <span className="dw-ref">{p.ref}</span>
      <span className="dw-label">{p.label}</span>
      {p.sub && <span className="dw-sub">{p.sub}</span>}
      {p.chips && (
        <span className="dw-chips">
          {p.chips.map((c) => (
            <span className="dw-chip" data-draft={p.draft} key={c}>
              {c}
            </span>
          ))}
        </span>
      )}
      {p.draft && <span className="dw-draft">Chin to confirm</span>}
    </button>
  );

  const row: ReactNode[] = [];
  parts.forEach((p, i) => {
    row.push(partEl(p));
    const next = parts[i + 1];
    if (!next) return;
    const l = links.find((x) => (x.from === p.id && x.to === next.id) || (x.from === next.id && x.to === p.id));
    if (l) row.push(<Lead key={`${p.id}-l`} draft={l.draft} label={l.label} dir={l.from === p.id ? "right" : "left"} />);
  });

  return (
    <div className="dw">
      <div className="dw-sheet">
        <div className="dw-row">{row}</div>
        <div className="dw-foot">
          <p className="dw-legend" aria-hidden="true">
            <span className="dw-key" data-draft="false" /> on the record
            {hasDraft && (
              <>
                <span className="dw-key" data-draft="true" /> pencil draft
              </>
            )}
          </p>
          <p className="dw-title">{title}</p>
        </div>
      </div>
      <div className="dw-note" id="dw-note" aria-live="polite">
        {parts.map((p) => (
          <div key={p.id} className="dw-note-page" data-active={p.id === active}>
            <h3 className="dw-note-title">
              <span className="dw-ref">{p.ref}</span>
              {p.label}
              <span className="dw-note-kind" data-draft={p.draft}>
                {p.draft ? "Draft part" : "From the record"}
              </span>
            </h3>
            <Note note={p.note} todo={p.confirm} />
          </div>
        ))}
      </div>
    </div>
  );
}
