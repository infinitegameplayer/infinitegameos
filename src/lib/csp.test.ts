import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { NONCE_ROUTES, contentSecurityPolicy, generateNonce } from './csp'

describe('contentSecurityPolicy', () => {
  it('keeps the static policy byte-identical to the one served before the nonce routes', () => {
    expect(contentSecurityPolicy()).toBe(
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
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

  it('matches the proxy matcher exactly', () => {
    const proxy = readFileSync('src/proxy.ts', 'utf8')
    const block = proxy.slice(proxy.indexOf('matcher: ['))
    const matcher = [...block.matchAll(/'(\/[^']*)'/g)].map((m) => m[1])
    expect(matcher.sort()).toEqual([...NONCE_ROUTES].sort())
  })
})
