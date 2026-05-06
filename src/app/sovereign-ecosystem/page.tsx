import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { sovereignEcosystemFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Sovereign Ecosystem. Foundational Obsidian + Claude Code Template',
  description:
    'The Sovereign Ecosystem is a foundational Obsidian + Claude Code workspace template. Directory structure, governance scaffolding, North Star template and an initial skill set. The three-tier stack origin for sovereign-first AI practitioners.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Sovereign Ecosystem. Foundational Obsidian + Claude Code Template',
    description:
      'The Sovereign Ecosystem is a foundational Obsidian + Claude Code workspace template. Directory structure, governance scaffolding, North Star template and an initial skill set. The three-tier stack origin for sovereign-first AI practitioners.',
    url: 'https://www.infinitegameos.io/sovereign-ecosystem',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/sovereign-ecosystem',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: sovereignEcosystemFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sovereign Ecosystem. Foundational Obsidian + Claude Code Template',
  description:
    'The Sovereign Ecosystem is a foundational Obsidian + Claude Code workspace template. Directory structure, governance scaffolding, North Star template and an initial skill set. The three-tier stack origin for sovereign-first AI practitioners.',
  author: { '@id': 'https://www.infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/sovereign-ecosystem',
  mainEntityOfPage: 'https://www.infinitegameos.io/sovereign-ecosystem',
  datePublished: '2026-05-05',
  dateModified: '2026-05-05',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Sovereign Ecosystem',
      item: 'https://www.infinitegameos.io/sovereign-ecosystem',
    },
  ],
}

