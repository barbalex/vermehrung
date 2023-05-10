import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest, of as $of } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import StoreContext from '../../../../storeContext'
import Select from '../../../shared/Select'
import SelectCreatable from '../../../shared/SelectCreatable'
import TextField from '../../../shared/TextField'
import Date from '../../../shared/Date'
import Checkbox2States from '../../../shared/Checkbox2States'
import JesNo from '../../../shared/JesNo'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import kultursSortedFromKulturs from '../../../../utils/kultursSortedFromKulturs'
import personLabelFromPerson from '../../../../utils/personLabelFromPerson'
import teilkulturSort from '../../../../utils/teilkulturSort'
import personSort from '../../../../utils/personSort'
import constants from '../../../../utils/constants'

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

const EventForm = ({
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, insertTeilkulturRev, errors, unsetError, db } = store

  useEffect(() => {
    unsetError('event')
  }, [id, unsetError])

  const kulturId = row?.kultur_id

  const [dataState, setDataState] = useState({
    kulturWerte: [],
    teilkulturWerte: [],
    personWerte: [],
    kulturOption: undefined,
  })
  useEffect(() => {
    const kulturDelQuery =
      filter.kultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.kultur._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const kulturAktivQuery =
      filter.kultur.aktiv === false
        ? Q.where('aktiv', false)
        : filter.kultur.aktiv === true
        ? Q.where('aktiv', true)
        : Q.or(
            Q.where('aktiv', false),
            Q.where('aktiv', true),
            Q.where('aktiv', null),
          )
    const kultursObservable = db
      .get('kultur')
      .query(kulturDelQuery, kulturAktivQuery)
      .observeWithColumns([
        'garten_id',
        'art_id',
        'herkunft_id',
        'zwischenlager',
      ])
    const tkDelQuery =
      filter.teilkultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.teilkultur._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const teilkulturObservable = db
      .get('teilkultur')
      .query(
        tkDelQuery,
        ...(showFilter ? [] : [Q.where('kultur_id', kulturId)]),
      )
      .observeWithColumns(['name'])
    const personDelQuery =
      filter.person._deleted === false
        ? Q.where('_deleted', false)
        : filter.person._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const personAktivQuery =
      filter.person.aktiv === false
        ? Q.where('aktiv', false)
        : filter.person.aktiv === true
        ? Q.where('aktiv', true)
        : Q.or(
            Q.where('aktiv', false),
            Q.where('aktiv', true),
            Q.where('aktiv', null),
          )
    const personsObservable = db
      .get('person')
      .query(personDelQuery, personAktivQuery)
      .observeWithColumns(['vorname', 'name'])
    const kulturOptionObservable = row?.kultur_id
      ? db.get('kultur_option').findAndObserve(row.kultur_id)
      : $of({})
    const combinedObservables = combineLatest([
      kultursObservable,
      teilkulturObservable,
      personsObservable,
      kulturOptionObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([kulturs, teilkulturs, persons, kulturOption]) => {
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
          kultursSorted.map(async (k) => {
            let label
            try {
              label = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: k.id,
              label,
              inaktiv: k.aktiv === false,
              link: ['Kulturen', k.id],
            }
          }),
        )
        let teilkultur
        try {
          teilkultur = await row.teilkultur.fetch()
        } catch {}
        const teilkultursIncludingChoosen = uniqBy(
          [...teilkulturs, ...(teilkultur && !showFilter ? [teilkultur] : [])],
          'id',
        )
        const teilkulturWerte = teilkultursIncludingChoosen
          .sort(teilkulturSort)
          .map((t) => ({
            value: t.id,
            label: t.name || '(kein Name)',
            link: ['Teilkulturen', t.id],
          }))
        // need to show a choosen person even if inactive but not if deleted
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
            inaktiv: person.aktiv === false,
            link: ['Personen', person.id],
          }))
        setDataState({
          kulturWerte,
          teilkulturWerte,
          personWerte,
          kulturOption,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.kultur,
    filter.person._deleted,
    filter.person.aktiv,
    filter.teilkultur._deleted,
    kulturId,
    row,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...[Object.values(row)],
    showFilter,
  ])
  const { kulturWerte, teilkulturWerte, personWerte, kulturOption } = dataState

  const { tk, ev_datum, ev_geplant, ev_person_id } = kulturOption ?? {}

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'event', key: field, value })
      }

      const previousValue = ifIsNumericAsNumber(row?.[field])
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

  const onCreateNewTeilkultur = useCallback(
    async ({ name }) => {
      const teilkultur_id = await insertTeilkulturRev({
        noNavigateInTree: true,
        values: {
          name,
          kultur_id: row.kultur_id,
        },
      })
      row.edit({ field: 'teilkultur_id', value: teilkultur_id, store })
    },
    [insertTeilkulturRev, row, store],
  )

  const showDeleted = filter.event._deleted !== false || row?._deleted

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
        {(tk || showFilter) && (
          <SelectCreatable
            key={`${row.id}${row.teilkultur_id}teilkultur_id`}
            row={row}
            showFilter={showFilter}
            table="event"
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
              <JesNo
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
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </FieldRow>
        )}
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
      </FieldsContainer>
    </ErrorBoundary>
  )
}

export default observer(EventForm)
