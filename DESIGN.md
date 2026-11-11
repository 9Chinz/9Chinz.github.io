---
name: Chinnapat Limprathan, portfolio
description: An engineering notebook for a backend-leaning full-stack developer; dated entries, pen for the record, pencil for drafts.
colors:
  engineering-pad: "#F1F4EE"
  pad-shade: "#E6ECE2"
  clipped-card: "#FAFBF8"
  green-black-ink: "#18201B"
  ink-soft: "#36423A"
  margin-grey: "#59665E"
  ruled-line: "#CBD6C8"
  control-edge: "#8E9B90"
  graph-grid: "#DFE7DB"
  technical-pen-blue: "#1E34B4"
  pen-wash: "#E0E5F7"
  blueprint: "#1E34B4"
  blueprint-ink: "#F6F8FF"
  blueprint-soft: "#C9D2FF"
  blueprint-own: "#2C43C6"
  pencil-graphite: "#66706A"
  engineering-pad-dark: "#111512"
  pad-shade-dark: "#1A201C"
  clipped-card-dark: "#1C231E"
  green-black-ink-dark: "#E4EAE3"
  ink-soft-dark: "#C2CCC3"
  margin-grey-dark: "#8F9B92"
  ruled-line-dark: "#2C352F"
  technical-pen-blue-dark: "#9AACFF"
  pen-wash-dark: "#1F2640"
  pencil-graphite-dark: "#9AA59D"
  blueprint-dark: "#2A3FBF"
  blueprint-soft-dark: "#CDD5FF"
  blueprint-own-dark: "#3247C9"
typography:
  hero:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.35rem + 3.9vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.55rem + 1.9vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.024em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
  margin-date:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\""
  figure:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
rounded:
  sm: "3px"
  md: "6px"
  full: "999px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
  margin: "168px"
  measure: "640px"
  section-gap: "128px"
components:
  button-primary:
    backgroundColor: "{colors.blueprint}"
    textColor: "{colors.blueprint-ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.green-black-ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
  link-preview:
    backgroundColor: "{colors.clipped-card}"
    textColor: "{colors.green-black-ink}"
    rounded: "{rounded.md}"
    width: "26rem"
  link-preview-compact:
    backgroundColor: "{colors.clipped-card}"
    textColor: "{colors.green-black-ink}"
    rounded: "{rounded.md}"
    width: "26rem"
  open-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  index-card:
    backgroundColor: "{colors.clipped-card}"
    textColor: "{colors.green-black-ink}"
    rounded: "{rounded.md}"
    width: "560px"
  index-card-option-selected:
    backgroundColor: "{colors.pen-wash}"
    textColor: "{colors.green-black-ink}"
    height: "44px"
  sketch-node:
    backgroundColor: "{colors.blueprint}"
    textColor: "{colors.blueprint-ink}"
    rounded: "{rounded.sm}"
    padding: "12px"
---

# Design System: Chinnapat Limprathan, portfolio

## Overview

**Creative North Star: "The Engineering Notebook"**

The site is a well-kept engineering pad. Every entry is dated in the left margin, the way a working log is kept, and the writing sits on one narrow ruled column beside it. What is on the record is drawn in technical pen; what Chin still has to confirm is drawn in pencil and left visibly open. Instruments are clipped onto the pages rather than built into them: an index card for navigation (⌘K), a white-pen sketch of the system on a blueprint sheet, a technical drawing with lettered parts for a Case Study, a small print of Chin himself, and link previews pasted in like clippings.

The mood is precise, honest and unhurried. Type does most of the work, and one colour carries the brand: blueprint ultramarine, used as ink for links and the primary action and as a full sheet twice, for the system sketch that opens the page and the Contact block that closes it. The page holds still: motion only settles the first view once and answers what the visitor does. Density is low on purpose: one idea per entry, generous gaps between sections, and the margin dates carrying the structure so headings can stay small.

Honesty is a visual rule here, not just a content rule. A missing fact is drawn as an open item (an unchecked box with "Chin to write" or "Chin to confirm"), never smoothed over with filler.

