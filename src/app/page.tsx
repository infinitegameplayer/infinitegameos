import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import CharterCallout from '@/components/CharterCallout'
import ThreadLink from '@/components/ThreadLink'
import SkyWord from '@/components/design/SkyWord'
import HeroBoard from '@/components/design/HeroBoard'
import HomeCircuit from '@/components/design/HomeCircuit'
import { ChipArt, JunctionRule, PhoneOrbit } from '@/components/design/HomeArt'
import { UpdatesLetter } from '@/components/LabThread'
import { HOMEPAGE_REFRAMES } from '@/data/threads'
import { resolvePage } from '@/lib/thread-resolve'
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
    'A practitioner-first knowledge base and library for the Infinite Game, built for entrepreneurs, solopreneurs and creators on a long arc. Concepts, installable skills and avatar bundles.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Infinite Game OS | Play a longer game.',
    description:
      'A practitioner-first knowledge base and library for the Infinite Game, built for entrepreneurs, solopreneurs and creators on a long arc. Concepts, installable skills and avatar bundles.',
    url: 'https://www.infinitegameos.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Game OS | Play a longer game.',
    description: 'A practitioner-first knowledge base and library for the Infinite Game, built for entrepreneurs, solopreneurs and creators on a long arc. Concepts, installable skills and avatar bundles.',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io',
    types: {
      'text/markdown': 'https://www.infinitegameos.io/markdown',
    },
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
  // The three reframes under the hero: each a door, titled by its destination's
  // own data. A reframe whose destination can't be found renders nothing.
  const reframes = HOMEPAGE_REFRAMES.flatMap(r => {
    const dest = resolvePage(r.href)
    return dest ? [{ question: r.question, dest }] : []
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* The circuit: one line from the hero to the footer, drawn from the
          data-c anchors below. Decorative; renders nothing until measured. */}
      <HomeCircuit />

      {/* 1. Hero */}
      <section className="hero" data-c="hero">
        <HeroBoard />
        <div className="hero-in">
          <p className="label hero-eyebrow hero-line hero-line-1" style={{ marginBottom: '1.75rem' }}>Infinite Game OS</p>
          <h1
            data-sky-center
            className="hero-line hero-line-2"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.035em',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            <SkyWord>Play</SkyWord> a longer game.
          </h1>
          <p
            className="hero-line hero-line-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-muted)',
              maxWidth: '52ch',
              margin: '0 auto 2.75rem',
              lineHeight: 1.7,
            }}
          >
            A practitioner-first knowledge base and library for the Infinite Game. Concepts to think with, skills to install, bundles to run. Built for entrepreneurs, solopreneurs and creators on a long arc.
          </p>
          <div
            className="hero-line hero-line-4"
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/skills" className="btn-accent">Explore the Library</Link>
            <Link href="/concepts" className="btn-soft-accent">Read the Concepts</Link>
          </div>
        </div>
      </section>

      {/* 1a. Three reframes, each a door (Web of Intrigue). The install lines
          moved down into "Skills to install". */}
      {reframes.length > 0 && (
        <section className="section" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
          <div className="fan-sp" data-art="" aria-hidden="true" />
          <div
            className="reframes"
            data-c="reframes"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {reframes.map(({ question, dest }, i) => (
              <SectionReveal key={dest.href} delay={i * 60}>
                <ThreadLink
                  href={dest.href}
                  event="thread_card"
                  from="/"
                  slot="reframe"
                  anchor="reframe-card"
                  className="card thread"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxSizing: 'border-box',
                    textDecoration: 'none',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      lineHeight: 1.35,
                      color: 'var(--color-text)',
                      margin: '0 0 1rem',
                    }}
                  >
                    {question}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: 'var(--color-accent)',
                      margin: 'auto 0 0',
                    }}
                  >
                    <span aria-hidden style={{ marginRight: '0.5rem' }}>→</span>
                    {dest.title}
                  </p>
                </ThreadLink>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* 2. Thin philosophy beat */}
      <JunctionRule />
      <section className="section" data-c="orient">
        <PhoneOrbit />
        <SectionReveal>
          <div style={{ maxWidth: '720px' }}>
            <p className="label" style={{ marginBottom: '0.75rem' }}>The orientation</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem', maxWidth: '24ch' }}>
              Built on the <SkyWord>Infinite Game</SkyWord> and the Accord.
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

      {/* 3. The thinking: featured Concepts */}
      <JunctionRule />
      <section className="section" data-c="thinking" style={{ paddingTop: '1rem' }}>
        <SectionReveal>
          <div data-c="thinking-head" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The thinking</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', maxWidth: '32ch' }}>
                Concepts to <SkyWord>think</SkyWord> with.
              </h2>
            </div>
            <Link href="/concepts" className="link-more" data-c="thinking-link">
              Browse all concepts →
            </Link>
          </div>
        </SectionReveal>
        <div data-c="thinking-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {homeFeaturedConcepts.map((mod, i) => (
            <SectionReveal key={mod.href} delay={i * 60}>
              <FeaturedCard mod={mod} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* 4. The doing: featured Skills + Bundles */}
      <div className="sec" data-c="doing">
      <div className="sheetband" data-art="" aria-hidden="true" />
      <JunctionRule />
      <section className="section" style={{ paddingTop: '1rem' }}>
        <SectionReveal>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The doing</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', maxWidth: '32ch' }}>
                Skills to <SkyWord>install</SkyWord>. Bundles to run.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link href="/skills" className="link-more">
                Browse all skills →
              </Link>
              <Link href="/bundles" className="link-more">
                Browse all bundles →
              </Link>
            </div>
          </div>
        </SectionReveal>

        {/* The free Charter door, before the skills. King-approved 2026-09-29. */}
        <SectionReveal>
          <div data-c="charter" style={{ marginBottom: '3rem' }}>
            <CharterCallout marginTop="0" bar="none" ring body="Start before the first skill. Your AI’s Charter is a free CLAUDE.md for how Claude works with you: what it runs on its own, what it asks you first and how it acts in your name." />
          </div>
        </SectionReveal>

        {/* The install lines, moved here from under the hero. The row also holds
            the dimension lines and the chip (decorative, desktop chip only). */}
        <div className="installrow" data-c="installrow">
        <SectionReveal>
          <div className="action-card" style={{ padding: '1.75rem', maxWidth: '640px', marginBottom: '3rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-muted)',
                marginBottom: '1rem',
              }}
            >
              Already running Claude Code? Install a skill straight from your terminal.
            </p>
            <pre
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '1rem',
                borderRadius: '6px',
                overflowX: 'auto',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}
            >
              <code>
{`/plugin marketplace add https://www.infinitegameos.io/marketplace.json
/plugin install <skill-name>@igos-library`}
              </code>
            </pre>
            <Link href="/skills" className="link-more" style={{ marginTop: '1rem' }}>
              Browse the library →
            </Link>
          </div>
        </SectionReveal>
        <div className="dimh" data-art="" aria-hidden="true" />
        <div className="dimv" data-art="" aria-hidden="true" />
        <ChipArt />
        </div>

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
      </div>

      {/* 5. The foundation */}
      <JunctionRule />
      <SectionReveal>
        <section className="band" data-c="foundation">
          <div className="row">
            <div style={{ maxWidth: '52ch' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The foundation</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.7 }}>
                Before concepts and skills, there is a workspace. The Sovereign Ecosystem is the foundational template. Directory structure, governance scaffolding, first skill set. Free and open. The starting conditions for a sovereign AI practice.
              </p>
            </div>
            <Link href="/sovereign-ecosystem" className="btn-soft-accent">Get the template</Link>
          </div>
        </section>
      </SectionReveal>

      {/* 6. The Creator beat */}
      <SectionReveal>
        <section className="horizon" data-c="horizon">
          <i className="hz-line t" data-art="" aria-hidden="true" />
          <i className="hz-line b" data-art="" aria-hidden="true" />
          <i className="hz-glow t" data-art="" aria-hidden="true" />
          <i className="hz-glow b" data-art="" aria-hidden="true" />
          <div className="in">
            <p className="label" style={{ marginBottom: '0.75rem' }}>The invitation</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.5rem', maxWidth: '28ch', lineHeight: 1.2 }}>
              Be yourself. Build the <SkyWord>life</SkyWord>. Let the structure receive on your behalf.
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
        <>
        <JunctionRule />
        <section className="section" data-c="dispatches">
          <SectionReveal>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <p className="label" style={{ marginBottom: '0.75rem' }}>From inside the practice</p>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', maxWidth: '32ch' }}>
                  Recent dispatches.
                </h2>
              </div>
              <Link href="/updates" className="link-more">
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
                      {new Date(update.date + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{update.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>{update.summary}</p>
                  </article>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </section>
        </>
      )}

      {/* The updates letter, after the dispatches; its bar replaces the Charter bar. */}
      <JunctionRule />
      <section className="section" data-c="letter" style={{ paddingTop: '1rem' }}>
        <UpdatesLetter />
      </section>

      {/* 7. Practitioner */}
      <JunctionRule />
      <SectionReveal>
        <section className="band pract" data-c="practitioner">
          <div className="row">
            <div style={{ maxWidth: '52ch' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>The practitioner</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.7 }}>{igosBio}</p>
            </div>
            <Link href="/about" className="btn-outline">About Lane</Link>
          </div>
        </section>
      </SectionReveal>
      <JunctionRule flip />
    </>
  )
}
