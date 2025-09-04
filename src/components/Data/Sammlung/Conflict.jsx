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
import { createDataArrayForSammlungRevComparison as createDataArray } from './createDataArrayForRevComparison.js'

const sammlungRevQuery = gql`
  query sammlungRevForConflictQuery($id: uuid!, $rev: String!) {
    sammlung_rev(where: { sammlung_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      sammlung_id
      art_id
      person_id
      herkunft_id
      nr
      datum
      von_anzahl_individuen
      anzahl_pflanzen
      gramm_samen
      andere_menge
      geom_point
      geplant
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

export const SammlungConflict = observer(
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
      query: sammlungRevQuery,
      variables: {
        rev,
        id,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRow = useMemo(
      () => data?.sammlung_rev?.[0] ?? {},
      [data?.sammlung_rev],
    )

    const dataArray = useMemo(
      () => createDataArray({ row, revRow }),
      [revRow, row],
    )

    const onClickAktuellUebernehmen = useCallback(async () => {
      // build new object
      const newDepth = revRow._depth + 1
      const newObject = {
        sammlung_id: revRow.sammlung_id,
        art_id: revRow.art_id,
        person_id: revRow.person_id,
        herkunft_id: revRow.herkunft_id,
        nr: revRow.nr,
        datum: revRow.datum,
        von_anzahl_individuen: revRow.von_anzahl_individuen,
        anzahl_pflanzen: revRow.anzahl_pflanzen,
        gramm_samen: revRow.gramm_samen,
        andere_menge: revRow.andere_menge,
        geom_point: revRow.geom_point,
        geplant: revRow.geplant,
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
        name: 'mutateInsert_sammlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'sammlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'sammlung',
        revertId: revRow.sammlung_id,
        revertField: '_deleted',
        revertValue: false,
      })
      // update model: remove this conflict
      try {
        const model = await db.get('sammlung').find(revRow.sammlung_id)
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
      revRow.andere_menge,
      revRow.anzahl_pflanzen,
      revRow.art_id,
      revRow.bemerkungen,
      revRow.datum,
      revRow.geom_point,
      revRow.geplant,
      revRow.gramm_samen,
      revRow.herkunft_id,
      revRow.nr,
      revRow.person_id,
      revRow.sammlung_id,
      revRow.von_anzahl_individuen,
      user.email,
    ])
    const onClickWiderspruchUebernehmen = useCallback(async () => {
      // need to attach to the winner, that is row
      // otherwise risk to still have lower depth and thus loosing
      const newDepth = row._depth + 1
      const newObject = {
        sammlung_id: revRow.sammlung_id,
        art_id: revRow.art_id,
        person_id: revRow.person_id,
        herkunft_id: revRow.herkunft_id,
        nr: revRow.nr,
        datum: revRow.datum,
        von_anzahl_individuen: revRow.von_anzahl_individuen,
        anzahl_pflanzen: revRow.anzahl_pflanzen,
        gramm_samen: revRow.gramm_samen,
        andere_menge: revRow.andere_menge,
        geom_point: revRow.geom_point,
        geplant: revRow.geplant,
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
        .mutation(mutations.mutateInsert_sammlung_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'sammlung_rev_pkey',
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
      revRow.andere_menge,
      revRow.anzahl_pflanzen,
      revRow.art_id,
      revRow.bemerkungen,
      revRow.datum,
      revRow.geom_point,
      revRow.geplant,
      revRow.gramm_samen,
      revRow.herkunft_id,
      revRow.nr,
      revRow.person_id,
      revRow.sammlung_id,
      revRow.von_anzahl_individuen,
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

    //console.log('Sammlung Conflict', { dataArray, row, revRow })

    return (
      <Conflict
        name="Sammlung"
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
