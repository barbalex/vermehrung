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
  const { user, enqueNotification } = store

  const { data, error, loading } = useQuery((store) =>
    store.queryHerkunft_rev({
      where: { _rev: { _eq: rev }, herkunft_id: { _eq: id } },
    }),
  )

  const revRow = data?.herkunft_rev?.[0] ?? {}
  /*const revRow =
    [...store.herkunft_revs.values()].find(
      (v) => v._rev === rev && v.herkunft_id === id,
    ) || {}*/
  // TODO: geom_point

  const dataArray = [
    { key: 'nr', value: revRow.nr, label: 'Nr' },
    { key: 'lokalname', value: revRow.lokalname, label: 'Lokalname' },
    { key: 'gemeinde', value: revRow.gemeinde, label: 'Gemeinde' },
    { key: 'kanton', value: revRow.kanton, label: 'Kanton' },
    { key: 'land', value: revRow.land, label: 'Land' },
    {
      key: 'geom_point.coordinates',
      value: revRow?.geom_point?.coordinates,
      label: 'Längen- und Breitengrad',
    },
    { key: 'bemerkungen', value: revRow.bemerkungen, label: 'Bemerkungen' },
    { key: 'changed', value: revRow.changed, label: 'geändert' },
    { key: 'changed_by', value: revRow.changed_by, label: 'geändert von' },
  ]

  const onClickVerwerfen = useCallback(async () => {
    const depth = revRow._depth + 1
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
      _depth: depth,
      _deleted: true,
    }
    const rev = `${depth}-${md5(JSON.stringify(newObject))}`
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
      enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    callbackAfterVerwerfen()
  }, [
    callbackAfterVerwerfen,
    enqueNotification,
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
    const depth = revRow._depth + 1
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
      _depth: depth,
    }
    const rev = `${depth}-${md5(JSON.stringify(newObject))}`
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
      enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    callbackAfterUebernehmen()
  }, [
    callbackAfterUebernehmen,
    enqueNotification,
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
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(HerkunftConflict)
