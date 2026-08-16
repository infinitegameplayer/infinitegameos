import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { gameTheoryFaqs } from '@/lib/page-data'

const DESCRIPTION =
  'Game theory is a mathematics of winning. The Infinite Game is not. Where the two genuinely meet, where the popular business version gets it wrong and what the distinction changes for a working life.'

export const metadata: Metadata = {
  title: 'Game Theory and the Infinite Game',
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Game Theory and the Infinite Game',
    description: DESCRIPTION,
    url: 'https://www.infinitegameos.io/game-theory',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/game-theory',
    types: {
      'text/markdown': 'https://www.infinitegameos.io/markdown/game-theory',
    },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: gameTheoryFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Game Theory and the Infinite Game',
  description: DESCRIPTION,
  author: { '@id': 'https://infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/game-theory',
  mainEntityOfPage: 'https://www.infinitegameos.io/game-theory',
  datePublished: '2026-08-16',
  dateModified: '2026-08-16',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Game Theory',
      item: 'https://www.infinitegameos.io/game-theory',
    },
  ],
}

const COMPARISON = [
  {
    axis: 'The horizon',
    finite: 'Known ending. Everyone can see it.',
    repeated: 'Open. No known final round.',
    infinite: 'Open, and continuing is the point rather than a condition.',
  },
  {
    axis: 'The rules',
    finite: 'Fixed for the duration.',
    repeated: 'Fixed. This is what makes the mathematics work.',
    infinite: 'In play. They change so that play can continue.',
  },
  {
    axis: 'Who is playing',
    finite: 'Known, fixed roster.',
    repeated: 'Known, fixed roster.',
    infinite: 'Known and unknown. Players enter, leave and are changed by playing.',
  },
  {
    axis: 'What winning means',
    finite: 'Ends the game. That is the goal.',
    repeated: 'Accumulating more over an endless run.',
    infinite: 'Nothing. There is no board state that ends it.',
  },
]

