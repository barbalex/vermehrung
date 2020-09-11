import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../../../../models/reactUtils'
import checkForOnlineError from '../../../../../../utils/checkForOnlineError'
import toPgArray from '../../../../../../utils/toPgArray'
import Conflict from '../../../../../shared/Conflict'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'

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
  conflictDisposalCallback,
  conflictSelectionCallback,
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

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickVerwerfen = useCallback(() => {
    revRow.setDeleted()
    conflictDisposalCallback()
  }, [conflictDisposalCallback, revRow])
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
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
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
    conflictSelectionCallback()
  }, [
    addNotification,
    conflictSelectionCallback,
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
    row._revisions,
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
