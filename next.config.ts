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
      {
        source: '/concepts/four-container-journey',
        destination: '/concepts',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    // Static discovery files and assets must serve their literal content
    // regardless of Accept header. The catch-all content-negotiation rewrite
    // below would otherwise route these through /markdown/, which 404s for
    // any path not registered as a page (marketplace.json, llms.txt,
    // robots.txt, sitemap.xml, AGENTS.md, asset SVGs, etc.).
    // Each entry below is a self-rewrite that matches first and prevents
    // the catch-all from firing on these paths.
    const staticBypasses = [
      { source: '/marketplace.json', destination: '/marketplace.json' },
      { source: '/igos-index.json', destination: '/igos-index.json' },
      { source: '/AGENTS.md', destination: '/AGENTS.md' },
      { source: '/llms.txt', destination: '/llms.txt' },
      { source: '/llms-full.txt', destination: '/llms-full.txt' },
      { source: '/robots.txt', destination: '/robots.txt' },
      { source: '/sitemap.xml', destination: '/sitemap.xml' },
      { source: '/:path*.svg', destination: '/:path*.svg' },
      { source: '/:path*.ico', destination: '/:path*.ico' },
      { source: '/:path*.png', destination: '/:path*.png' },
      { source: '/:path*.jpg', destination: '/:path*.jpg' },
      { source: '/:path*.jpeg', destination: '/:path*.jpeg' },
      { source: '/:path*.webp', destination: '/:path*.webp' },
      { source: '/:path*.gif', destination: '/:path*.gif' },
      { source: '/:path*.woff2', destination: '/:path*.woff2' },
      { source: '/:path*.woff', destination: '/:path*.woff' },
    ]

    return {
      beforeFiles: [
        ...staticBypasses,
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
