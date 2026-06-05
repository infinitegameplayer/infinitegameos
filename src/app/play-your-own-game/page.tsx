import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { playYourOwnGameFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'How to play your own game',
  description:
    'Playing your own game begins with identifying which game you are currently playing. A forensic game-audit approach for the already-accomplished person who senses the script is wrong.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'How to play your own game',
    description:
      'Playing your own game begins with identifying which game you are currently playing. A forensic game-audit approach for the already-accomplished person who senses the script is wrong.',
    url: 'https://www.infinitegameos.io/play-your-own-game',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/play-your-own-game',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: playYourOwnGameFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to play your own game',
  description:
    'Playing your own game begins with identifying which game you are currently playing. A forensic game-audit approach for the already-accomplished person who senses the script is wrong.',
  author: { '@id': 'https://infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/play-your-own-game',
  mainEntityOfPage: 'https://www.infinitegameos.io/play-your-own-game',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Play Your Own Game',
      item: 'https://www.infinitegameos.io/play-your-own-game',
    },
  ],
}

export default function PlayYourOwnGamePage() {
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
              How to play your own game
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
              Playing your own game begins with identifying which game you are currently
              playing. Most accomplished people are running a game they inherited rather
              than designed. The Infinite Game framework offers a different starting
              point: instead of optimizing for a finish line, it asks what game is worth
              playing for its own sake.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <h2>The game audit</h2>
              <p>
                Before anything changes, there is a diagnostic. The question is not
                &ldquo;Am I successful?&rdquo; The question is &ldquo;Who defined success
                in this version of my life?&rdquo;
              </p>
              <p>
                Most people who sense the script is wrong are not failing. They are
                winning. The discomfort is precisely that the wins no longer feel like
                wins. That is a data point, not a crisis.
              </p>
              <p>
                The game audit starts with three observations: what decisions have felt
                automatic in the last two years, what outcomes generated less satisfaction
                than expected and where effort and aliveness are pointing in opposite
                directions. Aliveness is the internal cue that something is alive and
                worth attending to. The audit is listening for where it went quiet.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>Hidden scoreboards</h2>
              <p>
                Every game has a scoreboard. The ones that distort decisions most are the
                ones that were never chosen. They were absorbed.
              </p>
              <p>
                Peer income comparison is one. The expectation of a certain title by a
                certain age is another. The number of social followers as a proxy for
                relevance. These scoreboards did not originate from the person holding
                them. They arrived through industry norms, family expectations and
                cultural repetition. Over time they began to feel like facts rather than
                choices.
              </p>
              <p>
                Hidden scoreboards are most legible when they produce shame without a
                clear origin. When someone feels behind and does not know behind what, a
                borrowed scoreboard is usually involved. The work is not to destroy the
                scoreboard. The work is to surface it, examine whether it still deserves
                the governing vote and, if not, revoke that vote.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>What changes when you stop playing the wrong game</h2>
              <p>
                The first change is perceptual. Decisions that once felt like obligations
                begin to feel like choices again. This is not the same as ease. It is
                authorship.
              </p>
              <p>
                The second change is relational. Some relationships were organized around
                the old game. Peers who measured status the same way. Mentors who defined
                success identically. When the game shifts, some of those relationships
                recalibrate. Others reveal they were transactional in ways that were not
                previously visible.
              </p>
              <p>
                The third change is temporal. Conventional success games are oriented
                toward arrival. A self-authored game is oriented toward continuation. The
                Infinite Game is the one played to keep playing, not to win. When someone
                steps into that orientation, urgency softens. The horizon opens. The
                standard for a good day changes.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>The first move</h2>
              <p>
                The first move in a self-authored game is not dramatic. It is not a
                resignation or a pivot or a public declaration. It is a single decision
                made by a different authority than usual.
              </p>
              <p>
                Instead of asking &ldquo;What would make me look credible here?&rdquo; the
                question becomes &ldquo;What would I choose if the audience were not
                watching?&rdquo; The answer is the first move. It is often small. That is
                what makes it real rather than performed.
              </p>
              <p>
                Each subsequent decision that passes through that filter builds a new
                decision-making pattern. Joyful Sovereignty is the description of this
                orientation at full expression: the chosen welcome of alive energy through
                the body, not the performance of freedom but its practice. The first move
                is the entry point.
              </p>
            </SectionReveal>

            <SectionReveal delay={220}>
              <h2>The Pioneer&apos;s territory</h2>
              <p>
                The Pioneer is the capacity archetype for the person walking into
                self-authored territory. Not a personality type. Not an identity. A
                capacity: the ability to move into ground that has no established path
                and stay oriented anyway.
              </p>
              <p>
                Pioneer territory is not wilderness. It has structure. That structure
                just has to be built from the inside out rather than inherited. The
                person in this territory is not lost. They are building a new map while
                walking.
              </p>
              <p>
                The practical features of Pioneer territory include: higher ambiguity
                tolerance than the previous game required, a different relationship to
                external validation and a need for orientation tools that are not
                scoreboard-dependent. The Infinite Game framework exists specifically for
                this territory. It is navigational architecture.
              </p>
            </SectionReveal>

            <SectionReveal delay={260}>
              <h2>Questions on playing your own game</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {playYourOwnGameFaqs.map((item) => (
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

            <SectionReveal delay={300}>
              <p
                style={{
                  marginTop: '3rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                }}
              >
                This page deepens over time as new concepts, practices and frameworks
                from the Infinite Game OS are added.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={310}>
            <div
              style={{
                marginTop: '3.5rem',
                padding: '2rem',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                background: 'var(--color-card, rgba(255, 255, 255, 0.02))',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  maxWidth: '62ch',
                  marginBottom: '1.5rem',
                }}
              >
                AI for the Business You Actually Want is the operator-side companion
                to Playing Your Own Game. The Pioneer audits the game. The Field Guide
                installs the protection that keeps the work from drifting back into
                someone else&apos;s voice. Seven Moves. Voice protection, pace-layer
                awareness and decision discipline for the owner using AI without
                losing themselves to it.
              </p>
              <a
                href="https://www.sidequesthq.co/products/ai-for-the-business-you-actually-want"
                className="btn-accent"
              >
                AI for the Business You Actually Want · $9
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={320}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/concepts/joyful-sovereignty" className="btn-accent">
                Joyful Sovereignty
              </Link>
              <Link href="/infinite-game" className="btn-outline">
                The Infinite Game
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
