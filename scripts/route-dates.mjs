// route-dates.mjs
//
// Writes src/lib/route-dates.json: one ISO date per sitemap route, the date of
// the last commit that touched the page file or a module it imports directly
// from '@/'. A route whose source has uncommitted edits is dated now, since the
// commit about to land is its real change. The sitemap reads this file and
// refuses to build without a date for every route (Web Strategy Codex V.8:
// lastModified from page data, never the request time).
//
// Runs locally as `prebuild`. On Vercel it exits without writing, because the
// build clone is shallow and its git history would date every old page at the
// clone boundary. The committed JSON is the record the deploy ships.
//
//   node scripts/route-dates.mjs          write the file
//   node scripts/route-dates.mjs --check  exit 1 if the file would change
//
// Adopted from sidequesthq/scripts/route-dates.mjs. Content-driven entries
// (concepts, skills, protocols, bundles, updates) keep their own content dates.

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'src', 'lib', 'route-dates.json')

if (process.env.VERCEL) {
  console.log('route-dates: on Vercel, keeping the committed src/lib/route-dates.json')
  process.exit(0)
}

// Route path -> the page file. Every static entry in src/app/sitemap.ts has a row here.
const ROUTES = {
  '/': 'src/app/page.tsx',
  '/the-os': 'src/app/the-os/page.tsx',
  '/accord': 'src/app/accord/page.tsx',
  '/infinite-game': 'src/app/infinite-game/page.tsx',
  '/agentic-systems': 'src/app/agentic-systems/page.tsx',
  '/sovereignty': 'src/app/sovereignty/page.tsx',
  '/updates': 'src/app/updates/page.tsx',
  '/about': 'src/app/about/page.tsx',
  '/concepts': 'src/app/concepts/page.tsx',
  '/protocols': 'src/app/protocols/page.tsx',
  '/skills': 'src/app/skills/page.tsx',
  '/bundles': 'src/app/bundles/page.tsx',
  '/sovereign-ecosystem': 'src/app/sovereign-ecosystem/page.tsx',
  '/charter': 'src/app/charter/page.tsx',
  '/privacy': 'src/app/privacy/page.tsx',
  '/play-your-own-game': 'src/app/play-your-own-game/page.tsx',
  '/design-your-day': 'src/app/design-your-day/page.tsx',
  '/creator-business-without-performing': 'src/app/creator-business-without-performing/page.tsx',
  '/game-theory': 'src/app/game-theory/page.tsx',
}

const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim()

// Files with uncommitted changes, relative to ROOT.
const dirty = new Set(
  git('status', '--porcelain', '--untracked-files=all')
    .split('\n').filter(Boolean).map(l => l.slice(3).trim().replace(/^"|"$/g, '')),
)

// One level of '@/…' imports from a page file, resolved to files that exist.
function localImports(file) {
  const src = readFileSync(join(ROOT, file), 'utf8')
  const out = []
  for (const m of src.matchAll(/from\s+['"]@\/([^'"]+)['"]/g)) {
    const base = join('src', m[1])
    for (const c of [base, `${base}.ts`, `${base}.tsx`, join(base, 'index.ts'), join(base, 'index.tsx')]) {
      if (existsSync(join(ROOT, c))) { out.push(c.replace(/\\/g, '/')); break }
    }
  }
  return out
}

function dateFor(files) {
  if (files.some(f => dirty.has(f))) return new Date().toISOString()
  const iso = git('log', '-1', '--format=%cI', '--', ...files)
  if (!iso) throw new Error(`no commit found for ${files.join(', ')}`)
  return new Date(iso).toISOString()
}

const dates = {}
for (const [route, page] of Object.entries(ROUTES)) {
  if (!existsSync(join(ROOT, page))) throw new Error(`${route}: ${page} does not exist`)
  dates[route] = dateFor([page, ...localImports(page)])
}
const json = JSON.stringify(dates, null, 2) + '\n'

if (process.argv.includes('--check')) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : ''
  if (current !== json) { console.error('route-dates: src/lib/route-dates.json is stale, run npm run route-dates'); process.exit(1) }
  console.log('route-dates: current')
} else {
  writeFileSync(OUT, json)
  console.log(`route-dates: wrote ${Object.keys(dates).length} routes to src/lib/route-dates.json`)
}
