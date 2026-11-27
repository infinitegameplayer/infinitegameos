---
title: What reaches a Next 16 proxy on Vercel, and what it can trust
track: knowledge
area: proxy, logging, vercel, privacy
date: 2026-11-27
files:
  - src/proxy.ts
  - src/lib/agent-log/writer.ts
  - src/lib/agent-log/row.ts
  - src/lib/agent-log/agent-log.test.ts
  - src/lib/agent-log/request-path.test.ts
---

## Context

The agent log (the Kingdom's Agent Visit Log plan) widened `src/proxy.ts` from four nonce routes to every page, so it could record which software reads the site without storing an IP address. Before building, a spike branch (`spike/agent-visit-log-0b`, preview only, never merged) printed what the proxy actually saw on a Vercel preview, on 2026-11-27. These are the readings, so no one has to rediscover them.

## Guidance

- **The proxy runs on a CDN cache hit.** Two GETs to a prerendered page both answered `X-Vercel-Cache: HIT` and both reached the proxy. One request, one invocation.
- **`event.waitUntil` works.** Work handed to it ran about 300 ms after the response, every time. Pass the event through: `proxy(request, event?)`, with the event optional so tests can call the proxy bare.
- **Vercel overwrites every forged client-IP header.** A request carrying forged `X-Forwarded-For`, `X-Real-IP` and `X-Vercel-Forwarded-For` arrived with all three replaced by the true address. Read `x-real-ip` (`src/lib/agent-log/writer.ts`); never the leftmost `X-Forwarded-For` from anywhere else. `request-path.test.ts` holds this.
- **Next strips the RSC markers before the proxy sees them.** A client navigation arrives with no `rsc` header and no `_rsc` query: it looks like a plain GET to the page, told apart only by `Sec-Fetch-Dest: empty` and a surviving `next-url` header.
- **Prefetches must be left out in the matcher.** Next's own `missing` conditions do it (`next-router-prefetch`, `purpose: prefetch`, `sec-purpose` containing `prefetch`). A browser load, hover and click sent 88 same-origin requests; 3 reached the proxy (two documents, one click), no prefetch.
- **The proxy runs before `beforeFiles` rewrites and after redirects.** An agent asking for `/the-os` with `Accept: text/markdown` is seen as `/the-os`, not `/markdown/the-os`. A redirected request is never seen at all.
- **No bot verdict reaches the proxy on this plan.** Vercel's `x-vercel-verified-bot` and `x-vercel-bot-*` headers reach code only on Priority projects. A `Signature-Agent` header is a claim the proxy can read, never a verified one.
- **Headers present on every request** include `x-vercel-ip-country` and `x-vercel-ja4-digest` (a TLS fingerprint, unused).

## Why it matters

The proxy is the live request layer for every page. Each fact above is one a wrong assumption would turn into a silent bug: a log that misses cached pages, a forgeable address, a flood of prefetch rows or a nonce policy that drifts with the matcher. The nonce rule now lives in `isNonceRoute()` (`src/lib/csp.ts`), never in the matcher.

## When to apply

Any change to `src/proxy.ts`, its matcher, or anything the proxy reads from a request. The same holds on lanebelone and sidequesthq when they gain the logger.

## Known limits, carried

- Requests answered by a redirect are never logged.
- The daily salt outlives its day when logging stops (the kill switch, or a day with no traffic), until something next calls `page_request_salt()`. Open for the King's ruling as of 2026-11-27.
- Open Graph image routes (`/opengraph-image`, per-slug image routes) are logged, and carry no `Sec-Fetch-Dest`, so a count of "documents" must leave them out.
