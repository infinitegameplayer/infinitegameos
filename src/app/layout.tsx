import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PostHogProvider } from './providers'
import { PostHogPageView } from './PostHogPageView'
import { CrossSiteLinkTracker } from '@/components/CrossSiteLinkTracker'
import { UmamiAnalytics } from '@/components/UmamiAnalytics'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Infinite Game OS | Philosophy, Creatorship, Sovereign Life',
    template: '%s | Infinite Game OS',
  },
  description:
    'Infinite Game OS is a structured knowledge base for practitioners playing the long game. Concepts, skills and frameworks for sovereign creative life. Built by Lane Belone from inside the practice.',
  metadataBase: new URL('https://www.infinitegameos.io'),
  alternates: {
    types: {
      'application/rss+xml': 'https://www.infinitegameos.io/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Infinite Game OS',
    description:
      'A structured knowledge base for practitioners of Infinite Game philosophy and sovereign creative life. Concepts, skills and frameworks for the long arc.',
    url: 'https://www.infinitegameos.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Game OS',
    description:
      'Philosophy, frameworks and systems for the long game. Built for practitioners.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
  },
  icons: {
    icon: '/images/sqhq-logo-white.png',
    apple: '/images/sqhq-logo-white.png',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.infinitegameos.io/#website',
  name: 'Infinite Game OS',
  url: 'https://www.infinitegameos.io',
  description:
    'A structured knowledge base for Infinite Game philosophy, sovereign creative life and long-horizon practice. Structured for AI-agent discoverability.',
  author: {
    '@id': 'https://infinitegameos.io/#person',
  },
  sameAs: [
    'https://lanebelone.com',
    'https://sidequesthq.co',
    'https://github.com/InfiniteGamePlayer',
  ],
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://infinitegameos.io/#person',
  name: 'Lane Belone',
  url: 'https://lanebelone.com',
  image: 'https://www.lanebelone.com/images/lane-machu-picchu-square.webp',
  jobTitle: 'Infinite Game practitioner, sovereign life design coach, agentic systems architect',
  knowsAbout: [
    'Infinite Game philosophy',
    'Sovereign creative operating systems',
    'Agentic systems and architecture',
    'Post Web and Generative Engine Optimization',
    'Sovereign life design',
    'Long-term thinking frameworks',
    'Creative leadership',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'U.S. Army Special Forces',
    sameAs: 'https://en.wikipedia.org/wiki/United_States_Army_Special_Forces',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Special Forces Qualification (Green Beret)',
    credentialCategory: 'military qualification',
  },
  sameAs: [
    'https://www.wikidata.org/wiki/Q139889543',
    'https://lanebelone.com',
    'https://sidequesthq.co',
    'https://www.linkedin.com/in/lanebelone/',
    'https://www.instagram.com/increasefreedom/',
    'https://lanebelone.substack.com/',
    'https://github.com/InfiniteGamePlayer',
    'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=11686488',
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.infinitegameos.io/#organization',
  name: 'Infinite Game OS',
  url: 'https://www.infinitegameos.io',
  founder: { '@id': 'https://infinitegameos.io/#person' },
  sameAs: [
    'https://www.wikidata.org/wiki/Q139936059',
    'https://www.lanebelone.com',
    'https://sidequesthq.co',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${GeistSans.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <PostHogProvider>
        <body suppressHydrationWarning>
          <Suspense>
            <PostHogPageView />
          </Suspense>
          <CrossSiteLinkTracker />
          <UmamiAnalytics />
          <Nav />
          <main>{children}</main>
          <Footer />
        </body>
      </PostHogProvider>
    </html>
  )
}
