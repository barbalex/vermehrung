import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import moment from 'moment'

import { useQuery, StoreContext } from '../../../../../models/reactUtils'
import checkForOnlineError from '../../../../../utils/checkForOnlineError'
import Conflict from '../../../../shared/Conflict'

const zaehlungRevQuery = gql`
  query zaehlungRevForConflictQuery($id: uuid!, $rev: String!) {
    teilzaehlung_rev(
      where: { zaehlung_id: { _eq: $id }, _rev: { _eq: $rev } }
    ) {
      id
      __typename
      teilzaehlung_id
      zaehlung_id
      teilkultur_id
      anzahl_pflanzen
      anzahl_auspflanzbereit
      anzahl_mutterpflanzen
      andere_menge
      auspflanzbereit_beschreibung
      bemerkungen
      prognose_von_tz
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const TeilzaehlungConflict = ({
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
  const { error, loading } = useQuery(zaehlungRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.zaehlung_revs.values()].find(
      (v) => v._rev === rev && v.zaehlung_id === id,
    ) || {}

  const dataArray = [
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

  const onClickVerwerfen = useCallback(async () => {
    revRow.setDeleted()
    callbackAfterVerwerfen()
  }, [callbackAfterVerwerfen, revRow])
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
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
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
    callbackAfterUebernehmen()
  }, [
    addNotification,
    callbackAfterUebernehmen,
    revRow._deleted,
    revRow.bemerkungen,
    revRow.datum,
    revRow.kultur_id,
    revRow.prognose,
    revRow.zaehlung_id,
    row._depth,
    row._rev,
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

export default observer(TeilzaehlungConflict)
