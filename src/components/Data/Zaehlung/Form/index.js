import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import Date from '../../../shared/Date'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Teilzaehlungen from './Teilzaehlungen'
import getConstants from '../../../../utils/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import kulturLabelFromKultur from '../../../../utils/kulturLabelFromKultur'

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

const ZaehlungForm = ({
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, kultursSorted, errors, unsetError } = store

  const kulturOption = store.kultur_options.get(row.kultur_id)
  const z_bemerkungen = kulturOption?.z_bemerkungen ?? true

  useEffect(() => {
    unsetError('zaehlung')
  }, [id, unsetError])

  const kulturWerte = useMemo(
    () =>
      kultursSorted
        .filter((k) => {
          if (row.art_id) return k.art_id === row.art_id
          return true
        })
        .map((el) => ({
          value: el.id,
          label: kulturLabelFromKultur({ kultur: el, store }),
        })),
    [kultursSorted, row.art_id, store],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'zaehlung', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
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

  const showDeleted =
    showFilter || filter.zaehlung._deleted !== false || row._deleted

  //console.log('Zaehlung Form rendering, row:', { row, rawRow })

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
                  error={errors?.zaehlung?._deleted}
                />
              ) : (
                <Checkbox2States
                  key={`${row.id}_deleted`}
                  label="gelöscht"
                  name="_deleted"
                  value={row._deleted}
                  saveToDb={saveToDb}
                  error={errors?.zaehlung?._deleted}
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
            loading={false}
            saveToDb={saveToDb}
            error={errors?.zaehlung?.kultur_id}
          />
          <Date
            key={`${row.id}datum`}
            name="datum"
            label="Datum"
            value={row.datum}
            saveToDb={saveToDb}
            error={errors?.zaehlung?.datum}
          />
          <FieldRow>
            {showFilter ? (
              <Checkbox3States
                key={`${row.id}prognose`}
                label="Prognose"
                name="prognose"
                value={row.prognose}
                saveToDb={saveToDb}
                error={errors?.zaehlung?.prognose}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}prognose`}
                label="Prognose"
                name="prognose"
                value={row.prognose}
                saveToDb={saveToDb}
                error={errors?.zaehlung?.prognose}
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
          {(z_bemerkungen || showFilter) && (
            <TextField
              key={`${row.id}bemerkungen`}
              name="bemerkungen"
              label="Bemerkungen"
              value={row.bemerkungen}
              saveToDb={saveToDb}
              error={errors?.zaehlung?.bemerkungen}
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
          {!showFilter && <Teilzaehlungen zaehlungId={id} />}
        </FieldsContainer>
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default observer(ZaehlungForm)
