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

  // need to extract raw value?
  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )
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
      user_role_id: revRow.user_role_id,
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
    revRow.user_role_id,
    revRow.vorname,
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
