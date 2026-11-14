import { execFileSync } from 'node:child_process'
import { expect, test } from '@playwright/test'

// Boots a REAL role session through the DEV-only ?devToken= mechanism
// (scripts/dev-token.mjs, see AGENTS.md "Testing roles"): no Firebase,
// real PostgREST, real row-level security. Unlike the other specs this
// needs the local backend (npm run backend) and skips everywhere else,
// so CI never runs it.

test('devToken url boots straight into the role and starts the sync', async ({
  page,
}) => {
  const backendUp = await fetch('http://localhost:8090/', {
    signal: AbortSignal.timeout(2000),
  })
    .then(() => true)
    .catch(() => false)
  test.skip(!backendUp, 'needs the local backend (npm run backend)')

  const out = execFileSync('node', ['scripts/dev-token.mjs', 'gaertner'], {
    encoding: 'utf-8',
  })
  const devToken = out.match(/\?devToken=(\S+)/)?.[1]
  expect(devToken).toBeTruthy()

  const firstSync = page.waitForResponse(
    (response) =>
      response.url().includes('/rpc/sync') && response.status() === 200,
    { timeout: 25_000 },
  )
  await page.goto(`/Vermehrung/?devToken=${devToken}`)
  await firstSync
  // the request must carry the minted role token, not a firebase-exchanged one
  expect(
    (await firstSync).request().headers()['authorization']?.includes(devToken),
  ).toBe(true)
  // the session navigates into the app and stays there - no login dialog
  await expect(page).toHaveURL(/\/Vermehrung/, { timeout: 15_000 })
  await page.waitForTimeout(3_000)
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toHaveCount(0)
  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
