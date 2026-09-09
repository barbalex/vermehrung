import { expect, test } from '@playwright/test'

// These tests guard the app's boot path - the place where wiring bugs
// (missing providers, navigation side effects) surface as blank pages
// or silent redirects. They deliberately use no backend and no login.

test('homepage renders', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Bedrohte Pflanzen vermehren' }),
  ).toBeVisible({ timeout: 15_000 })
  await expect(page.getByRole('link', { name: 'Daten' })).toBeVisible()
  // no uncaught errors surfaced by the dev overlay
  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})

test('deep link stays on its url', async ({ page }) => {
  // regression: a navigation side effect on boot used to redirect
  // deep links back to / after a few seconds
  await page.goto('/Dokumentation/technologien')
  await expect(page.getByRole('navigation')).toBeVisible({
    timeout: 15_000,
  })
  // wait longer than the boot-time side effects (auth, api polling)
  await page.waitForTimeout(6_000)
  await expect(page).toHaveURL('/Dokumentation/technologien')
  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})

test('data area shows the login dialog when not authenticated', async ({
  page,
}) => {
  await page.goto('/Vermehrung/')
  await expect(page.getByRole('dialog', { name: 'Anmeldung' })).toBeVisible({
    timeout: 15_000,
  })
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.locator('#dev-error-overlay')).toHaveCount(0)
})
