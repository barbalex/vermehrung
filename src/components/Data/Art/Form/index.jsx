import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../storeContext'
import SelectLoadingOptions from '../../../shared/SelectLoadingOptions'
import Checkbox2States from '../../../shared/Checkbox2States'
import JesNo from '../../../shared/JesNo'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import aeArtSort from '../../../../utils/aeArtSort'
import Files from '../../Files'
import Timeline from './Timeline'
import HerkunftTimeline from './HerkunftTimeline'
import QK from './QK'
import Personen from './Personen'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import artsSortedFromArts from '../../../../utils/artsSortedFromArts'

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
  const store = useContext(StoreContext)
  const { filter, online, errors, unsetError, db } = store

  const [dataState, setDataState] = useState({
    artsSorted: [],
    aeArts: [],
  })
  useEffect(() => {
    const aeArtObservable = db.get('ae_art').query().observe()
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
      .observe()
    const combinedObservables = combineLatest([aeArtObservable, artsObservable])
    const subscription = combinedObservables.subscribe(
      async ([aeArts, arts]) => {
        const artsSorted = await artsSortedFromArts(arts)

        setDataState({
          aeArts: aeArts.sort(aeArtSort),
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
        <SelectLoadingOptions
          key={`${row.id}${row.ae_id}ae_id`}
          field="ae_id"
          label="Art"
          row={row}
          saveToDb={saveToDb}
          error={errors?.art?.ae_id}
          modelFilter={aeArtsFilter}
          labelTable="ae_art"
          labelField="name"
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
