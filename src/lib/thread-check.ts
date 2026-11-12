// The build check for the thread map (PendingPlan - IGOS Web of Intrigue).
// Pure functions: each takes the threads map and a context and returns a list
// of problems, empty when the map is sound. Strict for every path listed in
// the map, silent for pages it doesn't list. threads.test.ts feeds them the
// real map; the plants feed them bad data.

import type { Thread, ThreadCard } from '@/data/threads'

export interface ThreadContext {
  // Resolves a page href to its own title, or undefined when no such page.
  resolve: (href: string) => { title: string } | undefined
  // Routes that are real pages but not resolvable (/game-theory, /the-os...).
  standalone: Set<string>
  // Slugs of igosAssets with type === 'skill', mapped to their title.
  skills: Map<string, string>
  // Every href a concept or skill page links to (relatedSlugs, relatedUpdateSlugs,
  // pathBridge), keyed by the linking page's own href so self-links can be dropped.
  inbound: Map<string, Set<string>>
  // Listed pages with no way in by design, each with its done-check in the test.
  exempt: Set<string>
}

type Problems = string[]

export function cardsOf(thread: Thread): ThreadCard[] {
  return [thread.top, thread.deeper, thread.angle, thread.home].filter((c): c is ThreadCard => Boolean(c))
}

const isLive = (href: string, ctx: ThreadContext) => Boolean(ctx.resolve(href)) || ctx.standalone.has(href)

export function checkCards(threads: Record<string, Thread>, ctx: ThreadContext): Problems {
  const out: Problems = []
  for (const [path, thread] of Object.entries(threads)) {
    for (const card of cardsOf(thread)) {
      if (card.kind === 'page') {
        if (!isLive(card.href, ctx)) out.push(`${path}: page card points to ${card.href}, which is not a live route`)
      } else if (card.kind === 'practice') {
        if (!card.text?.trim()) out.push(`${path}: practice "${card.question}" has no text`)
        if (!card.question?.trim()) out.push(`${path}: a practice has no question`)
      } else if (card.kind === 'install') {
        if (!ctx.skills.has(card.skill)) out.push(`${path}: install names "${card.skill}", which is not a skill in the library`)
      } else if (card.kind === 'external') {
        if (!card.href?.startsWith('https://')) out.push(`${path}: external card href "${card.href}" is not https`)
        if (!card.title?.trim()) out.push(`${path}: external card ${card.href} has no title`)
      }
    }
  }
  return out
}

export function checkKeys(threads: Record<string, Thread>, ctx: ThreadContext): Problems {
  return Object.keys(threads)
    .filter(path => !isLive(path, ctx))
    .map(path => `${path}: listed in the thread map but not a live route`)
}

export function checkWayIn(threads: Record<string, Thread>, ctx: ThreadContext): Problems {
  const out: Problems = []
  for (const path of Object.keys(threads)) {
    if (ctx.exempt.has(path)) continue
    const fromCards = Object.entries(threads).some(
      ([other, t]) => other !== path && cardsOf(t).some(c => c.kind === 'page' && c.href === path),
    )
    const fromPages = [...ctx.inbound].some(([from, hrefs]) => from !== path && hrefs.has(path))
    if (!fromCards && !fromPages) out.push(`${path}: no page links to it (no way in)`)
  }
  return out
}

export function checkWayOut(threads: Record<string, Thread>): Problems {
  const out: Problems = []
  for (const [path, thread] of Object.entries(threads)) {
    const closes = [thread.deeper, thread.angle, thread.home].filter(Boolean)
    if (closes.length === 0) out.push(`${path}: no way out (no close cards)`)
  }
  return out
}

export function checkQuestions(threads: Record<string, Thread>, ctx: ThreadContext): Problems {
  const out: Problems = []
  const norm = (s: string) => s.trim().toLowerCase()
  for (const [path, thread] of Object.entries(threads)) {
    for (const card of cardsOf(thread)) {
      let title: string | undefined
      if (card.kind === 'page') title = ctx.resolve(card.href)?.title
      else if (card.kind === 'external') title = card.title
      else if (card.kind === 'install') title = ctx.skills.get(card.skill)
      if (title && norm(card.question) === norm(title)) {
        out.push(`${path}: the question "${card.question}" repeats its destination's title`)
      }
    }
  }
  return out
}

export function checkThreads(threads: Record<string, Thread>, ctx: ThreadContext): Problems {
  return [
    ...checkCards(threads, ctx),
    ...checkKeys(threads, ctx),
    ...checkWayIn(threads, ctx),
    ...checkWayOut(threads),
    ...checkQuestions(threads, ctx),
  ]
}
