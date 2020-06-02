import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Conflict from '../../shared/Conflict'
import kulturLabelFromKultur from './kulturLabelFromKultur'

const eventRevQuery = gql`
  query eventRevForConflictQuery($id: uuid!, $rev: String!) {
    event_rev(where: { event_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      event_id
      kultur_id
      kultur {
        id
        __typename
        art {
          id
          __typename
          art_ae_art {
            id
            __typename
            name
          }
        }
        garten {
          id
          __typename
          name
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      teilkultur_id
      teilkultur {
        id
        __typename
        name
      }
      person_id
      person {
        id
        __typename
        name
      }
      beschreibung
      geplant
      datum
      changed
      changed_by
      _rev
      _parent_rev
    }
  }
`

const EventConflict = ({
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
  const { error, loading } = useQuery(eventRevQuery, {
    variables: {
      rev,
      id,
    },
  })

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.event_revs.values()].find(
      (v) => v._rev === rev && v.event_id === id,
    ) || {}

  const dataArray = [
    {
      valueInRow: kulturLabelFromKultur(row?.kultur),
      valueInRev: kulturLabelFromKultur(revRow?.kultur),
      label: 'Kultur',
    },
    {
      valueInRow: row?.teilkultur?.name,
      valueInRev: revRow?.teilkultur?.name,
      label: 'Teilkultur',
    },
    {
      valueInRow: row?.person?.name,
      valueInRev: revRow?.person?.name,
      label: 'Person',
    },
    {
      valueInRow: row?.beschreibung,
      valueInRev: revRow?.beschreibung,
      label: 'Beschreibung',
    },
    {
      valueInRow: row?.geplant == true,
      valueInRev: revRow?.geplant == true,
      label: 'geplant',
    },
    {
      valueInRow: row.datum,
      valueInRev: revRow.datum,
      label: 'Datum',
    },
    {
      valueInRow: row.changed,
      valueInRev: revRow.changed,
      label: 'geändert',
    },
    {
      valueInRow: row.changed_by,
      valueInRev: revRow.changed_by,
      label: 'geändert von',
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
      event_id: revRow.event_id,
      kultur_id: revRow.kultur_id,
      teilkultur_id: revRow.teilkultur_id,
      person_id: revRow.person_id,
      beschreibung: revRow.beschreibung,
      geplant: revRow.geplant,
      datum: revRow.datum,
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
      _conflicts: [],
      _deleted: revRow._deleted,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    try {
      await store.mutateInsert_event_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'event_rev_pkey',
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
    revRow.beschreibung,
    revRow.datum,
    revRow.event_id,
    revRow.geplant,
    revRow.kultur_id,
    revRow.person_id,
    revRow.teilkultur_id,
    row._depth,
    row._rev,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Event Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Event"
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

export default observer(EventConflict)
