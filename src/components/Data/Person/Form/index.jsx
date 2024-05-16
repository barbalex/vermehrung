import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../storeContext.js'
import TextField from '../../../shared/TextField'
import Select from '../../../shared/Select/index.jsx'
import Checkbox2States from '../../../shared/Checkbox2States.jsx'
import JesNo from '../../../shared/JesNo.jsx'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Arten from './Arten'
import Gaerten from './Gaerten'
import ConflictList from '../../../shared/ConflictList'
import exists from '../../../../utils/exists.js'
import userRoleSort from '../../../../utils/userRoleSort'

const Container = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: auto;
`
const CaseConflictTitle = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`

const Person = ({
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, errors, unsetError, setError, db } = store

  const [dataState, setDataState] = useState({
    userRoleWerte: [],
    userRole: undefined,
  })
  useEffect(() => {
    const personsNrCountObservable =
      showFilter || !exists(row?.nr)
        ? $of(0)
        : db
            .get('person')
            .query(Q.where('_deleted', false), Q.where('nr', row.nr))
            .observeCount()
    const userRolesObservable = db.get('user_role').query().observe()
    const userRoleObservable = row.user_role
      ? row.user_role.observe()
      : $of(null)
    const combinedObservables = combineLatest([
      userRolesObservable,
      personsNrCountObservable,
      userRoleObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userRoles, nrCount, userRole]) => {
        const userRoleWerte = userRoles.sort(userRoleSort).map((el) => ({
          value: el.id,
          label: el.label,
        }))
        if (!showFilter && nrCount > 1) {
          setError({
            path: 'person.nr',
            value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Personen eindeutig sein`,
          })
        }
        setDataState({
          userRoleWerte,
          userRole,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, row.nr, row.user_role, setError, showFilter])
  const { userRoleWerte, userRole } = dataState

  useEffect(() => {
    unsetError('person')
  }, [id, unsetError])

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'person', key: field, value })
      }

      const previousValue = ifIsNumericAsNumber(row[field])
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )

  const showDeleted = filter.person._deleted !== false || row?._deleted

  return (
    <Container>
      {(activeConflict || showHistory) && (
        <CaseConflictTitle>
          Aktuelle Version<Rev>{row._rev}</Rev>
        </CaseConflictTitle>
      )}
      {showDeleted && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.person?._deleted}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.person?._deleted}
            />
          )}
        </>
      )}
      <Select
        key={`${row.id}${row.user_role_id}user_role_id`}
        name="user_role_id"
        value={row.user_role_id}
        field="user_role_id"
        label="Rolle"
        helperText={userRole?.comment || ' '}
        options={userRoleWerte}
        saveToDb={saveToDb}
        error={errors?.person?.user_role_id}
      />
      <TextField
        key={`${row.id}nr`}
        name="nr"
        label="Nr"
        value={row.nr}
        saveToDb={saveToDb}
        error={errors?.person?.nr}
      />
      <TextField
        key={`${row.id}vorname`}
        name="vorname"
        label="Vorname"
        value={row.vorname}
        saveToDb={saveToDb}
        error={errors?.person?.vorname}
      />
      <TextField
        key={`${row.id}name`}
        name="name"
        label="Nachname"
        value={row.name}
        saveToDb={saveToDb}
        error={errors?.person?.name}
      />
      <TextField
        key={`${row.id}adresszusatz`}
        name="adresszusatz"
        label="Adress-Zusatz"
        value={row.adresszusatz}
        saveToDb={saveToDb}
        error={errors?.person?.adresszusatz}
      />
      <TextField
        key={`${row.id}strasse`}
        name="strasse"
        label="Strasse"
        value={row.strasse}
        saveToDb={saveToDb}
        error={errors?.person?.strasse}
      />
      <TextField
        key={`${row.id}plz`}
        name="plz"
        label="PLZ"
        value={row.plz}
        saveToDb={saveToDb}
        error={errors?.person?.plz}
        type="number"
      />
      <TextField
        key={`${row.id}ort`}
        name="ort"
        label="Ort"
        value={row.ort}
        saveToDb={saveToDb}
        error={errors?.person?.ort}
      />
      <TextField
        key={`${row.id}telefon_privat`}
        name="telefon_privat"
        label="Telefon privat"
        value={row.telefon_privat}
        saveToDb={saveToDb}
        error={errors?.person?.telefon_privat}
      />
      <TextField
        key={`${row.id}telefon_geschaeft`}
        name="telefon_geschaeft"
        label="Telefon Geschäft"
        value={row.telefon_geschaeft}
        saveToDb={saveToDb}
        error={errors?.person?.telefon_geschaeft}
      />
      <TextField
        key={`${row.id}telefon_mobile`}
        name="telefon_mobile"
        label="Telefon mobile"
        value={row.telefon_mobile}
        saveToDb={saveToDb}
        error={errors?.person?.telefon_mobile}
      />
      <TextField
        key={`${row.id}email`}
        name="email"
        label="Email"
        value={row.email}
        saveToDb={saveToDb}
        error={errors?.person?.email}
      />
      {showFilter ? (
        <JesNo
          key={`${row.id}kein_email`}
          label="Kein Email"
          name="kein_email"
          value={row.kein_email}
          saveToDb={saveToDb}
          error={errors?.person?.kein_email}
        />
      ) : (
        <Checkbox2States
          key={`${row.id}kein_email`}
          label="Kein Email"
          name="kein_email"
          value={row.kein_email}
          saveToDb={saveToDb}
          error={errors?.person?.kein_email}
        />
      )}
      {showFilter ? (
        <JesNo
          key={`${row.id}kommerziell`}
          label="Kommerziell"
          name="kommerziell"
          value={row.kommerziell}
          saveToDb={saveToDb}
          error={errors?.person?.kommerziell}
        />
      ) : (
        <Checkbox2States
          key={`${row.id}kommerziell`}
          label="Kommerziell"
          name="kommerziell"
          value={row.kommerziell}
          saveToDb={saveToDb}
          error={errors?.person?.kommerziell}
        />
      )}
      {showFilter ? (
        <JesNo
          key={`${row.id}info`}
          label="Info"
          name="info"
          value={row.info}
          saveToDb={saveToDb}
          error={errors?.person?.info}
        />
      ) : (
        <Checkbox2States
          key={`${row.id}info`}
          label="Info"
          name="info"
          value={row.info}
          saveToDb={saveToDb}
          error={errors?.person?.info}
        />
      )}
      {showFilter ? (
        <JesNo
          key={`${row.id}aktiv`}
          label="aktiv"
          name="aktiv"
          value={row.aktiv}
          saveToDb={saveToDb}
          error={errors?.person?.aktiv}
        />
      ) : (
        <Checkbox2States
          key={`${row.id}aktiv`}
          label="aktiv"
          name="aktiv"
          value={row.aktiv}
          saveToDb={saveToDb}
          error={errors?.person?.aktiv}
        />
      )}
      <TextField
        key={`${row.id}bemerkungen`}
        name="bemerkungen"
        label="Bemerkungen"
        value={row.bemerkungen}
        saveToDb={saveToDb}
        error={errors?.person?.bemerkungen}
        multiLine
      />
      {online && !showFilter && row?._conflicts?.map && (
        <ConflictList
          conflicts={row._conflicts}
          activeConflict={activeConflict}
          setActiveConflict={setActiveConflict}
        />
      )}
      {userRole?.name === 'artverantwortlich' && <Arten person={row} />}
      {['gaertner', 'artverantwortlich'].includes(userRole?.name) && (
        <Gaerten person={row} />
      )}
      {!showFilter && row.id && <Files parentTable="person" parent={row} />}
    </Container>
  )
}

export default observer(Person)
