import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'
import { combineLatest, of as $of } from 'rxjs'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'
import uniqBy from 'lodash/uniqBy'

import StoreContext from '../../../../storeContext'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Date from '../../../shared/Date'
import Checkbox2States from '../../../shared/Checkbox2States'
import JesNo from '../../../shared/JesNo'
import Coordinates from '../../../shared/Coordinates'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import constants from '../../../../utils/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'
import personLabelFromPerson from '../../../../utils/personLabelFromPerson'
import artsSortedFromArts from '../../../../utils/artsSortedFromArts'
import exists from '../../../../utils/exists'
import personSort from '../../../../utils/personSort'
import herkunftSort from '../../../../utils/herkunftSort'

const FieldsContainer = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: auto;
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
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, errors, unsetError, setError, db } = store

  const [dataState, setDataState] = useState({
    personWerte: [],
    herkunftWerte: [],
    artWerte: [],
  })
  useEffect(() => {
    const personsObservable = db
      .get('person')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.person._deleted === false
              ? [false]
              : filter.person._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.person.aktiv === true
              ? [true]
              : filter.person.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
      )
      .observeWithColumns(['vorname', 'name'])
    const herkunftsObservable = db
      .get('herkunft')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.herkunft._deleted === false
              ? [false]
              : filter.herkunft._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const artsObservable = db
      .get('art')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.art._deleted === false
              ? [false]
              : filter.art._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observeWithColumns(['ae_id'])
    const sammlungsNrCountObservable =
      showFilter || !exists(row?.nr)
        ? $of(0)
        : db
            .get('sammlung')
            .query(
              Q.where(
                '_deleted',
                Q.oneOf(
                  filter.sammlung._deleted === false
                    ? [false]
                    : filter.sammlung._deleted === true
                    ? [true]
                    : [true, false, null],
                ),
              ),
              Q.where('nr', row.nr),
            )
            .observeCount()
    const combinedObservables = combineLatest([
      sammlungsNrCountObservable,
      personsObservable,
      herkunftsObservable,
      artsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([nrCount, persons, herkunfts, arts]) => {
        if (!showFilter && nrCount > 1) {
          setError({
            path: 'sammlung.nr',
            value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Sammlungen eindeutig sein`,
          })
        }
        let person
        try {
          person = await row.person.fetch()
        } catch {}
        const personsIncludingChoosen = uniqBy(
          [...persons, ...(person && !showFilter ? [person] : [])],
          'id',
        )
        const personWerte = personsIncludingChoosen
          .sort(personSort)
          .map((person) => ({
            value: person.id,
            label: personLabelFromPerson({ person }),
          }))
        let herkunft
        try {
          herkunft = await row.herkunft.fetch()
        } catch {}
        const herkunftsIncludingChoosen = uniqBy(
          [...herkunfts, ...(herkunft && !showFilter ? [herkunft] : [])],
          'id',
        )
        const herkunftWerte = herkunftsIncludingChoosen
          .sort(herkunftSort)
          .map((herkunft) => ({
            value: herkunft.id,
            label: herkunftLabelFromHerkunft({ herkunft }),
          }))
        let art
        try {
          art = await row.art.fetch()
        } catch {}
        const artsIncludingChoosen = uniqBy(
          [...arts, ...(art && !showFilter ? [art] : [])],
          'id',
        )
        const artsSorted = await artsSortedFromArts(artsIncludingChoosen)
        const artWerte = await Promise.all(
          artsSorted.map(async (art) => {
            let label = ''
            try {
              label = await art.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: art.id,
              label,
            }
          }),
        )

        setDataState({
          personWerte,
          herkunftWerte,
          artWerte,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.art._deleted,
    filter.herkunft,
    filter.person._deleted,
    filter.person.aktiv,
    filter.sammlung._deleted,
    row.art,
    row.herkunft,
    row.nr,
    row.person,
    setError,
    showFilter,
  ])
  const { personWerte, herkunftWerte, artWerte } = dataState

  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id, setActiveConflict])

  useEffect(() => {
    unsetError('sammlung')
  }, [id, unsetError])

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
      const previousValue = ifIsNumericAsNumber(row[field])
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )
  const openPlanenDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/Planen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const showDeleted = filter.sammlung._deleted !== false || row?._deleted

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
              size="large"
            >
              <IoMdInformationCircleOutline />
            </IconButton>
          </div>
        </FieldRow>
        {!showFilter && (
          <Coordinates row={row} rawRow={rawRow} saveToDb={saveToDb} />
        )}
        <FieldRow>
          {showFilter ? (
            <JesNo
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
              size="large"
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
    </ErrorBoundary>
  )
}

export default observer(SammlungForm)
