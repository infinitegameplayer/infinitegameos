export interface ConceptSection {
  heading: string
  paragraphs: string[]
}

export interface ConceptProductCard {
  body: string
  ctaHref: string
  ctaLabel: string
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
  productCard?: ConceptProductCard
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
          'The Infinite Game, in James Carse\'s original framing, is the game played for the purpose of continuing play. Most interpretations of this idea land in corporate strategy or competitive positioning. Joyful Sovereignty brings it home. It asks: what does it look like to play the Infinite Game with your own life, from a place of joy and sovereignty rather than obligation and optimization?',
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
  {
    slug: 'playgrounds-of-exploration',
    title: 'Playgrounds of Exploration',
    label: 'Framework',
    capsule:
      'A Playground of Exploration is a domain of life entered with curiosity and explored with the courage to discover what it holds. It is a place the Pioneer plays rather than a task they complete. Each Playground carries its own sensory texture and its own song, released when it has served its purpose. A day becomes a sequence of Playgrounds to curiously explore.',
    subtitle:
      'A day as a sequence of places to play, each with its own aliveness, its own song, its own invitation.',
    sections: [
      {
        heading: 'A different way to look at a day',
        paragraphs: [
          'A day is not a list of things to do. Not projects to complete, not errands to run. It is a series of places to play. That single shift sounds small and rewrites something deep.',
          '"Playground" carries play. Childlike curiosity. Levity. The felt memory of a place where the rules were loose and the point was to be there. "Exploration" carries a different weight. A beginning. A willingness to follow curiosity without knowing what is on the other side. A quiet courage. Put them together and something opens. Playgrounds of Exploration. A life built from domains the Pioneer chooses to enter with aliveness, engages fully through the senses and leaves when the next place calls.',
        ],
      },
      {
        heading: 'The shift between one Playground and the next',
        paragraphs: [
          'The body knows when a Playground is closing. The song associated with it begins to change. Still engaged, still two or three more beats in the body and then something else pulls. A next song. A next Playground. The transition feels like moving from one favorite song to the next favorite song. Same playlist, totally different feel.',
          'That pull is not discipline. Not a timer going off. A welcomed shift, movement in a different direction. When the Pioneer trusts the shift rather than forcing completion, each Playground gets met at the level of aliveness it was designed for. When the Pioneer overrides the shift, the Playground starts to drain and the next one gets entered depleted.',
        ],
      },
      {
        heading: 'Why variety creates depth',
        paragraphs: [
          'The default mode network does its best work between focused activities. The part of the mind that organizes and integrates below the surface runs in the background when the foreground is engaged with something different. Not doing something actually does something. The subconscious processes millions of bits of information per second. The conscious mind handles around fifty to a hundred, depending on the study.',
          'When the Pioneer leaves an idea unresolved at the end of a creative Playground and enters a Playground of movement or nourishment, the background processing continues. A distillation surfaces somewhere in the next Playground. The variety is not a distraction from deep work. It is what makes depth possible in each Playground. Intentional variety creates depth of presence. The principle holds at every scale.',
        ],
      },
      {
        heading: 'The kinds of Playgrounds',
        paragraphs: [
          'The invitation is not a fixed taxonomy. It is a prompt: look at the thematic chunks of the day. The felt chunks, not the scheduled ones. Where does one kind of energy end and another begin? Where is something alive and where is obligation wearing the disguise of a schedule?',
          'Give each thematic chunk a name that carries the energy of the thing. A name the Pioneer would actually use. The Playground of Nourishment is doing whatever I want for the first couple of hours, whatever nourishes me in the moment. Someone else would call that something else entirely. The Playground of Open Air is the daily hike. Sun, body in motion, a semi-spontaneous conversation on a rotating trail decided that morning. The Playground of Creation is the work that loses track of time. These names are demonstrations, not a list to adopt. Themes like Rest, Connection, Solitude, Mastery, Serendipity surface when they help and disappear when they stop fitting. The Pioneer\'s own vocabulary is the right vocabulary.',
        ],
      },
      {
        heading: 'A dance move that didn\'t announce itself',
        paragraphs: [
          'These concepts emerge when the Pioneer starts living a certain way. They do not arrive with instruction manuals. A dancer does not pull out a piece of paper that says "new dance move coming on," shake it around, then do the move. The new move flows with the previous essence of the dance and gives it a little extra texture. A melody in a song that happens once or twice and the body responds before the mind names it.',
          'Playgrounds of Exploration arrive like that. Not as a framework to adopt. As a posture that was always there, now given a name. The child archetype understood this intuitively. The jungle gym, the court, the field. Levity that did not need permission. Playgrounds of Exploration is the invitation to weave that energy back in as the operating posture for the whole day. The Pioneer plays the game sincerely, not seriously. That distinction changes the energy in which the entire day moves.',
        ],
      },
    ],
    relatedSlugs: ['infinite-playlist', 'joyful-sovereignty', 'the-pioneer'],
    ctaLinks: [
      { href: '/infinite-game', label: 'The Infinite Game', variant: 'outline' },
    ],
    productCard: {
      body: 'The Sovereign Life Playbook is where the Playgrounds of Exploration become the architecture of your day. Chapter 4 is dedicated to this practice: mapping your current Playgrounds, designing intentional ones, building the day from aliveness rather than obligation.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'Explore the Playbook',
    },
  },
  {
    slug: 'infinite-playlist',
    title: 'The Infinite Playlist',
    label: 'Framework',
    capsule:
      'The Infinite Playlist is the soundtrack to the movie of your life. An eternal sequence of songs, some chosen and some received, always playing in the background of a sovereign day. Where Playgrounds of Exploration are what the Pioneer engages through the senses, the Infinite Playlist is the invisible music floating in the air. You cannot see it, but you can hear it, dance to it, play with it.',
    subtitle:
      'The invisible music floating in the air, always playing, waiting to be heard.',
    sections: [
      {
        heading: 'What it is',
        paragraphs: [
          'The Infinite Playlist is not a concept to adopt. It is a posture toward life. A willingness to move through the day as if dancing to music that is already playing. Some songs the Pioneer chose. Some songs the universe delivered. Both belong to the same playlist.',
          'Where Playgrounds of Exploration live in touch, taste and sight (the physical act, the domain entered through the senses), the Infinite Playlist lives in sound. An encompassing, ethereal wrapping around every Playground. The Pioneer\'s daily architecture sits inside the Playlist, not outside of it. The Playlist is what gives the architecture its aliveness.',
        ],
      },
      {
        heading: 'The Playground is the physical act. The Playlist is what plays through it.',
        paragraphs: [
          'The Playground is what the Pioneer engages with physically. A dinner with a friend. A hike in the open air. The focused hours of creative work. Things met through the body and the senses.',
          'The Playlist is ethereal. The soundtrack to the dinner. The rhythm of the hike. The energy carrying the creative session. The music moves with the physical act because it is the invisible layer the physical act takes place inside. A Playground without a Playlist is mechanical. A Playlist with no Playground has nothing to play through. Together, the Pioneer has a day that feels like a dance.',
        ],
      },
      {
        heading: 'Leading and following',
        paragraphs: [
          'The Playlist asks the Pioneer to hold two capacities at once. Leading and following. Architecting and receiving.',
          'Leading is the familiar move. The Pioneer designs their Playgrounds, chooses what they engage with, builds a day from authentic self. The Playlist honors that and responds to it. Following is less familiar. It is the willingness to be given a song the Pioneer did not request. A synchronicity. An unexpected conversation. A door that opens at the right moment without being pushed. The practice for most Pioneers is the following step. Trusting that the dance has its own intelligence.',
          'When both capacities are present, something integrates. The Pioneer holds the ability to lead with intention and follow with openness simultaneously. Not alternating. Woven.',
        ],
      },
      {
        heading: 'Degrees of openness',
        paragraphs: [
          'The Pioneer does not choose one degree of openness and stay there. The ratio shifts with the season.',
          'Sometimes the opening is precise. A clear intention, a known Playground, a specific song. Sometimes it is thematic. A general direction, a felt sense of what the season is about, room for the Playlist to fill in the details. Sometimes the opening is wide. Everything welcome, the Playlist playing songs from every direction, a season of receiving. Sometimes life just slips something in. Unexpected. A conversation that rearranges a perspective. A person who arrives at the moment they were needed, without ever being asked for. All of these are the same posture at different volumes. The capacity is holding the opening, in whatever proportion the moment calls for.',
        ],
      },
      {
        heading: 'The architecture is the instrument. The Playlist is the music.',
        paragraphs: [
          'The Playgrounds give the day its shape. The Playlist gives it its feel. Both are required. One without the other is half of a dance.',
          'When the Pioneer holds the architecture loosely enough that life can play through it, the day stops feeling like a list of things to get through. It starts feeling like a song. Sometimes the body is leading. Sometimes the music is leading. The distinction matters less the longer the Pioneer dances. This is what the Infinite Game feels like from the inside. Not conquest, not performance. A day built with care and held with openness, the invisible music floating through every Playground, the Pioneer dancing with existence itself.',
        ],
      },
    ],
    relatedSlugs: ['playgrounds-of-exploration', 'joyful-sovereignty', 'the-pioneer'],
    ctaLinks: [
      { href: '/infinite-game', label: 'The Infinite Game', variant: 'outline' },
    ],
    productCard: {
      body: 'The Sovereign Life Playbook is where the Infinite Playlist becomes a daily posture. Chapter 5 is dedicated to this practice: how to hold your Playgrounds loosely enough that life can play through them, how to maintain the opening that lets the unexpected arrive.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'Explore the Playbook',
    },
  },
]

// Future concept candidates (King decides which to build):
// - Perception Upgrade (reality is decoded, not given)
// - The Kingdom Model (sovereign creative operating system architecture)
// - Self-Authorization (choosing from coherence, not conditioning)
// - Creative Sovereignty (making from authority, not compliance)
// - The Two-Layer Game (infinite game + finite side quests)
//
// Four-Container Journey is a replacement candidate — more internal offer
// structure than a concept people would search for. One of the above may
// take its slot when ready.

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find(c => c.slug === slug)
}

export function getAllConceptSlugs(): string[] {
  return concepts.map(c => c.slug)
}
