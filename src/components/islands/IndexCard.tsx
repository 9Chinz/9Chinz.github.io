// The ⌘K command palette, set as an index card clipped onto the notebook.
// Combobox input, grouped listbox, arrow/Home/End/Enter, Esc closes, focus held in the card,
// focus restored to the trigger. On narrow screens it is the nav.
// Typing also searches Case Studies and Posts through Pagefind, which exists only in a production
// build (`pnpm build`); without it the static entries keep working and search stays silent.
// This file is the trigger and the shortcut; the card is IndexPanel.tsx, fetched when the browser
// is idle or the visitor reaches for it, whichever comes first.
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIndex } from "./store";

export type Section = { id: string; label: string; keywords: string };
export type Page = { label: string; href: string; hint: string; keywords: string };
export type Props = { email: string; github: string; linkedin: string; resume: string; sections: Section[]; pages: Page[] };

const loadPanel = () => import("./IndexPanel");
const Panel = lazy(loadPanel);

export default function IndexCard(props: Props) {
  const { open, setOpen } = useIndex();
  const [mac, setMac] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // The card mounts on first open and then stays, so its exit animation can play.
  const [wanted, setWanted] = useState(false);
  if (open && !wanted) setWanted(true);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    idle(() => void loadPanel());
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useIndex.getState().toggle();
      }
    };
    const onAsk = () => useIndex.getState().setOpen(true);
    addEventListener("keydown", onKey);
    addEventListener("index:open", onAsk);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("index:open", onAsk);
    };
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="index-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        onClick={() => setOpen(true)}
      >
        <span className="wide">Index</span>
        <span className="narrow">Menu</span>
        <kbd className="kbd wide">{mac ? "⌘K" : "Ctrl K"}</kbd>
      </button>
      {wanted &&
        createPortal(
          <Suspense fallback={null}>
            <Panel
              {...props}
              open={open}
              onClose={() => {
                setOpen(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
              }}
            />
          </Suspense>,
          document.body,
        )}
    </>
  );
}

