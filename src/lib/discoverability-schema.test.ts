import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { concepts } from '@/data/concepts'
import { getAssetsByType } from '@/data/library'
import { getAllUpdates } from '@/lib/updates'

// Regression guards for the Part A fixes from the 2026-11-03 discoverability
// audit. Pages render server-side with MDX and client components, so these
// read the page sources and the data the JSON-LD is built from.

const APP = join(process.cwd(), 'src', 'app')
const read = (rel: string) => readFileSync(join(APP, rel), 'utf8')

// Pages held out of these fixes. /infinite-game sits under a measurement
// window. /privacy is outside the files this build may change.
const HELD_PAGES = new Set(['infinite-game/page.tsx', 'privacy/page.tsx'])
const HELD_UPDATE = 'what-is-a-practical-alternative-to-follow-your-passion'

function pageFiles(dir = APP, base = ''): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    if (name === 'api') continue
    const full = join(dir, name)
    const rel = base ? `${base}/${name}` : name
    if (statSync(full).isDirectory()) out.push(...pageFiles(full, rel))
    else if (name === 'page.tsx') out.push(rel)
  }
  return out
}

const ARTICLE_PAGES = pageFiles().filter(
  (f) => !HELD_PAGES.has(f) && /'@type': (\[)?'(Tech)?Article'/.test(read(f))
)

describe('Article and CreativeWork publisher', () => {
  it('finds the Article-bearing pages', () => {
    expect(ARTICLE_PAGES.length).toBeGreaterThanOrEqual(14)
  })

  it('never points publisher at the WebSite node', () => {
    for (const f of pageFiles().filter((p) => !HELD_PAGES.has(p))) {
      expect(read(f), f).not.toMatch(/publisher:\s*\{\s*'@id':\s*['`][^'`]*#website/)
    }
  })

  it('points every Article publisher at the Organization node', () => {
    for (const f of ARTICLE_PAGES) {
      expect(read(f), f).toMatch(/publisher:\s*\{\s*'@id':.*#organization/)
    }
  })
})

describe('Article image', () => {
  it('every Article node references an Open Graph image', () => {
    for (const f of ARTICLE_PAGES) {
      expect(read(f), f).toMatch(/\bimage:\s*['`][^'`]*\/opengraph-image['`]/)
    }
  })
})

describe('/updates article JSON-LD', () => {
  const src = read('updates/[slug]/page.tsx')

  it('carries author and dateModified', () => {
    const block = src.slice(src.indexOf('const articleSchema'), src.indexOf('const faqSchema'))
    expect(block).toMatch(/author:\s*\{\s*'@id':\s*'https:\/\/infinitegameos\.io\/#person'/)
    expect(block).toMatch(/dateModified:\s*`\$\{update\.date\}T00:00:00Z`/)
  })

  it('gives every update a valid frontmatter date to feed dateModified', () => {
    const updates = getAllUpdates()
    expect(updates.length).toBeGreaterThan(0)
    for (const u of updates) {
      expect(u.date, u.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(`${u.date}T00:00:00Z`)), u.slug).toBe(false)
    }
  })

  it('keeps the measurement-window article out of the schema changes', () => {
    // The hold lives in src/data/design-map.ts (the design pass reads it too);
    // the page imports it.
    const map = readFileSync(join(process.cwd(), 'src', 'data', 'design-map.ts'), 'utf8')
    expect(map).toMatch(new RegExp(`MEASUREMENT_HOLD = new Set\\(\\['${HELD_UPDATE}'\\]\\)`))
    expect(src).toMatch(/import \{[^}]*MEASUREMENT_HOLD[^}]*\} from '@\/data\/design-map'/)
  })
})

describe('/concepts article JSON-LD dates', () => {
  it('every concept carries a published date on or before its updated date', () => {
    for (const c of concepts) {
      expect(c.published, c.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(c.updated, c.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(c.published <= c.updated, c.slug).toBe(true)
    }
  })

  it('feeds datePublished and dateModified', () => {
    const src = read('concepts/[slug]/page.tsx')
    expect(src).toMatch(/datePublished:\s*`\$\{concept\.published\}T00:00:00Z`/)
    expect(src).toMatch(/dateModified:\s*`\$\{concept\.updated\}T00:00:00Z`/)
  })
})

describe('/charter CreativeWork dates', () => {
  it('carries dateModified', () => {
    expect(read('charter/page.tsx')).toMatch(/dateModified:\s*'\d{4}-\d{2}-\d{2}'/)
  })
})

describe('bundle titles', () => {
  it('never doubles "Bundle"', () => {
    const src = read('bundles/[slug]/page.tsx')
    // Mirror the template: the suffix only when the asset title lacks it.
    const m = src.match(/const pageTitle = \/(.+)\/\.test\(asset\.title\) \? asset\.title : `\$\{asset\.title\}: Bundle`/)
    expect(m, 'pageTitle guard').not.toBeNull()
    expect(src).not.toMatch(/title:\s*`\$\{asset\.title\}: Bundle`/)
    const guard = new RegExp(m![1])
    for (const a of getAssetsByType('bundle')) {
      const title = guard.test(a.title) ? a.title : `${a.title}: Bundle`
      expect(title, a.slug).not.toMatch(/Bundle: Bundle$/)
    }
  })
})

describe('markdown alternates', () => {
  // Pages that are not served as twins on purpose (no-track) or held.
  const NO_TWIN = new Set(['preferences/page.tsx', 'unsubscribe/page.tsx', 'privacy/page.tsx'])

  it('every top-level page with a twin declares its text/markdown alternate', () => {
    const top = pageFiles().filter((f) => f.split('/').length <= 2 && !f.includes('['))
    for (const f of top.filter((p) => !NO_TWIN.has(p))) {
      expect(read(f), f).toContain("'text/markdown'")
    }
  })
})

describe('sitemap comments', () => {
  it('states no stale concept count', () => {
    const src = readFileSync(join(APP, 'sitemap.ts'), 'utf8')
    for (const m of src.matchAll(/all (\d+) carry/g)) {
      expect(Number(m[1])).toBe(concepts.length)
    }
  })
})
