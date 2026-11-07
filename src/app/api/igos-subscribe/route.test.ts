import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.hoisted(() => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.RESEND_AUDIENCE_INFINITE_GAME_ID = 'aud'
})

const send = vi.fn(async () => ({}))
const create = vi.fn(async () => ({}))
let prior: { unsubscribed: boolean; first_name: string | null; tags: string[] } | null = null
const insert = vi.fn(async () => ({ error: null }))

vi.mock('@/lib/bot-guard', () => ({ refuseBots: async () => null }))
vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
    contacts = { create }
  },
}))
vi.mock('@/lib/unsubscribe-token', () => ({ signEmailToken: () => 't', signExpiringToken: () => 't' }))
vi.mock('@/lib/supabase', () => ({
  getSupabaseAdmin: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: prior, error: null }) }) }),
      insert,
      update: () => ({ eq: async () => ({ error: null }) }),
    }),
  }),
}))

import { POST } from './route'

function post(body: Record<string, unknown>) {
  return POST(new Request('http://x/api/igos-subscribe', { method: 'POST', body: JSON.stringify(body) }) as never)
}

beforeEach(() => {
  send.mockClear()
  create.mockClear()
  insert.mockClear()
  prior = null
})

describe('igos-subscribe', () => {
  it('adds a new contact and sends the welcome email', async () => {
    const res = await post({ email: 'New@Example.com' })
    expect(await res.json()).toEqual({ ok: true })
    expect(insert).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledTimes(1)
  })

  it('does not add or re-welcome someone already on the list', async () => {
    prior = { unsubscribed: false, first_name: null, tags: ['infinite_game_subscriber'] }
    const res = await post({ email: 'on@example.com' })
    expect(await res.json()).toEqual({ ok: true, alreadySubscribed: true })
    expect(send).not.toHaveBeenCalled()
    expect(create).not.toHaveBeenCalled()
  })

  it('sends the welcome-back email, not a re-add, to an unsubscribed contact', async () => {
    prior = { unsubscribed: true, first_name: null, tags: ['infinite_game_subscriber'] }
    const res = await post({ email: 'out@example.com' })
    expect(await res.json()).toEqual({ ok: true })
    expect(send).toHaveBeenCalledTimes(1)
    expect((send.mock.calls[0] as unknown as [{ subject: string }])[0].subject).toBe('Want back in?')
    expect(create).not.toHaveBeenCalled()
  })

  it('drops a typed form posted inside the fill-time window', async () => {
    const res = await post({ email: 'fast@example.com', openedAt: Date.now() })
    expect(await res.json()).toEqual({ ok: true })
    expect(send).not.toHaveBeenCalled()
  })

  it('accepts a prefilled one-tap post that carries no openedAt', async () => {
    await post({ email: 'tap@example.com', source: '/updates/join' })
    expect(send).toHaveBeenCalledTimes(1)
  })
})
