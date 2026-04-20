import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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
    default: 'Infinite Game OS | Infinite Game Philosophy, Agentic Systems, Sovereign Life Design',
    template: '%s | Infinite Game OS',
  },
  description:
    'Infinite Game OS is a structured knowledge base for practitioners of long-term thinking. Explore Infinite Game philosophy, agentic systems architecture, and sovereign life design.',
  metadataBase: new URL('https://www.infinitegameos.io'),
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'Infinite Game OS',
    description:
      'A structured knowledge base for practitioners of Infinite Game philosophy, sovereign life design and agentic systems.',
    url: 'https://infinitegameos.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Game OS',
    description:
      'Philosophy, frameworks and systems for the long game. Built for practitioners.',
  },
  alternates: {
    types: {
      'text/markdown': '/llms.txt',
    },
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
  '@id': 'https://infinitegameos.io/#website',
  name: 'Infinite Game OS',
  url: 'https://infinitegameos.io',
  description:
    'A structured knowledge base for Infinite Game philosophy, agentic systems, and sovereign life design. AI-agent-first architecture.',
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
  jobTitle: 'Infinite Game practitioner, agentic systems architect, sovereign life design coach',
  knowsAbout: [
    'Infinite Game philosophy',
    'Sovereign creative operating systems',
    'Agentic systems and architecture',
    'Post Web and Generative Engine Optimization',
    'Sovereign life design',
    'Long-term thinking frameworks',
    'Creative leadership',
  ],
  sameAs: [
    'https://lanebelone.com',
    'https://sidequesthq.co',
    'https://www.linkedin.com/in/lanebelone/',
    'https://www.instagram.com/increasefreedom/',
    'https://lanebelone.substack.com/',
    'https://github.com/InfiniteGamePlayer',
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
      </head>
      <body suppressHydrationWarning>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