**Key Characteristics:**
- One 640px measure with a 168px date margin; everything hangs off that sheet.
- Light first (engineering pad); dark is the same notebook at night, never a different world.
- One brand colour: blueprint ultramarine `#1E34B4`, as pen ink (links, the primary action, drawing strokes) and as two blueprint sheets on home (the sketch and Contact).
- Pen (solid) means on the record; pencil (dashed, graphite) means draft.
- Mono only where an engineer would write mono: margin dates, figures, code, drawing labels.
- Flat pages; only clipped-on objects lift.

## Colors

A green-white pad, green-black ink and a single blueprint ultramarine (the brand colour, also used on the resume and share card); graphite is reserved for drafts.

### Primary
- **Technical Pen Blue** (`technical-pen-blue`): links, the one filled primary button per screen, pen strokes in sketches and drawings, the selected rule on the index card, focus rings. Lightens to `technical-pen-blue-dark` at night.
- **Pen Wash** (`pen-wash`): the faint blue fill behind a selected index-card row and the active drawing part. Never a section background.
- **Blueprint** (`blueprint`): the brand ultramarine as a surface. Exactly two sheets on home carry it: the system sketch and the Contact block, with a white 16px grid (`blueprint-line`, 14% white). Also the fill of the primary button in both themes (deepens to `blueprint-dark` at night so white text holds 7.7:1).
- **Blueprint Ink / Soft / Own** (`blueprint-ink`, `blueprint-soft`, `blueprint-own`): white pen lines and primary text on a blueprint sheet (9.0:1), soft-blue secondary text (6.4:1), and the lighter fill of the node Chin built (secondary text on it stays at 5.2:1, 5.0:1 at night).

### Neutral
- **Engineering Pad** (`engineering-pad`): the page. Also the text colour on the primary button.
- **Pad Shade** (`pad-shade`): code-block background and the ruled lines between index-card rows.
- **Clipped Card** (`clipped-card`): surfaces that sit on top of the page: the index card, link previews, the photo print's mount.
- **Green-Black Ink** (`green-black-ink`): headings and primary text.
- **Ink Soft** (`ink-soft`): body copy, descriptions, Experience highlights.
- **Margin Grey** (`margin-grey`): margin dates, meta lines, captions, the muted "+" of disclosures.
- **Ruled Line** (`ruled-line`): 1px rules, card borders, the TOC rail.
- **Control Edge** (`control-edge`): the border of outline buttons, dark enough (2.6:1, 3.1:1 at night) that a low-vision visitor sees the button's edge, not just its label.
- **Graph Grid** (`graph-grid`): the 16px grid inside sketches and technical drawings only.
- **Pencil Graphite** (`pencil-graphite`): dashed draft parts, draft chips and draft links in drawings.

### Named Rules
**The One Colour Rule.** Blueprint ultramarine is the only chromatic colour on the page, as ink or as a sheet. If something else wants colour, it gets ink weight instead.

**The Two Sheets Rule.** The blueprint surface appears twice on home and nowhere else: the opening sketch and the closing Contact block, so the page starts and ends on the brand colour. A third blue region dilutes both.

**The Pen and Pencil Rule.** Solid pen blue marks a fact that is on the record; dashed pencil graphite marks a draft for Chin to confirm. Never use pencil for decoration or pen for a guess.

**The Same Notebook at Night Rule.** Dark mode swaps every value for its `-dark` twin and changes nothing else: same layout, same rules, same single accent.

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui)
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, SFMono-Regular)

Both are self-hosted WOFF2 Latin subsets with `font-display: swap`. Schibsted Grotesk is one variable file (400 to 600) split in two: a core file (ASCII and the punctuation the site sets), preloaded, and the rest of Latin-1, which a page fetches only when it uses one of those letters.

**Character:** One sturdy, slightly editorial grotesk for everything a person reads, and a plain engineering mono for everything a person would log: dates, figures, code. The contrast between the two is the system's whole typographic voice.

