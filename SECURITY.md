# Security — Infinite Game OS

Last checked: 2026-04-10

## Active Security Measures

- HTTP security headers configured in `next.config.ts`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Content-Security-Policy` — strict from day one (no third-party scripts at launch)

## CSP Configuration

Current CSP (strict at launch — no third-party embeds):

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data: https://fonts.gstatic.com;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

`unsafe-inline` for `script-src` is required because:
1. Next.js App Router injects inline scripts for hydration
2. JSON-LD `<script type="application/ld+json">` blocks are inline

**If HubSpot, analytics, or any third-party script is added:** Update CSP before deploying.
The `connect-src`, `script-src`, and possibly `frame-src` directives must be expanded.

## Deferred Items

| Item | Status | Notes |
|---|---|---|
| CSP nonce-based hardening | Deferred | Replace `unsafe-inline` with nonces once site is stable and no third-party scripts interfere |
| Subresource Integrity (SRI) | Deferred | For any CDN-loaded assets added in future |

## No Third-Party Scripts at Launch

This site launches with zero third-party scripts: no HubSpot, no analytics, no embeds.
This is intentional. The site is a knowledge node. If tracking or forms are added later,
revisit CSP before deployment.

## Dependency Sprint Cadence

Next scheduled: 2026-07-01. Aligned with lanebelone.com and sidequesthq.co.

Run `npm audit` and review `npm outdated` at each sprint. Prioritize security patches.
