import type { Metadata } from 'next'

// Privacy for infinitegameos.io. King-directed 2026-09-29 with the Charter
// build: the site collected emails for its Updates list with no privacy page,
// and the Charter signup now passes an email to Side Quest HQ. Every line here
// is checked against the code that does the thing: igos-subscribe,
// charter-signup, instrumentation-client.ts, UmamiAnalytics and no-track.ts.
// Outward, the Side Quest HQ list is the Side Quest Letter (King-ruled).

const URL = 'https://www.infinitegameos.io/privacy'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What infinitegameos.io collects, why and where it goes: the Updates list, the Your AI’s Charter signup and site analytics.',
  alternates: { canonical: URL },
}

const sections = [
  {
    h: 'Infinite Game OS updates',
    p: [
      'When you subscribe to updates, we collect your email address and, if you give it, your first name. They are stored in our own database and with Resend, the service that sends the emails. You get a welcome email, then updates as they ship.',
    ],
  },
  {
    h: 'Your AI’s Charter',
    p: [
      'The signup on the Charter page sends your email address and first name to Side Quest HQ, Lane Belone’s business. Side Quest HQ sends you the file, the companion guide, three short follow-up emails, every new version of the file and the Side Quest Letter. From there, the Side Quest HQ privacy policy at sidequesthq.co/privacy applies.',
    ],
  },
  {
    h: 'Analytics',
    p: [
      'This site uses Umami and PostHog to understand how people find and use it: pages viewed, clicks and, in PostHog, recordings of how a page is used, with everything typed into a form masked. PostHog keeps an identifier in your browser. Umami sets no cookies.',
      'When you sign up for updates or for the Charter, your email is linked to your analytics activity, so we can see which pages lead to a signup. Neither tool runs on the email preferences page.',
    ],
  },
  {
    h: 'Leaving',
    p: [
      'Every email carries an unsubscribe link, and the preferences page lets you choose what you receive. To have your details removed entirely, write to the address below.',
    ],
  },
  {
    h: 'We do not sell your data',
    p: ['Your information is never sold, rented or shared with anyone for their marketing.'],
  },
]

export default function PrivacyPage() {
  return (
    <article style={{ paddingTop: '7rem' }}>
      <div className="section">
        <div className="prose">
          <p className="label" style={{ marginBottom: '1rem' }}>
            Privacy
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Privacy</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>Effective date: September 2026</p>
          {sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </section>
          ))}
          <h2>Contact</h2>
          <p>
            Questions about this page or your data go to{' '}
            <a href="mailto:play@infinitegameos.io">play@infinitegameos.io</a>.
          </p>
        </div>
      </div>
    </article>
  )
}
