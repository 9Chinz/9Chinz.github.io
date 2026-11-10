// PROTOTYPE. Real content shared by all four design directions.
// Source: resume-draft-v2 + LinkedIn (2026-11-10). Never add a number, quote or logo
// that is not here; unknown facts are marked TODO_CHIN and must render as visible gaps.

export const profile = {
  name: "Chinnapat Limprathan",
  shortName: "Chin",
  role: "Mid-level Software Developer",
  employer: "INOX",
  location: "Bangkok, Thailand",
  availability: "Open to full-stack or backend roles, hybrid or remote",
  headline: "I build the systems behind products millions of people use.",
  summary:
    "Full-stack TypeScript developer at INOX, building Thai PBS's election platforms, gamification systems and AI newsroom tools. I care about request latency and database queries as much as how a dashboard feels to the person using it.",
  exploring: "Distributed systems design, event-driven architecture, and GenAI integrations for production workloads.",
  email: "MR.Chinnapat@hotmail.com",
  links: {
    github: "https://github.com/9Chinz",
    linkedin: "https://www.linkedin.com/in/chinnapat",
    resume: "/resume.pdf",
  },
  coreStack: ["TypeScript", "React", "Node.js", "Fastify", "MongoDB", "Docker", "Kubernetes", "ArgoCD", "AWS", "Cloudflare", "Python"],
};

// The only hard metrics we have. Each is verbatim from the resume/LinkedIn.
export const facts = [
  { value: "500k+", label: "peak concurrent requests on Local Election 68 night" },
  { value: "50", label: "Bangkok districts on the hex-tile results map" },
  { value: "47", label: "provincial chief races reported live in Local Election 68" },
  { value: "80%", label: "less manual newsroom workload from AI editorial tools (LinkedIn)" },
];

export type Experience = {
  org: string;
  place: string;
  roles: { title: string; start: string; end: string }[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    org: "Innovative Extremist (INOX)",
    place: "Chatuchak, Bangkok · Hybrid",
    roles: [
      { title: "Mid-level Software Developer", start: "2026-09", end: "Present" },
      { title: "Software Developer", start: "2024-05", end: "2026-09" },
    ],
    highlights: [
      "Built the backend for Local Election 68's real-time reporting platform solo, sustaining 500k+ peak concurrent requests on election night.",
      "Built frontend and backend for the live Bangkok Governor & Council Election 69 results site, including a 50-district hex-tile map.",
      "Migrated Next Station BKK to TypeScript, Vite and TanStack Router; drew a custom SVG district map and set up the BFF layer.",
      "Owned The Heroes SS3 gamification platform end to end: quests, quiz engine, login streaks, back-office dashboard, ArgoCD/Kustomize CI/CD.",
      "Built Thai PBS's AI editorial backends solo: Gemini news summarisation, Google TTS audio, and a karaoke-style Read Along.",
    ],
  },
  {
    org: "King Mongkut's Institute of Technology Ladkrabang",
    place: "Lat Krabang, Bangkok",
    roles: [{ title: "Teacher Assistant (part-time)", start: "2023-12", end: "2024-03" }],
    highlights: ["Assisted teaching STM32 microcontroller courses in C; graded labs and supervised lab exams."],
  },
  {
    org: "Sufcreate co., ltd.",
    place: "Bangkok · Remote",
    roles: [{ title: "Freelance Software Developer", start: "2022-08", end: "2022-12" }],
    highlights: [
      "Built a football penalty game web app for The Mall Group's FIFA World Cup Qatar 2022 campaign, integrated with the M Card loyalty app, with zero downtime through the campaign.",
    ],
  },
];

export const education = {
  school: "King Mongkut's Institute of Technology Ladkrabang",
  degree: "B.Eng. Computer Engineering",
  gpa: "3.6",
  end: "2024-03",
};

export type Work = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  oneLiner: string;
  stack: string[];
  url?: string;
  image?: string; // public path, real screenshot of a public page
  hasCaseStudy: boolean;
};

export const work: Work[] = [
  {
    slug: "local-election-68",
    title: "Local Election 68 live results",
    client: "Thai PBS",
    year: "2025",
    role: "Sole backend developer",
    oneLiner: "Real-time results for 47 provincial chief races and 76 provincial councils, holding 500k+ concurrent requests on election night.",
    stack: ["TypeScript", "Node.js"], // TODO_CHIN: confirm the rest of the stack
    url: "https://www.thaipbs.or.th/localelection/home",
    hasCaseStudy: true,
  },
  {
    slug: "bkk-election-69",
    title: "Bangkok Governor Election 69 results",
    client: "Thai PBS",
    year: "2026",
    role: "Frontend and backend",
    oneLiner: "Live results for the Bangkok Governor and council races, with a 50-district hex-tile map and district search.",
    stack: ["TypeScript"], // TODO_CHIN: confirm stack
    url: "https://www.thaipbs.or.th/bkkelection69/result",
    image: "/prototype/shots/result-district.png",
    hasCaseStudy: false,
  },
  {
    slug: "next-station-bkk",
    title: "Next Station BKK",
    client: "Thai PBS",
    year: "2026",
    role: "Frontend migration and BFF",
    oneLiner: "Citizens review life in Bangkok, district by district, as a brief for the next governor.",
    stack: ["TypeScript", "Vite", "TanStack Router", "SVG"],
    url: "https://www.thaipbs.or.th/bkkelection69/review/",
    image: "/prototype/shots/review-reflections.png",
    hasCaseStudy: false,
  },
  {
    slug: "heroes-ss3",
    title: "The Heroes SS3",
    client: "INOX",
    year: "2025",
    role: "Full vertical owner",
    oneLiner: "Gamification platform with quests, a quiz engine and login streaks, plus the back office and CI/CD behind it.",
    stack: ["TypeScript", "ArgoCD", "Kustomize", "Cloudflare R2"], // TODO_CHIN: confirm the rest
    hasCaseStudy: false,
  },
  {
    slug: "thaipbs-ai-editorial",
    title: "AI editorial tools",
    client: "Thai PBS",
    year: "2025",
    role: "Sole backend developer",
    oneLiner: "News summarisation with Gemini, English audio with Google TTS, and a karaoke-style Read Along built on speech-to-text.",
    stack: ["Node.js", "Google Gemini", "Google TTS", "STT"],
    hasCaseStudy: false,
  },
];

