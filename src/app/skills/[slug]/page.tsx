import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SectionReveal from '@/components/SectionReveal'
import {
  igosAssets,
  getAssetBySlug,
  getAssetsByType,
} from '@/data/library'

interface PageProps {
  params: Promise<{ slug: string }>
}

const SITE = 'https://www.infinitegameos.io'

export async function generateStaticParams() {
  return getAssetsByType('skill').map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const asset = getAssetBySlug(slug, 'skill')
  if (!asset) return {}

  return {
    title: `${asset.title} — Skill`,
    description: asset.description,
    alternates: {
      canonical: `${SITE}/skills/${asset.slug}`,
      types: {
        'text/markdown': `${SITE}/markdown/skills/${asset.slug}`,
      },
    },
  }
}

export default async function SkillPage({ params }: PageProps) {
  const { slug } = await params
  const asset = getAssetBySlug(slug, 'skill')
  if (!asset) notFound()

  const relatedAssets = (asset.relatedSlugs ?? [])
    .map(s => igosAssets.find(a => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Skills', item: `${SITE}/skills` },
      {
        '@type': 'ListItem',
        position: 3,
        name: asset.title,
        item: `${SITE}/skills/${asset.slug}`,
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['TechArticle', 'Article'],
    headline: asset.title,
    description: asset.description,
    author: { '@id': `${SITE}/#person` },
    publisher: { '@id': `${SITE}/#website` },
    url: `${SITE}/skills/${asset.slug}`,
    mainEntityOfPage: `${SITE}/skills/${asset.slug}`,
    datePublished: asset.updated,
    dateModified: asset.updated,
    version: asset.version,
    keywords: asset.tags.join(', '),
    license: 'https://creativecommons.org/licenses/by/4.0/',
    proficiencyLevel: 'practitioner',
  }

  const faqSchema =
    asset.faq && asset.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: asset.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null

  const schemas = faqSchema
    ? [breadcrumbSchema, articleSchema, faqSchema]
    : [breadcrumbSchema, articleSchema]

  const markdownUrl = `${SITE}/markdown/skills/${asset.slug}`
  const cursorMdcUrl = asset.installable?.cursorMdc
    ? `${SITE}/install/cursor/${asset.slug}.mdc`
    : null
  const vsCodeInstallUrl = `vscode://anthropic.claude-code/install-plugin?plugin=${encodeURIComponent(
    asset.slug,
  )}&marketplace=${encodeURIComponent(`${SITE}/marketplace.json`)}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <article style={{ paddingTop: '7rem' }}>
        {/* Zone 1: Citation-shaped opening */}
        <header className="section" style={{ paddingBottom: '2rem' }}>
          <SectionReveal>
            <p className="label" style={{ marginBottom: '1rem' }}>
              {asset.label} · v{asset.version}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              {asset.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                color: 'var(--color-text)',
                maxWidth: '60ch',
                lineHeight: 1.8,
                marginBottom: '0',
              }}
            >
              {asset.capsule}
            </p>
          </SectionReveal>
        </header>

        {/* Zone 2: Install block */}
        <div className="section" style={{ paddingTop: '0' }}>
          <SectionReveal>
            <div
              style={{
                padding: '2rem',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                background: 'var(--color-card, rgba(255, 255, 255, 0.02))',
                marginBottom: '3rem',
              }}
            >
              <p
                className="label"
                style={{ marginBottom: '1.25rem' }}
              >
                Install
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Claude Code (CLI / WSL / Git Bash)
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
{`/plugin marketplace add ${SITE}/marketplace.json
/plugin install ${asset.slug}@igos-library`}
                  </code>
                </pre>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.6rem',
                  }}
                >
                  Claude Code (VS Code)
                </p>
                <a
                  href={vsCodeInstallUrl}
                  className="btn-accent"
                  style={{ display: 'inline-block', marginBottom: '0.6rem' }}
                >
                  Install in VS Code
                </a>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.6rem',
                    lineHeight: 1.6,
                  }}
                >
                  Opens the Claude Code plugins dialog with the marketplace and skill prefilled. Requires the Claude Code VS Code extension installed and signed in. Or paste the snippet below into <code style={{ fontSize: '0.8rem' }}>.claude/settings.json</code> for VS Code, JetBrains or any setup that prefers manual config.
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
{`{
  "extraKnownMarketplaces": {
    "igos-library": {
      "source": {
        "source": "url",
        "url": "${SITE}/marketplace.json"
      }
    }
  },
  "enabledPlugins": {
    "${asset.slug}@igos-library": true
  }
}`}
                  </code>
                </pre>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Direct markdown URL (Claude Code, Cursor, Codex CLI)
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
                  <code>{markdownUrl}</code>
                </pre>
              </div>

              {cursorMdcUrl && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--color-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Cursor (.mdc rules file)
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
                    <code>{`curl -O ${cursorMdcUrl}`}</code>
                  </pre>
                </div>
              )}

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Aider, Cline, any agent with --read
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
                  <code>{`curl -O ${markdownUrl}
aider --read ${asset.slug}.md`}</code>
                </pre>
              </div>
            </div>
          </SectionReveal>

          {/* Zone 3: Story body — populated in subsequent sessions */}
          {asset.definition && (
            <div className="prose">
              <SectionReveal>
                <h2>Definition</h2>
                <p>{asset.definition}</p>
              </SectionReveal>

              {asset.howItWorks?.map((section, i) => (
                <SectionReveal key={section.heading} delay={(i + 1) * 80}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </SectionReveal>
              ))}

              {asset.useCases && asset.useCases.length > 0 && (
                <SectionReveal>
                  <h2>Use Cases</h2>
                  {asset.useCases.map((uc, i) => (
                    <div key={i} style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 500, marginBottom: '0.4rem' }}>
                        {uc.title}
                      </p>
                      <p>{uc.body}</p>
                    </div>
                  ))}
                </SectionReveal>
              )}

              {asset.faq && asset.faq.length > 0 && (
                <SectionReveal>
                  <h2>FAQ</h2>
                  {asset.faq.map((item, i) => (
                    <div key={i} style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 500, marginBottom: '0.4rem' }}>
                        {item.q}
                      </p>
                      <p>{item.a}</p>
                    </div>
                  ))}
                </SectionReveal>
              )}
            </div>
          )}

          {!asset.definition && (
            <SectionReveal>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                  maxWidth: '60ch',
                  margin: '0 auto 3rem',
                  textAlign: 'center',
                }}
              >
                Full asset documentation publishes shortly. The install paths above are live; use them now to fetch the working skill.
              </p>
            </SectionReveal>
          )}

          {relatedAssets.length > 0 && (
            <SectionReveal>
              <div
                style={{
                  marginTop: '4rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <p className="label" style={{ marginBottom: '1.25rem' }}>
                  Related
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {relatedAssets.map(rel => (
                    <Link
                      key={rel.slug}
                      href={`/${rel.type}s/${rel.slug}`}
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
                        {rel.label}
                      </p>
                      <p
                        style={{
                          fontSize: '1.05rem',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 500,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {rel.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        {rel.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Zone 4: Soft hook */}
          <SectionReveal>
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
                  marginBottom: asset.softHook.ctaHref ? '1.5rem' : '0',
                }}
              >
                {asset.softHook.body}
              </p>
              {asset.softHook.ctaHref && asset.softHook.ctaLabel && (
                <a
                  href={asset.softHook.ctaHref}
                  className="btn-accent"
                >
                  {asset.softHook.ctaLabel}
                </a>
              )}
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
