import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Infinite Game OS'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a18 0%, #111128 50%, #0a0a18 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: '#7c8aff',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Infinite Game OS
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#e2e8f0',
            lineHeight: 1.2,
            maxWidth: '18ch',
            marginBottom: 32,
          }}
        >
          Philosophy, frameworks and systems for the long game
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(226, 232, 240, 0.6)',
            lineHeight: 1.5,
            maxWidth: '48ch',
          }}
        >
          A structured knowledge base for practitioners of Infinite Game philosophy, sovereign life design and agentic systems.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            fontSize: 18,
            color: 'rgba(226, 232, 240, 0.4)',
          }}
        >
          infinitegameos.io
        </div>
      </div>
    ),
    { ...size }
  )
}
