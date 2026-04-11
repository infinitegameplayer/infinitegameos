import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Playbooks and Frameworks',
  description:
    'Practical frameworks for long-term thinking, sovereign life design, and agentic systems. Concrete tools built from inside the practice.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Playbooks',
      item: 'https://infinitegameos.io/playbooks',
    },
  ],
}

const upcomingPlaybooks = [
  {
    title: 'The Vocabulary System',
    description:
      'How to build a consistent vocabulary for your body of work. The framework behind GEO-ready expertise positioning.',
    status: 'coming soon',
  },
  {
    title: 'The Two-Layer Game Structure',
    description:
      'Designing finite games (side quests) that fund and support the infinite game. The architecture behind SideQuestHQ.',
    status: 'coming soon',
  },
  {
    title: 'The Sovereign Presence Audit',
    description:
      'A five-question audit for evaluating your current digital presence against Post Web standards. Is your expertise AI-agent-legible?',
    status: 'coming soon',
  },
  {
    title: 'The Four-Node Expertise Web',
    description:
      'How to build a cross-linked, multi-node expertise web that compounds across years. The architecture behind this OS.',
    status: 'coming soon',
  },
]

export default function PlaybooksPage() {
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
              Playbooks
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              Frameworks and tools
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
              Practical frameworks for long-term thinking, sovereign systems, and
              agentic life design. Built from inside the practice, not from the
              outside in.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <SectionReveal>
            <div className="prose" style={{ marginBottom: '3rem' }}>
              <p>
                Playbooks are Lane&apos;s term for the concrete, hand-overable
                frameworks that come out of years of applying Infinite Game philosophy to
                real decisions. These are not theoretical. Each one is something Lane uses
                or has used to govern his own life and practice.
              </p>
              <p>
                The Playbooks section will grow as the OS builds out. Each framework will
                have its own page with the full rationale, the usage guide, and in some
                cases a standalone deliverable. Some will be available for purchase as
                downloadable guides.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={80}>
            <p className="label" style={{ marginBottom: '1.5rem' }}>
              In development
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {upcomingPlaybooks.map((pb, i) => (
                <SectionReveal key={pb.title} delay={i * 50}>
                  <div className="card" style={{ opacity: 0.65 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <span
                        className="label"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {pb.status}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        marginBottom: '0.6rem',
                      }}
                    >
                      {pb.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.65,
                      }}
                    >
                      {pb.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div
              style={{
                marginTop: '4rem',
                padding: '2rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: '2px solid var(--color-accent)',
                borderRadius: 'var(--radius)',
              }}
            >
              <p className="label" style={{ marginBottom: '0.75rem' }}>
                Follow the build
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'rgba(226, 232, 240, 0.7)',
                  marginBottom: '1rem',
                  lineHeight: 1.7,
                }}
              >
                Playbooks ship as they are built. The Updates section documents what
                is being developed, refined, and released. Follow along as the OS
                grows.
              </p>
              <Link href="/updates" className="btn-outline">
                Updates
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
