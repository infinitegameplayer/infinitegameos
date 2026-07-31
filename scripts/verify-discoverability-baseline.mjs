#!/usr/bin/env node
/**
 * verify-discoverability-baseline.mjs
 *
 * Live discoverability baseline check for infinitegameos.io. Confirms the
 * machine-legible surface AI crawlers and agents depend on is actually being
 * served, from the live www origin.
 *
 * Third and final site to receive a live net, closing the coverage rotation the
 * Site Update skill opened on 2026-07-14 and named again on 2026-07-24. Until
 * this file existed, IGOS could drift for months and look fine, because looking
 * fine is exactly what a stale surface does.
 *
 * Written by asking the question the 2026-07-24 rotation entry names: when
 * extending a net to another site, the highest-yield move is asking what the
 * earlier nets never checked. Three answers, and all three are checked here:
 *
 *   1. REDIRECT HOPS IN THE SITEMAP. The sibling scripts resolve each sitemap
 *      URL with a plain fetch, which follows redirects, so a URL that 301s to
 *      somewhere else still reports 200 and still passes. A sitemap advertising
 *      a redirect spends crawler budget on a hop the crawler did not need. This
 *      script resolves with redirect: 'manual' and asserts the FIRST response is
 *      200, so a hop is visible rather than absorbed.
 *
 *   2. THE SITEMAP DIRECTIVE INSIDE robots.txt. Both siblings assert only that
 *      a Sitemap: line exists. The URL on that line is never fetched and never
 *      checked for www form, so robots.txt could point a crawler at an apex or
 *      dead sitemap and every check would still pass.
 *
 *   3. THE NAMED AI CRAWLER ALLOWANCES. IGOS courts AI crawlers deliberately
 *      and robots.txt names each one. A silent regression that dropped those
 *      groups would leave the site reachable and the intent gone.
 *
 * Carried forward from the lanebelone net: www-canonical is checked across BOTH
 * llms surfaces. Checking one of two equivalent surfaces reports the health of
 * the surface checked, never the pair.
 *
 * POSITIVE CONTROL. The redirect assertion is an assertion of absence, so it
 * carries a control that proves the detector can see a redirect that is present
 * before any absence is believed. The control fetches the apex origin, which is
 * known to redirect to www. A failed control voids the redirect result rather
 * than passing it, per the 2026-07-24 lesson that a broken instrument reports
 * clean.
 *
 * Reference: Web Strategy Codex V.9 (www-canonical), VI.7 (page-type schema).
 *
 * Runtime: post-deploy gate or manual. Pairs with Deploy Seal.
 *   Manual:   node scripts/verify-discoverability-baseline.mjs
 *   CI gate:  node scripts/verify-discoverability-baseline.mjs --json
 *
 * Flags:
 *   --base <url>   Origin to check. Default https://www.infinitegameos.io
 *   --json         Emit a structured JSON report on stdout.
 *   --skip-sitemap Skip the per-URL sitemap resolution sweep (faster).
 *   --help         Print usage.
 *
 * Exit code: 0 when every check passes, 1 on any failure.
 *
 * Ambassador Doctrine: external-facing fetcher. The User-Agent identifies the
 * routine and links back to the site association (Saṃśraya: confirm the outward
 * surface before declaring it sound).
 */

const DEFAULT_BASE = 'https://www.infinitegameos.io'
const APEX_ORIGIN = 'https://infinitegameos.io'
const APEX_RE = /https:\/\/infinitegameos\.io/g
const UA =
  'InfiniteGameOS-DiscoverabilityBaseline/1.0 (+https://www.infinitegameos.io; Kingdom discoverability self-audit)'

// robots.txt names these deliberately. IGOS invites AI crawlers rather than
// tolerating them, and the invitation is the thing worth guarding.
const EXPECTED_AI_AGENTS = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'Applebot']

function parseArgs(argv) {
  const args = { base: DEFAULT_BASE, json: false, skipSitemap: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--base') args.base = argv[++i]
    else if (a === '--json') args.json = true
    else if (a === '--skip-sitemap') args.skipSitemap = true
    else if (a === '--help') args.help = true
  }
  return args
}

async function fetchResource(url, accept) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: accept } })
  const body = await res.text()
  return { status: res.status, finalUrl: res.url, body }
}

function extractJsonLdBlocks(html) {
  const blocks = []
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1].trim()))
    } catch {
      blocks.push({ __parseError: true })
    }
  }
  return blocks
}

