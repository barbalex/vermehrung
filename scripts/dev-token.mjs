// mints an api JWT for a person of the given role from the local dev
// backend and prints a ready-to-open dev url. Opening it boots the app
// (DEV builds only, see src/utils/recreatePersistedStore.ts) straight
// into that role: no Firebase sign-in, no /token exchange. The person is
// picked from the dev db like api-tests/helpers.ts does: with an
// account_id (the role lookup matches person.account_id against the user
// uid) and preferably with related data, so the permission filters have
// something to bite on.
// usage: node scripts/dev-token.mjs <gaertner|artverantwortlich|manager>
// needs the local backend: npm run backend
import { createHmac } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROLES = ['gaertner', 'artverantwortlich', 'manager']

const role = process.argv[2]
if (!ROLES.includes(role)) {
  console.error(`usage: node scripts/dev-token.mjs <${ROLES.join('|')}>`)
  process.exit(1)
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const envPath = path.join(root, 'backend-dev/.env')

// backend-dev/.env has mixed line endings - strip \r (same as api-tests)
const parseEnv = (file) => {
  const env = {}
  for (const line of readFileSync(file, 'utf-8').split('\n')) {
    const clean = line.replace(/\r$/, '')
    if (!clean || clean.startsWith('#')) continue
    const eq = clean.indexOf('=')
    if (eq === -1) continue
    env[clean.slice(0, eq)] = clean.slice(eq + 1)
  }
  return env
}

const devEnv = parseEnv(envPath)
const jwtSecret = devEnv.PGRST_JWT_SECRET
const postgresPassword = devEnv.POSTGRES_PASSWORD
if (!jwtSecret || !postgresPassword) {
  console.error(`PGRST_JWT_SECRET / POSTGRES_PASSWORD missing in ${envPath}`)
  process.exit(1)
}

const psql = (sql) =>
  execFileSync(
    'docker',
    [
      'exec',
      '-e',
      `PGPASSWORD=${postgresPassword}`,
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
      '-F',
      '\t',
      '-c',
      sql,
    ],
    { encoding: 'utf-8', timeout: 30_000 },
  ).trim()

let person
try {
  const rows = psql(`
    select p.id, p.account_id, coalesce(p.vorname || ' ', '') || coalesce(p.name, ''),
      (exists(select 1 from gv where gv.person_id = p.id)
        or exists(select 1 from av where av.person_id = p.id)
        or exists(select 1 from garten where garten.person_id = p.id))
    from person p
    join user_role r on r.id = p.user_role_id
    where r.name = '${role}' and p.account_id is not null
    order by 4 desc, 2
    limit 1`)
  ;[person] = rows.split('\n').map((line) => {
    const [id, accountId, label] = line.split('\t')
    return { id, accountId, label }
  })
} catch {
  console.error(
    'could not query the dev db - start the local backend with:\n' +
      '  docker compose -f backend-dev/docker-compose.yaml up',
  )
  process.exit(1)
}
if (!person?.id || !person.accountId) {
  console.error(`no person with role ${role} and an account_id found in dev db`)
  process.exit(1)
}

// same claims as the auth service /token mints (backend/auth/server.js):
// role + user_id drive PostgREST/RLS. sub normally carries the firebase
// uid - here the person's account_id, which the app's role lookup matches
// against person.account_id. 1h ttl like the auth service.
const b64url = (buf) =>
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
    user_id: person.id,
    sub: person.accountId,
    iat: now,
    exp: now + 60 * 60,
  }),
)
const signature = createHmac('sha256', jwtSecret)
  .update(`${header}.${payload}`)
  .digest()
const token = `${header}.${payload}.${b64url(signature)}`

console.log(`person: ${person.label} (${person.id})`)
console.log(
  `token valid until: ${new Date((now + 3600) * 1000).toLocaleString()}`,
)
// straight into the data area (the devToken boot does not navigate)
console.log(`open (DEV build only, e.g. npm run dev on http://localhost:5175):`)
console.log(`http://localhost:5175/Vermehrung/?devToken=${token}`)
