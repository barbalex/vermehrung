import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import StoreContext from '../../../../storeContext'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import toPgArray from '../../../../utils/toPgArray'
import mutations from '../../../../utils/mutations'
import Conflict from '../../../shared/Conflict'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'

const lieferungRevQuery = gql`
  query lieferungRevForConflictQuery($id: uuid!, $rev: String!) {
    lieferung_rev(where: { lieferung_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      lieferung_id
      sammel_lieferung_id
      art_id
      person_id
      von_sammlung_id
      von_kultur_id
      datum
      nach_kultur_id
      nach_ausgepflanzt
      von_anzahl_individuen
      anzahl_pflanzen
      anzahl_auspflanzbereit
      gramm_samen
      andere_menge
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

const LieferungConflict = ({
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
    query: lieferungRevQuery,
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError({ error, store })

  const revRow = useMemo(() => data?.lieferung_rev?.[0] ?? {}, [
    data?.lieferung_rev,
  ])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickAktuellUebernehmen = useCallback(async () => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      lieferung_id: revRow.lieferung_id,
      sammel_lieferung_id: revRow.sammel_lieferung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      von_sammlung_id: revRow.von_sammlung_id,
      von_kultur_id: revRow.von_kultur_id,
      datum: revRow.datum,
      nach_kultur_id: revRow.nach_kultur_id,
      nach_ausgepflanzt: revRow.nach_ausgepflanzt,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
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
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    addQueuedQuery({
      name: 'mutateInsert_lieferung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'lieferung',
      revertId: revRow.lieferung_id,
      revertField: '_deleted',
      revertValue: false,
    })
    // update model: remove this conflict
    try {
      const model = await db.get('lieferung').find(revRow.lieferung_id)
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
    revRow.anzahl_auspflanzbereit,
    revRow.anzahl_pflanzen,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.datum,
    revRow.geplant,
    revRow.gramm_samen,
    revRow.lieferung_id,
    revRow.nach_ausgepflanzt,
    revRow.nach_kultur_id,
    revRow.person_id,
    revRow.sammel_lieferung_id,
    revRow.von_anzahl_individuen,
    revRow.von_kultur_id,
    revRow.von_sammlung_id,
    user.email,
  ])
  const onClickWiderspruchUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      lieferung_id: revRow.lieferung_id,
      sammel_lieferung_id: revRow.sammel_lieferung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      von_sammlung_id: revRow.von_sammlung_id,
      von_kultur_id: revRow.von_kultur_id,
      datum: revRow.datum,
      nach_kultur_id: revRow.nach_kultur_id,
      nach_ausgepflanzt: revRow.nach_ausgepflanzt,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
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
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    const response = await gqlClient
      .query(mutations.mutateInsert_lieferung_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
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
    revRow.anzahl_auspflanzbereit,
    revRow.anzahl_pflanzen,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.datum,
    revRow.geplant,
    revRow.gramm_samen,
    revRow.lieferung_id,
    revRow.nach_ausgepflanzt,
    revRow.nach_kultur_id,
    revRow.person_id,
    revRow.sammel_lieferung_id,
    revRow.von_anzahl_individuen,
    revRow.von_kultur_id,
    revRow.von_sammlung_id,
    row._depth,
    row._rev,
    row._revisions,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Lieferung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Lieferung"
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

export default observer(LieferungConflict)
