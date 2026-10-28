import config from '../kanel.config.mjs'
import processDatabaseModule from 'kanel/build/processDatabase.js'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const processDatabase = processDatabaseModule.default || processDatabaseModule

try {
  await processDatabase(config)
} catch (error) {
  console.error(error)
  process.exit(1)
}

// Kanel ESM mode emits .js extensions; rewrite to .ts so imports match actual file names.
async function rewriteJsToTs(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        await rewriteJsToTs(fullPath)
      } else if (entry.name.endsWith('.ts')) {
        const original = await readFile(fullPath, 'utf8')
        const updated = original.replace(
          /from ('|")(\.{1,2}\/[^'"]+)\.js\1/g,
          "from $1$2.ts$1",
        )
        if (updated !== original) await writeFile(fullPath, updated, 'utf8')
      }
    }),
  )
}

await rewriteJsToTs(config.outputPath)