function flattenNodes(block) {
  if (Array.isArray(block)) return block.flatMap(flattenNodes)
  if (block && typeof block === 'object') {
    if (Array.isArray(block['@graph'])) return block['@graph'].flatMap(flattenNodes)
    return [block]
  }
  return []
}

function typesPresent(html) {
  const types = new Set()
  for (const block of extractJsonLdBlocks(html)) {
    for (const node of flattenNodes(block)) {
      if (node && typeof node['@type'] === 'string') types.add(node['@type'])
    }
  }
  return types
}

async function checkStaticFile(base, path, sanity) {
  const url = `${base}${path}`
  const violations = []
  let res
  try {
    res = await fetchResource(url, '*/*')
  } catch (err) {
    return { name: path, violations: [`fetch error: ${err.message}`] }
  }
  if (res.status !== 200) {
    violations.push(`HTTP ${res.status} (expected 200, resolved ${res.finalUrl})`)
    return { name: path, violations }
  }
  violations.push(...sanity(res.body))
  return { name: path, violations }
}

function apexViolations(body, label) {
  const apex = body.match(APEX_RE)
  return apex ? [`${apex.length} apex-form internal link(s) in ${label} (codex V.9 is www-canonical)`] : []
}

function sanityRobots(body) {
  const v = []
  if (!/user-agent:/i.test(body)) v.push('no User-agent group')
  const missing = EXPECTED_AI_AGENTS.filter(
    (a) => !new RegExp(`user-agent:\\s*${a}\\b`, 'i').test(body)
  )
  if (missing.length > 0) v.push(`AI crawler group(s) missing: ${missing.join(', ')}`)
  return v
}

// The line both sibling scripts assert exists and never read. A robots.txt can
// point a crawler at an apex-form or dead sitemap while every other check passes.
async function checkRobotsSitemapDirective(base) {
  const violations = []
  let body
  try {
    const res = await fetchResource(`${base}/robots.txt`, '*/*')
    if (res.status !== 200) return { name: 'robots.txt Sitemap directive', violations: [`robots.txt HTTP ${res.status}`] }
    body = res.body
  } catch (err) {
    return { name: 'robots.txt Sitemap directive', violations: [`fetch error: ${err.message}`] }
  }

  const lines = [...body.matchAll(/^\s*sitemap:\s*(\S+)\s*$/gim)].map((m) => m[1])
  if (lines.length === 0) {
    return { name: 'robots.txt Sitemap directive', violations: ['no Sitemap directive'] }
  }

  for (const url of lines) {
    if (!url.startsWith(`${base}/`)) {
      violations.push(`Sitemap directive is ${url}, expected the ${base} origin`)
      continue
    }
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      if (res.status !== 200) violations.push(`Sitemap directive ${url} -> HTTP ${res.status}`)
    } catch (err) {
      violations.push(`Sitemap directive ${url} -> ${err.message}`)
    }
  }
  return { name: `robots.txt Sitemap directive (${lines.length})`, violations }
}

