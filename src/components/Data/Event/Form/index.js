import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import SelectCreatable from '../../../shared/SelectCreatable'
import TextField from '../../../shared/TextField'
import Date from '../../../shared/Date'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import kulturLabelFromKultur from '../../../../utils/kulturLabelFromKultur'
import getConstants from '../../../../utils/constants'

const constants = getConstants()

const FieldsContainer = styled.div`
  padding: 10px;
  height: 100%;
`
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div > button {
    margin-top: 8px;
  }
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

const EventForm = ({
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
    insertTeilkulturRev,
    kultursSorted,
    personsSorted,
    teilkultursSorted,
    errors,
    unsetError,
  } = store

  useEffect(() => {
    unsetError('event')
  }, [id, unsetError])

  const kulturWerte = useMemo(
    () =>
      kultursSorted.map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur({ kultur: el, store }),
      })),
    [kultursSorted, store],
  )

  const kulturId = row?.kultur_id
  const teilkulturWerte = useMemo(
    () =>
      teilkultursSorted
        .filter((t) => t.kultur_id === kulturId)
        .map((t) => ({
          value: t.id,
          label: t.name || '(kein Name)',
        })),
    [kulturId, teilkultursSorted],
  )

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
  )

  const kulturOption = store.kultur_options.get(row?.kultur_id) || {}
  const {
    tk,
    ev_datum,
    ev_teilkultur_id,
    ev_geplant,
    ev_person_id,
  } = kulturOption

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'event', key: field, value })
      }

      const previousValue = row?.[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openPlanenDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Planen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const onCreateNewTeilkultur = useCallback(
    ({ name }) => {
      const teilkultur_id = insertTeilkulturRev({
        noNavigateInTree: true,
        values: {
          name,
          kultur_id: row.kultur_id,
        },
      })
      row.edit({ field: 'teilkultur_id', value: teilkultur_id })
    },
    [insertTeilkulturRev, row],
  )

  const showDeleted = showFilter || row._deleted

  return (
    <ErrorBoundary>
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
                  error={errors?.event?._deleted}
                />
              ) : (
                <Checkbox2States
                  key={`${row.id}_deleted`}
                  label="gelöscht"
                  name="_deleted"
                  value={row._deleted}
                  saveToDb={saveToDb}
                  error={errors?.event?._deleted}
                />
              )}
            </>
          )}
          <Select
            key={`${row.id}${row.kultur_id}kultur_id`}
            name="kultur_id"
            value={row.kultur_id}
            field="kultur_id"
            label="Kultur"
            options={kulturWerte}
            saveToDb={saveToDb}
            error={errors?.event?.kultur_id}
          />
          {((tk && ev_teilkultur_id) || showFilter) && (
            <SelectCreatable
              key={`${row.id}${row.teilkultur_id}teilkultur_id`}
              row={row}
              field="teilkultur_id"
              label="Teilkultur"
              options={teilkulturWerte}
              error={errors?.event?.teilkultur_id}
              onCreateNew={onCreateNewTeilkultur}
            />
          )}
          <TextField
            key={`${row.id}beschreibung`}
            name="beschreibung"
            label="Beschreibung"
            value={row.beschreibung}
            saveToDb={saveToDb}
            error={errors?.event?.beschreibung}
            multiline
          />
          {(ev_person_id || showFilter) && (
            <Select
              key={`${row.id}${row.person_id}person_id`}
              name="person_id"
              value={row.person_id}
              field="person_id"
              label="Wer"
              options={personWerte}
              saveToDb={saveToDb}
              error={errors?.event?.person_id}
            />
          )}
          {(ev_datum || showFilter) && (
            <Date
              key={`${row.id}datum`}
              name="datum"
              label="Datum"
              value={row.datum}
              saveToDb={saveToDb}
              error={errors?.event?.datum}
            />
          )}
          {(ev_geplant || showFilter) && (
            <FieldRow>
              {showFilter ? (
                <Checkbox3States
                  key={`${row.id}geplant`}
                  label="geplant"
                  name="geplant"
                  value={row.geplant}
                  saveToDb={saveToDb}
                  error={errors?.event?.geplant}
                />
              ) : (
                <Checkbox2States
                  key={`${row.id}geplant`}
                  label="geplant"
                  name="geplant"
                  value={row.geplant}
                  saveToDb={saveToDb}
                  error={errors?.event?.geplant}
                />
              )}
              <div>
                <IconButton
                  aria-label="Anleitung öffnen"
                  title="Anleitung öffnen"
                  onClick={openPlanenDocs}
                >
                  <IoMdInformationCircleOutline />
                </IconButton>
              </div>
            </FieldRow>
          )}
          {online && !showFilter && row._conflicts && row._conflicts.map && (
            <ConflictList
              conflicts={row._conflicts}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
          )}
        </FieldsContainer>
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default observer(EventForm)
