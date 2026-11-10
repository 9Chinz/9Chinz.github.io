// Markdown pipeline additions, wired into astro.config.mjs.
// - Open items: a paragraph starting "TODO:" or "CONFIRM:" becomes "Chin to write:" / "Chin to confirm:".
// - Heading anchors: every h2 links to itself.
// - Code figures: each code block gets a caption (its title="..." or language) and a copy button.
import GithubSlugger from "github-slugger";
import type { SatteriProcessorOptions } from "@astrojs/markdown-satteri";
import type { ShikiConfig } from "astro";

type HastPluginDefinition = Extract<NonNullable<SatteriProcessorOptions["hastPlugins"]>[number], { name: string }>;
type ShikiTransformer = NonNullable<ShikiConfig["transformers"]>[number];

type El = { type: "element"; tagName: string; properties: Record<string, unknown>; children: Node[] };
type Node = El | { type: "text"; value: string };
const h = (tagName: string, properties: Record<string, unknown> = {}, children: Node[] = []): El => ({ type: "element", tagName, properties, children });
const t = (value: string): Node => ({ type: "text", value });

const GAP = /^\s*(TODO|CONFIRM):\s*/;

/** The same markup as src/components/Gap.astro. */
export function gapNode(kind: "write" | "confirm", rest: string): El {
  return h("p", { className: ["gap"], role: "note" }, [h("span", {}, [h("strong", {}, [t(`Chin to ${kind}:`)]), t(` ${rest}`)])]);
}

export const openItems: HastPluginDefinition = {
  name: "open-items",
  element: {
    filter: ["p"],
    visit(node, ctx) {
      const text = ctx.textContent(node);
      const m = text.match(GAP);
      if (!m) return;
      ctx.replaceNode(node, gapNode(m[1] === "TODO" ? "write" : "confirm", text.slice(m[0].length).trim()) as never);
    },
  },
};

export const headingAnchors = () => {
  const slugger = new GithubSlugger();
  return {
    name: "heading-anchors",
    element: {
      filter: ["h2"],
      visit(node, ctx) {
        const existing = node.properties?.id;
        const id = typeof existing === "string" ? existing : slugger.slug(ctx.textContent(node));
        ctx.setProperty(node, "id", id);
        ctx.setField(node, "children", [h("a", { className: ["anchor"], href: `#${id}` }, node.children as Node[])] as never);
      },
    },
  } satisfies HastPluginDefinition;
};

const svg = (children: El[]) => h("svg", { width: "15", height: "15", viewBox: "0 0 16 16", fill: "none", ariaHidden: "true" }, children);
const copyIcon = () =>
  svg([
    h("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.3" }),
    h("path", { d: "M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5", stroke: "currentColor", strokeWidth: "1.3" }),
  ]);
const checkIcon = () =>
  svg([h("path", { d: "M3 8.5l3 3 7-7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })]);

/** The same markup as src/components/CopyButton.astro without text: it copies the <pre> in its figure. */
const copyButton = () =>
  h("button", { type: "button", className: ["btn"], dataCopy: "", ariaLabel: "Copy code" }, [
    h("span", { className: ["copy"] }, [
      h("span", { className: ["idle"] }, [copyIcon(), t("Copy")]),
      h("span", { className: ["done"], ariaHidden: "true" }, [checkIcon(), t("Copied")]),
    ]),
  ]);

export const codeFigure: ShikiTransformer = {
  name: "code-figure",
  root(root) {
    const pre = root.children[0];
    if (!pre || pre.type !== "element") return;
    const raw = (this.options.meta as { __raw?: string } | undefined)?.__raw ?? "";
    const title = raw.match(/title="([^"]+)"/)?.[1] ?? this.options.lang;
    return { type: "root", children: [h("figure", { className: ["codeblock"] }, [h("figcaption", {}, [h("span", {}, [t(title)]), copyButton()]), pre as never])] } as never;
  },
};
