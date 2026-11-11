---
title: Local Election 68 live results
client: Thai PBS
year: 2025
role: Results worker (backend)
# Home only. The sketch above it already shows the 47 races and 500k+, so this says how the worker did it.
summary: Live results for the provincial chief and council races. My worker turned hand-entered SeaTable results into versioned JSON on S3, each update a new path cached for 30 days, with only a small index refreshed every 10 seconds, so every reader was served from CloudFront.
stack:
  - TypeScript
  - Node.js
  - SeaTable API
  - AWS S3
  - CloudFront
  - Docker
url: https://www.thaipbs.or.th/localelection/home
og: /images/og/local-election-68.jpg
ogAlt: Share image of the live Local Election 68 results page
order: 1
group: elections

# Having this block is what gives the work item its own Case Study page at /work/local-election-68.
# TODO(source): Chin is finding the evidence for "500k+ peak concurrent requests" (CloudFront metrics or the team's report).
caseStudy:
  date: 2025-02
  roleDetail: I built the results worker. Teammates built the Next.js results page, and a senior engineer planned the infrastructure.
  outcome: Held 500k+ peak concurrent requests on election night by serving every read from CloudFront-cached JSON.

  # The technical drawing, shown after the section named in `after`.
  # draft: false is drawn in pen (on the record); draft: true in dashed pencil (Chin to confirm).
  # `note` is what the note panel says for a part; `confirm` adds a "Chin to confirm" open item.
  # `own: true` marks the part Chin built; the drawing opens with its note showing.
  drawing:
    after: Architecture
    parts:
      - id: source
        ref: A
        label: SeaTable
        sub: Results entered by hand
        draft: false
        note: Thai PBS staff entered results by hand into SeaTable. A local election has no central results API.
      - id: worker
        ref: B
        label: Results worker
        sub: Built by Chin
        own: true
        draft: false
        chips:
          - cron
          - datasets
          - S3 upload
        note: Cron jobs read SeaTable every 30 to 60 seconds, turned the rows into result datasets and wrote each one to S3 as JSON. If SeaTable was down, the worker kept the last good data instead of publishing empty results.
      - id: cdn
        ref: C
        label: S3 + CloudFront
        sub: Revisions cached 30 days, index 10 s
        draft: false
        note: Every update was a new path named by date and time, cached for 30 days as immutable. Only index.json changed, with a 10-second cache, so readers fetched just what was new.
      - id: traffic
        ref: D
        label: Readers
        sub: 500k+ peak concurrent requests
        draft: false
        note: Readers' browsers loaded the results page my teammates built, polled index.json and fetched the changed files, all from CloudFront.
    links:
      - from: source
        to: worker
        draft: false
      - from: worker
        to: cdn
        draft: false
      - from: traffic
        to: cdn
        label: 500k+
        draft: false
    # The last line of "The drawing as text", the accessible version of the drawing.
    summary: The worker (B) reads results from SeaTable (A) and publishes them to S3 behind CloudFront (C). Readers (D), 500k+ peak concurrent requests, read only from CloudFront.
---

## The problem

On 1 February 2025, 47 provinces elected their provincial administrative chiefs and 76 elected provincial councils. Thai PBS needed one public page that showed every race updating live, on a night when traffic arrives all at once.

## My role

I built the results worker: the SeaTable client, the cron jobs, the result datasets and the publishing to S3. Teammates built the Next.js results page, and a senior engineer planned the infrastructure.

## Architecture

Thai PBS staff entered results by hand into SeaTable. Every 30 to 60 seconds, cron jobs in the worker read SeaTable and turned the rows into datasets: each provincial chief race, the council results, area groups, and the closest margins and landslides. Each dataset went to S3 as JSON under a new path named by date and time, behind CloudFront. A small `index.json` listed the latest revision of every dataset; the results page polled it and fetched only what had changed.

## Key decisions

- **Static JSON on S3 instead of a live API.** Election-night reads never reached a server, so the traffic was CloudFront's to carry. The trade-off: results are only as fresh as the last cron run.
- **Immutable revisions, one small index.** Every update got a new path cached for 30 days; only `index.json` changed, with a 10-second cache. The trade-off: a reader can be up to about 10 seconds behind.
- **Fall back to the last good data.** If SeaTable failed, the worker kept serving what was already on S3 instead of publishing empty results.
- **Rehearse with fake results.** A bot posted random scores before election night, so the whole pipeline ran end to end before the real count.

## Results

The page held 500k+ peak concurrent requests on election night, served from cache.

TODO: latency, error rate or cost figures, if you can share them.

## What I'd change

TODO: one honest lesson.
