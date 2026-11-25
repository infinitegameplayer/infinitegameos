import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { FEED_TYPES } from './metadata'

// Every page that sets its own `alternates` keeps the RSS feed link.
//
// Next.js replaces a route's `alternates` object wholesale, so a page that
// declares a canonical without spreading FEED_TYPES drops the root layout's
// feed link. Until 2026-11-25 every one of the 140 sitemap pages did, while
// /rss.xml was live (Site Update coverage rotation). The live net in
// scripts/verify-discoverability-baseline.mjs reads the served HTML; this
// guard refuses the build before a page can ship without it.

const APP = path.join(process.cwd(), 'src/app')

function pages(dir = APP): string[] {
  const out: string[] = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...pages(p))
    else if (e.name === 'page.tsx') out.push(p)
  }
  return out
}

const rel = (p: string) => path.relative(APP, p).replace(/\\/g, '/')

// A page needs the feed when it sets alternates; the predicate is the guard.
function dropsFeed(source: string): boolean {
  return /\balternates:/.test(source) && !/\.\.\.FEED_TYPES\b/.test(source)
}

describe('feed link', () => {
  it('names the live feed', () => {
    expect(FEED_TYPES['application/rss+xml']).toBe('https://www.infinitegameos.io/rss.xml')
  })

  it('control: the predicate flags a page that sets alternates without the feed', () => {
    expect(dropsFeed("alternates: { canonical: 'x', types: { 'text/markdown': 'y' } }")).toBe(true)
    expect(dropsFeed("alternates: { canonical: 'x', types: { ...FEED_TYPES } }")).toBe(false)
    expect(dropsFeed("export const metadata = { title: 'x' }")).toBe(false)
  })

  const withAlternates = pages().filter((p) => /\balternates:/.test(fs.readFileSync(p, 'utf8')))

  it('finds the pages that set alternates', () => {
    expect(withAlternates.length).toBeGreaterThanOrEqual(24)
  })

  for (const p of withAlternates) {
    it(`${rel(p)} spreads FEED_TYPES into its alternates`, () => {
      expect(dropsFeed(fs.readFileSync(p, 'utf8'))).toBe(false)
    })
  }
})
