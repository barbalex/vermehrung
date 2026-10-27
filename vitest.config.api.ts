import { defineConfig } from 'vitest/config'

// api equivalence tests against the local backend (Hasura as oracle):
//   docker compose -f backend-dev/docker-compose.yaml --profile migration up
//   npm run test:api
// deliberately separate from the default `npm test` run: these tests
// need docker + the local backend and must not run in CI
export default defineConfig({
  test: {
    include: ['api-tests/**/*.test.ts'],
    testTimeout: 300_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
})
