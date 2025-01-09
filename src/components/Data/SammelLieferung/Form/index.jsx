import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import Checkbox2States from '../../../shared/Checkbox2States.jsx'
import JesNo from '../../../shared/JesNo.jsx'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber.js'
import { exists } from '../../../../utils/exists.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'
import { ConflictList } from '../../../shared/ConflictList/index.jsx'
import Was from './Was.jsx'
import Von from './Von.jsx'
import Nach from './Nach.jsx'
import Wann from './Wann.jsx'
import Wer from './Wer.jsx'

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

const SammelLieferungForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(MobxStoreContext)

  const { filter, online, user, db, errors, unsetError } = store
  const { setWidthInPercentOfScreen, activeNodeArray } = store.tree

  const [dataState, setDataState] = useState({
    herkunft: undefined,
    herkunftQuelle: undefined,
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['sl_show_empty_when_next_to_li'])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions]) => {
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
  const { herkunft, herkunftQuelle, userPersonOption } = dataState
  const { sl_show_empty_when_next_to_li } = userPersonOption ?? {}

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
      const previousValue = ifIsNumericAsNumber(row[field])

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

  const showDeleted =
    filter.sammel_lieferung._deleted !== false || row?._deleted

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
            rawRow={rawRow}
            ifNeeded={ifNeeded}
            saveToDb={saveToDb}
          />
        )}
        {ifSomeNeeded(['von_sammlung_id', 'von_kultur_id']) && (
          <Von
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
            ifNeeded={ifNeeded}
            saveToDb={saveToDb}
            herkunft={herkunft}
            herkunftQuelle={herkunftQuelle}
          />
        )}
        {ifSomeNeeded(['nach_kultur_id', 'nach_ausgepflanzt']) && (
          <Nach
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
            ifNeeded={ifNeeded}
            saveToDb={saveToDb}
            herkunft={herkunft}
          />
        )}
        {ifSomeNeeded(['datum', 'geplant']) && (
          <Wann
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
            ifNeeded={ifNeeded}
            saveToDb={saveToDb}
          />
        )}
        {ifSomeNeeded(['person_id', 'bemerkungen']) && (
          <Wer
            showFilter={showFilter}
            id={id}
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
    </ErrorBoundary>
  )
}

export default observer(SammelLieferungForm)
