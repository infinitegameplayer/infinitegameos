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

  // Wave one (Jarvis-drafted 2026-11-11, for the King's look at the wave).

  // Building. Standalone; no bridge, so one card at the top.
  '/the-os': {
    top: {
      kind: 'page',
      href: '/concepts/data-sovereignty',
      question: 'What would your AI system look like if every file stayed yours?',
    },
    deeper: {
      kind: 'page',
      href: '/concepts/ai-second-brain',
      question: 'Where does a system keep what it remembers for you?',
    },
    angle: {
      kind: 'page',
      href: '/updates/is-technology-natural',
      question: 'If every tool is nature organized, what are you organizing it toward?',
    },
    home: {
      kind: 'page',
      href: '/charter',
      question: 'What would you let your AI do without asking you first?',
    },
  },

  // Life. Standalone.
  '/game-theory': {
    top: {
      kind: 'page',
      href: '/concepts/positive-sum-by-design',
      question: 'What does the shape of a deal decide before anyone behaves?',
    },
    deeper: {
      kind: 'page',
      href: '/concepts/the-rules-are-in-play',
      question: 'Which of your rules did you pick and which came with the room?',
    },
    angle: {
      kind: 'page',
      href: '/updates/is-technology-natural',
      question: 'If a tool is nature organized, what game is it built to play?',
    },
    home: {
      kind: 'practice',
      question: 'Say the horizon out loud',
      text: 'Pick one working arrangement and name its horizon: when it ends and who knows it. Then take one behavior on each side and ask whether the ending is driving it.',
    },
  },

  // Building. Top: the page's own pathBridge.
  '/skills/source-harvest': {
    deeper: {
      kind: 'page',
      href: '/the-os',
      question: 'What does a system look like when every part was harvested on purpose?',
    },
    angle: {
      kind: 'page',
      href: '/updates/is-technology-natural',
      question: 'If every tool is a captured phenomenon, what are you harvesting when you read one?',
    },
    home: {
      kind: 'install',
      skill: 'source-harvest',
      question: 'Which repo would you read first?',
    },
  },

  // Building. Top: the page's own pathBridge. The template card stays as the
  // take-home: a free file, not a product (plan, take-home table).
  '/concepts/ai-second-brain': {
    deeper: {
      kind: 'page',
      href: '/updates/how-to-build-an-ai-second-brain',
      question: 'What would you capture first if nothing could be lost?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/ai-is-a-mirror-not-an-engine',
      question: 'What can a second brain hold that the model will never see?',
    },
    home: {
      kind: 'page',
      href: '/sovereign-ecosystem',
      question: 'Where would your second brain live if you started it tonight?',
    },
  },

  // Building. The pillar update; no bridge, so one card at the top.
  '/updates/how-to-build-an-ai-second-brain': {
    top: {
      kind: 'page',
      href: '/concepts/ai-second-brain',
      question: 'What makes a pile of notes start thinking back?',
    },
    deeper: {
      kind: 'page',
      href: '/concepts/data-sovereignty',
      question: 'Who owns the brain once it starts compounding?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/contemplative-question-practice',
      question: 'What question should your second brain be holding for you?',
    },
    home: {
      kind: 'page',
      href: '/sovereign-ecosystem',
      question: 'What if the workspace were already built?',
    },
  },

  // Building. No bridge, so one card at the top. The template card stays as
  // the take-home.
  '/concepts/data-sovereignty': {
    top: {
      kind: 'page',
      href: '/concepts/ai-second-brain',
      question: 'What becomes possible once the files are yours?',
    },
    deeper: {
      kind: 'page',
      href: '/updates/how-to-build-an-ai-second-brain',
      question: 'What would you build first on ground you own?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/positive-sum-by-design',
      question: 'Who captures the value when a platform holds your work?',
    },
    home: {
      kind: 'page',
      href: '/sovereign-ecosystem',
      question: 'What would the first folder on your own machine hold?',
    },
  },

  // Life. Top: the page's own pathBridge.
  '/concepts/the-rules-are-in-play': {
    deeper: {
      kind: 'page',
      href: '/concepts/positive-sum-by-design',
      question: "Who drew the shape of the deal you're in?",
    },
    angle: {
      kind: 'page',
      href: '/concepts/contemplative-question-practice',
      question: 'What question would show you which rules you inherited?',
    },
    home: {
      kind: 'practice',
      question: 'Change one rule on purpose',
      text: "Name the rules you're playing under, in specifics. Sort them into the ones you picked and the ones that arrived with the room. Then change one small one on purpose.",
    },
  },

  // The seam. No bridge, so one card at the top.
  '/concepts/ai-is-a-mirror-not-an-engine': {
    top: {
      kind: 'page',
      href: '/concepts/contemplative-question-practice',
      question: 'What question would you hold up to the mirror?',
    },
    deeper: {
      kind: 'page',
      href: '/updates/why-does-ai-make-everyone-sound-the-same',
      question: 'What does the mirror return when you bring it nothing of yours?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/ai-second-brain',
      question: "What if the mirror could read everything you've ever written down?",
    },
    home: {
      kind: 'practice',
      question: 'Bring it something real',
      text: 'Bring the AI one piece of your own thinking and ask what patterns it sees. Then decide what the reflection means yourself.',
    },
  },

  // The seam. Its own practice: the written voice standard.
  '/updates/why-does-ai-make-everyone-sound-the-same': {
    top: {
      kind: 'page',
      href: '/concepts/ai-is-a-mirror-not-an-engine',
      question: 'What can the model see of you to begin with?',
    },
    deeper: {
      kind: 'page',
      href: '/concepts/contemplative-question-practice',
      question: 'What do you bring before the first prompt?',
    },
    angle: {
      kind: 'page',
      href: '/skills/website-builder',
      question: 'What does a site sound like when the brand loads first?',
    },
    home: {
      kind: 'practice',
      question: 'Name your voice once',
      text: 'Write three sentences that name how you sound: the words you reach for, the ones you never use and the rhythm. Bring them to your next session before the first prompt.',
    },
  },

  // The seam. Its own practice: the Standing Test.
  '/updates/is-technology-natural': {
    top: {
      kind: 'page',
      href: '/concepts/ai-is-a-mirror-not-an-engine',
      question: 'If a tool is nature organized, what is a language model made of?',
    },
    deeper: {
      kind: 'page',
      href: '/updates/why-does-ai-make-everyone-sound-the-same',
      question: "What happens to a voice inside a tool built from everyone's averages?",
    },
    angle: {
      kind: 'page',
      href: '/concepts/the-rules-are-in-play',
      question: 'What if a tool changes the rules you play by?',
    },
    home: {
      kind: 'practice',
      question: 'The Standing Test, on one tool',
      text: 'Pick one tool you used today and ask it the four questions. Does it enlarge challenge or remove it? Does it enlarge meaning or flatten it? Does it enlarge purpose or substitute for it? Does it hold your alignment with nature or trade it away?',
    },
  },

  // Building. The adopted orphans; no bridge, so one card at the top.
  '/updates/what-is-a-website-builder-skill': {
    top: {
      kind: 'page',
      href: '/skills/website-builder',
      question: 'What happens in the first step, before any code?',
    },
    deeper: {
      kind: 'page',
      href: '/updates/free-ai-website-builder-you-own',
      question: 'What do you walk away holding when the build is done?',
    },
    angle: {
      kind: 'page',
      href: '/updates/why-does-ai-make-everyone-sound-the-same',
      question: "Where does a site's voice come from when AI writes the first draft?",
    },
    home: {
      kind: 'install',
      skill: 'website-builder',
      question: 'Which site would you build first?',
    },
  },

  '/updates/free-ai-website-builder-you-own': {
    top: {
      kind: 'page',
      href: '/skills/website-builder',
      question: 'What runs between the first prompt and the live site?',
    },
    deeper: {
      kind: 'page',
      href: '/updates/what-is-a-website-builder-skill',
      question: 'What turns a conversation into a disciplined build?',
    },
    angle: {
      kind: 'page',
      href: '/concepts/data-sovereignty',
      question: 'What else would you rather own than rent?',
    },
    home: {
      kind: 'install',
      skill: 'website-builder',
      question: 'Which site would you build first?',
    },
  },
}

// The homepage's first beat under the hero: three reframes from the seam, each
// a door, each the question its page opens (King-approved 2026-11-11). Fixed and
// chosen, never random; a strong new update can earn a slot.
export const HOMEPAGE_REFRAMES: { question: string; href: string }[] = [
  { question: 'What part of you has your AI never met?', href: '/concepts/ai-is-a-mirror-not-an-engine' },
  { question: 'What does it take for a voice to survive the average?', href: '/updates/why-does-ai-make-everyone-sound-the-same' },
  { question: 'What if your phone is an arrangement of nature?', href: '/updates/is-technology-natural' },
]

export function getThread(path: string): Thread | undefined {
  return threads[path]
}
