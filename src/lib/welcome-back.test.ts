import { beforeEach, describe, expect, it, vi } from 'vitest'

// Welcome back and the letters map in IGOS emails (PendingPlan - The Letters Map
// and Welcome Back, steps 2 and 4). An existing contact who rejoins the updates
// list after leaving it gets "Welcome back"; a first join gets the first
// welcome; both welcomes and every broadcast carry the map without the IGOS
// list, above the undo line or the footer.

vi.hoisted(() => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.RESEND_AUDIENCE_INFINITE_GAME_ID = 'aud'
})

const send = vi.fn(async (_m: { subject: string; html: string }) => ({}))
const resendUpdate = vi.fn(async (_m: Record<string, unknown>) => ({}))
let prior: { unsubscribed: boolean; first_name: string | null; tags: string[] } | null = null
let returning = false
const returnCalls: string[] = []

vi.mock('@/lib/bot-guard', () => ({ refuseBots: async () => null }))
vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create: async () => ({}), update: resendUpdate }
  },
}))
vi.mock('@/lib/unsubscribe-token', () => ({ signEmailToken: () => 't', signExpiringToken: () => 't' }))
vi.mock('@/lib/list-return', () => ({
  leftThisListBefore: async (_s: unknown, email: string, list: string) => {
    returnCalls.push(`${email}|${list}`)
    return returning
  },
}))
vi.mock('@/lib/supabase', () => ({
  getSupabaseAdmin: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: prior, error: null }) }) }),
      insert: async () => ({ error: null }),
      update: () => ({ eq: async () => ({ error: null }) }),
    }),
  }),
}))

import { POST } from '@/app/api/igos-subscribe/route'
import { buildListWelcomeBackHtml, buildWelcomeHtml } from './igos-welcome'
import { buildBroadcastBody } from './igos-broadcast'
import { renderEmailShell } from './email-shell'

function post(body: Record<string, unknown>) {
  return POST(new Request('http://x/api/igos-subscribe', { method: 'POST', body: JSON.stringify(body) }) as never)
}

beforeEach(() => {
  send.mockClear()
  resendUpdate.mockClear()
  returnCalls.length = 0
  returning = false
  prior = null
})

describe('the subscribe route chooses the welcome', () => {
  it('an existing contact who left the list and rejoins gets Welcome back', async () => {
    prior = { unsubscribed: false, first_name: null, tags: ['personal_subscriber'] }
    returning = true
    await post({ email: 'A@x.co' })
    expect(returnCalls).toEqual(['a@x.co|infinite_game'])
    expect(send.mock.calls.map((c) => c[0].subject)).toEqual(['Welcome back'])
  })
  it('an existing contact who never left gets the first welcome', async () => {
    prior = { unsubscribed: false, first_name: null, tags: ['personal_subscriber'] }
    await post({ email: 'a@x.co' })
    expect(send.mock.calls.map((c) => c[0].subject)).toEqual(['Welcome to Infinite Game OS updates'])
  })
  it('a brand new contact gets the first welcome and never queries the leave history', async () => {
    await post({ email: 'new@x.co' })
    expect(returnCalls).toEqual([])
    expect(send.mock.calls.map((c) => c[0].subject)).toEqual(['Welcome to Infinite Game OS updates'])
  })
})

describe('a join clears the Resend flag', () => {
  it('a rejoin by an existing contact updates the Resend contact to subscribed', async () => {
    prior = { unsubscribed: false, first_name: null, tags: ['personal_subscriber'] }
    await post({ email: 'a@x.co' })
    expect(resendUpdate).toHaveBeenCalledWith(expect.objectContaining({ audienceId: 'aud', email: 'a@x.co', unsubscribed: false }))
  })
})

describe('the welcomes carry the map without the IGOS list', () => {
  const opts = { unsubscribeUrl: 'u', preferencesUrl: 'p', leaveUrl: 'https://www.infinitegameos.io/updates/leave?t=1', email: 'a@x.co' }
  const cases = [
    ['first welcome', buildWelcomeHtml(opts)],
    ['welcome back', buildListWelcomeBackHtml(opts)],
  ] as const
  for (const [label, html] of cases) {
    it(`${label}: map present, own list absent, address carried, undo last`, () => {
      expect(html).toContain('The letters')
      expect(html).not.toContain('<strong>Infinite Game OS</strong>')
      expect(html).toContain('join?email=a%40x.co')
      expect(html.indexOf('The letters')).toBeLessThan(html.indexOf('One click to undo.'))
    })
  }
  it('Welcome back keeps the approved draft', () => {
    const html = buildListWelcomeBackHtml({ ...opts, firstName: 'Ana' })
    expect(html).toContain('Hey Ana,')
    expect(html).toContain("You're back on the Infinite Game OS updates. The door swings both ways, and you just proved it.")
    expect(html).toContain('infinitegameos.io/updates</a>')
    expect(html).toContain('With Joyful Sovereignty,')
    expect(buildListWelcomeBackHtml(opts)).toContain('Hey there,')
  })
})

describe('the broadcast carries the map', () => {
  const a = { slug: 's', title: 'T', summary: 'S', date: '2026-01-01' }
  for (const [label, articles] of [['one piece', [a]], ['many pieces', [a, a]]] as const) {
    it(`${label}: merge tag in the map, own list absent, map above the footer`, () => {
      const html = renderEmailShell({ body: buildBroadcastBody([...articles]), unsubscribeUrl: '{{{RESEND_UNSUBSCRIBE_URL}}}' })
      expect(html).toContain('The letters')
      expect(html).toContain('join?email={{{contact.email}}}')
      expect(html).not.toContain('<strong>Infinite Game OS</strong>')
      expect(html.indexOf('The letters')).toBeLessThan(html.indexOf('one-click unsubscribe'))
    })
  }
})
