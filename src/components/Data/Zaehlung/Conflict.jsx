import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { mutations } from '../../../utils/mutations.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import { createDataArrayForZaehlungRevComparison as createDataArray } from './createDataArrayForRevComparison.js'

const zaehlungRevQuery = gql`
  query zaehlungRevForConflictQuery($id: uuid!, $rev: String!) {
    zaehlung_rev(where: { zaehlung_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      zaehlung_id
      kultur_id
      datum
      bedarf
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

export const ZaehlungConflict = observer(
  ({
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
      query: zaehlungRevQuery,
      variables: {
        rev,
        id,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRow = useMemo(
      () => data?.zaehlung_rev?.[0] ?? {},
      [data?.zaehlung_rev],
    )

    const dataArray = useMemo(
      () => createDataArray({ row, revRow }),
      [revRow, row],
    )

    const onClickAktuellUebernehmen = useCallback(async () => {
      // build new object
      const newDepth = revRow._depth + 1
      const newObject = {
        zaehlung_id: revRow.zaehlung_id,
        kultur_id: revRow.kultur_id,
        datum: revRow.datum,
        bedarf: revRow.bedarf,
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
      newObject._revisions =
        revRow._revisions ?
          toPgArray([rev, ...revRow._revisions])
        : toPgArray([rev])

      addQueuedQuery({
        name: 'mutateInsert_zaehlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'zaehlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'zaehlung',
        revertId: revRow.zaehlung_id,
        revertField: '_deleted',
        revertValue: false,
      })
      // update model: remove this conflict
      try {
        const model = await db.get('zaehlung').find(revRow.zaehlung_id)
        await model.removeConflict(revRow._rev)
      } catch {}
      conflictDisposalCallback()
      window.location.reload()
    }, [
      addQueuedQuery,
      conflictDisposalCallback,
      db,
      revRow._depth,
      revRow._rev,
      revRow._revisions,
      revRow.bemerkungen,
      revRow.datum,
      revRow.kultur_id,
      revRow.bedarf,
      revRow.zaehlung_id,
      user.email,
    ])
    const onClickWiderspruchUebernehmen = useCallback(async () => {
      // need to attach to the winner, that is row
      // otherwise risk to still have lower depth and thus loosing
      const newDepth = row._depth + 1
      const newObject = {
        zaehlung_id: revRow.zaehlung_id,
        kultur_id: revRow.kultur_id,
        datum: revRow.datum,
        bedarf: revRow.bedarf,
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
      newObject._revisions =
        row._revisions ? toPgArray([rev, ...row._revisions]) : toPgArray([rev])
      const response = await gqlClient
        .mutation(mutations.mutateInsert_zaehlung_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'zaehlung_rev_pkey',
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
      revRow.datum,
      revRow.kultur_id,
      revRow.bedarf,
      revRow.zaehlung_id,
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

    //console.log('Zaehlung Conflict', { dataArray, row, revRow })

    return (
      <Conflict
        name="Zaehlung"
        rev={rev}
        dataArray={dataArray}
        fetching={fetching}
        error={error}
        onClickAktuellUebernehmen={onClickAktuellUebernehmen}
        onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
        onClickSchliessen={onClickSchliessen}
      />
    )
  },
)
