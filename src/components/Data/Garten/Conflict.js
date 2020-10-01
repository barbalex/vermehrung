import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'
import Conflict from '../../shared/Conflict'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'

const gartenRevQuery = gql`
  query gartenRevForConflictQuery($id: uuid!, $rev: String!) {
    garten_rev(where: { garten_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      garten_id
      name
      strasse
      plz
      ort
      geom_point
      aktiv
      bemerkungen
      changed
      changed_by
      person {
        id
        __typename
        name
      }
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const GartenConflict = ({
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
  const { error, loading } = useQuery(gartenRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.garten_revs.values()].find(
        (v) => v._rev === rev && v.garten_id === id,
      ) || {},
    [id, rev, store.garten_revs],
  )

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
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
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    //console.log('Garten Conflict', { row, revRow, newObject })
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
    conflictSelectionCallback()
  }, [
    addNotification,
    conflictSelectionCallback,
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
    row._depth,
    row._rev,
    row._revisions,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Garten Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Garten"
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

export default observer(GartenConflict)
