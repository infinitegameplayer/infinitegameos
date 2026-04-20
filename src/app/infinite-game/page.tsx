import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Infinite Game Philosophy',
  description:
    'The Infinite Game is any endeavor played to keep playing, not to win. Explore the philosophy, why it matters, and how Lane Belone applies it to sovereign creative life.',
}

const faqItems = [
  {
    q: 'What is the Infinite Game?',
    a: "James Carse introduced the concept in 1986: there is one infinite game, the game of existence itself. Simon Sinek adapted it for organizational leadership in 2019. Lane Belone applies it to the sovereign human life. An infinite game is any endeavor played to keep playing, not to win. Life, creative practice, relationships and meaningful work are infinite games. They have no endpoint, no final score, no single winner.",
  },
  {
    q: 'What is a Finite Game?',
    a: 'A finite game has a fixed set of rules, agreed-upon players, and a defined endpoint. Football is a finite game. A product launch is a finite game. Side quests are finite games nested within an infinite life. Finite games are real and useful. The problem is mistaking an infinite game for a finite one and playing it with finite-game strategy.',
  },
  {
    q: 'How does Lane Belone apply the Infinite Game?',
    a: 'Lane applies the Infinite Game as a lived architecture. His sovereign operating system (the Kingdom) is the structure for sustaining a long-horizon creative life. SideQuestHQ houses the finite games (workshops, advisory engagements) nested within the infinite game. The two are designed to coexist: finite game contributions fund and support the infinite game practice.',
  },
  {
    q: 'What is the relationship between Infinite Game and Post Web?',
    a: 'The Post Web is the technological expression of the Infinite Game. The Attention Economy ran on finite game logic: maximize extraction, win the quarter. The Intention Economy runs on infinite game logic: build trust that compounds, minimize extraction, align with the user intent. Practitioners who understand both have structural advantage in both the philosophical and the digital layer.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Infinite Game',
      item: 'https://infinitegameos.io/infinite-game',
    },
  ],
}

export default function InfiniteGamePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              Infinite Game
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              The game with no finish line
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--color-muted)',
                maxWidth: '56ch',
                lineHeight: 1.7,
              }}
            >
              The Infinite Game is the philosophical foundation this OS is built on.
              Here is the core of it, and how Lane applies it.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <p>
                The Infinite Game is any endeavor played to keep playing, not to win.
                Your creative practice, your body of work, your sovereign life. There
                is no endpoint, no scoreboard, no final winner. The goal is to grow the
                cause and keep playing well, for as long as possible, for reasons that
                matter. Lane Belone applies this as the governing logic of a sovereign
                creative life.
              </p>

              <h2>Two kinds of games</h2>
              <p>
                James Carse first articulated the distinction. Simon Sinek brought it
                into practical leadership and organizational strategy. Lane Belone has
                spent years applying it as the governing logic of a sovereign creative
                life.
              </p>
              <p>
                A <strong>finite game</strong> has known players, fixed rules, and an
                agreed-upon endpoint. Someone wins. Someone loses. The game ends. Finite
                games are useful. They create clear targets and measurable progress.
              </p>
              <p>
                An <strong>infinite game</strong> has known and unknown players, rules
                that can change, and no defined endpoint. The goal is not to win. The
                goal is to keep playing, to grow the cause, and to outlast the
                finite-game players who mistake the whole endeavor for a competition.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>Why it matters</h2>
              <p>
                The confusion between finite and infinite games is everywhere. Companies
                optimize for quarterly earnings at the cost of decade-long competitive
                advantage. Creators optimize for viral content at the cost of the deep
                body of work only they can build. Practitioners optimize for metrics at
                the cost of the practice that actually sustains them.
              </p>
              <p>
                The finite-game player in an infinite-game environment eventually runs
                out of motivation, resources, or both. The infinite-game player is
                sustained by the game itself.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>How Lane applies it</h2>
              <p>
                Lane&apos;s infinite game is the sovereign creative life. The Kingdom
                (his personal operating system), the body of work, the expertise web, the
                practice of philosophical inquiry and contribution. No endpoint. No single
                win condition. Built to sustain.
              </p>
              <p>
                Nested within that are finite games: workshops, advisory engagements,
                publishing deadlines, retreats. SideQuestHQ is the container for those
                finite games. The side quests are intentional, bounded, and they fund and
                support the infinite game.
              </p>
              <p>
                The architecture matters. Finite games collapse under the weight of
                infinite game expectations. Infinite games collapse when treated as finite
                ones. Designing the two-layer structure is itself an act of sovereignty.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>Questions on this philosophy</h2>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {faqItems.map((item) => (
                  <div key={item.q} className="card">
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.q}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'rgba(226, 232, 240, 0.7)',
                        lineHeight: 1.65,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={220}>
              <p
                style={{
                  marginTop: '3rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                }}
              >
                This section will deepen over time as Lane documents specific
                Infinite Game frameworks, tensions he has worked through, and
                applications to creative leadership and sovereign life design. Content
                grows bi-monthly.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={240}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/sovereignty" className="btn-accent">
                Sovereignty
              </Link>
              <Link href="/playbooks" className="btn-outline">
                Playbooks
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
