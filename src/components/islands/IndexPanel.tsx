// The index card itself: the ⌘K palette's dialog, loaded the first time it is wanted so the
// motion library stays off the first page load. IndexCard.tsx owns the trigger and the shortcut.
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { copyText } from "@/scripts/clipboard";
import { currentTheme, toggleTheme, type Theme } from "@/scripts/theme";
import type { Props } from "./IndexCard";

const GROUPS = ["Go to", "Open", "Do", "Search results"] as const;
type Group = (typeof GROUPS)[number];

type Command = {
  id: string;
  group: Group;
  label: string;
  hint: string;
  keywords: string;
  icon: ReactNode;
  run: () => void | Promise<void>;
  keepOpen?: boolean;
};

const ease = [0.23, 1, 0.32, 1] as const;

const Icon = {
  page: <path d="M4 8h8M4 4.5h8M4 11.5h5" />,
  doc: <path d="M4.5 2.5h5l2.5 2.5v8.5h-7.5zM9.5 2.5V5H12" />,
  out: <path d="M6.5 3.5H3.5v9h9v-3M9 3h4v4M13 3L7.5 8.5" />,
  copy: <path d="M5.5 5.5h7v7h-7zM3.5 10.5v-7h7" />,
  check: <path d="M3.5 8.5l3 3 6-7" />,
  theme: <path d="M8 2.5a5.5 5.5 0 100 11zM8 2.5a5.5 5.5 0 010 11" />,
  search: <path d="M7 12a5 5 0 100-10 5 5 0 000 10zM10.6 10.6L14 14" />,
};
const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

// ---- Pagefind: loaded on first search, from the index `pagefind --site dist` writes ----
type PagefindData = { url: string; meta: { title?: string; kind?: string }; sub_results?: { title: string; url: string }[] };
type Pagefind = {
  init?: () => Promise<void>;
  debouncedSearch: (q: string, opts?: object, ms?: number) => Promise<{ results: { id: string; data: () => Promise<PagefindData> }[] } | null>;
};
const PAGEFIND_URL = "/pagefind/pagefind.js";
let pagefind: Promise<Pagefind | null> | undefined;
function loadPagefind() {
  if (import.meta.env.DEV) return Promise.resolve(null);
  pagefind ??= import(/* @vite-ignore */ PAGEFIND_URL)
    .then(async (pf: Pagefind) => {
      await pf.init?.();
      return pf;
    })
    .catch(() => null);
  return pagefind;
}

