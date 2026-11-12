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

// Standalone routes. Each title and description is copied exactly from that
// page's own `metadata` (title and description), kept here because importing a
// page module from the resolver would be circular: the woven pages import this
// file. A renamed page title must be updated here; thread-check cannot see it.
const STANDALONE: Record<string, { title: string; description: string }> = {
  '/game-theory': {
    title: 'Game Theory and the Infinite Game',
    description:
      'Game theory is a mathematics of winning. The Infinite Game is not. Where the two genuinely meet, where the popular business version gets it wrong and what the distinction changes for a working life.',
  },
  '/the-os': {
    title: 'What is Infinite Game OS?',
    description:
      'Infinite Game OS is a structured operating system for entrepreneurs, solopreneurs and practitioners of long-term thinking, sovereign life design and agentic systems.',
  },
  '/charter': {
    title: "Your AI's Charter: a CLAUDE.md for how Claude works with you",
    description:
      'A free, open CLAUDE.md for how Claude works with you, not just your code. What your AI runs on its own, what it asks you first and how it acts in your name.',
  },
  '/sovereign-ecosystem': {
    title: 'Sovereign Ecosystem. Obsidian + Claude Code Workspace Template',
    description:
      'The Sovereign Ecosystem is a foundational Obsidian + Claude Code workspace template. Directory structure, governance scaffolding, North Star template, a working skill set and safety checks that come with tests that prove they work.',
  },
  '/agentic-systems': {
    title: 'Agentic Systems and the Post Web',
    description:
      'The internet is shifting from an Attention Economy to an Intention Economy. AI agents now generate 3.6x more web requests than Googlebot. This is what that means for practitioners.',
  },
  '/creator-business-without-performing': {
    title: 'Build a Creator business without constant performance',
    description:
      'A Creator business built on structure does not require daily visibility to grow. Stop treating performance as the price of growth. Treat it as a cost to be designed down.',
  },
  '/infinite-game': {
    title: 'Infinite Game Philosophy',
    description:
      'The Infinite Game is the one game played to keep playing. Not to win. Explore the philosophy, the practice and how Lane Belone lives it as the architecture of a sovereign creative life.',
  },
  '/accord': {
    title: 'The Benevolent Human-AI Accord',
    description:
      'A public charter for benevolent human-AI coexistence. Seven commitments, the reframe of AI as Artful Intelligence, and a section co-authored by Jarvis.',
  },
  '/sovereignty': {
    title: 'Sovereign Life Design',
    description:
      'Sovereign life design is building a life on your own principles. Natural law as the ground, embodiment as infrastructure and Joyful Sovereignty as the compass state.',
  },
  '/play-your-own-game': {
    title: 'How to play your own game',
    description:
      'Playing your own game begins with identifying which game you are currently playing. A forensic game-audit approach for anyone at the edge of their own discovery who senses the script is ready to change.',
  },
  '/design-your-day': {
    title: 'Design a day around what you actually want',
    description:
      'Designing a day around what you actually want starts with a different question than most planning methods ask. Build a day from desire, energy and identity rather than goals and output.',
  },
  '/about': {
    title: 'About Lane Belone',
    description:
      'Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha. He builds Infinite Game OS in the open: concepts, skills and bundles from inside his own practice, free to use with credit.',
  },
}

export function resolvePage(href: string): ResolvedPage | undefined {
  const standalone = STANDALONE[href]
  if (standalone) return { href, title: standalone.title, line: firstSentence(standalone.description) }
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
