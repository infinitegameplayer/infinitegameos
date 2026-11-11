import { describe, it, expect, vi, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { botVerdict, refuseBots } from './bot-guard'
import { BOTID_PROTECTED } from './botid-routes'

vi.mock('botid/server', () => ({ checkBotId: async () => ({ isBot: false }) }))

afterEach(() => vi.restoreAllMocks())

describe('refuseBots', () => {
  it('returns 403 and logs the refusal with what BotID saw', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const res = await refuseBots({ route: '/api/preferences/request-link' }, async () => ({ isBot: true, isVerifiedBot: false }))
    expect(res?.status).toBe(403)
    expect(warn).toHaveBeenCalledWith('botid refused {"route":"/api/preferences/request-link","verified":false,"name":null,"category":null}')
  })
  it('refuses a verified agent too, and names it in the log', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const res = await refuseBots(
      { route: '/api/preferences/request-link' },
      async () => ({ isBot: true, isVerifiedBot: true, verifiedBotName: 'chatgpt-operator', verifiedBotCategory: 'ai_assistant' })
    )
    expect(res?.status).toBe(403)
    expect(warn).toHaveBeenCalledWith('botid refused {"route":"/api/preferences/request-link","verified":true,"name":"chatgpt-operator","category":"ai_assistant"}')
  })
  it('stays silent for a person', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(await refuseBots({ route: '/api/preferences/request-link' }, async () => ({ isBot: false }))).toBeNull()
    expect(warn).not.toHaveBeenCalled()
  })
  it('lets the request through when BotID itself fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(await refuseBots({ route: '/api/preferences/request-link' }, async () => { throw new Error('vendor down') })).toBeNull()
  })
})

describe('botVerdict, for actions a page takes by itself', () => {
  it('reads a person as human', async () => {
    expect(await botVerdict({ route: '/api/igos-subscribe' }, async () => ({ isBot: false }))).toBe('human')
  })
  it('reads a flagged visitor as bot and logs it', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(await botVerdict({ route: '/api/igos-subscribe' }, async () => ({ isBot: true }))).toBe('bot')
    expect(warn).toHaveBeenCalled()
  })
  it('reads a BotID failure as unchecked, never as human', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(await botVerdict({ route: '/api/igos-subscribe' }, async () => { throw new Error('vendor down') })).toBe('unchecked')
  })
})

// Each guarded route names itself, so its refusal line says where it happened.
// Read from the route sources so a route that drops its name fails here.
describe('route names', () => {
  for (const { path } of BOTID_PROTECTED) {
    it(`${path} passes its own path to refuseBots`, () => {
      const src = readFileSync(join(process.cwd(), 'src/app', path, 'route.ts'), 'utf8')
      expect(src).toContain(`refuseBots({ route: '${path}' })`)
    })
  }
})
