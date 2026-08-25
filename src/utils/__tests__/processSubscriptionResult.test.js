import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  store,
  dbAtom,
  lastUpdatedAtom,
  initiallyQueriedAtom,
  initiallyQueryingAtom,
} from '../../store/index.js'
import { processSubscriptionResult } from '../processSubscriptionResult.js'

const createRow = (raw) => ({
  id: raw.id,
  ...raw,
  prepareUpdate(fn) {
    fn(this)
    return { kind: 'update', row: this }
  },
})

// minimal WatermelonDB stand-in: keeps existing rows, records creates
const createDbMock = (existingRows) => {
  const state = {
    existingRows,
    created: [],
    updated: [],
    writeCalls: 0,
  }
  const db = {
    state,
    write: async (fn) => {
      state.writeCalls++
      return fn()
    },
    get: (table) => ({
      query: () => ({
        fetch: async () => state.existingRows[table] ?? [],
      }),
      prepareCreateFromDirtyRaw: (raw) => {
        state.created.push(raw)
        return { kind: 'create', raw }
      },
    }),
    batch: async (...ops) => {
      ops.forEach((op) => {
        if (op.kind === 'create') return
        state.updated.push(op)
      })
    },
  }
  return db
}

const flushTimers = () => new Promise((resolve) => setTimeout(resolve, 10))

describe('processSubscriptionResult', () => {
  beforeEach(() => {
    store.set(lastUpdatedAtom, { art: 0 })
    store.set(initiallyQueriedAtom, { art: false })
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
