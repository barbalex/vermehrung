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
import { createDataArrayForKulturRevComparison } from './createDataArrayForRevComparison.js'

const kulturRevQuery = gql`
  query kulturRevForConflictQuery($id: uuid!, $rev: String!) {
    kultur_rev(where: { kultur_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      kultur_id
      art_id
      herkunft_id
      garten_id
      zwischenlager
      erhaltungskultur
      von_anzahl_individuen
      bemerkungen
      aktiv
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

export const KulturConflict = observer(
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
      query: kulturRevQuery,
      variables: {
        rev,
        id,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRow = data?.kultur_rev?.[0] ?? {}

    const dataArray = createDataArrayForKulturRevComparison({ row, revRow })

    const onClickAktuellUebernehmen = async () => {
      // build new object
      const newDepth = revRow._depth + 1
      const newObject = {
        kultur_id: revRow.kultur_id,
        art_id: revRow.art_id,
        herkunft_id: revRow.herkunft_id,
        garten_id: revRow.garten_id,
        zwischenlager: revRow.zwischenlager,
        erhaltungskultur: revRow.erhaltungskultur,
        von_anzahl_individuen: revRow.von_anzahl_individuen,
        bemerkungen: revRow.bemerkungen,
        aktiv: revRow.aktiv,
        _parent_rev: revRow._rev,
        _depth: newDepth,
        _deleted: true,
      }
      const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      newObject.id = uuidv1()
      // do not revision the following fields as this leads to unwanted conflicts
      newObject.changed = new window.Date().toISOString()
      newObject.changed_by = user.email
      newObject._revisions =
        revRow._revisions ?
          toPgArray([rev, ...revRow._revisions])
        : toPgArray([rev])

      addQueuedQuery({
        name: 'mutateInsert_kultur_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'kultur_rev_pkey',
            update_columns: ['id'],
          },
        }),
        revertTable: 'kultur',
        revertId: revRow.kultur_id,
        revertField: '_deleted',
        revertValue: false,
      })
      // update model: remove this conflict
      try {
        const model = await db.get('kultur').find(revRow.kultur_id)
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
        kultur_id: revRow.kultur_id,
        art_id: revRow.art_id,
        herkunft_id: revRow.herkunft_id,
        garten_id: revRow.garten_id,
        zwischenlager: revRow.zwischenlager,
        erhaltungskultur: revRow.erhaltungskultur,
        von_anzahl_individuen: revRow.von_anzahl_individuen,
        bemerkungen: revRow.bemerkungen,
        aktiv: revRow.aktiv,
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
        .mutation(mutations.mutateInsert_kultur_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'kultur_rev_pkey',
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
        name="Kultur"
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