### Hierarchy
- **Hero** (600, clamp 2.5–4.5rem, 1.02, -0.035em): the home headline only, about 15ch wide, the loudest type on the site.
- **Display** (600, clamp 2.125–2.75rem, 1.15, -0.024em): page titles of Case Studies and Posts. Balanced wrapping, about 18ch wide.
- **Headline** (600, 1.5rem, 1.25): section headings inside a Post.
- **Headline** on home (600, 1.5rem): home section heads (Selected Work, Experience, Contact) and the title of the Selected Work entry that has a Case Study.
- **Title** (600, 1.25rem, 1.4): Case Study section heads. Small on purpose; the margin carries the structure.
- **Body** (400, 1.0625rem / 17px, 1.6): all reading text, set on the 640px measure. Drops to 16px under 40rem.
- **Body small** (400, 0.9rem, 1.5): meta lines, buttons, captions, open items.
- **Margin date** (IBM Plex Mono 400, 0.8125rem, tabular figures): ISO dates (`2025-02`) right-aligned in the margin; Case Study section numbers `01`–`06`.
- **Figure** (IBM Plex Mono 500, clamp 2.25–3.25rem in the home sketch, 1.75–2.25rem elsewhere, -0.035em): real numbers drawn in sketches (500k+, 47).

### Named Rules
**The Logbook Mono Rule.** Mono appears only for margin dates, figures, code and drawing part letters. Labels, nav, buttons and tags are always the body face.

**The Quiet Heading Rule.** Section heads stay at Headline size against a Hero headline three times their size. Hierarchy comes from that jump, the margin and the gaps, not from shouting.

## Layout

The page is a sheet: a 168px margin column, a 32px gap, and a 640px measure, centred with growing gutters (32px desktop, 24px under 60rem, 16px under 40rem). Every entry (a project, a role, a Post, a Case Study section) puts its date or number in the margin and its content on the measure, through CSS subgrid so the two always align. Only the technical drawing is allowed to span margin and measure together.

Sections are separated by large gaps (128px desktop, 80px under 60rem, 64px under 40rem) rather than rules; entries within a list are 64px apart. Under 60rem the margin collapses into the column: dates sit above their entry, left-aligned, and the sheet becomes one column.

The hero is the headline, one sentence and the actions, then the first log entry. On desktop the margin beside the headline holds who and where: the photo print, then the location and availability in small type, right-aligned. On small screens the print (72px) and that note sit side by side above the headline. The headline is on the page at first paint and never animates; the sentence, the actions and the print settle in under it (320ms ease-out, 50ms apart), once per session.

Selected Work comes in two groups, each under a quiet group head on the measure (body size, 600, Ink Soft, with a 1px Ruled Line above it): "Election coverage" (the Thai PBS election work, with the previews and the Case Study) and "Other work" (entries with no live page to show, set closer together: 40px apart, 24px on phones). Groups sit 96px apart (64px under 60rem). Within a group, size carries the hierarchy: the entry with a Case Study gets a Headline-size title and the only large link preview, every other entry with a live page gets the compact one, and an on-site print stays at its own size. Each destination is linked once per entry: titles are plain text, the Case Study is a "Read the case study" text link, and the live page is its preview (or a "Live site" link when there is no share image).

The sketch and the Selected Work entry for the same project never repeat each other: the sketch carries the figures (47 races, 500k+), so the entry says how the system worked.

### Named Rules
**The Margin Carries It Rule.** If a piece of content has a date, a number or a sequence, that marker goes in the margin. Nothing else does.

## Elevation & Depth

The page is flat. Depth comes from 1px ruled lines, the graph-grid patch, and borders. Exactly one lifted layer exists, for objects clipped onto the page: the index card (⌘K), the photo print, on-site prints, and any future overlay. Link previews and open items stay flat with a border.

