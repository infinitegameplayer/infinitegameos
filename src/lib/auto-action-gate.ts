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
