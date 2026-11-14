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
    // the app refuses to boot without a firebase api key (getAuth throws
    // auth/invalid-api-key in recreatePersistedStore) and the real keys
    // live in the gitignored .env.development - which CI and fresh
    // clones don't have. No spec talks to real firebase (identity
    // toolkit, auth service and PostgREST are page.route-mocked), so
    // dummies suffice; vite gives process.env VITE_* vars precedence
    // over .env files, so this also keeps local runs hermetic.
    env: {
      ...process.env,
      VITE_FIREBASE_API_KEY: 'AIzaSy-e2e-dummy-not-a-real-key',
      VITE_FIREBASE_AUTH_DOMAIN: 'e2e.example.com',
      VITE_FIREBASE_PROJECT_ID: 'e2e-project',
      VITE_FIREBASE_APP_ID: 'e2e-app-id',
    },
  },
})
