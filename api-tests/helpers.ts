import crypto from 'node:crypto'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

// Shared harness for the api tests (npm run test:api).
// They run against the LOCAL backend started with:
//   docker compose -f backend-dev/docker-compose.yaml up

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
  pgrstUri: process.env.PGRST_URI ?? 'http://localhost:8090',
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

// ---- db (docker exec psql, for reading state and transactional writes) ----

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

const psqlJson = (sql: string): Json =>
  JSON.parse(psql(`select coalesce(json_agg(t), '[]'::json) from (${sql}) t`))

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
  const [persons, relations] = await Promise.all([
    psqlJson(
      `select p.id as id, r.name as role
         from person p
         join user_role r on r.id = p.user_role_id
        where r.name in ('artverantwortlich', 'gaertner', 'manager')`,
    ),
    psqlJson(
      `select distinct person_id from (
         select person_id from gv where person_id is not null
         union all select person_id from av where person_id is not null
         union all select person_id from garten where person_id is not null
       ) x`,
    ),
  ])
  const dataIds = new Set<string>(relations.map((r: Json) => r.person_id))
  const byRole: Record<string, TestPerson[]> = {}
  for (const p of persons) {
    byRole[p.role] ??= []
    byRole[p.role].push({ id: p.id, role: p.role, hasData: dataIds.has(p.id) })
  }
  const result: TestPerson[] = []
  for (const role of APP_ROLES) {
    const ofRole = byRole[role] ?? []
    ofRole.sort((a, b) => Number(b.hasData) - Number(a.hasData))
    result.push(...ofRole.slice(0, 5))
  }
  cachedPersons = result
  return result
}

export const getTestPerson = async (role: AppRole): Promise<TestPerson> => {
  const persons = await getTestPersons()
  const ofRole = persons.filter((p) => p.role === role)
  if (!ofRole.length)
    throw new Error(`no test person with role ${role} found in dev db`)
  return ofRole[0]
}

export const assertBackendAvailable = async (): Promise<void> => {
  const message =
    'the local backend is not reachable - start it with:\n' +
    '  docker compose -f backend-dev/docker-compose.yaml up'
  const pgrstRes = await fetch(`${config.pgrstUri}/`, {
    signal: AbortSignal.timeout(3000),
  }).catch(() => null)
  if (!pgrstRes) throw new Error(message)
}
