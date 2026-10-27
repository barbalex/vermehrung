import { beforeAll, describe, expect, it } from 'vitest'

import {
  type Json,
  APP_ROLES,
  applyDevHasuraMetadata,
  assertBackendAvailable,
  getMetadataTables,
  getTestPersons,
  hasura,
  mintToken,
  pgrst,
  type AppRole,
} from './helpers.js'

// The core migration test: for every tracked table, every app role and
// several real persons per role, the rows visible through PostgREST
// (roles + grants + row level security) must be EXACTLY the rows Hasura
// showed under its own permission system. Hasura runs as the oracle via
// admin-secret role impersonation (X-Hasura-Role / X-Hasura-User-Id).

const DENIED_STATUS = new Set([401, 403, 42501])

interface Job {
  table: string
  role: AppRole
  userId: string
  compareColumn: string
}

// run jobs with limited concurrency to not overwhelm the local backend
const runPool = async <T>(jobs: T[], size: number, fn: (job: T) => Promise<void>) => {
  let index = 0
  const workers = Array.from({ length: size }, async () => {
    while (index < jobs.length) {
      const job = jobs[index++]
      await fn(job)
    }
  })
  await Promise.all(workers)
}

describe('permission equivalence: PostgREST vs Hasura', () => {
  beforeAll(async () => {
    await assertBackendAvailable()
    await applyDevHasuraMetadata()
  })

  it('shows the same rows for every table, role and person', async () => {
    const [tables, persons] = await Promise.all([
      getMetadataTables(),
      getTestPersons(),
    ])

    const jobs: Job[] = []
    for (const table of tables) {
      for (const role of APP_ROLES) {
        const columns = table.selectColumns[role]
        if (!columns) continue
        const compareColumn = columns.includes('id') ? 'id' : columns[0]
        for (const person of persons.filter((p) => p.role === role)) {
          jobs.push({ table: table.name, role, userId: person.id, compareColumn })
        }
      }
    }

    // coverage report: how many comparisons were non-trivial
    let bothNonEmpty = 0
    let bothDenied = 0
    const failures: string[] = []

    await runPool(jobs, 10, async ({ table, role, userId, compareColumn }) => {
      const hasuraRes = await hasura(
        `query { ${table}(where: {}, limit: 100000) { ${compareColumn} } }`,
        { role, userId },
      )
      const token = mintToken(role, userId)
      const pgrstRes = await pgrst(
        `/${table}?select=${compareColumn}&limit=100000`,
        { token },
      )

      const hasuraDenied =
        !!hasuraRes.errors ||
        hasuraRes.data?.[table] === null ||
        hasuraRes.data?.[table] === undefined
      const pgrstDenied = DENIED_STATUS.has(pgrstRes.status)

      if (hasuraDenied && pgrstDenied) {
        bothDenied++
        return
      }
      if (hasuraDenied !== pgrstDenied) {
        failures.push(
          `${table} / ${role} / ${userId}: hasura denied=${hasuraDenied} ` +
            `(${JSON.stringify(hasuraRes.errors?.[0]?.message ?? 'ok')}), ` +
            `postgrest denied=${pgrstDenied} (status ${pgrstRes.status}, ` +
            `${JSON.stringify(pgrstRes.data)})`,
        )
        return
      }

      const hasuraIds = (hasuraRes.data[table] as Json[]).map(
        (r) => String(r[compareColumn]),
      )
      const pgrstIds = (pgrstRes.data as Json[]).map((r) =>
        String(r[compareColumn]),
      )
      if (hasuraIds.length && pgrstIds.length) bothNonEmpty++
      const setHasura = new Set(hasuraIds)
      const setPgrst = new Set(pgrstIds)
      if (hasuraIds.length !== pgrstIds.length || !hasuraIds.every((id) => setPgrst.has(id))) {
        const onlyHasura = hasuraIds.filter((id) => !setPgrst.has(id))
        const onlyPgrst = pgrstIds.filter((id) => !setHasura.has(id))
        failures.push(
          `${table} / ${role} / ${userId}: hasura ${hasuraIds.length} rows, ` +
            `postgrest ${pgrstIds.length} rows; only hasura: ${onlyHasura.slice(0, 5)}, ` +
            `only postgrest: ${onlyPgrst.slice(0, 5)}`,
        )
      }
    })

    // eslint-disable-next-line no-console
    console.log(
      `equivalence coverage: ${jobs.length} comparisons, ` +
        `${bothNonEmpty} with rows on both sides, ${bothDenied} denied on both sides`,
    )

    expect(failures, failures.join('\n')).toEqual([])
    // the comparison must have teeth: without these the test could pass
    // simply because nobody sees anything
    expect(bothNonEmpty).toBeGreaterThan(100)
  }, 300_000)
})
