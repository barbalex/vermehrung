import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'

const personRevQuery = gql`
  query personRevForConflictQuery($id: uuid!, $rev: String!) {
    person_rev(where: { person_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      person_id
      nr
      name
      adresszusatz
      strasse
      plz
      ort
      telefon_privat
      telefon_geschaeft
      telefon_mobile
      email
      kein_email
      bemerkungen
      aktiv
      user_role
      kommerziell
      info
      changed
      changed_by
      _rev
      _parent_rev
      _depth
    }
  }
`

const PersonConflict = ({
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
  const { error, loading } = useQuery(personRevQuery, {
    variables: {
      rev,
      id,
    },
  })

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.person_revs.values()].find(
      (v) => v._rev === rev && v.person_id === id,
    ) || {}

  const dataArray = [
    {
      valueInRow: row?.name,
      valueInRev: revRow?.name,
      label: 'Name',
    },
    {
      valueInRow: row?.person?.name,
      valueInRev: revRow?.person?.name,
      label: 'Person',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: row?.plz,
      valueInRev: revRow?.plz,
      label: 'PLZ',
    },
    { valueInRow: row?.ort, valueInRev: revRow?.ort, label: 'Ort' },
    {
      valueInRow: row?.geom_point?.coordinates,
      valueInRev: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      valueInRow: row?.aktiv == true,
      valueInRev: revRow?.aktiv == true,
      label: 'aktiv',
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
  ]

  const onClickVerwerfen = useCallback(async () => {
    const newDepth = revRow._depth + 1
    const newObject = {
      person_id: revRow.person_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
      bemerkungen: revRow.bemerkungen,
      changed_by: user.email,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    //console.log('Person Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_person_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
          update_columns: ['id'],
        },
      })
    } catch (error) {
      addNotification({
        message: error.message,
      })
    }
    callbackAfterVerwerfen()
  }, [
    addNotification,
    callbackAfterVerwerfen,
    revRow._depth,
    revRow._rev,
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.person_id,
    revRow.geom_point,
    revRow.name,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    store,
    user.email,
  ])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      person_id: revRow.person_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
      bemerkungen: revRow.bemerkungen,
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    //console.log('Person Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_person_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
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
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.person_id,
    revRow.geom_point,
    revRow.name,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    row._depth,
    row._rev,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Person Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Person"
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

export default observer(PersonConflict)
