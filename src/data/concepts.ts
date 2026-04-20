export interface ConceptSection {
  heading: string
  paragraphs: string[]
}

export interface Concept {
  slug: string
  title: string
  label: string
  capsule: string
  subtitle: string
  sections: ConceptSection[]
  relatedSlugs: string[]
  ctaLinks: { href: string; label: string; variant: 'accent' | 'outline' }[]
}

export const concepts: Concept[] = [
  {
    slug: 'contribution-flywheel',
    title: 'The Contribution Flywheel',
    label: 'Framework',
    capsule:
      'Live a beautiful life by being yourself. Let the aliveness moving through you animate your creativity and produce something meaningful that brings value to others. Follow your curiosities and excitements. Architect enough structure around that, and you get paid to be yourself. Not a business model. An operating system built on aliveness.',
    subtitle:
      'The engine that powers a life where contribution and aliveness are the same thing.',
    sections: [
      {
        heading: 'How the flywheel works',
        paragraphs: [
          'The Contribution Flywheel has five stages: live the life, share the breadcrumbs, activate others, return home, go deeper. Each stage feeds the next. The life itself is the source material.',
          'Most business models start with the market and work backward to the life. The flywheel inverts that. It starts with aliveness and lets contribution emerge from what is already real.',
          'The "breadcrumbs" are not content marketing. They are transmissions. Articles, voice notes, conversations, sessions, social signals. Signals from core identity to core identity. The people who resonate are the ones who were already looking for this frequency.',
        ],
      },
      {
        heading: 'Why it is not a funnel',
        paragraphs: [
          'A funnel converts attention into revenue. The flywheel converts aliveness into contribution and lets revenue follow. The direction matters. When the life drives the business, the business never runs dry because the source is inexhaustible.',
          'The "activate others" stage is where the Pioneer enters. They borrow the radiance, get activated, take action. The transformation is real because the source is real. Lane returns home, integrates, goes deeper. The flywheel completes one loop and starts the next at a higher level of coherence.',
        ],
      },
      {
        heading: 'The structural principle',
        paragraphs: [
          'The flywheel requires architecture. The Ideal Month is the engine spec. The Four-Container Journey is how activation deepens. Without structure, aliveness stays personal. With structure, it becomes contribution.',
          'Follow the flywheel and architect enough structure around your aliveness, and you will never have to work a day in your life. That is not a slogan. It is the operating principle.',
        ],
      },
    ],
    relatedSlugs: ['ideal-month', 'four-container-journey', 'the-pioneer'],
    ctaLinks: [
      { href: '/concepts/ideal-month', label: 'The Ideal Month', variant: 'accent' },
      { href: '/concepts/four-container-journey', label: 'Four-Container Journey', variant: 'outline' },
    ],
  },
  {
    slug: 'the-pioneer',
    title: 'The Pioneer',
    label: 'Archetype',
    capsule:
      'Someone who has already won the game most people are still trying to win. Accomplished, well-resourced, free by every external measure. Yet something does not match. Their outer life was built on conditioning they never chose. They want their decisions, work and relationships to finally match their inner knowing. Not seeking success. Seeking coherence.',
    subtitle:
      'The person who has everything except the one thing that matters: alignment between their outer life and their inner knowing.',
    sections: [
      {
        heading: 'Who the Pioneer appears to be',
        paragraphs: [
          'The Pioneer has already built something real. Their career is credible. Their finances are solid. Their network is deep. By every external measure, they are free.',
          'Their shell identity is polished. It works. It got them here. But "here" is the problem. The shell was built from conditioning: education, family expectations, industry norms, cultural "shoulds." It was never truly chosen.',
        ],
      },
      {
        heading: 'What the Pioneer actually wants',
        paragraphs: [
          'They want authentic aliveness. Not whimsical, not performative, but unmistakable. A glimmer in the eye. A newfound energy that cannot be faked.',
          'They want to stop doing things because they were conditioned to or feel obligated to, and start doing only what feels coherent, alive, curiosity-driven and genuinely theirs. The distinction between a choice that comes from authentic core alignment versus one that comes from old programming masquerading as a sovereign decision. That nuance is the work.',
          'They do not want to be told what to do. They want to be self-authorized, from a place of genuine mind-body-spirit coherence rather than another layer of conditioning dressed up as sovereignty.',
        ],
      },
      {
        heading: 'Two entry points',
        paragraphs: [
          'Challenge-triggered: something disrupted their world. A career shift, a relationship change, a health event, a quiet crisis of meaning. They are motivated to navigate the transition.',
          'Opportunity-triggered: nothing is wrong. They simply see the transformation available and want to step into it. Both paths lead to the same place: coherence between the inner knowing and the outer life.',
        ],
      },
    ],
    relatedSlugs: ['conditioned-vs-authentic-identity', 'four-container-journey', 'joyful-sovereignty'],
    ctaLinks: [
      { href: '/concepts/conditioned-vs-authentic-identity', label: 'Identity Work', variant: 'accent' },
      { href: '/concepts/four-container-journey', label: 'The Journey', variant: 'outline' },
    ],
  },
  {
    slug: 'joyful-sovereignty',
    title: 'Joyful Sovereignty',
    label: 'Philosophy',
    capsule:
      'An approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and corporate optimization. When your choices come from genuine alignment rather than conditioned obligation, there is a felt quality: power without performance, aliveness without effort. The philosophy. The compass state.',
    subtitle:
      'Playing the Infinite Game through joy and sovereignty rather than strategy and optimization.',
    sections: [
      {
        heading: 'What Joyful Sovereignty is',
        paragraphs: [
          'Joyful Sovereignty is Lane Belone\'s named approach to playing the Infinite Game. It is a philosophy and a practice, not a concept to understand but a way of operating.',
          'The Infinite Game, in James Carse\'s original framing, is the game played for the purpose of continuing play. Most interpretations of this idea land in corporate strategy or competitive positioning. Joyful Sovereignty brings it home. It asks: what does it look like to play an infinite game with your own life, from a place of joy and sovereignty rather than obligation and optimization?',
        ],
      },
      {
        heading: 'The felt state',
        paragraphs: [
          'There is a quality that emerges when someone operates in full alignment. It is not performance. It is not hustle dressed in spiritual language. It is power without performance. Aliveness without effort.',
          'The Pioneer recognizes this quality immediately because they have tasted it in flashes. The work of Joyful Sovereignty is making that state the baseline rather than the exception.',
          'This is the compass state for Lane and for every Pioneer. When a decision, a project, a relationship, or a morning routine produces this felt quality, it is on the path. When it does not, something needs to change.',
        ],
      },
      {
        heading: 'The Infinite Game OS',
        paragraphs: [
          'The Infinite Game OS is what you build when you decide to live Joyful Sovereignty. It is the structural layer: the systems, frameworks, tools and governance architecture that make the philosophy operational.',
          'The philosophy without the system is inspiring but fragile. The system without the philosophy is productive but hollow. Together they produce something that compounds over a lifetime.',
        ],
      },
    ],
    relatedSlugs: ['the-pioneer', 'conditioned-vs-authentic-identity', 'ideal-month'],
    ctaLinks: [
      { href: '/the-os', label: 'The OS', variant: 'accent' },
      { href: '/infinite-game', label: 'Infinite Game', variant: 'outline' },
    ],
  },
  {
    slug: 'conditioned-vs-authentic-identity',
    title: 'Conditioned vs Authentic Identity',
    label: 'Core Distinction',
    capsule:
      'Most people are playing somebody else\'s game and thinking it is their own. Conditioned identity is the self built from outside programming: education, media, parental expectation, societal "shoulds." Authentic identity is who you came here to be underneath all of that. The work is seeing the dynamic clearly enough that the old programming loses its grip.',
    subtitle:
      'The gap between who you were conditioned to be and who you actually are. Seeing it clearly is the work.',
    sections: [
      {
        heading: 'The dynamic most people cannot see',
        paragraphs: [
          'The conditioned identity is not a villain. It is a survival structure. It was built from the programming received through education, family, media, culture and institutional life. It works. It gets results. It earns respect.',
          'The problem is not that it exists. The problem is that most people think it is who they actually are. They make "free choices" that are entirely conditioned. They pursue goals that were never truly chosen. They optimize a life they did not design.',
          'If we skip straight to the positive and say there is a version of yourself underneath that has been waiting, that sounds inspirational. But the real problem is the lack of awareness. You cannot release what you cannot see.',
        ],
      },
      {
        heading: 'What authentic identity feels like',
        paragraphs: [
          'Authentic identity is not a fixed destination. It is the quality of choice-making that emerges when the conditioned programming is seen for what it is. Choices start coming from a different place: quieter, clearer, more coherent.',
          'The Pioneer does not need to destroy their conditioned identity. They need to see it clearly enough that it becomes a tool rather than a cage. The shell identity can be worn and released like a jacket. Archetypes and attributes can be welcomed without declaring fixed identity.',
          'The distinction between a choice from authentic core alignment versus one from old programming masquerading as a sovereign decision. That nuance is the entire practice.',
        ],
      },
      {
        heading: 'Self-authorization',
        paragraphs: [
          'Self-authorization is choosing and acting from genuine mind-body-spirit coherence rather than conditioning. Not just "doing what you want." The specific distinction between a choice that comes from authentic alignment versus one that comes from another layer of conditioning dressed up as sovereignty.',
          'This is what makes the work difficult and what makes it worth doing. The conditioned self is sophisticated. It can mimic sovereignty perfectly. The practice is developing the sensitivity to tell the difference.',
        ],
      },
    ],
    relatedSlugs: ['the-pioneer', 'joyful-sovereignty', 'ideal-month'],
    ctaLinks: [
      { href: '/concepts/the-pioneer', label: 'The Pioneer', variant: 'accent' },
      { href: '/concepts/joyful-sovereignty', label: 'Joyful Sovereignty', variant: 'outline' },
    ],
  },
  {
    slug: 'ideal-month',
    title: 'The Ideal Month',
    label: 'Practice',
    capsule:
      'A structural experiment, not a daydream. Architect what you believe is the best structure for your life: fun, play, nourishment, creativity, the practical, all woven together. Then go live it. Experience teaches you what works and what needs adjusting. The month and the day are fractal. Design one and you design the other.',
    subtitle:
      'The congruence foundation. A life architecture designed from aliveness, tested by experience, refined by practice.',
    sections: [
      {
        heading: 'The founding question',
        paragraphs: [
          'If there were no limitations or consequences, what would my perfect average day look like?',
          'Most people never ask this question with enough seriousness to act on it. The Ideal Month takes the answer and makes it structural. Not aspirational. Architectural.',
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          'You adopt the experimental aspect of yourself and go try it. Architect what you feel is the best structure. Call it how you see it. Allow the fun, the playful, the structural, the nourishment, the practical, all to weave together.',
          'Then you solidify what you think is a good plan and take action. You learn by experience. You come back and say: yes, I knew that. Let us adjust. That was great.',
          'The month and the day are fractal. The principles that govern a good Tuesday morning also govern a good April. Design at one scale and the pattern propagates.',
        ],
      },
      {
        heading: 'Why it is not a daydream',
        paragraphs: [
          'The Ideal Month is not a vision board. It is a congruence test. Every decision, project, collaboration and opportunity gets filtered through one question: does this move me toward or away from this life?',
          'If it does not belong in this month, it does not belong in this kingdom. That is the structural function. The Ideal Month is the North Star made tangible.',
          'Lane\'s version includes a home rhythm of morning play, creative work, trail crew, afternoon curiosity and evening rest, with contribution trips woven in. The specific shape is his. The practice of designing and testing your own is universal.',
        ],
      },
    ],
    relatedSlugs: ['contribution-flywheel', 'joyful-sovereignty', 'the-pioneer'],
    ctaLinks: [
      { href: '/concepts/contribution-flywheel', label: 'Contribution Flywheel', variant: 'accent' },
      { href: '/sovereignty', label: 'Sovereignty', variant: 'outline' },
    ],
  },
  {
    slug: 'four-container-journey',
    title: 'The Four-Container Journey',
    label: 'Model',
    capsule:
      'The natural arc through which a Pioneer moves from first encounter to ongoing calibration. Speaking engagement (the spark), workshop (operationalization), retreat (embodiment), private advisory (sustained coherence). Not a funnel. Each container is a complete experience. Enough structure to allow the structure to be transcended.',
    subtitle:
      'A natural deepening through four containers, each complete on its own, each a gateway to the next.',
    sections: [
      {
        heading: 'The spark: speaking engagement',
        paragraphs: [
          'The Pioneer has mosaic pieces: paradigms, mindsets, beliefs, intentions scattered across years of experience. Lane\'s presence synthesizes and harmonizes what they already know. The whole picture comes into focus.',
          'Something clicks. The fog does not lift entirely, but they can see through it for the first time. They recognize that a different game is possible and they already have more of the keys than they realized.',
        ],
      },
      {
        heading: 'The operationalization: workshop',
        paragraphs: [
          'Takes the perception shift and makes it practical. Exercises, frameworks, working through it in real time. Not just seeing the picture but beginning to build it.',
          'The insight from the speaking engagement gets legs. The gap between shell identity and core identity becomes workable, not just visible.',
        ],
      },
      {
        heading: 'The embodiment: retreat',
        paragraphs: [
          'Experiential and immersive. The transformation lands in the body, not just the mind. Time and environment do work that a single day cannot.',
          'Conditioned responses that used to run automatically begin to feel like choices. Aliveness is no longer a concept. It is a felt reality. Self-authorization becomes embodied, not just understood.',
        ],
      },
      {
        heading: 'The sustain: private advisory',
        paragraphs: [
          'For Pioneers doing ecosystemic work at scale. The relationship feels like a trusted friend who happens to see what they cannot: the shadow, the nuance, the conditioned pattern masquerading as sovereign choice.',
          'Weekly rhythm. Informal, conversational, real-time. Ongoing calibration that sustains the embodied transformation. Not coaching toward a destination. Maintenance of the highest-coherence version of themselves.',
        ],
      },
      {
        heading: 'Why the progression is natural',
        paragraphs: [
          'Each container welcomes a different aspect of expression. Some Pioneers love variety. Some love depth in a single container with multiple sub-containers. The journey is theirs.',
          'A Pioneer may enter at any stage. Some begin with advisory. Some experience a retreat and return years later for workshops. The Four-Container Journey is enough structure to allow the structure to be transcended.',
        ],
      },
    ],
    relatedSlugs: ['the-pioneer', 'contribution-flywheel', 'conditioned-vs-authentic-identity'],
    ctaLinks: [
      { href: 'https://sidequesthq.co/workshop', label: 'Workshop', variant: 'accent' },
      { href: '/concepts/the-pioneer', label: 'The Pioneer', variant: 'outline' },
    ],
  },
]

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find(c => c.slug === slug)
}

export function getAllConceptSlugs(): string[] {
  return concepts.map(c => c.slug)
}
