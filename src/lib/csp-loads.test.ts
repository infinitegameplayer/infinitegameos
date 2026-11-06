import { describe, it, expect, beforeAll, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

// The policy and the code are tied in both directions (Live Writers Prove
// Themselves, round three, Site Update 2026-11-05). lanebelone's policy once
// refused its own replay video for four months because the header listed its
// embeds by hand. Here every outside host the code loads is named once, with
// the file that loads it and the directives it needs:
//   1. the file still loads it (so the list cannot outlive the code),
//   2. the policy allows it (so a new loader fails here, not on the page),
//   3. the policy names no host the list does not claim (least privilege),
//   4. no loader line in src names a host the list has never heard of.

const SRC = path.join(process.cwd(), 'src')
const UMAMI_SAMPLE = 'https://umami.example.test'

type Load = { origin: string; directives: string[]; file: string; needle: string; why: string }

const LOADS: Load[] = [
  { origin: 'https://us.i.posthog.com', directives: ['script-src', 'connect-src'], file: 'src/instrumentation-client.ts', needle: "'https://us.i.posthog.com'", why: 'PostHog api_host default' },
  { origin: 'https://us-assets.i.posthog.com', directives: ['script-src', 'connect-src'], file: 'src/instrumentation-client.ts', needle: "from 'posthog-js'", why: 'posthog-js lazy-loads its recorder from the assets host' },
  { origin: UMAMI_SAMPLE, directives: ['script-src', 'connect-src'], file: 'src/components/UmamiAnalytics.tsx', needle: 'process.env.NEXT_PUBLIC_UMAMI_URL', why: 'Umami script, host read from env (a sample stands in for the env value)' },
]
// next/font/google self-hosts its files at build time (the live CSS reads
// url(../media/...)), so font-src names no outside host. fonts.gstatic.com sat
// there unclaimed until 2026-11-05.

// The directives this test governs. img-src allows every https host by design.
const GOVERNED = ['script-src', 'connect-src', 'frame-src', 'font-src']

function directives(policy: string): Map<string, string[]> {
  return new Map(
    policy.split(';').map((d) => {
      const [name, ...sources] = d.trim().split(/\s+/)
      return [name, sources] as const
    }),
  )
}

// The browser's fallback: frame-src falls to child-src, everything to default-src.
function sourcesFor(policy: string, directive: string): string[] {
  const d = directives(policy)
  if (d.has(directive)) return d.get(directive)!
  if (directive === 'frame-src' && d.has('child-src')) return d.get('child-src')!
  return d.get('default-src') ?? []
}

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return sourceFiles(full)
    return /\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name) ? [full] : []
  })
}

// A line that makes the browser fetch something: a script or frame tag, a
// src assignment, an analytics host, a client-side fetch to an absolute URL.
const LOADER = /<Script\b|<script\b|<iframe\b|\.src\s*=|\bsrc=\{?["'`]https?:|api_host|ui_host|embed\.js|new (Worker|EventSource|WebSocket)\(|fetch\(\s*["'`]https?:/

function originsOnLoaderLines(text: string): string[] {
  const found: string[] = []
  for (const line of text.split('\n')) {
    if (!LOADER.test(line)) continue
    for (const m of line.matchAll(/https?:\/\/[a-z0-9.-]+\.[a-z]{2,}/gi)) found.push(new URL(m[0]).origin)
  }
  return found
}

let policy = ''

beforeAll(async () => {
  vi.stubEnv('NEXT_PUBLIC_UMAMI_URL', UMAMI_SAMPLE)
  vi.resetModules()
  policy = (await import('./csp')).contentSecurityPolicy()
})

describe('every outside host the code loads is still loaded and allowed', () => {
  for (const load of LOADS) {
    it(`${load.origin}: ${load.why}`, () => {
      expect(fs.readFileSync(path.join(process.cwd(), load.file), 'utf8'), `${load.file} no longer contains ${load.needle}`).toContain(load.needle)
      for (const directive of load.directives) {
        expect(sourcesFor(policy, directive), `${directive} is missing ${load.origin}`).toContain(load.origin)
      }
    })
  }
})

describe('the policy opens no door the code does not use', () => {
  it('names no outside host in a governed directive that no loader claims', () => {
    const extra: string[] = []
    for (const directive of GOVERNED) {
      for (const source of sourcesFor(policy, directive)) {
        if (!/^https?:\/\//.test(source)) continue
        const claimed = LOADS.some((l) => l.origin === source && l.directives.includes(directive))
        if (!claimed) extra.push(`${directive} ${source}`)
      }
    }
    expect(extra).toEqual([])
  })
})

describe('no loader in src names a host the list has never heard of', () => {
  it('sees a host on a loader line in a sample, so an empty scan means none, not blindness', () => {
    expect(originsOnLoaderLines(`  <Script src="https://cdn.example.com/a.js" />\n  <a href="https://elsewhere.example.org">x</a>`)).toEqual([
      'https://cdn.example.com',
    ])
  })

  it('finds every loader host in the list', () => {
    const known = new Set(LOADS.map((l) => l.origin))
    const unknown: string[] = []
    for (const file of sourceFiles(SRC)) {
      for (const origin of originsOnLoaderLines(fs.readFileSync(file, 'utf8'))) {
        if (!known.has(origin)) unknown.push(`${origin} in ${path.relative(process.cwd(), file)}`)
      }
    }
    expect(unknown).toEqual([])
  })
})
