import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SectionReveal from '@/components/SectionReveal'
import { concepts, getConceptBySlug, getAllConceptSlugs } from '@/data/concepts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllConceptSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const concept = getConceptBySlug(slug)
  if (!concept) return {}

  return {
    title: concept.title,
    description: concept.capsule,
    alternates: {
      canonical: `https://infinitegameos.io/concepts/${concept.slug}`,
    },
  }
}

export default async function ConceptPage({ params }: PageProps) {
  const { slug } = await params
  const concept = getConceptBySlug(slug)
  if (!concept) notFound()

  const relatedConcepts = concept.relatedSlugs
    .map(s => concepts.find(c => c.slug === s))
    .filter(Boolean)

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `https://infinitegameos.io/concepts/${concept.slug}#term`,
    name: concept.title,
    description: concept.capsule,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': 'https://infinitegameos.io/#concepts',
      name: 'Infinite Game OS Concepts',
      url: 'https://infinitegameos.io/concepts',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://infinitegameos.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Concepts',
        item: 'https://infinitegameos.io/concepts',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: concept.title,
        item: `https://infinitegameos.io/concepts/${concept.slug}`,
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    headline: concept.title,
    description: concept.capsule,
    author: { '@id': 'https://infinitegameos.io/#person' },
    publisher: { '@id': 'https://infinitegameos.io/#website' },
    url: `https://infinitegameos.io/concepts/${concept.slug}`,
    mainEntityOfPage: `https://infinitegameos.io/concepts/${concept.slug}`,
    about: { '@id': `https://infinitegameos.io/concepts/${concept.slug}#term` },
    learningResourceType: 'concept definition',
    educationalLevel: 'practitioner',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([definedTermSchema, breadcrumbSchema, articleSchema]),
        }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              {concept.label}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              {concept.title}
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
              {concept.capsule}
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
              {concept.subtitle}
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            {concept.sections.map((section, i) => (
              <SectionReveal key={section.heading} delay={i * 80}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </SectionReveal>
            ))}
          </div>

          {concept.productCard && (
            <SectionReveal delay={concept.sections.length * 80}>
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
                  {concept.productCard.body}
                </p>
                <a
                  href={concept.productCard.ctaHref}
                  className="btn-accent"
                >
                  {concept.productCard.ctaLabel}
                </a>
              </div>
            </SectionReveal>
          )}

          {relatedConcepts.length > 0 && (
            <SectionReveal delay={concept.sections.length * 80}>
              <div
                style={{
                  marginTop: '4rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="label"
                  style={{ marginBottom: '1.25rem' }}
                >
                  Related concepts
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {relatedConcepts.map(rc => rc && (
                    <Link
                      key={rc.slug}
                      href={`/concepts/${rc.slug}`}
                      className="card"
                      style={{ textDecoration: 'none' }}
                    >
                      <p
                        style={{
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: 'var(--color-accent)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {rc.label}
                      </p>
                      <p
                        style={{
                          fontSize: '1.05rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 500,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {rc.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {rc.capsule}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          <SectionReveal delay={(concept.sections.length + 1) * 80}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {concept.ctaLinks.map(cta => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={cta.variant === 'accent' ? 'btn-accent' : 'btn-outline'}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
