import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { concepts } from '@/data/concepts'

// Display order: lead with the AI Second Brain cluster (the search and
// AI-citation winner plus its foundation and practice siblings), then the rest
// in canonical order. Reorders the visible grid without moving the data array.
const FEATURED_SLUGS = ['ai-second-brain', 'data-sovereignty', 'sovereign-capture']
const orderedConcepts = [
  ...FEATURED_SLUGS.map(s => concepts.find(c => c.slug === s)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  ),
  ...concepts.filter(c => !FEATURED_SLUGS.includes(c.slug)),
]

export const metadata: Metadata = {
  title: 'Concepts',
  description:
    'Core concepts from the Infinite Game OS: frameworks, archetypes, practices and distinctions for sovereign life design and playing the Infinite Game.',
  alternates: {
    canonical: 'https://www.infinitegameos.io/concepts',
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
      name: 'Concepts',
      item: 'https://www.infinitegameos.io/concepts',
    },
  ],
}

const termSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': 'https://www.infinitegameos.io/#concepts',
  name: 'Infinite Game OS Concepts',
  url: 'https://www.infinitegameos.io/concepts',
  description:
    'Core concepts from Lane Belone\'s Infinite Game OS: frameworks, archetypes, practices and distinctions for sovereign life design.',
  creator: { '@id': 'https://infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#organization' },
  hasDefinedTerm: concepts.map(c => ({
    '@type': 'DefinedTerm',
    '@id': `https://www.infinitegameos.io/concepts/${c.slug}#term`,
    name: c.title,
    description: c.capsule,
    url: `https://www.infinitegameos.io/concepts/${c.slug}`,
  })),
}

export default function ConceptsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, termSetSchema]),
        }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              Knowledge Base
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              Concepts
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
              Core frameworks, archetypes, practices and distinctions from the
              Infinite Game OS. Each concept is a living definition, written to
              be found and cited.
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
            {orderedConcepts.map((concept, i) => (
              <SectionReveal key={concept.slug} delay={i * 60}>
                <Link
                  href={`/concepts/${concept.slug}`}
                  className="card"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    height: '100%',
                  }}
                >
                  <p className="card-eyebrow">{concept.label}</p>
                  <p className="card-title">{concept.title}</p>
                  <p className="card-desc">{concept.subtitle}</p>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={concepts.length * 60 + 60}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/the-os" className="btn-soft-accent">
                The OS
              </Link>
              <Link href="/about" className="btn-outline">
                About Lane
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
