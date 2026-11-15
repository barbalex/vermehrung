import { expect, test } from '@playwright/test'
import { createHmac } from 'node:crypto'

// Pins the linkable search params (modules/searchSync.ts):
// - opening the filter pane writes filter=1, editing a filter field
//   writes f.<table>.<field>=<value> (diff-encoded)
// - tree/breadcrumb navigation keeps the query string
// - a tab click writes ftab=<tab>
// - reloading such a url reproduces the view (pane open, tab, values)
// - back to a url without the params reverts pane and filters

const EMAIL = 'test@vermehrung.ch'
const PASSWORD = 'not-a-real-password'
const UID = 'e2e-test-uid'
const PERSON_ID = '0174bb08-6d26-7c48-8a52-7a5cef62f310'
const ART_ID = '0174bb08-6d26-7330-8a52-7a5cef62f310'
const AE_ART_ID = '0174bb08-6d26-7331-8a52-7a5cef62f310'
const ARTNAME = 'E2E-Sumpf-Distel'
const ROLE_ID = '0174bb08-6d26-7332-8a52-7a5cef62f310'

const b64 = (payload: object) =>
  Buffer.from(JSON.stringify(payload)).toString('base64url')
const mint = (payload: object) => {
  const header = b64({ alg: 'HS256', typ: 'JWT' })
  const body = b64(payload)
  const signature = createHmac('sha256', 'e2e-secret')
    .update(`${header}.${body}`)
    .digest('base64url')
  return `${header}.${body}.${signature}`
}
const nowEpoch = () => Math.floor(Date.now() / 1000)
const idToken = () =>
  mint({
    sub: UID,
    user_id: UID,
    email: EMAIL,
    email_verified: true,
    aud: 'vermehrung-e2e',
    iss: 'https://securetoken.google.com/vermehrung-e2e',
    iat: nowEpoch(),
    exp: nowEpoch() + 3600,
    auth_time: nowEpoch(),
    firebase: { sign_in_provider: 'password', identities: {} },
  })
const apiToken = () =>
  mint({
    role: 'benutzer',
    user_id: PERSON_ID,
    sub: UID,
    exp: nowEpoch() + 3600,
  })

const fullSync = () => ({
  synced_at: nowEpoch(),
  ae_art: [
    { id: AE_ART_ID, name: ARTNAME, _conflicts: null, _revisions: null },
  ],
  art: [
    {
      id: ART_ID,
      ae_id: AE_ART_ID,
      apflora_ap: true,
      _deleted: false,
      _conflicts: null,
      _revisions: null,
    },
  ],
  person: [
    {
      id: PERSON_ID,
      account_id: UID,
      user_role_id: ROLE_ID,
      vorname: 'E2e',
      name: 'Tester',
      email: EMAIL,
      _deleted: false,
      _conflicts: null,
      _revisions: null,
    },
  ],
  user_role: [{ id: ROLE_ID, name: 'benutzer', sort: 1 }],
})

