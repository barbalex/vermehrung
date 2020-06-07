import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'

const artRevQuery = gql`
  query artRevForConflictQuery($id: uuid!, $rev: String!) {
    art_rev(where: { art_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      art_id
      ae_id
      art_rev_ae_art {
        id
        __typename
        name
      }
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
  callbackAfterVerwerfen,
  callbackAfterUebernehmen,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { user, addNotification } = store

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(artRevQuery, {
    variables: {
      rev,
      id,
    },
  })

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.art_revs.values()].find(
      (v) => v._rev === rev && v.art_id === id,
    ) || {}

  const dataArray = [
    {
      valueInRow: row?.art_ae_art?.name, // this is key in row
      valueInRev: revRow?.art_rev_ae_art?.name, // this is key in rev
      label: 'Art',
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

  //console.log('Art Conflict', { dataArray, row, revRow, id, rev })

  const onClickVerwerfen = useCallback(async () => {
    revRow.setDeleted()
    callbackAfterVerwerfen()
  }, [callbackAfterVerwerfen, revRow])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    try {
      await store.mutateInsert_art_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      })
    } catch (error) {
      addNotification({
        message: error.message,
      })
    }
    callbackAfterUebernehmen()
  }, [
    addNotification,
    callbackAfterUebernehmen,
    revRow._deleted,
    revRow.ae_id,
    revRow.art_id,
    row._depth,
    row._rev,
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
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(ArtConflict)
