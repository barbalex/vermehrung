import React, { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import History from '../../../../shared/History'
import { StoreContext } from '../../../../../models/reactUtils'
import checkForOnlineError from '../../../../../utils/checkForOnlineError'
import toPgArray from '../../../../../utils/toPgArray'

const HistoryRow = ({ row, revRow, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)
  const { user, addNotification, upsertHerkunftModel } = store

  const dataArray = [
    { valueInRow: row?.nr, valueInRev: revRow?.nr, label: 'Nr' },
    {
      valueInRow: row?.lokalname,
      valueInRev: revRow?.lokalname,
      label: 'Lokalname',
    },
    {
      valueInRow: row?.gemeinde,
      valueInRev: revRow?.gemeinde,
      label: 'Gemeinde',
    },
    { valueInRow: row?.kanton, valueInRev: revRow?.kanton, label: 'Kanton' },
    { valueInRow: row?.land, valueInRev: revRow?.land, label: 'Land' },
    {
      valueInRow: row?.geom_point?.coordinates,
      valueInRev: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      valueInRow: row?.bemerkungen,
      valueInRev: revRow?.bemerkungen,
      label: 'Bemerkungen',
    },
    {
      valueInRow: row?.changed,
      valueInRev: revRow?.changed,
      label: 'geändert',
    },
    {
      valueInRow: row?.changed_by,
      valueInRev: revRow?.changed_by,
      label: 'geändert von',
    },
    {
      valueInRow: row._deleted,
      valueInRev: revRow._deleted,
      label: 'gelöscht',
    },
  ]
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      lokalname: revRow.lokalname,
      gemeinde: revRow.gemeinde,
      kanton: revRow.kanton,
      land: revRow.land,
      geom_point: revRow.geom_point,
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
    //console.log('Herkunft History', { row, revRow, newObject })
    try {
      await store.mutateInsert_herkunft_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
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
    delete newObjectForStore.kultur_id
    // optimistically update store
    upsertHerkunftModel(newObjectForStore)
  }, [
    addNotification,
    historyTakeoverCallback,
    revRow._deleted,
    revRow.bemerkungen,
    revRow.gemeinde,
    revRow.geom_point,
    revRow.herkunft_id,
    revRow.kanton,
    revRow.land,
    revRow.lokalname,
    revRow.nr,
    row._conflicts,
    row._depth,
    row._rev,
    row._revisions,
    row.id,
    store,
    upsertHerkunftModel,
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