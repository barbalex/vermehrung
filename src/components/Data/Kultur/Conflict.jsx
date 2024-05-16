import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import StoreContext from '../../../storeContext.js'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'
import mutations from '../../../utils/mutations'
import Conflict from '../../shared/Conflict'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'

const kulturRevQuery = gql`
  query kulturRevForConflictQuery($id: uuid!, $rev: String!) {
    kultur_rev(where: { kultur_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      kultur_id
      art_id
      herkunft_id
      garten_id
      zwischenlager
      erhaltungskultur
      von_anzahl_individuen
      bemerkungen
      aktiv
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

const KulturConflict = ({
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
    query: kulturRevQuery,
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError({ error, store })

  const revRow = useMemo(() => data?.kultur_rev?.[0] ?? {}, [data?.kultur_rev])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickAktuellUebernehmen = useCallback(async () => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      kultur_id: revRow.kultur_id,
      art_id: revRow.art_id,
      herkunft_id: revRow.herkunft_id,
      garten_id: revRow.garten_id,
      zwischenlager: revRow.zwischenlager,
      erhaltungskultur: revRow.erhaltungskultur,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      bemerkungen: revRow.bemerkungen,
      aktiv: revRow.aktiv,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    // do not revision the following fields as this leads to unwanted conflicts
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    addQueuedQuery({
      name: 'mutateInsert_kultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'kultur',
      revertId: revRow.kultur_id,
      revertField: '_deleted',
      revertValue: false,
    })
    // update model: remove this conflict
    try {
      const model = await db.get('kultur').find(revRow.kultur_id)
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
    revRow.aktiv,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.erhaltungskultur,
    revRow.garten_id,
    revRow.herkunft_id,
    revRow.kultur_id,
    revRow.von_anzahl_individuen,
    revRow.zwischenlager,
    user.email,
  ])
  const onClickWiderspruchUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      kultur_id: revRow.kultur_id,
      art_id: revRow.art_id,
      herkunft_id: revRow.herkunft_id,
      garten_id: revRow.garten_id,
      zwischenlager: revRow.zwischenlager,
      erhaltungskultur: revRow.erhaltungskultur,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      bemerkungen: revRow.bemerkungen,
      aktiv: revRow.aktiv,
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
      .query(mutations.mutateInsert_kultur_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
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
    revRow.aktiv,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.erhaltungskultur,
    revRow.garten_id,
    revRow.herkunft_id,
    revRow.kultur_id,
    revRow.von_anzahl_individuen,
    revRow.zwischenlager,
    row._depth,
    row._rev,
    row._revisions,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  console.log('Kultur Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Kultur"
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

export default observer(KulturConflict)
