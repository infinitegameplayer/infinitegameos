// Markdown twins, generated from the page itself.
//
// Keep this file byte-identical across every site that uses it, and confirm
// with a hash (md5sum each copy of src/lib/twin.ts).
//
// Why: a hand-kept markdown twin is a second copy of every page, and it drifts.
// It drops what the page asks of the reader (a signup form, a buy button) and
// the proof it shows (testimonials), and anyone reading the twin concludes
// those things are absent. So the markdown route fetches the page's own
// server-rendered HTML and this file turns its <main> into markdown. The page
// is the only place copy lives.
//
// Semantic parity, not visual parity: a form becomes a statement of what it
// asks and what is required, a button keeps its label and price, a star row
// becomes "Testimonial, rated N of 5." Navigation, styling and icons drop.
// Proven by verify-twin-parity.mjs, which compares every page with its twin.
//
// From the Website Builder skill, https://www.infinitegameos.io/skills/website-builder (CC BY 4.0)

import { parse, type HTMLElement } from 'node-html-parser'
import { NodeHtmlMarkdown } from 'node-html-markdown'

const nhm = new NodeHtmlMarkdown({ bulletMarker: '-', useInlineLinks: true, maxConsecutiveNewlines: 2 })
const clean = (s: string) => s.replace(/\s+/g, ' ').trim()
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const GLYPH = /^[\u2022\u00b7\u25aa\u25e6+\u2212\u2013-]\s*|\s*[+\u2212\u2013-]$/g

export function pageToTwin(html: string, pageUrl: string): string | null {
  const root = parse(html, { comment: false })
  const main = root.querySelector('main') ?? root.querySelector('body')
  if (!main) return null
  const lede = clean(root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '')

  main.querySelectorAll('script, style, noscript, template, svg, iframe, [hidden], [aria-hidden="true"]').forEach((n) => n.remove())
  for (const a of main.querySelectorAll('a[href]')) {
    // A link's label is read as one line with its pieces spaced, so two stacked
    // spans ("save $12)." and "See the Collection") never run together.
    if (!a.querySelector('img')) a.set_content(esc(clean(parse(a.innerHTML.replace(/</g, ' <')).text)))
    const href = a.getAttribute('href') ?? ''
    if (href.startsWith('#')) continue
    try { a.setAttribute('href', new URL(href, pageUrl).href) } catch {}
  }
  for (const img of main.querySelectorAll('img')) {
    if (!clean(img.getAttribute('alt') ?? '')) { img.remove(); continue }
    try {
      // Point at the image itself rather than the framework's resizing endpoint.
      const src = new URL(img.getAttribute('src') ?? '', pageUrl)
      const inner = src.pathname === '/_next/image' ? src.searchParams.get('url') : null
      img.setAttribute('src', inner ? new URL(inner, pageUrl).href : src.href)
    } catch {}
  }

  // A form cannot live in markdown, so it becomes a plain statement of what it asks.
  for (const form of main.querySelectorAll('form')) {
    const fields: string[] = []
    for (const f of form.querySelectorAll('input, textarea, select')) {
      const type = (f.getAttribute('type') ?? f.tagName.toLowerCase()).toLowerCase()
      if (['hidden', 'submit', 'button', 'reset'].includes(type)) continue
      const id = f.getAttribute('id')
      const byFor = id ? form.querySelector(`label[for="${id}"]`) : null
      const wrap = f.closest('label')
      let name = clean(f.getAttribute('aria-label') ?? byFor?.text ?? wrap?.text ?? f.getAttribute('placeholder') ?? f.getAttribute('name') ?? type)
      const optional = /\(optional\)/i.test(name)
      name = name.replace(/\s*\(optional\)\s*/i, '').replace(/[.:*]+$/, '') || type
      if (type === 'checkbox' || type === 'radio') fields.push(`${name} (${type}, your choice)`)
      else fields.push(`${name}${type === 'email' && !/email/i.test(name) ? ' (email)' : ''} (${f.hasAttribute('required') && !optional ? 'required' : 'optional'})`)
    }
    const submitEl = form.querySelector('button[type="submit"]') ?? form.querySelector('button')
    const submit = clean(submitEl?.text || form.querySelector('input[type="submit"]')?.getAttribute('value') || '')
    form.querySelectorAll('input, textarea, select, button, label').forEach((n) => n.remove())
    const rest = clean(form.text)
    const block = `<p><strong>Form on this page.</strong> It asks for:</p><ul>${fields.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` +
      `<p>Button: <strong>${esc(submit || 'Submit')}</strong>. Fill it in at <a href="${pageUrl}">${pageUrl}</a>.</p>` +
      (rest ? `<p>${esc(rest)}</p>` : '')
    form.replaceWith(parse(block))
  }

  // Five stars in a row mark a testimonial. Say the rating in words.
  for (const row of main.querySelectorAll('div, p')) {
    const spans = row.childNodes.filter((n) => n.nodeType === 1) as HTMLElement[]
    if (spans.length !== 5 || clean(row.text) !== '\u2605\u2605\u2605\u2605\u2605') continue
    const lit = spans.findIndex((s) => s.getAttribute('style') !== spans[0].getAttribute('style'))
    row.replaceWith(parse(`<p>Testimonial, rated ${lit === -1 ? 5 : lit} of 5.</p>`))
  }

  for (const b of main.querySelectorAll('button')) {
    const label = clean(b.text)
    if (!label || b.getAttribute('aria-label')) { b.remove(); continue }
    if (b.hasAttribute('aria-expanded')) b.replaceWith(parse(`<p><strong>${esc(label.replace(GLYPH, ''))}</strong></p>`))
    else b.replaceWith(parse(`<p><a href="${pageUrl}">${esc(label)}</a> (a button on the page)</p>`))
  }

  // A bullet glyph the page draws inside a list item is dropped, since markdown draws its own.
  let md = nhm.translate(main.innerHTML).replace(/^(\s*[-*]) [\u2022\u00b7\u25aa\u25e6]\s*/gm, '$1 ')
  // An image the page shows twice (a hero and its backdrop) is said once.
  const seen = new Set<string>()
  md = md.split('\n').filter((l) => {
    const t = l.trim()
    if (!t.startsWith('![')) return true
    if (seen.has(t)) return false
    seen.add(t)
    return true
  }).join('\n').replace(/\n{3,}/g, '\n\n').trim()
  // The page's own summary leads, unless the page already opens with it.
  if (lede && !clean(md).includes(lede)) {
    const h1 = md.match(/^# .+$/m)
    md = h1 ? md.replace(h1[0], `${h1[0]}\n\n> ${lede}`) : `> ${lede}\n\n${md}`
  }
  return `${md}\n`
}
