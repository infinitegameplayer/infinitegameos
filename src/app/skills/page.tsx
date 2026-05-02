import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { getAssetsByType } from '@/data/library'

const SITE = 'https://www.infinitegameos.io'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Installable skills from the Infinite Game OS. Source-level patterns for Claude Code: harvest, planning, debugging, plan execution, skill authoring and research.',
  alternates: {
    canonical: `${SITE}/skills`,
  },
}

export default function SkillsIndexPage() {
  const skills = getAssetsByType('skill')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Skills', item: `${SITE}/skills` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE}/#skills`,
    name: 'Infinite Game OS Skills',
    url: `${SITE}/skills`,
    description:
      'Installable Claude Code skills authored inside the Infinite Game OS practice.',
    itemListElement: skills.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/skills/${s.slug}`,
      name: s.title,
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
              Skills
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
              Installable skills authored inside the practice. Each one is a
              source-level pattern for Claude Code, governed by the Infinite
              Game OS and published as a single-command install.
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
            {skills.map((skill, i) => (
              <SectionReveal key={skill.slug} delay={i * 60}>
                <Link
                  href={`/skills/${skill.slug}`}
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
                    {skill.label}
                  </p>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {skill.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {skill.description}
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={skills.length * 60 + 60}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/bundles" className="btn-accent">
                Bundles
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
