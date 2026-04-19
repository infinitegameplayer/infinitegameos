import { NextRequest, NextResponse } from 'next/server'
import sitemap from '@/app/sitemap'

const INDEXNOW_KEY = '9f0f6b4049a44a3bb0a43f1ffd6d026a'
const HOST = 'infinitegameos.io'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.INDEXNOW_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  let urls: string[]

  if (body?.urls && Array.isArray(body.urls)) {
    urls = body.urls
  } else {
    const entries = sitemap()
    urls = entries.map(e => e.url)
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  return NextResponse.json({
    status: res.status,
    statusText: res.statusText,
    submitted: urls.length,
    urls,
  })
}
