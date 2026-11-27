// Builds the one row the agent log stores for a request. The row type has no
// address field: the IP is read for the range check and the daily marker and
// goes no further. Never stored: the IP, the query string, the full referring
// address. Text that came from the request (user agent, signature agent) is
// truncated and stripped of control characters, because the log is data that
// a reader later prints, never instruction.

import { classify, RANGES_DATE, type Kind, type RangeVerdict } from './classify'
import { isNoTrackPath } from '@/lib/no-track'

export type RequestFacts = {
  method: string
  pathname: string
  userAgent: string | null
  ip: string | null
  accept: string | null
  secFetchDest: string | null
  secFetchMode: string | null
  referer: string | null
  country: string | null
  signatureAgent: string | null
  signatureInput: string | null
}

export type Site = 'infinitegameos' | 'lanebelone' | 'sidequesthq'
export type Env = 'production' | 'preview'

export type PageRequestRow = {
  ts: string
  env: Env
  site: Site
  path: string
  method: 'GET' | 'HEAD'
  user_agent: string | null
  kind: Kind
  agent_name: string | null
  signature_present: boolean
  signature_agent: string | null
  range_provider: string | null
  range_verdict: RangeVerdict
  fetch_dest: string | null
  accept: 'html' | 'markdown' | 'other'
  referrer_host: string | null
  country: string | null
  visitor_day: string | null
  ranges_date: string
}

const CONTROL = /[\u0000-\u001f\u007f-\u009f]/g

export function cleanText(s: string | null | undefined, max: number): string | null {
  if (!s) return null
  const t = s.replace(CONTROL, ' ').trim().slice(0, max)
  return t || null
}

// A segment holding an email (raw or encoded) or a run of 24 or more base64 or
// hex characters is replaced whole. A long kebab-case page slug is words, not a
// token, so it stays: at least half its parts must be letters only (a UUID's
// parts are hex with digits, so it is still redacted). Paths are cut to 200
// characters after redaction.
const EMAIL = /@|%40/i
const RUN = /[A-Za-z0-9+/=_-]{24,}/g

function isWordSlug(run: string): boolean {
  if (!/^[a-z0-9]+(-[a-z0-9]+)+$/.test(run)) return false
  const parts = run.split('-')
  return parts.filter((p) => /^[a-z]+$/.test(p)).length * 2 >= parts.length
}

function isSecretSegment(seg: string): boolean {
  if (EMAIL.test(seg)) return true
  for (const m of seg.matchAll(RUN)) if (!isWordSlug(m[0])) return true
  return false
}

export function redactPath(pathname: string): string {
  const bare = pathname.split(/[?#]/)[0] || '/'
  const out = bare
    .split('/')
    .map((seg) => (isSecretSegment(seg) ? '[redacted]' : seg))
    .join('/')
  return out.slice(0, 200)
}

function osFamily(ua: string): string {
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
  if (/Android/.test(ua)) return 'Android'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Mac OS X|Macintosh/.test(ua)) return 'macOS'
  if (/CrOS/.test(ua)) return 'ChromeOS'
  if (/Linux/.test(ua)) return 'Linux'
  return 'Other'
}

// Browser family, major version and OS family only: the whole of what a human
// row keeps of its user agent.
export function reduceUserAgent(ua: string): string {
  const os = osFamily(ua)
  const tests: [string, RegExp][] = [
    ['Edge', /Edg(?:e|A|iOS)?\/(\d+)/],
    ['Opera', /OPR\/(\d+)/],
    ['Samsung Internet', /SamsungBrowser\/(\d+)/],
    ['Firefox', /(?:Firefox|FxiOS)\/(\d+)/],
    ['Chrome', /(?:Chrome|CriOS)\/(\d+)/],
    ['Safari', /Version\/(\d+).*Safari\//],
  ]
  for (const [family, re] of tests) {
    const m = ua.match(re)
    if (m) return `${family} ${m[1]} / ${os}`
  }
  return `Other / ${os}`
}

function acceptBucket(accept: string | null): 'html' | 'markdown' | 'other' {
  if (!accept) return 'other'
  const a = accept.toLowerCase()
  if (a.includes('text/markdown')) return 'markdown'
  if (a.includes('text/html')) return 'html'
  return 'other'
}

function referrerHost(referer: string | null): string | null {
  if (!referer) return null
  try {
    const host = new URL(referer).hostname.toLowerCase()
    return /^[a-z0-9.-]{1,253}$/.test(host) ? host : null
  } catch {
    return null
  }
}

export function buildRow(
  f: RequestFacts,
  opts: { site: Site; env: Env; now: Date; visitorDay: string | null }
): PageRequestRow {
  const c = classify(f)
  const human = c.kind === 'likely_human'
  const ts = new Date(opts.now)
  ts.setUTCMilliseconds(0)
  if (human) ts.setUTCSeconds(0)
  const path = redactPath(f.pathname)
  const country = f.country && /^[A-Z]{2}$/.test(f.country) ? f.country : null
  const dest = f.secFetchDest && /^[a-z-]{1,20}$/.test(f.secFetchDest) ? f.secFetchDest : null
  return {
    ts: ts.toISOString(),
    env: opts.env,
    site: opts.site,
    path,
    method: f.method === 'HEAD' ? 'HEAD' : 'GET',
    user_agent: human ? reduceUserAgent(f.userAgent ?? '') : cleanText(f.userAgent, 300),
    kind: c.kind,
    agent_name: c.agent_name,
    signature_present: c.signature_present,
    signature_agent: cleanText(f.signatureAgent, 200),
    range_provider: c.range_provider,
    range_verdict: c.range_verdict,
    fetch_dest: dest,
    accept: acceptBucket(f.accept),
    referrer_host: referrerHost(f.referer),
    country,
    visitor_day: isNoTrackPath(path) ? null : opts.visitorDay,
    ranges_date: RANGES_DATE,
  }
}
