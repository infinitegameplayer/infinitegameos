// Cursor rule export for a library asset, served by src/app/install/cursor/[file]/route.ts.
// Kept apart from the markdown twins, which are generated from each page (src/lib/twin.ts).

import type { IGOSAsset } from '@/data/library'

const SITE = 'https://www.infinitegameos.io'

export function generateCursorMdc(asset: IGOSAsset): string {
  const lines: string[] = []

  lines.push('---')
  lines.push(`description: ${JSON.stringify(asset.description)}`)
  lines.push('alwaysApply: false')
  lines.push('---')
  lines.push('')

  lines.push(`# ${asset.title}`)
  lines.push('')
  lines.push(asset.capsule)
  lines.push('')

  if (asset.definition) {
    lines.push('## Definition')
    lines.push('')
    lines.push(asset.definition)
    lines.push('')
  }

  asset.howItWorks?.forEach(section => {
    lines.push(`## ${section.heading}`)
    lines.push('')
    section.paragraphs.forEach(p => {
      lines.push(p)
      lines.push('')
    })
  })

  if (asset.useCases?.length) {
    lines.push('## Use Cases')
    lines.push('')
    asset.useCases.forEach(uc => {
      lines.push(`**${uc.title}**`)
      lines.push('')
      lines.push(uc.body)
      lines.push('')
    })
  }

  if (asset.faq?.length) {
    lines.push('## FAQ')
    lines.push('')
    asset.faq.forEach(item => {
      lines.push(`**${item.q}**`)
      lines.push('')
      lines.push(item.a)
      lines.push('')
    })
  }

  lines.push('---')
  lines.push('')
  lines.push(asset.softHook.body)
  lines.push('')
  lines.push(`Source: ${SITE}/${asset.type}s/${asset.slug}`)
  lines.push('')

  return lines.join('\n')
}
