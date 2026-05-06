import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { getAssetsByType } from '@/data/library'

const SITE = 'https://www.infinitegameos.io'

export const metadata: Metadata = {
  title: 'Protocols',
  description:
    'Procedural sequences and governing postures from the Infinite Game OS. Read by AI agents, harvested into working systems.',
  alternates: {
    canonical: `${SITE}/protocols`,
  },
}

export default function ProtocolsIndexPage() {
  const protocols = getAssetsByType('protocol')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Protocols', item: `${SITE}/protocols` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE}/#protocols`,
    name: 'Infinite Game OS Protocols',
    url: `${SITE}/protocols`,
    description:
      'Governing protocols authored inside the practice. Postures and sequences for principled agent operation.',
    itemListElement: protocols.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/protocols/${p.slug}`,
      name: p.title,
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
              Protocols
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
              Governing protocols authored inside the practice. Each one names
              a posture an agent holds in a specific situation. Read directly,
              harvested by other systems or referenced from any skill that
              touches the surface it governs.
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
            {protocols.map((protocol, i) => (
              <SectionReveal key={protocol.slug} delay={i * 60}>
                <Link
                  href={`/protocols/${protocol.slug}`}
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
                    {protocol.label}
                  </p>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {protocol.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {protocol.description}
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={protocols.length * 60 + 60}>
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
