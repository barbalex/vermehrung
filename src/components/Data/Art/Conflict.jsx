import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import Conflict from '../../shared/Conflict/index.jsx'
import checkForOnlineError from '../../../utils/checkForOnlineError.js'
import toPgArray from '../../../utils/toPgArray.js'
import mutations from '../../../utils/mutations.js'
import createDataArrayForRevComparison from './createDataArrayForRevComparison.js'

const artRevQuery = gql`
  query artRevForConflictQuery($id: uuid!, $rev: String!) {
    art_rev(where: { art_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      art_id
      ae_id
      set
      changed
      changed_by
      _rev
      _parent_rev
      _revisions
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
  const store = useContext(MobxStoreContext)
  const { user, addNotification, addQueuedQuery, db, gqlClient } = store

  // need to use this query to ensure that the person's name is queried
  const [{ error, data, fetching }] = useQuery({
    query: artRevQuery,
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError({ error, store })

  const revRow = useMemo(() => data?.art_rev?.[0] ?? {}, [data?.art_rev])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )

  const onClickAktuellUebernehmen = useCallback(async () => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
      set: revRow.set,
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
    // update model: remove this conflict
    try {
      const model = await db.get('art').find(revRow.art_id)
      await model.removeConflict(revRow._rev)
    } catch {}
    conflictDisposalCallback()
  }, [
    addQueuedQuery,
    conflictDisposalCallback,
    db,
    revRow._depth,
    revRow._rev,
    revRow._revisions,
    revRow.ae_id,
    revRow.set,
    revRow.art_id,
    user.email,
  ])
  const onClickWiderspruchUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      art_id: revRow.art_id,
      ae_id: revRow.ae_id,
      set: revRow.set,
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
    const response = await gqlClient
      .query(mutations.mutateInsert_art_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'art_rev_pkey',
          update_columns: ['id'],
        },
      })
      .toPromise()
    if (response.error) {
      checkForOnlineError({ error: response.error, store })
      return addNotification({
        message: response.error.message,
      })
    }
    // now we need to delete the previous conflict
    onClickAktuellUebernehmen()
    conflictSelectionCallback()
  }, [
    addNotification,
    conflictSelectionCallback,
    gqlClient,
    onClickAktuellUebernehmen,
    revRow._deleted,
    revRow.ae_id,
    revRow.set,
    revRow.art_id,
    row._depth,
    row._rev,
    row._revisions,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(
    () => setActiveConflict(null),
    [setActiveConflict],
  )

  return (
    <Conflict
      name="Art"
      rev={rev}
      dataArray={dataArray}
      fetching={fetching}
      error={error}
      onClickAktuellUebernehmen={onClickAktuellUebernehmen}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(ArtConflict)
