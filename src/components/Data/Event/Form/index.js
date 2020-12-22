import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import SimpleBar from 'simplebar-react'
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
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import kultursSortedFromKulturs from '../../../../utils/kultursSortedFromKulturs'
import personLabelFromPerson from '../../../../utils/personLabelFromPerson'
import teilkulturSort from '../../../../utils/teilkulturSort'
import personSort from '../../../../utils/personSort'
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
  rawRow,
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
    const kultursObservable = db
      .get('kultur')
      .query(Q.where('_deleted', false), Q.where('aktiv', true))
      .observeWithColumns([
        'garten_id',
        'art_id',
        'herkunft_id',
        'zwischenlager',
      ])
    const tkKulturQuery = showFilter ? [] : [Q.where('kultur_id', kulturId)]
    const teilkulturObservable = db
      .get('teilkultur')
      .query(Q.where('_deleted', false), ...tkKulturQuery)
      .observeWithColumns(['name'])
    const personsObservable = db
      .get('person')
      .query(Q.where('_deleted', false), Q.where('aktiv', true))
      .observeWithColumns(['vorname', 'name'])
    const kulturObservable = showFilter
      ? $of(filter.kultur)
      : row.kultur.observe()
    const kulturOptionObservable = row?.kultur_id
      ? db.get('kultur_option').findAndObserve(row.kultur_id)
      : $of({})
    const combinedObservables = combineLatest([
      kultursObservable,
      teilkulturObservable,
      personsObservable,
      kulturObservable,
      kulturOptionObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([kulturs, teilkulturs, persons, kultur, kulturOption]) => {
        // need to show a choosen kultur even if inactive but not if deleted
        const kultursIncludingInactiveChoosen = uniqBy(
          [
            ...kulturs,
            ...(kultur && !kultur?._deleted && !showFilter ? [kultur] : []),
          ],
          'id',
        )
        const kultursSorted = await kultursSortedFromKulturs(
          kultursIncludingInactiveChoosen,
        )
        const kulturWerte = await Promise.all(
          kultursSorted.map(async (t) => {
            let label
            try {
              label = await t.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: t.id,
              label,
            }
          }),
        )
        const teilkulturWerte = teilkulturs.sort(teilkulturSort).map((t) => ({
          value: t.id,
          label: t.name || '(kein Name)',
        }))
        // need to show a choosen person even if inactive but not if deleted
        let person
        try {
          person = await row.person?.fetch()
        } catch {}
        const personsIncludingInactiveChoosen = uniqBy(
          [...persons, ...(person && !person?._deleted ? [person] : [])],
          'id',
        )
        const personWerte = personsIncludingInactiveChoosen
          .sort(personSort)
          .map((person) => ({
            value: person.id,
            label: personLabelFromPerson({ person }),
          }))
        setDataState({
          kulturWerte,
          teilkulturWerte,
          personWerte,
          kulturOption,
        })
      },
    )

    return () => subscription.unsubscribe()
  }, [
    db,
    filter.kultur,
    kulturId,
    row,
    row.kultur,
    row.kultur_option,
    row.person,
    showFilter,
  ])
  const { kulturWerte, teilkulturWerte, personWerte, kulturOption } = dataState

  const { tk, ev_datum, ev_teilkultur_id, ev_geplant, ev_person_id } =
    kulturOption ?? {}

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
      row.edit({ field: 'teilkultur_id', value: teilkultur_id, store })
    },
    [insertTeilkulturRev, row, store],
  )

  const showDeleted =
    showFilter || filter.event._deleted !== false || row?._deleted

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
          {((tk && ev_teilkultur_id) || !showFilter) && (
            <SelectCreatable
              key={`${row.id}${row.teilkultur_id}teilkultur_id`}
              table="event"
              row={row}
              rawRow={rawRow}
              showFilter={showFilter}
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
          {online && !showFilter && row?._conflicts?.map && (
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
