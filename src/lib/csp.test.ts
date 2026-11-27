import { describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'

// The policy reads its analytics hosts from env when the module loads. Vercel
// sets NEXT_PUBLIC_UMAMI_URL at build, so this test failed the first build that
// ran it (2026-11-05). It checks the policy's shape, so it clears both before
// csp.ts is imported; csp-loads.test.ts covers the env-sourced hosts.
vi.hoisted(() => {
  delete process.env.NEXT_PUBLIC_UMAMI_URL
  delete process.env.NEXT_PUBLIC_POSTHOG_HOST
})

const { logSpy } = vi.hoisted(() => ({ logSpy: vi.fn() }))
vi.mock('@/lib/agent-log/writer', () => ({ logPageRequest: logSpy }))

import { NextRequest, type NextFetchEvent } from 'next/server'
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'
import { NONCE_ROUTES, contentSecurityPolicy, generateNonce, isNonceRoute } from './csp'
import { config, proxy } from '@/proxy'

describe('contentSecurityPolicy', () => {
  // fonts.gstatic.com left font-src on 2026-11-05 (Site Update): next/font/google self-hosts.
  // object-src 'none' joined on 2026-11-25 (Site Update), for parity with the other two sites.
  it('keeps the static policy byte-identical to the one served before the nonce routes', () => {
    expect(contentSecurityPolicy()).toBe(
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'"
    )
  })

  it('swaps only the inline source for the nonce, with no strict-dynamic', () => {
    const nonce = generateNonce()
    const policy = contentSecurityPolicy(nonce)
    expect(policy).toBe(contentSecurityPolicy().replace("'unsafe-inline' https://us.i", `'nonce-${nonce}' https://us.i`))
    const scriptSrc = policy.split('; ').find((d) => d.startsWith('script-src '))!
    expect(scriptSrc).not.toContain("'unsafe-inline'")
    expect(scriptSrc).not.toContain('strict-dynamic')
  })

  it('fails closed on an empty or malformed nonce', () => {
    for (const bad of ['', 'abc', "x' 'unsafe-eval", 'A'.repeat(24)]) {
      expect(() => contentSecurityPolicy(bad)).toThrow()
    }
  })

  it('draws a fresh well-formed nonce each call', () => {
    const a = generateNonce()
    const b = generateNonce()
    expect(a).not.toBe(b)
    expect(() => contentSecurityPolicy(a)).not.toThrow()
  })
})

describe('NONCE_ROUTES', () => {
  it('lists only force-dynamic pages', () => {
    for (const route of NONCE_ROUTES) {
      const page = readFileSync(`src/app${route}/page.tsx`, 'utf8')
      expect(page).toContain("export const dynamic = 'force-dynamic'")
    }
  })

  // Since the Agent Visit Log (2026-11-27) the matcher reaches every page, so it
  // is no longer the nonce list. isNonceRoute() is, and the proxy reads only it.
  it('isNonceRoute accepts exactly the listed paths', () => {
    for (const route of NONCE_ROUTES) expect(isNonceRoute(route)).toBe(true)
    for (const other of ['/', '/preferences/unknown', '/preferences/', '/unsubscribe/x', '/the-os']) {
      expect(isNonceRoute(other), other).toBe(false)
    }
  })

  it('the matcher reaches every nonce route', () => {
    for (const route of NONCE_ROUTES) {
      expect(unstable_doesMiddlewareMatch({ config, url: route, nextConfig: {} }), route).toBe(true)
    }
  })
})

describe('proxy', () => {
  const req = (path: string) => new NextRequest(new URL(path, 'https://www.infinitegameos.io'))

  it('stamps the nonce policy on a nonce route only', () => {
    const nonce = proxy(req('/preferences'))
    const policy = nonce.headers.get('Content-Security-Policy')!
    expect(policy).toMatch(/'nonce-[A-Za-z0-9+/]{22}=='/)
    expect(proxy(req('/the-os')).headers.get('Content-Security-Policy')).toBeNull()
    expect(proxy(req('/preferences/unknown')).headers.get('Content-Security-Policy')).toBeNull()
  })

  it('passes the request through untouched when logging throws', () => {
    logSpy.mockImplementationOnce(() => { throw new Error('logger broke') })
    const res = proxy(req('/the-os'))
    expect(res.headers.get('x-middleware-next')).toBe('1')
    expect(res.headers.get('Content-Security-Policy')).toBeNull()
    logSpy.mockImplementationOnce(() => { throw new Error('logger broke') })
    expect(proxy(req('/preferences')).headers.get('Content-Security-Policy')).toMatch(/'nonce-/)
  })

  it('hands every request to the logger with its event', () => {
    logSpy.mockClear()
    const event = { waitUntil: vi.fn() } as unknown as NextFetchEvent
    proxy(req('/llms.txt'), event)
    expect(logSpy).toHaveBeenCalledWith(expect.anything(), event)
  })
})
