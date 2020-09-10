import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import toPgArray from '../../../../utils/toPgArray'
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
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
      person_id
      person {
        id
        __typename
        name
      }
      von_sammlung_id
      sammlung {
        id
        __typename
        datum
        herkunft {
          id
          __typename
          nr
        }
        person {
          id
          __typename
          name
        }
      }
      von_kultur_id
      kulturByVonKulturId {
        id
        __typename
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      datum
      nach_kultur_id
      kulturByNachKulturId {
        id
        __typename
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
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
  const { user, addNotification } = store

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(lieferungRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.lieferung_revs.values()].find(
        (v) => v._rev === rev && v.lieferung_id === id,
      ) || {},
    [id, rev, store.lieferung_revs],
  )

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickVerwerfen = useCallback(() => {
    revRow.setDeleted()
    conflictDisposalCallback()
  }, [conflictDisposalCallback, revRow])
  const onClickUebernehmen = useCallback(async () => {
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
    //console.log('Lieferung Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_lieferung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
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
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(LieferungConflict)
