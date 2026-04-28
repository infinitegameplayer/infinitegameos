import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { getAllUpdates } from '@/lib/updates'

export const metadata: Metadata = {
  title: 'Updates: From Inside the Practice',
  description:
    'Regular dispatches from Lane Belone as the Infinite Game OS evolves. What is being built, learned, and applied.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Updates: From Inside the Practice',
    description:
      'Regular dispatches from Lane Belone as the Infinite Game OS evolves. What is being built, learned, and applied.',
    url: 'https://www.infinitegameos.io/updates',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/updates',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Updates',
      item: 'https://www.infinitegameos.io/updates',
    },
  ],
}

export default function UpdatesPage() {
  const updates = getAllUpdates()

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
          {updates.map((update, i) => (
            <SectionReveal key={update.slug} delay={i * 60}>
              <Link
                href={`/updates/${update.slug}`}
                style={{ display: 'block', textDecoration: 'none', maxWidth: '640px', marginBottom: '1.5rem' }}
              >
                <div
                  style={{
                    padding: '2.5rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderLeft: '2px solid var(--color-accent)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <p className="label" style={{ marginBottom: '0.75rem' }}>
                    {new Date(update.date + 'T00:00:00Z').toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      marginBottom: '1rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    {update.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'rgba(226, 232, 240, 0.75)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {update.summary}
                  </p>
                </div>
              </Link>
            </SectionReveal>
          ))}

          <SectionReveal delay={100}>
            <div
              style={{
                marginTop: '2rem',
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
