import type { Metadata } from 'next'
import SectionReveal from '@/components/SectionReveal'
import { igosExpertise, igosEcosystemLinks } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'About Lane Belone',
  description:
    'Lane Belone is an Infinite Game practitioner, sovereign life designer and systems builder. He builds from inside the practice and documents it publicly for practitioners who want to do the same.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'About Lane Belone',
    description:
      'Lane Belone is an Infinite Game practitioner, sovereign life designer and systems builder. He builds from inside the practice and documents it publicly for practitioners who want to do the same.',
    url: 'https://www.infinitegameos.io/about',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/about',
  },
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': 'https://infinitegameos.io/#person' },
  url: 'https://www.infinitegameos.io/about',
  name: 'About Lane Belone',
  description:
    'Lane Belone is an Infinite Game practitioner, sovereign life designer and systems builder. He builds from inside the practice and documents it publicly for practitioners who want to do the same.',
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
                  sovereign creative operating systems and agentic architecture. He
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
                  This site is one node in a four-node expertise web. It is built to hold a consistent body of work across years and to be legible to anyone who arrives looking for long-term thinking and sovereign creative systems. Every structural decision here reflects that design.
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
                href="https://www.sidequesthq.co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-soft-accent"
              >
                Work with Lane
              </a>
              <a
                href="https://lanebelone.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                lanebelone.com
              </a>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
