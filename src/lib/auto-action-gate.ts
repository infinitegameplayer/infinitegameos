// The scanner-proof one-click (King-ruled 2026-11-07: Option 3, hardened, with
// a fallback). A link in an email opens a page whose own code acts for the
// reader (joins a list, or undoes a join) only when a person is plainly there:
// the page is on screen, the window has focus and the browser is not driven by
// automation, held steady for DWELL_MS. The request it sends still passes
// Vercel BotID on the server, which refuses rather than allows when it cannot
// vouch for the visitor.
//
// Any check unmet means the page shows its one-tap button instead, so a person
// whose browser reads oddly still joins with one more tap, and a mail scanner
// that opens the page but presses nothing changes nothing. The button appears
// once the page has been on screen for TAP_AFTER_MS without the checks passing.
// A page opened in a background tab waits: neither timer runs until it is seen.
// The automatic request gives up after REQUEST_TIMEOUT_MS and shows the button.
// A page without JavaScript says how to be added by hand (a noscript line).
//
// Research behind it: Council Chamber/Tools/Support Files/Research/
// Research Report - Scanner-Proof One-Click - 2026-11-07.md (Kingdom vault).
// Canon: Email Codex, outbound list links. Mirror across the three sites.

export const DWELL_MS = 700
export const TAP_AFTER_MS = 2500
export const REQUEST_TIMEOUT_MS = 12000

// The server's half (2026-11-07). An automatic act from an email link goes
// ahead only when BotID vouched for the visitor and the address is already a
// Kingdom contact who has not left every list: a letter only ever reaches
// those. Anything else gets the button, so a typed or forged address never
// joins without a tap, and a BotID failure never counts as a person.
export function autoJoinAllowed(
  verdict: 'human' | 'bot' | 'unchecked',
  contact: { unsubscribed: boolean | null } | null
): boolean {
  return verdict === 'human' && contact !== null && contact.unsubscribed !== true
}

export type GateReading = {
  visible: boolean
  focused: boolean
  automated: boolean
}

export function gateOpen(r: GateReading): boolean {
  return r.visible && r.focused && !r.automated
}

// What the page reports to the server with an automatic request, so every
// automatic join leaves a log line showing what the browser said about itself.
export type GateReport = GateReading & { dwellMs: number; sinceLoadMs: number }

// The server logs only these fields, as booleans and whole numbers, whatever
// the client sent.
export function cleanGateReport(raw: unknown): GateReport | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.round(v)) : -1)
  return {
    visible: r.visible === true,
    focused: r.focused === true,
    automated: r.automated === true,
    dwellMs: num(r.dwellMs),
    sinceLoadMs: num(r.sinceLoadMs),
  }
}

// The gate's own reading when the button appears for a reason the server never
// saw (2026-11-07, after Brave on iOS held the gate closed and a closed gate
// logged nothing). The page sends it to /api/gate-reading, which writes one
// `gate-reading` line. Why the button showed:
//   gate-closed      the checks never passed (which one is in the reading)
//   request-threw    the automatic request died in the browser before it left
//   request-timeout  the automatic request never answered
// A request the server answered with needsTap already logged its auto-join or
// auto-leave line, so it sends nothing here. The page's path goes, never its
// query: the address and its token stay on the page.
export type GateCause = 'gate-closed' | 'request-threw' | 'request-timeout'
const GATE_CAUSES: GateCause[] = ['gate-closed', 'request-threw', 'request-timeout']

export type GateBeacon = GateReading & {
  cause: GateCause
  page: string
  webdriver: boolean
  headless: boolean
  brave: boolean
  firstReading: GateReading | null
  events: number
  sinceLoadMs: number
  error: string | null
  transport: 'fetch' | 'beacon'
}

export function cleanGateBeacon(raw: unknown): GateBeacon | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (!GATE_CAUSES.includes(r.cause as GateCause)) return null
  const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.round(v)) : -1)
  const reading = (v: unknown): GateReading | null => {
    if (!v || typeof v !== 'object') return null
    const x = v as Record<string, unknown>
    return { visible: x.visible === true, focused: x.focused === true, automated: x.automated === true }
  }
  const page = typeof r.page === 'string' && /^\/[a-z0-9/_-]{0,60}$/i.test(r.page) ? r.page : 'unknown'
  const error = typeof r.error === 'string' ? r.error.replace(/[^\w .:,'()-]/g, '').slice(0, 80) : null
  return {
    cause: r.cause as GateCause,
    page,
    visible: r.visible === true,
    focused: r.focused === true,
    automated: r.automated === true,
    webdriver: r.webdriver === true,
    headless: r.headless === true,
    brave: r.brave === true,
    firstReading: reading(r.firstReading),
    events: num(r.events),
    sinceLoadMs: num(r.sinceLoadMs),
    error,
    transport: r.transport === 'beacon' ? 'beacon' : 'fetch',
  }
}

// A coarse name for the browser, from its user agent. Brave on iOS sends the
// same user agent as Safari, so the page's own `brave` flag tells them apart.
export function uaFamily(ua: string | null): string {
  if (!ua) return 'none'
  if (/HeadlessChrome/i.test(ua)) return 'headless-chrome'
  if (/CriOS/.test(ua)) return 'chrome-ios'
  if (/FxiOS/.test(ua)) return 'firefox-ios'
  if (/EdgiOS/.test(ua)) return 'edge-ios'
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios-webkit'
  if (/Edg\//.test(ua)) return 'edge'
  if (/Firefox\//.test(ua)) return 'firefox'
  if (/Chrome\//.test(ua)) return 'chrome'
  if (/Safari\//.test(ua)) return 'safari'
  return 'other'
}