// Case study shell: only facts we have. Sections the owner must write are TODO_CHIN,
// and variants must show them as clearly-marked gaps, not as filler prose.
export const caseStudy = {
  slug: "local-election-68",
  title: "Local Election 68 live results",
  client: "Thai PBS",
  date: "February 2025",
  role: "Sole backend developer on a 2-person team. A senior engineer handled infrastructure planning.",
  url: "https://www.thaipbs.or.th/localelection/home",
  stack: ["TypeScript", "Node.js"], // TODO_CHIN: confirm the rest of the stack
  outcome: "Held 500k+ peak concurrent requests on election night while keeping cloud cost down.",
  sections: [
    {
      heading: "The problem",
      body: "On 1 February 2025, 47 provinces elected their provincial administrative chiefs and 76 elected provincial councils. Thai PBS needed one public page that showed every race updating live, on a night when traffic arrives all at once.",
    },
    { heading: "My role", body: "I built the backend on my own. A senior engineer planned the infrastructure. TODO_CHIN: what the backend covered (ingestion, API, caching?)." },
    { heading: "Architecture", body: "TODO_CHIN: diagram and one paragraph on how results flow from source to page." },
    { heading: "Key decisions", body: "TODO_CHIN: two or three trade-offs, e.g. what was cached where, and why." },
    { heading: "Results", body: "The platform held 500k+ peak concurrent requests on election night. TODO_CHIN: latency, error rate or cost figures, if you can share them." },
    { heading: "What I'd change", body: "TODO_CHIN: one honest lesson." },
  ],
};

export const posts = [
  { slug: "sample-post", title: "Rate-limiting a Fastify API with Redis", date: "2026-11-03", readingMinutes: 6, summary: "A sliding-window limiter in forty lines, and the two edge cases that bite in production.", sample: true },
  { slug: "sample-post", title: "Drafting: notes on TanStack Router migrations", date: "2026-10-12", readingMinutes: 4, summary: "Sample entry for the index layout.", sample: true },
  { slug: "sample-post", title: "Drafting: what a hex map gets right", date: "2026-09-28", readingMinutes: 5, summary: "Sample entry for the index layout.", sample: true },
];

// SAMPLE post body for judging blog typography. Generic technique, not a claim about Chin's work.
export const samplePost = {
  title: "Rate-limiting a Fastify API with Redis",
  date: "2026-11-03",
  readingMinutes: 6,
  note: "Sample post for the prototype. Replace with a real one.",
  toc: ["Why a sliding window", "The limiter", "Edge cases", "Wrapping up"],
  blocks: [
    { type: "p", text: "Fixed windows are easy to write and easy to fool. A client that sends its whole quota in the last second of one window and again in the first second of the next gets double the rate you meant to allow." },
    { type: "h2", text: "Why a sliding window" },
    { type: "p", text: "A sliding window counts requests in the last N seconds from now, not since the top of the minute. With a Redis sorted set, each request is a member scored by its timestamp, and the count is everything newer than now minus N." },
    { type: "h2", text: "The limiter" },
    {
      type: "code",
      lang: "ts",
      file: "src/plugins/rate-limit.ts",
      text: `import type { FastifyInstance } from "fastify";

export async function rateLimit(app: FastifyInstance, limit = 100, windowMs = 60_000) {
  app.addHook("onRequest", async (req, reply) => {
    const key = \`rl:\${req.ip}\`;
    const now = Date.now();
    const [, , count] = await app.redis
      .multi()
      .zremrangebyscore(key, 0, now - windowMs)
      .zadd(key, now, \`\${now}:\${Math.random()}\`)
      .zcard(key)
      .pexpire(key, windowMs)
      .exec()
      .then((r) => r!.map(([, v]) => v as number));

    if (count > limit) {
      reply.header("retry-after", Math.ceil(windowMs / 1000));
      return reply.code(429).send({ error: "Too many requests" });
    }
  });
}`,
    },
    { type: "p", text: "Everything runs in one MULTI, so the trim, the insert and the count see the same state. The random suffix keeps two requests in the same millisecond from collapsing into one member." },
    { type: "h2", text: "Edge cases" },
    { type: "ul", items: ["Behind a load balancer, req.ip is the balancer unless trustProxy is set.", "Rejected requests still add a member, so a client that keeps hammering stays limited. That is usually what you want."] },
    { type: "quote", text: "Count what you mean to limit, and nothing else." },
    { type: "h2", text: "Wrapping up" },
    { type: "p", text: "Forty lines, one round trip per request, and no double-rate seam at the window edge." },
  ],
};
