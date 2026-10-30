import { defineConfig, devices } from '@playwright/test'

// e2e tests run against the dev server without a backend: the boot
// smoke tests use no credentials, the local-first scenario mocks
// firebase, the auth service and PostgREST via page.route
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // one local retry: parallel cold boots of the wa-sqlite worker
  // occasionally trip timing-sensitive steps (tree-url race, see tasks.md)
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:5199',
  },
  webServer: {
    command: 'npx vite --port 5199 --strictPort',
    url: 'http://localhost:5199/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