test('filter state is linkable via search params', async ({ page }) => {
  test.setTimeout(120_000)

  await page.route('**/identitytoolkit.googleapis.com/**', (route) => {
    const { pathname } = new URL(route.request().url())
    if (pathname.endsWith('accounts:signInWithPassword')) {
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          localId: UID,
          email: EMAIL,
          idToken: idToken(),
          refreshToken: 'e2e-refresh-token',
          expiresIn: '3600',
          registered: true,
        }),
      })
    }
    return route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        users: [{ localId: UID, email: EMAIL, emailVerified: true }],
      }),
    })
  })
  await page.route('**/securetoken.googleapis.com/**', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: idToken(),
        id_token: idToken(),
        refresh_token: 'e2e-refresh-token',
        expires_in: '3600',
        user_id: UID,
        project_id: 'vermehrung-e2e',
        token_type: 'Bearer',
      }),
    }),
  )
  await page.route('http://localhost:7010/events', (route) => route.abort())
  await page.route('http://localhost:7010/token', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ token: apiToken() }),
    }),
  )
  const syncCalls: number[] = []
  await page.route('http://localhost:8090/**', (route) => {
    const url = new URL(route.request().url())
    if (url.pathname === '/rpc/sync') {
      syncCalls.push(Date.now())
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(fullSync()),
      })
    }
    if (url.pathname === '/person') {
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          { id: PERSON_ID, user_role: { name: 'benutzer' } },
        ]),
      })
    }
    return route.fulfill({ status: 404, body: 'unmocked' })
  })

  await page.goto('/Vermehrung/Arten')
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
    timeout: 15_000,
  })
  await page.locator('#email').fill(EMAIL)
  await page.locator('#passwort').fill(PASSWORD)
  await page.getByRole('button', { name: 'anmelden' }).click()
  // wait for login + initial sync + the rows to reach the ui
  await expect
    .poll(() => syncCalls.length, { timeout: 30_000 })
    .toBeGreaterThan(0)
  await expect(page.getByText(ARTNAME).first()).toBeVisible({
    timeout: 30_000,
  })
  // a clean boot keeps a clean url
  await expect(page).toHaveURL(/\/Vermehrung\/Arten$/)

  await test.step('opening the pane and editing a field write params', async () => {
    await page.getByRole('button', { name: 'Filter', exact: true }).click()
    await expect(page.getByText('Art Filter')).toBeVisible()
    await expect(page).toHaveURL(/\/Vermehrung\/Arten\?filter=1$/)

    const avField = page.getByLabel('Artverantwortlich in AP Flora')
    await avField.fill('x')
    await avField.press('Enter')
    await expect(page).toHaveURL(
      /\/Vermehrung\/Arten\?filter=1&f\.art\.apflora_av=x$/,
    )
  })

  await test.step('a tab click writes ftab', async () => {
    await page.getByRole('tab', { name: 'Sammlung' }).click()
    await expect(page.getByText('Sammlung Filter')).toBeVisible()
    await expect(page).toHaveURL(/ftab=sammlung$/)
  })

  await test.step('navigation keeps the query string', async () => {
    await page
      .locator('nav[aria-label="Pfad"]')
      .getByRole('link', { name: 'Vermehrung' })
      .click()
    await expect(page).toHaveURL(
      /\/Vermehrung\/\?filter=1&f\.art\.apflora_av=x&ftab=sammlung$/,
    )
  })

  await test.step('reloading the url reproduces the view', async () => {
    await page.reload()
    // with the mocks active the firebase session usually survives the
    // reload - log in again only if the dialog reappears
    const loginDialog = page.getByRole('dialog', { name: 'Anmeldung' })
    await expect(loginDialog.or(page.getByText('Sammlung Filter'))).toBeVisible(
      { timeout: 30_000 },
    )
    if (await loginDialog.isVisible()) {
      await page.locator('#email').fill(EMAIL)
      await page.locator('#passwort').fill(PASSWORD)
      await page.getByRole('button', { name: 'anmelden' }).click()
    }
    // the url reproduces the view: pane open on the linked tab
    await expect(page.getByText('Sammlung Filter')).toBeVisible({
      timeout: 30_000,
    })
    // the url-applied filter value survived the reload
    await page.getByRole('tab', { name: 'Art', exact: true }).click()
    await expect(page.getByText('Art Filter')).toBeVisible()
    await expect(page.getByLabel('Artverantwortlich in AP Flora')).toHaveValue(
      'x',
    )
  })

  await test.step('back to a param-less url reverts pane and filters', async () => {
    // history: param-less Arten <- Arten?filter=1 <- Vermehrung/?filter=1
    await page.goBack()
    await expect(page).toHaveURL(/Arten\?filter=1&f\.art\.apflora_av=x/)
    // the tab follows the url's ftab back to sammlung
    await expect(page.getByText('Sammlung Filter')).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(/\/Vermehrung\/Arten$/)
    await expect(page.getByText('Art Filter')).toHaveCount(0)
    await expect(page.getByText(ARTNAME).first()).toBeVisible()
  })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
