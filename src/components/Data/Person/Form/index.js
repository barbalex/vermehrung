import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import TextField from '../../../shared/TextField'
import Select from '../../../shared/Select'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Arten from './Arten'
import Gaerten from './Gaerten'
import ConflictList from '../../../shared/ConflictList'
import exists from '../../../../utils/exists'
import userRoleSort from '../../../../utils/userRoleSort'

const Container = styled.div`
  padding: 10px;
  height: 100%;
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
  const {
    filter,
    online,
    personsSorted,
    user_roles,
    errors,
    unsetError,
    setError,
  } = store

  const userRoleWerte = useMemo(
    () =>
      [...user_roles.values()]
        .sort((a, b) => userRoleSort({ a, b }))
        .map((el) => ({
          value: el.name,
          label: el.label,
        })),
    [user_roles],
  )

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

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )

  const rowNr = row?.nr
  const nrCount = useMemo(() => {
    if (!exists(rowNr)) return 0
    return personsSorted.filter((h) => h.nr === rowNr).length
  }, [personsSorted, rowNr])

  useEffect(() => {
    if (nrCount > 1) {
      setError({
        path: 'person.nr',
        value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Personen eindeutig sein`,
      })
    }
  }, [nrCount, setError])

  const showDeleted =
    showFilter || filter.person._deleted !== false || row._deleted

  const userRole = row.user_role
    ? [...store.user_roles.values()].find((r) => r.name === row.user_role)
    : {}

  return (
    <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
      <Container>
        {(activeConflict || showHistory) && (
          <CaseConflictTitle>
            Aktuelle Version<Rev>{row._rev}</Rev>
          </CaseConflictTitle>
        )}
        {showDeleted && (
          <>
            {showFilter ? (
              <Checkbox3States
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
          key={`${row.id}${row.user_role}user_role`}
          name="user_role"
          value={row.user_role}
          field="user_role"
          label="Rolle"
          helperText={userRole?.comment || ' '}
          options={userRoleWerte}
          saveToDb={saveToDb}
          error={errors?.person?.user_role}
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
          <Checkbox3States
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
          <Checkbox3States
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
          <Checkbox3States
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
          <Checkbox3States
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
        {row.user_role === 'artverantwortlich' && <Arten person={row} />}
        {['gaertner', 'artverantwortlich'].includes(row.user_role) && (
          <Gaerten person={row} />
        )}
        {!showFilter && row.id && <Files parentId={row.id} parent="person" />}
      </Container>
    </SimpleBar>
  )
}

export default observer(Person)