### Shadow Vocabulary
- **Clipped-on** (`box-shadow: 0 1px 0 rgb(24 32 27 / 0.06), 0 14px 32px -12px rgb(24 32 27 / 0.28)`; night: `0 1px 0 rgb(0 0 0 / 0.3), 0 16px 36px -12px rgb(0 0 0 / 0.7)`): the index card, the photo print and on-site prints only.

### Named Rules
**The Clipped-On Rule.** A shadow means "this object sits on top of the notebook." If it is part of the page, it gets a border, not a shadow.

## Shapes

Corners are small and practical: 6px (`md`) for buttons, cards, previews and open items; 3px (`sm`) for sketch nodes, drawing parts and on-site prints. Only the portrait is round (`full`). Lines are 1px rules and 1.25px pen strokes with round caps. Drafts are dashed. The technical drawing has a double frame (a 1px ink border with a 3px-offset ruled outline), a title block and lettered circular part markers. No pills, no large radii, no blobs.

## Components

### Buttons
Precise and quiet.
- **Shape:** gently squared (6px), 44px tall, 16px side padding, body-small medium weight.
- **Primary:** Blueprint fill with Blueprint Ink text. One per screen: "Resume (PDF)" on home, "Copy email" at a Case Study's end.
- **Outline:** transparent with a Control Edge border and ink text (GitHub, Copy email).
- **States:** press scales to 0.97 in 140ms ease-out; outline hover darkens the border to Ink Soft (fine pointers only); focus is a 2px pen-blue ring at 3px offset, instant.
- **Copy button:** the label and "Copied" share one grid cell so width never jumps; the swap is a 180ms fade-and-nudge, announced to screen readers.

### Link Preview (clipping)
The live page's own og:image pasted in like a link in chat.
- **Shape:** 6px corners, 1px Ruled Line border, Clipped Card surface, max 26rem wide (34rem on a Case Study).
- **Content:** the share image (shown 40:21, cropped to fit), then the project title and the host plus path in Margin Grey, truncated on one line. The image is WebP at 400, 640 and full width with a `sizes` hint, a JPEG fallback, and its real pixel size as `width`/`height`.
- **Compact:** the same clipping with a 9rem thumbnail (7.5rem on phones) beside the title and host, the image filling the card's height. Used on home for every entry that has no Case Study.
- **States:** hover turns the border and title Technical Pen Blue (fine pointers); press scales to 0.99.
- Shown only for projects with a public URL and a real og:image; otherwise a plain "Live site" text link.

### Open Item (gap)
An honest hole in the record.
- A dashed Margin Grey border, 6px corners, an empty 12px checkbox, then "**Chin to write:**" or "**Chin to confirm:**" and the missing fact, in body-small.
- Used for every TODO in content. Never replaced with placeholder prose.

### Navigation
- **Top bar:** wordmark (name, shortened to "Chin" under 24rem), then Work, Writing, Contact in body-small Ink Soft, the "Search ⌘K" trigger (named for what a visitor expects; inside, the card is still the index) and the theme toggle. All targets 44px. The footer says "Press ⌘K to search".
- **Mobile:** the section links hide and the same trigger reads "Menu"; without JS the plain links stay. On touch the card opens without focusing the search field (so the keyboard stays down) and lists the "Do" group (Copy email address, theme) first; long labels wrap. The writing index appears in the card only once a Post exists, like the nav link.
- **Index card (⌘K):** a 560px Clipped Card with the clipped-on shadow, a pen-blue rule under the search field, entries on ruled lines grouped "Go to" and "Open"; the selected row gets Pen Wash and a 2px pen-blue edge. Enters in 180ms ease-out (fade, scale 0.98, 6px drop) with its scrim on the same timing, exits in 120ms; opacity only under reduced motion. Full keyboard support, focus trapped and returned. A tap on "Menu" before the card's island has hydrated is kept and opens the card once it is ready.

### Pen Sketch (signature)
The system drawn as the first log entry, on a blueprint sheet: three nodes in white pen joined by white leads (Results worker, built by me → S3 + CloudFront, 47 races served as cached JSON ← Traffic, 500k+), the same flow as the Case Study's drawing. Node fills match the sheet so the grid stops at their edges and the figures read clean; the node Chin built gets the lighter Blueprint Own fill. Nodes settle in one by one and leads ink in left to right, once per session. Stacks vertically on phones.

