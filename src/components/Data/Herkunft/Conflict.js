import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'
import Conflict from '../../shared/Conflict'
import createDataArrayForRevComparison from './createDataArrayForRevComparison'

const HerkunftConflict = ({
  rev,
  row,
  conflictDisposalCallback,
  conflictSelectionCallback,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { user, addNotification } = store

  const { error, loading } = useQuery((store) =>
    store.queryHerkunft_rev({
      where: { _rev: { _eq: rev }, herkunft_id: { _eq: row.id } },
    }),
  )
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.herkunft_revs.values()].find(
        (v) => v._rev === rev && v.herkunft_id === row.id,
      ) || {},
    [rev, row.id, store.herkunft_revs],
  )
  console.log('Herkunft Conflict', { revRow, row, rev })

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow, store }),
    [revRow, row, store],
  )

  const onClickVerwerfen = useCallback(() => {
    // somehow revRow sometimes is {}
    revRow.setDeleted && revRow.setDeleted()
    setTimeout(() => conflictDisposalCallback())
  }, [conflictDisposalCallback, revRow])
  const onClickUebernehmen = useCallback(async () => {
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
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    try {
      await store.mutateInsert_herkunft_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
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
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  return (
    <Conflict
      name="Herkunft"
      rev={rev}
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
