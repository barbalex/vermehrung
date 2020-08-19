import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import moment from 'moment'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import Conflict from '../../shared/Conflict'
import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'

const sammlungRevQuery = gql`
  query sammlungRevForConflictQuery($id: uuid!, $rev: String!) {
    sammlung_rev(where: { sammlung_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      sammlung_id
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
      herkunft_id
      herkunft {
        id
        __typename
        gemeinde
        lokalname
        nr
      }
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
      _depth
      _deleted
    }
  }
`

const SammlungConflict = ({
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
  const { error, loading } = useQuery(sammlungRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.sammlung_revs.values()].find(
        (v) => v._rev === rev && v.sammlung_id === id,
      ) || {},
    [id, rev, store.sammlung_revs],
  )

  const dataArray = [
    {
      valueInRow: row?.art?.art_ae_art?.name,
      valueInRev: revRow?.art?.art_ae_art?.name,
      label: 'Art',
    },
    {
      valueInRow: row?.person?.fullname,
      valueInRev: revRow?.person?.fullname,
      label: 'Person',
    },
    {
      valueInRow: herkunftLabelFromHerkunft(row.herkunft),
      valueInRev: herkunftLabelFromHerkunft(revRow.herkunft),
      label: 'Herkunft',
    },
    {
      valueInRow: row?.nr,
      valueInRev: revRow?.nr,
      label: 'Nr',
    },
    {
      valueInRow: moment(row?.datum).format('DD.MM.YYYY'),
      valueInRev: moment(revRow?.datum).format('DD.MM.YYYY'),
      label: 'Datum',
    },
    {
      valueInRow: row?.von_anzahl_individuen,
      valueInRev: revRow?.von_anzahl_individuen,
      label: 'Von Anzahl Individuen',
    },
    {
      valueInRow: row?.anzahl_pflanzen,
      valueInRev: revRow?.anzahl_pflanzen,
      label: 'Anzahl Pflanzen',
    },
    {
      valueInRow: row?.gramm_samen,
      valueInRev: revRow?.gramm_samen,
      label: 'Gramm Samen',
    },
    {
      valueInRow: row?.andere_menge,
      valueInRev: revRow?.andere_menge,
      label: 'Andere Menge',
    },
    {
      valueInRow: row?.geom_point?.coordinates,
      valueInRev: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      valueInRow: row?.geplant == true,
      valueInRev: revRow?.geplant == true,
      label: 'geplant',
    },
    {
      valueInRow: row?.bemerkungen,
      valueInRev: revRow?.bemerkungen,
      label: 'bemerkungen',
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

  const onClickVerwerfen = useCallback(() => {
    revRow.setDeleted()
    callbackAfterVerwerfen()
  }, [callbackAfterVerwerfen, revRow])
  const onClickUebernehmen = useCallback(async () => {
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
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    //console.log('Sammlung Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_sammlung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'sammlung_rev_pkey',
          update_columns: ['id'],
        },
      })
    } catch (error) {
      checkForOnlineError(error)
      addNotification({
        message: error.message,
      })
    }
    callbackAfterUebernehmen()
  }, [
    addNotification,
    callbackAfterUebernehmen,
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
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Sammlung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Sammlung"
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

export default observer(SammlungConflict)
