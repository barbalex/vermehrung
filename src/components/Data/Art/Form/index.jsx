import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import TaxonSelect from './TaxonSelect.jsx'
import SelectCreatable from '../../../shared/SelectCreatable.jsx'
import Checkbox2States from '../../../shared/Checkbox2States.jsx'
import JesNo from '../../../shared/JesNo.jsx'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber.js'
import Files from '../../Files/index.jsx'
import Timeline from './Timeline/index.jsx'
import HerkunftTimeline from './HerkunftTimeline/index.jsx'
import QK from './QK/index.jsx'
import Personen from './Personen/index.jsx'
import ErrorBoundary from '../../../shared/ErrorBoundary.jsx'
import ConflictList from '../../../shared/ConflictList/index.jsx'
import artsSortedFromArts from '../../../../utils/artsSortedFromArts.js'

const FieldsContainer = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: auto;
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

const ArtForm = ({
  activeConflict,
  id,
  row,
  setActiveConflict,
  showFilter,
  showHistory,
}) => {
  const store = useContext(MobxStoreContext)
  const { filter, online, errors, unsetError, db } = store

  const [dataState, setDataState] = useState({
    artsSorted: [],
    aeArts: [],
  })
  useEffect(() => {
    const aeArtObservable = db
      .get('ae_art')
      .query(Q.sortBy('taxonomy'), Q.sortBy('name'))
      .observe()
    const delQuery =
      filter.art?._deleted === false
        ? Q.where('_deleted', false)
        : filter.art?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const artsObservable = db.get('art').query(delQuery).observe()
    const combinedObservables = combineLatest([aeArtObservable, artsObservable])
    const subscription = combinedObservables.subscribe(
      async ([aeArts, arts]) => {
        const artsSorted = await artsSortedFromArts(arts)

        setDataState({
          aeArts,
          artsSorted,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, filter.art._deleted])
  const { artsSorted, aeArts } = dataState

  useEffect(() => {
    unsetError('art')
  }, [id, unsetError])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'art', key: field, value })
      }

      // only update if value has changed
      const previousValue = ifIsNumericAsNumber(row[field])
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )

  const setsUngrouped = artsSorted
    .map((a) => a.set)
    .filter((s) => !!s)
    .sort()
  const sets = [...new Set(setsUngrouped)]
  const setValues = sets.map((s) => ({ value: s, label: s }))
  const onCreateSet = useCallback(
    ({ name }) => {
      const event = { target: { name: 'set', value: name } }
      saveToDb(event)
    },
    [saveToDb],
  )

  const aeArtIdsNotToShow = artsSorted
    .map((a) => a.ae_id)
    .filter((ae_id) => ae_id !== row.ae_id)

  const aeArtsFilter = (val) => {
    if (showFilter) {
      return aeArts
        .filter((a) => artsSorted.map((ar) => ar.ae_id).includes(a.id))
        .filter((a) => a.name.toLowerCase().includes(val))
    }
    if (val) {
      return aeArts
        .filter((a) => !aeArtIdsNotToShow.includes(a.id))
        .filter((a) => a.name.toLowerCase().includes(val.toLowerCase()))
    }
    return aeArts.filter((a) => !aeArtIdsNotToShow.includes(a.id))
  }

  const showDeleted = filter.art._deleted !== false || row?._deleted

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
                error={errors?.art?._deleted}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row._deleted}
                saveToDb={saveToDb}
                error={errors?.art?._deleted}
              />
            )}
          </>
        )}
        <TaxonSelect
          key={`${row.id}${row.ae_id}ae_id`}
          art={row}
          saveToDb={saveToDb}
          error={errors?.art?.ae_id}
          modelFilter={aeArtsFilter}
        />
        <SelectCreatable
          key={`${row.id}${row.set}set`}
          row={row}
          showFilter={showFilter}
          table="art"
          field="set"
          label="Set"
          options={setValues}
          error={errors?.art?.set}
          onCreateNew={onCreateSet}
          formatCreateLabel={(val) => `"${val}" als neues Set aufnehmen`}
        />
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && (
          <>
            <Personen art={row} />
            <Timeline artId={id} />
            <HerkunftTimeline artId={id} />
            <QK artId={id} />
            <Files parent={row} parentTable="art" />
          </>
        )}
      </FieldsContainer>
    </ErrorBoundary>
  )
}

export default observer(ArtForm)
