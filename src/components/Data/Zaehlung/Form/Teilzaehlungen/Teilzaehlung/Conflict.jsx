import { useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../../../../utils/toPgArray.js'
import { mutations } from '../../../../../../utils/mutations.js'
import { Conflict } from '../../../../../shared/Conflict/index.jsx'
import { createDataArrayForTeilzaehlungRevComparison as createDataArray } from './createDataArrayForRevComparison.js'

const teilzaehlungRevQuery = gql`
  query teilzaehlungRevForConflictQuery($id: uuid!, $rev: String!) {
    teilzaehlung_rev(
      where: { teilzaehlung_id: { _eq: $id }, _rev: { _eq: $rev } }
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
      _revisions
      _depth
      _deleted
    }
  }
`

export const TeilzaehlungConflict = observer(
  ({
    id,
    rev,
    row,
    conflictDisposalCallback,
    conflictSelectionCallback,
    setActiveConflict,
  }) => {
    const store = useContext(MobxStoreContext)
    const { user, addNotification, addQueuedQuery, db, gqlClient } = store

    // need to use this query to ensure that the person's name is queried
    const [{ error, data, fetching }] = useQuery({
      query: teilzaehlungRevQuery,
      variables: {
        rev,
        id,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRow = useMemo(
      () => data?.teilzaehlung_rev?.[0] ?? {},
      [data?.teilzaehlung_rev],
    )

    const dataArray = useMemo(
      () => createDataArray({ row, revRow }),
      [revRow, row],
    )

    const onClickAktuellUebernehmen = async () => {
      // build new object
      const newDepth = revRow._depth + 1
      const newObject = {
        teilzaehlung_id: revRow.teilzaehlung_id,
        zaehlung_id: revRow.zaehlung_id,
        teilkultur_id: revRow.teilkultur_id,
        anzahl_pflanzen: revRow.anzahl_pflanzen,
        anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen: revRow.anzahl_mutterpflanzen,
        andere_menge: revRow.andere_menge,
        auspflanzbereit_beschreibung: revRow.auspflanzbereit_beschreibung,
        bemerkungen: revRow.bemerkungen,
        prognose_von_tz: revRow.prognose_von_tz,
        _parent_rev: revRow._rev,
        _depth: newDepth,
        _deleted: true,
      }
      const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      newObject.id = uuidv1()
      newObject.changed = new window.Date().toISOString()
      newObject.changed_by = user.email
      newObject._revisions =
        revRow._revisions ?
          toPgArray([rev, ...revRow._revisions])
        : toPgArray([rev])

      addQueuedQuery({
        name: 'mutateInsert_teilzaehlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'teilzaehlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'teilzaehlung',
        revertId: revRow.teilzaehlung_id,
        revertField: '_deleted',
        revertValue: false,
      })
      // update model: remove this conflict
      try {
        const model = await db.get('teilzaehlung').find(revRow.teilzaehlung_id)
        await model.removeConflict(revRow._rev)
      } catch {}
      conflictDisposalCallback()
      window.location.reload()
    }

    const onClickWiderspruchUebernehmen = async () => {
      // need to attach to the winner, that is row
      // otherwise risk to still have lower depth and thus loosing
      const newDepth = row._depth + 1
      const newObject = {
        teilzaehlung_id: revRow.teilzaehlung_id,
        zaehlung_id: revRow.zaehlung_id,
        teilkultur_id: revRow.teilkultur_id,
        anzahl_pflanzen: revRow.anzahl_pflanzen,
        anzahl_auspflanzbereit: revRow.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen: revRow.anzahl_mutterpflanzen,
        andere_menge: revRow.andere_menge,
        auspflanzbereit_beschreibung: revRow.auspflanzbereit_beschreibung,
        bemerkungen: revRow.bemerkungen,
        prognose_von_tz: revRow.prognose_von_tz,
        _parent_rev: row._rev,
        _depth: newDepth,
        _deleted: revRow._deleted,
      }
      const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      newObject.id = uuidv1()
      newObject.changed = new window.Date().toISOString()
      newObject.changed_by = user.email
      newObject._revisions =
        row._revisions ? toPgArray([rev, ...row._revisions]) : toPgArray([rev])
      const response = await gqlClient
        .mutation(mutations.mutateInsert_teilzaehlung_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'teilzaehlung_rev_pkey',
            update_columns: ['id'],
          },
        })
        .toPromise()
      if (response.error) {
        checkForOnlineError({ error: response.error, store })
        return addNotification({
          message: response.error.message,
        })
      }
      // now we need to delete the previous conflict
      onClickAktuellUebernehmen()
      conflictSelectionCallback()
    }

    const onClickSchliessen = () => setActiveConflict(null)

    return (
      <Conflict
        name="Zaehlung"
        rev={rev}
        dataArray={dataArray}
        fetching={fetching}
        error={error}
        onClickAktuellUebernehmen={onClickAktuellUebernehmen}
        onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
        onClickSchliessen={onClickSchliessen}
      />
    )
  },
)
