import { expect, test } from '@playwright/test'
import { createHmac } from 'node:crypto'

// Pins the apf2-style object lists behind breadcrumbsEnabled:
// - an object url renders the object itself + its child tables (tree order)
// - the object's form renders at .../{id}/{Name}
// - leaf objects (zaehlung) render their form directly
// - tree clicks open the form directly
// - the breadcrumbs strip ends with the object name crumb

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
const GARTEN_ID = '0174bb08-6d26-7335-8a52-7a5cef62f310'
const KULTUR2_ID = '0174bb08-6d26-7336-8a52-7a5cef62f310'
const ZAEHLUNG2_ID = '0174bb08-6d26-7337-8a52-7a5cef62f310'

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
      aktiv: true,
      _deleted: false,
      _conflicts: null,
      _revisions: null,
    },
    {
      id: KULTUR2_ID,
      art_id: null,
      garten_id: GARTEN_ID,
      herkunft_id: null,
      zwischenlager: false,
      aktiv: true,
      _deleted: false,
      _conflicts: null,
      _revisions: null,
    },
  ],
  garten: [
    {
      id: GARTEN_ID,
      name: 'E2e-Garten',
      person_id: PERSON_ID,
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
    {
      id: KULTUR2_ID,
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
    {
      id: ZAEHLUNG2_ID,
      kultur_id: KULTUR2_ID,
      datum: '2024-03-02',
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

test('object urls render apf2-style object lists', async ({ page }) => {
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
  await page.goto('/Vermehrung/Arten')
  await expect(page.getByText(ARTNAME).first()).toBeVisible({ timeout: 60_000 })

  const trail = page.locator('nav[aria-label="Pfad"]')

  await test.step('art object url renders the object list', async () => {
    await page.goto(`/Vermehrung/Arten/${ART_ID}`)
    // the object itself + its child tables, in tree order
    const rows = page.locator('div[title]')
    await expect(rows.filter({ hasText: 'Art' }).first()).toBeVisible({
      timeout: 60_000,
    })
    await expect(page.getByTitle('Herkünfte (0)')).toBeVisible()
    await expect(page.getByTitle('Sammlungen (0)')).toBeVisible()
    await expect(page.getByTitle('Kulturen (1)')).toBeVisible()
    // the list title shows the object's own label
    await expect(page.getByText(ARTNAME).first()).toBeVisible()
    // no suffix in the url
    await expect(page).toHaveURL(new RegExp(`/Vermehrung/Arten/${ART_ID}/?$`))
  })

  await test.step('self row opens the form at .../Art', async () => {
    await page.getByTitle('Art').click()
    await expect(page).toHaveURL(
      new RegExp(`/Vermehrung/Arten/${ART_ID}/Art$`),
    )
    // the form title renders, not the list
    await expect(page.getByText('Art', { exact: true }).first()).toBeVisible()
    await expect(page.getByTitle('Herkünfte')).toHaveCount(0)
    // the trail ends with the object name crumb, the object crumb links back
    await expect(trail.locator('a')).toHaveCount(3)
    await expect(trail.getByText('Art', { exact: true })).toBeVisible()
  })

  await test.step('the object crumb links back to the list', async () => {
    await trail.getByRole('link', { name: ARTNAME, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/Vermehrung/Arten/${ART_ID}/?$`))
    await expect(page.getByTitle('Kulturen')).toBeVisible()
  })

  await test.step('folder row opens the existing folder list', async () => {
    await page.getByTitle('Kulturen').click()
    await expect(page).toHaveURL(
      new RegExp(`/Vermehrung/Arten/${ART_ID}/Kulturen$`),
    )
    // the kulturen list renders (its title row)
    await expect(
      page.getByText('Kulturen', { exact: true }).first(),
    ).toBeVisible({ timeout: 60_000 })
    // its up button is hidden with breadcrumbs enabled...
    await expect(
      page.locator(
        'button[title="Eine Ebene höher"], button[title="Zur Art"], button[title="Zu allen Listen"]',
      ),
    ).toHaveCount(0)
    // ...while the add button remains
    await expect(page.getByTitle('neue Kultur')).toBeVisible()
  })

  await test.step('kultur object list shows its child tables', async () => {
    await page.goto(`/Vermehrung/Arten/${ART_ID}/Kulturen/${KULTUR_ID}`)
    await expect(page.getByTitle('Kultur')).toBeVisible({ timeout: 60_000 })
    await expect(page.getByTitle('Zählungen (1)')).toBeVisible()
    await expect(page.getByTitle('An-Lieferungen (0)')).toBeVisible()
    await expect(page.getByTitle('Aus-Lieferungen (0)')).toBeVisible()
    await expect(page.getByTitle('Bedarf (0)')).toBeVisible()
    // no teilkulturen: the kultur's option says tk: false
    await expect(page.getByTitle('Teilkulturen')).toHaveCount(0)
  })

  await test.step('leaf object (zaehlung) renders its form directly', async () => {
    await page.goto(
      `/Vermehrung/Arten/${ART_ID}/Kulturen/${KULTUR_ID}/Zaehlungen/${ZAEHLUNG_ID}`,
    )
    // the form title renders - no object list in between
    await expect(
      page.getByText('Zählung', { exact: true }).first(),
    ).toBeVisible({ timeout: 60_000 })
    await expect(page.getByTitle('Zählungen')).toHaveCount(0)
  })

  await test.step('deep trail renders fully, no collapse element', async () => {
    await page.goto(
      `/Vermehrung/Personen/${PERSON_ID}/Gaerten/${GARTEN_ID}/Kulturen/${KULTUR2_ID}/Zaehlungen/${ZAEHLUNG2_ID}`,
    )
    // 9 crumbs: 8 links + the current node - more than mui's default
    // maxItems of 8, so this pins that no '...' collapse appears
    await expect(trail.getByRole('link', { name: 'Zählungen' })).toBeVisible({
      timeout: 60_000,
    })
    await expect(trail.getByText(/2024\.03\.02/, { exact: false })).toBeVisible(
      { timeout: 60_000 },
    )
    await expect(trail.locator('a')).toHaveCount(8)
    await expect(trail.getByLabel('Show path')).toHaveCount(0)
  })

  await test.step('tree click opens the form directly', async () => {
    await page.goto('/Vermehrung/Arten')
    await expect(page.getByText(ARTNAME).first()).toBeVisible({
      timeout: 60_000,
    })
    await page.locator('.tree-root').getByText(ARTNAME).first().click()
    await expect(page).toHaveURL(
      new RegExp(`/Vermehrung/Arten/${ART_ID}/Art$`),
    )
    await expect(page.getByTitle('Herkünfte')).toHaveCount(0)
  })

  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
