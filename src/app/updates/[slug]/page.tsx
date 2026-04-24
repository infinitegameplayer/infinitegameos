import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import SectionReveal from '@/components/SectionReveal'
import { getAllUpdates, getUpdate } from '@/lib/updates'

export function generateStaticParams() {
  return getAllUpdates().map(u => ({ slug: u.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const update = getUpdate(slug)
  if (!update) return {}
  return {
    title: `${update.title} — Infinite Game OS`,
    description: update.summary,
  }
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const update = getUpdate(slug)
  if (!update) return notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Updates',
        item: 'https://www.infinitegameos.io/updates',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: update.title,
        item: `https://www.infinitegameos.io/updates/${update.slug}`,
      },
    ],
  }

  const dateLabel = new Date(update.date + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

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
              {dateLabel}
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                maxWidth: '28ch',
                marginBottom: '1.5rem',
              }}
            >
              {update.title}
            </h1>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '0' }}>
          <div className="prose">
            <SectionReveal>
              <MDXRemote source={update.content} />
            </SectionReveal>
          </div>

          <SectionReveal delay={100}>
            <div
              style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link href="/updates" className="btn-outline">
                All Updates
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
