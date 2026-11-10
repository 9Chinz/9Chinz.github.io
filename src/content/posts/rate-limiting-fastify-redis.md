---
title: Rate-limiting a Fastify API with Redis
date: 2026-11-03
summary: A sliding-window limiter in forty lines, and the two edge cases that bite in production.
# A sample Post for judging the blog's typography. Drafts show in `pnpm dev` only.
draft: true
---

Fixed windows are easy to write and easy to fool. A client that sends its whole quota in the last second of one window and again in the first second of the next gets double the rate you meant to allow.

## Why a sliding window

A sliding window counts requests in the last N seconds from now, not since the top of the minute. With a Redis sorted set, each request is a member scored by its timestamp, and the count is everything newer than now minus N.

## The limiter

```ts title="src/plugins/rate-limit.ts"
import type { FastifyInstance } from "fastify";

export async function rateLimit(app: FastifyInstance, limit = 100, windowMs = 60_000) {
  app.addHook("onRequest", async (req, reply) => {
    const key = `rl:${req.ip}`;
    const now = Date.now();
    const [, , count] = await app.redis
      .multi()
      .zremrangebyscore(key, 0, now - windowMs)
      .zadd(key, now, `${now}:${Math.random()}`)
      .zcard(key)
      .pexpire(key, windowMs)
      .exec()
      .then((r) => r!.map(([, v]) => v as number));

    if (count > limit) {
      reply.header("retry-after", Math.ceil(windowMs / 1000));
      return reply.code(429).send({ error: "Too many requests" });
    }
  });
}
```

Everything runs in one MULTI, so the trim, the insert and the count see the same state. The random suffix keeps two requests in the same millisecond from collapsing into one member.

## Edge cases

- Behind a load balancer, req.ip is the balancer unless trustProxy is set.
- Rejected requests still add a member, so a client that keeps hammering stays limited. That is usually what you want.

> Count what you mean to limit, and nothing else.

## Wrapping up

Forty lines, one round trip per request, and no double-rate seam at the window edge.
