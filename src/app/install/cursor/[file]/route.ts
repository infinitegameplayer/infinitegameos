import { getAssetBySlug, getAssetsByType } from '@/data/library'
import { generateCursorMdc } from '@/lib/markdown-content'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAssetsByType('skill')
    .filter(a => a.installable?.cursorMdc)
    .map(a => ({ file: `${a.slug}.mdc` }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params

  if (!file.endsWith('.mdc')) {
    return new Response('Not found', { status: 404 })
  }

  const slug = file.slice(0, -'.mdc'.length)
  const asset = getAssetBySlug(slug, 'skill')

  if (!asset || !asset.installable?.cursorMdc) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(generateCursorMdc(asset), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
