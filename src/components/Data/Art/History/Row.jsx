import React, { useCallback, useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'

import { History } from '../../../shared/History/index.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../../utils/toPgArray.js'
import { mutations } from '../../../../utils/mutations.js'
import { createDataArrayForRevComparison } from '../createDataArrayForRevComparison.js'

export const Row = observer(({ row, revRow, historyTakeoverCallback }) => {
  const store = useContext(MobxStoreContext)
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
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
      set: revRow.set,
      apflora_av: revRow.apflora_av,
      apflora_ap: revRow.apflora_ap,
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
      .query(mutations.mutateInsert_art_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
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
    newObjectForStore._revisions =
      row._revisions ? [rev, ...row._revisions] : [rev]
    // TODO: is this a good idea?
    newObjectForStore._conflicts = row._conflicts
    // for store: convert rev to winner
    newObjectForStore.id = row.id
    delete newObjectForStore.kultur_id
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
    revRow.art_id,
    revRow.ae_id,
    revRow.set,
    revRow.apflora_av,
    revRow.apflora_ap,
    revRow._deleted,
    user.email,
    gqlClient,
    historyTakeoverCallback,
    db,
    store,
    addNotification,
  ])

  // console.log('Art History row', { revRow, row, dataArray })

  return (
    <History
      rev={revRow._rev}
      dataArray={dataArray}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
    />
  )
})
