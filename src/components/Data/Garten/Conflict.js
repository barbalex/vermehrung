import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'

const gartenRevQuery = gql`
  query gartenRevForConflictQuery($id: uuid!, $rev: String!) {
    garten_rev(where: { garten_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      name
      strasse
      ort
      aktiv
      bemerkungen
      changed
      changed_by
      person {
        id
        __typename
        name
      }
    }
  }
`

const GartenConflict = ({
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
  const { error, loading } = useQuery(gartenRevQuery, {
    variables: {
      rev,
      id,
    },
  })

  //const revRow = data?.garten_rev?.[0] ?? {}
  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.garten_revs.values()].find(
      (v) => v._rev === rev && v.garten_id === id,
    ) || {}

  const dataArray = [
    { key: 'name', value: revRow.name, label: 'Name' },
    {
      key: 'person.name',
      value: revRow?.person?.name,
      label: 'Person',
    },
    { key: 'strasse', value: revRow.strasse, label: 'Strasse' },
    {
      key: 'plz',
      value: revRow.plz,
      label: 'PLZ',
    },
    { key: 'ort', value: revRow.ort, label: 'Ort' },
    {
      key: 'geom_point.coordinates',
      value: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      key: 'aktiv',
      value: revRow.aktiv == 'true',
      label: 'aktiv',
    },
    { key: 'bemerkungen', value: revRow.bemerkungen, label: 'bemerkungen' },
    {
      key: 'changed',
      value: revRow.changed,
      label: 'geändert',
    },
    { key: 'changed_by', value: revRow.changed_by, label: 'geändert von' },
  ]

  const onClickVerwerfen = useCallback(async () => {
    const depth = revRow._depth + 1
    const newObject = {
      // TODO: remove below error - done to provoke messages
      garten_id: revRow.garten_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
      bemerkungen: revRow.bemerkungen,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: revRow._rev,
      _depth: depth,
      _deleted: true,
    }
    const rev = `${depth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    try {
      await store.mutateInsert_garten_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
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
    revRow.garten_id,
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
    const depth = revRow._depth + 1
    const newObject = {
      garten_id: revRow.garten_id,
      name: revRow.name,
      person_id: revRow.person_id,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      geom_point: revRow.geom_point,
      aktiv: revRow.aktiv,
      bemerkungen: revRow.bemerkungen,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: revRow._rev,
      _depth: depth,
    }
    const rev = `${depth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    try {
      await store.mutateInsert_garten_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'garten_rev_pkey',
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
    revRow._depth,
    revRow._rev,
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.garten_id,
    revRow.geom_point,
    revRow.name,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Garten Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Garten"
      rev={rev}
      row={row}
      dataArray={dataArray}
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(GartenConflict)
