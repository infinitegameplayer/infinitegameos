import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// Shared Open Graph card template for infinitegameos.io.
// One source of truth for every share card on the site.
// Canvas renders at 2x (2400x1260) so cards stay crisp on retina and iMessage.
// Critical content lives inside the center safe zone for square-crop surfaces.
// Cards prerender to static PNG at build, so the brand font is read from disk.

export const OG_SIZE = { width: 2400, height: 1260 }
export const OG_CONTENT_TYPE = 'image/png'

const FONT_DIR = join(process.cwd(), 'src', 'lib', 'og-fonts')
const fontMedium = readFileSync(join(FONT_DIR, 'SpaceGrotesk-500.ttf'))
const fontBold = readFileSync(join(FONT_DIR, 'SpaceGrotesk-700.ttf'))

const theme = {
  background: 'linear-gradient(135deg, #0a0a18 0%, #111128 50%, #0a0a18 100%)',
  eyebrow: '#7c8aff',
  rule: '#7c8aff',
  title: '#e2e8f0',
  body: 'rgba(226, 232, 240, 0.72)',
  footer: 'rgba(226, 232, 240, 0.7)',
}

type OgCardInput = {
  eyebrow: string
  title: string
  body?: string
  footer?: string
}

export function firstSentence(text: string) {
  const trimmed = text.trim()
  const end = trimmed.indexOf('. ')
  return end === -1 ? trimmed : trimmed.slice(0, end + 1)
}

export async function ogCard({
  eyebrow,
  title,
  body,
  footer = 'infinitegameos.io',
}: OgCardInput) {
  return new ImageResponse(
    (
      <div
        style={{
          background: theme.background,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '160px',
          fontFamily: 'Space Grotesk',
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 500,
            color: theme.eyebrow,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            background: theme.rule,
            borderRadius: 3,
            marginBottom: 48,
          }}
        />
        <div
          style={{
            display: 'flex',
            width: '100%',
            fontSize: 104,
            fontWeight: 700,
            color: theme.title,
            lineHeight: 1.12,
            maxWidth: 1700,
            marginBottom: body ? 44 : 0,
          }}
        >
          {title}
        </div>
        {body ? (
          <div
            style={{
              display: 'flex',
              width: '100%',
              fontSize: 44,
              fontWeight: 500,
              color: theme.body,
              lineHeight: 1.45,
              maxWidth: 1500,
            }}
          >
            {body}
          </div>
        ) : null}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: 160,
            fontSize: 36,
            fontWeight: 500,
            color: theme.footer,
            letterSpacing: '0.04em',
          }}
        >
          {footer}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Space Grotesk', data: fontMedium, weight: 500, style: 'normal' },
        { name: 'Space Grotesk', data: fontBold, weight: 700, style: 'normal' },
      ],
    }
  )
}
