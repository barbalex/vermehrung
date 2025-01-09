import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../utils/toPgArray.js'
import { mutations } from '../../../utils/mutations.js'
import Conflict from '../../shared/Conflict/index.jsx'
import createDataArrayForRevComparison from './createDataArrayForRevComparison.js'

const personRevQuery = gql`
  query personRevForConflictQuery($id: uuid!, $rev: String!) {
    person_rev(where: { person_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      person_id
      nr
      vorname
      name
      adresszusatz
      strasse
      plz
      ort
      telefon_privat
      telefon_geschaeft
      telefon_mobile
      email
      kein_email
      bemerkungen
      aktiv
      user_role_id
      kommerziell
      info
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

const PersonConflict = ({
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
    query: personRevQuery,
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError({ error, store })

  const revRow = useMemo(() => data?.person_rev?.[0] ?? {}, [data?.person_rev])

  const dataArray = useMemo(
    () => createDataArrayForRevComparison({ row, revRow }),
    [revRow, row],
  )

  const onClickAktuellUebernehmen = useCallback(async () => {
    // build new object
    const newDepth = revRow._depth + 1
    const newObject = {
      person_id: revRow.person_id,
      nr: revRow.nr,
      vorname: revRow.vorname,
      name: revRow.name,
      adresszusatz: revRow.adresszusatz,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      telefon_privat: revRow.telefon_privat,
      telefon_geschaeft: revRow.telefon_geschaeft,
      telefon_mobile: revRow.telefon_mobile,
      email: revRow.email,
      kein_email: revRow.kein_email,
      bemerkungen: revRow.bemerkungen,
      account_id: revRow.account_id,
      user_role_id: revRow.user_role_id,
      kommerziell: revRow.kommerziell,
      info: revRow.info,
      aktiv: revRow.aktiv,
      _parent_rev: revRow._rev,
      _depth: newDepth,
      _deleted: true,
    }
    const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    newObject.id = uuidv1()
    newObject.changed = new window.Date().toISOString()
    newObject.changed_by = user.email
    newObject._revisions = revRow._revisions
      ? toPgArray([rev, ...revRow._revisions])
      : toPgArray([rev])

    addQueuedQuery({
      name: 'mutateInsert_person_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
          update_columns: ['id'],
        },
      }),
      revertTable: 'person',
      revertId: revRow.person_id,
      revertField: '_deleted',
      revertValue: false,
    })
    // remove conflict from model
    try {
      const model = await db.get('person').find(revRow.person_id)
      await model.removeConflict(revRow._rev)
    } catch {}
    conflictDisposalCallback()
  }, [
    addQueuedQuery,
    conflictDisposalCallback,
    db,
    revRow._depth,
    revRow._rev,
    revRow._revisions,
    revRow.account_id,
    revRow.adresszusatz,
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.email,
    revRow.info,
    revRow.kein_email,
    revRow.kommerziell,
    revRow.name,
    revRow.nr,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    revRow.telefon_geschaeft,
    revRow.telefon_mobile,
    revRow.telefon_privat,
    revRow.user_role_id,
    revRow.vorname,
    user.email,
  ])
  const onClickWiderspruchUebernehmen = useCallback(async () => {
    // need to attach to the winner, that is row
    // otherwise risk to still have lower depth and thus loosing
    const newDepth = row._depth + 1
    const newObject = {
      person_id: revRow.person_id,
      nr: revRow.nr,
      vorname: revRow.vorname,
      name: revRow.name,
      adresszusatz: revRow.adresszusatz,
      strasse: revRow.strasse,
      plz: revRow.plz,
      ort: revRow.ort,
      telefon_privat: revRow.telefon_privat,
      telefon_geschaeft: revRow.telefon_geschaeft,
      telefon_mobile: revRow.telefon_mobile,
      email: revRow.email,
      kein_email: revRow.kein_email,
      bemerkungen: revRow.bemerkungen,
      account_id: revRow.account_id,
      user_role_id: revRow.user_role_id,
      kommerziell: revRow.kommerziell,
      info: revRow.info,
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
    newObject._revisions = row._revisions
      ? toPgArray([rev, ...row._revisions])
      : toPgArray([rev])
    const response = await gqlClient
      .query(mutations.mutateInsert_person_rev_one, {
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
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
  }, [
    addNotification,
    conflictSelectionCallback,
    gqlClient,
    onClickAktuellUebernehmen,
    revRow._deleted,
    revRow.account_id,
    revRow.adresszusatz,
    revRow.aktiv,
    revRow.bemerkungen,
    revRow.email,
    revRow.info,
    revRow.kein_email,
    revRow.kommerziell,
    revRow.name,
    revRow.nr,
    revRow.ort,
    revRow.person_id,
    revRow.plz,
    revRow.strasse,
    revRow.telefon_geschaeft,
    revRow.telefon_mobile,
    revRow.telefon_privat,
    revRow.user_role_id,
    revRow.vorname,
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
      name="Person"
      rev={rev}
      dataArray={dataArray}
      fetching={fetching}
      error={error}
      onClickAktuellUebernehmen={onClickAktuellUebernehmen}
      onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(PersonConflict)
