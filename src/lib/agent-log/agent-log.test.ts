import { describe, expect, it, vi } from 'vitest'
import { existsSync, readdirSync } from 'node:fs'
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'
import ranges from './ranges.json'
import { classify } from './classify'
import { parseIp } from './ip'
import { buildRow, redactPath, reduceUserAgent, type RequestFacts } from './row'
import { createSaltSource, visitorDay } from './salt'
import { createLogger } from './writer'
import { DISCOVERY_FILES } from './discovery'
import { config } from '@/proxy'

const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const IP = '203.0.113.77'

// An address inside a published list, read from the bundled ranges so the
// test follows the file rather than a copied value.
function firstAddress(listId: string, family: 'ipv4' | 'ipv6'): string {
  const list = ranges.lists.find((l) => l.id === listId)!
  const cidr = list[family][0]
  return cidr.split('/')[0]
}
const GPTBOT_V4 = firstAddress('openai-gptbot', 'ipv4')
const GOOGLEBOT_V6 = firstAddress('google-googlebot', 'ipv6')

function facts(over: Partial<RequestFacts> = {}): RequestFacts {
  return {
    method: 'GET',
    pathname: '/the-os',
    userAgent: CHROME,
    ip: IP,
    accept: 'text/html,application/xhtml+xml',
    secFetchDest: 'document',
    secFetchMode: 'navigate',
    referer: null,
    country: 'US',
    signatureAgent: null,
    signatureInput: null,
    ...over,
  }
}

describe('classify', () => {
  it('names every ua_token agent from its user agent, and only from the list', () => {
    for (const n of ranges.names.filter((x) => x.ua_token)) {
      const r = classify(facts({ userAgent: `Mozilla/5.0 (compatible; ${n.name}/1.0; +https://example.com)`, secFetchDest: null, secFetchMode: null }))
      expect(r.kind, n.name).toBe('declared')
      expect(r.agent_name, n.name).toBe(n.name)
    }
  })

  it('never names a robots-only token, and prefers the longest name', () => {
    const r = classify(facts({ userAgent: 'Mozilla/5.0 (compatible; Applebot-Extended/0.1)' }))
    expect(r.agent_name).toBe('Applebot')
    const meta = classify(facts({ userAgent: 'meta-externalfetcher/1.1' }))
    expect(meta.agent_name).toBe('Meta-ExternalFetcher')
  })

  it('calls a generic bot or library declared_other with no name', () => {
    for (const ua of ['curl/8.18.0', 'python-requests/2.32', 'SomeCrawler/2.0', 'node-fetch/1.0', 'Mozilla/5.0 HeadlessChrome/131.0']) {
      const r = classify(facts({ userAgent: ua }))
      expect(r.kind, ua).toBe('declared_other')
      expect(r.agent_name, ua).toBeNull()
    }
  })

  it('flags a signature header as a claim', () => {
    const r = classify(facts({ signatureAgent: '"https://chatgpt.com"' }))
    expect(r.signature_present).toBe(true)
    expect(classify(facts({ signatureInput: 'sig1=("@authority")' })).signature_present).toBe(true)
    expect(classify(facts()).signature_present).toBe(false)
  })

  it('checks a declared agent against its own list, IPv4 and IPv6', () => {
    const inV4 = classify(facts({ userAgent: 'GPTBot/1.2', ip: GPTBOT_V4 }))
    expect(inV4.range_verdict).toBe('in_range')
    expect(inV4.range_provider).toBe('openai-gptbot')
    const outV4 = classify(facts({ userAgent: 'GPTBot/1.2', ip: IP }))
    expect(outV4.range_verdict).toBe('out_of_range')
    expect(outV4.range_provider).toBeNull()
    const inV6 = classify(facts({ userAgent: 'Googlebot/2.1', ip: GOOGLEBOT_V6 }))
    expect(inV6.range_verdict).toBe('in_range')
    const outV6 = classify(facts({ userAgent: 'Googlebot/2.1', ip: '2001:db8::1' }))
    expect(outV6.range_verdict).toBe('out_of_range')
  })

  it('says no_complete_list for an agent whose provider publishes none', () => {
    expect(classify(facts({ userAgent: 'ClaudeBot/1.0', ip: IP })).range_verdict).toBe('no_complete_list')
  })

  it('calls an undeclared request from a published range provider_range', () => {
    const r = classify(facts({ ip: GPTBOT_V4 }))
    expect(r.kind).toBe('provider_range')
    expect(r.range_provider).toBe('openai-gptbot')
  })

  it('calls a plain Chrome visit with Sec-Fetch headers likely_human', () => {
    const r = classify(facts())
    expect(r.kind).toBe('likely_human')
    expect(r.range_verdict).toBe('out_of_range')
  })

  it('calls a browser user agent without Sec-Fetch headers unknown', () => {
    expect(classify(facts({ secFetchDest: null, secFetchMode: null })).kind).toBe('unknown')
  })

  it('applies precedence: declared, declared_other, provider_range, likely_human', () => {
    // A named agent from inside a range is still declared.
    expect(classify(facts({ userAgent: 'GPTBot/1.2', ip: GPTBOT_V4 })).kind).toBe('declared')
    // A library from inside a range is declared_other, with the range kept.
    const lib = classify(facts({ userAgent: 'curl/8.0', ip: GPTBOT_V4 }))
    expect(lib.kind).toBe('declared_other')
    expect(lib.range_verdict).toBe('in_range')
    // A browser with Sec-Fetch headers from inside a range is provider_range.
    expect(classify(facts({ ip: GPTBOT_V4 })).kind).toBe('provider_range')
  })

  it('marks an unreadable address no_address, never out of range', () => {
    expect(parseIp('not-an-ip')).toBeNull()
    expect(classify(facts({ ip: null })).range_verdict).toBe('no_address')
    expect(classify(facts({ userAgent: 'GPTBot/1.2', ip: null })).range_verdict).toBe('no_address')
    expect(classify(facts({ userAgent: 'GPTBot/1.2', ip: 'garbage' })).range_verdict).toBe('no_address')
  })

  it('never reads a phone model ending in bot as a bot', () => {
    const cubot = 'Mozilla/5.0 (Linux; Android 13; CUBOT KINGKONG 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
    expect(classify(facts({ userAgent: cubot })).kind).toBe('likely_human')
    // A bot naming itself after the platform part is still caught.
    expect(classify(facts({ userAgent: CHROME + ' (compatible; AcmeBot/1.0)' })).kind).toBe('declared_other')
  })
})

