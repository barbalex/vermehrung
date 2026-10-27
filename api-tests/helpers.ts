import crypto from 'node:crypto'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

// Shared harness for the api equivalence tests (npm run test:api).
// They run against the LOCAL backend started with:
//   docker compose -f backend-dev/docker-compose.yaml --profile migration up
// (the migration profile keeps Hasura alive as the permission oracle).

const REPO_ROOT = path.resolve(__dirname, '..')
const DEV_ENV_PATH = path.join(REPO_ROOT, 'backend-dev/.env')

// backend-dev/.env has mixed line endings - strip \r
const parseEnv = (file: string): Record<string, string> => {
  const env: Record<string, string> = {}
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const clean = line.replace(/\r$/, '')
    if (!clean || clean.startsWith('#')) continue
    const eq = clean.indexOf('=')
    if (eq === -1) continue
    env[clean.slice(0, eq)] = clean.slice(eq + 1)
  }
  return env
}

const devEnv = parseEnv(DEV_ENV_PATH)

export const config = {
  pgrstUri: process.env.PGRST_URI ?? 'http://localhost:8080',
  hasuraUri:
    process.env.HASURA_URI ?? 'http://localhost:8081/v1/graphql',
  adminSecret: devEnv.HASURA_GRAPHQL_ADMIN_SECRET,
  jwtSecret: devEnv.PGRST_JWT_SECRET,
  postgresPassword: devEnv.POSTGRES_PASSWORD,
}

export const APP_ROLES = ['artverantwortlich', 'gaertner', 'manager'] as const
export type AppRole = (typeof APP_ROLES)[number]

// ---- PostgREST ----

export const mintToken = (role: string, userId: string): string => {
  const b64url = (buf: Buffer | string) =>
    Buffer.from(buf)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const now = Math.floor(Date.now() / 1000)
  const payload = b64url(
    JSON.stringify({
      role,
      user_id: userId,
      sub: userId,
      iat: now,
      exp: now + 60 * 60,
    }),
  )
  const signature = crypto
    .createHmac('sha256', config.jwtSecret)
    .update(`${header}.${payload}`)
    .digest()
  const sig = b64url(signature)
  return `${header}.${payload}.${sig}`
}

export type Json =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any

export const pgrst = async (
  pathAndQuery: string,
  options: {
    method?: string
    token?: string
    body?: unknown
    prefer?: string
  } = {},
): Promise<{ status: number; data: Json }> => {
  const headers: Record<string, string> = {
    accept: 'application/json',
  }
  if (options.token) headers.authorization = `Bearer ${options.token}`
  if (options.prefer) headers.prefer = options.prefer
  let body: string | undefined
  if (options.body !== undefined) {
    headers['content-type'] = 'application/json'
    body = JSON.stringify(options.body)
  }
  const res = await fetch(`${config.pgrstUri}${pathAndQuery}`, {
    method: options.method ?? 'GET',
    headers,
    body,
  })
  let data: Json = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }
  return { status: res.status, data }
}

// ---- Hasura (the oracle) ----

export const hasura = async (
  query: string,
  impersonate?: { role: string; userId: string },
): Promise<{ data?: Json; errors?: Json[] }> => {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-hasura-admin-secret': config.adminSecret,
  }
  if (impersonate) {
    headers['x-hasura-role'] = impersonate.role
    headers['x-hasura-user-id'] = impersonate.userId
  }
  const res = await fetch(config.hasuraUri, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  })
  return res.json()
}

// ---- db (docker exec psql, for transactional write tests) ----

export const psql = (sql: string): string =>
  execFileSync(
    'docker',
    [
      'exec',
      '-e',
      `PGPASSWORD=${config.postgresPassword}`,
      'v_db',
      'psql',
      '-U',
      'postgres',
      '-d',
      'vermehrung',
      '-v',
      'ON_ERROR_STOP=1',
      '-q',
      '-t',
      '-A',
      '-c',
      sql,
    ],
    { encoding: 'utf8', timeout: 30_000 },
  )

// ---- test persons ----

export interface TestPerson {
  id: string
  role: AppRole
  hasData: boolean
}

let cachedPersons: TestPerson[] | null = null

