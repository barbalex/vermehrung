import { beforeEach, describe, expect, it } from 'vitest'

import { Herkunft } from '../dbModel.ts'
import {
  store,
  userAtom,
  queuedQueriesAtom,
  queueSizeAtom,
  errorsAtom,
  setError,
} from '../store/index.js'

// Tests the seam between WatermelonDB row writers and the mutation queue:
// editing a field must build a correct child revision, enqueue it for the
// server with revert information, and optimistically update the local row.
// The @writer decorator only needs this.database.write(fn)

const buildFakeRow = () => {
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
    database: {
      write: async (fn) => fn(),
    },
  }
  return row
}

beforeEach(() => {
  store.set(userAtom, { uid: 'test-uid', email: 'test@example.com' })
  store.set(queuedQueriesAtom, [])
  store.set(queueSizeAtom, 0)
  store.set(errorsAtom, { herkunft: {} })
})

describe('Herkunft.edit', () => {
  it('builds a child revision and queues it for the server', async () => {
    const row = buildFakeRow()
    setError({ path: 'herkunft.nr', value: 'Fehler' })

    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'Nr 2' })

    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
    const query = store.get(queuedQueriesAtom)[0]
    expect(query.name).toBe('mutateInsert_herkunft_rev_one')
    expect(query.revertTable).toBe('herkunft')
    expect(query.revertId).toBe('herk-1')
    expect(query.revertField).toBe('nr')
    expect(query.revertValue).toBe('Nr 1')
    expect(query.newValue).toBe('Nr 2')

    const { object, on_conflict } = JSON.parse(query.variables)
    expect(on_conflict.constraint).toBe('herkunft_rev_pkey')
    // the revision references the current row as parent and deepens by one
    expect(object.herkunft_id).toBe('herk-1')
    expect(object.nr).toBe('Nr 2')
    expect(object.gemeinde).toBe('Zürich')
    expect(object._parent_rev).toBe('1-aaa')
    expect(object._depth).toBe(4)
    expect(object._deleted).toBe(false)
    expect(object.changed_by).toBe('test@example.com')
    expect(object._rev).toMatch(/^4-[0-9a-f]{32}$/)
    // edit uses toPgArray (unquoted elements - valid postgres array literal;
    // insertRev builds the quoted form instead, matching the original code)
    expect(object._revisions).toBe(`{${object._rev},1-aaa}`)

    // the field error was cleared
    expect(store.get(errorsAtom).herkunft).toEqual({})

    // the local row was optimistically updated
    expect(row.nr).toBe('Nr 2')
    expect(row._depth).toBe(4)
    expect(row._rev).toBe(object._rev)
    expect(row._parent_rev).toBe('1-aaa')
    expect(row._revisions).toEqual([object._rev, '1-aaa'])
  })

  it('reverting with the queued info restores the old value', async () => {
    const row = buildFakeRow()
    await Herkunft.prototype.edit.call(row, { field: 'nr', value: 'Nr 2' })
    const query = store.get(queuedQueriesAtom)[0]

    // the drain engine reverts via updateModelValue on failure:
    // applying the same operation the queue carries restores the row
    await row.update((r) => {
      r[query.revertField] = query.revertValue
    })
    expect(row.nr).toBe('Nr 1')
  })

  it('deleting sets _deleted in the new revision', async () => {
    const row = buildFakeRow()
    await Herkunft.prototype.edit.call(row, {
      field: '_deleted',
      value: true,
    })
    const { object } = JSON.parse(store.get(queuedQueriesAtom)[0].variables)
    expect(object._deleted).toBe(true)
    expect(row._deleted).toBe(true)
  })
})
