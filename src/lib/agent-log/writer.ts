// The agent log's writer. The proxy hands it every matched request; it reads
// the few headers the row needs, then does all the work inside waitUntil, after
// the response has gone. It never alters the request or the response, and
// nothing it does can throw back into the proxy.
//
// Guards (Agent Visit Log plan, The writer):
// - Development writes nothing; only VERCEL_ENV production or preview writes.
// - AGENT_LOG=off is the kill switch, read at request time.
// - A per-instance cap on writes per minute; writes past it are dropped,
//   counted and reported in one runtime-log line when the minute turns.
// - A failed write logs one line to the runtime log and nothing else.
// Plain fetch to the Supabase REST endpoint, no client library in the proxy.

import type { NextFetchEvent, NextRequest } from 'next/server'
import { buildRow, type Env, type RequestFacts, type Site } from './row'
import { createSaltSource, visitorDay, type SaltRecord } from './salt'

const SITE: Site = 'infinitegameos'
const TIMEOUT_MS = 2_500
const DEFAULT_CAP_PER_MINUTE = 300

type EnvVars = Record<string, string | undefined>
type FetchImpl = (url: string, init?: RequestInit) => Promise<Response>

export function createLogger(deps: {
  env: () => EnvVars
  fetchImpl: FetchImpl
  site: Site
  now: () => Date
  capPerMinute?: number
}) {
  const cap = deps.capPerMinute ?? DEFAULT_CAP_PER_MINUTE
  let minute = -1
  let written = 0
  let dropped = 0

  function headers(key: string): Record<string, string> {
    return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  }

  const salts = createSaltSource(async (): Promise<SaltRecord> => {
    const e = deps.env()
    const res = await deps.fetchImpl(`${e.SUPABASE_URL}/rest/v1/rpc/page_request_salt`, {
      method: 'POST',
      headers: headers(e.SUPABASE_SERVICE_ROLE_KEY!),
      body: '{}',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) throw new Error(`salt ${res.status}`)
    const body = (await res.json()) as SaltRecord[] | SaltRecord
    const rec = Array.isArray(body) ? body[0] : body
    if (!rec) throw new Error('salt empty')
    return rec
  })

  function admit(now: Date): boolean {
    const m = Math.floor(now.getTime() / 60_000)
    if (m !== minute) {
      if (dropped > 0) console.error(`agent-log: dropped ${dropped} rows in the last minute (cap ${cap})`)
      minute = m
      written = 0
      dropped = 0
    }
    if (written >= cap) {
      dropped++
      return false
    }
    written++
    return true
  }

  return {
    async log(f: RequestFacts): Promise<void> {
      try {
        const e = deps.env()
        const env = e.VERCEL_ENV
        if (env !== 'production' && env !== 'preview') return
        if (e.AGENT_LOG === 'off') return
        if (f.method !== 'GET' && f.method !== 'HEAD') return
        if (!e.SUPABASE_URL || !e.SUPABASE_SERVICE_ROLE_KEY) return
        const now = deps.now()
        if (!admit(now)) return

        const salt = await salts.get(now)
        const marker = salt && f.ip ? await visitorDay(salt, f.ip, f.userAgent ?? '') : null
        const row = buildRow(f, { site: deps.site, env: env as Env, now, visitorDay: marker })

        const res = await deps.fetchImpl(`${e.SUPABASE_URL}/rest/v1/page_requests`, {
          method: 'POST',
          headers: { ...headers(e.SUPABASE_SERVICE_ROLE_KEY), Prefer: 'return=minimal' },
          body: JSON.stringify(row),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        })
        if (!res.ok) console.error(`agent-log: write failed with status ${res.status}`)
      } catch (err) {
        // One line, never the row and never the address.
        console.error(`agent-log: write failed (${err instanceof Error ? err.name : 'error'})`)
      }
    },
  }
}

const logger = createLogger({
  env: () => process.env,
  fetchImpl: (url, init) => fetch(url, init),
  site: SITE,
  now: () => new Date(),
})

function header(req: NextRequest, name: string): string | null {
  return req.headers.get(name)
}

// Called by the proxy on every matched request. Reads the headers now (the
// request object is not kept), then defers the rest to waitUntil.
export function logPageRequest(request: NextRequest, event?: NextFetchEvent): void {
  if (!event) return
  const facts: RequestFacts = {
    method: request.method,
    pathname: request.nextUrl.pathname,
    userAgent: header(request, 'user-agent'),
    // Vercel overwrites x-real-ip with the connecting address; a forged value
    // never survives (spike 0(b), 2026-11-27). Never the leftmost X-Forwarded-For.
    ip: header(request, 'x-real-ip'),
    accept: header(request, 'accept'),
    secFetchDest: header(request, 'sec-fetch-dest'),
    secFetchMode: header(request, 'sec-fetch-mode'),
    referer: header(request, 'referer'),
    country: header(request, 'x-vercel-ip-country'),
    signatureAgent: header(request, 'signature-agent'),
    signatureInput: header(request, 'signature-input'),
  }
  event.waitUntil(logger.log(facts))
}
