// Search safety: proves that the fields a search engine reads did not move.
// For each path it fetches two origins and compares the title, meta description,
// canonical, H1 text and the concatenated JSON-LD blocks. Prints same/DIFF per
// field and exits 1 on any difference or empty field (0 only when every field on
// every path is identical and non-empty, 2 on a usage or fetch error).
//
// Usage:
//   node scripts/search-safety.mjs --a <originA> --b <originB>
//        [--paths /x,/y | --sitemap] [--share <token>] [--plant]
//
//   --a, --b     the two origins (A is the reference, usually live)
//   --paths      comma-separated paths to compare
//   --sitemap    read the paths from <A>/sitemap.xml instead
//   --share      B is a protected Vercel preview: GET <B>/?_vercel_share=<token>
//                first (redirect manual) and send its cookie on every B request
//   --plant      append " (planted)" to B's title before comparing, so the run
//                must fail: a control that shows the comparison can see a change
//
// Example (control, must exit 1, then the real run, must exit 0):
//   node scripts/search-safety.mjs --a https://www.infinitegameos.io --b <preview> --share <t> --paths /concepts/x --plant
//   node scripts/search-safety.mjs --a https://www.infinitegameos.io --b <preview> --share <t> --sitemap

// A fetch failure is exit 2, never exit 1: exit 1 means "the pages differ".
process.on('uncaughtException', e => {
  console.error(`fetch or parse failed: ${e?.cause?.message ?? e?.message ?? e}`)
  process.exit(2)
})

const argv = process.argv.slice(2)
const opt = name => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : undefined
}
const has = name => argv.includes(`--${name}`)

const strip = o => (o ?? '').replace(/\/+$/, '')
const A = strip(opt('a'))
const B = strip(opt('b'))
if (!A || !B || (!opt('paths') && !has('sitemap'))) {
  console.error('usage: node scripts/search-safety.mjs --a <originA> --b <originB> [--paths a,b | --sitemap] [--share <token>] [--plant]')
  process.exit(2)
}

let cookie = ''
if (opt('share')) {
  const r = await fetch(`${B}/?_vercel_share=${opt('share')}`, { redirect: 'manual' })
  cookie = (r.headers.getSetCookie?.() ?? []).map(c => c.split(';')[0]).join('; ')
  if (!cookie) {
    console.error('no share cookie returned for origin B')
    process.exit(2)
  }
}

let paths
if (has('sitemap')) {
  const xml = await (await fetch(`${A}/sitemap.xml`)).text()
  paths = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => {
    const u = new URL(m[1])
    return u.pathname + u.search
  })
  if (paths.length === 0) {
    console.error('no <loc> entries in the sitemap')
    process.exit(2)
  }
} else {
  paths = opt('paths').split(',').map(p => p.trim()).filter(Boolean)
}

const decode = s => s?.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const pick = html => ({
  title: (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1],
  description: (html.match(/<meta name="description" content="([^"]*)"/) || [])[1],
  canonical: (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1],
  h1: decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '')),
  jsonld: [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n'),
})

const get = async (origin, p, headers) => {
  const r = await fetch(origin + p, { headers })
  return pick(await r.text())
}

let diffs = 0
for (const p of paths) {
  const a = await get(A, p)
  const b = await get(B, p, cookie ? { cookie } : undefined)
  if (has('plant')) b.title = `${b.title} (planted)`
  for (const k of Object.keys(a)) {
    const empty = !a[k] || !b[k]
    const same = a[k] === b[k]
    if (empty || !same) diffs++
    const tag = empty ? 'EMPTY' : same ? 'same ' : 'DIFF '
    console.log(`${tag} ${k.padEnd(11)} ${p}${same && !empty ? '' : `\n   a: ${String(a[k]).slice(0, 140)}\n   b: ${String(b[k]).slice(0, 140)}`}`)
  }
}
console.log(diffs ? `${diffs} difference(s) across ${paths.length} path(s)` : `all fields identical across ${paths.length} path(s)`)
process.exit(diffs ? 1 : 0)
