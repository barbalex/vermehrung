import md5 from 'blueimp-md5'
import { v7 as uuidv7 } from 'uuid'

import {
  store,
  dbAtom,
  userAtom,
  addQueuedQuery,
  activeNodeArrayAtom,
} from '../store/index.js'
import { toPgArray } from '../utils/toPgArray.js'
import { revTableFields } from './revTableFields.js'

// Aggregates field edits into one revision per row and form session.
//
// The edit writers in dbModel.ts update the local row immediately (ui and
// labels stay live) but no longer create a revision per field change.
// Instead the row is registered here and ONE revision - built from the
// row's current state - is queued when the editing session on that row
// ends: a few seconds after the last change, when the user navigates,
// or when the tab goes to the background / closes.
//
// Durability: the registry of unflushed rows lives in localStorage. If
// the app dies before a flush, the boot heal (initRevAggregation) re-
// flushes them before the sync starts pulling server state - without
// it, the next sync would silently overwrite the unflushed edits.

const STORAGE_KEY = 'vermehrung:unflushed-revs'
// how long after the last field change a row is flushed
const FLUSH_DELAY_MS = 5000

let registry = {}
const timers = {}
const flushing = new Set()

const persist = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registry))
  } catch {
    // private mode, disabled storage or no window (tests): flushes
    // still work, only the crash heal degrades
  }
}

// exposed for tests
export const getUnflushedRevs = () => JSON.parse(JSON.stringify(registry))

// rows with unflushed local edits: server state must not overwrite
// them - the edits reach the server with the next flush and the sync
// after it reconciles the row (conflict semantics apply, as with any
// parallel edit)
export const isUnflushedRev = (table, id) => Boolean(registry[table]?.[id])

export const registerDirtyRev = (table, id, lastField, row) => {
  const existing = registry[table]?.[id]
  if (!existing) {
    // snapshot the pre-session state: it is the revert target if the
    // flushed revision is rejected by the server
    const original = {}
    if (row) {
      for (const field of revTableFields[table].fields) {
        if (field !== revTableFields[table].idField)
          original[field] = row[field]
      }
    }
    registry[table] = {
      ...(registry[table] ?? {}),
      [id]: { lastField, original },
    }
  } else {
    existing.lastField = lastField
  }
  persist()
  clearTimeout(timers[`${table}/${id}`])
  timers[`${table}/${id}`] = setTimeout(() => {
    delete timers[`${table}/${id}`]
    void flushRow(table, id)
  }, FLUSH_DELAY_MS)
}

const clearDirty = (table, id) => {
  clearTimeout(timers[`${table}/${id}`])
  delete timers[`${table}/${id}`]
  if (registry[table]) {
    delete registry[table][id]
    if (!Object.keys(registry[table]).length) delete registry[table]
    persist()
  }
}

// builds ONE revision from the row's current state and queues it -
// the aggregated equivalent of the former per-field edit writer
export const flushRow = async (table, id) => {
  const config = revTableFields[table]
  if (!config) return
  const key = `${table}/${id}`
  if (flushing.has(key)) return
  flushing.add(key)
  try {
    const db = store.get(dbAtom)
    let row
    try {
      row = await db.get(table).find(id)
    } catch {
      // row was deleted (e.g. by a login wipe) - nothing to flush
      clearDirty(table, id)
      return
    }

    const { idField, fields } = config
    const newObject = { [idField]: row.id }
    for (const field of fields) {
      if (field === idField) continue
      newObject[field] = row[field]
    }
    newObject._parent_rev = row._rev
    newObject._depth = row._depth + 1
    newObject._deleted = row._deleted

    const rev = `${newObject._depth}-${md5(JSON.stringify(newObject))}`
    // DO NOT include id in rev - or revs with same data will conflict
    newObject.id = uuidv7()
    newObject._rev = rev
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new Date().toISOString()
    newObject.changed_by = store.get(userAtom)?.email
    // convert to string as the api does not support arrays here
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])

    // on a server rejection the row is reverted to its pre-session
    // state. the last edited field additionally gets the inline error
    const revertValues = registry[table]?.[id]?.original ?? {}
    const lastField = registry[table]?.[id]?.lastField

    addQueuedQuery({
      name: `mutateInsert_${table}_rev_one`,
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: `${table}_rev_pkey`,
          update_columns: ['id'],
        },
      }),
      revertTable: table,
      revertId: id,
      revertValues,
      revertField: lastField,
    })

    // optimistically update the row's chain
    const newRevisions = row._revisions ? [rev, ...row._revisions] : [rev]
    await db.write(async () => {
      await row.update((r) => {
        r._depth = newObject._depth
        r._rev = newObject._rev
        r._parent_rev = newObject._parent_rev
        r.changed = newObject.changed
        r.changed_by = newObject.changed_by
        r._revisions = newRevisions
      })
    })
    clearDirty(table, id)
  } finally {
    flushing.delete(key)
  }
}

export const flushAllDirtyRevs = async () => {
  const tables = Object.keys(registry)
  for (const table of tables) {
    for (const id of Object.keys(registry[table] ?? {})) {
      await flushRow(table, id)
    }
  }
}

let initialized = false
let unsubscribeNavigation = null

// reset the module state between tests
export const __resetRevAggregationForTests = () => {
  for (const key of Object.keys(timers)) {
    clearTimeout(timers[key])
    delete timers[key]
  }
  registry = {}
  initialized = false
  unsubscribeNavigation?.()
  unsubscribeNavigation = null
}

// call once after the db exists: flushes rows whose edit never made it
// into a revision (crash, closed tab) and wires the flush triggers
export const initRevAggregation = () => {
  if (initialized) return
  initialized = true
  try {
    registry = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    registry = {}
  }
  // boot heal, before the sync starts pulling server state
  void flushAllDirtyRevs()
  // navigating away from a form ends its editing session
  unsubscribeNavigation = store.sub(activeNodeArrayAtom, () => {
    void flushAllDirtyRevs()
  })
  // so does leaving the app
  if (typeof window !== 'undefined' && window.document) {
    window.document.addEventListener('visibilitychange', () => {
      if (window.document.visibilityState === 'hidden') void flushAllDirtyRevs()
    })
    window.addEventListener('pagehide', () => {
      void flushAllDirtyRevs()
    })
  }
}
