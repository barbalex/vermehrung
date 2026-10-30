import { expect, test } from '@playwright/test'
import type { Route } from '@playwright/test'
import { createHmac } from 'node:crypto'

// Pins the browser-only seams of the local-first (PostgREST) migration
// that the api-level tests (npm run test:api) cannot reach - exactly
// the places where the three migration-day bugs lived:
// 1. the role lookup must embed user_role(name) (PostgREST names embeds
//    after the target table, not after the junction like Hasura did)
// 2. /rpc/sync args must be wrapped in p_since
// 3. a fresh login must reset the sync cursors, else the wiped local
//    database stays empty forever
// Plus the offline-boot path: the app must render cached data and open
// datasets with no network at all.
//
// Everything network is mocked via page.route: firebase identity
// toolkit (a real firebase session in the browser, just with our
// tokens), the auth service's /token endpoint and PostgREST. No
// backend and no real credentials are needed.

const EMAIL = 'test@vermehrung.ch'
const PASSWORD = 'not-a-real-password'
const UID = 'e2e-test-uid'
const PERSON_ID = '0174bb08-6d26-7c48-8a52-7a5cef62f310'
const ART_ID = '0174bb08-6d26-7330-8a52-7a5cef62f310'
const AE_ART_ID = '0174bb08-6d26-7331-8a52-7a5cef62f310'
const ARTNAME = 'E2E-Sumpf-Distel'
const ROLE_ID = '0174bb08-6d26-7332-8a52-7a5cef62f310'

// ---- token mints (nothing verifies the signatures - the api is mocked)
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

