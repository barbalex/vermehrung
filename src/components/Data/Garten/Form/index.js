import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Coordinates from '../../../shared/Coordinates'
import Personen from './Personen'
import ConflictList from '../../../shared/ConflictList'

const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
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

const GartenForm = ({
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
    userPersonOption,
    personsSorted,
    errors,
    unsetError,
    insertGvRev,
  } = store

  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_aktiv,
    ga_bemerkungen,
  } = userPersonOption

  useEffect(() => {
    unsetError('garten')
  }, [id, unsetError])

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'garten', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
      if (field === 'person_id') {
        insertGvRev({ values: { garten_id: row.id, person_id: value } })
      }
    },
    [filter, insertGvRev, row, showFilter],
  )

  const showDeleted = showFilter || row._deleted

  return (
    <FieldsContainer>
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
              error={errors?.garten?._deleted}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.garten?._deleted}
            />
          )}
        </>
      )}
      <TextField
        key={`${row.id}name`}
        name="name"
        label="Name"
        value={row.name}
        saveToDb={saveToDb}
        error={errors?.garten?.name}
      />
      <Select
        key={`${row.id}${row.person_id}person_id`}
        name="person_id"
        value={row.person_id}
        field="person_id"
        label="Person"
        options={personWerte}
        saveToDb={saveToDb}
        error={errors?.garten?.person_id}
      />
      {ga_strasse && (
        <TextField
          key={`${row.id}strasse`}
          name="strasse"
          label="Strasse"
          value={row.strasse}
          saveToDb={saveToDb}
          error={errors?.garten?.strasse}
        />
      )}
      {ga_plz && (
        <TextField
          key={`${row.id}plz`}
          name="plz"
          label="PLZ"
          value={row.plz}
          saveToDb={saveToDb}
          error={errors?.garten?.plz}
          type="number"
        />
      )}
      {ga_ort && (
        <TextField
          key={`${row.id}ort`}
          name="ort"
          label="Ort"
          value={row.ort}
          saveToDb={saveToDb}
          error={errors?.garten?.ort}
        />
      )}
      {!showFilter && ga_geom_point && (
        <Coordinates row={row} saveToDb={saveToDb} />
      )}
      {ga_aktiv && (
        <>
          {showFilter ? (
            <Checkbox3States
              key={`${row.id}aktiv`}
              label="aktiv"
              name="aktiv"
              value={row.aktiv}
              saveToDb={saveToDb}
              error={errors?.garten?.aktiv}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}aktiv`}
              label="aktiv"
              name="aktiv"
              value={row.aktiv}
              saveToDb={saveToDb}
              error={errors?.garten?.aktiv}
            />
          )}
        </>
      )}
      {ga_bemerkungen && (
        <TextField
          key={`${row.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row.bemerkungen}
          saveToDb={saveToDb}
          error={errors?.garten?.bemerkungen}
          multiLine
        />
      )}
      {online && !showFilter && row._conflicts && row._conflicts.map && (
        <ConflictList
          conflicts={row._conflicts}
          activeConflict={activeConflict}
          setActiveConflict={setActiveConflict}
        />
      )}
      <Personen gartenId={row.id} />
      {!showFilter && <Files parentId={row.id} parent="garten" />}
    </FieldsContainer>
  )
}

export default observer(GartenForm)
