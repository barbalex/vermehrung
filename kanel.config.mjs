import { readFileSync } from 'node:fs'
import { makePgTsGenerator } from 'kanel'

// Kanel connects to the dev database from backend-dev/docker-compose.yaml.
// It must be running: docker compose -f backend-dev/docker-compose.yaml up
const databaseUrl =
  process.env.KANEL_DATABASE_URL ||
  (() => {
    const env = readFileSync('backend-dev/.env', 'utf8')
    // backend-dev/.env has mixed line endings
    const url = env
      .split(/\r?\n/)
      .find((line) => line.startsWith('DATABASE_URL='))
    if (!url) {
      throw new Error(
        'Missing DATABASE_URL in backend-dev/.env. Or set KANEL_DATABASE_URL.',
      )
    }
    // the compose hostname db is only reachable inside the docker network
    return url.slice('DATABASE_URL='.length).trim().replace('@db:', '@localhost:')
  })()

/** @type {import("kanel").Config} */
const config = {
  connection: databaseUrl,
  // the app schema only holds security definer helpers, not row types
  schemaNames: ['public'],
  filter: (pgType) =>
    pgType.kind !== 'foreignTable' &&
    !['spatial_ref_sys', 'geography_columns', 'geometry_columns'].includes(
      pgType.name,
    ),
  outputPath: './src/models',
  preDeleteOutputFolder: true,
  typescriptConfig: {
    tsModuleFormat: 'esm',
  },
  generators: [
    makePgTsGenerator({
      // rows reach the client exclusively as JSON (PostgREST responses,
      // WatermelonDB/LokiJS): timestamps are ISO strings, numerics are
      // JSON numbers - never Date objects or pg driver strings
      customTypeMap: {
        'pg_catalog.timestamp': 'string',
        'pg_catalog.timestamptz': 'string',
        'pg_catalog.date': 'string',
        'pg_catalog.numeric': 'number',
        timestamp: 'string',
        'timestamp without time zone': 'string',
        date: 'string',
        numeric: 'number',
      },
    }),
  ],
}

export default config
