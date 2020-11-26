import React, { useContext, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import exists from '../../../../utils/exists'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import Was from './Was'
import Von from './Von'
import Nach from './Nach'
import Wann from './Wann'
import Wer from './Wer'

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

const SammelLieferungForm = ({
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)

  const { filter, online, userPersonOption, errors, unsetError } = store
  const { setWidthInPercentOfScreen, activeNodeArray } = store.tree

  const { sl_show_empty_when_next_to_li } = userPersonOption

  useEffect(() => {
    unsetError('sammel_lieferung')
  }, [id, unsetError])

  useEffect(() => {
    if (id) setWidthInPercentOfScreen(25)
    return () => {
      if (id) setWidthInPercentOfScreen(33)
    }
  }, [id, setWidthInPercentOfScreen])

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row[field]

      if (showFilter) {
        return filter.setValue({ table: 'sammel_lieferung', key: field, value })
      }

      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )
  const shownAsSammelLieferung =
    activeNodeArray.length === 2 && activeNodeArray[0] === 'Sammel-Lieferungen'

  const ifNeeded = useCallback(
    (field) => {
      if (sl_show_empty_when_next_to_li) return true
      if (shownAsSammelLieferung) return true
      if (
        id &&
        !sl_show_empty_when_next_to_li &&
        (!exists(row[field]) || row[field] === false)
      )
        return false
      return true
    },
    [id, row, shownAsSammelLieferung, sl_show_empty_when_next_to_li],
  )
  const ifSomeNeeded = useCallback(
    (fields) => fields.some((f) => ifNeeded(f)),
    [ifNeeded],
  )

  const nachKultur = row.nach_kultur_id
    ? store.kulturs.get(row.nach_kultur_id)
    : {}
  const nachKulturHerkunft = nachKultur.herkunft_id
    ? store.herkunfts.get(nachKultur.herkunft_id)
    : undefined
  const vonKultur = row.von_kultur_id
    ? store.kulturs.get(row.von_kultur_id)
    : {}
  const vonKulturHerkunft = vonKultur.herkunft_id
    ? store.herkunfts.get(vonKultur.herkunft_id)
    : undefined
  const vonSammlung = row.von_sammlung_id
    ? store.sammlungs.get(row.von_sammlung_id)
    : {}
  const vonSammlungHerkunft = vonSammlung?.herkunft_id
    ? store.herkunfts.get(vonSammlung.herkunft_id)
    : undefined
  const herkunft =
    nachKulturHerkunft ?? vonKulturHerkunft ?? vonSammlungHerkunft

  const showDeleted =
    showFilter || filter.sammel_lieferung._deleted !== false || row._deleted

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
                  error={errors?.sammel_lieferung?._deleted}
                />
              ) : (
                <Checkbox2States
                  key={`${row.id}_deleted`}
                  label="gelöscht"
                  name="_deleted"
                  value={row._deleted}
                  saveToDb={saveToDb}
                  error={errors?.sammel_lieferung?._deleted}
                />
              )}
            </>
          )}
          {ifSomeNeeded([
            'art_id',
            'anzahl_pflanzen',
            'anzahl_auspflanzbereit',
            'gramm_samen',
            'andere_menge',
            'von_anzahl_individuen',
          ]) && (
            <Was
              showFilter={showFilter}
              row={row}
              ifNeeded={ifNeeded}
              saveToDb={saveToDb}
            />
          )}
          {ifSomeNeeded(['von_sammlung_id', 'von_kultur_id']) && (
            <Von
              showFilter={showFilter}
              row={row}
              ifNeeded={ifNeeded}
              saveToDb={saveToDb}
              herkunft={herkunft}
              nachKulturHerkunft={nachKulturHerkunft}
              vonKulturHerkunft={vonKulturHerkunft}
            />
          )}
          {ifSomeNeeded(['nach_kultur_id', 'nach_ausgepflanzt']) && (
            <Nach
              showFilter={showFilter}
              row={row}
              ifNeeded={ifNeeded}
              saveToDb={saveToDb}
              herkunft={herkunft}
            />
          )}
          {ifSomeNeeded(['datum', 'geplant']) && (
            <Wann
              showFilter={showFilter}
              row={row}
              ifNeeded={ifNeeded}
              saveToDb={saveToDb}
            />
          )}
          {ifSomeNeeded(['person_id', 'bemerkungen']) && (
            <Wer
              showFilter={showFilter}
              row={row}
              ifNeeded={ifNeeded}
              saveToDb={saveToDb}
            />
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

export default observer(SammelLieferungForm)
