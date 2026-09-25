// The identity spine, ruled by the King 2026-09-25 in Brand Audit Sitting A.
// One Person node, one sameAs list and the two endorsement lines. This file is
// byte-identical in all three site repos (lanebelone, sidequesthq,
// infinitegameos): change one, change all three. The canonical text lives in
// the Kingdom Web Ecosystem Codex, Identity Spine section.

export const PERSON_ID = 'https://infinitegameos.io/#person'

export const SITES = {
  lanebelone: 'https://www.lanebelone.com',
  sidequesthq: 'https://www.sidequesthq.co',
  infinitegameos: 'https://www.infinitegameos.io',
} as const

export const ORG_IDS = {
  sidequesthq: `${SITES.sidequesthq}/#organization`,
  infinitegameos: `${SITES.infinitegameos}/#organization`,
} as const

// The constant is "writer on the Infinite Game". The machine layer holds one
// title, and each room adds the title it needs after the constant.
export const JOB_TITLE = 'Writer'

export const BIO_ONE_LINE =
  'Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha.'

export const BIO_THREE_LINES =
  'Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha. His work centers on the Infinite Player, the player underneath every role. At Side Quest HQ he builds The Alive Business and the playbooks, and at Infinite Game OS he keeps an open library of the ideas beneath them.'

// Lane Belone is the master brand. These lines sit in every footer of the two
// business sites and open each Organization description. They hold still.
export const ENDORSEMENT = {
  sidequesthq: 'Side Quest HQ, the Infinite Game practice of Lane Belone',
  infinitegameos: 'Infinite Game OS, the open library of Lane Belone',
} as const

// How people can know him online. Instagram @lanebelone (a backup account) and
// Pinterest (inactive) stay off by ruling. IMDb carries his podcast series
// Exactly What the Moment Called For (writer and editor), King-confirmed.
export const PERSON_SAME_AS = [
  'https://www.wikidata.org/wiki/Q139889543',
  SITES.lanebelone,
  SITES.sidequesthq,
  SITES.infinitegameos,
  'https://www.linkedin.com/in/lanebelone/',
  'https://www.instagram.com/increasefreedom/',
  'https://www.facebook.com/increasefreedom',
  'https://www.facebook.com/lane.belone',
  'https://x.com/increasefreedom',
  'https://lanebelone.substack.com/',
  'https://github.com/InfiniteGamePlayer',
  'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=11686488',
  'https://orcid.org/0009-0002-7774-5513',
  'https://www.goodreads.com/author/show/20651883',
  'https://www.imdb.com/name/nm12689887/',
]

// The node itself, for a @graph. personJsonLd below adds the context for a
// standalone script tag.
export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Lane Belone',
  givenName: 'Lane',
  familyName: 'Belone',
  url: SITES.lanebelone,
  description: BIO_ONE_LINE,
  jobTitle: JOB_TITLE,
  image: `${SITES.lanebelone}/images/lane-machu-picchu-square.webp`,
  identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: '0009-0002-7774-5513' },
  knowsAbout: [
    'Infinite Game philosophy',
    'The Infinite Player',
    'Joyful Sovereignty',
    'Sovereign life design',
    'Sovereign creative operating systems',
    'Agentic systems and architecture',
    'Post Web and Generative Engine Optimization',
    'Long-term thinking frameworks',
    'Leadership development',
    'Creative leadership',
    'Humble Alpha framework',
    'Special Forces leadership',
    'Sovereign Worldbuilding',
    "Explorer's Side Quests",
    'Perception and clarity',
    'Personal freedom',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'U.S. Army Special Forces',
    sameAs: 'https://en.wikipedia.org/wiki/United_States_Army_Special_Forces',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Special Forces Qualification (Green Beret)',
    credentialCategory: 'military qualification',
  },
  sameAs: PERSON_SAME_AS,
}

export const personJsonLd = { '@context': 'https://schema.org', ...personNode }

// A reference to the Person from inside another node. The full node lives in
// every layout, so a reference carries the @id and enough to read on its own.
export const personRef = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Lane Belone',
  url: SITES.lanebelone,
} as const

export const sqhqOrgRef = {
  '@type': 'Organization',
  '@id': ORG_IDS.sidequesthq,
  name: 'Side Quest HQ',
  url: SITES.sidequesthq,
} as const

export const igosOrgRef = {
  '@type': 'Organization',
  '@id': ORG_IDS.infinitegameos,
  name: 'Infinite Game OS',
  url: SITES.infinitegameos,
} as const
