import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { designYourDayFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: { absolute: 'Design a day around what you actually want' },
  description:
    'Designing a day around what you actually want starts with a different question than most planning methods ask. Build a day from desire, energy and identity rather than goals and output.',
  openGraph: {
    type: 'website',
    siteName: 'Infinite Game OS',
    locale: 'en_US',
    title: 'How to design a day around what you actually want',
    description:
      'Designing a day around what you actually want starts with a different question than most planning methods ask. Build a day from desire, energy and identity rather than goals and output.',
    url: 'https://www.infinitegameos.io/design-your-day',
  },
  alternates: {
    canonical: 'https://www.infinitegameos.io/design-your-day',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: designYourDayFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to design a day around what you actually want',
  description:
    'Designing a day around what you actually want starts with a different question than most planning methods ask. Build a day from desire, energy and identity rather than goals and output.',
  author: { '@id': 'https://infinitegameos.io/#person' },
  publisher: { '@id': 'https://www.infinitegameos.io/#website' },
  url: 'https://www.infinitegameos.io/design-your-day',
  mainEntityOfPage: 'https://www.infinitegameos.io/design-your-day',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.infinitegameos.io' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Design Your Day',
      item: 'https://www.infinitegameos.io/design-your-day',
    },
  ],
}

export default function DesignYourDayPage() {
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
              Day Design
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '24ch',
                marginBottom: '1.5rem',
              }}
            >
              How to design a day around what you actually want
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                color: 'var(--color-text)',
                maxWidth: '60ch',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              Designing a day around what you actually want begins with a different
              question than most planning methods ask. The question is not what should I
              accomplish today, but what kind of person does this day let me become. When
              a day is built from desire, energy and identity rather than output and
              goals, it becomes an expression of who you are rather than a report card
              for what you produced.
            </p>
          </SectionReveal>
        </header>

        <div className="section" style={{ paddingTop: '1rem' }}>
          <div className="prose">
            <SectionReveal>
              <h2>The wrong question</h2>
              <p>
                Most day design frameworks start in the same place: what needs to get
                done. The calendar fills. The list grows. The day measures itself in
                completions, and the person inside the day becomes secondary to the
                schedule.
              </p>
              <p>
                The wrong question is &ldquo;how do I fit everything in.&rdquo; The right
                question is &ldquo;what does a day feel like when I am most alive in
                it.&rdquo; These two questions produce different architectures.
              </p>
              <p>
                A day designed around achievement asks the person to serve the plan. A
                day designed around desire asks the plan to serve the person. The
                inversion is structural, not cosmetic. It changes what goes on the
                calendar first.
              </p>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2>Three drivers of a day designed from desire</h2>
              <p>
                Desire is the first driver. Not want in the shallow sense, but the
                quality of aliveness a person feels when the day is going the way it
                should. Desire points toward the activities, rhythms and environments
                that create that quality. It is a navigation tool.
              </p>
              <p>
                Energy is the second driver. Every person has a natural arc of high and
                low energy across a day. A day designed from desire places the most
                identity-aligned work inside the energy windows that can hold it.
                Fighting the arc is a form of achievement orientation. Designing with
                the arc is a form of sovereignty.
              </p>
              <p>
                Identity is the third driver. The question beneath all day design is:
                who am I becoming through this day. The Infinite Game frames this as the
                game that has no finish line, only a direction of growth. A desire-based
                day is one where each block of time can be traced back to an answer to
                that question.
              </p>
            </SectionReveal>

            <SectionReveal delay={140}>
              <h2>Three daily archetypes for different seasons</h2>
              <p>
                Not every day has the same purpose. A useful frame is three archetypes:
                the Creation day, the Connection day and the Restoration day. Each has a
                different dominant driver and a different measure of success.
              </p>
              <p>
                A Creation day centers the energy on making something. The measure is
                not output volume but depth of presence during the making. A Connection
                day centers the energy on relationships, conversations and
                collaboration. The measure is quality of contact, not number of
                meetings. A Restoration day centers the energy on renewal. The measure
                is how much more alive the person feels at the end than at the
                beginning.
              </p>
              <p>
                The Ideal Month concept within the Infinite Game describes how these
                archetypes can be distributed across a month based on desire and season
                rather than external demand. A person who names their archetype for the
                day before it begins is less likely to spend a Restoration day
                apologizing for not producing.
              </p>
            </SectionReveal>

            <SectionReveal delay={180}>
              <h2>Reducing structure to increase aliveness</h2>
              <p>
                There is a threshold beyond which more structure reduces aliveness
                rather than supporting it. A person who has every hour accounted for
                has no room to follow the current of what is actually alive in them.
                The schedule becomes a script. Aliveness requires improvisation.
              </p>
              <p>
                Reducing structure does not mean removing intention. It means leaving
                room inside the intention. A half-day with no appointments is not
                wasted. It is a container in which Aliveness can move. Playgrounds of
                Exploration, a concept in the Infinite Game, names the practice of
                building these open containers deliberately, as features of the design.
              </p>
              <p>
                A practical move is to identify one block per day that belongs entirely
                to what feels alive in that moment. Not productive. Not scheduled.
                Alive. That block is not a reward for completing the rest. It is the
                design principle that keeps the rest from becoming a cage.
              </p>
            </SectionReveal>

            <SectionReveal delay={220}>
              <h2>From achievement-centered to values-centered</h2>
              <p>
                An achievement-centered day has a success condition baked in: complete
                the list, hit the number, finish before the deadline. When the day
                ends, it passes or fails. The person inside the day is measured by the
                same standard.
              </p>
              <p>
                A values-centered day has a different success condition: did this day
                reflect who I am. The shift from output to expression changes the
                emotional weight of the day. A values-centered day that produced little
                still counts as a success if it was lived in alignment with what the
                person cares about.
              </p>
              <p>
                Joyful Sovereignty is the phrase the Infinite Game uses for this
                orientation. It names the choice to let alive energy move through the
                day rather than suppress it in service of a scorecard. The move from
                achievement-centered to values-centered is a different relationship
                with the question of what a good day means.
              </p>
            </SectionReveal>

            <SectionReveal delay={260}>
              <h2>Questions on designing your day</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {designYourDayFaqs.map((item) => (
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
            </SectionReveal>

            <SectionReveal delay={300}>
              <p
                style={{
                  marginTop: '3rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  fontStyle: 'italic',
                }}
              >
                This page deepens over time as the Infinite Game maps more of the
                territory between the day you have been designing and the day that is
                actually yours.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={320}>
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/concepts/ideal-month" className="btn-accent">
                Ideal Month
              </Link>
              <Link href="/concepts/playgrounds-of-exploration" className="btn-outline">
                Playgrounds of Exploration
              </Link>
            </div>
          </SectionReveal>
        </div>
      </article>
    </>
  )
}
