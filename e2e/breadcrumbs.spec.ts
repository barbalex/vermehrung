import { expect, test } from '@playwright/test'
import { createHmac } from 'node:crypto'

// Pins the breadcrumbs strip (ps-style, always visible) that replaces the
// nav buttons in form title bars - see src/utils/breadcrumbsEnabled.ts:
// - the strip shows the full path of the active node, folders and row labels
// - crumbs navigate to their prefix path
// - the form title bars no longer render nav buttons

const EMAIL = 'test@vermehrung.ch'
const PASSWORD = 'not-a-real-password'
const UID = 'e2e-test-uid'
const PERSON_ID = '0174bb08-6d26-7c48-8a52-7a5cef62f310'
const ART_ID = '0174bb08-6d26-7330-8a52-7a5cef62f310'
const AE_ART_ID = '0174bb08-6d26-7331-8a52-7a5cef62f310'
const ARTNAME = 'E2E-Sumpf-Distel'
const ROLE_ID = '0174bb08-6d26-7332-8a52-7a5cef62f310'
const KULTUR_ID = '0174bb08-6d26-7333-8a52-7a5cef62f310'
const ZAEHLUNG_ID = '0174bb08-6d26-7334-8a52-7a5cef62f310'

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
  mint({ role: 'benutzer', user_id: PERSON_ID, sub: UID, exp: nowEpoch() + 3600 })

const fullSync = () => ({
  synced_at: nowEpoch(),
  ae_art: [{ id: AE_ART_ID, name: ARTNAME, _conflicts: null, _revisions: null }],
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
  kultur: [
    {
      id: KULTUR_ID,
      art_id: ART_ID,
      garten_id: null,
      herkunft_id: null,
      zwischenlager: false,
      _deleted: false,
      _conflicts: null,
      _revisions: null,
    },
  ],
  kultur_option: [
    {
      id: KULTUR_ID,
      tk: false,
      _deleted: false,
      _conflicts: null,
      _revisions: null,
    },
  ],
  zaehlung: [
    {
      id: ZAEHLUNG_ID,
      kultur_id: KULTUR_ID,
      datum: '2023-06-12',
      prognose: false,
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

test('breadcrumbs strip replaces the form header nav buttons', async ({
  page,
}) => {
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
  await page.route('http://localhost:7000/token', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ token: apiToken() }),
    }),
  )
  const syncCalls: number[] = []
  await page.route('http://localhost:8080/**', (route) => {
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
        body: JSON.stringify([{ id: PERSON_ID, user_role: { name: 'benutzer' } }]),
      })
    }
    return route.fulfill({ status: 404, body: 'unmocked' })
  })

  await page.goto('/Vermehrung/')
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
    timeout: 15_000,
  })
  await page.locator('#email').fill(EMAIL)
  await page.locator('#passwort').fill(PASSWORD)
  await page.getByRole('button', { name: 'anmelden' }).click()
  // wait for login + initial sync
  await expect
    .poll(() => syncCalls.length, { timeout: 30_000 })
    .toBeGreaterThan(0)

  // wait for the synced rows to reach the ui
  await page.goto('/Vermehrung/Arten')
  await expect(page.getByText(ARTNAME).first()).toBeVisible({
    timeout: 30_000,
  })

  const trail = page.locator('nav[aria-label="Pfad"]')

  await test.step('root: the strip shows only Vermehrung', async () => {
    await page.goto('/Vermehrung/')
    await expect(trail).toBeVisible()
    // the trail first renders the persisted path, then corrects to the url
    await expect(trail.locator('a')).toHaveCount(0, { timeout: 60_000 })
    await expect(trail.getByText('Vermehrung')).toBeVisible()
  })

  await test.step('list: the folder is the last crumb', async () => {
    await page.goto(`/Vermehrung/Arten/${ART_ID}/Kulturen`)
    await expect(trail.getByRole('link', { name: ARTNAME, exact: true })).toBeVisible(
      { timeout: 60_000 },
    )
    await expect(trail.getByRole('link', { name: 'Vermehrung' })).toBeVisible()
    await expect(trail.getByRole('link', { name: 'Arten' })).toBeVisible()
    await expect(trail.getByText('Kulturen', { exact: true })).toBeVisible()
    await expect(trail.locator('a')).toHaveCount(3)
  })

  await test.step('deep form: full path, no nav buttons', async () => {
    await page.goto(
      `/Vermehrung/Arten/${ART_ID}/Kulturen/${KULTUR_ID}/Zaehlungen/${ZAEHLUNG_ID}`,
    )
    await expect(trail.getByRole('link', { name: 'Zählungen' })).toBeVisible({
      timeout: 60_000,
    })
    // row labels resolve from the local db
    await expect(trail.getByText(/2023\.06\.12/, { exact: false })).toBeVisible(
      { timeout: 60_000 },
    )
    await expect(trail.locator('a')).toHaveCount(6)
    // the zaehlung form title has no up button any more
    await expect(page.locator('button[title="Zur Liste"]')).toHaveCount(0)
    await expect(
      page.locator('button[title="Zur Kultur-Liste"]'),
    ).toHaveCount(0)
  })

  await test.step('crumbs navigate to their prefix path', async () => {
    await trail.getByRole('link', { name: 'Kulturen' }).click()
    await expect(page).toHaveURL(
      new RegExp(`/Vermehrung/Arten/${ART_ID}/Kulturen$`),
    )
    await trail.getByRole('link', { name: ARTNAME, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/Vermehrung/Arten/${ART_ID}$`))
    await trail.getByRole('link', { name: 'Arten' }).click()
    await expect(page).toHaveURL(/\/Vermehrung\/Arten$/)
    await trail.getByRole('link', { name: 'Vermehrung' }).click()
    await expect(page).toHaveURL(/\/Vermehrung\/?$/)
  })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
