import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'

const artRevQuery = gql`
  query artRevForConflictQuery($id: uuid!, $rev: String!) {
    art_rev(where: { art_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      art_id
      ae_id
      changed
      changed_by
      _rev
      _depth
      _deleted
    }
  }
`

const ArtConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { user, addNotification, addQueuedQuery, deleteArtRevModel } = store

  // need to use this query to ensure that the person's name is queried
  const [{ error, data, fetching }] = useQuery(artRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  const revRow = useMemo(() => data?.art_rev?.[0] ?? {}, [data?.art_rev])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )

  const onClickVerwerfen = useCallback(() => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
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
      name: 'mutateInsert_art_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'art',
      revertId: revRow.art_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteArtRevModel(revRow)
    conflictDisposalCallback()
  }, [
    addQueuedQuery,
    conflictDisposalCallback,
    deleteArtRevModel,
    revRow,
    user.email,
  ])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
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
    try {
      await store.mutateInsert_art_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
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
    revRow.ae_id,
    revRow.art_id,
    row._depth,
    row._rev,
    row._revisions,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  return (
    <Conflict
      name="Art"
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

export default observer(ArtConflict)
