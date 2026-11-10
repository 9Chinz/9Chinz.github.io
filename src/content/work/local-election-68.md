---
title: Local Election 68 live results
client: Thai PBS
year: 2025
role: Sole backend developer
summary: Real-time results for 47 provincial chief races and 76 provincial councils, holding 500k+ concurrent requests on election night.
stack:
  - TypeScript
  - Node.js
stackToConfirm: the rest of the stack.
url: https://www.thaipbs.or.th/localelection/home
og: /images/og/local-election-68.jpg
ogAlt: Share image of the live Local Election 68 results page
order: 1

# Having this block is what gives the work item its own Case Study page at /work/local-election-68.
caseStudy:
  date: 2025-02
  roleDetail: Sole backend developer on a 2-person team. A senior engineer handled infrastructure planning.
  outcome: Held 500k+ peak concurrent requests on election night while keeping cloud cost down.

  # The technical drawing, shown after the section named in `after`.
  # draft: false is drawn in pen (on the record); draft: true in dashed pencil (Chin to confirm).
  # `note` is what the note panel says for a part; `confirm` adds a "Chin to confirm" open item.
  drawing:
    after: Architecture
    parts:
      - id: source
        ref: A
        label: Results source
        draft: true
        confirm: where the live results came from, and how often they arrived.
      - id: backend
        ref: B
        label: Backend
        sub: Built solo by Chin
        draft: false
        chips:
          - ingestion?
          - API?
          - caching?
        note: I built the backend on my own. A senior engineer planned the infrastructure.
        confirm: what the backend covered (ingestion, API, caching?).
      - id: page
        ref: C
        label: One public page
        sub: 47 provincial chief races
        draft: false
        note: On 1 February 2025, 47 provinces elected their provincial administrative chiefs and 76 elected provincial councils. Thai PBS needed one public page that showed every race updating live, on a night when traffic arrives all at once.
      - id: traffic
        ref: D
        label: Traffic
        sub: 500k+ peak concurrent requests
        draft: false
        note: Held 500k+ peak concurrent requests on election night while keeping cloud cost down.
    links:
      - from: source
        to: backend
        draft: true
      - from: backend
        to: page
        draft: false
      - from: traffic
        to: page
        label: 500k+
        draft: false
    # The last line of "The drawing as text", the accessible version of the drawing.
    summary: Traffic, 500k+ peak concurrent requests, reaches the public page (C), which the backend (B) serves. How results reach the backend from their source (A) is a draft.
---

## The problem

On 1 February 2025, 47 provinces elected their provincial administrative chiefs and 76 elected provincial councils. Thai PBS needed one public page that showed every race updating live, on a night when traffic arrives all at once.

## My role

I built the backend on my own. A senior engineer planned the infrastructure.

TODO: what the backend covered (ingestion, API, caching?).

## Architecture

TODO: one paragraph on how results flow from source to page, and confirm the pencil parts of the drawing below.

## Key decisions

TODO: two or three trade-offs, e.g. what was cached where, and why.

## Results

The platform held 500k+ peak concurrent requests on election night.

TODO: latency, error rate or cost figures, if you can share them.

## What I'd change

TODO: one honest lesson.
