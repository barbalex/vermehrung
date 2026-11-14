// fetches a fresh production backup into backend-dev/db/vermehrung.backup
// (the file a fresh dev db volume initializes from, see backend-dev/db/
// Dockerfile). runs the production backup first - its fingerprint skip
// makes this cheap when nothing changed; /sik_data/last.backup in the
// db container always holds the newest uploaded backup either way.
// afterwards rebuild the dev stack with a fresh volume:
//   docker compose -f backend-dev/docker-compose.yaml down -v
//   docker compose -f backend-dev/docker-compose.yaml up -d --build
// (down -v deletes the local dev data!)
import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SERVER = 'root@139.162.172.14'
const run = (cmd, args, opts = {}) => {
  console.log(`$ ${cmd} ${args.join(' ')}`)
  execFileSync(cmd, args, { stdio: 'inherit', ...opts })
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const target = path.join(root, 'backend-dev', 'db', 'vermehrung.backup')

console.log('creating a backup on the server (skips if data unchanged)...')
run('ssh', ['-o', 'BatchMode=yes', SERVER, 'docker exec v_db bash ./backup.sh'])

console.log('copying the backup out of the container...')
run('ssh', [
  '-o',
  'BatchMode=yes',
  SERVER,
  'docker cp v_db:/sik_data/last.backup /tmp/vermehrung-fetch.backup',
])

console.log('downloading...')
run('scp', [
  '-o',
  'BatchMode=yes',
  `${SERVER}:/tmp/vermehrung-fetch.backup`,
  target,
])
run('ssh', [
  '-o',
  'BatchMode=yes',
  SERVER,
  'rm -f /tmp/vermehrung-fetch.backup',
])

if (!existsSync(target) || statSync(target).size < 1_000_000) {
  console.error('ERROR: the downloaded backup looks wrong (missing or < 1MB)')
  process.exit(1)
}
const mb = Math.round(statSync(target).size / 100_000) / 10
console.log(`backend-dev/db/vermehrung.backup updated (${mb} MB)`)
console.log(
  'rebuild the dev stack against it: docker compose -f backend-dev/docker-compose.yaml down -v && up -d --build',
)
