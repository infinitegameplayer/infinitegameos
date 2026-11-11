// The thread map (PendingPlan - IGOS Web of Intrigue, Kingdom vault). One entry
// per woven page: the top card (only where the page has no pathBridge), the three
// close cards and, for life and seam pages, the practice. Pages without an entry
// render exactly as before.
//
// A card's kind decides how it is read: a page resolves to a live route, a
// practice carries its text, an install names its skill, an external names its
// URL. A page card's title comes from the destination's own data, never from
// here, so a renamed page can't leave a stale title on a card.
//
// The questions and practices are copy: drafted by Jarvis, approved by the King
// per wave. When a destination's title is already a question, the card asks the
// next question beneath it, never the same one.
//
// Sample entries (three pages, plan step 0): Jarvis-drafted 2026-11-11, awaiting
// the King's edit. Nothing here ships before his look.

export type ThreadSlot = 'top' | 'deeper' | 'angle' | 'home'

export type ThreadCard =
  | { kind: 'page'; href: string; question: string }
  | { kind: 'practice'; question: string; text: string }
  | { kind: 'install'; skill: string; question: string }
  | { kind: 'external'; href: string; title: string; question: string }

export interface Thread {
  // One onward card above the fold, for pages with no pathBridge. A page card.
  top?: Extract<ThreadCard, { kind: 'page' }>
  deeper: ThreadCard
  angle: ThreadCard
  home: ThreadCard
}

// The close's title, distinct from the top bridge's "Where this leads".
export const CLOSE_TITLE = 'Further into the lab'

// The kickers, sentence case (the IGOS Labels rule, #49).
export const SLOT_KICKER: Record<Exclude<ThreadSlot, 'top'>, string> = {
  deeper: 'Go deeper',
  angle: 'From another angle',
  home: 'Take this home',
}
export const TOP_KICKER = 'Where this leads'

export const threads: Record<string, Thread> = {
  // Building with AI. Top: the page's own pathBridge.
  '/skills/website-builder': {
    deeper: {
      kind: 'page',
      href: '/updates/free-ai-website-builder-you-own',
      question: 'Once the code is yours, what else is yours to decide?',
    },
    angle: {
      kind: 'page',
      href: '/updates/why-does-ai-make-everyone-sound-the-same',
      question: 'If the model pulls every page toward the average, what keeps a site sounding like you?',
    },
    home: {
      kind: 'install',
      skill: 'website-builder',
      question: 'Which site would you build first?',
    },
  },

  // The seam: living with AI. No pathBridge, so one card at the top.
  '/concepts/contemplative-question-practice': {
    top: {
      kind: 'page',
      href: '/concepts/ai-is-a-mirror-not-an-engine',
      question: 'If AI only reflects what you bring, what are you bringing?',
    },
    deeper: {
      kind: 'page',
      href: '/updates/why-does-ai-make-everyone-sound-the-same',
      question: 'What does the model do with a session that brings no question?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/the-rules-are-in-play',
      question: "What if the game you're playing lets you change its rules?",
    },
    home: {
      kind: 'practice',
      question: 'One question, held for a week',
      text: "Before your next session, write one real question at the top of the page. Something like: whose game am I playing here? Let it stay there through the week. Read it each time a session opens.",
    },
  },

  // Life and the Infinite Game. Top: the page's own pathBridge.
  '/concepts/positive-sum-by-design': {
    deeper: {
      kind: 'page',
      href: '/concepts/the-rules-are-in-play',
      question: 'If the shape is drawn before anyone plays, who gets to redraw it?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/data-sovereignty',
      question: 'Who holds what you make when a platform holds the audience?',
    },
    home: {
      kind: 'practice',
      question: 'Draw one shape this week',
      text: "Pick one arrangement you're already in: a split, a collaboration, a platform. Write one sentence naming what it creates and who ends up holding it.",
    },
  },
}

export function getThread(path: string): Thread | undefined {
  return threads[path]
}
