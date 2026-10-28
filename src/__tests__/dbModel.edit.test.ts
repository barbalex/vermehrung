import type { Database } from '@nozbe/watermelondb'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// window stub with a localStorage mock, set before module imports
const { storageMap } = vi.hoisted((): { storageMap: Map<string, string> } => {
  const storageMap = new Map<string, string>()
  ;(globalThis as unknown as { window: unknown }).window = {
    localStorage: {
      getItem: (k: string) => (storageMap.has(k) ? storageMap.get(k) : null),
      setItem: (k: string, v: string) => storageMap.set(k, v),
      removeItem: (k: string) => storageMap.delete(k),
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

const buildFakeRow = (db: unknown) => {
  const row: Record<string, unknown> = {
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
    update: async (fn: (r: unknown) => void) => {
      fn(row)
    },
    callWriter: (fn: () => unknown) => fn(),
    edit(args: { field?: string; value?: unknown; values?: Record<string, unknown> }) {
      return Herkunft.prototype.edit.call(row, args)
    },
    database: {
      write: async (fn: () => unknown) => fn(),
    },
  }
  ;(db as { get: () => unknown }).get = () => ({
    find: () => Promise.resolve(row),
  })
  ;(db as { write: (fn: () => unknown) => unknown }).write = async (
    fn: () => unknown,
  ) => fn()
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
    store.set(
    dbAtom,
    db as unknown as Database,
  )
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
    store.set(
    dbAtom,
    db as unknown as Database,
  )
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

    const { object, on_conflict } = JSON.parse(
      query.variables as string,
    ) as { object: Record<string, unknown>; on_conflict: Record<string, unknown> }
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
    store.set(
    dbAtom,
    db as unknown as Database,
  )
    const row: Record<string, unknown> = buildFakeRow(db)
    await (
      Herkunft.prototype.edit as unknown as (
        this: unknown,
        args: { field: string; value: unknown },
      ) => Promise<void>
    ).call(row, { field: 'nr', value: 'Nr 2' })
    await flushRow('herkunft', 'herk-1')
    const query = store.get(queuedQueriesAtom)[0]

    // the drain engine reverts via updateModelValues on failure
    await (
      row.update as unknown as (
        cb: (r: Record<string, unknown>) => void,
      ) => Promise<void>
    )((r) => {
      Object.entries(query.revertValues as Record<string, unknown>).forEach(
        ([key, value]) => {
          r[key] = value
        },
      )
    })
    expect(row.nr).toBe('Nr 1')
    expect(row.gemeinde).toBe('Zürich')
  })

  it('deleting sets _deleted locally and flushes it into the revision', async () => {
    const db = buildDb()
    store.set(
    dbAtom,
    db as unknown as Database,
  )
    const row: Record<string, unknown> = buildFakeRow(db)

    await (
      Herkunft.prototype.delete as unknown as (this: unknown) => Promise<void>
    ).call(row)
    expect(row._deleted).toBe(true)
    expect(store.get(queuedQueriesAtom)).toHaveLength(0)

    await flushRow('herkunft', 'herk-1')
    const { object } = JSON.parse(
      store.get(queuedQueriesAtom)[0].variables as string,
    ) as { object: Record<string, unknown> }
    expect(object._deleted).toBe(true)
  })
})
