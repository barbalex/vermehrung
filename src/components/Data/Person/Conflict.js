import React, { useCallback, useContext, useMemo } from 'react'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import checkForOnlineError from '../../../utils/checkForOnlineError'
import toPgArray from '../../../utils/toPgArray'
import Conflict from '../../shared/Conflict'

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
      user_role
      kommerziell
      info
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const PersonConflict = ({
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
  const { error, loading } = useQuery(personRevQuery, {
    variables: {
      rev,
      id,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRow = useMemo(
    () =>
      [...store.person_revs.values()].find(
        (v) => v._rev === rev && v.person_id === id,
      ) || {},
    [id, rev, store.person_revs],
  )

  const dataArray = [
    {
      valueInRow: row?.user_role,
      valueInRev: revRow?.user_role,
      label: 'Rolle',
    },
    {
      valueInRow: row?.nr,
      valueInRev: revRow?.nr,
      label: 'Nr',
    },
    {
      valueInRow: row?.fullname,
      valueInRev: revRow?.fullname,
      label: 'Name',
    },
    {
      valueInRow: row?.adresszusatz,
      valueInRev: revRow?.adresszusatz,
      label: 'Adresszusatz',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: row?.plz,
      valueInRev: revRow?.plz,
      label: 'PLZ',
    },
    { valueInRow: row?.ort, valueInRev: revRow?.ort, label: 'Ort' },
    {
      valueInRow: row?.telefon_privat,
      valueInRev: revRow?.telefon_privat,
      label: 'Telefon privat',
    },
    {
      valueInRow: row?.telefon_geschaeft,
      valueInRev: revRow?.telefon_geschaeft,
      label: 'Telefon Geschäft',
    },
    {
      valueInRow: row?.telefon_mobile,
      valueInRev: revRow?.telefon_mobile,
      label: 'Telefon mobile',
    },
    {
      valueInRow: row?.email,
      valueInRev: revRow?.email,
      label: 'Email',
    },
    {
      valueInRow: row?.kein_email == true,
      valueInRev: revRow?.kein_email == true,
      label: 'Kein Email',
    },
    {
      valueInRow: row?.kommerziell == true,
      valueInRev: revRow?.kommerziell == true,
      label: 'kommerziell',
    },
    {
      valueInRow: row?.info == true,
      valueInRev: revRow?.info == true,
      label: 'info',
    },
    {
      valueInRow: row?.aktiv == true,
      valueInRev: revRow?.aktiv == true,
      label: 'aktiv',
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
    callbackAfterVerwerfen()
  }, [callbackAfterVerwerfen, revRow])
  const onClickUebernehmen = useCallback(async () => {
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
      user_role: revRow.user_role,
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
    try {
      await store.mutateInsert_person_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'person_rev_pkey',
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
    revRow.user_role,
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
      loading={loading}
      error={error}
      onClickVerwerfen={onClickVerwerfen}
      onClickUebernehmen={onClickUebernehmen}
      onClickSchliessen={onClickSchliessen}
    />
  )
}

export default observer(PersonConflict)
