import React, { useCallback, useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'

import History from '../../../shared/History'
import StoreContext from '../../../../storeContext'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import toPgArray from '../../../../utils/toPgArray'
import createDataArrayForRevComparison from '../createDataArrayForRevComparison'

const HistoryRow = ({ row, revRow, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)
  const { user, addNotification, db } = store

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      event_id: revRow.event_id,
      kultur_id: revRow.kultur_id,
      teilkultur_id: revRow.teilkultur_id,
      person_id: revRow.person_id,
      beschreibung: revRow.beschreibung,
      geplant: revRow.geplant,
      datum: revRow.datum,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = toPgArray([rev, ...row._revisions])
    const newObjectForStore = { ...newObject }
    //console.log('Event History', { row, revRow, newObject })
    try {
      await store.mutateInsert_event_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'event_rev_pkey',
          update_columns: ['id'],
        },
      })
    } catch (error) {
      checkForOnlineError(error)
      addNotification({
        message: error.message,
      })
    }
    historyTakeoverCallback()
    // do not stringify revisions for store
    // as _that_ is a real array
    newObjectForStore._revisions = row._revisions
      ? [rev, ...row._revisions]
      : [rev]
    // TODO: is this a good idea?
    newObjectForStore._conflicts = row._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = row.id
    delete newObjectForStore.event_id
    // optimistically update store
    await db.action(async () => {
      await row.update((row) => {
        Object.entries(newObjectForStore).forEach(([key, value]) => {
          if (!isEqual(value, row[key])) {
            row[key] = value
          }
        })
      })
    })
  }, [
    addNotification,
    db,
    historyTakeoverCallback,
    revRow._deleted,
    revRow.beschreibung,
    revRow.datum,
    revRow.event_id,
    revRow.geplant,
    revRow.kultur_id,
    revRow.person_id,
    revRow.teilkultur_id,
    row,
    store,
    user.email,
  ])

  return (
    <History
      rev={revRow._rev}
      dataArray={dataArray}
      onClickUebernehmen={onClickUebernehmen}
    />
  )
}

export default observer(HistoryRow)
