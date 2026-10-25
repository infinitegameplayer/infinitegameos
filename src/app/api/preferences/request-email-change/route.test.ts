import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Starting an email change sends a "Confirm your new email address" mail to an
// address the caller names. The preference page that drives it is entered only
// with the expiring token, so that is the only token this route accepts. The
// permanent unsubscribe token rides every email footer for life; honoring it
// here let anyone holding one aim confirm mail at any address (Site
// Defensibility Read 2026-10-25). Mirror across the three sites.

const { requestEmailChangeMock, sendMock } = vi.hoisted(() => ({
  requestEmailChangeMock: vi.fn(async (opts: { oldEmail: string; newEmail: string }) => ({
    ok: true,
    status: 'pending',
    oldEmail: opts.oldEmail,
    newEmail: opts.newEmail,
    confirmSecret: 'confirm_secret',
    cancelSecret: 'cancel_secret',
  })),
  sendMock: vi.fn(async () => ({ data: { id: 'email_1' }, error: null })),
}))

vi.mock('@/lib/bot-guard', () => ({ refuseBots: async () => null }))
vi.mock('@/lib/email-lists', () => ({ requestEmailChange: requestEmailChangeMock }))
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

let POST: (req: NextRequest) => Promise<Response>
let signEmailToken: (email: string) => string
let signExpiringToken: (email: string, ttlSeconds?: number) => string

beforeAll(async () => {
  process.env.UNSUBSCRIBE_SECRET = 'test-secret-for-email-change'
  POST = (await import('./route')).POST
  const tokens = await import('@/lib/unsubscribe-token')
  signEmailToken = tokens.signEmailToken
  signExpiringToken = tokens.signExpiringToken
})

beforeEach(() => {
  requestEmailChangeMock.mockClear()
  sendMock.mockClear()
})

const OLD = 'holder@example.com'
const NEW = 'stranger@example.com'

function changeReq(token: string): NextRequest {
  return new NextRequest('https://www.infinitegameos.io/api/preferences/request-email-change', {
    method: 'POST',
    body: JSON.stringify({ email: OLD, token, newEmail: NEW }),
    headers: { 'content-type': 'application/json' },
  })
}

describe('request-email-change token class', () => {
  it('refuses the permanent unsubscribe token and sends nothing', async () => {
    const res = await POST(changeReq(signEmailToken(OLD)))
    expect(res.status).toBe(403)
    expect(requestEmailChangeMock).not.toHaveBeenCalled()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('refuses an expired expiring token', async () => {
    const res = await POST(changeReq(signExpiringToken(OLD, -60)))
    expect(res.status).toBe(403)
    expect(requestEmailChangeMock).not.toHaveBeenCalled()
  })

  it('accepts the expiring token the preference page carries', async () => {
    // Liveness control: without it, a route refusing every token passes above.
    const res = await POST(changeReq(signExpiringToken(OLD)))
    expect(res.status).toBe(200)
    expect(requestEmailChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({ oldEmail: OLD, newEmail: NEW })
    )
    expect(sendMock).toHaveBeenCalledTimes(2)
  })
})
