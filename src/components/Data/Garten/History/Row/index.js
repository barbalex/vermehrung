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
  const { user, addNotification, upsertGartenModel } = store

  const dataArray = [
    {
      valueInRow: row?.name,
      valueInRev: revRow?.name,
      label: 'Name',
    },
    {
      valueInRow: row?.person?.fullname,
      valueInRev: revRow?.person?.fullname,
      label: 'Person',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: row?.plz,
      valueInRev: revRow?.plz,
      label: 'PLZ',
    },
    { valueInRow: row?.ort, valueInRev: revRow?.ort, label: 'Ort' },
    {
      valueInRow: row?.geom_point?.coordinates,
      valueInRev: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      valueInRow: row?.aktiv == true,
      valueInRev: revRow?.aktiv == true,
      label: 'aktiv',
    },
    {
      valueInRow: row?.bemerkungen,
      valueInRev: revRow?.bemerkungen,
      label: 'bemerkungen',
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
      garten_id: revRow.garten_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
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
    //console.log('Kultur History', { row, revRow, newObject })
    try {
      await store.mutateInsert_garten_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
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
    upsertGartenModel(newObjectForStore)
  }, [
    addNotification,
    historyTakeoverCallback,
    revRow._deleted,
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.garten_id,
    revRow.geom_point,
    revRow.name,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    row._conflicts,
    row._depth,
    row._rev,
    row._revisions,
    row.id,
    store,
    upsertGartenModel,
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
