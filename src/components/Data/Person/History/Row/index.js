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
  const { user, addNotification, upsertPersonModel } = store

  const dataArray = [
    {
      valueInRow: row?.user_role,
      valueInRev: revRow?.user_role,
      label: 'Rolle',
    },
    {
      valueInRow: row?.nr,
      valueInRev: revRow?.nr,
      label: 'Nr',
    },
    {
      valueInRow: row?.fullname,
      valueInRev: revRow?.fullname,
      label: 'Name',
    },
    {
      valueInRow: row?.adresszusatz,
      valueInRev: revRow?.adresszusatz,
      label: 'Adresszusatz',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: row?.plz,
      valueInRev: revRow?.plz,
      label: 'PLZ',
    },
    { valueInRow: row?.ort, valueInRev: revRow?.ort, label: 'Ort' },
    {
      valueInRow: row?.telefon_privat,
      valueInRev: revRow?.telefon_privat,
      label: 'Telefon privat',
    },
    {
      valueInRow: row?.telefon_geschaeft,
      valueInRev: revRow?.telefon_geschaeft,
      label: 'Telefon Geschäft',
    },
    {
      valueInRow: row?.telefon_mobile,
      valueInRev: revRow?.telefon_mobile,
      label: 'Telefon mobile',
    },
    {
      valueInRow: row?.email,
      valueInRev: revRow?.email,
      label: 'Email',
    },
    {
      valueInRow: row?.kein_email == true,
      valueInRev: revRow?.kein_email == true,
      label: 'Kein Email',
    },
    {
      valueInRow: row?.kommerziell == true,
      valueInRev: revRow?.kommerziell == true,
      label: 'kommerziell',
    },
    {
      valueInRow: row?.info == true,
      valueInRev: revRow?.info == true,
      label: 'info',
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
      person_id: revRow.person_id,
      nr: revRow.nr,
      vorname: revRow.vorname,
      name: revRow.name,
      adresszusatz: revRow.adresszusatz,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      telefon_privat: revRow.telefon_privat,
      telefon_geschaeft: revRow.telefon_geschaeft,
      telefon_mobile: revRow.telefon_mobile,
      email: revRow.email,
      kein_email: revRow.kein_email,
      bemerkungen: revRow.bemerkungen,
      account_id: revRow.account_id,
      user_role: revRow.user_role,
      kommerziell: revRow.kommerziell,
      info: revRow.info,
      aktiv: revRow.aktiv,
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
    //console.log('Person History', { row, revRow, newObject })
    try {
      await store.mutateInsert_person_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
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
    delete newObjectForStore.person_id
    // optimistically update store
    upsertPersonModel(newObjectForStore)
  }, [
    addNotification,
    historyTakeoverCallback,
    revRow._deleted,
    revRow.account_id,
    revRow.adresszusatz,
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.email,
    revRow.info,
    revRow.kein_email,
    revRow.kommerziell,
    revRow.name,
    revRow.nr,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    revRow.telefon_geschaeft,
    revRow.telefon_mobile,
    revRow.telefon_privat,
    revRow.user_role,
    revRow.vorname,
    row._conflicts,
    row._depth,
    row._rev,
    row._revisions,
    row.id,
    store,
    upsertPersonModel,
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
