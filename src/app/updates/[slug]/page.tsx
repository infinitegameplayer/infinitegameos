import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import SectionReveal from '@/components/SectionReveal'
import SubscribeForm from '@/components/SubscribeForm'
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
    title: update.seoTitle ? { absolute: update.seoTitle } : update.title,
    description: update.summary,
    openGraph: {
      title: update.seoTitle ?? update.title,
      url: `https://www.infinitegameos.io/updates/${slug}`,
    },
    alternates: {
      canonical: `https://www.infinitegameos.io/updates/${slug}`,
    },
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: update.title,
    description: update.summary,
    datePublished: `${update.date}T00:00:00Z`,
    author: { '@id': 'https://infinitegameos.io/#person' },
    publisher: { '@id': 'https://www.infinitegameos.io/#website' },
    url: `https://www.infinitegameos.io/updates/${update.slug}`,
    mainEntityOfPage: `https://www.infinitegameos.io/updates/${update.slug}`,
    inLanguage: 'en-US',
    license: 'https://creativecommons.org/licenses/by/4.0/',
  }

  const faqSchema =
    update.faq && update.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: update.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null

  const schemas = faqSchema
    ? [breadcrumbSchema, articleSchema, faqSchema]
    : [breadcrumbSchema, articleSchema]

  const dateLabel = new Date(update.date + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
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

          {update.faq && update.faq.length > 0 && (
            <SectionReveal delay={60}>
              <div className="prose" style={{ marginTop: '2rem' }}>
                <h2>Frequently Asked Questions</h2>
                {update.faq.map((item, i) => (
                  <div key={i}>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          )}

          <SectionReveal delay={80}>
            <SubscribeForm />
          </SectionReveal>

          <SectionReveal delay={140}>
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
