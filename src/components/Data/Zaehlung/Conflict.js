import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import moment from 'moment'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'
import Conflict from '../../shared/Conflict'
import kulturLabelFromKultur from './kulturLabelFromKultur'

const zaehlungRevQuery = gql`
  query zaehlungRevForConflictQuery($id: uuid!, $rev: String!) {
    zaehlung_rev(where: { zaehlung_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      zaehlung_id
      kultur_id
      kultur {
        id
        __typename
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
        art {
          id
          __typename
          art_ae_art {
            id
            __typename
            name
          }
        }
      }
      datum
      prognose
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

const ZaehlungConflict = ({
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
  const { error, loading } = useQuery(zaehlungRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.zaehlung_revs.values()].find(
        (v) => v._rev === rev && v.zaehlung_id === id,
      ) || {},
    [id, rev, store.zaehlung_revs],
  )

  const dataArray = [
    {
      valueInRow: kulturLabelFromKultur(row),
      valueInRev: kulturLabelFromKultur(revRow),
      label: 'Kultur',
    },
    {
      valueInRow: row?.datum ? moment(row.datum).format('DD.MM.YYYY') : null,
      valueInRev: revRow?.datum
        ? moment(revRow.datum).format('DD.MM.YYYY')
        : null,
      label: 'Datum',
    },
    {
      valueInRow: row?.prognose == true,
      valueInRev: revRow?.prognose == true,
      label: 'Prognose',
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
    conflictDisposalCallback()
  }, [conflictDisposalCallback, revRow])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      zaehlung_id: revRow.zaehlung_id,
      kultur_id: revRow.kultur_id,
      datum: revRow.datum,
      prognose: revRow.prognose,
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
    //console.log('Zaehlung Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_zaehlung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'zaehlung_rev_pkey',
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
    revRow.datum,
    revRow.kultur_id,
    revRow.prognose,
    revRow.zaehlung_id,
    row._depth,
    row._rev,
    row._revisions,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Zaehlung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Zaehlung"
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

export default observer(ZaehlungConflict)
