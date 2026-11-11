// Resolves a thread card's destination to its own title and a one-line
// description, read from the destination's data. Server-only: updates come from
// the content files. Returns undefined for a route it can't find, so a card to
// a missing page renders nothing rather than a dead link.

import { concepts } from '@/data/concepts'
import { igosAssets } from '@/data/library'
import { getAllUpdates } from '@/lib/updates'

export interface ResolvedPage {
  href: string
  title: string
  line: string
}

// The first sentence of a description, so "Also in the lab" carries one line.
export function firstSentence(text: string): string {
  const m = text.match(/^.*?[.?!](?=\s|$)/)
  return (m ? m[0] : text).trim()
}

export function resolvePage(href: string): ResolvedPage | undefined {
  const [, section, slug] = href.split('/')
  if (section === 'concepts') {
    const c = concepts.find(x => x.slug === slug)
    return c && { href, title: c.title, line: firstSentence(c.subtitle) }
  }
  if (section === 'updates') {
    const u = getAllUpdates().find(x => x.slug === slug)
    return u && { href, title: u.title, line: firstSentence(u.summary) }
  }
  if (section === 'skills' || section === 'protocols' || section === 'bundles') {
    const a = igosAssets.find(x => x.slug === slug && `${x.type}s` === section)
    return a && { href, title: a.title, line: firstSentence(a.description) }
  }
  return undefined
}
