import React, { useCallback, useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'

import History from '../../../../../../shared/History'
import StoreContext from '../../../../../../../storeContext.js'
import checkForOnlineError from '../../../../../../../utils/checkForOnlineError'
import toPgArray from '../../../../../../../utils/toPgArray'
import mutations from '../../../../../../../utils/mutations'
import createDataArrayForRevComparison from '../createDataArrayForRevComparison'

const HistoryRow = ({ row, revRow, historyTakeoverCallback }) => {
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
      teilzaehlung_id: revRow.teilzaehlung_id,
      zaehlung_id: revRow.zaehlung_id,
      teilkultur_id: revRow.teilkultur_id,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      anzahl_mutterpflanzen: revRow.anzahl_mutterpflanzen,
      andere_menge: revRow.andere_menge,
      auspflanzbereit_beschreibung: revRow.auspflanzbereit_beschreibung,
      bemerkungen: revRow.bemerkungen,
      prognose_von_tz: revRow.prognose_von_tz,
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
      .query(mutations.mutateInsert_teilzaehlung_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'teilzaehlung_rev_pkey',
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
    delete newObjectForStore.zaehlung_id
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
    revRow.teilzaehlung_id,
    revRow.zaehlung_id,
    revRow.teilkultur_id,
    revRow.anzahl_pflanzen,
    revRow.anzahl_auspflanzbereit,
    revRow.anzahl_mutterpflanzen,
    revRow.andere_menge,
    revRow.auspflanzbereit_beschreibung,
    revRow.bemerkungen,
    revRow.prognose_von_tz,
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

export default observer(HistoryRow)
