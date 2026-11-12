import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { threads } from '@/data/threads'
import { concepts } from '@/data/concepts'
import { igosAssets } from '@/data/library'
import { resolvePage } from '@/lib/thread-resolve'
import {
  checkCards,
  checkKeys,
  checkWayIn,
  checkWayOut,
  checkQuestions,
  type ThreadContext,
} from '@/lib/thread-check'

// The build check for the thread map (PendingPlan - IGOS Web of Intrigue).
// Strict for every path the map lists, silent for pages it doesn't. The checks
// are pure functions in src/lib/thread-check.ts; this file feeds them the real
// map and expects zero problems.

// Standalone routes come from the filesystem: every static src/app/**/page.tsx.
function standaloneRoutes(): Set<string> {
  const root = path.join(process.cwd(), 'src', 'app')
  const found = new Set<string>()
  const walk = (dir: string, route: string) => {
    if (fs.existsSync(path.join(dir, 'page.tsx'))) found.add(route || '/')
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory() || /^[[(@_]/.test(e.name) || e.name === 'api') continue
      walk(path.join(dir, e.name), `${route}/${e.name}`)
    }
  }
  walk(root, '')
  return found
}

function inboundLinks(): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>()
  const add = (from: string, hrefs: string[]) => map.set(from, new Set([...(map.get(from) ?? []), ...hrefs]))
  for (const c of concepts) {
    add(`/concepts/${c.slug}`, [
      ...c.relatedSlugs.map(s => `/concepts/${s}`),
      ...(c.relatedUpdateSlugs ?? []).map(s => `/updates/${s}`),
      ...(c.pathBridge?.links.map(l => l.href) ?? []),
    ])
  }
  for (const a of igosAssets.filter(x => x.type === 'skill')) {
    const related = (a.relatedSlugs ?? []).flatMap(s => {
      const r = igosAssets.find(x => x.slug === s)
      return r ? [`/${r.type}s/${r.slug}`] : []
    })
    add(`/skills/${a.slug}`, [...related, ...(a.pathBridge?.links.map(l => l.href) ?? [])])
  }
  return map
}

// Listed pages with no way in by design. Each carries its done-check.
const EXEMPT = new Set([
  // Homepage: nothing is meant to lead "in" to it from a thread. Done when never.
  '/',
  // MEASUREMENT_HOLD pages: their copy stays as it was until the window closes.
  // Done when the hold's reading lands in the growth cycle's last-run.md.
  '/infinite-game',
  '/updates/what-is-a-practical-alternative-to-follow-your-passion',
])

const skills = new Map(igosAssets.filter(a => a.type === 'skill').map(a => [a.slug, a.title]))

const ctx: ThreadContext = {
  resolve: resolvePage,
  standalone: standaloneRoutes(),
  skills,
  inbound: inboundLinks(),
  exempt: EXEMPT,
}

describe('thread map', () => {
  it('has entries to check', () => {
    expect(Object.keys(threads).length).toBeGreaterThan(0)
  })
  it('every card is well formed and every page card leads to a live route', () => {
    expect(checkCards(threads, ctx)).toEqual([])
  })
  it('every listed page is itself a live route', () => {
    expect(checkKeys(threads, ctx)).toEqual([])
  })
  it('every listed page has a way in', () => {
    expect(checkWayIn(threads, ctx)).toEqual([])
  })
  it('every listed page has a way out', () => {
    expect(checkWayOut(threads)).toEqual([])
  })
  it('no question repeats its destination title', () => {
    expect(checkQuestions(threads, ctx)).toEqual([])
  })
})
