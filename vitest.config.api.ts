import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vitest/config'

// api tests against the local backend (Hasura as oracle):
//   docker compose -f backend-dev/docker-compose.yaml --profile migration up
//   npm run test:api
// deliberately separate from the default `npm test` run: these tests
// may need docker + the local backend and must not run in CI.
// the babel plugins mirror vite.config.ts: dbModel.ts uses decorators
export default defineConfig({
  test: {
    include: ['api-tests/**/*.test.ts'],
    testTimeout: 300_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
  plugins: [
    babel({
      presets: [],
      plugins: [
        ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    }),
  ],
})
