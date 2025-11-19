import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { mutations } from '../../../utils/mutations.js'
import { Conflict } from '../../shared/Conflict/index.jsx'
import { createDataArrayForGartenRevComparison } from './createDataArrayForRevComparison.js'

const gartenRevQuery = gql`
  query gartenRevForConflictQuery($id: uuid!, $rev: String!) {
    garten_rev(where: { garten_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      garten_id
      name
      strasse
      plz
      ort
      geom_point
      aktiv
      bemerkungen
      changed
      changed_by
      person_id
      _rev
      _parent_rev
      _revisions
      _depth
      _deleted
    }
  }
`

export const GartenConflict = observer(
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

    const [{ error, data, fetching }] = useQuery({
      query: gartenRevQuery,
      variables: {
        rev,
        id,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRow = data?.garten_rev?.[0] ?? {}

    const dataArray = createDataArrayForGartenRevComparison({ row, revRow })

    const onClickAktuellUebernehmen = async () => {
      // build new object
      const newDepth = revRow._depth + 1
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

      console.log(
        'Garten.Conflict.onClickAktuellUebernehmen, newObject:',
        newObject,
      )

      addQueuedQuery({
        name: 'mutateInsert_garten_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'garten_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'garten',
        revertId: revRow.garten_id,
        revertField: '_deleted',
        revertValue: false,
      })
      // update model: remove this conflict
      try {
        const model = await db.get('garten').find(revRow.garten_id)
        await model.removeConflict(revRow._rev)
      } catch (error) {
        console.log(
          'Garten.Conflict.onClickAktuellUebernehmen, error removing conflict:',
          error,
        )
      }
      conflictDisposalCallback()
      window.location.reload()
    }

    const onClickWiderspruchUebernehmen = async () => {
      // need to attach to the winner, that is row
      // otherwise risk to still have lower depth and thus loosing
      const newDepth = row._depth + 1
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
      //console.log('Garten Conflict', { row, revRow, newObject })
      const response = await gqlClient
        .mutation(mutations.mutateInsert_garten_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'garten_rev_pkey',
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

    //console.log('Garten Conflict', { dataArray, row, revRow })

    return (
      <Conflict
        name="Garten"
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
