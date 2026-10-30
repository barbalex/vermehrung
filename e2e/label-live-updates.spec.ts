import { expect, test } from '@playwright/test'
import { createHmac } from 'node:crypto'

// Pins live label updates: editing a row's label-relevant columns must
// update every place the label is rendered - the nav tree row and the
// breadcrumb crumb - without a reload. (The tree rebuilds only when one
// of its per-table observeWithColumns triggers fires; the breadcrumb
// observes the row itself.)

const EMAIL = 'test@vermehrung.ch'
const PASSWORD = 'not-a-real-password'
const UID = 'e2e-test-uid'
const PERSON_ID = '0174bb08-6d26-7c48-8a52-7a5cef62f310'
const ART_ID = '0174bb08-6d26-7330-8a52-7a5cef62f310'
const AE_ART_ID = '0174bb08-6d26-7331-8a52-7a5cef62f310'
const ARTNAME = 'E2E-Sumpf-Distel'
const ROLE_ID = '0174bb08-6d26-7332-8a52-7a5cef62f310'
const KULTUR_ID = '0174bb08-6d26-7333-8a52-7a5cef62f310'
const BEDARF_ID = '0174bb08-6d26-7340-8a52-7a5cef62f310'
const INITIAL_LABEL = '2024: Anfang'
const NEW_JAHR_LABEL = '2026: Anfang'
const NEW_BESCHREIBUNG_LABEL = '2026: Ende'

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
  bedarf: [
    {
      id: BEDARF_ID,
      kultur_id: KULTUR_ID,
      person_id: null,
      jahr: 2024,
      beschreibung: 'Anfang',
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

test('editing label columns updates tree row and breadcrumb live', async ({
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
  await page.route('http://localhost:7010/token', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ token: apiToken() }),
    }),
  )
  // the first sync delivers all rows, later polls return an empty delta -
  // otherwise they would clobber the local edit once its revision flushed
  let syncCalls = 0
  await page.route('http://localhost:8090/**', (route) => {
    const url = new URL(route.request().url())
    if (url.pathname === '/rpc/sync') {
      syncCalls += 1
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(syncCalls === 1 ? fullSync() : { synced_at: nowEpoch() }),
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
    .poll(() => syncCalls, { timeout: 30_000 })
    .toBeGreaterThan(0)

  // open the bedarf form; the url path opens the tree nodes along it
  await page.goto(
    `/Vermehrung/Arten/${ART_ID}/Kulturen/${KULTUR_ID}/Bedarf/${BEDARF_ID}`,
  )
  const trail = page.locator('nav[aria-label="Pfad"]')
  const tree = page.locator('.tree-root')
  await expect(trail.getByText(INITIAL_LABEL)).toBeVisible({ timeout: 60_000 })
  await expect(tree.getByText(INITIAL_LABEL)).toBeVisible({ timeout: 60_000 })

  await test.step('editing jahr updates the labels live', async () => {
    await page.locator('#Jahr').fill('2026')
    await page.locator('#Jahr').press('Tab')
    await expect(trail.getByText(NEW_JAHR_LABEL)).toBeVisible({
      timeout: 15_000,
    })
    await expect(tree.getByText(NEW_JAHR_LABEL)).toBeVisible({
      timeout: 15_000,
    })
  })

  await test.step('editing beschreibung updates the labels live', async () => {
    await page.locator('#Beschreibung').fill('Ende')
    await page.locator('#Beschreibung').press('Tab')
    await expect(trail.getByText(NEW_BESCHREIBUNG_LABEL)).toBeVisible({
      timeout: 15_000,
    })
    await expect(tree.getByText(NEW_BESCHREIBUNG_LABEL)).toBeVisible({
      timeout: 15_000,
    })
    // the stale label is gone from both places
    await expect(trail.getByText(INITIAL_LABEL)).toHaveCount(0)
    await expect(tree.getByText(INITIAL_LABEL)).toHaveCount(0)
  })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
