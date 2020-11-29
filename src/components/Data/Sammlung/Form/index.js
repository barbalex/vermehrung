import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Date from '../../../shared/Date'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import Coordinates from '../../../shared/Coordinates'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import getConstants from '../../../../utils/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'
import artLabelFromArt from '../../../../utils/artLabelFromArt'
import exists from '../../../../utils/exists'

const constants = getConstants()

const FieldsContainer = styled.div`
  padding: 10px;
  height: 100%;
`
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
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

const SammlungForm = ({
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
    artsSorted,
    herkunftsSorted,
    personsSorted,
    sammlungsSorted,
    errors,
    unsetError,
    setError,
  } = store

  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id, setActiveConflict])

  useEffect(() => {
    unsetError('sammlung')
  }, [id, unsetError])

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
  )

  const herkunftWerte = useMemo(
    () =>
      herkunftsSorted.map((el) => ({
        value: el.id,
        label: herkunftLabelFromHerkunft({ herkunft: el }),
      })),
    [herkunftsSorted],
  )

  const artWerte = useMemo(
    () =>
      artsSorted.map((el) => ({
        value: el.id,
        label: artLabelFromArt({ art: el, store }),
      })),
    [artsSorted, store],
  )

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'sammlung', key: field, value })
      }

      // only update if value has changed
      const previousValue = row[field]
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
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const rowNr = row?.nr
  const nrCount = useMemo(() => {
    if (!exists(rowNr)) return 0
    return sammlungsSorted.filter((h) => h.nr === rowNr).length
  }, [sammlungsSorted, rowNr])
  useEffect(() => {
    if (nrCount > 1) {
      setError({
        path: 'sammlung.nr',
        value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Sammlungen eindeutig sein`,
      })
    }
  }, [nrCount, setError])

  const showDeleted =
    showFilter || filter.sammlung._deleted !== false || row._deleted

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
                  error={errors?.sammlung?._deleted}
                />
              ) : (
                <Checkbox2States
                  key={`${row.id}_deleted`}
                  label="gelöscht"
                  name="_deleted"
                  value={row._deleted}
                  saveToDb={saveToDb}
                  error={errors?.sammlung?._deleted}
                />
              )}
            </>
          )}
          <TextField
            key={`${row.id}nr`}
            name="nr"
            label="Nr."
            value={row.nr}
            saveToDb={saveToDb}
            error={errors?.sammlung?.nr}
            type="text"
          />
          <Select
            key={`${row.id}${row.art_id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            saveToDb={saveToDb}
            error={errors?.sammlung?.art_id}
          />
          <Select
            key={`${row.id}${row.herkunft_id}herkunft_id`}
            name="herkunft_id"
            value={row.herkunft_id}
            field="herkunft_id"
            label="Herkunft"
            options={herkunftWerte}
            saveToDb={saveToDb}
            error={errors?.sammlung?.herkunft_id}
          />
          <Select
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            saveToDb={saveToDb}
            error={errors?.sammlung?.person_id}
          />
          <Date
            key={`${row.id}datum`}
            name="datum"
            label="Datum"
            value={row.datum}
            saveToDb={saveToDb}
            error={errors?.sammlung?.datum}
          />
          <TextField
            key={`${row.id}anzahl_pflanzen`}
            name="anzahl_pflanzen"
            label="Anzahl Pflanzen"
            value={row.anzahl_pflanzen}
            saveToDb={saveToDb}
            error={errors?.sammlung?.anzahl_pflanzen}
            type="number"
          />
          <FieldRow>
            <TextField
              key={`${row.id}gramm_samen`}
              name="gramm_samen"
              label="Gramm Samen"
              value={row.gramm_samen}
              saveToDb={saveToDb}
              error={errors?.sammlung?.gramm_samen}
              type="number"
            />
            <TextField
              key={`${row.id}andere_menge`}
              name="andere_menge"
              label={`Andere Menge (z.B. "3 Zwiebeln")`}
              value={row.andere_menge}
              saveToDb={saveToDb}
              error={errors?.sammlung?.andere_menge}
              type="text"
            />
          </FieldRow>
          <FieldRow>
            <TextField
              key={`${row.id}von_anzahl_individuen`}
              name="von_anzahl_individuen"
              label="von Anzahl Individuen"
              value={row.von_anzahl_individuen}
              saveToDb={saveToDb}
              error={errors?.sammlung?.von_anzahl_individuen}
              type="number"
            />
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openGenVielfaldDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </FieldRow>
          {!showFilter && <Coordinates row={row} saveToDb={saveToDb} />}
          <FieldRow>
            {showFilter ? (
              <Checkbox3States
                key={`${row.id}geplant`}
                label="Geplant"
                name="geplant"
                value={row.geplant}
                saveToDb={saveToDb}
                error={errors?.sammlung?.geplant}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}geplant`}
                label="Geplant"
                name="geplant"
                value={row.geplant}
                saveToDb={saveToDb}
                error={errors?.sammlung?.geplant}
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
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors?.sammlung?.bemerkungen}
            multiLine
          />
          {online && !showFilter && row?._conflicts?.map && (
            <ConflictList
              conflicts={row._conflicts}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
          )}
          {!showFilter && <Files parentTable="sammlung" parent={row} />}
        </FieldsContainer>
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default observer(SammlungForm)
