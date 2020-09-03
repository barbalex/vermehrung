import React, { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import History from '../../../shared/History'
import herkunftLabelFromHerkunft from '../Form/herkunftLabelFromHerkunft'
import gartenLabelFromGarten from '../Form/gartenLabelFromGarten'
import { StoreContext } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import toPgArray from '../../../../utils/toPgArray'

const HistoryRow = ({ row, revRow, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)
  const { user, addNotification, upsertKulturModel } = store

  const dataArray = [
    {
      valueInRow: row?.art?.art_ae_art?.name,
      valueInRev: revRow?.art?.art_ae_art?.name,
      label: 'Art',
    },
    {
      valueInRow: herkunftLabelFromHerkunft(row),
      valueInRev: herkunftLabelFromHerkunft(revRow),
      label: 'Herkunft',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: gartenLabelFromGarten(row),
      valueInRev: gartenLabelFromGarten(revRow),
      label: 'Garten',
    },
    {
      valueInRow: row?.zwischenlager == true,
      valueInRev: revRow?.zwischenlager == true,
      label: 'Zwischenlager',
    },
    {
      valueInRow: row?.erhaltungskultur == true,
      valueInRev: revRow?.erhaltungskultur == true,
      label: 'Erhaltungskultur',
    },
    {
      valueInRow: row?.von_anzahl_individuen,
      valueInRev: revRow?.von_anzahl_individuen,
      label: 'Von Anzahl Individuen',
    },
    {
      valueInRow: row?.bemerkungen,
      valueInRev: revRow?.bemerkungen,
      label: 'bemerkungen',
    },
    {
      valueInRow: row?.aktiv == true,
      valueInRev: revRow?.aktiv == true,
      label: 'aktiv',
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
      kultur_id: revRow.kultur_id,
      art_id: revRow.art_id,
      herkunft_id: revRow.herkunft_id,
      garten_id: revRow.garten_id,
      zwischenlager: revRow.zwischenlager,
      erhaltungskultur: revRow.erhaltungskultur,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      bemerkungen: revRow.bemerkungen,
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
    //console.log('Kultur History', { row, revRow, newObject })
    try {
      await store.mutateInsert_kultur_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
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
    upsertKulturModel(newObjectForStore)
  }, [
    addNotification,
    historyTakeoverCallback,
    revRow._deleted,
    revRow.aktiv,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.erhaltungskultur,
    revRow.garten_id,
    revRow.herkunft_id,
    revRow.kultur_id,
    revRow.von_anzahl_individuen,
    revRow.zwischenlager,
    row._conflicts,
    row._depth,
    row._rev,
    row._revisions,
    row.id,
    store,
    upsertKulturModel,
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
