import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../../storeContext'
import Checkbox2States from '../../../../shared/Checkbox2States'
import JesNo from '../../../../shared/JesNo'
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

const LierferungForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const existsSammelLieferung = !!row?.sammel_lieferung_id
  const store = useContext(StoreContext)

  const { errors, filter, unsetError, user, db } = store

  const [dataState, setDataState] = useState({
    herkunft: undefined,
    herkunftQuelle: undefined,
    userPersonOption: undefined,
    sammelLieferung: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['li_show_sl_felder'])
      : $of({})
    const sLObservable = row.sammel_lieferung
      ? row.sammel_lieferung.observe()
      : $of({})
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      sLObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, sammelLieferung]) => {
        let vonSammlung
        try {
          vonSammlung = await row.sammlung.fetch()
        } catch {}
        let vonSammlungHerkunft
        try {
          vonSammlungHerkunft = await vonSammlung.herkunft.fetch()
        } catch {}

        if (vonSammlungHerkunft) {
          return setDataState({
            herkunft: vonSammlungHerkunft,
            herkunftQuelle: 'Sammlung',
            userPersonOption: userPersonOptions?.[0],
            sammelLieferung,
          })
        }

        if (row.von_kultur_id) {
          let vonKultur
          try {
            vonKultur = await db.get('kultur').find(row.von_kultur_id)
          } catch {}
          let herkunftByVonKultur
          try {
            herkunftByVonKultur = await vonKultur.herkunft.fetch()
          } catch {}
          if (herkunftByVonKultur) {
            return setDataState({
              herkunft: herkunftByVonKultur,
              herkunftQuelle: 'von-Kultur',
              userPersonOption: userPersonOptions?.[0],
              sammelLieferung,
            })
          }
        }
        let nachKultur
        try {
          nachKultur = await db.get('kultur').find(row.nach_kultur_id)
        } catch {}
        let herkunftByNachKultur
        try {
          herkunftByNachKultur = await nachKultur.herkunft.fetch()
        } catch {}

        setDataState({
          herkunft: herkunftByNachKultur,
          herkunftQuelle: herkunftByNachKultur ? 'nach-Kultur' : 'keine',
          userPersonOption: userPersonOptions?.[0],
          sammelLieferung,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    row.nach_kultur_id,
    row.sammel_lieferung,
    row.sammlung,
    row.von_kultur_id,
    row.von_sammlung_id,
    user.uid,
  ])
  const { herkunft, herkunftQuelle, userPersonOption, sammelLieferung } =
    dataState

  const { li_show_sl_felder } = userPersonOption ?? {}

  const ifNeeded = useCallback(
    (field) => {
      if (existsSammelLieferung && li_show_sl_felder) return true
      if (
        !exists(sammelLieferung?.[field]) ||
        sammelLieferung?.[field] === false
      ) {
        return true
      } else if (sammelLieferung?.[field] !== row[field]) {
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
      const previousValue = ifIsNumericAsNumber(row[field])
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )

  const showDeleted = filter.lieferung._deleted !== false || row?._deleted

  //console.log('Lieferung, row:', row)

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
            id={id}
            row={row}
            rawRow={rawRow}
            saveToDb={saveToDb}
            ifNeeded={ifNeeded}
          />
        )}
        <Von
          showFilter={showFilter}
          id={id}
          row={row}
          rawRow={rawRow}
          saveToDb={saveToDb}
          ifNeeded={ifNeeded}
          herkunft={herkunft}
          herkunftQuelle={herkunftQuelle}
        />
        <Nach
          showFilter={showFilter}
          id={id}
          row={row}
          rawRow={rawRow}
          saveToDb={saveToDb}
          ifNeeded={ifNeeded}
          herkunft={herkunft}
        />
        {ifSomeNeeded(['datum', 'geplant']) && (
          <Wann
            showFilter={showFilter}
            id={id}
            row={row}
            rawRow={rawRow}
            saveToDb={saveToDb}
            ifNeeded={ifNeeded}
          />
        )}
        {ifSomeNeeded(['person_id', 'bemerkungen']) && (
          <Wer
            showFilter={showFilter}
            id={id}
            saveToDb={saveToDb}
            ifNeeded={ifNeeded}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
      </FieldsContainer>
    </ErrorBoundary>
  )
}

export default observer(LierferungForm)
