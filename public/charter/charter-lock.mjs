#!/usr/bin/env node
// Your AI's Charter: the lock. Version 1.0, 2026-09-29.
// https://www.infinitegameos.io/charter
//
// A Claude Code PreToolUse hook. It reads the tool call Claude is about to make
// and, when that call sends, publishes, spends or deletes, answers "ask" so you
// see an approval prompt, even in modes that skip approvals. Everything else
// passes through untouched. Node 18 or later, no dependencies.
//
// The file shapes judgment. This hook is the boundary.

import { readFileSync } from 'node:fs'

// YOUR OWN COMMANDS. The rules below know the common ways to send, publish and
// delete. They have no way to know your own scripts. Add the start of any command you
// use to send email, post, publish, invoice or pay, and the lock asks before it
// runs. Examples: 'node scripts/send-newsletter.mjs', 'python post.py', 'make deploy'.
const MY_COMMANDS = [
]

const SQL_DELETE = /\b(drop\s+(table|database|schema)|truncate\s+table|delete\s+from)\b/i

// Where a command word can start: line start, after a separator, or after sudo.
const CMD = String.raw`(?:^|[;&|(]\s*|\bsudo\s+|\bxargs\s+(?:-\S+\s+)*)`

// Shell commands that send, publish or delete. Each entry: [label, pattern].
const SHELL_RULES = [
  ['git push', /\bgit\s+push\b/i],
  ['destructive git', /\bgit\s+(reset\s+--hard|clean\s+-\w*f|branch\s+-D|rm)\b/],
  ['package publish', /\b(npm|pnpm|yarn|bun)\s+publish\b/i],
  ['GitHub write', /\bgh\s+(pr|issue|release|repo|gist)\s+(create|comment|merge|close|delete|edit|review)\b/i],
  ['GitHub API write', /\bgh\s+api\b.*(-X|--method)\s*(POST|PUT|PATCH|DELETE)\b/i],
  ['HTTP write', /\bcurl\b.*(-X\s*|--request\s+)(POST|PUT|PATCH|DELETE)\b/i],
  ['HTTP write', /\bcurl\b.*(\s-d\s|\s-d'|\s-d"|--data\b|--data-\w+|\s-F\s|--form\b|--json\b)/i],
  ['HTTP write', /\b(Invoke-RestMethod|Invoke-WebRequest|irm|iwr)\b.*-Method\s+(Post|Put|Patch|Delete)\b/i],
  ['HTTP write', /\bwget\b.*--post-(data|file)\b/i],
  ['deploy', /\b(vercel|netlify|firebase|wrangler|fly|flyctl|railway|surge)\b.*\b(deploy|publish|--prod)\b/i],
  ['email', new RegExp(CMD + String.raw`(sendmail|mail|mailx|mutt|msmtp|swaks)\b`, 'i')],
  ['email', /\bSend-MailMessage\b/i],
  ['delete', new RegExp(CMD + String.raw`(rm|rmdir|unlink|shred|del|erase|rd)(?:\s|$)`, 'i')],
  ['delete', /\bRemove-Item\b/i],
  ['delete', /\bfind\b.*\s-delete\b/i],
  ['database delete', SQL_DELETE],
]

// MCP tool names are mcp__<server>__<tool>. The tool part is read as words.
// A leading write verb, or any word that means money or deletion, triggers it.
const MCP_LEADING_VERBS = new Set([
  'send', 'post', 'publish', 'reply', 'forward', 'share', 'invite', 'submit',
  'tweet', 'broadcast', 'schedule', 'deploy', 'merge', 'transfer', 'pay',
  'charge', 'refund', 'purchase', 'buy', 'delete', 'remove', 'destroy',
  'drop', 'purge', 'cancel',
])
const MCP_ANYWHERE = new Set([
  'delete', 'remove', 'destroy', 'purge', 'payment', 'charge', 'refund',
  'purchase', 'transfer', 'mutation',
])
const MCP_OUTWARD_OBJECTS = new Set([
  'post', 'message', 'email', 'mail', 'comment', 'tweet', 'invoice', 'reply',
  'broadcast', 'campaign', 'invite', 'payment', 'charge',
])
const MCP_WRITE_VERBS = new Set(['create', 'update', 'edit', 'add', 'make', 'new'])

function words(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

function classify(input) {
  const tool = String(input?.tool_name ?? '')
  const args = input?.tool_input ?? {}

  if (tool === 'Bash' || tool === 'PowerShell') {
    const command = String(args.command ?? '')
    const segments = command.split(/&&|\|\||[;|\n]/).map((s) => s.trim())
    for (const mine of MY_COMMANDS) {
      if (mine && segments.some((s) => s.startsWith(mine))) return mine
    }
    for (const [label, pattern] of SHELL_RULES) {
      if (pattern.test(command)) return label
    }
    return null
  }

  if (tool.startsWith('mcp__')) {
    const w = words(tool.split('__').slice(2).join('_'))
    if (MCP_LEADING_VERBS.has(w[0])) return tool
    if (w.some((x) => MCP_ANYWHERE.has(x))) return tool
    if (MCP_WRITE_VERBS.has(w[0]) && w.some((x) => MCP_OUTWARD_OBJECTS.has(x))) return tool
    // A database tool that runs SQL is judged by the SQL it carries.
    if (SQL_DELETE.test(JSON.stringify(args))) return `${tool}, database delete`
    return null
  }

  return null
}

function main() {
  let input
  try {
    input = JSON.parse(readFileSync(0, 'utf8'))
  } catch {
    // Claude Code always sends valid JSON. If it ever does not, pass through
    // and say so, rather than blocking every tool call.
    process.stderr.write('charter-lock: could not read the tool call, passing it through\n')
    process.exit(0)
  }

  const matched = classify(input)
  if (!matched) process.exit(0)

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'ask',
        permissionDecisionReason:
          `Your AI's Charter: this looks like sending, publishing, spending or deleting (${matched}). ` +
          'It is on the always-asks list, so it waits for your yes.',
      },
    })
  )
  process.exit(0)
}

main()
