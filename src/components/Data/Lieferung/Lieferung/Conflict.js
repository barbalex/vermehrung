import React, { useCallback, useContext } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import moment from 'moment'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import Conflict from '../../../shared/Conflict'
import sammlungLabelFromSammlung from './sammlungLabelFromSammlung'
import kulturLabelFromKultur from './kulturLabelFromKultur'

const lieferungRevQuery = gql`
  query lieferungRevForConflictQuery($id: uuid!, $rev: String!) {
    lieferung_rev(where: { lieferung_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      lieferung_id
      sammel_lieferung_id
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
      von_sammlung_id
      sammlung {
        id
        __typename
        datum
        herkunft {
          id
          __typename
          nr
        }
        person {
          id
          __typename
          name
        }
      }
      von_kultur_id
      kulturByVonKulturId {
        id
        __typename
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      datum
      nach_kultur_id
      kulturByNachKulturId {
        id
        __typename
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      nach_ausgepflanzt
      von_anzahl_individuen
      anzahl_pflanzen
      anzahl_auspflanzbereit
      gramm_samen
      andere_menge
      geplant
      bemerkungen
      changed
      changed_by
      _rev
      _parent_rev
      _depth
    }
  }
`

const LieferungConflict = ({
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
  const { error, loading } = useQuery(lieferungRevQuery, {
    variables: {
      rev,
      id,
    },
  })

  // need to grab store object to ensure this remains up to date
  const revRow =
    [...store.lieferung_revs.values()].find(
      (v) => v._rev === rev && v.lieferung_id === id,
    ) || {}

  const dataArray = [
    {
      valueInRow: row?.art?.art_ae_art?.name,
      valueInRev: revRow?.art?.art_ae_art?.name,
      label: 'Art',
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
      valueInRow: row?.anzahl_auspflanzbereit,
      valueInRev: revRow?.anzahl_auspflanzbereit,
      label: 'Anzahl ausfplanzbereit',
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
      valueInRow: row?.person?.name,
      valueInRev: revRow?.person?.name,
      label: 'Person',
    },
    {
      valueInRow: sammlungLabelFromSammlung(row.sammlung),
      valueInRev: sammlungLabelFromSammlung(revRow.sammlung),
      label: 'Von Sammlung',
    },
    {
      valueInRow: kulturLabelFromKultur(row.kulturByVonKulturId),
      valueInRev: kulturLabelFromKultur(revRow.kulturByVonKulturId),
      label: 'Von Kultur',
    },
    {
      valueInRow: row?.datum ? moment(row?.datum).format('DD.MM.YYYY') : null,
      valueInRev: row?.datum
        ? moment(revRow?.datum).format('DD.MM.YYYY')
        : null,
      label: 'Datum',
    },
    {
      valueInRow: kulturLabelFromKultur(row.kulturByNachKulturId),
      valueInRev: kulturLabelFromKultur(revRow.kulturByNachKulturId),
      label: 'Nach Kultur',
    },
    {
      valueInRow: row?.nach_ausgepflanzt == true,
      valueInRev: revRow?.nach_ausgepflanzt == true,
      label: 'Nach ausgepflanzt',
    },
    {
      valueInRow: row?.geplant == true,
      valueInRev: revRow?.geplant == true,
      label: 'geplant',
    },
    {
      valueInRow: row?.bemerkungen,
      valueInRev: revRow?.bemerkungen,
      label: 'Bemerkungen',
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
      lieferung_id: revRow.lieferung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      von_sammlung_id: revRow.von_sammlung_id,
      von_kultur_id: revRow.von_kultur_id,
      datum: revRow.datum,
      nach_kultur_id: revRow.nach_kultur_id,
      nach_ausgepflanzt: revRow.nach_ausgepflanzt,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geplant: revRow.geplant,
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
    //console.log('Lieferung Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_lieferung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
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
    revRow.andere_menge,
    revRow.anzahl_auspflanzbereit,
    revRow.anzahl_pflanzen,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.datum,
    revRow.geplant,
    revRow.gramm_samen,
    revRow.lieferung_id,
    revRow.nach_ausgepflanzt,
    revRow.nach_kultur_id,
    revRow.person_id,
    revRow.von_anzahl_individuen,
    revRow.von_kultur_id,
    revRow.von_sammlung_id,
    store,
    user.email,
  ])
  const onClickUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      lieferung_id: revRow.lieferung_id,
      art_id: revRow.art_id,
      person_id: revRow.person_id,
      von_sammlung_id: revRow.von_sammlung_id,
      von_kultur_id: revRow.von_kultur_id,
      datum: revRow.datum,
      nach_kultur_id: revRow.nach_kultur_id,
      nach_ausgepflanzt: revRow.nach_ausgepflanzt,
      von_anzahl_individuen: revRow.von_anzahl_individuen,
      anzahl_pflanzen: revRow.anzahl_pflanzen,
      anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
      gramm_samen: revRow.gramm_samen,
      andere_menge: revRow.andere_menge,
      geplant: revRow.geplant,
      bemerkungen: revRow.bemerkungen,
      changed_by: user.email,
      _parent_rev: row._rev,
      _depth: newDepth,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    //console.log('Lieferung Conflict', { row, revRow, newObject })
    try {
      await store.mutateInsert_lieferung_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
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
    revRow.andere_menge,
    revRow.anzahl_auspflanzbereit,
    revRow.anzahl_pflanzen,
    revRow.art_id,
    revRow.bemerkungen,
    revRow.datum,
    revRow.geplant,
    revRow.gramm_samen,
    revRow.lieferung_id,
    revRow.nach_ausgepflanzt,
    revRow.nach_kultur_id,
    revRow.person_id,
    revRow.von_anzahl_individuen,
    revRow.von_kultur_id,
    revRow.von_sammlung_id,
    row._depth,
    row._rev,
    store,
    user.email,
  ])
  const onClickSchliessen = useCallback(() => setActiveConflict(null), [
    setActiveConflict,
  ])

  //console.log('Lieferung Conflict', { dataArray, row, revRow })

  return (
    <Conflict
      name="Lieferung"
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

export default observer(LieferungConflict)
