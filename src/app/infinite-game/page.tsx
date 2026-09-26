import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { infiniteGameFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Infinite Game Philosophy',
  description:
    'The Infinite Game is the one game played to keep playing. Not to win. Explore the philosophy, the practice and how Lane Belone lives it as the architecture of a sovereign creative life.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Infinite Game Philosophy',
    description:
      'The Infinite Game is the one game played to keep playing. Not to win. Explore the philosophy, the practice and how Lane Belone lives it as the architecture of a sovereign creative life.',
    url: 'https://www.infinitegameos.io/infinite-game',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/infinite-game',
    types: {
      'text/markdown': 'https://www.infinitegameos.io/markdown/infinite-game',
    },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: infiniteGameFaqs.map((item) => ({
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
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/infinite-game',
  mainEntityOfPage: 'https://www.infinitegameos.io/infinite-game',
  datePublished: '2026-04-14',
  dateModified: '2026-09-24',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Infinite Game',
      item: 'https://www.infinitegameos.io/infinite-game',
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

            <SectionReveal delay={110}>
              <h2>The Infinite Player</h2>
              <p>
                The one who plays the Infinite Game is the Infinite Player, the
                player underneath every role, designing the games worth playing. A
                role, a title or a skill set is a character worn for a season, the
                way a jacket is worn. The player wearing it is the constant, and the
                player remains when a defining game ends.
              </p>
              <p>
                The Infinite Player notices that every game was designed by someone, on
                purpose or by inheritance, and takes up the design of the next one. Under
                every outer game, the deliverable, the metric, the quarter, runs a game
                within the game, the inner game running under every outer one. The
                Infinite Player keeps that inner game alive through practice, so the
                outer one stays worth playing.
              </p>
              <p>
                This is the shift the whole OS serves: from being played by an inherited
                game to authoring your own.
              </p>
              <p>
                Side Quest HQ keeps the Infinite Player&apos;s full page, with the three
                moves and a free hour to start.
              </p>
              <p>
                <a href="https://www.sidequesthq.co/infinite-player" className="btn-outline">
                  The Infinite Player at Side Quest HQ
                </a>
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>How Lane applies it</h2>
              <p>
                Lane applies the Infinite Game through three movements of embodiment:
                thinking the philosophy, acting on it and embodying it until the practice
                runs without effort because it has become identity. The musician&apos;s
                arc. Scales practiced until they become invisible, leaving only the play.
                Simultaneously, the old conditioned self unravels.
              </p>
              <p>
                The orientation is Joyful Sovereignty, a way of playing the Infinite
                Game from within: purposeful, playful and free. It is the sovereign
                choice to welcome alive energy through the body. The whole game played
                from the inside, with spaciousness, playfulness and genuine peace.
                Aliveness, the emerging energy that moves through you when an idea or a
                moment feels exciting and true to you, is always present. The variable is what the
                human follows. Following Aliveness is how the Infinite Game keeps
                playing. Following the conditioned script, the inherited &ldquo;this is
                how it&apos;s supposed to be done,&rdquo; is finite-game strategy
                mistaken for living.
              </p>
              <p>
                His digital sovereign operating system (the Kingdom) is one wing of a
                three-plane life: the subconscious, the digital and the physical. The
                Kingdom organizes focus, energizes chosen creations and illuminates
                patterns. It complements sovereign trust. Sovereignty stays the source.
              </p>
              <p>
                Nested within the Infinite Game are finite games: workshops, advisory
                engagements, publishing deadlines, Side Quests. Side Quest HQ is the
                container. Side quests, finite adventures you choose inside the
                Infinite Game, are intentional and bounded. They fund and support the
                Infinite Game practice.
              </p>
              <p>
                The architecture holds. Finite games collapse under the weight of
                Infinite Game expectations. The Infinite Game collapses when treated as a
                finite one. Designing the two-layer structure is itself an act of
                sovereignty. Playing this way in the current era asks something new: a
                sovereign life architected in the Post Web, the AI moment, the sovereign
                moment itself. The Post Web is the web of the fourth verb, where you
                hold the intent and delegate the execution to agents. This is the
                Pioneer&apos;s territory. The Pioneer is someone at the edge of their
                own discovery, with the courage and aliveness to go after it and the
                humility to know they&apos;re always mid-journey.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>Questions on this philosophy</h2>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {infiniteGameFaqs.map((item) => (
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
                marginTop: '4rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/sovereignty" className="btn-soft-accent">
                Sovereignty
              </Link>
              <Link href="/concepts" className="btn-outline">
                Concepts
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
