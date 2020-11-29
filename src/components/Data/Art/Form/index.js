import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import SelectLoadingOptions from '../../../shared/SelectLoadingOptions'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import artLabelFromArt from '../../../../utils/artLabelFromArt'
import aeArtSort from '../../../../utils/aeArtSort'
import Files from '../../Files'
import Timeline from './Timeline'
import HerkunftTimeline from './HerkunftTimeline'
import QK from './QK'
import Personen from './Personen'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'

const FieldsContainer = styled.div`
  padding: 10px;
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
  activeConflict,
  id,
  row,
  setActiveConflict,
  showFilter,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { artsSorted, filter, online, errors, unsetError, ae_arts } = store

  const aeArtsSorted = useMemo(
    () => [...ae_arts.values()].sort((a, b) => aeArtSort({ a, b })),
    [ae_arts],
  )

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
      const previousValue = row[field]
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

  const showDeleted =
    showFilter || filter.art._deleted !== false || row._deleted

  console.log('Art, row:', row)

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
            valueLabelFunction={artLabelFromArt}
            valueLabelKey="art"
            label="Art"
            row={row}
            saveToDb={saveToDb}
            error={errors?.art?.ae_id}
            modelKey="name"
            modelFilter={aeArtsFilter}
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
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default observer(ArtForm)
