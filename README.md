# 9chinz.github.io

Chin's portfolio and blog, live at https://9chinz.github.io. Astro (static), React islands, Tailwind, Pagefind search.

Everything you normally change is a plain file in `src/content/` or `public/`. You never need to touch layout code to keep the site current.

## Run it locally

```sh
pnpm install
pnpm dev        # http://localhost:4321, shows Drafts too
pnpm build      # production build into dist/, then the Pagefind search index
pnpm preview    # serve dist/ to check the production build
```

Search (⌘K, then type) only works after `pnpm build`; in `pnpm dev` the index card still lists its sections, pages and actions.

## Where the content lives

| What | File |
| --- | --- |
| Profile: name, headline, summary, email, links, photo, the hero sketch, facts, education | `src/content/profile.yaml` |
| Experience (roles and highlights) | `experience:` in `src/content/profile.yaml` |
| Selected Work (one file per project) and Case Studies | `src/content/work/<slug>.md` |
| Posts | `src/content/posts/<slug>.md` |
| Resume | `resume:` block in `src/content/profile.yaml`; built into `public/resume.pdf` (see Update the resume) |
| Images (photo, link-preview images) | `public/images/` |
| Share image for the whole site | `public/images/og-site.png`, drawn from `scripts/og-site.html` (see Update the brand images) |

The fields are checked when the site builds. A misspelt field name, a date in the wrong shape or a missing required field stops the build with a message naming the file and the field, so a mistake never reaches the live site.

Dates are `YYYY-MM` (`2025-02`) for work and Experience, `YYYY-MM-DD` for Posts. An Experience role that is still going has `end: Present`.

## Add a Post

Create `src/content/posts/my-post-slug.md`. The file name becomes the URL (`/blog/my-post-slug`).

~~~md
---
title: My post title
date: 2026-12-01
summary: One sentence for the writing index and for link previews.
draft: true
---

Opening paragraph.

## A section heading

Each `##` heading goes into the "On this page" list and gets its own link.

```ts title="src/example.ts"
const answer = 42;
```
~~~

- `draft: true` keeps it a Draft: visible in `pnpm dev`, left out of the live site. Delete the line (or set `false`) to publish.
- Reading time is worked out from the text.
- Code blocks get syntax colours, a caption and a Copy button. `title="..."` after the language sets the caption to a file name; without it the caption shows the language.
- The home page's Latest Writing section appears by itself once the first Post is published.

## Add a work item

Create `src/content/work/<slug>.md` with frontmatter only:

```md
---
title: Project name
client: Thai PBS
year: 2026
role: Frontend and backend
summary: One or two sentences about what it is.
stack:
  - TypeScript
stackToConfirm: the rest of the stack.   # optional: shows "Chin to confirm: ..."
url: https://example.com/live-page       # optional
og: /images/og/project.jpg               # optional: the live page's own 1200x630 share image
order: 6                                 # position in Selected Work, lowest first
group: other                             # elections (Election coverage) or other (Other work), the two groups on home
---
```

With `url` and `og` the home page shows a link preview; with only `url` it shows a "Live site" link.

## Turn a work item into a Case Study

Add a `caseStudy:` block to its frontmatter and write the body in Markdown. That alone creates the page at `/work/<slug>` and adds "Read the case study" on the home page. `src/content/work/local-election-68.md` is the worked example.

- Frontmatter: `date` (`YYYY-MM`), `roleDetail`, `outcome`, and optionally `drawing` (the technical drawing: parts A, B, C..., the leads between them, and `after:` naming the section it follows).
- Body: each `## heading` is one numbered section (01, 02, ...), in the order you write them.
- In the drawing, `draft: false` is drawn in pen (on the record) and `draft: true` in dashed pencil (still to confirm).

## Gaps: TODO and CONFIRM

Never fill a missing fact with filler. Leave it visibly open instead:

- In Markdown, a paragraph that starts with `TODO:` shows as an open item "Chin to write: ...", and one that starts with `CONFIRM:` shows as "Chin to confirm: ...".
- In frontmatter, use the optional fields made for it, such as `stackToConfirm` on a work item or `confirm` on a drawing part.

When you have the fact, replace the paragraph or field with it.

## Update the resume

The resume is generated from the site's content, so edit the content, not a Word file.

- Org, roles, dates, education and links come from `profile.yaml`. The longer resume wording (summary, bullets, skills, projects, coursework) is in its `resume:` block, which the site does not show. In the summary and bullets, `**bold**` and `[label](url)` become bold text and links in the PDF (the site shows them as plain text).
- `pnpm resume` writes the public PDF to `public/resume.pdf`, with no phone number. It needs LibreOffice (`soffice`) and fails if the resume runs past one page. Scratch files and a PNG preview go to `.resume-build/` (git-ignored).
- `RESUME_PHONE="..." pnpm resume:private` also writes a copy with the phone number to `private/resume/resume-latest.docx` and `.pdf`. `private/` is git-ignored, so the phone number never reaches the repo.
- Commit the new `public/resume.pdf`. CI does not run the resume build.

## Update the brand images

The share card and the LinkedIn banner are HTML pages in `scripts/`, drawn in the brand colour (blueprint ultramarine `#1E34B4`, see DESIGN.md) with the site's fonts.

- `pnpm brand` renders them with headless Chrome (set `CHROME_PATH` if Chrome is not in `/Applications`):
  - `scripts/og-site.html` becomes `public/images/og-site.png` (1200x630), the share image for every page without its own.
  - `scripts/linkedin-banner.html` becomes `private/brand/linkedin-banner.png` (1584x396, git-ignored), uploaded to LinkedIn by hand.
- The figures on them (47 races, 500k+) are the same as the home sketch. Change both together.
- Commit the new `og-site.png`. CI does not run this build.

## Publish

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds the site and deploys it to GitHub Pages in a couple of minutes. You can edit any of the files above in GitHub's web editor and commit to `main` to the same effect.

## For design and product decisions

`PRODUCT.md` (what the site is for and what is in scope), `DESIGN.md` (the design system) and `GLOSSARY.md` (the words used here).
