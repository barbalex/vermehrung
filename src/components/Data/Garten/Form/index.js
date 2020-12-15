import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import { Q } from '@nozbe/watermelondb'
//import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import personLabelFromPerson from '../../../../utils/personLabelFromPerson'
import getUserPersonOption from '../../../../utils/getUserPersonOption'
import personSort from '../../../../utils/personSort'
import Files from '../../Files'
import Coordinates from '../../../shared/Coordinates'
import Personen from './Personen'
import ConflictList from '../../../shared/ConflictList'

const FieldsContainer = styled.div`
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

const GartenForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, errors, unsetError, insertGvRev, db, user } = store

  useEffect(() => {
    unsetError('garten')
  }, [id, unsetError])

  const [dataState, setDataState] = useState({
    personWerte: [],
    userPersonOption: undefined,
  })
  useEffect(() => {
    const personsObservable = db.collections
      .get('person')
      .query(Q.where('_deleted', false), Q.where('aktiv', true))
      .observeWithColumns('vorname', 'name')
    const combinedObservables = combineLatest([personsObservable])
    const allSubscription = combinedObservables.subscribe(async ([persons]) => {
      const userPersonOption = await getUserPersonOption({ user, db })
      const personWerte = persons
        .sort((a, b) => personSort({ a, b }))
        .map((person) => ({
          value: person.id,
          label: personLabelFromPerson({ person }),
        }))
      setDataState({
        personWerte,
        userPersonOption,
      })
    })

    return () => allSubscription.unsubscribe()
  }, [db, db.collections, user])
  const { personWerte, userPersonOption } = dataState

  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_aktiv,
    ga_bemerkungen,
  } = userPersonOption ?? {}

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
      row.edit({ field, value, store })
      if (field === 'person_id') {
        insertGvRev({ values: { garten_id: row.id, person_id: value } })
      }
    },
    [filter, insertGvRev, row, showFilter, store],
  )

  const showDeleted =
    showFilter || filter.garten._deleted !== false || row?._deleted

  return (
    <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
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
          <Coordinates row={row} rawRow={rawRow} saveToDb={saveToDb} />
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
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        <Personen gartenId={row.id} garten={row} />
        {!showFilter && <Files parentTable="garten" parent={row} />}
      </FieldsContainer>
    </SimpleBar>
  )
}

export default observer(GartenForm)
