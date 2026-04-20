import { ImageResponse } from 'next/og'
import { getConceptBySlug } from '@/data/concepts'

export const alt = 'Infinite Game OS Concept'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const concept = getConceptBySlug(slug)
  const title = concept?.title ?? 'Concept'
  const capsule = concept?.capsule ?? ''

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
            fontSize: 18,
            fontWeight: 500,
            color: '#7c8aff',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Infinite Game OS — Concept
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#e2e8f0',
            lineHeight: 1.15,
            maxWidth: '22ch',
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(226, 232, 240, 0.6)',
            lineHeight: 1.5,
            maxWidth: '52ch',
          }}
        >
          {capsule.length > 180 ? capsule.slice(0, 177) + '...' : capsule}
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
          infinitegameos.io/concepts
        </div>
      </div>
    ),
    { ...size }
  )
}
