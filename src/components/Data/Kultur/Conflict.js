import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'
import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'
import gartenLabelFromGarten from './gartenLabelFromGarten'

const kulturRevQuery = gql`
  query kulturRevForConflictQuery($id: uuid!, $rev: String!) {
    kultur_rev(where: { kultur_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      kultur_id
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
      herkunft_id
      herkunft {
        id
        __typename
        gemeinde
        lokalname
        nr
      }
      garten_id
      garten {
        id
        __typename
        name
        person {
          id
          __typename
          name
        }
      }
      zwischenlager
      erhaltungskultur
      von_anzahl_individuen
      bemerkungen
      aktiv
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const KulturConflict = ({
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
  const { error, loading } = useQuery(kulturRevQuery, {
    variables: {
      rev,
      id,
    },
  })

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.kultur_revs.values()].find(
      (v) => v._rev === rev && v.kultur_id === id,
    ) || {}

  console.log('Kultur Conflict', { row, revRow })

  const dataArray = [
    {
      valueInRow: row?.art?.art_ae_art?.name,
      valueInRev: revRow?.art?.art_ae_art?.name,
      label: 'Art',
    },
    {
      valueInRow: herkunftLabelFromHerkunft(row),
      valueInRev: herkunftLabelFromHerkunft(revRow),
      label: 'Herkunft',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: gartenLabelFromGarten(row),
      valueInRev: gartenLabelFromGarten(revRow),
      label: 'Garten',
    },
    {
      valueInRow: row?.zwischenlager == true,
      valueInRev: revRow?.zwischenlager == true,
      label: 'Zwischenlager',
    },
    {
      valueInRow: row?.erhaltungskultur == true,
      valueInRev: revRow?.erhaltungskultur == true,
      label: 'Erhaltungskultur',
    },
    {
      valueInRow: row?.von_anzahl_individuen,
      valueInRev: revRow?.von_anzahl_individuen,
      label: 'Von Anzahl Individuen',
    },
    {
      valueInRow: row?.bemerkungen,
      valueInRev: revRow?.bemerkungen,
      label: 'bemerkungen',
    },
    {
      valueInRow: row?.aktiv == true,
      valueInRev: revRow?.aktiv == true,
      label: 'aktiv',
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

  const onClickVerwerfen = useCallback(async () => {
    revRow.setDeleted()
    callbackAfterVerwerfen()
  }, [callbackAfterVerwerfen, revRow])
  const onClickUebernehmen = useCallback(async () => {
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
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    //console.log('Kultur Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_kultur_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
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
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Kultur Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Kultur"
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

export default observer(KulturConflict)
