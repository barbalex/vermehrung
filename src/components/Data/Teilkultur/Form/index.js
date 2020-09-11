import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Zaehlungen from './Zaehlungen'
import Events from './Events'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import kulturLabelFromKultur from '../kulturLabelFromKultur'

const FieldsContainer = styled.div`
  padding: 10px;
  height: 100%;
  overflow: auto !important;
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

const TeilkulturForm = ({
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, kultursSorted, errors, unsetError } = store

  const kulturOpion = store.kultur_options.get(row.kultur_id) || {}
  const { tk_bemerkungen } = kulturOpion

  useEffect(() => {
    unsetError('teilkultur')
  }, [id, unsetError])

  const kulturWerte = useMemo(
    () =>
      kultursSorted.map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur(el),
      })),
    [kultursSorted],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'teilkultur', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const showDeleted = showFilter || row._deleted

  return (
    <ErrorBoundary>
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
                error={errors?.teilkultur?._deleted}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row._deleted}
                saveToDb={saveToDb}
                error={errors?.teilkultur?._deleted}
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
          error={errors?.teilkultur?.kultur_id}
        />
        <TextField
          key={`${row.id}name`}
          name="name"
          label="Name"
          value={row.name}
          saveToDb={saveToDb}
          error={errors?.teilkultur?.name}
        />
        <TextField
          key={`${row.id}ort1`}
          name="ort1"
          label="Ort 1"
          value={row.ort1}
          saveToDb={saveToDb}
          error={errors?.teilkultur?.ort1}
        />
        <TextField
          key={`${row.id}ort2`}
          name="ort2"
          label="Ort 2"
          value={row.ort2}
          saveToDb={saveToDb}
          error={errors?.teilkultur?.ort2}
        />
        <TextField
          key={`${row.id}ort3`}
          name="ort3"
          label="Ort 3"
          value={row.ort3}
          saveToDb={saveToDb}
          error={errors?.teilkultur?.ort3}
        />
        {(tk_bemerkungen || showFilter) && (
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors?.teilkultur?.bemerkungen}
            multiline
          />
        )}
        {online && !showFilter && row._conflicts && row._conflicts.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && (
          <>
            <Zaehlungen kulturId={row.kultur_id} teilkulturId={row.id} />
            <Events kulturId={row.kultur_id} teilkulturId={row.id} />
          </>
        )}
      </FieldsContainer>
    </ErrorBoundary>
  )
}

export default observer(TeilkulturForm)
