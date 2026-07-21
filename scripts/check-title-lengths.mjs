#!/usr/bin/env node
/**
 * Title-length gate. Web Strategy Codex V.12.a.
 *
 * Bing Webmaster Tools flags any rendered <title> over 65 characters where
 * Google stays silent. The Kingdom holds the stricter bar.
 *
 * Every /updates/[slug] page renders `seoTitle` verbatim when present, and
 * otherwise renders `title` with the layout template ` | Infinite Game OS`
 * appended. This checks the string a crawler actually receives.
 *
 * Runs on prebuild. A violation fails the build.
 *
 * Positive control: `node scripts/check-title-lengths.mjs --self-test`
 * proves the check can fail before you trust it passing.
 */

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const LIMIT = 65
const TEMPLATE_SUFFIX = ' | Infinite Game OS'
const UPDATES_DIR = path.join(process.cwd(), 'content', 'updates')

/** The exact string a crawler receives for one update's frontmatter. */
export function renderedTitle(data) {
  if (data.seoTitle) return String(data.seoTitle)
  return `${data.title}${TEMPLATE_SUFFIX}`
}

function collect() {
  return fs
    .readdirSync(UPDATES_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const { data } = matter(fs.readFileSync(path.join(UPDATES_DIR, filename), 'utf8'))
      const rendered = renderedTitle(data)
      return { filename, rendered, length: [...rendered].length }
    })
}

function selfTest() {
  const over = renderedTitle({ title: 'x'.repeat(60) })
  const under = renderedTitle({ seoTitle: 'x'.repeat(10) })
  const overFails = [...over].length > LIMIT
  const underPasses = [...under].length <= LIMIT
  if (overFails && underPasses) {
    console.log('Positive control passed. The gate flags a 60-char title once the template lands, and clears a short seoTitle.')
    process.exit(0)
  }
  console.error('Positive control FAILED. The gate cannot detect a violation and must not be trusted.')
  process.exit(1)
}

if (process.argv.includes('--self-test')) selfTest()

const entries = collect()
const violations = entries.filter(e => e.length > LIMIT)

if (violations.length > 0) {
  console.error(`\nTitle-length gate FAILED. ${violations.length} of ${entries.length} updates exceed ${LIMIT} characters (codex V.12.a).\n`)
  for (const v of violations.sort((a, b) => b.length - a.length)) {
    console.error(`  ${String(v.length).padStart(3)} chars  ${v.filename}`)
    console.error(`            ${v.rendered}`)
  }
  console.error(`\nRemedy: add a frontmatter \`seoTitle\` of ${LIMIT} characters or fewer. It renders verbatim and suppresses the "${TEMPLATE_SUFFIX.trim()}" template.`)
  console.error(`Budget without a seoTitle: ${LIMIT - TEMPLATE_SUFFIX.length} characters of title.\n`)
  process.exit(1)
}

console.log(`Title-length gate passed. ${entries.length} updates, all at or under ${LIMIT} characters.`)
