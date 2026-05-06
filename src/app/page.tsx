import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import {
  igosBio,
  homeFeaturedConcepts,
  homeFeaturedSkills,
  homeFeaturedBundles,
} from '@/lib/page-data'
import { getAllUpdates } from '@/lib/updates'

export const metadata: Metadata = {
  title: 'Infinite Game OS | Play a longer game.',
  description:
    'A practitioner-first knowledge base and library for the Infinite Game. Concepts, installable skills, avatar bundles and the philosophy underneath. Built AI-agent-first.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Infinite Game OS | Play a longer game.',
    description:
      'A practitioner-first knowledge base and library for the Infinite Game. Concepts, installable skills, avatar bundles and the philosophy underneath. Built AI-agent-first.',
    url: 'https://www.infinitegameos.io',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
  ],
}

function FeaturedCard({ mod }: { mod: { href: string; label: string; title: string; description: string } }) {
  return (
    <Link href={mod.href} style={{ display: 'block' }}>
      <article className="card" style={{ height: '100%' }}>
        <p className="label" style={{ marginBottom: '0.75rem' }}>{mod.label}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{mod.title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>{mod.description}</p>
      </article>
    </Link>
  )
}

export default function HomePage() {
  const recentUpdates = getAllUpdates().slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* 1. Hero */}
      <section
        className="grid-bg"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 1.5rem 5rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(34, 211, 238, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', maxWidth: '720px' }}>
          <p className="label hero-line hero-line-1" style={{ marginBottom: '1.5rem' }}>Infinite Game OS</p>
          <h1
            className="hero-line hero-line-2"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            Play a longer game.
          </h1>
          <p
            className="hero-line hero-line-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-muted)',
              maxWidth: '52ch',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            A practitioner-first knowledge base and library for the Infinite Game. Concepts to think with, skills to install, bundles to run.
          </p>
          <div
            className="hero-line hero-line-4"
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/skills" className="btn-accent">Explore the Library</Link>
            <Link href="/concepts" className="btn-outline">Read the Concepts</Link>
          </div>
        </div>
      </section>

      {/* 2. Thin philosophy beat */}
      <section className="section">
        <SectionReveal>
          <div style={{ maxWidth: '720px' }}>
            <p className="label" style={{ marginBottom: '0.75rem' }}>The orientation</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem', maxWidth: '24ch' }}>
              Built on the Infinite Game and the Accord.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              The Infinite Game is the cause, the practice, the creative life with no endpoint. The Accord is the public charter for the human-AI partnership running underneath the work. Both are the philosophical ground this OS is built on.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/infinite-game" className="btn-outline">The Infinite Game</Link>
              <Link href="/accord" className="btn-outline">The Accord</Link>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* 3. The thinking — featured Concepts */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <SectionReveal>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The thinking</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', maxWidth: '32ch' }}>
                Concepts to think with.
              </h2>
            </div>
            <Link href="/concepts" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
              Browse all concepts →
            </Link>
          </div>
        </SectionReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {homeFeaturedConcepts.map((mod, i) => (
            <SectionReveal key={mod.href} delay={i * 60}>
              <FeaturedCard mod={mod} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* 4. The doing — featured Skills + Bundles */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <SectionReveal>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The doing</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', maxWidth: '32ch' }}>
                Skills to install. Bundles to run.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link href="/skills" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
                Browse all skills →
              </Link>
              <Link href="/bundles" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
                Browse all bundles →
              </Link>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <p className="label" style={{ marginBottom: '1rem', opacity: 0.7 }}>Featured skills</p>
        </SectionReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {homeFeaturedSkills.map((mod, i) => (
            <SectionReveal key={mod.href} delay={i * 60}>
              <FeaturedCard mod={mod} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <p className="label" style={{ marginBottom: '1rem', opacity: 0.7 }}>Featured bundles</p>
        </SectionReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {homeFeaturedBundles.map((mod, i) => (
            <SectionReveal key={mod.href} delay={i * 60}>
              <FeaturedCard mod={mod} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* 5. The foundation */}
      <SectionReveal>
        <section
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '3rem 1.5rem',
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '52ch' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The foundation</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.7 }}>
                Before concepts and skills, there is a workspace. The Sovereign Ecosystem is the foundational template — directory structure, governance scaffolding, first skill set. Free and open. The starting conditions for a sovereign AI practice.
              </p>
            </div>
            <Link href="/sovereign-ecosystem" className="btn-outline">Get the template</Link>
          </div>
        </section>
      </SectionReveal>

      {/* 6. The Creator beat */}
      <SectionReveal>
        <section
          style={{
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '5rem 1.5rem',
            background: 'rgba(34, 211, 238, 0.02)',
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="label" style={{ marginBottom: '0.75rem' }}>The invitation</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.5rem', maxWidth: '28ch', lineHeight: 1.2 }}>
              Be yourself. Build the life. Let the structure receive on your behalf.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.78)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              The work is to bring what is genuinely alive in you to the world in whatever form your creativity takes. Build, write, speak, advise, design, make. Whatever the form, bring it fully.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.78)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Infinite Game OS holds the structure underneath so the work compounds without requiring constant performance. People who resonate with what you make find their way to you. Not because you marketed at them. Because what you built was real and locatable.
            </p>
            <Link href="/concepts/creator-flywheel" className="btn-outline">The Creator Flywheel</Link>
          </div>
        </section>
      </SectionReveal>

      {/* 6. Recent updates */}
      {recentUpdates.length > 0 && (
        <section className="section">
          <SectionReveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <p className="label" style={{ marginBottom: '0.75rem' }}>From inside the practice</p>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', maxWidth: '32ch' }}>
                  Recent dispatches.
                </h2>
              </div>
              <Link href="/updates" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
                All updates →
              </Link>
            </div>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {recentUpdates.map((update, i) => (
              <SectionReveal key={update.slug} delay={i * 60}>
                <Link href={`/updates/${update.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <article className="card" style={{ height: '100%' }}>
                    <p className="label" style={{ marginBottom: '0.75rem' }}>
                      {new Date(update.date + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{update.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>{update.summary}</p>
                  </article>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* 7. Practitioner */}
      <SectionReveal>
        <section
          style={{
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '4rem 1.5rem',
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '52ch' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The practitioner</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.7 }}>{igosBio}</p>
            </div>
            <Link href="/about" className="btn-outline">About Lane</Link>
          </div>
        </section>
      </SectionReveal>
    </>
  )
}
