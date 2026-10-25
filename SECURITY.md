# Security: Infinite Game OS

Last checked: 2026-04-10

## Active Security Measures

- HTTP security headers configured in `next.config.ts`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Content-Security-Policy`: strict from day one (no third-party scripts at launch)

## CSP Configuration

The policy is built in `src/lib/csp.ts`. `next.config.ts` sends this static form on every path:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com [NEXT_PUBLIC_UMAMI_URL];
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data: https://fonts.gstatic.com;
connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com [NEXT_PUBLIC_UMAMI_URL];
worker-src 'self' blob:;
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

### Nonce routes (option A, 2026-10-25)

`src/proxy.ts` replaces the policy on four exact paths, all `force-dynamic` already: `/preferences`, `/preferences/cancel-email-change`, `/preferences/confirm-email-change` and `/unsubscribe`. On those, `script-src` swaps `'unsafe-inline'` for `'nonce-<value>'`, a fresh 16-byte value per request. Every other directive stays the same. No `'strict-dynamic'`, so the host list still governs external scripts. Next.js reads the nonce from the request header and stamps it on every executable inline script and every chunk during the render.

The matcher lists exact paths, not `/preferences/:path*`. An unknown `/preferences/<slug>` is answered with the prerendered 404 page, which carries no nonce, so it keeps the static policy. The proxy also checks the pathname against `NONCE_ROUTES` before acting, and `contentSecurityPolicy()` throws on a malformed nonce. A route joins `NONCE_ROUTES` only once its page renders per request. `src/lib/csp.test.ts` holds both the static policy and the matcher in step.

### Inline script inventory (2026-10-25, Next.js 16.4.2, Turbopack build)

Every HTML page carries three executable inline scripts, all emitted by Next.js:

1. `<script id="_R_">`: the Turbopack chunk bootstrap. Identical on every page within one build.
2. `(self.__next_f=self.__next_f||[]).push([0])`: the RSC stream initializer. Identical on every page.
3. `self.__next_f.push([1,"..."])`: the RSC flight payload. Unique per page (140 prerendered pages gave 140 distinct hashes) and rebuilt with every deploy.

Data blocks and external scripts:

- `type="application/ld+json"` blocks (layout WebSite, Person and Organization, plus page schemas). These are data blocks. The browser never executes them, so `script-src` does not govern them.
- PostHog, Vercel BotID and Next.js chunks load as external scripts from `'self'` or the PostHog hosts. Umami loads through `next/script` with a `src`. None of them is inline.
- No Stripe, theme or font-loading inline scripts exist on this site.

### Why `'unsafe-inline'` remains in `script-src`

The flight payload is the blocker. Two routes away from `'unsafe-inline'` exist, and each costs something:

- **Nonces.** Next.js only attaches a nonce during a request render. All static and SSG pages would turn dynamic, losing CDN caching. The Next.js CSP guide states this directly.
- **Hashes.** Next.js has no supported inline-script hashing (`experimental.sri` covers external chunks only). Per-route headers in `next.config.ts` are fixed before prerendering, so the per-page payload hashes are unknown when the headers are built. A hash policy would need a post-build step patching `.next/routes-manifest.json` or a proxy reading a post-build hash file, both outside supported Next.js behavior and unverifiable outside Vercel. On-demand 404 renders (for example `/concepts/<unknown-slug>`) produce payloads no build-time hash covers.

Ledger item 2026-10-21 (Low) stays open for the static and SSG pages pending a ruling between those costs. The already dynamic routes carry the nonce policy (see "Nonce routes" above).

**If HubSpot, analytics, or any third-party script is added:** Update CSP before deploying.
The `connect-src`, `script-src`, and possibly `frame-src` directives must be expanded.

## Deferred Items

| Item | Status | Notes |
|---|---|---|
| CSP nonce or hash hardening | Partly done | Nonce policy live on the four dynamic preference and unsubscribe routes (2026-10-25). Static and SSG pages await a ruling: nonces turn them dynamic, hashes need an unsupported post-build step |
| Subresource Integrity (SRI) | Deferred | For any CDN-loaded assets added in future |

## No Third-Party Scripts at Launch

This site launches with zero third-party scripts: no HubSpot, no analytics, no embeds.
This is intentional. The site is a knowledge node. If tracking or forms are added later,
revisit CSP before deployment.

## Dependency Sprint Cadence

Next scheduled: 2026-07-01. Aligned with lanebelone.com and sidequesthq.co.

Run `npm audit` and review `npm outdated` at each sprint. Prioritize security patches.
