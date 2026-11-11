# The site's content files are the single source of truth

The same career facts lived in three places that drifted apart: the old resume script (now `private/scripts/build-resume.cjs`), the site content (`src/content/profile.yaml`, `src/content/work/*.md`), and LinkedIn. We decided (2026-11-10, Chin's call in grill round 1) that `src/content/` is the only place facts are edited: the resume PDF is generated from it, and LinkedIn text is generated from it for Chin to approve and apply section by section.

## Considered Options

- **Resume .docx as the source, site copies from it**: keeps Word editing, but .docx is hard to parse reliably and the site would need a manual sync on every change.
- **Three separate copies, synced by hand**: no work now, and exactly the drift this decision ends.

## Consequences

- Facts that only belong on the resume (phone number, education detail) still live in `src/content/`, marked so the site does not render them; the public PDF stays phone-free.
- LinkedIn cannot be written to automatically in a reliable way, so it remains a reviewed, manual step fed by generated text.
