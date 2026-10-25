// The site's Content-Security-Policy, built in one place. next.config.ts sends
// the static form on every path. src/proxy.ts sends the nonce form on the
// routes in NONCE_ROUTES, which already render per request (SECURITY.md,
// option A). Both forms share every directive except script-src.

// Analytics hosts allowed by CSP. Read at build time so changing the env var
// updates CSP automatically. Empty values are filtered out of the CSP source list.
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
// PostHog lazy-loads its remote config, web vitals, dead-click capture, surveys
// and session recorder from the assets host. Until 2026-09-28 this policy listed
// neither PostHog origin under script-src, so every one of those was refused on
// this site: 6 web vitals events against 836 pageviews from June to September,
// where the sibling sites ran about one in two. Mirrors the lanebelone policy.
const POSTHOG_ASSETS = 'https://us-assets.i.posthog.com'

// The routes that take the nonce policy. Each one is force-dynamic, so Next
// renders it per request and stamps the nonce on its scripts. Exact paths only:
// a wildcard would also catch an unknown /preferences/<slug>, which Next answers
// with the prerendered 404 page, and that page carries no nonce. A route joins
// this list only once its page renders per request.
export const NONCE_ROUTES: ReadonlySet<string> = new Set([
  '/preferences',
  '/preferences/cancel-email-change',
  '/preferences/confirm-email-change',
  '/unsubscribe',
])

// Base64 of 16 random bytes. Anything else is refused, so a caller can never
// build a nonce policy around an empty or malformed value.
const NONCE_PATTERN = /^[A-Za-z0-9+/]{22}==$/

export function generateNonce(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes))
}

// With a nonce, script-src drops 'unsafe-inline' and lists the nonce. Without
// one it keeps 'unsafe-inline', which Next.js hydration needs on prerendered
// pages. No 'strict-dynamic': the host list still governs external scripts.
export function contentSecurityPolicy(nonce?: string): string {
  if (nonce !== undefined && !NONCE_PATTERN.test(nonce)) {
    throw new Error('contentSecurityPolicy: malformed nonce')
  }
  const inline = nonce ? `'nonce-${nonce}'` : "'unsafe-inline'"
  return [
    "default-src 'self'",
    `script-src ${["'self'", inline, POSTHOG_HOST, POSTHOG_ASSETS, UMAMI_URL].filter(Boolean).join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src ${["'self'", POSTHOG_HOST, POSTHOG_ASSETS, UMAMI_URL].filter(Boolean).join(' ')}`,
    // PostHog session recording compresses in a blob worker.
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
}