// persons per role, preferring ones with related data (gv/garten/av rows)
// so the permission filters actually have something to bite on
export const getTestPersons = async (): Promise<TestPerson[]> => {
  if (cachedPersons) return cachedPersons
  const result = await hasura(`query {
    person(limit: 100000) { id person_user_role { name } }
    gv(limit: 100000) { person_id }
    av(limit: 100000) { person_id }
    garten(limit: 100000) { person_id }
  }`)
  if (result.errors) throw new Error(`hasura: ${JSON.stringify(result.errors)}`)
  const dataIds = new Set<string>()
  for (const row of [...result.data.gv, ...result.data.av, ...result.data.garten]) {
    if (row.person_id) dataIds.add(row.person_id)
  }
  const byRole: Record<string, TestPerson[]> = {}
  for (const p of result.data.person) {
    const role = p.person_user_role?.name
    if (!role || !(APP_ROLES as readonly string[]).includes(role)) continue
    byRole[role] ??= []
    byRole[role].push({ id: p.id, role, hasData: dataIds.has(p.id) })
  }
  const persons: TestPerson[] = []
  for (const role of APP_ROLES) {
    const ofRole = byRole[role] ?? []
    ofRole.sort((a, b) => Number(b.hasData) - Number(a.hasData))
    persons.push(...ofRole.slice(0, 5))
  }
  cachedPersons = persons
  return persons
}

export const getTestPerson = async (role: AppRole): Promise<TestPerson> => {
  const persons = await getTestPersons()
  const ofRole = persons.filter((p) => p.role === role)
  if (!ofRole.length)
    throw new Error(`no test person with role ${role} found in dev db`)
  return ofRole[0]
}

// ---- metadata ----

export interface TableMetadata {
  name: string
  selectColumns: Record<string, string[]>
  selectRoles: string[]
}

export const getMetadataTables = (): TableMetadata[] => {
  const raw = JSON.parse(
    readFileSync(
      path.join(REPO_ROOT, 'src/hasuraMetadata/metadata.json'),
      'utf8',
    ),
  )
  return raw.metadata.sources[0].tables.map((t: Json) => {
    const selectColumns: Record<string, string[]> = {}
    for (const p of t.select_permissions ?? []) {
      selectColumns[p.role] = p.permission.columns as string[]
    }
    return {
      name: t.table.name,
      selectColumns,
      selectRoles: Object.keys(selectColumns),
    }
  })
}

export const assertBackendAvailable = async (): Promise<void> => {
  const message =
    'the local backend is not reachable - start it with:\n' +
    '  docker compose -f backend-dev/docker-compose.yaml --profile migration up'
  const pgrstRes = await fetch(`${config.pgrstUri}/`, {
    signal: AbortSignal.timeout(3000),
  }).catch(() => null)
  if (!pgrstRes) throw new Error(message)
  const hasuraRes = await fetch(`${config.hasuraUri.replace(/\/v1\/graphql$/, '/healthz')}`, {
    signal: AbortSignal.timeout(3000),
  }).catch(() => null)
  if (!hasuraRes || !hasuraRes.ok) throw new Error(message)
}

// make sure the dev Hasura knows the CURRENT table set (its applied
// metadata can lag behind src/hasuraMetadata/metadata.json)
export const applyDevHasuraMetadata = async (): Promise<void> => {
  const raw = JSON.parse(
    readFileSync(
      path.join(REPO_ROOT, 'src/hasuraMetadata/metadata.json'),
      'utf8',
    ),
  )
  const res = await fetch(config.hasuraUri, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': config.adminSecret,
    },
    body: JSON.stringify({
      type: 'replace_metadata',
      args: {
        allow_inconsistent_metadata: false,
        metadata: raw.metadata,
        reload_remote_schemas: true,
      },
    }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok || body?.error) {
    throw new Error(`applying hasura metadata failed: ${JSON.stringify(body)}`)
  }
  // the schema cache refresh can lag behind the replace_metadata response:
  // poll until a table only present in the current metadata resolves
  for (let i = 0; i < 20; i++) {
    const check = await hasura('query { bedarf(limit: 0) { id } }')
    if (!check.errors) return
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error('hasura schema cache did not pick up bedarf after metadata apply')
}
