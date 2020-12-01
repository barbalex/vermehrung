import React, { useContext, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../../models/reactUtils'
import Checkbox2States from '../../../../shared/Checkbox2States'
import Checkbox3States from '../../../../shared/Checkbox3States'
import exists from '../../../../../utils/exists'
import ifIsNumericAsNumber from '../../../../../utils/ifIsNumericAsNumber'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
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

const LierferungForm = ({
  sammelLieferung,
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const existsSammelLieferung = !!sammelLieferung?.id
  const store = useContext(StoreContext)

  const { errors, filter, unsetError, userPersonOption } = store
  const { activeNodeArray } = store.tree

  const { li_show_sl_felder } = userPersonOption

  const ifNeeded = useCallback(
    (field) => {
      if (existsSammelLieferung && li_show_sl_felder) return true
      if (!exists(sammelLieferung[field]) || sammelLieferung[field] === false) {
        return true
      } else if (sammelLieferung[field] !== row[field]) {
        return true
      }
      return false
    },
    [existsSammelLieferung, li_show_sl_felder, row, sammelLieferung],
  )
  const ifSomeNeeded = useCallback(
    (fields) => fields.some((f) => ifNeeded(f)),
    [ifNeeded],
  )

  useEffect(() => {
    unsetError('lieferung')
  }, [id, unsetError])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'lieferung', key: field, value })
      }

      // only update if value has changed
      const previousValue = row[field]
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )

  const urlLastName = activeNodeArray[activeNodeArray.length - 2]
  const isAnlieferung = urlLastName === 'An-Lieferungen'
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
  const herkunftByKultur = isAnlieferung
    ? nachKulturHerkunft
    : vonKulturHerkunft
  const vonSammlung = row.von_sammlung_id
    ? store.sammlungs.get(row.von_sammlung_id)
    : {}
  const vonSammlungHerkunft = vonSammlung?.herkunft_id
    ? store.herkunfts.get(vonSammlung.herkunft_id)
    : undefined
  const herkunft = herkunftByKultur || vonSammlungHerkunft

  const showDeleted =
    showFilter || filter.lieferung._deleted !== false || row?._deleted

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
                  error={errors?.kultur?._deleted}
                />
              ) : (
                <Checkbox2States
                  key={`${row.id}_deleted`}
                  label="gelöscht"
                  name="_deleted"
                  value={row._deleted}
                  saveToDb={saveToDb}
                  error={errors?.kultur?._deleted}
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
              rawRow={rawRow}
              saveToDb={saveToDb}
              ifNeeded={ifNeeded}
            />
          )}
          <Von
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
            saveToDb={saveToDb}
            ifNeeded={ifNeeded}
            herkunft={herkunft}
            herkunftByKultur={herkunftByKultur}
          />
          <Nach
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
            saveToDb={saveToDb}
            ifNeeded={ifNeeded}
            herkunft={herkunft}
          />
          {ifSomeNeeded(['datum', 'geplant']) && (
            <Wann
              showFilter={showFilter}
              row={row}
              rawRow={rawRow}
              saveToDb={saveToDb}
              ifNeeded={ifNeeded}
            />
          )}
          {ifSomeNeeded(['person_id', 'bemerkungen']) && (
            <Wer
              showFilter={showFilter}
              row={row}
              rawRow={rawRow}
              saveToDb={saveToDb}
              ifNeeded={ifNeeded}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
          )}
        </FieldsContainer>
      </SimpleBar>
    </ErrorBoundary>
  )
}

export default observer(LierferungForm)
