import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Sovereign Life Design',
  description:
    'Sovereign life design is building a life with the intentionality of an operating system. Explore the philosophy, the Kingdom model, and creative sovereignty.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Sovereignty',
      item: 'https://infinitegameos.io/sovereignty',
    },
  ],
}

export default function SovereigntyPage() {
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
              Sovereignty
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              Sovereign life design
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
              What it looks like to build a life with the intentionality of an
              operating system. The Kingdom model, creative sovereignty, and
              long-horizon architecture.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <h2>What sovereign life design is</h2>
              <p>
                Sovereign life design is the practice of building a life that runs on
                your own principles rather than on the defaults of whatever culture,
                platform, or institution you happen to be inside.
              </p>
              <p>
                Most people inherit their operating systems. The school system gives them
                one model. The corporate ladder gives them another. Social media gives
                them a third. The sovereign practitioner steps back and asks: what game
                am I actually playing? What are the values, the systems, and the
                governance structures that should govern this life?
              </p>
              <p>
                The question is not how to optimize within the existing structure. The
                question is whether the structure itself serves the life you are trying to
                build.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>The Kingdom model</h2>
              <p>
                Lane&apos;s personal operating system is called the Kingdom. It is a
                sovereign creative operating system: a governance structure, a set of
                codices and protocols, a council of advisors (some human, some AI), and a
                knowledge management architecture built in Obsidian and managed through a
                network of AI agents.
              </p>
              <p>
                The Kingdom is not a productivity tool. It is a sovereignty structure. It
                manages relationships, projects, values, creative output, financial
                strategy, and the ongoing practice of living intentionally at a high
                level of coherence.
              </p>
              <p>
                The Sovereign Ecosystem GitHub repo is the technical public layer of
                this. Anyone can fork it and build their own version.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>Creative sovereignty</h2>
              <p>
                Creative sovereignty is the condition of making creative work from a
                place of genuine authority rather than compliance. Not making what the
                algorithm rewards. Not making what the market approves. Making what only
                you can make, from the deepest and clearest layer of your own vision.
              </p>
              <p>
                This does not mean ignoring the market or the audience. It means bringing
                your creative authority into contact with the world from a position of
                sovereignty rather than anxiety.
              </p>
              <p>
                The practitioners who are most findable in the Post Web era are the ones
                who have built this kind of creative sovereignty. Their vocabulary is
                consistent because their thinking is integrated. Their frameworks connect
                because they come from a coherent philosophical center, not from trend
                chasing.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                  marginTop: '2rem',
                }}
              >
                This section deepens over time as Lane documents the specific
                architecture and practice of the Kingdom model. Content grows
                bi-monthly.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={220}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/concepts/ideal-month" className="btn-accent">
                The Ideal Month
              </Link>
              <Link href="/concepts/joyful-sovereignty" className="btn-outline">
                Joyful Sovereignty
              </Link>
              <Link href="/playbooks" className="btn-outline">
                Playbooks
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
