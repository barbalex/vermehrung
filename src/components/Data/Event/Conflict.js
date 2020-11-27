import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'

const eventRevQuery = gql`
  query eventRevForConflictQuery($id: uuid!, $rev: String!) {
    event_rev(where: { event_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      event_id
      kultur_id
      kultur {
        id
        __typename
        art {
          id
          __typename
          art_ae_art {
            id
            __typename
            name
          }
        }
        garten {
          id
          __typename
          name
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      teilkultur_id
      teilkultur {
        id
        __typename
        name
      }
      person_id
      person {
        id
        __typename
        name
      }
      beschreibung
      geplant
      datum
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const EventConflict = ({
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
  const { error, loading } = useQuery(eventRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.event_revs.values()].find(
        (v) => v._rev === rev && v.event_id === id,
      ) || {},
    [id, rev, store.event_revs],
  )

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )

  const onClickVerwerfen = useCallback(() => {
    // somehow revRow sometimes is {}
    revRow.setDeleted && revRow.setDeleted()
    conflictDisposalCallback()
  }, [conflictDisposalCallback, revRow])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      event_id: revRow.event_id,
      kultur_id: revRow.kultur_id,
      teilkultur_id: revRow.teilkultur_id,
      person_id: revRow.person_id,
      beschreibung: revRow.beschreibung,
      geplant: revRow.geplant,
      datum: revRow.datum,
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
      await store.mutateInsert_event_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'event_rev_pkey',
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
    revRow.beschreibung,
    revRow.datum,
    revRow.event_id,
    revRow.geplant,
    revRow.kultur_id,
    revRow.person_id,
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

  //console.log('Event Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Event"
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

export default observer(EventConflict)
