#!/usr/bin/env node
/**
 * Twin parity check.
 *
 * Every markdown twin should carry what its page asks of the reader and the
 * proof it shows. This walks a site's sitemap, fetches each page twice (as a
 * browser and as an agent asking for markdown) and asserts that everything
 * below, read from the page's own <main>, survives into the twin:
 *   - forms: each form's purpose is carried. If it asks for an email the twin
 *     says "email"; if the email is required the twin says "required"; the
 *     submit button's label appears.
 *   - priced doors: every button or link whose label carries a price appears
 *     by its label.
 *   - call-to-action links: every link in <main> whose label opens with an
 *     action verb (Start, Get, Buy, Join, Subscribe, Book, Invite, Download,
 *     Read, Leave, Reserve, Apply, Explore) points to the same place in the twin.
 *   - prices: every dollar amount in <main> appears in the twin.
 *   - testimonials: every quote with its star row appears, quote and name.
 * A markdown request answered with the HTML page itself (content-type
 * text/html) is the page, so parity holds by identity; those pages are counted
 * apart and never scored as twins.
 *
 * POSITIVE CONTROL. Before the sweep, the assertions run against a built-in
 * page carrying one of every kind of ask and proof. A twin that drops them all
 * must fail every rule, and a faithful twin must pass. A rule that cannot fail
 * stops the run with exit 2, because a check that cannot fail proves nothing.
 *
 * Usage (Node 18 or later, no dependencies):
 *   node scripts/verify-twin-parity.mjs https://www.example.com
 *   node scripts/verify-twin-parity.mjs http://localhost:3000
 *   node scripts/verify-twin-parity.mjs http://localhost:3000 --only /pricing
 *   node scripts/verify-twin-parity.mjs https://www.example.com --json parity.json
 * When the sitemap names your live domain and you check localhost, the pages
 * are fetched from localhost and links are compared as the live site writes them.
 * Exit: 0 all pass, 1 any failure, 2 the check itself could not run.
 *
 * From the Website Builder skill, https://www.infinitegameos.io/skills/website-builder (CC BY 4.0)
 */
import { writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

// Run only when invoked directly, so the assertions can be imported.
const DIRECT = import.meta.url === pathToFileURL(process.argv[1] || '').href

const argv = process.argv.slice(2)
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null }
const ORIGIN = (argv.find((a, i) => /^https?:\/\//.test(a) && argv[i - 1] !== '--json') || '').replace(/\/$/, '')
const ONLY_PATH = opt('--only')
const JSON_OUT = opt('--json')
const UA = 'TwinParityCheck/2.0 (+https://www.infinitegameos.io/skills/website-builder)'
const CTA = /^(start|get|buy|join|subscribe|book|invite|download|read|leave|reserve|apply|explore)\b/i

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
// Framework comment markers are not text, and an element marked aria-hidden is
// declared decorative, so neither is part of what a label says.
const textOf = (html) => decode(html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<(span|i|div)\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()
// One comparable form for page text and twin text: plain quotes, no markdown
// emphasis, no escapes, lower case, single spaces.
const norm = (s) => s
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-')
  .replace(/\\([\\`*_{}[\]()#+\-.!|>~])/g, '$1').replace(/[*_`]/g, '')
  .replace(/\s+/g, ' ').trim().toLowerCase()
// Link targets compare by host-less path, so www and relative forms agree.
const hrefKey = (href, origin) => {
  try {
    const u = new URL(decode(href), origin)
    if (/^(mailto|tel):/.test(u.protocol)) return u.href.toLowerCase()
    const host = u.hostname.replace(/^www\./, '')
    return `${host}${u.pathname.replace(/\/$/, '') || '/'}${u.hash}`.toLowerCase()
  } catch { return null }
}

function mainOf(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i)
  const body = m ? m[0] : (html.match(/<body[\s\S]*?<\/body>/i) || [html])[0]
  return body.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template[\s\S]*?<\/template>/gi, ' ')
}

// Everything the page asks of the reader and the proof it shows.
export function readPage(html, origin) {
  const main = mainOf(html)
  const forms = [...main.matchAll(/<form[\s\S]*?<\/form>/gi)].map(([f]) => {
    const inputs = [...f.matchAll(/<input\b[^>]*>/gi)].map(([i]) => i)
      .filter((i) => !/aria-hidden="true"|type="hidden"|honeypot/i.test(i))
    const email = inputs.find((i) => /type="email"/i.test(i))
    const submit = (f.match(/<button[^>]*type="submit"[^>]*>([\s\S]*?)<\/button>/i) || [])[1]
    return { asksEmail: !!email, emailRequired: !!email && /\srequired(=|\s|>|\/)/i.test(email), submit: submit ? textOf(submit) : null }
  })
  const priced = []
  for (const [, attrs, inner] of main.matchAll(/<(?:button|a)\b([^>]*)>([\s\S]*?)<\/(?:button|a)>/gi)) {
    // An accordion toggle opens an answer, not a purchase. Its price is still checked below.
    if (/aria-expanded/i.test(attrs)) continue
    const t = textOf(inner)
    if (/\$\d/.test(t) && t.length < 120) priced.push(t)
  }
  const ctas = []
  for (const [, attrs, inner] of main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const t = textOf(inner)
    const href = (attrs.match(/href="([^"]*)"/i) || [])[1]
    if (!href || href.startsWith('#') || !CTA.test(t) || t.length > 120) continue
    const key = hrefKey(href, origin)
    if (key) ctas.push({ label: t, key })
  }
  const text = textOf(main)
  const prices = [...new Set([...text.matchAll(/\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?(?!\d)/g)].map((m) => m[0].replace(/\.00$/, '')))]
  // A testimonial is a quote paragraph, then a name paragraph, then a row of
  // five stars. Read by structure, since quotes can carry their own quotes.
  const marked = main.replace(/(?:<span[^>]*>\s*★\s*<\/span>\s*){5}/g, '\u0000STARS\u0000')
  const testimonials = []
  const segs = marked.split('\u0000STARS\u0000')
  for (let i = 0; i < segs.length - 1; i++) {
    const ps = [...segs[i].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => textOf(m[1].replace(/<!--[\s\S]*?-->/g, '')))
    if (ps.length < 2) continue
    const quote = ps[ps.length - 2].replace(/^[“"]\s*|\s*[”"]$/g, '')
    if (quote.length >= 12) testimonials.push({ quote, name: ps[ps.length - 1] })
  }
  return { forms, priced: [...new Set(priced)], ctas, prices, testimonials }
}

// What the twin fails to carry. Returns a list of failure strings.
export function compare(page, twin, origin) {
  const fails = []
  const t = norm(twin)
  const twinKeys = new Set()
  for (const [, href] of twin.matchAll(/\]\(([^)\s]+)/g)) { const k = hrefKey(href, origin); if (k) twinKeys.add(k) }
  for (const [, href] of twin.matchAll(/(https?:\/\/[^\s)>\]]+)/g)) { const k = hrefKey(href.replace(/[.,;:]+$/, ''), origin); if (k) twinKeys.add(k) }
  page.forms.forEach((f, i) => {
    if (f.asksEmail && !/\bemail\b/.test(t)) fails.push(`form ${i + 1}: twin never says email`)
    if (f.emailRequired && !/\brequired\b/.test(t)) fails.push(`form ${i + 1}: twin never says the email is required`)
    if (f.submit && !t.includes(norm(f.submit))) fails.push(`form ${i + 1}: submit "${f.submit}" absent`)
  })
  for (const p of page.priced) if (!t.includes(norm(p))) fails.push(`priced door "${p}" absent`)
  for (const c of page.ctas) if (!twinKeys.has(c.key)) fails.push(`door "${c.label}" -> ${c.key} absent`)
  for (const p of page.prices) if (!t.includes(p.toLowerCase())) fails.push(`price ${p} absent`)
  for (const q of page.testimonials) {
    const head = norm(q.quote).split(' ').slice(0, 10).join(' ')
    if (!t.includes(head)) fails.push(`testimonial "${q.quote.slice(0, 40)}..." absent`)
    else if (!t.includes(norm(q.name))) fails.push(`testimonial name "${q.name}" absent`)
  }
  return fails
}

function control() {
  const origin = 'https://www.example.com'
  const stars = '<span>★</span>'.repeat(5)
  const html = `<html><body><header><a href="/nav">Get lost</a></header><main>
    <h1>Guide</h1><p>Free. The collection is $27.</p>
    <form><input type="text" placeholder="First name"/><input type="email" required="" placeholder="Email"/><input aria-hidden="true" name="website"/><button type="submit">Send it to me</button></form>
    <button class="btn"><span aria-hidden="true">→</span>Get the <!-- -->Playbook<!-- -->, <!-- -->$37</button>
    <a href="/start-here">Start your first hour</a>
    <div><p>&ldquo;This hour changed how I start every “real” project I care about.&rdquo;</p><p>Ada L.</p><div>${stars}</div></div>
  </main></body></html>`
  const page = readPage(html, origin)
  const counts = { forms: page.forms.length, priced: page.priced.length, ctas: page.ctas.length, prices: page.prices.length, testimonials: page.testimonials.length }
  const bad = compare(page, '# Guide\n\nFree.\n', origin)
  const need = ['form 1: twin never says email', 'form 1: twin never says the email is required', 'form 1: submit', 'priced door', 'door "Start', 'price $27', 'price $37', 'testimonial "']
  const missing = need.filter((n) => !bad.some((x) => x.startsWith(n)))
  const good = compare(page, `# Guide\n\nFree. The collection is $27.\n\n## Get the guide\n\nRequired field: email address.\nAction: **Send it to me** at [the form](${origin}/guide)\n\n[Get the Playbook, $37](${origin}/p)\n\n[Start your first hour](${origin}/start-here)\n\n> “This hour changed how I start every “real” project I care about.”\n> Ada L., five stars\n`, origin)
  const detectorsBlind = Object.entries(counts).filter(([, n]) => n < 1).map(([k]) => k)
  if (counts.ctas !== 1) detectorsBlind.push(`ctas read ${counts.ctas}, expected 1 (header link must be ignored)`)
  return { missing, falsePositive: good, detectorsBlind }
}

