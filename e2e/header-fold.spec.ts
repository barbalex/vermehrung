import { expect, test } from '@playwright/test'
import type { Route } from '@playwright/test'
import { createHmac } from 'node:crypto'

// Temporary verification for the responsive header folding:
// as the window narrows, Docu/Hamburger/Home fold first (existing),
// then ThemeChooser (<461), Account (<413) and Online (<365) fold into
// the more-menu too. Login and backend are mocked like local-first.spec.ts.

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

const moreMenuButton = (page: import('@playwright/test').Page) =>
  page.locator('header button[aria-controls="menu"]')
const onlineButton = (page: import('@playwright/test').Page) =>
  page.locator('header button[aria-label^="Sie sind"]')
const accountButton = (page: import('@playwright/test').Page) =>
  page.locator('header button[aria-label="Konto"]')
const themeButton = (page: import('@playwright/test').Page) =>
  page.locator('header button[aria-label^="Darstellung"]')

test('header folds ThemeChooser, Account and Online into the more-menu', async ({
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
  await page.route('http://localhost:8080/**', async (route: Route) => {
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
        body: JSON.stringify([{ id: PERSON_ID, user_role: { name: 'benutzer' } }]),
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
  await expect(page.getByText(ARTNAME).first()).toBeVisible({ timeout: 20_000 })

  await test.step('wide: nothing folds', async () => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await expect(moreMenuButton(page)).toHaveCount(0)
    await expect(onlineButton(page)).toBeVisible()
    await expect(accountButton(page)).toBeVisible()
    await expect(themeButton(page)).toBeVisible()
    await page.screenshot({ path: 'test-results/header-fold/1280.png' })
  })

  await test.step('500px: only Home/Docu/Hamburger fold (existing behaviour)', async () => {
    await page.setViewportSize({ width: 500, height: 800 })
    await expect(moreMenuButton(page)).toBeVisible()
    await expect(onlineButton(page)).toBeVisible()
    await expect(accountButton(page)).toBeVisible()
    await expect(themeButton(page)).toBeVisible()
    await moreMenuButton(page).click()
    await expect(page.getByRole('menuitem', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Dokumentation' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Menu', exact: true })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: /Darstellung/ })).toHaveCount(0)
    await expect(page.getByRole('menuitem', { name: 'Konto' })).toHaveCount(0)
    await expect(page.getByRole('menuitem', { name: /Sie sind/ })).toHaveCount(0)
    await page.screenshot({ path: 'test-results/header-fold/500-menu.png' })
    await page.keyboard.press('Escape')
  })

  await test.step('440px: ThemeChooser folds and cycles', async () => {
    await page.setViewportSize({ width: 440, height: 800 })
    await expect(themeButton(page)).toHaveCount(0)
    await moreMenuButton(page).click()
    const themeItem = page.getByRole('menuitem', { name: /Darstellung/ })
    await expect(themeItem).toBeVisible()
    // cycles system > light; the menu stays open and the label updates
    await themeItem.click()
    await expect(page.getByRole('menuitem', { name: 'Darstellung: hell' })).toBeVisible()
    await page.screenshot({ path: 'test-results/header-fold/440-menu.png' })
    await page.keyboard.press('Escape')
  })

  await test.step('400px: Account folds, Konto opens the account menu', async () => {
    await page.setViewportSize({ width: 400, height: 800 })
    await expect(accountButton(page)).toHaveCount(0)
    await moreMenuButton(page).click()
    await page.getByRole('menuitem', { name: 'Konto' }).click()
    await expect(page.getByRole('menuitem', { name: /abmelden$/ })).toBeVisible()
    await page.screenshot({ path: 'test-results/header-fold/400-account.png' })
    // once for the nested account menu, once for the more-menu
    await page.keyboard.press('Escape')
    await page.keyboard.press('Escape')
  })

  await test.step('350px: Online folds, item navigates and closes the menu', async () => {
    await page.setViewportSize({ width: 350, height: 800 })
    await expect(onlineButton(page)).toHaveCount(0)
    await moreMenuButton(page).click()
    await page.getByRole('menuitem', { name: /Sie sind/ }).click()
    await expect(page).toHaveURL(/\/Vermehrung\/ausstehende-Operationen$/)
    await expect(page.getByRole('menuitem', { name: /Sie sind/ })).toHaveCount(0)
    await page.screenshot({ path: 'test-results/header-fold/350.png' })
  })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
