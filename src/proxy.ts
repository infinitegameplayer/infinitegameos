// The proxy does two separate jobs.
//
// 1. The agent log (Agent Visit Log plan, 2026-11-27). Every matched page
//    request is handed to logPageRequest(), which records which software read
//    which page, never the IP address, and does its work in waitUntil after the
//    response. It is wrapped on its own: it never alters the request or the
//    response, and a throw inside it is caught here and the request passes.
//
// 2. Nonce-based script-src for the routes that already render per request
//    (SECURITY.md, option A). Fail closed: the nonce policy goes only on an
//    exact path for which isNonceRoute() is true, and Next stamps that same
//    nonce on the page's scripts during the render. Every other path passes
//    through untouched and keeps the static policy from next.config.ts.

import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { contentSecurityPolicy, generateNonce, isNonceRoute } from '@/lib/csp'
import { logPageRequest } from '@/lib/agent-log/writer'

export function proxy(request: NextRequest, event?: NextFetchEvent) {
  try {
    logPageRequest(request, event)
  } catch {
    // The log only watches; a failure in it never reaches the visitor.
  }

  if (!isNonceRoute(request.nextUrl.pathname)) {
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

// Matcher values must be literals. Every path except the API, build output,
// the markdown handler (the proxy runs before rewrites, so it sees the page
// path an agent asked for) and static asset files, with Next's prefetches left
// out by their own headers. Agent discovery files (.txt, .md, .json, .xml) are
// reached; src/lib/agent-log/discovery.ts lists them and its test holds them.
// Redirected requests never reach the proxy (redirects run first).
export const config = {
  matcher: [
    {
      source: '/((?!api/|_next/|markdown(?:/|$)|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|css|js|mjs|map)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'sec-purpose', value: '.*prefetch.*' },
      ],
    },
  ],
}
