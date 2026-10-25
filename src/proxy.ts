// Nonce-based script-src for the routes that already render per request
// (SECURITY.md, option A). Every other path never reaches this file and keeps
// the static policy from next.config.ts, so no page changes render mode.
//
// Fail closed: the proxy sets the nonce policy only on an exact NONCE_ROUTES
// path, and Next stamps that same nonce on the page's scripts during the
// render. Any other path passes through untouched with the static policy.

import { NextResponse, type NextRequest } from 'next/server'
import { NONCE_ROUTES, contentSecurityPolicy, generateNonce } from '@/lib/csp'

export function proxy(request: NextRequest) {
  if (!NONCE_ROUTES.has(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const policy = contentSecurityPolicy(generateNonce())

  // Next reads the nonce from the request's CSP header during the render.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Content-Security-Policy', policy)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', policy)
  return response
}

// Matcher values must be literals. Keep in step with NONCE_ROUTES in
// src/lib/csp.ts. The pathname check above holds even if the two drift.
export const config = {
  matcher: [
    '/preferences',
    '/preferences/cancel-email-change',
    '/preferences/confirm-email-change',
    '/unsubscribe',
  ],
}