describe('buildRow', () => {
  const base = { site: 'infinitegameos' as const, env: 'production' as const, now: new Date('2026-11-27T22:13:45.678Z'), visitorDay: 'a1b2c3d4e5f60718' }

  it('never stores the IP address, in any field', () => {
    for (const f of [facts(), facts({ userAgent: 'GPTBot/1.2', ip: GPTBOT_V4 }), facts({ userAgent: 'curl/8', ip: '2001:db8::77' })]) {
      const row = buildRow(f, base)
      const text = JSON.stringify(row)
      expect(text).not.toContain(f.ip!)
      expect(Object.keys(row)).not.toContain('ip')
    }
  })

  it('removes the query string', () => {
    expect(buildRow(facts({ pathname: '/the-os?ref=linkedin&utm_source=x' }), base).path).toBe('/the-os')
    expect(buildRow(facts({ pathname: '/the-os#part-2' }), base).path).toBe('/the-os')
  })

  it('redacts an email-bearing or token-bearing path', () => {
    expect(buildRow(facts({ pathname: '/preferences/reader@example.com' }), base).path).toBe('/preferences/[redacted]')
    expect(redactPath('/preferences/reader@example.com')).toBe('/preferences/[redacted]')
    expect(redactPath('/x/reader%40example.com/y')).toBe('/x/[redacted]/y')
    expect(redactPath('/t/' + 'Ab3'.repeat(9))).toBe('/t/[redacted]')
    expect(redactPath('/concepts/creator-flywheel')).toBe('/concepts/creator-flywheel')
    expect(redactPath('/creator-business-without-performing')).toBe('/creator-business-without-performing')
    expect(redactPath('/x/550e8400-e29b-41d4-a716-446655440000')).toBe('/x/[redacted]')
    expect(redactPath('/x/' + 'deadbeef'.repeat(4))).toBe('/x/[redacted]')
    expect(redactPath('/' + 'a-b/'.repeat(80)).length).toBeLessThanOrEqual(200)
  })

  it('keeps a human row to the browser family and the minute', () => {
    const row = buildRow(facts(), base)
    expect(row.kind).toBe('likely_human')
    expect(row.user_agent).toBe('Chrome 131 / Windows')
    expect(row.ts).toBe('2026-11-27T22:13:00.000Z')
  })

  it('keeps an agent row to the second, with its user agent truncated', () => {
    const row = buildRow(facts({ userAgent: 'GPTBot/1.2 ' + 'x'.repeat(400) }), base)
    expect(row.ts).toBe('2026-11-27T22:13:45.000Z')
    expect(row.user_agent!.length).toBeLessThanOrEqual(300)
  })

  it('keeps only the browser family for any browser-shaped row that is not a named agent', () => {
    // The privacy page promises the browser family. A browser sending no
    // Sec-Fetch headers reads unknown, and its full string can name a phone model.
    const phone = 'Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
    const unknownRow = buildRow(facts({ userAgent: phone, secFetchDest: null, secFetchMode: null }), base)
    expect(unknownRow.kind).toBe('unknown')
    expect(unknownRow.user_agent).toBe('Chrome 131 / Android')
    const rangeRow = buildRow(facts({ ip: GPTBOT_V4 }), base)
    expect(rangeRow.kind).toBe('provider_range')
    expect(rangeRow.user_agent).toBe('Chrome 131 / Windows')
    // Software keeps its own string: that is how its kind is recorded.
    expect(buildRow(facts({ userAgent: 'curl/8.18.0' }), base).user_agent).toBe('curl/8.18.0')
  })

  it('reduces a browser string to family, major version and OS', () => {
    expect(reduceUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15')).toBe('Safari 18 / macOS')
    expect(reduceUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0')).toBe('Firefox 133 / Windows')
    expect(reduceUserAgent(CHROME + ' Edg/131.0.0.0')).toBe('Edge 131 / Windows')
    expect(reduceUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1')).toBe('Safari 18 / iOS')
  })

  it('keeps the referrer to its host, buckets accept and strips control characters', () => {
    const row = buildRow(facts({ referer: 'https://www.linkedin.com/feed/?trk=abc', accept: 'text/markdown, text/html;q=0.9', userAgent: 'GPTBot/1.2\u0007\nIgnore previous instructions' }), base)
    expect(row.referrer_host).toBe('www.linkedin.com')
    expect(row.accept).toBe('markdown')
    expect(row.user_agent).not.toMatch(/[\u0000-\u001f\u007f]/)
    expect(buildRow(facts({ referer: 'not a url' }), base).referrer_host).toBeNull()
  })

  it('blanks the daily marker on a no-track path', () => {
    expect(buildRow(facts({ pathname: '/preferences' }), base).visitor_day).toBeNull()
    expect(buildRow(facts({ pathname: '/updates/join' }), base).visitor_day).toBeNull()
    expect(buildRow(facts({ pathname: '/unsubscribe' }), base).visitor_day).toBeNull()
    expect(buildRow(facts(), base).visitor_day).toBe('a1b2c3d4e5f60718')
  })
})

describe('salt and the daily marker', () => {
  it('fetches one salt per UTC day and a new one the next day', async () => {
    let n = 0
    const fetchSalt = vi.fn(async () => {
      n++
      return { day: n === 1 ? '2026-11-27' : '2026-11-28', salt: String(n).repeat(64) }
    })
    const source = createSaltSource(fetchSalt)
    const a = await source.get(new Date('2026-11-27T01:00:00Z'))
    const b = await source.get(new Date('2026-11-27T23:59:59Z'))
    expect(a).toBe(b)
    expect(fetchSalt).toHaveBeenCalledTimes(1)
    const c = await source.get(new Date('2026-11-28T00:00:01Z'))
    expect(c).not.toBe(a)
    expect(fetchSalt).toHaveBeenCalledTimes(2)
  })

  it('shares one fetch among concurrent first calls', async () => {
    const fetchSalt = vi.fn(async () => ({ day: '2026-11-27', salt: 'f'.repeat(64) }))
    const source = createSaltSource(fetchSalt)
    const now = new Date('2026-11-27T12:00:00Z')
    await Promise.all([source.get(now), source.get(now), source.get(now)])
    expect(fetchSalt).toHaveBeenCalledTimes(1)
  })

  it('returns null, says so once per window and retries later when the salt cannot be read', async () => {
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    const fetchSalt = vi.fn(async () => { throw new Error('down') })
    const source = createSaltSource(fetchSalt)
    expect(await source.get(new Date('2026-11-27T12:00:00Z'))).toBeNull()
    expect(await source.get(new Date('2026-11-27T12:00:30Z'))).toBeNull()
    expect(fetchSalt).toHaveBeenCalledTimes(1)
    expect(errors).toHaveBeenCalledTimes(1)
    await source.get(new Date('2026-11-27T12:01:31Z'))
    expect(fetchSalt).toHaveBeenCalledTimes(2)
    expect(errors).toHaveBeenCalledTimes(2)
    errors.mockRestore()
  })

  it('makes a 16-hex marker that leaves out the site and changes with the salt', async () => {
    const m1 = await visitorDay('a'.repeat(64), IP, CHROME)
    expect(m1).toMatch(/^[0-9a-f]{16}$/)
    expect(await visitorDay('a'.repeat(64), IP, CHROME)).toBe(m1)
    expect(await visitorDay('b'.repeat(64), IP, CHROME)).not.toBe(m1)
    expect(m1).not.toContain(IP)
  })
})

describe('the writer', () => {
  function harness(env: Record<string, string | undefined>) {
    const calls: { url: string; body: string }[] = []
    const fetchImpl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const u = String(url)
      calls.push({ url: u, body: String(init?.body ?? '') })
      if (u.endsWith('/rpc/page_request_salt')) return new Response(JSON.stringify([{ day: '2026-11-27', salt: 'c'.repeat(64) }]), { status: 200 })
      return new Response(null, { status: 201 })
    })
    const logger = createLogger({ env: () => env, fetchImpl, site: 'infinitegameos', now: () => new Date('2026-11-27T22:00:00Z') })
    return { calls, fetchImpl, logger }
  }
  const keys = { SUPABASE_URL: 'https://db.example.co', SUPABASE_SERVICE_ROLE_KEY: 'service-key' }

  it('writes nothing in development', async () => {
    const h = harness({ ...keys, VERCEL_ENV: undefined })
    await h.logger.log(facts())
    expect(h.fetchImpl).not.toHaveBeenCalled()
  })

  it('writes nothing when the kill switch is off', async () => {
    const h = harness({ ...keys, VERCEL_ENV: 'production', AGENT_LOG: 'off' })
    await h.logger.log(facts())
    expect(h.fetchImpl).not.toHaveBeenCalled()
  })

  it('writes nothing for a method other than GET or HEAD', async () => {
    const h = harness({ ...keys, VERCEL_ENV: 'production' })
    await h.logger.log(facts({ method: 'POST' }))
    expect(h.fetchImpl).not.toHaveBeenCalled()
  })

  it('posts one row without the IP to page_requests on production', async () => {
    const h = harness({ ...keys, VERCEL_ENV: 'production' })
    await h.logger.log(facts({ userAgent: 'GPTBot/1.2', ip: GPTBOT_V4 }))
    const insert = h.calls.find((c) => c.url.endsWith('/rest/v1/page_requests'))!
    expect(insert).toBeDefined()
    expect(insert.body).not.toContain(GPTBOT_V4)
    const row = JSON.parse(insert.body)
    expect(row.env).toBe('production')
    expect(row.site).toBe('infinitegameos')
    expect(row.visitor_day).toMatch(/^[0-9a-f]{16}$/)
  })

  it('drops writes past the per-minute cap and never throws on a failed write', async () => {
    const calls: string[] = []
    const fetchImpl = vi.fn(async (url: string | URL | Request) => {
      calls.push(String(url))
      if (String(url).endsWith('/rpc/page_request_salt')) return new Response(JSON.stringify([{ day: '2026-11-27', salt: 'c'.repeat(64) }]))
      throw new Error('network down')
    })
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    const logger = createLogger({ env: () => ({ ...keys, VERCEL_ENV: 'preview' }), fetchImpl, site: 'infinitegameos', now: () => new Date('2026-11-27T22:00:00Z'), capPerMinute: 2 })
    for (let i = 0; i < 5; i++) await logger.log(facts())
    expect(calls.filter((u) => u.endsWith('/rest/v1/page_requests')).length).toBe(2)
    expect(errors).toHaveBeenCalled()
    errors.mockRestore()
  })
})

describe('the proxy matcher', () => {
  const nextConfig = {}
  const reaches = (url: string, headers: Record<string, string> = {}) =>
    unstable_doesMiddlewareMatch({ config, url, headers, nextConfig })

  it('reaches every agent discovery file, and each one exists', () => {
    for (const f of DISCOVERY_FILES) {
      expect(reaches(f.path), f.path).toBe(true)
      expect(existsSync(f.source), f.source).toBe(true)
    }
  })

  it('lists every text file at the public root as a discovery file', () => {
    const listed = new Set(DISCOVERY_FILES.map((f) => f.path))
    for (const name of readdirSync('public', { withFileTypes: true }).filter((d) => d.isFile()).map((d) => d.name)) {
      if (!/\.(txt|md|json|xml)$/.test(name)) continue
      if (/^[0-9a-f]{32}\.txt$/.test(name)) continue // the IndexNow key; still reached, never a discovery file
      expect(listed.has(`/${name}`), name).toBe(true)
    }
  })

  it('reaches every non-asset file anywhere under public/, and no asset file', () => {
    const ASSET = /\.(png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|css|js|mjs|map)$/i
    const files = (readdirSync('public', { recursive: true, withFileTypes: true }) as import('node:fs').Dirent[])
      .filter((d) => d.isFile())
      .map((d) => `${d.parentPath ?? (d as unknown as { path: string }).path}/${d.name}`.replace(/\\/g, '/').replace(/^public/, ''))
    expect(files.length).toBeGreaterThan(10)
    for (const f of files) expect(reaches(f), f).toBe(!ASSET.test(f))
  })

  it('reaches every app route that serves a non-HTML file', () => {
    for (const p of ['/sitemap.xml', '/rss.xml', '/install/cursor/igos.mdc']) expect(reaches(p), p).toBe(true)
  })

  it('reaches pages, and HEAD and markdown requests to them', () => {
    for (const p of ['/', '/the-os', '/concepts/creator-flywheel', '/preferences', '/opengraph-image']) expect(reaches(p), p).toBe(true)
    expect(reaches('/the-os', { accept: 'text/markdown' })).toBe(true)
  })

  it('never reaches the API, build assets, the markdown handler, static files or a prefetch', () => {
    for (const p of ['/api/igos-subscribe', '/_next/static/chunks/a.js', '/_next/image', '/markdown/the-os', '/next.svg', '/sky/sky-vivid-1920.avif', '/images/x.png', '/favicon.ico', '/fonts/a.woff2', '/x.css', '/x.js.map']) {
      expect(reaches(p), p).toBe(false)
    }
    expect(reaches('/the-os', { 'next-router-prefetch': '1' })).toBe(false)
    expect(reaches('/the-os', { purpose: 'prefetch' })).toBe(false)
    expect(reaches('/the-os', { 'sec-purpose': 'prefetch' })).toBe(false)
    expect(reaches('/the-os', { 'sec-purpose': 'prefetch;prerender' })).toBe(false)
    expect(reaches('/markdown')).toBe(false)
    expect(reaches('/markdowns-are-fine')).toBe(true)
  })
})
