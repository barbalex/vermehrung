import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../../../models/reactUtils'
import checkForOnlineError from '../../../../../utils/checkForOnlineError'
import Conflict from '../../../../shared/Conflict'
import teilkulturLabelFromTeilkultur from './teilkulturLabelFromTeilkultur'

const teilzaehlungRevQuery = gql`
  query teilzaehlungRevForConflictQuery($id: uuid!, $rev: String!) {
    teilzaehlung_rev(
      where: { teilzaehlung_id: { _eq: $id }, _rev: { _eq: $rev } }
    ) {
      id
      __typename
      teilzaehlung_id
      zaehlung_id
      teilkultur_id
      teilkultur {
        id
        __typename
        name
        ort1
        ort2
        ort3
      }
      anzahl_pflanzen
      anzahl_auspflanzbereit
      anzahl_mutterpflanzen
      andere_menge
      auspflanzbereit_beschreibung
      bemerkungen
      prognose_von_tz
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const TeilzaehlungConflict = ({
  id,
  rev,
  row,
  callbackAfterVerwerfen,
  callbackAfterUebernehmen,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { user, addNotification } = store

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(teilzaehlungRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.teilzaehlung_revs.values()].find(
        (v) => v._rev === rev && v.teilzaehlung_id === id,
      ) || {},
    [id, rev, store.teilzaehlung_revs],
  )

  const dataArray = [
    {
      valueInRow: row?.zaehlung_id,
      valueInRev: revRow?.zaehlung_id,
      label: 'Zaehlung ID',
    },
    {
      valueInRow: teilkulturLabelFromTeilkultur(row?.teilkultur),
      valueInRev: teilkulturLabelFromTeilkultur(revRow?.teilkultur),
      label: 'Teilkultur',
    },
    {
      valueInRow: row?.anzahl_pflanzen,
      valueInRev: revRow?.anzahl_pflanzen,
      label: 'Anzahl Pflanzen',
    },
    {
      valueInRow: row?.anzahl_auspflanzbereit,
      valueInRev: revRow?.anzahl_auspflanzbereit,
      label: 'Anzahl auspflanzbereit',
    },
    {
      valueInRow: row?.anzahl_mutterpflanzen,
      valueInRev: revRow?.anzahl_mutterpflanzen,
      label: 'Anzahl Mutterpflanzen',
    },
    {
      valueInRow: row?.andere_menge,
      valueInRev: revRow?.andere_menge,
      label: 'Andere Menge',
    },
    {
      valueInRow: row?.auspflanzbereit_beschreibung,
      valueInRev: revRow?.auspflanzbereit_beschreibung,
      label: 'Auspflanzbereit Beschreibung',
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

  const onClickVerwerfen = useCallback(() => {
    revRow.setDeleted()
    callbackAfterVerwerfen()
  }, [callbackAfterVerwerfen, revRow])
  const onClickUebernehmen = useCallback(async () => {
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
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    //console.log('Zaehlung Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_teilzaehlung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'teilzaehlung_rev_pkey',
          update_columns: ['id'],
        },
      })
    } catch (error) {
      checkForOnlineError(error)
      addNotification({
        message: error.message,
      })
    }
    callbackAfterUebernehmen()
  }, [
    addNotification,
    callbackAfterUebernehmen,
    revRow._deleted,
    revRow.andere_menge,
    revRow.anzahl_auspflanzbereit,
    revRow.anzahl_mutterpflanzen,
    revRow.anzahl_pflanzen,
    revRow.auspflanzbereit_beschreibung,
    revRow.bemerkungen,
    revRow.prognose_von_tz,
    revRow.teilkultur_id,
    revRow.teilzaehlung_id,
    revRow.zaehlung_id,
    row._depth,
    row._rev,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Zaehlung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Zaehlung"
      rev={rev}
      dataArray={dataArray}
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(TeilzaehlungConflict)