function goSection(id: string) {
  const onHome = location.pathname === "/";
  if (!onHome) {
    location.assign(`/#${id}`);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  history.replaceState(null, "", `#${id}`);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const heading = el.querySelector<HTMLElement>("h2");
  heading?.setAttribute("tabindex", "-1");
  heading?.focus({ preventScroll: true });
}

export default function Card({ open, onClose, email, github, linkedin, resume, sections, pages }: Props & { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState<Theme>("light");
  const [status, setStatus] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [found, setFound] = useState<Command[]>([]);
  const [searching, setSearching] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // On touch, opening the card must not raise the on-screen keyboard over the list: focus the card, not the input.
  const finePointer = matchMedia("(pointer: fine)").matches;
  // As the phone Menu, the card leads with what a visitor came to do (copy the email), above the scroll.
  const order: readonly Group[] = finePointer ? GROUPS : ["Do", "Go to", "Open", "Search results"];
  useEffect(() => {
    if (open && !finePointer) cardRef.current?.focus({ preventScroll: true });
  }, [open, finePointer]);

  const commands: Command[] = useMemo(
    () => [
      ...sections.map<Command>((s) => ({ id: s.id, group: "Go to", label: s.label, hint: "Section", keywords: s.keywords, icon: Icon.page, run: () => goSection(s.id) })),
      ...pages.map<Command>((p) => ({ id: `page-${p.href}`, group: "Open", label: p.label, hint: p.hint, keywords: p.keywords, icon: Icon.doc, run: () => location.assign(p.href) })),
      { id: "resume", group: "Open", label: "Resume", hint: "PDF", keywords: "cv pdf", icon: Icon.out, run: () => void window.open(resume, "_blank", "noopener") },
      { id: "github", group: "Open", label: "GitHub", hint: "github.com/9Chinz", keywords: "code source", icon: Icon.out, run: () => void window.open(github, "_blank", "noopener") },
      { id: "linkedin", group: "Open", label: "LinkedIn", hint: "linkedin.com", keywords: "profile", icon: Icon.out, run: () => void window.open(linkedin, "_blank", "noopener") },
      {
        id: "email",
        group: "Do",
        label: "Copy email address",
        hint: email,
        keywords: "contact mail hire",
        icon: Icon.copy,
        keepOpen: true,
        run: async () => {
          const ok = await copyText(email);
          setStatus(ok ? { tone: "ok", text: `Copied ${email}` } : { tone: "err", text: `Copy is blocked here. The address is ${email}` });
        },
      },
      {
        id: "theme",
        group: "Do",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        hint: "Theme",
        keywords: "dark light mode toggle appearance",
        icon: Icon.theme,
        keepOpen: true,
        run: () => {
          const next = toggleTheme();
          setTheme(next);
          setStatus({ tone: "ok", text: `Theme set to ${next}` });
        },
      },
    ],
    [email, github, linkedin, resume, theme, sections, pages],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...commands].sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
    const words = q.split(/\s+/);
    // Grouped in display order so the arrow keys follow the list; within a group,
    // label hits rank above keyword hits and ties keep the list order.
    const matches = commands
      .map((c, i) => {
        const label = c.label.toLowerCase();
        const hay = `${label} ${c.keywords} ${c.group} ${c.hint}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        return { c, i, score: words.filter((w) => label.includes(w)).length };
      })
      .filter((x) => x !== null)
      .sort((a, b) => order.indexOf(a.c.group) - order.indexOf(b.c.group) || b.score - a.score || a.i - b.i)
      .map((x) => x.c);
    return [...matches, ...found];
  }, [commands, query, found, finePointer]);

  // Full-text search over Case Studies and Posts. Fails silently where there is no index (astro dev).
  useEffect(() => {
    const q = query.trim();
    setFound([]);
    if (!open || q.length < 2) return setSearching(false);
    let live = true;
    setSearching(true);
    (async () => {
      const pf = await loadPagefind();
      const search = pf && (await pf.debouncedSearch(q, {}, 120));
      if (!live) return;
      if (!search) return setSearching(false);
      const data = await Promise.all(search.results.slice(0, 5).map((r) => r.data()));
      if (!live) return;
      setFound(
        data.map((d, i) => {
          const sub = d.sub_results?.find((s) => s.url !== d.url && s.title !== d.meta.title);
          const href = sub?.url ?? d.url;
          // Selected Work lives on the home page, so name the entry, not the page.
          const onHome = new URL(d.url, location.origin).pathname === "/" && sub;
          return { id: `found-${i}`, group: "Search results", label: onHome ? sub.title : d.meta.title ?? href, hint: onHome ? "Selected Work" : sub?.title ?? d.meta.kind ?? "Page", keywords: "", icon: Icon.search, run: () => location.assign(href) };
        }),
      );
      setSearching(false);
    })().catch(() => live && setSearching(false));
    return () => {
      live = false;
    };
  }, [query, open]);

  // Reset when opened; lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setStatus(null);
    setTheme(currentTheme());
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const run = async (c: Command | undefined) => {
    if (!c) return;
    await c.run();
    if (!c.keepOpen) onClose();
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    const n = results.length;
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (n) setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (n) setActive((a) => (a - 1 + n) % n);
    } else if (e.key === "Home" && n) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && n) {
      e.preventDefault();
      setActive(n - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      void run(results[active]);
    } else if (e.key === "Tab") {
      // Focus trap: the card's only tab stops are the input and the close button.
      const stops = Array.from(cardRef.current?.querySelectorAll<HTMLElement>("input, button[data-stop]") ?? []);
      if (!stops.length) return;
      const i = stops.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      stops[(i + (e.shiftKey ? -1 : 1) + stops.length) % stops.length].focus();
    }
  };

  const groups = order
    .map((g) => ({ g, items: results.filter((c) => c.group === g) }))
    .filter((x) => x.items.length);
  const optionId = (c: Command) => `ix-opt-${c.id}`;
  const t = (ms: number) => (reduce ? { duration: 0 } : { duration: ms / 1000, ease });

  return (
    <AnimatePresence>
      {open && (
        <div className="ix-root">
          <motion.div
            className="ix-scrim"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: t(180) }}
            exit={{ opacity: 0, transition: t(120) }}
          />
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label="Index"
            tabIndex={-1}
            className="ix"
            onKeyDown={onKeyDown}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: t(180) }}
            exit={reduce ? { opacity: 0, transition: t(0) } : { opacity: 0, scale: 0.99, y: -2, transition: t(120) }}
          >
            <div className="ix-search">
              <span className="ix-search-icon">
                <Svg>{Icon.search}</Svg>
              </span>
              <label htmlFor="ix-input" className="visually-hidden">
                Search the index
              </label>
              <input
                id="ix-input"
                autoFocus={finePointer}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="ix-list"
                aria-autocomplete="list"
                aria-activedescendant={results[active] ? optionId(results[active]) : undefined}
                autoComplete="off"
                spellCheck={false}
                placeholder="Find a section, page or action"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="button" data-stop className="ix-close" onClick={onClose} aria-label="Close the index">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            <div ref={listRef} id="ix-list" role="listbox" aria-label="Index entries" className="ix-list">
              {groups.length === 0 && searching && <p className="ix-empty">Searching…</p>}
              {groups.length === 0 && !searching && <p className="ix-empty">Nothing matches “{query}”. Try “work”, “resume” or “email”.</p>}
              {groups.map(({ g, items }) => (
                <div role="group" aria-labelledby={`ix-g-${g.replace(/\s/g, "")}`} key={g} className="ix-group">
                  <div id={`ix-g-${g.replace(/\s/g, "")}`} className="ix-group-label" role="presentation">
                    {g}
                  </div>
                  {items.map((c) => {
                    const index = results.indexOf(c);
                    const selected = index === active;
                    const done = c.id === "email" && status?.tone === "ok";
                    return (
                      <div
                        key={c.id}
                        id={optionId(c)}
                        role="option"
                        aria-selected={selected}
                        data-index={index}
                        className="ix-option"
                        onMouseMove={() => !selected && setActive(index)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => void run(c)}
                      >
                        <span className="ix-icon">
                          <Svg>{done ? Icon.check : c.icon}</Svg>
                        </span>
                        <span className="ix-label">{c.label}</span>
                        <span className="ix-hint">{c.hint}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="ix-foot">
              <p className="ix-status" role="status" aria-live="polite" data-tone={status?.tone}>
                {status?.text ?? ""}
              </p>
              <p className="ix-keys" aria-hidden="true">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd> move <kbd className="kbd">enter</kbd> open <kbd className="kbd">esc</kbd> close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