### Contact Sheet
The page's closing bookend, a second blueprint sheet on the measure: the "Contact" head in Blueprint Ink, the availability and closing summary in Blueprint Soft, the email set large (clamp 1.5–2.5rem, 600) as a white underlined link with an outline Copy email button beside it, then GitHub, LinkedIn and Resume (PDF) as white links. Focus rings and selection turn white on the sheet. 40px padding (24/16px on phones).

### Case Study End
Where a convinced reader acts. A ruled line, then "Talk to me about this system" at Headline size, then Copy email (the one primary), Resume (PDF) and LinkedIn as buttons, then "Open the live results" and "Back to home" as text links.

### Technical Drawing (Case Study)
A drafting sheet spanning margin and measure: lettered parts A–D as buttons (44px+), pen for facts, dashed pencil for drafts, a legend and a title block, a note panel that opens on the part Chin built (`own`) and changes when a part is hovered, focused or tapped (the other parts recede: pen lines fade and their text drops to Margin Grey, never below 4.5:1), and "The drawing as text" disclosure as the accessible equivalent.
- **Chips** inside a part follow the part: a solid Ruled Line border and Ink Soft text on the record, dashed Pencil Graphite in a draft. The legend and the help line mention pencil only when the drawing has a draft part.
- **Note panel:** every note sits in one grid cell, so the panel is as tall as the longest note and nothing below it moves; the 1px pen rule belongs to the note on show and ends where it ends. The old note fades out in 90ms, the new one fades in with a 3px rise in 160ms after 60ms (ease-out; no rise under reduced motion). Without scripting every note is listed. On a phone, where the parts stack, a tap brings the note into view when it is off screen.

### Photo Print
Chin's portrait as a round print clipped into the margin: a 128px circle (`full` radius) with a 4px Clipped Card mount and the clipped-on shadow; 88px above the headline on small screens. The circle is the one exception to the small-corner rule, reserved for the portrait.

### On-site Print
A real photo from the work (on site, on set) clipped onto a Selected Work entry below its link preview: 4:3, max 26rem, 4px Clipped Card mount, 3px corners, the clipped-on shadow, and a one-line caption in Margin Grey. Served as WebP with a JPEG fallback, lazy-loaded with fixed dimensions.

## Do's and Don'ts

### Do:
- **Do** hang every date, number or sequence marker in the 168px margin, in IBM Plex Mono with tabular figures, including how long a role lasted (LinkedIn-style "2 yrs 7 mos", both months counted).
- **Do** keep one filled pen-blue primary button per screen; everything else is outline or a link.
- **Do** draw unconfirmed facts in dashed pencil graphite and label them "Chin to confirm".
- **Do** show missing content as an Open Item with an empty checkbox.
- **Do** animate only `transform` and `opacity`, under 300ms for UI (enter ease-out, exit faster), with a `prefers-reduced-motion` fallback for everything.
- **Do** keep hover effects inside `@media (hover: hover) and (pointer: fine)` and every target at 44px; an inline link grows its hit area vertically (padding of `(44px - 1.15em) / 2`, cancelled by a negative margin) so the line never moves.
- **Do** use a project's own og:image for its preview, and only screenshots of public pages.

### Don't:
- **Don't** introduce a second accent colour, gradients or tinted section backgrounds.
- **Don't** use mono for labels, nav, buttons or tags.
- **Don't** put a shadow on anything that is part of the page; only clipped-on objects lift.
- **Don't** use pills, large radii (the round portrait is the only exception), card grids of identical rounded boxes, or cards inside cards.
- **Don't** add eyebrow labels, tracked capitals, middle-dot meta strings or arrows glued to link text.
- **Don't** invent a number, quote, logo, latency figure or architecture detail to fill a gap.
- **Don't** make dark mode a different design; it is the same notebook at night.
