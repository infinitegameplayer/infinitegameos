import { describe, it, expect, vi, beforeEach } from 'vitest'

// The footer unsubscribe acts by itself only on BotID's human verdict (Email
// Codex Section 12). A scanner's automatic request, or one BotID could not
// check, writes nothing and hands the page its button.

vi.hoisted(() => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.RESEND_AUDIENCE_INFINITE_GAME_ID = 'aud'
})

let verdict: 'human' | 'bot' | 'unchecked' = 'human'
const update = vi.fn(() => ({ eq: async () => ({ error: null }) }))
const contactsUpdate = vi.fn(async () => ({}))

vi.mock('@/lib/bot-guard', () => ({
  botVerdict: async () => verdict,
  refuseBots: async () => (verdict === 'bot' ? new Response(JSON.stringify({ error: 'Access denied' }), { status: 403 }) : null),
}))
vi.mock('resend', () => ({ Resend: class { contacts = { update: contactsUpdate } } }))
vi.mock('@/lib/unsubscribe-token', () => ({ verifyEmailToken: (_e: string, t: string) => t === 'good' }))
vi.mock('@/lib/supabase', () => ({ getSupabaseAdmin: () => ({ from: () => ({ update }) }) }))

import { POST } from './route'
import { BOTID_PROTECTED } from '@/lib/botid-routes'

function post(body: Record<string, unknown>) {
  return POST(new Request('http://x/api/unsubscribe', { method: 'POST', body: JSON.stringify(body) }) as never)
}

beforeEach(() => {
  verdict = 'human'
  update.mockClear()
  contactsUpdate.mockClear()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

describe('/api/unsubscribe', () => {
  it('is on BotID protected list, so the browser sends the signal its verdict reads', () => {
    expect(BOTID_PROTECTED.some((r) => r.path === '/api/unsubscribe')).toBe(true)
  })

  it('refuses a bad token and writes nothing', async () => {
    const res = await post({ email: 'a@x.com', token: 'bad', mode: 'auto' })
    expect(res.status).toBe(403)
    expect(update).not.toHaveBeenCalled()
  })

  it('acts on an automatic request BotID reads as human', async () => {
    const res = await post({ email: 'a@x.com', token: 'good', mode: 'auto' })
    expect(await res.json()).toEqual({ ok: true })
    expect(update).toHaveBeenCalledTimes(1)
  })

  for (const v of ['bot', 'unchecked'] as const) {
    it(`hands an automatic request BotID reads as ${v} the button, writing nothing`, async () => {
      verdict = v
      const res = await post({ email: 'a@x.com', token: 'good', mode: 'auto' })
      expect(await res.json()).toEqual({ ok: true, needsTap: true })
      expect(update).not.toHaveBeenCalled()
      expect(contactsUpdate).not.toHaveBeenCalled()
    })
  }

  it('lets a tap through when BotID could not check', async () => {
    verdict = 'unchecked'
    const res = await post({ email: 'a@x.com', token: 'good', mode: 'tap' })
    expect(res.status).toBe(200)
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('refuses a tap BotID reads as a bot', async () => {
    verdict = 'bot'
    const res = await post({ email: 'a@x.com', token: 'good', mode: 'tap' })
    expect(res.status).toBe(403)
    expect(update).not.toHaveBeenCalled()
  })

  it('logs one auto-leave line with the verdict', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    verdict = 'bot'
    await post({ email: 'a@x.com', token: 'good', mode: 'auto' })
    expect(log.mock.calls.some(([l]) => typeof l === 'string' && l.startsWith('auto-leave ') && l.includes('"verdict":"bot"'))).toBe(true)
  })
})
