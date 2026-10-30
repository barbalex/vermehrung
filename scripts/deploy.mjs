// runs the production deploy pipeline: lint + typecheck + tests,
// then bumps the version (tools/bumpVersion.mjs), builds and deploys
// to firebase hosting.
// usage: npm run deploy [patch|minor|major] (default: patch)
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const run = (cmd, args) => {
  console.log(`$ ${cmd} ${args.join(' ')}`)
  execFileSync(cmd, args, { stdio: 'inherit' })
}

const type = process.argv[2] ?? 'patch'
if (!['patch', 'minor', 'major'].includes(type)) {
  console.error(`unknown bump type "${type}" — use patch, minor or major`)
  process.exit(1)
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

run('npm', ['run', 'lint'])
run('npm', ['run', 'typecheck'])
run('npm', ['test'])
run('node', [path.join(root, 'tools/bumpVersion.mjs'), type])
run('npm', ['run', 'build'])
run('npm', ['run', 'deploy_only'])
console.log(`deployed version ${type} bump`)
