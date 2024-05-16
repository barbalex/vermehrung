import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import StoreContext from '../../../storeContext.js'
import checkForOnlineError from '../../../utils/checkForOnlineError.js'
import toPgArray from '../../../utils/toPgArray'
import mutations from '../../../utils/mutations'
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
      name
      ort1
      ort2
      ort3
      bemerkungen
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

const TeilkulturConflict = ({
  id,
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { user, addNotification, addQueuedQuery, db, gqlClient } = store

  // need to use this query to ensure that the person's name is queried
  const [{ error, data, fetching }] = useQuery({
    query: teilkulturRevQuery,
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError({ error, store })

  const revRow = useMemo(() => data?.teilkultur_rev?.[0] ?? {}, [
    data?.teilkultur_rev,
  ])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickAktuellUebernehmen = useCallback(async () => {
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
    // update model: remove this conflict
    try {
      const model = await db.get('teilkultur').find(revRow.teilkultur_id)
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
    revRow.bemerkungen,
    revRow.kultur_id,
    revRow.name,
    revRow.ort1,
    revRow.ort2,
    revRow.ort3,
    revRow.teilkultur_id,
    user.email,
  ])
  const onClickWiderspruchUebernehmen = useCallback(async () => {
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
    const response = await gqlClient
      .query(mutations.mutateInsert_teilkultur_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'teilkultur_rev_pkey',
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
      fetching={fetching}
      error={error}
      onClickAktuellUebernehmen={onClickAktuellUebernehmen}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(TeilkulturConflict)
