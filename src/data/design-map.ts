// The design map: the lean of every interior route and its one sky word.
//
// A route is cosmic (band, circuit and the sky word in the sky), agentic (band,
// circuit and the word in the nebula line) or tokens only (no band, no circuit,
// no word). The words are fixed by ruling: each wraps a word already in the H1
// (or, on skill and bundle pages, the action card's "Install" label), so the
// text never changes.

export type Lean = 'cosmic' | 'agentic'

export interface Treatment {
  /** null: tokens only. */
  lean: Lean | null
  /** The word to wrap, or null for none. */
  word: string | null
  /** 'sky' for cosmic, 'line' (the nebula line) for agentic. */
  kind: 'sky' | 'line'
}

// Pages under a measurement window. Their JSON-LD stays exactly as it was until
// the window closes (see src/app/updates/[slug]/page.tsx), and they carry no
// band, circuit or word until then (ruling 44).
export const MEASUREMENT_HOLD = new Set(['what-is-a-practical-alternative-to-follow-your-passion'])

/** Concept slug to the word its H1 wraps. null: none. */
export const CONCEPT_WORDS: Record<string, string | null> = {
  'creator-flywheel': 'Flywheel',
  'the-pioneer': 'Pioneer',
  'joyful-sovereignty': 'Joyful Sovereignty',
  'conditioned-vs-authentic-identity': 'Authentic',
  'ideal-month': 'Ideal Month',
  'playgrounds-of-exploration': 'Playgrounds',
  'infinite-playlist': 'Infinite Playlist',
  'data-sovereignty': 'Sovereignty',
  'the-north-star': 'North Star',
  'ai-second-brain': 'Second Brain',
  'sovereign-capture': 'Sovereign',
  'contemplative-question-practice': 'Question',
  'ai-first-vs-ai-complemented': null,
  'artful-intelligence': 'Artful',
  'voice-is-the-moat': 'Voice',
  'ai-is-a-mirror-not-an-engine': 'Mirror',
  'ai-is-the-apprentice-you-are-the-artist': 'Artist',
  'held-by-structure': 'Held',
  'practice-is-the-proof': 'Practice',
  'read-the-refusal': 'Refusal',
  'technology-is-nature-organized': 'Nature',
  'the-emergence': 'Emergence',
  'puzzles-not-problems': 'Puzzles',
  'the-rules-are-in-play': 'Play',
  'the-shadow-of-the-future': 'Future',
  'positive-sum-by-design': 'Positive-Sum',
}

/** Standalone pages that carry a band: lean and word. */
export const STANDALONE: Record<string, { lean: Lean; word: string | null }> = {
  '/accord': { lean: 'cosmic', word: 'Accord' },
  '/game-theory': { lean: 'cosmic', word: 'Infinite Game' },
  '/play-your-own-game': { lean: 'cosmic', word: 'play' },
  '/design-your-day': { lean: 'cosmic', word: 'design' },
  '/creator-business-without-performing': { lean: 'cosmic', word: 'build' },
  '/agentic-systems': { lean: 'agentic', word: 'Post Web' },
  '/the-os': { lean: 'agentic', word: 'Infinite Game OS' },
  '/sovereign-ecosystem': { lean: 'agentic', word: 'workspace' },
  '/charter': { lean: 'agentic', word: 'Charter' },
}

/** Pages that carry tokens only: the held pages, utilities and indexes. */
export const TOKENS_ONLY = [
  '/',
  '/about',
  '/sovereignty',
  '/privacy',
  '/preferences',
  '/preferences/cancel-email-change',
  '/preferences/confirm-email-change',
  '/unsubscribe',
  '/updates',
  '/updates/join',
  '/updates/leave',
  '/concepts',
  '/skills',
  '/bundles',
  '/protocols',
  '/infinite-game',
] as const

// Updates follow their subject (ruling 3). An update about a page the ruling
// names takes that page's lean; the rest lean agentic when the title speaks of
// AI, agents, code, sites or skills, and cosmic otherwise. "model" is left out:
// it read "a positive-sum business model" as agentic.
export const UPDATE_SUBJECT_LEAN: Record<string, Lean> = {
  'what-is-the-benevolent-human-ai-accord': 'cosmic',
  'infinite-game-os-architecture': 'agentic',
  'what-is-a-sovereign-ecosystem-for-creators': 'agentic',
}

export const AGENTIC_TITLE = /\b(AI|agents?|agentic|Claude|LLMs?|code|coding|websites?|skills?)\b/i

export function updateLean(title: string, slug?: string): Lean {
  const bySubject = slug ? UPDATE_SUBJECT_LEAN[slug] : undefined
  if (bySubject) return bySubject
  return AGENTIC_TITLE.test(title) ? 'agentic' : 'cosmic'
}

const NONE: Treatment = { lean: null, word: null, kind: 'sky' }

/**
 * The treatment for a route. `title` is needed only for /updates/[slug], whose
 * lean follows its title. An update has band and circuit but never a word.
 */
export function treatmentFor(path: string, title?: string): Treatment {
  const clean = path.replace(/\/+$/, '') || '/'
  const standalone = STANDALONE[clean]
  if (standalone) {
    return { lean: standalone.lean, word: standalone.word, kind: standalone.lean === 'cosmic' ? 'sky' : 'line' }
  }
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 2) {
    const [section, slug] = parts
    if (section === 'concepts') {
      return { lean: 'cosmic', word: CONCEPT_WORDS[slug] ?? null, kind: 'sky' }
    }
    if (section === 'skills' || section === 'bundles') return { lean: 'agentic', word: 'Install', kind: 'line' }
    if (section === 'protocols') return { lean: 'agentic', word: null, kind: 'line' }
    if (section === 'updates') {
      // /updates/join and /updates/leave are utility pages, not posts.
      if (MEASUREMENT_HOLD.has(slug) || slug === 'join' || slug === 'leave') return NONE
      const lean = updateLean(title ?? '', slug)
      return { lean, word: null, kind: lean === 'cosmic' ? 'sky' : 'line' }
    }
  }
  return NONE
}

/**
 * Split text around the first occurrence of `word`. The three parts joined are
 * the input, character for character. A missing word leaves the text whole.
 */
export function splitAround(text: string, word: string | null): { before: string; hit: string; after: string } {
  if (!word) return { before: text, hit: '', after: '' }
  const i = text.indexOf(word)
  if (i < 0) return { before: text, hit: '', after: '' }
  return { before: text.slice(0, i), hit: word, after: text.slice(i + word.length) }
}
