import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const updatesDir = path.join(process.cwd(), 'content', 'updates')

export type UpdateMeta = {
  slug: string
  title: string
  seoTitle?: string
  date: string
  summary: string
}

export type Update = UpdateMeta & {
  content: string
}

function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10)
  return String(raw)
}

export function getAllUpdates(): UpdateMeta[] {
  const files = fs.readdirSync(updatesDir).filter(f => f.endsWith('.mdx'))
  const updates = files.map(filename => {
    const raw = fs.readFileSync(path.join(updatesDir, filename), 'utf8')
    const { data } = matter(raw)
    return {
      slug: data.slug as string,
      title: data.title as string,
      seoTitle: data.seoTitle as string | undefined,
      date: normalizeDate(data.date),
      summary: data.summary as string,
    }
  })
  return updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getUpdate(slug: string): Update | null {
  const files = fs.readdirSync(updatesDir).filter(f => f.endsWith('.mdx'))
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(updatesDir, filename), 'utf8')
    const { data, content } = matter(raw)
    if (data.slug === slug) {
      return {
        slug: data.slug as string,
        title: data.title as string,
        seoTitle: data.seoTitle as string | undefined,
        date: normalizeDate(data.date),
        summary: data.summary as string,
        content,
      }
    }
  }
  return null
}
