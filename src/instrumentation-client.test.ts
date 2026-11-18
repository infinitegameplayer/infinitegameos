import { describe, it, expect, vi, afterEach } from 'vitest'

// The wiring of PostHog's credential filter and the replay switch, read from the
// options instrumentation-client.ts hands to posthog.init. The filter itself is
// tested in src/lib/analytics-scrub.test.ts. Mirror of the lanebelone and IGOS
// copies. Keep byte-identical.

const { init } = vi.hoisted(() => ({ init: vi.fn() }))
vi.mock('posthog-js', () => ({ default: { init } }))
vi.mock('botid/client/core', () => ({ initBotId: vi.fn() }))

async function initOptionsFor(href: string) {
  const url = new URL(href)
  vi.stubGlobal('window', { location: { href, pathname: url.pathname, hostname: url.hostname } })
  vi.resetModules()
  init.mockClear()
  await import('./instrumentation-client')
  const { scrubAnalyticsEvent } = await import('./lib/no-track')
  return { options: init.mock.calls[0]?.[1], scrubAnalyticsEvent }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('PostHog initialization', () => {
  it('filters every event through the credential scrub', async () => {
    const { options, scrubAnalyticsEvent } = await initOptionsFor('https://www.example.org/about')
    // typeof first: with neither in place, undefined would equal undefined
    expect(typeof options.before_send).toBe('function')
    expect(options.before_send).toBe(scrubAnalyticsEvent)
    expect(options.disable_session_recording).toBe(false)
  })

  it('records no session replay on a page whose address carries a credential', async () => {
    const { options } = await initOptionsFor('https://www.example.org/products/a/success?session_id=cs_live_secret')
    expect(options.disable_session_recording).toBe(true)
  })

  it('still starts nothing on a no-track page', async () => {
    const { options } = await initOptionsFor('https://www.example.org/preferences?token=abc')
    expect(options).toBeUndefined()
  })
})
