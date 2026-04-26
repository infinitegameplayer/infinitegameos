import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { igosBio, igosMods } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Infinite Game OS | Play a longer game.',
  description: 'A structured knowledge base for practitioners of Infinite Game philosophy, agentic systems, and sovereign life design. Built AI-agent-first.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' }],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.5rem 5rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34, 211, 238, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '720px' }}>
          <p className="label hero-line hero-line-1" style={{ marginBottom: '1.5rem' }}>Infinite Game OS</p>
          <h1 className="hero-line hero-line-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.1 }}>Play a longer game.</h1>
          <p className="hero-line hero-line-3" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--color-muted)', maxWidth: '52ch', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>A structured knowledge base for practitioners of Infinite Game philosophy, agentic systems, and sovereign life design.</p>
          <div className="hero-line hero-line-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/the-os" className="btn-accent">Explore the OS</Link>
            <Link href="/agentic-systems" className="btn-outline">Agentic Systems</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <SectionReveal>
          <p className="label" style={{ marginBottom: '0.75rem' }}>Knowledge base</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '3rem', maxWidth: '40ch' }}>The modules of the OS</h2>
        </SectionReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {igosMods.map((mod, i) => (
            <SectionReveal key={mod.href} delay={i * 60}>
              <Link href={mod.href} style={{ display: 'block' }}>
                <article className="card">
                  <p className="label" style={{ marginBottom: '0.75rem' }}>{mod.label}</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{mod.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>{mod.description}</p>
                </article>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>
      <SectionReveal>
        <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
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
