import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import nextConfig from '../../next.config'

// Every redirect and rewrite lands on a page that exists, and no redirect hides
// a page that does (Live Writers Prove Themselves, round three, Site Update
// 2026-11-05). Next runs redirects before the filesystem, so a stale source
// silently takes a live page away, and a stale destination sends a reader and a
// crawler to a 404 under a 308. Destinations on other hosts are not checked here.
//
// What it cannot see: a dynamic route (`[slug]`) accepts any value, so a
// destination naming a post that was removed still passes. The live nets
// resolve the sitemap for that.

const SITE = 'https://www.infinitegameos.io'
const ROOT = process.cwd()
const APP = path.join(ROOT, 'src', 'app')
const PUBLIC = path.join(ROOT, 'public')

type Route = string[]

// Metadata files that serve a URL of their own.
const SPECIAL: Record<string, string> = { sitemap: 'sitemap.xml', robots: 'robots.txt', manifest: 'manifest.webmanifest' }

function routesIn(dir: string, segs: string[] = []): Route[] {
  const out: Route[] = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name.startsWith('_') || e.name.startsWith('@')) continue
      const seg = /^\(.*\)$/.test(e.name) ? [] : [e.name]
      out.push(...routesIn(path.join(dir, e.name), [...segs, ...seg]))
      continue
    }
    if (/^(page|route)\.(tsx?|jsx?|mdx?)$/.test(e.name)) out.push(segs)
    const special = e.name.match(/^(sitemap|robots|manifest)\.(tsx?|jsx?)$/)
    if (special) out.push([...segs, SPECIAL[special[1]]])
  }
  return out
}

const isDynamic = (seg: string) => /^\[.+\]$/.test(seg)
const isCatchAll = (seg: string) => /^\[\[?\.\.\..+\]\]?$/.test(seg)
const isOptionalCatchAll = (seg: string) => /^\[\[\.\.\..+\]\]$/.test(seg)

// Does a route accept these path parts? A `:param` part is a value the
// redirect fills in, so it is accepted by any segment; a `:param*` part may
// fill zero or more segments.
function accepts(route: Route, parts: string[]): boolean {
  if (route.length === 0) return parts.length === 0 || (parts.length === 1 && /^:\w+\*$/.test(parts[0]))
  const [head, ...rest] = route
  if (isOptionalCatchAll(head)) return true
  if (isCatchAll(head)) return parts.length > 0
  if (parts.length === 0) return false
  const [part, ...more] = parts
  if (/^:\w+\*$/.test(part)) return route.every(isDynamic) || accepts(rest, parts) || accepts(rest, more)
  if (/^:\w+[+?]?$/.test(part) || isDynamic(head)) return accepts(rest, more)
  return head === part && accepts(rest, more)
}

const ROUTES = routesIn(APP)

function exists(pathname: string): boolean {
  const clean = pathname.split(/[?#]/)[0]
  const parts = clean.split('/').filter(Boolean)
  if (ROUTES.some((r) => accepts(r, parts))) return true
  return !clean.includes(':') && fs.existsSync(path.join(PUBLIC, decodeURIComponent(clean)))
}

// The path a destination lands on, or null when it leaves this site.
function ownPath(destination: string): string | null {
  const abs = destination.match(/^(https?:\/\/[^/]+)(\/.*)?$/)
  if (!abs) return destination
  return abs[1] === SITE ? (abs[2] ?? '/') : null
}

type Entry = { source: string; destination: string; has?: unknown; missing?: unknown }

async function rewriteEntries(): Promise<Entry[]> {
  const r = await nextConfig.rewrites?.()
  if (!r) return []
  if (Array.isArray(r)) return r
  return [...(r.beforeFiles ?? []), ...(r.afterFiles ?? []), ...(r.fallback ?? [])]
}

describe('the route checker can fail', () => {
  it('accepts a dynamic route and refuses a page that is not there', () => {
    expect(accepts(['blog', '[slug]'], ['blog', 'a-post'])).toBe(true)
    expect(accepts(['blog', '[slug]'], ['blog'])).toBe(false)
    expect(exists('/zz-no-such-page-zz')).toBe(false)
    expect(exists('/')).toBe(true)
  })
})

describe('every redirect lands on a page and hides none', async () => {
  const redirects = ((await nextConfig.redirects?.()) ?? []) as Entry[]

  it('has redirects to check', () => {
    expect(redirects.length).toBeGreaterThan(0)
  })

  for (const r of redirects) {
    const landing = ownPath(r.destination)
    if (landing !== null) {
      it(`${r.source} lands on ${r.destination}`, () => {
        expect(exists(landing), `${landing} is not a page on this site`).toBe(true)
      })
    }
    if (!r.has && !r.missing && !r.source.includes(':') && !r.source.includes('(')) {
      it(`${r.source} hides no live page`, () => {
        const parts = r.source.split('/').filter(Boolean)
        const shadowed = ROUTES.find((route) => route.length === parts.length && route.every((s, i) => s === parts[i]))
        expect(shadowed, `${r.source} is a page in src/app, and this redirect takes it away`).toBeUndefined()
      })
    }
  }
})

describe('every rewrite lands on a page', async () => {
  for (const r of await rewriteEntries()) {
    const landing = ownPath(r.destination)
    if (landing === null || /^https?:/.test(landing)) continue
    it(`${r.source} rewrites to ${r.destination}`, () => {
      expect(exists(landing), `${landing} is not a page on this site`).toBe(true)
    })
  }
})
