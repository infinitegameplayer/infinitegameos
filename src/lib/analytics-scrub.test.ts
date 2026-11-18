import { describe, it, expect } from 'vitest'
import { redactPrivateParams, carriesPrivateParams, scrubAnalyticsEvent } from './no-track'

// A paid Checkout session_id, a signed token, its expiry and a visitor's email
// can ride in a page address. PostHog stamps the full address on every event it
// sends, not only the pageview, so the shared before_send filter redacts their
// values wherever they appear (sidequesthq Security Posture Ledger, 2026-11-18).
// Mirror of the lanebelone and IGOS copies. Keep byte-identical.

describe('redactPrivateParams', () => {
  it('redacts a session_id and keeps the attribution params', () => {
    expect(redactPrivateParams('https://www.example.org/products/a/success?session_id=cs_live_secret&utm_source=letter')).toBe(
      'https://www.example.org/products/a/success?session_id=redacted&utm_source=letter'
    )
  })

  it('redacts token, email and exp wherever they sit in the query', () => {
    expect(redactPrivateParams('/rate?email=buyer%40example.com&stars=5&token=abc123&exp=1799999999')).toBe(
      '/rate?email=redacted&stars=5&token=redacted&exp=redacted'
    )
  })

  it('redacts inside an autocaptured element chain', () => {
    expect(redactPrivateParams('a:href="/api/download?session_id=cs_live_secret"nth-child="1"')).toBe(
      'a:href="/api/download?session_id=redacted"nth-child="1"'
    )
  })

  it('leaves look-alike names and plain addresses alone', () => {
    expect(redactPrivateParams('/x?mytoken=keep&session_idx=keep&ref=friend')).toBe('/x?mytoken=keep&session_idx=keep&ref=friend')
    expect(redactPrivateParams('https://www.example.org/about')).toBe('https://www.example.org/about')
  })
})

describe('carriesPrivateParams', () => {
  it('reads true for an address holding a credential and false otherwise', () => {
    expect(carriesPrivateParams('https://www.example.org/products/a/success?session_id=cs_1')).toBe(true)
    expect(carriesPrivateParams('https://www.example.org/products/a?utm_source=letter')).toBe(false)
    // asked twice in a row: a stateful pattern would answer the second call wrongly
    expect(carriesPrivateParams('https://www.example.org/x?token=t')).toBe(true)
    expect(carriesPrivateParams('https://www.example.org/x?token=t')).toBe(true)
  })
})

describe('scrubAnalyticsEvent', () => {
  it('redacts every address on the event, person properties included', () => {
    const secret = 'cs_live_secret'
    const out = scrubAnalyticsEvent({
      event: 'product_page_view',
      properties: {
        $current_url: `https://www.example.org/products/a/success?session_id=${secret}`,
        $referrer: `https://www.example.org/x?token=${secret}`,
        $elements_chain: `a:href="/api/download?session_id=${secret}"`,
        $set_once: { $initial_current_url: `https://www.example.org/?email=${secret}` },
        product: 'a',
        price: 37,
      },
    })
    expect(JSON.stringify(out)).not.toContain(secret)
    expect(out?.properties?.product).toBe('a')
    expect(out?.properties?.price).toBe(37)
  })

  // posthog-js files heatmap points under the page's full address as an object
  // key ($heatmap_data: { [href]: points }), so keys are redacted too. Before
  // this case, $$heatmap events carried the credential past the filter (live
  // probe, 2026-11-18).
  it('redacts a credential in an object key and keeps what is filed under it', () => {
    const secret = 'cs_live_secret'
    const out = scrubAnalyticsEvent({
      event: '$$heatmap',
      properties: { $heatmap_data: { [`https://www.example.org/x?session_id=${secret}&utm_source=letter`]: [{ x: 1, y: 2 }] } },
    })
    expect(JSON.stringify(out)).not.toContain(secret)
    const data = out?.properties?.$heatmap_data as Record<string, unknown>
    expect(data['https://www.example.org/x?session_id=redacted&utm_source=letter']).toEqual([{ x: 1, y: 2 }])
  })

  it('keeps a Date timestamp a Date and a null property null', () => {
    const timestamp = new Date('2026-11-18T12:00:00Z')
    const out = scrubAnalyticsEvent({ event: '$pageleave', timestamp, properties: { $current_url: '/x?token=t', $set: null } })
    expect(out?.timestamp).toBeInstanceOf(Date)
    expect((out?.timestamp as Date).getTime()).toBe(timestamp.getTime())
    expect(out?.properties?.$set).toBeNull()
  })

  it('passes a dropped event through as null', () => {
    expect(scrubAnalyticsEvent(null)).toBeNull()
  })

  it('leaves a session replay batch untouched, since replay is off for a visit that loads with a credential', () => {
    const snapshot = { event: '$snapshot', properties: { $snapshot_data: [{ data: { href: 'https://www.example.org/' } }] } }
    expect(scrubAnalyticsEvent(snapshot)).toBe(snapshot)
  })
})