test('local-first: login, sync, offline boot, re-login resets cursors', async ({
  page,
}) => {
  test.setTimeout(180_000)

  // offline emulation: like in production (where the service worker
  // serves the assets), only the backend calls fail while the app
  // itself loads. navigator.onLine is spoofed via localStorage flag so
  // the app's isOnline() takes the offline path, and the route guard
  // below aborts every backend request
  await page.addInitScript(() => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => window.localStorage.getItem('e2e-offline') !== '1',
    })
  })
  // taking the mock backend offline from within the handlers: all
  // backend requests are aborted while the dev server stays reachable
  let offline = false

  const setAppOffline = async (value: boolean) => {
    offline = value
    await page.evaluate((v) => {
      window.localStorage.setItem('e2e-offline', v ? '1' : '0')
    }, value)
  }

  const guard = async (route: Route) => {
    if (offline) await route.abort('connectionfailed')
    return offline
  }

  const personUrls: string[] = []
  const syncBodies: { p_since?: Record<string, number> }[] = []

  // the rows a fresh login's initial sync delivers - enough for the
  // Arten list to show one row with its label
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

  // firebase identity toolkit: the signIn the login dialog triggers,
  // plus token refreshes and lookups on later boots
  await page.route('**/identitytoolkit.googleapis.com/**', async (route) => {
    if (await guard(route)) return
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

  // securetoken: token refreshes for restored sessions
  await page.route('**/securetoken.googleapis.com/**', async (route) => {
    if (await guard(route)) return
    return route.fulfill({
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
    })
  })

  // the auth service: exchanges the firebase id token for the api jwt
  await page.route('http://localhost:7010/token', async (route) => {
    if (await guard(route)) return
    return route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ token: apiToken() }),
    })
  })

  // PostgREST
  await page.route('http://localhost:8090/**', async (route) => {
    if (await guard(route)) return
    const url = new URL(route.request().url())

    if (url.pathname === '/rpc/sync') {
      syncBodies.push(route.request().postDataJSON())
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(fullSync()),
      })
    }

    if (url.pathname === '/person') {
      personUrls.push(url.toString())
      // replicate PostgREST's error for the wrong (Hasura) embed name:
      // with person_user_role the app retries forever and no data loads
      if (!url.searchParams.get('select')?.includes('user_role(name)')) {
        return route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            code: 'PGRST200',
            message:
              "Could not find a relationship between 'person' and 'person_user_role'",
          }),
        })
      }
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          { id: PERSON_ID, user_role: { name: 'benutzer' } },
        ]),
      })
    }

    return route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ message: `unmocked api path ${url.pathname}` }),
    })
  })

  await test.step('login loads initial data', async () => {
    await page.goto('/Vermehrung/')
    await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
      timeout: 15_000,
    })
    await page.locator('#email').fill(EMAIL)
    await page.locator('#passwort').fill(PASSWORD)
    await page.getByRole('button', { name: 'anmelden' }).click()

    // 1. the role lookup embeds user_role(name) - PostgREST names
    //    embeds after the target table
    await expect
      .poll(
        () => personUrls.some((u) => u.includes('select=id,user_role(name)')),
        { timeout: 20_000 },
      )
      .toBe(true)

    // 2. the sync args are wrapped in p_since and the fresh login
    //    starts from zero cursors
    await expect
      .poll(() => syncBodies.length, { timeout: 20_000 })
      .toBeGreaterThan(0)
    const firstSync = syncBodies[0]
    expect(firstSync).toHaveProperty('p_since')
    expect(Object.values(firstSync.p_since).every((v) => v === 0)).toBe(true)

    // the synced rows reach the ui
    await page.goto('/Vermehrung/Arten')
    await expect(page.getByText(ARTNAME).first()).toBeVisible({
      timeout: 20_000,
    })
  })

  await test.step('later polls advance the cursors', async () => {
    await expect
      .poll(() => syncBodies.filter((b) => b.p_since?.ae_art > 0).length, {
        timeout: 20_000,
      })
      .toBeGreaterThan(0)
  })

  await test.step('offline: the app boots from cached data', async () => {
    // let Loki's autosave (500ms interval) commit the last writes
    // before the reload discards the page
    await page.waitForTimeout(1500)
    await setAppOffline(true)
    await page.reload()
    // no network at all - the cached rows still render
    await expect(page.getByText(ARTNAME).first()).toBeVisible({
      timeout: 20_000,
    })
    // ...and the dataset opens: data forms must not wait for the
    // initial query while offline.
    // with breadcrumbs enabled the tree row opens the form directly
    // (url suffix '/Art')
    await page.getByText(ARTNAME).first().click()
    await expect(page).toHaveURL(
      new RegExp(`/Vermehrung/Arten/${ART_ID}/Art$`),
    )
    await expect(page.getByText('Art', { exact: true }).first()).toBeVisible({
      timeout: 20_000,
    })
  })

  await test.step('back online: syncing continues from the watermark', async () => {
    const syncCountBefore = syncBodies.length
    await setAppOffline(false)
    await expect
      .poll(() => syncBodies.length, { timeout: 30_000 })
      .toBeGreaterThan(syncCountBefore)
    const lastSync = syncBodies[syncBodies.length - 1]
    // the cursors were not reset: the offline phase continues where it
    // stopped, no full resync
    expect(lastSync.p_since.ae_art).toBeGreaterThan(0)
  })

  await test.step('logout, then re-login syncs from zero cursors', async () => {
    // the logout wiped the local database - if the cursors survived
    // that (the migration-day bug), the next sync delivers nothing and
    // the app stays empty forever
    await page.getByRole('button', { name: 'Konto' }).click()
    await page.getByRole('menuitem', { name: /abmelden$/ }).click()
    await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
      timeout: 20_000,
    })

    const syncCountBefore = syncBodies.length
    await page.locator('#email').fill(EMAIL)
    await page.locator('#passwort').fill(PASSWORD)
    await page.getByRole('button', { name: 'anmelden' }).click()
    await expect
      .poll(() => syncBodies.length, { timeout: 30_000 })
      .toBeGreaterThan(syncCountBefore)
    const reloginSync = syncBodies[syncCountBefore]
    expect(Object.values(reloginSync.p_since).every((v) => v === 0)).toBe(true)

    // and the data comes back
    await page.goto('/Vermehrung/Arten')
    await expect(page.getByText(ARTNAME).first()).toBeVisible({
      timeout: 20_000,
    })
  })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