async function get(url, headers = {}) {
  const r = await fetch(url, { headers: { 'user-agent': UA, ...headers } })
  return { status: r.status, type: r.headers.get('content-type') || '', text: await r.text() }
}
// Walks the sitemap (and any nested sitemaps). Returns the pages to fetch,
// rewritten onto the origin being checked, and the canonical origin the
// sitemap itself names, which is how the site writes its own links.
async function sitemap(origin) {
  const out = []; const q = [`${origin}/sitemap.xml`]; const seen = new Set(); let canonical = null
  while (q.length) {
    const u = q.shift(); if (seen.has(u)) continue; seen.add(u)
    const r = await get(u)
    if (r.status !== 200) throw new Error(`sitemap ${u} answered ${r.status}`)
    for (const m of r.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      const loc = new URL(m[1].trim())
      canonical = canonical || loc.origin
      const local = new URL(loc.pathname + loc.search, origin).href
      if (/\.xml(\?|$)/i.test(loc.pathname)) q.push(local); else out.push(local)
    }
  }
  return { urls: [...new Set(out)], canonical: canonical || origin }
}

async function main() {
  if (!ORIGIN) {
    console.error('Give the origin to check, e.g. node scripts/verify-twin-parity.mjs http://localhost:3000')
    process.exitCode = 2; return
  }
  const c = control()
  if (c.missing.length || c.falsePositive.length || c.detectorsBlind.length) {
    console.error('THE CHECK FAILED ITS CONTROL', JSON.stringify(c, null, 2))
    process.exitCode = 2; return
  }
  console.log('Control: every detector read the control page, every rule failed on the empty twin and passed on the faithful one.')

  let urls, canonical
  try { ({ urls, canonical } = await sitemap(ORIGIN)) } catch (e) { console.error(e.message); process.exitCode = 2; return }
  // Compared without slashes, since Git Bash rewrites a leading-slash argument into a Windows path.
  const bare = (p) => p.replace(/^.*?\/Git\//i, '').replace(/^\/+|\/+$/g, '')
  if (ONLY_PATH) urls = urls.filter((u) => bare(new URL(u).pathname) === bare(ONLY_PATH))
  if (!urls.length) { console.error('No pages to check.'); process.exitCode = 2; return }

  const s = { origin: ORIGIN, canonical, pages: urls.length, twins: 0, servedPage: 0, pass: 0, failures: [], asks: { forms: 0, priced: 0, ctas: 0, prices: 0, testimonials: 0 } }
  for (const url of urls) {
    const page = await get(url, { accept: 'text/html' })
    const md = await get(url, { accept: 'text/markdown, text/html;q=0.9' })
    if (page.status !== 200 || md.status !== 200) { s.failures.push({ url, fails: [`html ${page.status}, markdown ${md.status}`] }); continue }
    const read = readPage(page.text, canonical)
    for (const k of Object.keys(s.asks)) s.asks[k] += read[k].length
    if (/text\/html/i.test(md.type)) { s.servedPage++; s.pass++; continue }
    s.twins++
    const fails = compare(read, md.text, canonical)
    if (fails.length) s.failures.push({ url, fails }); else s.pass++
  }
  const pct = ((s.pass / s.pages) * 100).toFixed(1)
  console.log(`${ORIGIN}: ${s.pass} of ${s.pages} pass (${pct}%). ${s.twins} twins, ${s.servedPage} served as the page. Asks read: ${JSON.stringify(s.asks)}`)
  for (const f of s.failures) console.log(`FAIL ${f.url}\n     ${f.fails.join('\n     ')}`)
  if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(s, null, 2), 'utf8')
  process.exitCode = s.failures.length ? 1 : 0
}

if (DIRECT) await main()
