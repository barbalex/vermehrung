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

const teilkulturRevQuery = gql`
  query teilkulturRevForConflictQuery($id: uuid!, $rev: String!) {
    teilkultur_rev(
      where: { teilkultur_id: { _eq: $id }, _rev: { _eq: $rev } }
    ) {
      id
      __typename
      teilkultur_id
      kultur_id
      kultur {
        id
        __typename
        garten {
          id
          __typename
          name
          person {
            id
            __typename
            name
          }
        }
        art {
          id
          __typename
          art_ae_art {
            id
            __typename
            name
          }
        }
      }
      name
      ort1
      ort2
      ort3
      bemerkungen
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const TeilkulturConflict = ({
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
    deleteTeilkulturRevModel,
  } = store

  // need to use this query to ensure that the person's name is queried
  const { error, data, loading } = useQuery(teilkulturRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  const revRow = useMemo(() => data?.teilkultur_rev?.[0] ?? {}, [
    data?.teilkultur_rev,
  ])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )

  const onClickVerwerfen = useCallback(() => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      teilkultur_id: revRow.teilkultur_id,
      kultur_id: revRow.kultur_id,
      name: revRow.name,
      ort1: revRow.ort1,
      ort2: revRow.ort2,
      ort3: revRow.ort3,
      bemerkungen: revRow.bemerkungen,
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
      name: 'mutateInsert_teilkultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'teilkultur',
      revertId: revRow.teilkultur_id,
      revertField: '_deleted',
      revertValue: false,
    })
    deleteTeilkulturRevModel(revRow)
    conflictDisposalCallback()
  }, [
    addQueuedQuery,
    conflictDisposalCallback,
    deleteTeilkulturRevModel,
    revRow,
    user.email,
  ])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      teilkultur_id: revRow.teilkultur_id,
      kultur_id: revRow.kultur_id,
      name: revRow.name,
      ort1: revRow.ort1,
      ort2: revRow.ort2,
      ort3: revRow.ort3,
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
    //console.log('Teilkultur Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_teilkultur_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
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
    revRow.bemerkungen,
    revRow.kultur_id,
    revRow.name,
    revRow.ort1,
    revRow.ort2,
    revRow.ort3,
    revRow.teilkultur_id,
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
      name="Teilkultur"
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

export default observer(TeilkulturConflict)
