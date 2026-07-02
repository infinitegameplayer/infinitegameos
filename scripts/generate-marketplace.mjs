// generate-marketplace.mjs
// Regenerates public/marketplace.json from the asset registry
// (src/data/library.ts), the single source of truth per Web Strategy
// Codex V.4.c. Every plugin entry is an asset carrying
// installable.marketplaceId. The codex-required `category` field is the
// asset's registry type.
//
// Requires Node >= 22.6 (uses --experimental-strip-types to import the
// TypeScript registry directly; the registry is types-only TS, fully
// strippable).
//
// Usage:
//   node --experimental-strip-types scripts/generate-marketplace.mjs           # write
//   node --experimental-strip-types scripts/generate-marketplace.mjs --check   # diff only, exit 1 on drift
//
// If invoked without the flag, the script re-executes itself with it.

import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath, pathToFileURL } from 'url'
import { resolve } from 'path'
import { spawnSync } from 'child_process'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const OUT = resolve(ROOT, 'public', 'marketplace.json')

// Re-exec with strip-types when the flag is absent (lets `node scripts/...` just work).
if (!process.execArgv.some(a => a.includes('strip-types'))) {
  const r = spawnSync(process.execPath, ['--experimental-strip-types', fileURLToPath(import.meta.url), ...process.argv.slice(2)], { stdio: 'inherit' })
  process.exit(r.status ?? 1)
}

const { igosAssets } = await import(pathToFileURL(resolve(ROOT, 'src', 'data', 'library.ts')).href)

const OWNER = { name: 'Lane Belone', email: 'howdy@lanebelone.com' }
const REPO_URL = 'https://github.com/InfiniteGamePlayer/infinitegameos.git'
const REPO = 'https://github.com/InfiniteGamePlayer/infinitegameos'
const ROUTE_BY_TYPE = { skill: 'skills', protocol: 'protocols', codex: 'codices', concept: 'concepts', strategy: 'strategies', bundle: 'bundles' }

function normalizeVersion(v) {
  return /^\d+\.\d+$/.test(v) ? `${v}.0` : v
}

// Version and description ground truth is the installable artifact itself
// (plugins/<id>/.claude-plugin/plugin.json), since that is what a
// marketplace install actually serves. Registry supplies category (type),
// tags, slug and the fallback when a plugin.json is absent.
async function pluginJson(id) {
  try {
    return JSON.parse(await readFile(resolve(ROOT, 'plugins', id, '.claude-plugin', 'plugin.json'), 'utf8'))
  } catch {
    return null
  }
}

const plugins = []
for (const a of igosAssets) {
  const id = a.installable?.marketplaceId
  if (!id) continue
  const pj = await pluginJson(id)
  plugins.push({
    name: id,
    description: pj?.description ?? a.description,
    version: normalizeVersion(pj?.version ?? a.version),
    category: a.type,
    source: {
      source: 'git-subdir',
      url: REPO_URL,
      path: `plugins/${id}`,
    },
    homepage: `https://www.infinitegameos.io/${ROUTE_BY_TYPE[a.type]}/${a.slug}`,
    repository: REPO,
    license: 'CC-BY-4.0',
    tags: a.tags,
    author: OWNER,
  })
}

const manifest = {
  name: 'igos-library',
  description: 'Installable skills, protocols, codices and strategies for practitioners of long-term thinking, sovereign life design and agentic systems.',
  owner: OWNER,
  plugins,
}

const next = JSON.stringify(manifest, null, 2) + '\n'

if (process.argv.includes('--check')) {
  const current = await readFile(OUT, 'utf8').catch(() => '')
  if (current === next) {
    console.log(`marketplace.json in sync (${plugins.length} plugins).`)
    process.exit(0)
  }
  console.error(`marketplace.json DRIFTS from the registry (${plugins.length} plugins expected). Run: node scripts/generate-marketplace.mjs`)
  process.exit(1)
}

await writeFile(OUT, next, 'utf8')
console.log(`Wrote ${OUT} (${plugins.length} plugins).`)
