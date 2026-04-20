import { getMarkdownForPath } from '@/lib/markdown-content'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  const joined = path?.join('/') ?? ''
  const content = getMarkdownForPath(joined)

  if (!content) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
