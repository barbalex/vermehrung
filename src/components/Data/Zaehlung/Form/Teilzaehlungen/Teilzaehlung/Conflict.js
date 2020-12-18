import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { StoreContext } from '../../../../../../models/reactUtils'
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
  const {
    user,
    addNotification,
    addQueuedQuery,
    deleteTeilzaehlungRevModel,
  } = store

  // need to use this query to ensure that the person's name is queried
  const [{ error, data, fetching }] = useQuery(teilzaehlungRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  const revRow = useMemo(() => data?.teilzaehlung_rev?.[0] ?? {}, [
    data?.teilzaehlung_rev,
  ])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickVerwerfen = useCallback(() => {
    // build new object
    const newDepth = revRow._depth + 1
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
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    addQueuedQuery({
      name: 'mutateInsert_teilzaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilzaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'teilzaehlung',
      revertId: revRow.teilzaehlung_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteTeilzaehlungRevModel(revRow)
    conflictDisposalCallback()
  }, [
    addQueuedQuery,
    conflictDisposalCallback,
    deleteTeilzaehlungRevModel,
    revRow,
    user.email,
  ])
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
      fetching={fetching}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(TeilzaehlungConflict)
