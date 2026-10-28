import { beforeEach, describe, expect, it, vi } from 'vitest'

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

import { Herkunft } from '../dbModel.ts'
import {
  store,
  userAtom,
  dbAtom,
  queuedQueriesAtom,
  queueSizeAtom,
  errorsAtom,
  setError,
} from '../store/index.ts'
import { flushRow, getUnflushedRevs } from '../modules/revAggregation.ts'

// Tests the seam between WatermelonDB row writers and the revision
// aggregation: editing a field updates the local row immediately (ui and
// labels stay live) but does NOT create a revision. One revision per row
// and editing session is queued when the row is flushed.
// The @writer decorator only needs this.database.write(fn)

const buildFakeRow = (db) => {
  const row = {
    id: 'herk-1',
    nr: 'Nr 1',
    lokalname: null,
    gemeinde: 'Zürich',
    kanton: null,
    land: null,
    geom_point: null,
    bemerkungen: null,
    _rev: '1-aaa',
    _parent_rev: null,
    _revisions: ['1-aaa'],
    _depth: 3,
    _deleted: false,
    update: async (fn) => {
      fn(row)
    },
    callWriter: (fn) => fn(),
    edit(args) {
      return Herkunft.prototype.edit.call(row, args)
    },
    database: {
      write: async (fn) => fn(),
    },
  }
  db.get = () => ({ find: () => Promise.resolve(row) })
  db.write = async (fn) => fn()
  return row
}

const buildDb = () => ({
  get: () => ({ find: () => ({ fetch: async () => undefined }) }),
})

beforeEach(() => {
  vi.useRealTimers()
  store.set(userAtom, { uid: 'test-uid', email: 'test@example.com' })
  store.set(queuedQueriesAtom, [])
  store.set(queueSizeAtom, 0)
  store.set(errorsAtom, { herkunft: {} })
  storageMap.clear()
  window.localStorage.removeItem('vermehrung:unflushed-revs')
})

describe('Herkunft.edit + flushRow', () => {
  it('updates the row immediately without queueing a revision', async () => {
    const db = buildDb()
    store.set(dbAtom, db)
    const row = buildFakeRow(db)
    setError({ path: 'herkunft.nr', value: 'Fehler' })

    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'Nr 2' })

    // immediate local update - labels depend on it
    expect(row.nr).toBe('Nr 2')
    expect(row.changed_by).toBe('test@example.com')
    // the field error was cleared
    expect(store.get(errorsAtom).herkunft).toEqual({})
    // no revision yet, and the chain is untouched
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    expect(row._depth).toBe(3)
    expect(row._rev).toBe('1-aaa')
    // but the row is registered as unflushed, with its pre-session
    // state as the revert target
    expect(getUnflushedRevs()).toEqual({
      herkunft: {
        'herk-1': {
          lastField: 'nr',
          original: {
            nr: 'Nr 1',
            lokalname: null,
            gemeinde: 'Zürich',
            kanton: null,
            land: null,
            geom_point: null,
            bemerkungen: null,
            _parent_rev: null,
            _depth: 3,
            _deleted: false,
          },
        },
      },
    })
  })

  it('flushing builds one revision from the current row state', async () => {
    const db = buildDb()
    store.set(dbAtom, db)
    const row = buildFakeRow(db)

    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'Nr 2' })
    await Herkunft.prototype.edit.call(row, {
      field: 'gemeinde',
      value: 'Basel',
    })
    await flushRow('herkunft', 'herk-1')

    // two edits, ONE queued revision
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
    const query = store.get(queuedQueriesAtom)[0]
    expect(query.name).toBe('mutateInsert_herkunft_rev_one')
    expect(query.revertTable).toBe('herkunft')
    expect(query.revertId).toBe('herk-1')

    const { object, on_conflict } = JSON.parse(query.variables)
    expect(on_conflict.constraint).toBe('herkunft_rev_pkey')
    // the revision captures BOTH edits
    expect(object.herkunft_id).toBe('herk-1')
    expect(object.nr).toBe('Nr 2')
    expect(object.gemeinde).toBe('Basel')
    expect(object.lokalname).toBe(null)
    // the revision references the current row as parent and deepens by one
    expect(object._parent_rev).toBe('1-aaa')
    expect(object._depth).toBe(4)
    expect(object._deleted).toBe(false)
    expect(object.changed_by).toBe('test@example.com')
    expect(object._rev).toMatch(/^4-[0-9a-f]{32}$/)
    expect(object._revisions).toBe(`{${object._rev},1-aaa}`)
    // aggregated flushes revert to the full pre-flush state
    expect(query.revertValues).toEqual({
      nr: 'Nr 1',
      lokalname: null,
      gemeinde: 'Zürich',
      kanton: null,
      land: null,
      geom_point: null,
      bemerkungen: null,
      _parent_rev: null,
      _depth: 3,
      _deleted: false,
    })

    // the local row's chain caught up
    expect(row._depth).toBe(4)
    expect(row._rev).toBe(object._rev)
    expect(row._parent_rev).toBe('1-aaa')
    expect(row._revisions).toEqual([object._rev, '1-aaa'])
    // the registry is clean again
    expect(getUnflushedRevs()).toEqual({})
  })

  it('reverting with the queued info restores the pre-flush values', async () => {
    const db = buildDb()
    store.set(dbAtom, db)
    const row = buildFakeRow(db)
    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'Nr 2' })
    await flushRow('herkunft', 'herk-1')
    const query = store.get(queuedQueriesAtom)[0]

    // the drain engine reverts via updateModelValues on failure
    await row.update((r) => {
      Object.entries(query.revertValues).forEach(([key, value]) => {
        r[key] = value
      })
    })
    expect(row.nr).toBe('Nr 1')
    expect(row.gemeinde).toBe('Zürich')
  })

  it('deleting sets _deleted locally and flushes it into the revision', async () => {
    const db = buildDb()
    store.set(dbAtom, db)
    const row = buildFakeRow(db)

    await Herkunft.prototype.delete.call(row)
    expect(row._deleted).toBe(true)
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)

    await flushRow('herkunft', 'herk-1')
    const { object } = JSON.parse(store.get(queuedQueriesAtom)[0].variables)
    expect(object._deleted).toBe(true)
  })
})
