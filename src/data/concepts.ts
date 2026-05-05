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
    slug: 'creator-flywheel',
    title: 'The Creator Flywheel',
    label: 'Framework',
    capsule:
      'Be yourself. Let what is alive in you animate your creativity. Build, write, speak, advise. Whatever form your creative expression takes, bring it fully. Share it as structured artifacts that persist. People who resonate find their way to you not because you marketed at them but because what you created was real and locatable. This is the creator economy at its highest expression: getting paid to be yourself, not performing a version of it.',
    subtitle:
      'The operating engine for any creator who builds from aliveness, contributes from genuine expression and lets the business follow.',
    sections: [
      {
        heading: 'How the flywheel works',
        paragraphs: [
          'The Creator Flywheel has five stages: live the life, share the breadcrumbs, activate others, return home, go deeper. Each stage feeds the next. The life itself is the source material.',
          'The creator economy made one thing possible that previous economies did not: anyone who builds from authentic expression has a path to getting paid for exactly that. Not a watered-down version. Not a market-optimized version. The original thing, in the creator\'s own voice, on their own terms.',
          'The breadcrumbs are not content strategy. They are transmissions. Articles, builds, recordings, sessions, performances, storefronts. Whatever form the creator\'s expression takes. People who are already looking for this frequency recognize it.',
        ],
      },
      {
        heading: 'Universal, not fixed',
        paragraphs: [
          'The Creator Flywheel does not prescribe a single creative form. Some creators write. Some build. Some speak, advise, teach, perform, design. The flywheel is form-agnostic. What matters is that the output comes from genuine creative expression, not from copying what worked for someone else.',
          'This is the distinction the creator economy keeps missing. Most advice tells you to optimize the form: post this format, follow this cadence, use this hook. The flywheel inverts that. Start with what is actually alive in you. Let the form emerge from that. The form that comes from aliveness has a quality manufacturing never produces.',
        ],
      },
      {
        heading: 'Why it is not a funnel',
        paragraphs: [
          'A funnel converts attention into revenue. The Creator Flywheel converts aliveness into contribution and lets revenue follow. The direction matters.',
          'When the life drives the expression, the expression never runs dry because the source is inexhaustible. When market positioning drives the expression, you are always one algorithm change away from starting over. The flywheel is a durability play as much as a growth play.',
          'Activate others, return home, go deeper. The return and the deepening are not breaks in the flywheel. They are what keeps it spinning. The creator who never returns runs out of things to transmit. The creator who keeps going deeper always has more.',
        ],
      },
      {
        heading: 'The Way, the Wayfarers, the Wayfinders',
        paragraphs: [
          'The flywheel does not accumulate followers. It conducts what is alive in you through a rotating field of Wayfarers, the people who travel a section of your Way at varying proximity for a season. The proximity varies with the form your work takes. Some receive your work at a distance through what you publish, build or sell. Some encounter you in person where your work is practiced or shared. Some walk closely with you through ongoing collaboration. When their season ends, they branch off to their own Way and become Wayfinders, leaving their own breadcrumbs for the next ready person.',
          'The popular framing of the creator economy points at a thousand true fans, a stable audience to monetize over time. The flywheel inverts that. The architecture is conductive, not accumulative. The age of the guru is closing. The age that opens is one in which each of us walks our own Way, supports the people walking near us and trusts the conduction. Your job is to keep walking your Way and keep your trail markers well-laid. The rotation handles itself.',
        ],
      },
      {
        heading: 'Structured to be found',
        paragraphs: [
          'Structure means whatever is durable for the form your work takes. Articles at canonical URLs. Skills with stable addresses. Products with persistent pages. A storefront with consistent hours and a recognizable name on the corner. A studio with a clear practice. A repertoire with a body of work behind it. The medium varies. The principle holds. Make a thing once, structure it well and it keeps doing its job long after you have walked on. Found once, kept always.',
          'AI is rearranging which industries are even legible at the surface. The cleanest move is not to brace against the rearrangement but to walk ahead of it. Structure your work so it is findable by humans and by the agents working on their behalf. Work with AI in ways that extend your expression rather than replace it. The discoverability question stops being how often you must post to stay visible and becomes what canonical surface would absorb this work so it never has to be performed again.',
          'The identity contract underneath the flywheel: I am locatable because I am structured. Not: I am locatable when I am performing. The work shifts from showing up daily to laying structure that receives on your behalf.',
        ],
      },
    ],
    relatedSlugs: ['ideal-month', 'the-pioneer', 'data-sovereignty', 'the-north-star'],
    ctaLinks: [
      { href: '/concepts/ideal-month', label: 'The Ideal Month', variant: 'accent' },
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
          'They want authentic aliveness. Not whimsical, not performative, but unmistakable. A glimmer in the eye. A newfound energy that can\'t be faked.',
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
    relatedSlugs: ['conditioned-vs-authentic-identity', 'joyful-sovereignty'],
    ctaLinks: [
      { href: '/concepts/conditioned-vs-authentic-identity', label: 'Identity Work', variant: 'accent' },
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
          'If we skip straight to the positive and say there is a version of yourself underneath that has been waiting, that sounds inspirational. But the real problem is the lack of awareness. You can\'t release what you can\'t see.',
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
    relatedSlugs: ['creator-flywheel', 'joyful-sovereignty', 'the-pioneer'],
    ctaLinks: [
      { href: '/concepts/creator-flywheel', label: 'Creator Flywheel', variant: 'accent' },
      { href: '/sovereignty', label: 'Sovereignty', variant: 'outline' },
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
      'The Infinite Playlist is the soundtrack to the movie of your life. An eternal sequence of songs, some chosen and some received, always playing in the background of a sovereign day. Where Playgrounds of Exploration are what the Pioneer engages through the senses, the Infinite Playlist is the invisible music floating in the air. You can\'t see it, but you can hear it, dance to it, play with it.',
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
  {
    slug: 'data-sovereignty',
    title: 'Data Sovereignty',
    label: 'Foundation',
    capsule:
      'Your files on your computer. Your data, your context, your history. Not in someone else\'s cloud. Not locked behind a platform that may change its terms next quarter. Different AI tools can read and rewrite the same files because the files belong to you, not to the tool. Build the foundation today and every future decision about which AI, which platform, which workflow gets easier. The corporations are building the convenient lock-in. Data sovereignty is the other path.',
    subtitle:
      'The foundation underneath everything else. Your files, your machine, your terms. The AI as a tool that serves you, not a platform that owns you.',
    sections: [
      {
        heading: 'Why this is the foundation',
        paragraphs: [
          'Files local. Files yours. AI as a plug-and-play interface that reads and writes those files.',
          'Without this, every other piece of architecture sits on infrastructure you do not control. Your second brain rents space on someone else\'s server. Your North Star lives behind a login that may not exist next year. Your creative work belongs to whichever platform you uploaded it to.',
          'The Facebook analogy makes the lock-in concrete. Try leaving the platform with your photos, friends and connections intact. The export tools are clunky on purpose. The platforms are built to keep you. Sovereign-first refuses that default at the foundation.',
        ],
      },
      {
        heading: 'The three-tier stack',
        paragraphs: [
          'Named live in the May 2 AI for Livin\' Workshop by an attendee mid-demo. The stack has three layers and each one is swappable.',
          'Sovereign Ecosystem is the file structure and the templates. The opinionated foundation that gives the system shape. Obsidian is the reader and editor that turns those files into something you can navigate, search and annotate by hand. Claude Code (or Codex, or any future agentic interface) is the AI that can read, edit and restructure any of it on your instruction.',
          'One layer holds the structure. One translates the files for human navigation. One brings the AI intelligence. Swap any layer and the others survive. That is the durability of building on an open foundation instead of a closed platform.',
        ],
      },
      {
        heading: 'Your data trains you, not them',
        paragraphs: [
          'Every interaction your AI has with your files makes the system know you better. Your writing voice sharpens. Your taste becomes more articulable. Your codices and skills get refined the more you use them.',
          'That intelligence belongs in your hands. The longer you build inside a sovereign-first foundation, the more the system becomes a precise instrument for the way you actually think and work. The corporations are pulling the same intelligence into their model weights. The sovereign-first practice is to keep the intelligence pulling toward you instead.',
        ],
      },
      {
        heading: 'The long arc',
        paragraphs: [
          'Today: a $20 to $200 monthly subscription on a sovereign-first foundation gets you 95% of the way there. The AI runs in the cloud and reads files from your machine. The data going to the model is anonymized into the weights. There are still operational logs to be aware of. Worth doing your own research on the specific tools you use.',
          'Next step: local LLMs running on your own hardware. Currently a $10k to $15k setup. The price will keep dropping. The foundation you build today is what makes that next step a smooth migration instead of a full rebuild.',
          'The point of building sovereign-first today is not paranoia. It is that every future step toward greater sovereignty becomes easier when the foundation is already laid.',
        ],
      },
      {
        heading: 'What this is not',
        paragraphs: [
          'Not anti-AI. Not anti-corporation. Not survivalist or paranoid. Just a practical refusal of the default: that your second brain, your creative voice and your operational substrate should live on a server you do not control.',
          'A practice with spiritual implications. Your data is an extension of your interior life. Owning it is the work.',
        ],
      },
    ],
    relatedSlugs: ['ai-second-brain', 'the-north-star', 'joyful-sovereignty', 'creator-flywheel', 'grant-researcher'],
    ctaLinks: [
      { href: '/concepts/ai-second-brain', label: 'The AI Second Brain', variant: 'accent' },
      { href: '/sovereignty', label: 'Sovereign Life Design', variant: 'outline' },
    ],
  },
  {
    slug: 'the-north-star',
    title: 'The North Star',
    label: 'Practice',
    capsule:
      'The point on the horizon you are walking toward. Zero to three months out, with longer horizons sketched beyond. Active quests instead of tasks, because a quest is something you embark on with curiosity. Filled in once, revisited often. Once the North Star lives in your system, the AI organizes your day-to-day work around it. You stop carrying the trajectory in your head. The North Star holds it for you, and you get to be present with whatever is most alive today.',
    subtitle:
      'The compass that lets the AI organize your work around your direction. A living document, not a fixed plan.',
    sections: [
      {
        heading: 'What goes in',
        paragraphs: [
          'Zero to three month horizon as the primary frame. The handful of things you intend to actually move on in that window. A few longer-horizon notes about what is on the other side.',
          'Active quests as the primary unit. The work you are embarking on this season, named in language that reflects how you actually relate to it.',
          'Specific revenue targets if those help. Specific project outcomes by specific dates. Or looser textures if you are earlier in the process. Both work. Minimal structure to get started. Add specificity as your understanding sharpens.',
        ],
      },
      {
        heading: 'The Anti-Vision',
        paragraphs: [
          'The North Star tells you where you are walking toward. The Anti-Vision tells you the line you refuse to cross. Both are orientation, just from opposite directions.',
          'Name one or two lines you will not cross today. The shape of life you will not accept any more. Write them down where you can see them.',
          'When the day starts to drift toward an Anti-Vision line, that is the early cue to pause and re-orient. Not because the day is failing, but because the body felt the line approaching before the mind did. The Anti-Vision turns your nervous system into a compass.',
          'For anyone who arrives wanting more specificity in their North Star, the Anti-Vision is often where the specificity finally lands. It is easier to name what you refuse than what you want. Once you have named the refusal, the wanting comes into focus.',
        ],
      },
      {
        heading: 'Quest, not task',
        paragraphs: [
          'A task feels like a chore. Something to grind through. Energy gets pulled out of you to complete it.',
          'A quest feels playful. Embark-able. Worth learning along the way. Energy gets put into you by engaging with it.',
          'Same work. Different inner posture. The reframing is not cosmetic. The energy that shows up to a quest is qualitatively different from the energy that shows up to a task. The North Star lets you name the work in the language that actually moves you.',
        ],
      },
      {
        heading: 'The check-in rhythm',
        paragraphs: [
          'Once the North Star lives in your system, you can build a weekly or monthly check-in into your skills. The check-in is not a status report.',
          'It is a conversation with the AI about whether the trajectory still feels alive. Whether the active quests still match what is most authentic. What wants to shift.',
          'This is where the North Star earns its name. Not by being right at the moment you wrote it. By being a living point you keep returning to as your understanding deepens. The trajectory is not betrayed by changing. The trajectory is honored by being kept current.',
        ],
      },
      {
        heading: 'Follow Aliveness, not script',
        paragraphs: [
          'The Pioneer\'s central practice is following authentic aliveness instead of the conditioned script that built the outer life. The North Star is where that practice lives in writing.',
          'You wrote the trajectory down because it was alive when you wrote it. You keep returning to it because it stays alive as you change. When a quest stops feeling alive, the system rewires around the update. No replanning two months of work by hand. No carrying a stale plan as if it were still true.',
          'The Ideal Month sits inside the North Star horizon. The Pending Plans you carry sit alongside it. The skills you build serve it. Without a North Star, the AI organizes your day-to-day work around whatever is in front of you. With one, it can hold a longer arc.',
        ],
      },
    ],
    relatedSlugs: ['ideal-month', 'the-pioneer', 'joyful-sovereignty'],
    ctaLinks: [
      { href: '/concepts/ideal-month', label: 'The Ideal Month', variant: 'accent' },
      { href: '/concepts/the-pioneer', label: 'The Pioneer', variant: 'outline' },
    ],
  },
  {
    slug: 'ai-second-brain',
    title: 'The AI Second Brain',
    label: 'Framework',
    capsule:
      'The system you trust to hold what is in your head so you do not have to. An idea hits at a meetup. You open Obsidian on your phone. You write it down. The note syncs to your home setup. You walk back into the conversation as a present human being. The fog clears because your second brain holds the load. Tiago Forte built the original Building a Second Brain framework. The AI Second Brain is the next move: an active intelligence layer over the same files. Capture, organize, distill, express. The loop runs.',
    subtitle:
      'The system that holds your thoughts so you do not have to. Capture from anywhere. Organize, distill and express through the AI you already use.',
    sections: [
      {
        heading: 'The capture flow',
        paragraphs: [
          'An idea hits. You are at a meetup or in a conversation or out for a walk. The phone is in your pocket. Open Obsidian. Write the idea down.',
          'The note is in your second brain immediately. The file lives on your machine. The capture happened in seconds. Now you can walk back into the conversation as a present human being. The system holds the idea.',
          'This is the spiritual half of the second brain. Trusting the system to remember so your nervous system can let go. You get to be with your body, with the people in front of you, with whatever inspiration arrives next. The thing you were afraid of forgetting is breadcrumbed.',
        ],
      },
      {
        heading: 'Capture, organize, distill, express',
        paragraphs: [
          'Tiago Forte\'s Building a Second Brain framework named the loop. Capture the input. Organize it where you can find it later. Distill the essence. Express it back into the world. A 20-minute video search on his work gives you the foundation.',
          'Two more shoulders are worth standing on. Andrej Karpathy\'s LLM-wiki idea: keep the raw source material, process what matters, slowly turn it into structured, connected knowledge. The vault compounds over time. Steph Ango\'s Obsidian Skills: practical workflows for working inside the vault, named and shared so anyone can adopt them. Three different lineages, one shared posture. Trust the files. Trust the loop.',
          'The AI Second Brain runs the same loop with one upgrade. The AI handles a lot of the organize, distill and express work. You stay focused on capture and on creative judgment.',
          'A To-Do Dock is the daily capture surface for the small stuff. Pending Plans are the longer-horizon capture surface for ideas you want to act on later. Claude Code is the engine that organizes and distills. Skills like article drafting, social batch drafting and the express layer of any creative bundle handle the output side. The same files flow through every layer.',
        ],
      },
      {
        heading: 'The maintenance layer keeps it alive',
        paragraphs: [
          'A second brain that gets dumped into and never revisited is a closet. The cadence layer is what turns the closet back into a room you actually live in. Daily: the small stuff cleared, captures triaged. Weekly: the longer arc reviewed, focus areas set for what comes next.',
          'In the Kingdom this looks like the To-Do Dock cleared each day, a Session Closeout written when a working session ends, and the Steward Review run weekly to set the next week\'s focus. The shape varies by practitioner. The layer is not optional. Without it the second brain calcifies.',
          'You do not need every cadence on day one. Pick one. The daily clear is the cheapest place to start. Add the weekly review when the daily clear is reflexive. The system improves in the background once the rhythm is real.',
        ],
      },
      {
        heading: 'A recognition moment from the room',
        paragraphs: [
          'During the May 2 AI for Livin\' Workshop, mid-demo, an attendee said it out loud: "You\'re searching through your second brain right now. It\'s like, that\'s happening."',
          'Yes. That was the demo. The system in motion. Everyone in the room watched what they had been hearing about become a thing you do.',
          'The AI Second Brain is not aspirational architecture. It runs the moment you pick up the tool, point it at the right files and start trusting it. The setup takes about an hour. The trust takes about a week.',
        ],
      },
      {
        heading: 'Why this is sovereignty work',
        paragraphs: [
          'A second brain that lives on someone else\'s server is a brain you rent. The terms of service are the terms of your interior life.',
          'The AI Second Brain stays on your machine. Different AI tools can read and write the same files because the files belong to you. The intelligence builds toward you the longer you use it.',
          'This is where Data Sovereignty stops being abstract. The second brain is the most personal substrate you have. Owning it is the work that makes everything else easier to own.',
        ],
      },
    ],
    relatedSlugs: ['data-sovereignty', 'the-north-star', 'ideal-month'],
    ctaLinks: [
      { href: '/concepts/data-sovereignty', label: 'Data Sovereignty', variant: 'accent' },
      { href: 'https://github.com/InfiniteGamePlayer/sovereign-ecosystem', label: 'Get the Sovereign Ecosystem', variant: 'outline' },
    ],
  },
]

// Future concept candidates (King decides which to build):
// - Perception Upgrade (reality is decoded, not given)
// - The Kingdom Model (sovereign creative operating system architecture)
// - Self-Authorization (choosing from coherence, not conditioning)
// - Creative Sovereignty (making from authority, not compliance)
// - The Two-Layer Game (infinite game + finite side quests)

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find(c => c.slug === slug)
}

export function getAllConceptSlugs(): string[] {
  return concepts.map(c => c.slug)
}
