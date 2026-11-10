# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 (static output) with React 19 islands, Tailwind CSS v4, motion, Zustand. Deployed to GitHub Pages from `9Chinz/9Chinz.github.io` via `.github/workflows/deploy.yml` (withastro/action). Live at https://9chinz.github.io; no custom domain yet. Magic UI and React Bits components are allowed when they serve the work.

## Users

International hiring managers, recruiters and engineers evaluating Chinnapat "Chin" Limprathan for Software Engineer, Full-Stack or Backend roles, remote or hybrid. They arrive from a resume, LinkedIn or a job application and need to decide quickly whether to talk to him. Secondary: readers of his blog Posts.

## Product Purpose

A personal portfolio and blog. It exists to get Chin a conversation. Success is a visitor opening the Resume, GitHub or LinkedIn, or copying his email. The blog gives him a place to publish his own writing.

## Positioning

A backend-leaning full-stack TypeScript developer (Mid-level Software Developer at INOX, Bangkok) who built the systems behind Thai PBS's election coverage: the sole backend of the Local Election 68 live results platform (500k+ peak concurrent requests on election night, 47 provincial chief races), the Bangkok Governor Election 69 results site, Next Station BKK, and AI newsroom tools. The headline leads with systems at scale; the site's own craft demonstrates the front-end side.

## Operating Context

- Visitors skim first, often on a laptop between other candidates; some open it on a phone from LinkedIn.
- Content is maintained by Chin as files in the repo (profile, Experience, Case Studies, Posts), edited locally or in GitHub's web editor; a push to `main` redeploys. The content structure should stay compatible with Pages CMS being added later.
- English only.
- Vocabulary is defined in `GLOSSARY.md` (Profile, Resume, Experience, Case Study, Selected Work, Post, Draft).

## Capabilities and Constraints

- Pages: home (single scroll: hero, Selected Work, Experience, Latest Writing, Contact), `/work/[slug]` Case Studies, `/blog` and `/blog/[slug]` Posts, `/resume.pdf`, 404.
- Blog at launch: Markdown/MDX Posts, highlighted code with filename and copy, reading time, sticky TOC with scrollspy, heading anchors, prev/next, draft flag; ⌘K search across Posts and Case Studies (Pagefind). Also shipped: `sitemap.xml` and `robots.txt` (static, drafts excluded). Not at launch: tags, RSS, comments.
- Contact: email with click-to-copy, GitHub, LinkedIn. No contact form, no backend.
- No analytics at launch.
- Static hosting only: no server routes, no runtime secrets.
- Undecided: which projects get full Case Studies beyond Local Election 68.

## Brand Commitments

- Name: Chinnapat Limprathan ("Chin"). GitHub `9Chinz`, LinkedIn `in/chinnapat`, public email MR.Chinnapat@hotmail.com.
- Voice: first person, plain and specific, sentence case, no hype words. The headline "I build the systems behind products millions of people use." comes from his LinkedIn About.
- Clients and projects may be named, with the numbers that are on the resume. Diagrams are redrawn, never internal screenshots or code; screenshots only of public pages.
- Chosen direction (user's pick, 2026-11-10): prototype round 2, option 1 "Annotated notebook" at `src/prototype/r2/1/`, with the profile photo and project link-preview images added.

## Evidence on Hand

- Resume: `public/resume.pdf` (v2, phone number removed). Source: `../rsm/resume-draft-v2.docx`, built by `../rsm/scripts/build-resume.cjs`.
- Content: `src/content/` (`profile.yaml` for the Profile, facts and Experience; `work/*.md` for work items and the Local Election 68 Case Study shell; `posts/*.md` for the sample Post, a Draft).
- Hard facts usable on the site: 500k+ peak concurrent requests (Local Election 68), 47 provincial chief and 76 provincial council races, 50 Bangkok districts on the hex-tile map, and "80% less manual newsroom workload" (LinkedIn only; the resume says "meaningfully reduced", so treat as unconfirmed).
- Images: profile photo from LinkedIn (`public/images/profile.jpg`, crop `profile-portrait.jpg`); the live pages' own og:images for Local Election 68, Bangkok Governor Election 69 and Next Station BKK (`public/images/og/`); screenshots of public Thai PBS pages (not shipped; in git history under `public/prototype/shots/`).
- Absent, must not be fabricated: Local Election 68 architecture, key decisions, latency/error-rate/cost figures, most project stacks (marked `TODO_CHIN`), testimonials, client logos, real blog Posts (only a sample exists), images for The Heroes SS3 and the AI editorial tools.

## Product Principles

1. Proof over adjectives: every claim is a fact from the resume or LinkedIn, and missing facts show as visible gaps, never filler.
2. The visitor's next step is always one click away: Resume, GitHub, LinkedIn or the email.
3. Systems first: lead with scale and backend work; let the site's craft carry the front-end case.
4. Easy for Chin to keep current: content lives in plain files, and updating it never requires touching layout code.
5. Respect the reader: fast static pages, readable long-form, nothing that gets in the way of skimming.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast, keyboard operation, visible focus, `prefers-reduced-motion` respected, alt text on every meaningful image, 44px touch targets.
