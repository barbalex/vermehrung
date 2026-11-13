import { expect, test } from '@playwright/test'
import type { Route } from '@playwright/test'
import { createHmac } from 'node:crypto'

// pins the url-driven history flow end to end: the history button
// appends '/histories' to the FORM url, the history component fetches
// the prior revisions, adds the newest rev to the url and renders the
// revision slider. Sliding and closing navigate back within the form
// url - all of these must keep the breadcrumbs form suffix ('/Art'),
// which is not part of activeNodeArray (regression: with urls built
// from activeNodeArray the form closed and the history never rendered)
//
// Everything network is mocked via page.route like in local-first.spec.ts

const EMAIL = 'test@vermehrung.ch'
const PASSWORD = 'not-a-real-password'
const UID = 'e2e-test-uid'
const PERSON_ID = '0174bb08-6d26-7c48-8a52-7a5cef62f310'
const ART_ID = '0174bb08-6d26-7330-8a52-7a5cef62f310'
const AE_ART_ID = '0174bb08-6d26-7331-8a52-7a5cef62f310'
const ARTNAME = 'E2E-Sumpf-Distel'
const ROLE_ID = '0174bb08-6d26-7332-8a52-7a5cef62f310'

const REV_CURRENT = '1-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa01'
const REV_PRIOR_NEW = '0-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb02'
const REV_PRIOR_OLD = '0-cccccccccccccccccccccccccccccc03'

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
    firebase: {
      sign_in_provider: 'password',
      identities: {},
      sign_in_second_factor: null,
    },
  })
const apiToken = () =>
  mint({
    role: 'benutzer',
    user_id: PERSON_ID,
    sub: UID,
    email: EMAIL,
    exp: nowEpoch() + 3600,
  })

test('history: open, slide and close within the form url', async ({ page }) => {
  test.setTimeout(120_000)

  const artRevRequests: string[] = []

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
        _rev: REV_CURRENT,
        _depth: 1,
        _revisions: [REV_CURRENT, REV_PRIOR_NEW, REV_PRIOR_OLD],
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

  await page.route('**/identitytoolkit.googleapis.com/**', async (route) => {
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

  await page.route('**/securetoken.googleapis.com/**', async (route) =>
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

  // the SSE change signal is not exercised here - abort it, so the
  // reconnect backoff runs against the mock instead of a real server
  await page.route('http://localhost:7010/events', (route) => route.abort())
  await page.route('http://localhost:7010/token', async (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ token: apiToken() }),
    }),
  )

  await page.route('http://localhost:8090/**', async (route: Route) => {
    const url = new URL(route.request().url())

    if (url.pathname === '/rpc/sync') {
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

    if (url.pathname === '/art_rev') {
      artRevRequests.push(url.toString())
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '0174bb08-0000-7000-8000-000000000001',
            art_id: ART_ID,
            ae_id: AE_ART_ID,
            set: null,
            apflora_av: false,
            apflora_ap: true,
            changed: '2026-10-01T10:00:00Z',
            changed_by: EMAIL,
            _rev: REV_PRIOR_NEW,
            _parent_rev: null,
            _revisions: [REV_PRIOR_NEW],
            _depth: 1,
            _deleted: false,
          },
          {
            id: '0174bb08-0000-7000-8000-000000000002',
            art_id: ART_ID,
            ae_id: AE_ART_ID,
            set: null,
            apflora_av: false,
            apflora_ap: false,
            changed: '2026-09-01T10:00:00Z',
            changed_by: EMAIL,
            _rev: REV_PRIOR_OLD,
            _parent_rev: null,
            _revisions: [REV_PRIOR_OLD],
            _depth: 0,
            _deleted: false,
          },
        ]),
      })
    }

    return route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ message: `unmocked api path ${url.pathname}` }),
    })
  })

  await page.setViewportSize({ width: 1400, height: 900 })
  await page.goto('/Vermehrung/')
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
    timeout: 15_000,
  })
  await page.locator('#email').fill(EMAIL)
  await page.locator('#passwort').fill(PASSWORD)
  await page.getByRole('button', { name: 'anmelden' }).click()
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeHidden({
    timeout: 20_000,
  })

  // open the art form via the tree row (the /Art suffix only sticks
  // when opened through the tree, see local-first.spec.ts)
  await page.goto('/Vermehrung/Arten')
  await expect(page.getByText(ARTNAME).first()).toBeVisible({
    timeout: 20_000,
  })
  await page.getByText(ARTNAME).first().click()
  await expect(page).toHaveURL(new RegExp(`/Vermehrung/Arten/${ART_ID}/Art$`), {
    timeout: 20_000,
  })

  // opening the history keeps the form url and appends /histories
  await page
    .getByRole('button', { name: 'Frühere Versionen anzeigen', exact: true })
    .click()
  await expect(page).toHaveURL(
    new RegExp(`/Vermehrung/Arten/${ART_ID}/Art/histories$`),
    { timeout: 10_000 },
  )

  // the revisions are fetched and the newest prior rev lands in the url
  await expect
    .poll(() => artRevRequests.length, { timeout: 10_000 })
    .toBeGreaterThan(0)
  await expect(page).toHaveURL(
    new RegExp(`/Vermehrung/Arten/${ART_ID}/Art/histories/${REV_PRIOR_NEW}$`),
    { timeout: 10_000 },
  )

  // the revision slider renders with both revision rows and navigation
  await expect(
    page.getByRole('button', { name: 'ältere Version', exact: true }),
  ).toBeVisible({ timeout: 10_000 })
  await expect(page.getByText('Historische Version').first()).toBeVisible({
    timeout: 10_000,
  })

  // sliding to the older revision navigates within the form url
  await page
    .getByRole('button', { name: 'ältere Version', exact: true })
    .click()
  await expect(page).toHaveURL(
    new RegExp(`/Vermehrung/Arten/${ART_ID}/Art/histories/${REV_PRIOR_OLD}$`),
    { timeout: 10_000 },
  )

  // closing the history returns to the form
  await page
    .getByRole('button', { name: 'Frühere Versionen ausblenden', exact: true })
    .click()
  await expect(page).toHaveURL(new RegExp(`/Vermehrung/Arten/${ART_ID}/Art$`), {
    timeout: 10_000,
  })
  // the form is still open, not the art overview
  await expect(
    page.getByRole('button', {
      name: 'Frühere Versionen anzeigen',
      exact: true,
    }),
  ).toBeVisible({ timeout: 10_000 })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
