// Address parsing and CIDR matching for the agent log. IPv4 and IPv6, no
// dependencies. An address is held only in memory for the length of a request
// and is never written anywhere (see row.ts).

export type ParsedIp = { v: 4 | 6; n: bigint }
export type CompiledRange = { v: 4 | 6; start: bigint; end: bigint }

function parseV4(s: string): bigint | null {
  const parts = s.split('.')
  if (parts.length !== 4) return null
  let n = BigInt(0)
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null
    const x = Number(p)
    if (x > 255) return null
    n = (n << BigInt(8)) | BigInt(x)
  }
  return n
}

function parseV6(s: string): bigint | null {
  let text = s.toLowerCase()
  const zone = text.indexOf('%')
  if (zone !== -1) text = text.slice(0, zone)
  // An IPv4 tail (::ffff:1.2.3.4) becomes two hextets.
  const lastColon = text.lastIndexOf(':')
  if (text.includes('.', lastColon)) {
    const v4 = parseV4(text.slice(lastColon + 1))
    if (v4 === null) return null
    text = text.slice(0, lastColon + 1) + ((v4 >> BigInt(16)) & BigInt(0xffff)).toString(16) + ':' + (v4 & BigInt(0xffff)).toString(16)
  }
  const halves = text.split('::')
  if (halves.length > 2) return null
  const head = halves[0] ? halves[0].split(':') : []
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : []
  const missing = 8 - head.length - tail.length
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null
  const groups = [...head, ...Array(halves.length === 2 ? missing : 0).fill('0'), ...tail]
  let n = BigInt(0)
  for (const g of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null
    n = (n << BigInt(16)) | BigInt(parseInt(g, 16))
  }
  return n
}

export function parseIp(s: string | null | undefined): ParsedIp | null {
  if (!s) return null
  const t = s.trim()
  if (t.includes(':')) {
    const n = parseV6(t)
    if (n === null) return null
    // An IPv4-mapped IPv6 address is matched as the IPv4 address it carries.
    if (n >> BigInt(32) === BigInt(0xffff)) return { v: 4, n: n & BigInt(0xffffffff) }
    return { v: 6, n }
  }
  const n = parseV4(t)
  return n === null ? null : { v: 4, n }
}

export function compileCidr(cidr: string): CompiledRange | null {
  const [addr, bitsText] = cidr.split('/')
  const ip = parseIp(addr)
  if (!ip) return null
  const width = ip.v === 4 ? 32 : 128
  const bits = bitsText === undefined ? width : Number(bitsText)
  if (!Number.isInteger(bits) || bits < 0 || bits > width) return null
  const hostBits = BigInt(width - bits)
  const mask = (BigInt(1) << hostBits) - BigInt(1)
  const start = ip.n & ~mask
  return { v: ip.v, start, end: start | mask }
}

export function inRanges(ip: ParsedIp, ranges: readonly CompiledRange[]): boolean {
  for (const r of ranges) {
    if (r.v === ip.v && ip.n >= r.start && ip.n <= r.end) return true
  }
  return false
}
