// Routes and hosts that must carry no analytics and no pixels. The preference
// center is a privacy surface: its entry URL holds the subscriber email and a
// live signed token, so no pageview, session recording, pixel or click tracker
// may observe it. Mirror of the lanebelone and IGOS copies. Keep byte-identical.

// The join and undo pages from email links carry the reader's address (and the
// undo page a signed token), so they are privacy surfaces too. One list names
// every site's pages, so the three copies stay identical (2026-11-07).
export const NO_TRACK_PREFIXES = [
  '/preferences',
  '/updates/join',
  '/updates/leave',
  '/articles/join',
  '/articles/leave',
  '/letter/join',
  '/letter/leave',
  // sidequesthq's rating, delivery and reissue links carry a signed token and
  // the buyer's email (Claude Security scan F15 and F30, 2026-08-14).
  '/rate',
  '/downloads',
  '/reissue',
]

export function isNoTrackPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return NO_TRACK_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

// Query parameters whose values are a credential or a person: a paid Checkout
// session_id (it unlocks the purchase's downloads), a signed token, its expiry
// and an email. PostHog stamps the full page address on every event it sends,
// not only the pageview, so its before_send runs scrubAnalyticsEvent and these
// values leave as "redacted" wherever an address appears: the current URL, the
// referrer, an autocaptured link and the person properties (sidequesthq
// Security Posture Ledger, 2026-11-18). Session replay is switched off instead
// for a visit whose first page loads with one in its address
// (instrumentation-client.ts reads the address once, at start; a success page
// arrives that way, by a full redirect from Stripe), because a replay batch
// holds the page itself and is too large to walk on every send.
export const PRIVATE_PARAMS = ['session_id', 'token', 'email', 'exp']
const PRIVATE_PARAM_SOURCE = `([?&](?:${PRIVATE_PARAMS.join('|')})=)[^&#"'\\s]*`

export function redactPrivateParams(text: string): string {
  return text.replace(new RegExp(PRIVATE_PARAM_SOURCE, 'g'), '$1redacted')
}

export function carriesPrivateParams(href: string): boolean {
  return new RegExp(PRIVATE_PARAM_SOURCE).test(href)
}

function redactDeep(value: unknown): unknown {
  if (typeof value === 'string') return redactPrivateParams(value)
  if (Array.isArray(value)) return value.map(redactDeep)
  // Plain objects only: a Date (an event's timestamp) or any other class
  // instance passes through as it is.
  const proto = value !== null && typeof value === 'object' ? Object.getPrototypeOf(value) : undefined
  if (proto === Object.prototype || proto === null) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = redactDeep(v)
    return out
  }
  return value
}

export function scrubAnalyticsEvent<T extends { event?: string } | null>(event: T): T {
  if (!event || event.event === '$snapshot') return event
  return redactDeep(event) as T
}

// Hosts that are not the live public site. Development servers and Vercel
// deployment URLs were writing real pageviews into the production analytics
// projects, so a local session and a preview build both counted as audience.
// The production sites are served on their custom domains, so gating the
// deployment URLs costs nothing and keeps the numbers about actual visitors.
export function isNonPublicHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false
  const host = hostname.toLowerCase()
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host.endsWith('.local') ||
    host.endsWith('.vercel.app')
  )
}

// Browsers driven by automation. A headless crawler that runs JavaScript loads
// the Umami script like a reader, and Umami's own bot check reads only the
// user-agent string, which crawlers replace. PostHog also reads
// navigator.webdriver and the HeadlessChrome brand, so from September 2026 the
// two tools disagreed by up to three to one on sidequesthq: sessions that
// opened nine product pages in sixteen seconds at 1280x720 counted in Umami and
// not in PostHog. This applies PostHog's test to Umami, so both count readers.
export function isAutomatedBrowser(): boolean {
  if (typeof navigator === 'undefined') return false
  if (navigator.webdriver) return true
  if (/HeadlessChrome/i.test(navigator.userAgent)) return true
  const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }).userAgentData?.brands
  return !!brands?.some((b) => /HeadlessChrome/i.test(b.brand))
}
