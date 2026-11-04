// First-touch attribution, kept for a year. Ported from the sibling site
// (sidequesthq.co) so a return visit in a new tab still names the visitor's
// first source. The record lives in localStorage under `first_touch` as JSON of
// the captured keys plus `ts` (milliseconds since the epoch). Every storage
// read and write is wrapped: a throwing or missing storage never throws out.

export const FIRST_TOUCH_KEY = 'first_touch'
export const FIRST_TOUCH_TTL_MS = 365 * 24 * 60 * 60 * 1000

export type FirstTouch = Record<string, string>

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

function storage(kind: 'localStorage' | 'sessionStorage'): StorageLike | null {
  try {
    const s = (globalThis as unknown as Record<string, StorageLike | undefined>)[kind]
    return s ?? null
  } catch {
    return null
  }
}

function getRaw(s: StorageLike | null): string | null {
  if (!s) return null
  try {
    return s.getItem(FIRST_TOUCH_KEY)
  } catch {
    return null
  }
}

function remove(s: StorageLike | null): void {
  if (!s) return
  try {
    s.removeItem(FIRST_TOUCH_KEY)
  } catch {
    // best-effort
  }
}

function toStrings(obj: unknown): FirstTouch {
  const out: FirstTouch = {}
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return out
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k !== 'ts' && typeof v === 'string' && v) out[k] = v
  }
  return out
}

function ownHostname(): string {
  try {
    return (globalThis as unknown as { location?: { hostname?: string } }).location?.hostname ?? ''
  } catch {
    return ''
  }
}

function bareHost(h: string): string {
  return h.toLowerCase().replace(/^www\./, '')
}

// A referrer is kept only when it parses and points somewhere other than this
// site or Stripe (a checkout return is not a source).
function keepReferrer(ref: string): boolean {
  let host: string
  try {
    host = new URL(ref).hostname.toLowerCase()
  } catch {
    return false
  }
  if (!host) return false
  const own = ownHostname()
  if (own && bareHost(host) === bareHost(own)) return false
  if (host === 'stripe.com' || host.endsWith('.stripe.com')) return false
  return true
}

function sanitize(ft: FirstTouch): FirstTouch {
  const out = { ...ft }
  if (out.referrer !== undefined && !keepReferrer(out.referrer)) delete out.referrer
  return out
}

// The live record in localStorage, or null. An unparseable entry, one with no
// numeric ts or one older than the window is removed and read as nothing kept.
function readKept(now: number): FirstTouch | null {
  const ls = storage('localStorage')
  const raw = getRaw(ls)
  if (raw === null) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    const ts = (parsed as { ts?: unknown } | null)?.ts
    if (typeof ts !== 'number' || !Number.isFinite(ts) || now - ts > FIRST_TOUCH_TTL_MS) {
      remove(ls)
      return null
    }
    return toStrings(parsed)
  } catch {
    remove(ls)
    return null
  }
}

function readSession(): FirstTouch | null {
  const raw = getRaw(storage('sessionStorage'))
  if (raw === null) return null
  try {
    const ft = toStrings(JSON.parse(raw))
    return Object.keys(ft).length ? ft : null
  } catch {
    return null
  }
}

/** The kept first touch, else the session's, else an empty object. */
export function readFirstTouch(now: number = Date.now()): FirstTouch {
  return readKept(now) ?? readSession() ?? {}
}

/**
 * Write the first touch once. Never overwrites a live record. A first_touch
 * left in sessionStorage from before localStorage persistence is the true first
 * touch and is carried over in place of the current visit.
 */
export function rememberFirstTouch(ft: FirstTouch, now: number = Date.now()): void {
  if (readKept(now)) return
  const source = sanitize(readSession() ?? toStrings(ft))
  if (!Object.keys(source).length) return
  const ls = storage('localStorage')
  if (!ls) return
  try {
    ls.setItem(FIRST_TOUCH_KEY, JSON.stringify({ ...source, ts: now }))
  } catch {
    // first-touch capture is best-effort
  }
}
