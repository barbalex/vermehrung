import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  store,
  dbAtom,
  lastUpdatedAtom,
  filterTableAtoms,
} from '../../../../../store/index.ts'
import { buildOptions } from '../buildOptions.ts'
import type { TableName } from '../../../../../store/index.ts'

// minimal db mock: person rows (a sync-built corpus - no label
// observables needed), empty for every other searched table
const createDbMock = (persons: Record<string, unknown>[]) => {
  const fetchMock = vi.fn(async () => persons)
  const db = {
    get: (table: string) => ({
      query: () => ({
        // only person returns rows, everything else stays empty
        fetch: table === 'person' ? fetchMock : async () => [],
      }),
    }),
  }
  return { db: db as never, fetchMock }
}

const buildPerson = (id: string, name: string) => ({
  id,
  nr: null,
  vorname: null,
  name,
  adresszusatz: null,
  strasse: null,
  plz: null,
  ort: null,
  telefon_privat: null,
  telefon_geschaeft: null,
  telefon_mobile: null,
  email: null,
  kein_email: null,
  bemerkungen: null,
  account_id: null,
  user_role_id: null,
  kommerziell: null,
  info: null,
  aktiv: null,
})

describe('buildOptions corpus cache', () => {
  let fetchMock: ReturnType<typeof createDbMock>['fetchMock']
  // a counter, not Date.now(): consecutive tests can run within the
  // same millisecond
  let testRun = 0

  beforeEach(() => {
    const mock = createDbMock([
      buildPerson('p1', 'Müller'),
      buildPerson('p2', 'Meier'),
    ])
    fetchMock = mock.fetchMock
    store.set(dbAtom, mock.db)
    store.set(lastUpdatedAtom, { person: 100 } as Record<TableName, number>)
    // a distinct filter value per test run invalidates leftovers from
    // the previous test's module-level cache
    store.set(filterTableAtoms.person, { _testRun: ++testRun })
  })

  it('returns matching person options', async () => {
    const options: unknown[] = []
    await buildOptions({ cb: (o) => options.push(...o), val: 'mül' })

    const group = options.find((o) =>
      (o as { label?: string }).label?.startsWith('Personen'),
    ) as { label: string; options: { label: string }[] } | undefined
    expect(group).toBeDefined()
    expect(group?.options).toHaveLength(1)
    expect(group?.options[0]?.label).toContain('Müller')
  })

  it('reuses the corpus while the watermark is unchanged', async () => {
    const run = async () => {
      const options: unknown[] = []
      await buildOptions({ cb: (o) => options.push(...o), val: 'me' })
      return options
    }
    await run()
    await run()
    await run()

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('rebuilds the corpus when the watermark advances', async () => {
    await buildOptions({ cb: () => undefined, val: 'me' })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    store.set(lastUpdatedAtom, { person: 200 } as Record<TableName, number>)
    await buildOptions({ cb: () => undefined, val: 'me' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('rebuilds the corpus when the filter changes', async () => {
    await buildOptions({ cb: () => undefined, val: 'me' })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    store.set(filterTableAtoms.person, { name: { value: 'Müller' } })
    await buildOptions({ cb: () => undefined, val: 'me' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
