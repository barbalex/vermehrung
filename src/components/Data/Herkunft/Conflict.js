import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'

const HerkunftConflict = ({
  id,
  rev,
  row,
  callbackAfterVerwerfen,
  callbackAfterUebernehmen,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { user, addNotification } = store

  const { error, loading } = useQuery((store) =>
    store.queryHerkunft_rev({
      where: { _rev: { _eq: rev }, herkunft_id: { _eq: id } },
    }),
  )

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.herkunft_revs.values()].find(
      (v) => v._rev === rev && v.herkunft_id === id,
    ) || {}
  console.log('Herkunft Conflict, revRow:', revRow)

  const dataArray = [
    { keyInRow: 'nr', valueInRev: revRow.nr, label: 'Nr' },
    { keyInRow: 'lokalname', valueInRev: revRow.lokalname, label: 'Lokalname' },
    { keyInRow: 'gemeinde', valueInRev: revRow.gemeinde, label: 'Gemeinde' },
    { keyInRow: 'kanton', valueInRev: revRow.kanton, label: 'Kanton' },
    { keyInRow: 'land', valueInRev: revRow.land, label: 'Land' },
    {
      keyInRow: 'geom_point.coordinates',
      valueInRev: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    {
      keyInRow: 'bemerkungen',
      valueInRev: revRow.bemerkungen,
      label: 'Bemerkungen',
    },
    { keyInRow: 'changed', valueInRev: revRow.changed, label: 'geändert' },
    {
      keyInRow: 'changed_by',
      valueInRev: revRow.changed_by,
      label: 'geändert von',
    },
  ]

  const onClickVerwerfen = useCallback(async () => {
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
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    try {
      await store.mutateInsert_herkunft_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
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
    callbackAfterVerwerfen,
    addNotification,
    revRow._depth,
    revRow._rev,
    revRow.bemerkungen,
    revRow.gemeinde,
    revRow.geom_point,
    revRow.herkunft_id,
    revRow.kanton,
    revRow.land,
    revRow.lokalname,
    revRow.nr,
    store,
    user.email,
  ])
  const onClickUebernehmen = useCallback(async () => {
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
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: revRow._rev,
      _depth: newDepth,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    try {
      await store.mutateInsert_herkunft_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
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
    callbackAfterUebernehmen,
    addNotification,
    revRow._depth,
    revRow._rev,
    revRow.bemerkungen,
    revRow.gemeinde,
    revRow.geom_point,
    revRow.herkunft_id,
    revRow.kanton,
    revRow.land,
    revRow.lokalname,
    revRow.nr,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  return (
    <Conflict
      name="Herkunft"
      rev={rev}
      row={row}
      dataArray={dataArray}
      dataArrayKey={JSON.stringify(dataArray)}
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(HerkunftConflict)
