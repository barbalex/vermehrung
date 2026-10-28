import { readFileSync, writeFileSync } from 'node:fs'

// bumps the patch version and sets versionDate to today, so every
// deploy is visible to users (title bar + hamburger menu)
const path = 'package.json'
const pkg = JSON.parse(readFileSync(path, 'utf8'))

const parts = pkg.version.split('.')
parts[2] = String(Number(parts[2]) + 1)
pkg.version = parts.join('.')

const now = new Date()
const pad = (n) => String(n).padStart(2, '0')
pkg.versionDate = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`

writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n')
console.log(`version bumped to ${pkg.version} (${pkg.versionDate})`)
