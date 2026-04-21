import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Infinite Game Philosophy',
  description:
    'The Infinite Game is the one game played to keep playing. Not to win. Explore the philosophy, the practice and how Lane Belone lives it as the architecture of a sovereign creative life.',
}

const faqItems = [
  {
    q: 'What is the Infinite Game?',
    a: "James Carse introduced the concept in 1986: there is one Infinite Game, the game of existence itself. Simon Sinek adapted it for organizational leadership in 2019. Lane Belone applies it to the sovereign human life. The Infinite Game is played to keep playing. Life, creative practice, relationships and meaningful work are all expressions of it. They have no endpoint, no final score, no single winner. You are already in it. The only question is whether you are playing it or performing someone else's finite version of it.",
  },
  {
    q: 'What is a Finite Game?',
    a: 'A finite game has a fixed set of rules, agreed-upon players and a defined endpoint. Football is a finite game. A product launch is a finite game. Side quests are finite games nested within the Infinite Game. Finite games are real and useful. The problem is mistaking the Infinite Game for a finite one and playing life with finite-game strategy.',
  },
  {
    q: 'How does Lane Belone apply the Infinite Game?',
    a: 'Lane applies the Infinite Game through three movements of embodiment: thinking the philosophy, acting on it and embodying it until the practice runs without effort. The musician\'s arc. Scales practiced until they become invisible, leaving only the play. The endpoint is the Embodied Player. The orientation is Joyful Sovereignty, the sovereign choice to welcome alive energy through the body. Aliveness is always present. The variable is what the human follows. Following Aliveness is how the Infinite Game keeps playing. His digital sovereign operating system (the Kingdom) organizes one wing of a three-plane life. SideQuestHQ houses the finite games nested within it. Playing this way in the current era asks something new. This is the Pioneer\'s territory.',
  },
  {
    q: 'What is the relationship between Infinite Game and Post Web?',
    a: 'The Post Web is the technological expression of the Infinite Game. The Attention Economy ran on finite-game logic: maximize extraction, win the quarter. The Intention Economy runs on Infinite Game logic: build trust that compounds, minimize extraction, align with user intent. Practitioners who understand both have structural advantage in both the philosophical and the digital layer.',
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Infinite Game Philosophy',
  description:
    'The Infinite Game is the one game played to keep playing. Not to win. Explore the philosophy, the practice and how Lane Belone lives it as the architecture of a sovereign creative life.',
  author: { '@id': 'https://infinitegameos.io/#person' },
  publisher: { '@id': 'https://infinitegameos.io/#website' },
  url: 'https://infinitegameos.io/infinite-game',
  mainEntityOfPage: 'https://infinitegameos.io/infinite-game',
  datePublished: '2026-04-14',
  dateModified: '2026-04-21',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
                The Infinite Game is the one game played to keep playing. Not to win.
                Your creative practice, your body of work, your sovereign life are all
                expressions of it. There is no endpoint, no scoreboard, no final winner.
                The goal is to grow the cause and keep playing well, for as long as the
                life holds. Lane Belone applies this as the governing logic of a
                sovereign creative life.
              </p>

              <h2>Two kinds of games</h2>
              <p>
                James Carse first articulated the distinction. Simon Sinek brought it
                into practical leadership and organizational strategy. Lane Belone has
                spent years applying it as the governing logic of a sovereign creative
                life.
              </p>
              <p>
                A <strong>finite game</strong> has known players, fixed rules and an
                agreed-upon endpoint. Someone wins. Someone loses. The game ends. Finite
                games are useful. They create clear targets and measurable progress.
              </p>
              <p>
                The <strong>Infinite Game</strong> has known and unknown players, rules
                that can change and no defined endpoint. The goal is not to win. The
                goal is to keep playing, to grow the cause and to outlast the
                finite-game players who mistake the whole endeavor for a competition.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>The cost of confusion</h2>
              <p>
                The confusion between finite games and the Infinite Game is everywhere.
                Companies optimize for quarterly earnings at the cost of decade-long
                competitive advantage. Creators optimize for viral content at the cost
                of the deep body of work only they can build. Practitioners optimize for
                metrics at the cost of the practice that actually sustains them.
              </p>
              <p>
                The finite-game player in Infinite Game territory eventually runs out of
                motivation and resources. The Infinite Game player is sustained by the
                game itself.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>How Lane applies it</h2>
              <p>
                Lane applies the Infinite Game through three movements of embodiment:
                thinking the philosophy, acting on it and embodying it until the practice
                runs without effort because it has become identity. The musician&apos;s
                arc. Scales practiced until they become invisible, leaving only the play.
                Simultaneously, the old conditioned self unravels. The endpoint is the
                Embodied Player.
              </p>
              <p>
                The orientation is Joyful Sovereignty: the sovereign choice to welcome
                alive energy through the body. The whole game played from the inside,
                with spaciousness, playfulness and genuine peace. Aliveness is always
                present. The variable is what the human follows. Following Aliveness is
                how the Infinite Game keeps playing. Following the conditioned script,
                the inherited &ldquo;this is how it&apos;s supposed to be done,&rdquo; is
                finite-game strategy mistaken for living.
              </p>
              <p>
                His digital sovereign operating system (the Kingdom) is one wing of a
                three-plane life: the subconscious, the digital and the physical. The
                Kingdom organizes focus, energizes chosen creations and illuminates
                patterns. It complements sovereign trust. Sovereignty stays the source.
              </p>
              <p>
                Nested within the Infinite Game are finite games: workshops, advisory
                engagements, publishing deadlines, retreats. SideQuestHQ is the container.
                Side quests are intentional and bounded. They fund and support the
                Infinite Game practice.
              </p>
              <p>
                The architecture holds. Finite games collapse under the weight of
                Infinite Game expectations. The Infinite Game collapses when treated as a
                finite one. Designing the two-layer structure is itself an act of
                sovereignty. Playing this way in the current era asks something new: a
                sovereign life architected in the Post Web, the AI moment, the sovereign
                moment itself. This is the Pioneer&apos;s territory.
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
                Infinite Game frameworks, tensions he has worked through and applications
                to creative leadership and sovereign life design. Content grows
                bi-monthly.
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
