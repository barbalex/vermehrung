import { beforeEach, describe, expect, it } from 'vitest'
import type { Database } from '@nozbe/watermelondb'

import {
  store,
  dbAtom,
  lastUpdatedAtom,
  initiallyQueriedAtom,
  initiallyQueryingAtom,
  type TableName,
} from '../../store/index.ts'
import { processSubscriptionResult } from '../processSubscriptionResult.ts'
import type { Row } from '../apiTypes.ts'

const createRow = (raw: Row) => ({
  ...raw,
  id: raw.id,
  prepareUpdate(fn: (row: unknown) => void) {
    fn(this)
    return { kind: 'update' as const, row: this }
  },
})

// minimal WatermelonDB stand-in: keeps existing rows, records creates
const createDbMock = (existingRows: Record<string, Row[]>) => {
  const state = {
    existingRows,
    created: [] as Row[],
    updated: [] as unknown[],
    writeCalls: 0,
  }
  const db = {
    state,
    write: async (fn: () => Promise<unknown>) => {
      state.writeCalls++
      return fn()
    },
    get: (table: string) => ({
      query: () => ({
        fetch: async () => state.existingRows[table] ?? [],
      }),
      prepareCreateFromDirtyRaw: (raw: Record<string, unknown>) => {
        state.created.push(raw as Row)
        return { kind: 'create' as const, raw }
      },
    }),
    batch: async (...args: unknown[]) => {
      // batch accepts both a single array of operations or a spread
      const ops = (Array.isArray(args[0]) ? args[0] : args) as { kind?: string }[]
      ops.forEach((op) => {
        if (op.kind === 'create') return
        state.updated.push(op)
      })
    },
  }
  return db as unknown as Database & { state: typeof state }
}

const flushTimers = () => new Promise((resolve) => setTimeout(resolve, 10))

describe('processSubscriptionResult', () => {
  beforeEach(() => {
    store.set(lastUpdatedAtom, { art: 0 } as Record<TableName, number>)
    store.set(initiallyQueriedAtom, { art: false } as Record<TableName, boolean>)
    store.set(initiallyQueryingAtom, '')
  })

  it('marks the table initially queried and updates the watermark', async () => {
    const db = createDbMock({})
    store.set(dbAtom, db)

    await processSubscriptionResult({
      data: [{ id: '1', name: 'Neu', __typename: 'art' }],
      table: 'art',
    })
    await flushTimers()

    expect(store.get(initiallyQueriedAtom).art).toBe(true)
    expect(store.get(lastUpdatedAtom).art).toBeGreaterThan(0)
  })

  it('creates rows that do not exist locally', async () => {
    const db = createDbMock({})
    store.set(dbAtom, db)

    await processSubscriptionResult({
      data: [
        { id: '1', name: 'Birn', __typename: 'art' },
        { id: '2', name: 'Ahorn', __typename: 'art' },
      ],
      table: 'art',
    })
    await flushTimers()

    expect(db.state.created).toHaveLength(2)
    expect(db.state.created.map((raw) => raw.id).sort()).toEqual(['1', '2'])
  })

  it('does not touch rows that are already identical', async () => {
    const db = createDbMock({
      art: [createRow({ id: '1', name: 'Birn', ae_id: 'ae-1' })],
    })
    store.set(dbAtom, db)

    await processSubscriptionResult({
      data: [{ id: '1', name: 'Birn', ae_id: 'ae-1', __typename: 'art' }],
      table: 'art',
    })
    await flushTimers()

    expect(db.state.created).toHaveLength(0)
    expect(db.state.updated).toHaveLength(0)
  })

  it('updates rows whose remote data differs', async () => {
    const db = createDbMock({
      art: [createRow({ id: '1', name: 'Birn (alt)' })],
    })
    store.set(dbAtom, db)

    await processSubscriptionResult({
      data: [{ id: '1', name: 'Birn (neu)', __typename: 'art' }],
      table: 'art',
    })
    await flushTimers()

    expect(db.state.created).toHaveLength(0)
    expect(db.state.updated).toHaveLength(1)
  })

  it('returns early on empty data but still marks the table queried', async () => {
    const db = createDbMock({})
    store.set(dbAtom, db)

    await processSubscriptionResult({ data: [], table: 'art' })
    await flushTimers()

    expect(db.state.writeCalls).toBe(0)
    expect(store.get(initiallyQueriedAtom).art).toBe(true)
  })
})
