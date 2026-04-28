import type { NextConfig } from 'next'

// Content negotiation: when an AI agent requests text/markdown or text/plain,
// rewrite to the /markdown handler which returns clean markdown instead of HTML.
// Pattern: Vercel Feb 2026 — https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation
const markdownAcceptRegex =
  '(?=.*(?:text/plain|text/markdown))(?!.*text/html.*(?:text/plain|text/markdown)).*'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/concepts/contribution-flywheel',
        destination: '/concepts/creator-flywheel',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          destination: '/markdown/:path*',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: markdownAcceptRegex,
            },
          ],
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // No third-party scripts at launch — CSP is strict from day one.
            // If HubSpot or other embeds are added in future, update script-src before deploying.
            // unsafe-inline for script-src is required for Next.js hydration and JSON-LD data blocks.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          // RFC 8288 Link headers — point AI agents to structured resources
          {
            key: 'Link',
            value:
              '<https://www.infinitegameos.io/llms.txt>; rel="ai-agent"; type="text/plain", <https://www.infinitegameos.io/sitemap.xml>; rel="sitemap"; type="application/xml"',
          },
          {
            key: 'Content-Signal',
            value: 'ai-train=yes, search=yes, ai-input=yes',
          },
          // Vary: Accept — required because /markdown rewrite is content-negotiated.
          // Prevents CDN cache poisoning between text/html and text/markdown responses.
          { key: 'Vary', value: 'Accept' },
        ],
      },
    ]
  },
}

export default nextConfig
