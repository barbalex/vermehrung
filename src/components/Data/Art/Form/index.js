import React, { useContext, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import SelectLoadingOptions from '../../../shared/SelectLoadingOptions'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Timeline from './Timeline'
import HerkunftTimeline from './HerkunftTimeline'
import QK from './QK'
import Personen from './Personen'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'

const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
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
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { artsSorted, filter, online, aeArtsSorted, errors, unsetError } = store

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

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )

  const aeArtIdsNotToShow = artsSorted
    .map((a) => a.ae_id)
    .filter((ae_id) => ae_id !== row.ae_id)

  const aeArtsFilter = (val) => {
    if (showFilter) {
      return aeArtsSorted
        .filter((a) => artsSorted.map((ar) => ar.ae_id).includes(a.id))
        .filter((a) => a.name.toLowerCase().includes(val))
    }
    if (val) {
      return aeArtsSorted
        .filter((a) => !aeArtIdsNotToShow.includes(a.id))
        .filter((a) => a.name.toLowerCase().includes(val))
    }
    return aeArtsSorted.filter((a) => !aeArtIdsNotToShow.includes(a.id))
  }

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
          key={`${row.id}ae_id`}
          field="ae_id"
          valueLabelPath="art_ae_art.name"
          valueLabel="name"
          label="Art"
          row={row}
          saveToDb={saveToDb}
          error={errors?.art?.ae_id}
          modelKey="name"
          modelFilter={aeArtsFilter}
          showFilterModel={aeArtsSorted}
        />
        {online && !showFilter && row._conflicts && row._conflicts.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && (
          <>
            <Personen artId={id} />
            <Timeline artId={id} />
            <HerkunftTimeline artId={id} />
            <QK artId={id} />
            <Files parentId={id} parent="art" />
          </>
        )}
      </FieldsContainer>
    </ErrorBoundary>
  )
}

export default observer(ArtForm)