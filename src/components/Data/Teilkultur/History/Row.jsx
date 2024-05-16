import React, { useCallback, useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'

import History from '../../../shared/History/index.jsx'
import StoreContext from '../../../../storeContext.js'
import checkForOnlineError from '../../../../utils/checkForOnlineError.js'
import toPgArray from '../../../../utils/toPgArray.js'
import mutations from '../../../../utils/mutations'
import createDataArrayForRevComparison from '../createDataArrayForRevComparison'

const TeilkulturHistoryRow = ({ row, revRow, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)
  const { user, addNotification, db, gqlClient } = store

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )
  const onClickWiderspruchUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      teilkultur_id: revRow.teilkultur_id,
      kultur_id: revRow.kultur_id,
      name: revRow.name,
      ort1: revRow.ort1,
      ort2: revRow.ort2,
      ort3: revRow.ort3,
      bemerkungen: revRow.bemerkungen,
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
    const response = await gqlClient
      .query(mutations.mutateInsert_teilkultur_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
          update_columns: ['id'],
        },
      })
      .toPromise()
    if (response.error) {
      checkForOnlineError({ error: response.error, store })
      return addNotification({
        message: response.error.message,
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
    delete newObjectForStore.teilkultur_id
    // optimistically update store
    await db.write(async () => {
      await row.update((row) => {
        Object.entries(newObjectForStore).forEach(([key, value]) => {
          if (!isEqual(value, row[key])) {
            row[key] = value
          }
        })
      })
    })
  }, [
    row,
    revRow.teilkultur_id,
    revRow.kultur_id,
    revRow.name,
    revRow.ort1,
    revRow.ort2,
    revRow.ort3,
    revRow.bemerkungen,
    revRow._deleted,
    user.email,
    gqlClient,
    historyTakeoverCallback,
    db,
    store,
    addNotification,
  ])

  return (
    <History
      rev={revRow._rev}
      dataArray={dataArray}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
    />
  )
}

export default observer(TeilkulturHistoryRow)
