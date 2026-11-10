// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { codeFigure, headingAnchors, openItems } from "./src/lib/markdown.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://9chinz.github.io",
  integrations: [react()],

  markdown: {
    // Code colours come from the --astro-code-* tokens in src/styles/tokens.css, so they follow the theme.
    shikiConfig: { theme: "css-variables", transformers: [codeFigure] },
    processor: satteri({ hastPlugins: [openItems, headingAnchors] }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
