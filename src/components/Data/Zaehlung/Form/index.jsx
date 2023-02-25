import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import StoreContext from '../../../../storeContext'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import JesNo from '../../../shared/JesNo'
import Date from '../../../shared/Date'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Teilzaehlungen from './Teilzaehlungen'
import constants from '../../../../utils/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import kultursSortedFromKulturs from '../../../../utils/kultursSortedFromKulturs'

const FieldsContainer = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: auto;
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
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, db, errors, unsetError } = store

  const [dataState, setDataState] = useState({
    kulturWerte: [],
    kulturOption: undefined,
  })
  useEffect(() => {
    const kultursObservable = db
      .get('kultur')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.kultur._deleted === false
              ? [false]
              : filter.kultur._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.kultur.aktiv === true
              ? [true]
              : filter.kultur.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const combinedObservables = combineLatest([kultursObservable])
    const subscription = combinedObservables.subscribe(async ([kulturs]) => {
      // need to show a choosen kultur even if inactive but not if deleted
      let kultur
      try {
        kultur = await row.kultur.fetch()
      } catch {}
      const kultursIncludingChoosen = uniqBy(
        [...kulturs, ...(kultur && !showFilter ? [kultur] : [])],
        'id',
      )
      const kultursSorted = await kultursSortedFromKulturs(
        kultursIncludingChoosen,
      )
      const kulturWerte = await Promise.all(
        kultursSorted
          .filter((k) => {
            if (row.art_id) return k.art_id === row.art_id
            return true
          })
          .map(async (el) => {
            let label = ''
            try {
              label = await el.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: el.id,
              label,
            }
          }),
      )
      let kulturOption
      try {
        kulturOption = await row.kultur_option.fetch()
      } catch {}

      setDataState({ kulturWerte, kulturOption })
    })

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.kultur._deleted,
    filter.kultur.aktiv,
    row.art_id,
    row.kultur,
    row.kultur_option,
    showFilter,
  ])
  const { kulturWerte, kulturOption } = dataState

  const z_bemerkungen = kulturOption?.z_bemerkungen ?? true

  useEffect(() => {
    unsetError('zaehlung')
  }, [id, unsetError])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'zaehlung', key: field, value })
      }

      const previousValue = ifIsNumericAsNumber(row[field])
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )
  const openPlanenDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/planen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  const showDeleted = filter.zaehlung._deleted !== false || row?._deleted

  //console.log('Zaehlung Form rendering, row:', { row, renderEnforcer })

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
              <JesNo
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
            <JesNo
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
              size="large"
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
        {!showFilter && (
          <Teilzaehlungen zaehlungId={id} zaehlung={row} rawRow={rawRow} />
        )}
      </FieldsContainer>
    </ErrorBoundary>
  )
}

export default observer(ZaehlungForm)
