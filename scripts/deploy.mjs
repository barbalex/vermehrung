// runs the production deploy pipeline: format check + lint + typecheck +
// tests, then bumps the version (tools/bumpVersion.mjs), builds, deploys
// to firebase hosting and commits + pushes the deploy files (package.json,
// dist, .firebase cache).
// usage: npm run deploy [patch|minor|major] (default: patch)
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const run = (cmd, args) => {
  console.log(`$ ${cmd} ${args.join(' ')}`)
  execFileSync(cmd, args, { stdio: 'inherit' })
}

const capture = (cmd, args) =>
  execFileSync(cmd, args, { encoding: 'utf8' }).trim()

const type = process.argv[2] ?? 'patch'
if (!['patch', 'minor', 'major'].includes(type)) {
  console.error(`unknown bump type "${type}" — use patch, minor or major`)
  process.exit(1)
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

run('npm', ['run', 'format:check'])
run('npm', ['run', 'lint'])
run('npm', ['run', 'typecheck'])
run('npm', ['test'])
run('node', [path.join(root, 'tools/bumpVersion.mjs'), type])
run('npm', ['run', 'build'])
run('npm', ['run', 'deploy_only'])

// commit the files the deploy changed, but only those — anything else
// staged or modified stays untouched. .firebase/ is gitignored, so this
// only ever picks up the already-tracked files within it (the hosting
// upload caches — keeping them tracked makes deploys from fresh clones
// skip re-uploading unchanged files).
const deployFiles = ['package.json', '.firebase']
const dirty = capture('git', ['status', '--porcelain', '--', ...deployFiles])
const { version } = JSON.parse(
  readFileSync(path.join(root, 'package.json'), 'utf8'),
)
if (dirty) {
  run('git', ['commit', '-m', `up version ${version}`, '--', ...deployFiles])
  run('git', ['push'])
  console.log(`committed + pushed version ${version}`)
} else {
  console.log(`deployed version ${version} — no deploy files changed`)
}
