import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { getAssetsByType } from '@/data/library'

const SITE = 'https://www.infinitegameos.io'

export const metadata: Metadata = {
  title: 'Bundles',
  description:
    'Avatar bundles from the Infinite Game OS. Pre-composed skill stacks installed in one command, organized by creator avatar.',
  alternates: {
    canonical: `${SITE}/bundles`,
  },
}

export default function BundlesIndexPage() {
  const bundles = getAssetsByType('bundle')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Bundles', item: `${SITE}/bundles` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE}/#bundles`,
    name: 'Infinite Game OS Bundles',
    url: `${SITE}/bundles`,
    description:
      'Pre-composed Claude Code skill bundles authored inside the Infinite Game OS practice.',
    itemListElement: bundles.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/bundles/${b.slug}`,
      name: b.title,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, itemListSchema]),
        }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              The Library
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              Bundles
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
              Pre-composed skill stacks, installed in one command. Each bundle
              is a working configuration for a particular kind of creator,
              authored inside the practice and shaped to install cleanly on top
              of the foundational substrate.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {bundles.map((bundle, i) => (
              <SectionReveal key={bundle.slug} delay={i * 60}>
                <Link
                  href={`/bundles/${bundle.slug}`}
                  className="card"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    height: '100%',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--color-accent)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {bundle.label}
                  </p>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {bundle.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {bundle.description}
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={bundles.length * 60 + 60}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/skills" className="btn-accent">
                Skills
              </Link>
              <Link href="/the-os" className="btn-outline">
                The OS
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