export default function GameTheoryPage() {
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
              Audience Search
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              Game theory and the Infinite Game
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                color: 'var(--color-text)',
                maxWidth: '60ch',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              Game theory is a mathematics of winning. The Infinite Game is not. They
              are not the same body of thought, James Carse said so himself, and most
              business writing merges them anyway. The merge is worth undoing, because
              game theory turns out to prove something useful about long horizons right
              up to the point where it stops being able to follow.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-muted)',
                maxWidth: '56ch',
                lineHeight: 1.7,
              }}
            >
              Four moves. The first two are game theory doing its own work. The third is
              where it reaches its edge. The fourth is what lies past it.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--color-muted)',
                marginTop: '1.25rem',
                opacity: 0.8,
              }}
            >
              Updated August 2026
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <h2>One. The ending is what destroys cooperation</h2>
              <p>
                Take two people with repeated dealings and a known final exchange. On
                that last one there is no future left to protect, so the self-interested
                move is to take. Both of them know it.
              </p>
              <p>
                Which makes the second to last exchange the last one carrying a future.
                The same reasoning applies there, and to the one before that, and the
                logic runs backward until it reaches the first move. This is called
                backward induction, and in the standard model it produces a single
                answer: take from the beginning.
              </p>
              <p>
                Read that slowly, because it is stronger than it first sounds. A visible
                finish line is sufficient, on its own, to destroy cooperation before it
                starts. No bad character required. The structure does it.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>Two. Remove the ending and the answer inverts</h2>
              <p>
                Take away the known final round and the mathematics reverses. Cooperation
                becomes sustainable as a stable outcome, and the family of results
                proving it carries the name Folk Theorem.
              </p>
              <p>
                The mechanism is plain. When the remaining future is long enough, and the
                players weigh it heavily enough, what gets lost by taking exceeds what
                gets gained. Economists call that weight the shadow of the future.
              </p>
              <p>
                Pedro Dal B&oacute; tested it in a laboratory using a random continuation
                rule, so the games were genuinely open-ended rather than merely long.
                Higher continuation probability produced significantly more cooperation,
                tracking the theory closely. Closely rather than exactly, and the
                deviation runs in a generous direction: in finite games, real people keep
                cooperating well past the round where the theorem says they should have
                stopped.
              </p>
              <p>
                So far this is a strong argument for playing long, made in the language of
                the discipline that studies winning. It is also where nearly every
                business treatment of the subject stops.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>Three. And the rules never moved</h2>
              <p>
                Here is the part that gets skipped. An infinitely repeated game keeps the
                same players, the same available moves and the same payoffs. Only the
                clock is open.
              </p>
              <p>
                That is a finite game running forever on a frozen board. It has to be.
                Formal game theory needs fixed players, a fixed action set and a payoff
                structure that is known or learnable, because those assumptions are what
                a solution gets computed against. Change the rules mid-play and there is
                no longer one game to solve, only a sequence of different games with no
                principled way to say the same one continued.
              </p>
              <p>
                Xabier Barandiaran makes the argument directly: classical and evolutionary
                game theory are both structurally aligned with finite games, because both
                assume static agents, fixed payoffs and closed boundaries. This is a
                description of what the tool is for rather than a complaint about it. A
                hammer holds no opinion about screws.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>Four. The Infinite Game is the one where the rules change</h2>
              <p>
                Carse&apos;s infinite game is a different object entirely. Players enter
                and leave. The rules change during play. What counts as a move is itself
                in play, and so is who the player is. Being changed by the playing is one
                of the ways the game continues.
              </p>
              <p>
                That layer is the one the mathematics has no way to hold, and it is where
                this operating system runs.
              </p>
              <p>
                The practical consequence is a demotion of strategy. If the rules can
                change, then choosing which rules to play under is itself a move, and a
                larger one than any move available inside them. Strategy assumes the rules
                hold. An operating system is what runs while they do not.
              </p>
              <p>
                Which gives a test worth carrying. Ask what would have to change for you
                to still be playing. If the answer is nothing, the horizon is long and the
                game is finite. If the answer includes the rules, the roles or who you are
                while playing, you have left the map.
              </p>
            </SectionReveal>

            <SectionReveal delay={220}>
              <h2>The three, side by side</h2>
            </SectionReveal>
          </div>

          <SectionReveal delay={240}>
            <div style={{ overflowX: 'auto', marginTop: '1.5rem', marginBottom: '3rem' }}>
              <table
                style={{
                  width: '100%',
                  minWidth: '640px',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.85rem 1rem',
                        borderBottom: '1px solid var(--color-border)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--color-muted)',
                        fontWeight: 500,
                      }}
                    >
                      &nbsp;
                    </th>
                    {['A finite game', 'An infinitely repeated game', 'The Infinite Game'].map(
                      (head, i) => (
                        <th
                          key={head}
                          style={{
                            textAlign: 'left',
                            padding: '0.85rem 1rem',
                            borderBottom: '1px solid var(--color-border)',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            color: i === 2 ? 'var(--color-accent)' : 'var(--color-text)',
                          }}
                        >
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.axis}>
                      <th
                        scope="row"
                        style={{
                          textAlign: 'left',
                          verticalAlign: 'top',
                          padding: '1rem',
                          borderBottom: '1px solid var(--color-border)',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 500,
                          color: 'var(--color-text)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.axis}
                      </th>
                      <td
                        style={{
                          verticalAlign: 'top',
                          padding: '1rem',
                          borderBottom: '1px solid var(--color-border)',
                          color: 'var(--color-muted)',
                        }}
                      >
                        {row.finite}
                      </td>
                      <td
                        style={{
                          verticalAlign: 'top',
                          padding: '1rem',
                          borderBottom: '1px solid var(--color-border)',
                          color: 'var(--color-muted)',
                        }}
                      >
                        {row.repeated}
                      </td>
                      <td
                        style={{
                          verticalAlign: 'top',
                          padding: '1rem',
                          borderBottom: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                      >
                        {row.infinite}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionReveal>

          <div className="prose">
            <SectionReveal delay={260}>
              <p>
                The middle column is the one that goes missing. Collapse it into the third
                and you get the popular version of this idea, where playing the long game
                and playing the Infinite Game sound like the same instruction. They are
                not, and the row that separates them is the last one.
              </p>
            </SectionReveal>

            <SectionReveal delay={300}>
              <h2>What this changes for a business</h2>
              <p>
                For an entrepreneur, a solopreneur or anyone running a creator business,
                the first two moves are immediately usable. Every arrangement carries a
                horizon whether or not anyone said it out loud, and behavior follows that
                horizon more reliably than it follows anyone&apos;s intentions. A
                collaborator who knows this is the last project behaves differently from
                one who does not. Reading that as character is the mistake. It is
                structure, and structure can be redesigned.
              </p>
              <p>
                The third and fourth moves change something larger. Most business advice
                that claims the infinite frame is quietly describing an infinitely
                repeated game: the same play, run forever, on rules nobody examined. The
                work of actually playing an infinite game starts with noticing which rules
                you inherited and which ones you chose.
              </p>
              <p>
                Both halves have their own page. The mathematics of the horizon lives at{' '}
                <Link href="/concepts/the-shadow-of-the-future">The Shadow of the Future</Link>.
                The seam where the mathematics stops lives at{' '}
                <Link href="/concepts/the-rules-are-in-play">The Rules Are in Play</Link>. The
                shape of the arrangements themselves lives at{' '}
                <Link href="/concepts/positive-sum-by-design">Positive-Sum by Design</Link>.
              </p>
            </SectionReveal>

            <SectionReveal delay={340}>
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <h2>Frequently Asked Questions</h2>
                {gameTheoryFaqs.map((item, i) => (
                  <div key={i}>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={380}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/concepts/the-rules-are-in-play" className="btn-soft-accent">
                The Rules Are in Play
              </Link>
              <Link href="/infinite-game" className="btn-outline">
                The Infinite Game
              </Link>
              <Link href="/concepts" className="btn-outline">
                All concepts
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