export default function SovereignEcosystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article style={{ paddingTop: '7rem' }}>
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              Sovereign Ecosystem
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              The foundational workspace template
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
              A starting point for your sovereign Obsidian and Claude Code
              workspace. Directory structure, governance scaffolding and an
              initial skill set. Encouraged, not required.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>

          <SectionReveal>
            <div
              style={{
                marginBottom: '3rem',
                padding: '2rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                maxWidth: '56ch',
              }}
            >
              <p className="label" style={{ marginBottom: '1rem' }}>
                Get the template
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                }}
              >
                The foundational Obsidian and Claude Code workspace template.
                Download the ZIP or clone the repo. Your workspace, your terms.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <a
                  href="https://github.com/InfiniteGamePlayer/sovereign-ecosystem/archive/refs/heads/master.zip"
                  className="btn-accent"
                >
                  Download ZIP
                </a>
                <a
                  href="https://github.com/InfiniteGamePlayer/sovereign-ecosystem"
                  className="btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--color-muted)',
                  marginBottom: '0.5rem',
                }}
              >
                Or clone directly:
              </p>
              <pre
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.375rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  overflowX: 'auto',
                  margin: 0,
                }}
              >
                <code>git clone https://github.com/InfiniteGamePlayer/sovereign-ecosystem.git</code>
              </pre>
            </div>
          </SectionReveal>

          <div className="prose">
            <SectionReveal delay={60}>
              <h2>What it is</h2>
              <p>
                The Sovereign Ecosystem is a foundational template for an
                Obsidian and Claude Code workspace. It gives your sovereign
                setup its initial shape: the directory structure, the governance
                scaffolding, a North Star template and the initial skill set
                needed to get a vault running.
              </p>
              <p>
                It is not the system. It is the starting conditions. Every
                practitioner who uses it ends up somewhere different. The
                template is the bone structure. You bring the muscle.
              </p>
              <p>
                This is the three-tier stack origin. Named live in the May 2
                AI for Livin&apos; Workshop by an attendee mid-demo. Foundation,
                reader/editor, AI interface. Each layer swappable. The
                Sovereign Ecosystem is layer one.
              </p>
            </SectionReveal>

            <SectionReveal delay={100}>
              <h2>What it ships</h2>
              <ul>
                <li>
                  <strong>Council Chamber.</strong> Governance, codices, skills
                  and protocols. The structural core that keeps the workspace
                  coherent over time.
                </li>
                <li>
                  <strong>Library.</strong> A North Star template at
                  <code style={{ fontSize: '0.875em', marginLeft: '0.25rem' }}>Library/North Star.md</code>,
                  a transcripts folder and a references folder. The long-horizon
                  context layer.
                </li>
                <li>
                  <strong>Inbox.</strong> The capture surface. Raw input lands
                  here before it gets organized. The daily funnel.
                </li>
                <li>
                  <strong>Sovereign Command and To-Do Dock.</strong> The live
                  signal surface for what is active right now and the daily
                  capture surface for the small stuff.
                </li>
                <li>
                  <strong>Initial skill set.</strong> The governance skills
                  needed to get the vault operational. The cool extras have
                  graduated. They live on this site as installable skills and
                  bundles, built out to a level no foundational template needs
                  to carry.
                </li>
              </ul>
              <p>
                At v2.4.0, the repo trimmed to foundational only. Source
                Harvest stayed as a dual-distribution surface. Everything else
                that grew beyond template scope shipped here instead.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>The three-tier stack</h2>
              <p>
                The stack has three layers. Each one is swappable.
              </p>
              <p>
                The Sovereign Ecosystem is the file structure and the templates.
                The opinionated foundation that gives the system its shape.
                Obsidian is the reader and editor. It turns those files into
                something you can navigate, search and annotate by hand.
                Claude Code, or Codex, or any future agentic interface, is the
                AI that can read, edit and restructure any of it on your
                instruction.
              </p>
              <p>
                One layer holds the structure. One translates the files for
                human navigation. One brings the AI intelligence. Swap any layer
                and the others survive. That durability comes from building on
                an open foundation instead of a closed platform.
              </p>
              <p>
                The full architectural case is at{' '}
                <Link href="/concepts/data-sovereignty">Data Sovereignty</Link>.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>The build sequence</h2>
              <p>
                The repo ships two guides as markdown files inside the
                workspace.
              </p>
              <p>
                The Quick Start Guide is the install foundation. It walks you
                from first software install through vault setup, AI adapter
                connection and first activation. Work top to bottom. Each
                section has an exit condition before you move on.
              </p>
              <p>
                The Build Sequence is the session-by-session guide. Ten
                sessions, each one adding a layer. Session 0 confirms your
                environment and locates your starting point. Session 1 builds
                the first working bridge between you, your files and your AI.
                Sessions 2 and 3 bring governance and the context layer online.
                Sessions 4 through 6 activate the operating loops and open the
                expansion layer with discernment. Sessions 7 through 9 bring
                the command surface live, align your North Star and run the
                first real capture loop. Session 9 closes when the daily loop
                proves itself with one real alive idea.
              </p>
              <p>
                Do not force the whole thing into one afternoon. Each session
                is meant to land before the next one begins.
              </p>
            </SectionReveal>

            <SectionReveal delay={220}>
              <h2>Source Harvest as a primary entry point</h2>
              <p>
                The{' '}
                <Link href="/skills/source-harvest">Source Harvest</Link>{' '}
                skill is built to harvest any external repo at source level.
                The Sovereign Ecosystem repo is a natural first target.
              </p>
              <p>
                Install the repo, then run a Source Harvest over it. The skill
                classifies each governance file, protocol, codex and skill
                against your existing setup. Adopt what fills a gap. Enrich
                what improves on what you already have. Defer what does not yet
                apply. Ignore what already lives in your system. The harvest
                turns the template into your template.
              </p>
              <p>
                Veterans who already have a vault do not need to start from the
                template. A Source Harvest of the repo gives them the same
                signal without the full install.
              </p>
            </SectionReveal>

            <SectionReveal delay={260}>
              <h2>The North Star</h2>
              <p>
                The repo ships a North Star template at{' '}
                <code>Library/North Star.md</code>. Fill it in once. Revisit
                it often. Once it lives in your system, the AI organizes
                day-to-day work around it and you stop carrying the trajectory
                in your head.
              </p>
              <p>
                The philosophy behind the North Star, what goes in it, how the
                Anti-Vision pairs with it, and why the quest framing matters
                more than task language, is covered in full at{' '}
                <Link href="/concepts/the-north-star">The North Star</Link>.
                The repo gives the practical scaffold. The concept page covers
                the reasoning.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={300}>
            <section style={{ marginTop: '4rem' }}>
              <p className="label" style={{ marginBottom: '1.5rem' }}>
                Common questions
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {sovereignEcosystemFaqs.map((item) => (
                  <div key={item.q} className="card">
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.q}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'rgba(226, 232, 240, 0.7)',
                        lineHeight: 1.65,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={340}>
            <section style={{ marginTop: '4rem', marginBottom: '4rem', maxWidth: '64ch' }}>
              <p className="label" style={{ marginBottom: '1.5rem' }}>From the field</p>
              <blockquote
                style={{
                  borderLeft: '2px solid var(--color-accent)',
                  paddingLeft: '1.5rem',
                  margin: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'rgba(226, 232, 240, 0.85)',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    marginBottom: '1rem',
                  }}
                >
                  &ldquo;Lane Belone built something I didn&apos;t know was possible. An AI interface that lives on my own computer, in my own files, in my own vault. Not in the cloud. Not on someone else&apos;s server. Mine. It knows me because I have taught it, and what I have taught it stays with me. What he has built is not an AI assistant. It is an AI companion &mdash; one that earns trust over time, that holds your story with discretion and intelligence. I am 62 years old. I have met a lot of people and used a lot of tools. I do not impress easily. Lane Belone impressed me.&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Frank A. &mdash; Sovereign Ecosystem Install
                </p>
              </blockquote>
            </section>
          </SectionReveal>

          <SectionReveal delay={360}>
            <div
              style={{
                marginTop: '4rem',
                padding: '2rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                maxWidth: '56ch',
              }}
            >
              <p className="label" style={{ marginBottom: '1rem' }}>
                Get the template
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                }}
              >
                Free and open. One download, your workspace, your terms. Using
                the Sovereign Ecosystem is encouraged. It is not required. If
                you already have a vault, a{' '}
                <Link href="/skills/source-harvest">Source Harvest</Link> of
                the repo gives you the same signal.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <a
                  href="https://github.com/InfiniteGamePlayer/sovereign-ecosystem/archive/refs/heads/master.zip"
                  className="btn-accent"
                >
                  Download ZIP
                </a>
                <a
                  href="https://github.com/InfiniteGamePlayer/sovereign-ecosystem"
                  className="btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse the source on GitHub
                </a>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={400}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/concepts/data-sovereignty" className="btn-accent">
                Data Sovereignty
              </Link>
              <Link href="/concepts/the-north-star" className="btn-outline">
                The North Star
              </Link>
              <Link href="/concepts/ai-second-brain" className="btn-outline">
                The AI Second Brain
              </Link>
              <Link href="/skills/source-harvest" className="btn-outline">
                Source Harvest
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
