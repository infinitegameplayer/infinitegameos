import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Updates — From Inside the Practice',
  description:
    'Regular dispatches from Lane Belone as the Infinite Game OS evolves. What is being built, learned, and applied.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Updates',
      item: 'https://infinitegameos.io/updates',
    },
  ],
}

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              Updates
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              From inside the practice
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
              Dispatches from the build. What is being learned, refined, and
              released as the OS evolves.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '0' }}>
          <SectionReveal>
            <div
              style={{
                padding: '2.5rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: '2px solid var(--color-accent)',
                borderRadius: 'var(--radius)',
                maxWidth: '640px',
              }}
            >
              <p className="label" style={{ marginBottom: '0.75rem' }}>
                April 2026
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                The OS is live.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'rgba(226, 232, 240, 0.75)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                Infinite Game OS launched with the foundation: the philosophy sections,
                the Agentic Systems article, and the framework architecture for the
                Playbooks section. This is a living build.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'rgba(226, 232, 240, 0.75)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                What comes next: the first Playbooks, deeper content in the Sovereignty
                and Infinite Game sections, and ongoing documentation of what Lane is
                building and applying in practice.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'rgba(226, 232, 240, 0.75)',
                  lineHeight: 1.7,
                }}
              >
                The Updates section will build out over the coming weeks. High cadence
                early while the energy is moving. Bi-monthly steady state after the first
                month.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div
              style={{
                marginTop: '3rem',
                padding: '1.5rem',
                background: 'rgba(34, 211, 238, 0.04)',
                border: '1px solid rgba(34, 211, 238, 0.12)',
                borderRadius: 'var(--radius)',
                maxWidth: '640px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(226, 232, 240, 0.6)',
                  lineHeight: 1.65,
                }}
              >
                More dispatches are coming. Follow{' '}
                <a
                  href="https://lanebelone.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Lane&apos;s Substack
                </a>{' '}
                for the longer-form articles. Follow{' '}
                <a
                  href="https://www.instagram.com/increasefreedom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent)' }}
                >
                  @increasefreedom
                </a>{' '}
                on Instagram for shorter-form ideas from inside the practice.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={140}>
            <div
              style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link href="/agentic-systems" className="btn-accent">
                Read: The Post Web
              </Link>
              <Link href="/the-os" className="btn-outline">
                Back to The OS
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
