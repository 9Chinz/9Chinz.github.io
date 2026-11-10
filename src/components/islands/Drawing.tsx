// A Case Study's system as a technical drawing. Hover, focus or tap a part to read its note.
// Facts on the record are drawn in pen (solid); every guess is a pencil draft (dashed) marked "Chin to confirm".
// The parts and links come from the work item's `caseStudy.drawing` frontmatter.
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type Part = {
  id: string;
  ref: string; // drawing reference, e.g. "A"
  label: string;
  sub?: string;
  note?: string;
  confirm?: string; // what Chin still has to confirm about this part
  draft: boolean;
  chips?: string[]; // draft sub-parts inside a part, unordered
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
  const reduce = useReducedMotion();
  const current = parts.find((p) => p.id === active)!;

  const partEl = (p: Part): ReactNode => (
    <button
      key={p.id}
      type="button"
      className="dw-part"
      data-draft={p.draft}
      data-active={p.id === active}
      aria-pressed={p.id === active}
      aria-controls="dw-note"
      onMouseEnter={() => setActive(p.id)}
      onFocus={() => setActive(p.id)}
      onClick={() => setActive(p.id)}
    >
      <span className="dw-ref">{p.ref}</span>
      <span className="dw-label">{p.label}</span>
      {p.sub && <span className="dw-sub">{p.sub}</span>}
      {p.chips && (
        <span className="dw-chips">
          {p.chips.map((c) => (
            <span className="dw-chip" key={c}>
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
            <span className="dw-key" data-draft="true" /> pencil draft
          </p>
          <p className="dw-title">{title}</p>
        </div>
      </div>
      <div className="dw-note" id="dw-note" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.1 } }}
          >
            <h3 className="dw-note-title">
              <span className="dw-ref">{current.ref}</span>
              {current.label}
              <span className="dw-note-kind" data-draft={current.draft}>
                {current.draft ? "Draft part" : "From the record"}
              </span>
            </h3>
            <Note note={current.note} todo={current.confirm} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
