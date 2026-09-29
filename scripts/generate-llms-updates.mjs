// generate-llms-updates.mjs
// Regenerates the "Every Update" section of public/llms-full.txt from the
// frontmatter of content/updates/*.mdx, the same files the /updates pages are
// built from.
//
// llms-full.txt promises "structured summaries of each page". Until 2026-09-28
// its update sections were written by hand and named 27 of the 57 posts in the
// sitemap. The rest of the file stays hand-curated; only the block between the
// markers below is generated, so the list of posts can no longer fall behind
// the posts. King-ruled 2026-09-28. Held to the sitemap by the
// "llms-full.txt covers every sitemap update" check in
// scripts/verify-discoverability-baseline.mjs.
//
// Usage:
//   node scripts/generate-llms-updates.mjs           # write
//   node scripts/generate-llms-updates.mjs --check   # diff only, exit 1 on drift

import { readFile, writeFile, readdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { resolve, join } from 'path'
import matter from 'gray-matter'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const OUT = resolve(ROOT, 'public', 'llms-full.txt')
const UPDATES_DIR = resolve(ROOT, 'content', 'updates')
const ORIGIN = 'https://www.infinitegameos.io'
const START = '<!-- generated:updates-index:start -->'
const END = '<!-- generated:updates-index:end -->'
const CHECK = process.argv.includes('--check')

function normalizeDate(raw) {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10)
  return String(raw)
}

const files = (await readdir(UPDATES_DIR)).filter((f) => f.endsWith('.mdx'))
const updates = []
for (const file of files) {
  const { data } = matter(await readFile(join(UPDATES_DIR, file), 'utf8'))
  if (!data.slug || !data.title) {
    console.error(`generate-llms-updates: ${file} has no slug or title in its frontmatter`)
    process.exit(1)
  }
  updates.push({
    slug: String(data.slug),
    title: String(data.title),
    date: normalizeDate(data.date),
    summary: String(data.summary || '').replace(/\s+/g, ' ').trim(),
  })
}
updates.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))

const block = [
  START,
  '## Every Update (/updates)',
  '',
  `All ${updates.length} posts, newest first, generated at build from the same source as the pages. Each post carries Article and BreadcrumbList JSON-LD.`,
  '',
  ...updates.map((u) => `- [${u.title}](${ORIGIN}/updates/${u.slug}) (${u.date})${u.summary ? `: ${u.summary}` : ''}`),
  END,
].join('\n')

const raw = await readFile(OUT, 'utf8')
const eol = raw.includes('\r\n') ? '\r\n' : '\n'
const current = raw.replace(/\r\n/g, '\n')

let next
const s = current.indexOf(START)
const e = current.indexOf(END)
if (s !== -1 && e !== -1 && e > s) {
  next = current.slice(0, s) + block + current.slice(e + END.length)
} else {
  // First run: place the section before the changelog, or at the end.
  const anchor = current.indexOf('\n---\n\n## Changelog')
  next = anchor !== -1
    ? `${current.slice(0, anchor)}\n\n---\n\n${block}\n${current.slice(anchor)}`
    : `${current.replace(/\s*$/, '')}\n\n---\n\n${block}\n`
}

if (next === current) {
  console.log(`llms-full.txt updates index current (${updates.length} posts)`)
  process.exit(0)
}
if (CHECK) {
  console.error(`llms-full.txt updates index is stale; run node scripts/generate-llms-updates.mjs (${updates.length} posts)`)
  process.exit(1)
}
await writeFile(OUT, next.replace(/\n/g, eol), 'utf8')
console.log(`llms-full.txt updates index written (${updates.length} posts)`)
