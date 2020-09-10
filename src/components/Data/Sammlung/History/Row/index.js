import React, { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'

import History from '../../../../shared/History'
import herkunftLabelFromHerkunft from '../../herkunftLabelFromHerkunft'
import { StoreContext } from '../../../../../models/reactUtils'
import checkForOnlineError from '../../../../../utils/checkForOnlineError'
import toPgArray from '../../../../../utils/toPgArray'
import moment from 'moment'

const HistoryRow = ({ row, revRow, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)
  const { user, addNotification, upsertSammlungModel } = store

  const dataArray = [
    {
      valueInRow: row?.art?.art_ae_art?.name,
      valueInRev: revRow?.art?.art_ae_art?.name,
      label: 'Art',
    },
    {
      valueInRow: row?.person?.fullname,
      valueInRev: revRow?.person?.fullname,
      label: 'Person',
    },
    {
      valueInRow: herkunftLabelFromHerkunft(row.herkunft),
      valueInRev: herkunftLabelFromHerkunft(revRow.herkunft),
      label: 'Herkunft',
    },
    {
      valueInRow: row?.nr,
      valueInRev: revRow?.nr,
      label: 'Nr',
    },
    {
      valueInRow: moment(row?.datum).format('DD.MM.YYYY'),
      valueInRev: moment(revRow?.datum).format('DD.MM.YYYY'),
      label: 'Datum',
    },
    {
      valueInRow: row?.von_anzahl_individuen,
      valueInRev: revRow?.von_anzahl_individuen,
      label: 'Von Anzahl Individuen',
    },
    {
      valueInRow: row?.anzahl_pflanzen,
      valueInRev: revRow?.anzahl_pflanzen,
      label: 'Anzahl Pflanzen',
    },
    {
      valueInRow: row?.gramm_samen,
      valueInRev: revRow?.gramm_samen,
      label: 'Gramm Samen',
    },
    {
      valueInRow: row?.andere_menge,
      valueInRev: revRow?.andere_menge,
      label: 'Andere Menge',
    },
    {
      valueInRow: row?.geom_point?.coordinates,
      valueInRev: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      valueInRow: row?.geplant == true,
      valueInRev: revRow?.geplant == true,
      label: 'geplant',
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
      sammlung_id: revRow.sammlung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      datum: revRow.datum,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geom_point: revRow.geom_point,
      geplant: revRow.geplant,
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
    //console.log('Sammlung History', { row, revRow, newObject })
    try {
      await store.mutateInsert_sammlung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'sammlung_rev_pkey',
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
    upsertSammlungModel(newObjectForStore)
  }, [
    addNotification,
    historyTakeoverCallback,
    revRow._deleted,
    revRow.andere_menge,
    revRow.anzahl_pflanzen,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.datum,
    revRow.geom_point,
    revRow.geplant,
    revRow.gramm_samen,
    revRow.herkunft_id,
    revRow.nr,
    revRow.person_id,
    revRow.sammlung_id,
    revRow.von_anzahl_individuen,
    row._conflicts,
    row._depth,
    row._rev,
    row._revisions,
    row.id,
    store,
    upsertSammlungModel,
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
