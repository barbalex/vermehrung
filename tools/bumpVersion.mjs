import { readFileSync, writeFileSync } from 'node:fs'

// bumps the patch version and sets versionDate to today, so every
// deploy is visible to users (title bar + hamburger menu).
// a manually raised minor or major version (e.g. 1.24.27 -> 1.25.0)
// is deployed as-is: the patch number is left at what was set.
// the last deployed version is tracked in package.json.deployedVersion
const path = 'package.json'
const pkg = JSON.parse(readFileSync(path, 'utf8'))

const current = pkg.version.split('.').map(Number)
const deployed = String(pkg.deployedVersion ?? pkg.version)
  .split('.')
  .map(Number)

const minorOrMajorRaised =
  current[0] > deployed[0] || current[1] > deployed[1]

if (!minorOrMajorRaised) {
  const parts = pkg.version.split('.')
  parts[2] = String(Number(parts[2]) + 1)
  pkg.version = parts.join('.')
}
pkg.deployedVersion = pkg.version

const now = new Date()
const pad = (n) => String(n).padStart(2, '0')
pkg.versionDate = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`

writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n')
console.log(`version to deploy: ${pkg.version} (${pkg.versionDate})`)
