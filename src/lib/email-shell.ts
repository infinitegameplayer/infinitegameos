// Shared HTML email shell. One layout, two render modes:
// - Transactional: caller passes a per-recipient signed unsubscribeUrl
// - Broadcast: caller passes the Resend placeholder `{{{RESEND_UNSUBSCRIBE_URL}}}`
// The shell preserves typography, button styling, and footer treatment so
// welcome (transactional) and marketing Broadcast mail stay visually consistent.

const SITE_URL = 'https://www.infinitegameos.io'
// CAN-SPAM physical address. Mail reaches the box under Lane Belone and Side
// Quest Trust, so the display name stays brand-aligned and the address stays legal.
const POSTAL_ADDRESS = 'Infinite Game OS, PO Box 6128, Colorado Springs, CO 80934'

export type EmailShellOptions = {
  body: string
  unsubscribeUrl: string
  preview?: string
  // Per-recipient "manage preferences" link. Transactional callers pass an
  // expiring-token link, the broadcast caller passes a tokenless
  // {{{contact.email}}} merge link that lands on the secure fresh-link fallback.
  preferencesUrl?: string
}

export function renderEmailShell({ body, unsubscribeUrl, preview, preferencesUrl }: EmailShellOptions): string {
  const previewBlock = preview
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${preview}</div>`
    : ''
  const preferencesFragment = preferencesUrl
    ? ` &middot; <a href="${preferencesUrl}" style="color:rgba(34,211,238,0.6);text-decoration:none">manage preferences</a>`
    : ''
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background-color:#06090e;color:#e2e8f0;font-family:'Inter',Arial,sans-serif;font-size:16px;line-height:1.75">
  ${previewBlock}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#06090e">
    <tr>
      <td align="center" style="padding:40px 20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
          <tr>
            <td style="color:#e2e8f0;font-family:'Inter',Arial,sans-serif;font-size:16px;line-height:1.75">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding-top:36px;border-top:1px solid rgba(226,232,240,0.07)">
              <p style="margin:0;font-size:13px;color:rgba(226,232,240,0.45);font-family:Arial,sans-serif">
                Infinite Game OS &middot; <a href="${SITE_URL}" style="color:rgba(34,211,238,0.7);text-decoration:none">infinitegameos.io</a>${preferencesFragment} &middot; <a href="${unsubscribeUrl}" style="color:rgba(34,211,238,0.6);text-decoration:none">one-click unsubscribe</a>
              </p>
              <p style="margin:10px 0 0;font-size:12px;color:rgba(226,232,240,0.3);font-family:Arial,sans-serif">
                ${POSTAL_ADDRESS}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