function sanityLlms(body) {
  const v = []
  if (!/^#\s+Infinite Game OS/m.test(body)) v.push('missing "# Infinite Game OS" header')
  v.push(...apexViolations(body, 'llms.txt'))
  return v
}

function sanityLlmsFull(body) {
  const v = []
  if (!/^#\s+/m.test(body)) v.push('missing markdown header')
  v.push(...apexViolations(body, 'llms-full.txt'))
  return v
}

function sanitySitemap(body) {
  const v = []
  if (!/<urlset[\s>]/.test(body)) v.push('no <urlset> root')
  if (!/<loc>https:\/\/www\.infinitegameos\.io/.test(body)) v.push('no www <loc> entries')
  return v
}

function sanityRss(body) {
  const v = []
  if (!/<rss[\s>]/.test(body) && !/<feed[\s>]/.test(body)) v.push('no <rss> or <feed> root')
  if (!/<channel[\s>]/.test(body) && !/<entry[\s>]/.test(body)) v.push('no channel or entries')
  v.push(...apexViolations(body, 'rss.xml'))
  return v
}

async function checkHomepage(base) {
  const results = []
  let html
  try {
    const res = await fetchResource(`${base}/`, 'text/html')
    if (res.status !== 200) {
      return [{ name: 'homepage', violations: [`HTTP ${res.status} (resolved ${res.finalUrl})`] }]
    }
    html = res.body
  } catch (err) {
    return [{ name: 'homepage', violations: [`fetch error: ${err.message}`] }]
  }

  const jsonLd = []
  const types = typesPresent(html)
  for (const t of ['WebSite', 'Organization']) {
    if (!types.has(t)) jsonLd.push(`no ${t} JSON-LD node`)
  }
  if (types.has('__parseError')) jsonLd.push('a JSON-LD block failed to parse')
  results.push({ name: 'homepage JSON-LD', violations: jsonLd })

  const canon = []
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  if (!m) canon.push('no canonical link element')
  else if (!m[1].startsWith(base)) canon.push(`canonical is ${m[1]}, expected the ${base} origin`)
  results.push({ name: 'homepage canonical', violations: canon })

  return results
}

// Proves the redirect detector can see a redirect that is present, before any
// absence of redirects is believed. The apex origin is known to redirect to www.
async function redirectDetectorControl() {
  try {
    const res = await fetch(`${APEX_ORIGIN}/`, {
      method: 'HEAD',
      redirect: 'manual',
      headers: { 'User-Agent': UA },
    })
    if (res.status >= 300 && res.status < 400) return { ok: true, observed: res.status }
    return { ok: false, observed: `HTTP ${res.status} from ${APEX_ORIGIN} (expected a 3xx)` }
  } catch (err) {
    return { ok: false, observed: `control fetch error: ${err.message}` }
  }
}

async function checkSitemapUrls(base) {
  let body
  try {
    const res = await fetchResource(`${base}/sitemap.xml`, '*/*')
    if (res.status !== 200) return [{ name: 'sitemap URLs', violations: [`sitemap HTTP ${res.status}`] }]
    body = res.body
  } catch (err) {
    return [{ name: 'sitemap URLs', violations: [`fetch error: ${err.message}`] }]
  }

  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (locs.length === 0) return [{ name: 'sitemap URLs', violations: ['no <loc> entries'] }]

  const control = await redirectDetectorControl()
  const results = [
    {
      name: 'redirect detector control',
      violations: control.ok ? [] : [`control failed, redirect result is void: ${control.observed}`],
    },
  ]
  if (!control.ok) {
    results.push({ name: 'sitemap URLs', violations: ['skipped: redirect detector control failed'] })
    return results
  }

  const bad = []
  // Sequential rather than parallel: this is a courtesy crawl of the Kingdom's
  // own origin, and a burst of 100+ concurrent requests is what a crawler that
  // gets blocked looks like.
  for (const url of locs) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'manual', headers: { 'User-Agent': UA } })
      if (res.status >= 300 && res.status < 400) {
        bad.push(`${url} -> HTTP ${res.status} redirect to ${res.headers.get('location') ?? 'unknown'}`)
      } else if (res.status !== 200) {
        bad.push(`${url} -> HTTP ${res.status}`)
      }
    } catch (err) {
      bad.push(`${url} -> ${err.message}`)
    }
  }
  results.push({ name: `sitemap URLs (${locs.length} checked, hop-free)`, violations: bad })
  return results
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(
      'Usage: node scripts/verify-discoverability-baseline.mjs [--base <url>] [--json] [--skip-sitemap]'
    )
    process.exit(0)
  }

  const base = args.base.replace(/\/$/, '')

  const results = []
  results.push(await checkStaticFile(base, '/robots.txt', sanityRobots))
  results.push(await checkRobotsSitemapDirective(base))
  results.push(await checkStaticFile(base, '/llms.txt', sanityLlms))
  results.push(await checkStaticFile(base, '/llms-full.txt', sanityLlmsFull))
  results.push(await checkStaticFile(base, '/sitemap.xml', sanitySitemap))
  results.push(await checkStaticFile(base, '/rss.xml', sanityRss))
  results.push(...(await checkHomepage(base)))
  if (!args.skipSitemap) results.push(...(await checkSitemapUrls(base)))

  const failed = results.filter((r) => r.violations.length > 0)

  if (args.json) {
    console.log(
      JSON.stringify(
        { ok: failed.length === 0, checked: results.length, failed: failed.length, base, results },
        null,
        2
      )
    )
  } else {
    console.log(`Discoverability baseline against ${base}. ${results.length} checks\n`)
    for (const r of results) {
      if (r.violations.length === 0) {
        console.log(`  PASS  ${r.name}`)
      } else {
        console.log(`  FAIL  ${r.name}`)
        for (const v of r.violations) console.log(`          ${v}`)
      }
    }
    console.log(
      `\n${failed.length === 0 ? 'Discoverability baseline holds.' : `${failed.length} check(s) need attention.`}`
    )
  }

  process.exit(failed.length === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(`verify-discoverability-baseline: ${err.message}`)
  process.exit(1)
})
