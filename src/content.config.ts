// The content model. Schemas are strict: an unknown or misspelt field fails the build.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM, e.g. 2025-02");
const image = z.string().regex(/^\/images\/.+\.(jpe?g|png|webp|avif|svg)$/, "Put images under public/images/ and write the path as /images/...");
const sitePath = z.string().regex(/^\/[^\s]*$/, "Use a path on this site, starting with /");
const text = z.string().trim().min(1);

const profile = defineCollection({
  loader: glob({ pattern: "profile.yaml", base: "./src/content" }),
  schema: z.strictObject({
    name: text,
    shortName: text,
    role: text,
    employer: text,
    location: text,
    availability: text,
    headline: text,
    summary: text,
    exploring: text,
    email: z.email(),
    links: z.strictObject({ github: z.url(), linkedin: z.url(), resume: sitePath }),
    photo: z.strictObject({ src: image, alt: text }),
    coreStack: z.array(text),
    sketch: z.strictObject({
      date: month,
      nodes: z
        .array(z.strictObject({ key: text, value: text, detail: text, own: z.boolean().optional(), points: z.enum(["forward", "back"]).optional() }))
        .length(3, "The sketch has exactly three nodes"),
      caption: text,
      link: z.strictObject({ label: text, href: sitePath }),
    }),
    facts: z.array(z.strictObject({ value: text, label: text })),
    education: z.strictObject({ school: text, degree: text, gpa: text, end: month }),
    experience: z
      .array(
        z.strictObject({
          org: text,
          place: text,
          roles: z.array(z.strictObject({ title: text, start: month, end: month.or(z.literal("Present")) })).min(1),
          highlights: z.array(text).min(1),
        }),
      )
      .min(1),
    // Resume-only data: the site does not render any of this. scripts/build-resume.mjs reads it.
    resume: z
      .strictObject({
        summary: text,
        availability: text,
        website: z.url(),
        // Resume bullets per employer (matched by `org`). "**bold**" and "[label](url)" are allowed.
        experience: z.array(z.strictObject({ org: text, place: text, bullets: z.array(text).min(1) })),
        projects: z.array(z.strictObject({ title: text, url: z.url(), start: month, end: month, description: text })),
        skills: z.array(z.strictObject({ label: text, items: z.array(text).min(1) })),
        education: z.strictObject({ place: text, degree: text, coursework: z.array(text).min(1) }),
      })
      .optional(),
  }),
});

const part = z.strictObject({
  id: z.string().regex(/^[a-z0-9-]+$/),
  ref: z.string().regex(/^[A-Z]$/, "A drawing reference is one capital letter"),
  label: text,
  sub: text.optional(),
  draft: z.boolean(),
  chips: z.array(text).optional(),
  note: text.optional(),
  confirm: text.optional(),
});

const drawing = z
  .strictObject({
    after: text,
    parts: z.array(part).min(2),
    links: z.array(z.strictObject({ from: text, to: text, label: text.optional(), draft: z.boolean() })),
    summary: text,
  })
  .superRefine((d, ctx) => {
    const ids = new Set(d.parts.map((p) => p.id));
    for (const l of d.links)
      for (const end of [l.from, l.to])
        if (!ids.has(end)) ctx.addIssue({ code: "custom", message: `Drawing link points to "${end}", which is not a part id` });
  });

const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: z.strictObject({
    title: text,
    client: text,
    year: z.coerce.string().regex(/^\d{4}$/),
    role: text,
    summary: text,
    stack: z.array(text),
    stackToConfirm: text.optional(),
    url: z.url().optional(),
    og: image.optional(),
    ogAlt: text.optional(),
    // Real photos from the work (on site, on set). Each src has a .webp twin next to it.
    photos: z
      .array(z.strictObject({ src: image, alt: text, caption: text, width: z.number().int(), height: z.number().int() }))
      .optional(),
    order: z.number().int(),
    caseStudy: z
      .strictObject({
        date: month,
        roleDetail: text,
        outcome: text,
        drawing: drawing.optional(),
      })
      .optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
  schema: z.strictObject({
    title: text,
    date: z.coerce.date(),
    summary: text,
    draft: z.boolean().default(false),
  }),
});

export const collections = { profile, work, posts };
