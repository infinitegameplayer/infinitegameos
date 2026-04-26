import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { theOsFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'What is Infinite Game OS?',
  description:
    'Infinite Game OS is a structured operating system for practitioners of long-term thinking, sovereign life design and agentic systems. Explore the philosophy.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: theOsFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is Infinite Game OS?',
  description:
    'Infinite Game OS is a structured operating system for practitioners of long-term thinking, sovereign life design and agentic systems. Explore the philosophy.',
  author: { '@id': 'https://www.infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/the-os',
  mainEntityOfPage: 'https://www.infinitegameos.io/the-os',
  datePublished: '2026-04-14',
  dateModified: '2026-04-19',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    { '@type': 'ListItem', position: 2, name: 'The OS', item: 'https://www.infinitegameos.io/the-os' },
  ],
}

export default function TheOsPage() {
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
              The OS
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '22ch',
                marginBottom: '1.5rem',
              }}
            >
              What is Infinite Game OS?
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
              A structured operating system for practitioners who have chosen an
              infinite game.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <p>
                Infinite Game OS is a structured knowledge base and operating system
                for practitioners who have chosen the Infinite Game: a creative practice,
                a body of work, a sovereign life that has no endpoint and no final
                score. It provides the philosophy, frameworks and systems for sustaining
                that kind of life across decades. Built by Lane Belone from inside a
                sovereign life, not as theory.
              </p>

              <h2>The premise</h2>
              <p>
                A finite game is played to win. A championship, a deal, a launch. There
                is a clear endpoint, a scoreboard and a winner. Finite games are real
                and necessary. The problem is mistaking the Infinite Game for a finite one.
              </p>
              <p>
                The Infinite Game is played to keep playing. Your creative practice is
                an expression of it. So is building a sovereign life. So is developing
                expertise that compounds across decades. The goal is not to win. The
                goal is to grow the cause and keep playing well.
              </p>
              <p>
                James Carse wrote the original text in 1986. Profound, philosophical
                and built for a religion professor's audience. Not a practitioner's
                toolkit. Simon Sinek adapted it for Fortune 500 organizations in 2019.
                Five useful pillars, explicitly designed for corporations, not people.
              </p>
              <p>
                Neither built an operating system for the individual human being who
                wants to play their entire life as the Infinite Game by design. That
                is the gap. That is what this OS addresses.
              </p>
              <p>
                Lane Belone built Infinite Game OS from inside a sovereign life. Not as
                theory, but as architecture that is running now. The Kingdom vault is the
                demo. The practice is documented publicly so practitioners can find their
                own version of it.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>Why an OS?</h2>
              <p>
                An operating system manages resources, routes attention, runs processes,
                and creates the conditions for everything else to function. A life built
                like an OS is governed by its own principles rather than reacting to
                external conditions.
              </p>
              <p>
                Infinite Game OS is not a productivity system. It does not optimize
                output within an existing structure. It is the structure itself: the
                philosophy, the frameworks, the practices, and the principles that govern
                a long-horizon creative life.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>The modules</h2>
              <ul>
                <li>
                  <strong>Infinite Game</strong>. Core philosophy, what it means to
                  play the Infinite Game in practice
                </li>
                <li>
                  <strong>Agentic Systems</strong>. The Post Web, sovereign digital
                  presence, Generative Engine Optimization
                </li>
                <li>
                  <strong>Sovereignty</strong>. Sovereign life design, the Kingdom
                  model, creative leadership frameworks
                </li>
                <li>
                  <strong>Playbooks</strong>. Practical tools for long-term
                  practitioners
                </li>
                <li>
                  <strong>Updates</strong>. Dispatches from inside the practice
                </li>
              </ul>
            </SectionReveal>
          </div>

          <SectionReveal delay={180}>
            <section style={{ marginTop: '4rem' }}>
              <p className="label" style={{ marginBottom: '1.5rem' }}>
                Common questions
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {theOsFaqs.map((item) => (
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
            </section>
          </SectionReveal>

          <SectionReveal delay={220}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/infinite-game" className="btn-accent">
                The Infinite Game
              </Link>
              <Link href="/agentic-systems" className="btn-outline">
                Agentic Systems
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
