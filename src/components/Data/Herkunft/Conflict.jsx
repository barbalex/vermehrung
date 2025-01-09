import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'urql'
import gql from 'graphql-tag'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { mutations } from '../../../utils/mutations.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import createDataArrayForRevComparison from './createDataArrayForRevComparison.js'

const herkunftRevQuery = gql`
  query herkunftRevForConflictQuery($id: uuid!, $rev: String!) {
    herkunft_rev(where: { herkunft_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      bemerkungen
      gemeinde
      geom_point
      herkunft_id
      kanton
      land
      lokalname
      nr
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

export const HerkunftConflict = observer(
  ({
    rev,
    row,
    conflictDisposalCallback,
    conflictSelectionCallback,
    setActiveConflict,
  }) => {
    const store = useContext(MobxStoreContext)
    const { user, addNotification, addQueuedQuery, db, gqlClient } = store

    const [{ error, data, fetching }] = useQuery({
      query: herkunftRevQuery,
      variables: {
        rev,
        id: row.id,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRow = useMemo(
      () => data?.herkunft_rev?.[0] ?? {},
      [data?.herkunft_rev],
    )

    const dataArray = useMemo(
      () => createDataArrayForRevComparison({ row, revRow, store }),
      [revRow, row, store],
    )

    const onClickAktuellUebernehmen = useCallback(async () => {
      // build new object
      const newDepth = revRow._depth + 1
      const newObject = {
        herkunft_id: revRow.herkunft_id,
        nr: revRow.nr,
        lokalname: revRow.lokalname,
        gemeinde: revRow.gemeinde,
        kanton: revRow.kanton,
        land: revRow.land,
        geom_point: revRow.geom_point,
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
        name: 'mutateInsert_herkunft_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'herkunft_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'herkunft',
        revertId: revRow.herkunft_id,
        revertField: '_deleted',
        revertValue: false,
      })
      // update model: remove this conflict
      try {
        const model = await db.get('herkunft').find(revRow.herkunft_id)
        await model.removeConflict(revRow._rev)
      } catch {}
      setTimeout(() => conflictDisposalCallback())
    }, [
      addQueuedQuery,
      conflictDisposalCallback,
      db,
      revRow._depth,
      revRow._rev,
      revRow._revisions,
      revRow.bemerkungen,
      revRow.gemeinde,
      revRow.geom_point,
      revRow.herkunft_id,
      revRow.kanton,
      revRow.land,
      revRow.lokalname,
      revRow.nr,
      user.email,
    ])
    const onClickWiderspruchUebernehmen = useCallback(async () => {
      // need to attach to the winner, that is row
      // otherwise risk to still have lower depth and thus loosing
      const newDepth = row._depth + 1
      const newObject = {
        herkunft_id: revRow.herkunft_id,
        nr: revRow.nr,
        lokalname: revRow.lokalname,
        gemeinde: revRow.gemeinde,
        kanton: revRow.kanton,
        land: revRow.land,
        geom_point: revRow.geom_point,
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
        .query(mutations.mutateInsert_herkunft_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'herkunft_rev_pkey',
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
      revRow.gemeinde,
      revRow.geom_point,
      revRow.herkunft_id,
      revRow.kanton,
      revRow.land,
      revRow.lokalname,
      revRow.nr,
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
        name="Herkunft"
        rev={rev}
        dataArray={dataArray}
        dataArrayKey={JSON.stringify(dataArray)}
        fetching={fetching}
        error={error}
        onClickAktuellUebernehmen={onClickAktuellUebernehmen}
        onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
        onClickSchliessen={onClickSchliessen}
      />
    )
  },
)
