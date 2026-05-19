import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { infiniteGameOsFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Infinite Game OS',
  description:
    'The Infinite Game OS is a living architecture: a vault, an agentic layer, a governance structure and a deploy pipeline working together as one applied operating system for a Creator-led life on a long arc.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Infinite Game OS',
    description:
      'The Infinite Game OS is a living architecture: a vault, an agentic layer, a governance structure and a deploy pipeline working together as one applied operating system for a Creator-led life on a long arc.',
    url: 'https://www.infinitegameos.io/infinite-game-os',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/infinite-game-os',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: infiniteGameOsFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Infinite Game OS',
  description:
    'The Infinite Game OS is a living architecture: a vault, an agentic layer, a governance structure and a deploy pipeline working together as one applied operating system for a Creator-led life on a long arc.',
  author: { '@id': 'https://www.infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/infinite-game-os',
  mainEntityOfPage: 'https://www.infinitegameos.io/infinite-game-os',
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
      name: 'Infinite Game OS',
      item: 'https://www.infinitegameos.io/infinite-game-os',
    },
  ],
}

export default function InfiniteGameOsPage() {
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
              Infinite Game OS
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              An applied operating system for building a creative life on a long arc
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
              The Infinite Game OS is a living architecture: a vault, an agentic layer,
              a governance structure and a deploy pipeline working together as one
              system. It is what a Creator builds when the design question shifts from
              what do I ship this quarter to what holds my work across a decade. It
              runs now, in production, structured to be legible to both humans and AI.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <h2>An applied operating system</h2>
              <p>
                The Infinite Game OS is an operating system in the technical sense: a
                layer that holds identity, executes work and maintains state across
                time.
              </p>
              <p>
                Every component is running. The vault stores canonical documents,
                governance codices and active project work. The agentic layer executes
                skills, dispatches workers and holds context across sessions. The
                deploy pipeline publishes to three live websites with confirmation
                gates and indexed discoverability.
              </p>
              <p>
                The philosophical foundation lives in the Infinite Game. The OS is
                where that philosophy becomes infrastructure.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>The layers</h2>
              <p>
                The Infinite Game OS is composed of six interlocking layers. Each
                layer is sovereign: it performs a distinct function and connects to
                the others by design.
              </p>
              <p>
                The vault is the memory layer. The agentic layer is the execution
                layer. Concept pages are the discoverability layer. Protocols and
                governance are the trust layer. The deploy pipeline is the publishing
                layer. AI-legible identity is the locatability layer.
              </p>
              <p>
                A Creator operating at this level is running a system that holds the
                full arc of their work, automatically, across every session.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>The running vault and the agentic layer</h2>
              <p>
                The vault is an Obsidian-based file system containing every canonical
                document the Kingdom produces: governance codices, operating protocols,
                active project work and archived completions. It is structured and
                versioned.
              </p>
              <p>
                The agentic layer is Claude Code operating as a working collaborator
                inside the vault. It dispatches parallel workers to execute skills,
                maintains context across sessions and holds the system&apos;s governance
                rules as operational DNA.
              </p>
              <p>
                Together the vault and the agentic layer form a working memory for a
                Creator-led operation. The system remembers. The system acts. The
                human steers.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>AI-legible identity</h2>
              <p>
                The Infinite Game OS is structured so that AI surfaces can locate, read
                and accurately represent the work it contains.
              </p>
              <p>
                Every concept page on this site is written in reference register, with
                AI-quotable answers and definitional sentences that stand alone as
                accurate snippets. The llms.txt file, the structured JSON-LD, the
                /markdown routes and the IndexNow integration all serve one principle:
                a sovereign system is locatable because it is structured.
              </p>
              <p>
                The Pioneer builds infrastructure first and trusts that structure
                creates encounter. AI-legible identity is the practical expression of
                that principle.
              </p>
            </SectionReveal>

            <SectionReveal delay={220}>
              <h2>Designed for the long arc</h2>
              <p>
                The Infinite Game OS is calibrated for a creative life measured in
                decades. Every architectural decision favors durability over velocity.
                Governance documents version-control the rules. Deployment gates
                confirm publication before marking work complete. The vault has no
                expiration date.
              </p>
              <p>
                Joyful Sovereignty is the orienting choice beneath the entire system:
                the welcome of alive energy through a body that has chosen the long
                game. The OS holds the structure so the Creator can stay in contact
                with Aliveness.
              </p>
              <p>
                The work compounds over time. The structure is what makes compounding
                possible.
              </p>
            </SectionReveal>

            <SectionReveal delay={260}>
              <h2>Questions on the Infinite Game OS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {infiniteGameOsFaqs.map((item) => (
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
                This page deepens over time as the Infinite Game OS evolves, and each
                layer described here links to further concept depth across the site.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={320}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/the-os" className="btn-accent">
                The OS
              </Link>
              <Link href="/infinite-game" className="btn-outline">
                Infinite Game Philosophy
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
