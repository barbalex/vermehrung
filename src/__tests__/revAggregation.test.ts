import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// window stub with a localStorage mock, set before module imports
const { storageMap } = vi.hoisted(() => {
  const storageMap = new Map()
  globalThis.window = {
    localStorage: {
      getItem: (k) => (storageMap.has(k) ? storageMap.get(k) : null),
      setItem: (k, v) => storageMap.set(k, v),
      removeItem: (k) => storageMap.delete(k),
    },
    document: undefined,
  }
  return { storageMap }
})

import {
  store,
  userAtom,
  dbAtom,
  queuedQueriesAtom,
  queueSizeAtom,
  setActiveNodeArray,
} from '../store/index.ts'
import { Herkunft } from '../dbModel.ts'
import {
  flushRow,
  getUnflushedRevs,
  initRevAggregation,
  registerDirtyRev,
  __resetRevAggregationForTests,
} from '../modules/revAggregation.ts'

const STORAGE_KEY = 'vermehrung:unflushed-revs'

const buildDbForRow = (row) => ({
  get: () => ({ find: () => Promise.resolve(row) }),
  write: async (fn) => fn(),
})

beforeEach(() => {
  vi.useRealTimers()
  store.set(userAtom, { uid: 'test-uid', email: 'test@example.com' })
  store.set(queuedQueriesAtom, [])
  store.set(queueSizeAtom, 0)
  store.set(dbAtom, {
    get: () => ({ find: () => ({ fetch: async () => undefined }) }),
  })
  storageMap.clear()
  __resetRevAggregationForTests()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('revAggregation', () => {
  it('flushes a row automatically after the editing idle delay', async () => {
    vi.useFakeTimers()
    const row = {
      id: 'herk-1',
      nr: 'A',
      lokalname: null,
      gemeinde: null,
      kanton: null,
      land: null,
      geom_point: null,
      bemerkungen: null,
      _rev: '1-a',
      _parent_rev: null,
      _revisions: ['1-a'],
      _depth: 1,
      _deleted: false,
      update: async (fn) => fn(row),
      database: { write: async (fn) => fn() },
    }
    store.set(dbAtom, buildDbForRow(row))

    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'B' })
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    // further edits push the flush back
    await vi.advanceTimersByTimeAsync(4000)
    await Herkunft.prototype.edit.call(row, { field: 'gemeinde', value: 'X' })
    await vi.advanceTimersByTimeAsync(4000)
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    await vi.advanceTimersByTimeAsync(2000)
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(1)
    })
    const { object } = JSON.parse(store.get(queuedQueriesAtom)[0].variables)
    expect(object.nr).toBe('B')
    expect(object.gemeinde).toBe('X')
    expect(getUnflushedRevs()).toEqual({})
  })

  it('persists the unflushed registry across reloads (crash heal data)', async () => {
    const row = {
      id: 'herk-9',
      nr: 'A',
      lokalname: null,
      gemeinde: null,
      kanton: null,
      land: null,
      geom_point: null,
      bemerkungen: null,
      _rev: '1-a',
      _parent_rev: null,
      _revisions: ['1-a'],
      _depth: 1,
      _deleted: false,
      update: async (fn) => fn(row),
      database: { write: async (fn) => fn() },
    }
    store.set(dbAtom, buildDbForRow(row))
    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'B' })
    // no flush happened, but the registry survived in localStorage
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toEqual(
      getUnflushedRevs(),
    )
  })

  it('boot heal flushes rows left dirty by a previous session', async () => {
    // a previous session died with an unflushed edit
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ herkunft: { 'herk-7': { lastField: 'nr' } } }),
    )
    const row = {
      id: 'herk-7',
      nr: 'B',
      lokalname: null,
      gemeinde: null,
      kanton: null,
      land: null,
      geom_point: null,
      bemerkungen: null,
      _rev: '1-a',
      _parent_rev: null,
      _revisions: ['1-a'],
      _depth: 1,
      _deleted: false,
      update: async (fn) => fn(row),
      database: { write: async (fn) => fn() },
    }
    store.set(dbAtom, buildDbForRow(row))

    initRevAggregation()
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(1)
    })
    const { object } = JSON.parse(store.get(queuedQueriesAtom)[0].variables)
    // the revision was built from the row's current (surviving) state
    expect(object.nr).toBe('B')
    expect(getUnflushedRevs()).toEqual({})
  })

  it('flushing on route change drains all dirty rows', async () => {
    const rows = ['herk-a', 'herk-b'].map((id) => ({
      id,
      nr: 'A',
      lokalname: null,
      gemeinde: null,
      kanton: null,
      land: null,
      geom_point: null,
      bemerkungen: null,
      _rev: '1-a',
      _parent_rev: null,
      _revisions: ['1-a'],
      _depth: 1,
      _deleted: false,
      update: async (fn) => fn(rows.find((r) => r.id === id)),
      database: { write: async (fn) => fn() },
    }))
    const db = {
      get: () => ({
        find: (id) => Promise.resolve(rows.find((r) => r.id === id)),
      }),
      write: async (fn) => fn(),
    }
    store.set(dbAtom, db)
    for (const row of rows) {
      await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'Z' })
    }
    // navigating ends the editing session
    initRevAggregation()
    setActiveNodeArray(['Herkuenfte'])
    setActiveNodeArray(['Arten'])
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(2)
      expect(getUnflushedRevs()).toEqual({})
    }, { interval: 10 })
    expect(getUnflushedRevs()).toEqual({})
  })

  it('a row deleted before the flush is skipped gracefully', async () => {
    registerDirtyRev('herkunft', 'gone-1', 'nr', null)
    store.set(dbAtom, {
      get: () => ({
        find: () => Promise.reject(new Error('not found')),
      }),
    })
    await flushRow('herkunft', 'gone-1')
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    expect(getUnflushedRevs()).toEqual({})
  })
})
