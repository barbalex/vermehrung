// one-command backend deploy: keeps the copied server folder at
// /root/vermehrung in sync with this repo so it can no longer drift (it
// had lagged before - Hasura-era server.js, missing src/sql mounts).
//
// DRY-RUN BY DEFAULT: prints the per-file drift (local sha256 vs the
// server) and the plan. --apply executes:
//   1. tar the current server folder to /root/vermehrung-backups/<stamp>.tgz
//   2. scp the drifted files (backend compose + auth/ + db/ + caddy/ and
//      the two src/sql files the compose mounts read-only - to /root/src/sql,
//      matching the ../src/sql mount paths verbatim)
//   3. remotely: docker compose build auth db && docker compose up -d
// and prints the rollback command. NOT deployed: backend/.env and
// backend/dropbox_uploader.conf (server-local secrets) - the db data in
// the docker volumes is never touched; rebuilding the db image does not
// re-run the init scripts (those only run on a fresh volume).
//
// usage: node scripts/deployBackend.mjs [--apply]
// only run --apply when the user explicitly asked for a backend deploy.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HOST = 'root@139.162.172.14'
const REMOTE_DIR = '/root/vermehrung'
const BACKUP_DIR = '/root/vermehrung-backups'
const APPLY = process.argv.includes('--apply')

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ?
      walk(path.join(dir, entry.name))
    : [path.join(dir, entry.name)],
  )

// repo file -> directory on the server. src/sql lands in /root/src/sql
// because the compose file mounts ../src/sql/* relative to /root/vermehrung.
const files = [
  [path.join(root, 'backend/docker-compose.yaml'), `${REMOTE_DIR}/`],
  ...walk(path.join(root, 'backend/auth')).map((f) => [
    f,
    `${REMOTE_DIR}/auth/`,
  ]),
  ...walk(path.join(root, 'backend/db')).map((f) => [f, `${REMOTE_DIR}/db/`]),
  ...walk(path.join(root, 'backend/caddy')).map((f) => [
    f,
    `${REMOTE_DIR}/caddy/`,
  ]),
  ...['createApiAccess.sql', 'createSyncFunction.sql'].map((f) => [
    path.join(root, 'src/sql', f),
    '/root/src/sql/',
  ]),
]
const remotePath = ([local, remoteDir]) => remoteDir + path.basename(local)

const sshOptions = ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10']

const run = (cmd, args, options = {}) => {
  console.log(`$ ${cmd} ${args.join(' ')}`)
  return execFileSync(cmd, args, { stdio: 'inherit', ...options })
}

// capture variant for the read-only drift check
const sshCapture = (command, timeout) =>
  execFileSync('ssh', [...sshOptions, HOST, command], {
    stdio: ['ignore', 'pipe', 'ignore'],
    encoding: 'utf-8',
    timeout,
  })

const localHash = (file) =>
  createHash('sha256').update(readFileSync(file)).digest('hex')

const remoteHashes = (() => {
  try {
    const out = sshCapture(
      `sha256sum ${files.map(remotePath).join(' ')}`,
      60_000,
    )
    const hashes = {}
    for (const line of out.trim().split('\n')) {
      const [hash, file] = line.split(/\s+/)
      hashes[file] = hash
    }
    return hashes
  } catch (error) {
    console.error(
      `could not reach ${HOST} - deploy needs ssh key auth (BatchMode)\n${error.message}`,
    )
    process.exit(1)
  }
})()

console.log(`drift check (local sha256 vs ${HOST}):`)
const toCopy = []
for (const file of files) {
  const localRelative = path.relative(root, file[0])
  const remoteHash = remoteHashes[remotePath(file)]
  if (!remoteHash) {
    console.log(`  MISSING  ${localRelative}`)
    toCopy.push(file)
  } else if (remoteHash !== localHash(file[0])) {
    console.log(`  DIFFERS  ${localRelative}`)
    toCopy.push(file)
  } else {
    console.log(`  same     ${localRelative}`)
  }
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:]/g, '')
  .replace('T', '-')
  .slice(0, 15)
const backupFile = `${BACKUP_DIR}/vermehrung-${stamp}.tgz`

console.log(`\nplan:`)
console.log(`  1. tar the current server folder to ${backupFile}`)
console.log(
  toCopy.length ?
    `  2. scp ${toCopy.length} drifted file(s)`
  : `  2. nothing to scp - no drift`,
)
console.log(
  `  3. ssh cd ${REMOTE_DIR} && docker compose build auth db && docker compose up -d`,
)

if (!APPLY) {
  console.log(
    `\ndry run - execute with: node scripts/deployBackend.mjs --apply`,
  )
  process.exit(0)
}

run('ssh', [
  ...sshOptions,
  HOST,
  `mkdir -p ${BACKUP_DIR} /root/src/sql && tar czf ${backupFile} -C /root vermehrung`,
])

if (toCopy.length) {
  const byDir = new Map()
  for (const file of toCopy) {
    byDir.set(file[1], [...(byDir.get(file[1]) ?? []), file[0]])
  }
  for (const [remoteDir, locals] of byDir) {
    run('scp', [...sshOptions, ...locals, `${HOST}:${remoteDir}`])
  }
}

run('ssh', [
  ...sshOptions,
  HOST,
  `cd ${REMOTE_DIR} && docker compose build auth db && docker compose up -d`,
])

console.log(`\nbackup written: ${backupFile}`)
console.log(`rollback with:`)
console.log(
  `  ssh ${HOST} 'cd /root && rm -rf vermehrung && tar xzf ${backupFile} && cd vermehrung && docker compose build auth db && docker compose up -d'`,
)
