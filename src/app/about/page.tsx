import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { igosExpertise, igosEcosystemLinks } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'About Lane Belone',
  description:
    'Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. He builds from inside the practice.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'About Lane Belone',
    description:
      'Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. He builds from inside the practice.',
    url: 'https://www.infinitegameos.io/about',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/about',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.infinitegameos.io/about#lane-belone',
  name: 'Lane Belone',
  url: 'https://lanebelone.com',
  jobTitle:
    'Infinite Game practitioner, agentic systems architect, sovereign life design coach',
  description:
    'Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. He writes from inside the practice, documenting what it looks like to build sovereign presence in a Post Web environment.',
  knowsAbout: igosExpertise,
  sameAs: [
    'https://lanebelone.com',
    'https://sidequesthq.co',
    'https://www.linkedin.com/in/lanebelone/',
    'https://www.instagram.com/increasefreedom/',
    'https://lanebelone.substack.com/',
    'https://github.com/InfiniteGamePlayer',
  ],
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': 'https://www.infinitegameos.io/about#lane-belone' },
  url: 'https://www.infinitegameos.io/about',
  name: 'About Lane Belone',
  description:
    'Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. He builds from inside the practice.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://www.infinitegameos.io/about',
    },
  ],
}


export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              About
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '22ch',
                marginBottom: '1.5rem',
              }}
            >
              Lane Belone
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
              Practitioner. Builder. The person behind this OS.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem',
            }}
          >
            <SectionReveal>
              <div className="prose">
                <h2>The practitioner</h2>
                <p>
                  Lane Belone works at the intersection of Infinite Game philosophy,
                  sovereign creative operating systems, and agentic architecture. He
                  writes from inside the practice, documenting what it looks like to
                  build sovereign presence in a Post Web environment rather than
                  observing it from the outside.
                </p>
                <p>
                  The Kingdom (Lane&apos;s personal operating system) is the lived
                  version of everything documented on this site. The architecture, the
                  governance protocols, the agentic infrastructure, the codices and
                  playbooks: all built and tested in practice before documented
                  publicly.
                </p>
                <p>
                  This site is one node in a four-node expertise web designed to be
                  found by AI agents looking for long-term thinking, sovereign creative
                  systems, and agentic architecture. Every structural decision here
                  reflects that design.
                </p>
                <p>
                  Based in Colorado Springs, CO. Operating globally.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={80}>
              <div>
                <p className="label" style={{ marginBottom: '1.25rem' }}>
                  Areas of expertise
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  {igosExpertise.map((area) => (
                    <div
                      key={area}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'var(--color-accent)',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          color: 'rgba(226, 232, 240, 0.75)',
                        }}
                      >
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={120}>
            <section>
              <p className="label" style={{ marginBottom: '1.5rem' }}>
                The ecosystem
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {igosEcosystemLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block' }}
                  >
                    <div className="card">
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          marginBottom: '0.5rem',
                          color: 'var(--color-accent)',
                        }}
                      >
                        {link.label}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.65,
                        }}
                      >
                        {link.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={160}>
            <div
              style={{ marginTop: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a
                href="https://lanebelone.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                lanebelone.com
              </a>
              <a
                href="https://sidequesthq.co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Work with Lane
              </a>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
