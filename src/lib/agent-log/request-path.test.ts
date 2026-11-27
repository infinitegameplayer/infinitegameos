import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest, type NextFetchEvent } from 'next/server'
import { logPageRequest } from './writer'
import { visitorDay } from './salt'

// The real path from a request to a posted row: a real NextRequest, the real
// logger and process.env, with only the network stubbed. Fable seat S5,
// 2026-11-27: the proxy tests mock the writer whole, so this is the one test
// that would catch a switch to a forgeable address header.

const REAL_IP = '198.51.100.23'
const FORGED = '203.0.113.250'
const UA = 'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)'
const SALT = 'd'.repeat(64)

describe('logPageRequest', () => {
  const bodies: { url: string; body: string }[] = []
  const saved = { ...process.env }

  beforeEach(() => {
    bodies.length = 0
    process.env.VERCEL_ENV = 'preview'
    process.env.SUPABASE_URL = 'https://db.example.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key'
    delete process.env.AGENT_LOG
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
      bodies.push({ url: String(url), body: String(init?.body ?? '') })
      if (String(url).endsWith('/rpc/page_request_salt')) return new Response(JSON.stringify([{ day: new Date().toISOString().slice(0, 10), salt: SALT }]))
      return new Response(null, { status: 201 })
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    process.env = { ...saved }
  })

  it('reads the address Vercel sets, never a forged one, and stores neither', async () => {
    const request = new NextRequest(new URL('https://www.infinitegameos.io/the-os?email=reader%40example.com&utm_source=x'), {
      headers: {
        'user-agent': UA,
        'x-real-ip': REAL_IP,
        'x-forwarded-for': `${FORGED}, ${REAL_IP}`,
        'x-vercel-ip-country': 'US',
        referer: 'https://www.linkedin.com/feed/?trk=abc',
      },
    })
    const pending: Promise<unknown>[] = []
    const event = { waitUntil: (p: Promise<unknown>) => pending.push(p) } as unknown as NextFetchEvent

    logPageRequest(request, event)
    expect(pending.length).toBe(1)
    await Promise.all(pending)

    const insert = bodies.find((b) => b.url.endsWith('/rest/v1/page_requests'))!
    expect(insert).toBeDefined()
    const row = JSON.parse(insert.body)
    expect(row.path).toBe('/the-os')
    expect(row.referrer_host).toBe('www.linkedin.com')
    expect(row.agent_name).toBe('GPTBot')
    expect(row.visitor_day).toBe(await visitorDay(SALT, REAL_IP, UA))
    for (const secret of [REAL_IP, FORGED, 'reader', 'utm_source', 'trk=abc']) expect(insert.body).not.toContain(secret)
  })

  it('does nothing without an event', () => {
    logPageRequest(new NextRequest(new URL('https://www.infinitegameos.io/')))
    expect(bodies.length).toBe(0)
  })
})
