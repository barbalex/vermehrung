import { expect, test } from '@playwright/test'
import { createHmac } from 'node:crypto'

// pins the tree following navigation: clicking a way-down element in a
// list view scrolls the nav tree's corresponding row into view (it always
// did on reload via the initial centering, but used to do nothing for
// later navigation)

const EMAIL = 'test@vermehrung.ch'
const PASSWORD = 'not-a-real-password'
const UID = 'e2e-test-uid'
const PERSON_ID = '0174bb08-6d27-7c48-8a52-7a5cef62f310'
const ART_ID = '0174bb08-6d26-7330-8a52-7a5cef62f310'
const AE_ART_ID = '0174bb08-6d26-7331-8a52-7a5cef62f310'
const ARTNAME = 'E2E-Sumpf-Distel'
const ROLE_ID = '0174bb08-6d26-7332-8a52-7a5cef62f310'
// one zaehlung per kultur, all on the same day: whichever kultur is
// clicked, its zaehlung tree row carries this label
const ZAEHLUNG_LABEL = '2026.05.15'

// enough kulturen to make the tree overflow its pane, so the deep rows
// are only rendered once the tree scrolls to them
const KULTUR_COUNT = 60
const hexId = (n: number) =>
  `0174bb08-6d27-7${n.toString(16).padStart(3, '0')}-8a52-7a5cef62f310`

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
  garten: Array.from({ length: KULTUR_COUNT }, (_, i) => ({
    id: hexId(0x100 + i),
    name: `E2e-Garten ${String(i + 1).padStart(2, '0')}`,
    person_id: PERSON_ID,
    _deleted: false,
    _conflicts: null,
    _revisions: null,
  })),
  kultur: Array.from({ length: KULTUR_COUNT }, (_, i) => ({
    id: hexId(0x200 + i),
    art_id: ART_ID,
    garten_id: hexId(0x100 + i),
    herkunft_id: null,
    zwischenlager: false,
    aktiv: true,
    _deleted: false,
    _conflicts: null,
    _revisions: null,
  })),
  kultur_option: Array.from({ length: KULTUR_COUNT }, (_, i) => ({
    id: hexId(0x200 + i),
    tk: false,
    _deleted: false,
    _conflicts: null,
    _revisions: null,
  })),
  zaehlung: Array.from({ length: KULTUR_COUNT }, (_, i) => ({
    id: hexId(0x300 + i),
    kultur_id: hexId(0x200 + i),
    datum: '2026-05-15',
    prognose: false,
    _deleted: false,
    _conflicts: null,
    _revisions: null,
  })),
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

test('tree scrolls to the active node when navigating from a list view', async ({
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
  await page.route('http://localhost:8090/**', (route) => {
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

  await page.goto('/Vermehrung/')
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
    timeout: 15_000,
  })
  await page.locator('#email').fill(EMAIL)
  await page.locator('#passwort').fill(PASSWORD)
  await page.getByRole('button', { name: 'anmelden' }).click()
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeHidden({
    timeout: 30_000,
  })

  const tree = page.locator('.tree-root')
  // any kultur whose row is rendered in both virtualized panes works; its
  // zaehlung still sits below the tree fold
  const KULTUR_TO_CLICK = 13
  const KULTUR_LABEL = `in: E2e-Garten ${String(KULTUR_TO_CLICK).padStart(2, '0')}`

  await test.step('the tree starts at the top', async () => {
    await page.goto('/Vermehrung/Arten')
    await expect(page.getByText(ARTNAME).first()).toBeVisible({ timeout: 60_000 })
    // the way-down zaehlung row is not rendered while the tree sits at
    // the top (the list is virtualized)
    await expect(tree.getByText(ZAEHLUNG_LABEL)).toHaveCount(0)
  })

  await test.step('navigate down entirely through list views', async () => {
    // the art row in the arten list opens the art form
    await page.getByText(ARTNAME).first().click()
    await expect(page).toHaveURL(new RegExp(`/Vermehrung/Arten/${ART_ID}/Art$`), {
      timeout: 20_000,
    })
    // the trail's object crumb leads to the art object list
    const trail = page.locator('nav[aria-label="Pfad"]')
    await trail.getByRole('link', { name: ARTNAME, exact: true }).click()
    await expect(page.getByTitle('Kulturen')).toBeVisible({ timeout: 60_000 })
    // the Kulturen folder row leads to the kulturen list
    await page.getByTitle('Kulturen').click()
    await expect(
      page.getByText('Kulturen', { exact: true }).first(),
    ).toBeVisible({ timeout: 60_000 })
    // the kultur row in the list: the data pane renders after the tree,
    // so .last() is the list row, not the tree row
    await page.getByText(KULTUR_LABEL).last().click()
    await expect(page).toHaveURL(
      /\/Vermehrung\/Arten\/[^/]+\/Kulturen\/[^/]+(\/Kultur)?\/?$/,
      { timeout: 20_000 },
    )
    // the kultur form does not carry the child tables - the trail's object
    // crumb leads to the kultur object list
    const kulturTrail = page.locator('nav[aria-label="Pfad"]')
    await kulturTrail.getByRole('link').last().click()
    await expect(page.getByTitle('Zählungen (1)')).toBeVisible({
      timeout: 60_000,
    })
    // the Zaehlungen folder row leads to the zaehlungen list
    await page.getByTitle('Zählungen (1)').click()
    // the zaehlung row - only the data pane shows it at this point
    const zaehlungRow = page.getByText(ZAEHLUNG_LABEL)
    await expect(zaehlungRow).toHaveCount(1)
    await zaehlungRow.click()
    await expect(page).toHaveURL(/\/Zaehlungen\/[^/]+(\/Zaehlung)?$/, {
      timeout: 20_000,
    })
  })

  await test.step('the tree has scrolled its row into view', async () => {
    // the row only renders when scrolled near it
    await expect(tree.getByText(ZAEHLUNG_LABEL)).toBeVisible({ timeout: 20_000 })
  })

  await test.step('a reload still centers the active node', async () => {
    await page.reload()
    await expect(tree.getByText(ZAEHLUNG_LABEL)).toBeVisible({ timeout: 60_000 })
  })
})
