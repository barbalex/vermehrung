import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  dbAtom,
  errorsAtom,
  filterLieferungAtom,
  setFilterValue,
  unsetError,
  userAtom,
} from '../../../../../store/index.ts'
import { Checkbox2States } from '../../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../../shared/JesNo.tsx'
import { exists } from '../../../../../utils/exists.ts'
import { ifIsNumericAsNumber } from '../../../../../utils/ifIsNumericAsNumber.ts'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { LieferungWas as Was } from './Was.tsx'
import { LieferungVon as Von } from './Von.tsx'
import { LieferungNach as Nach } from './Nach/index.tsx'
import { LieferungWann as Wann } from './Wann.tsx'
import { LieferungWer as Wer } from './Wer.tsx'

import artStyles from '../../../Art/Form/index.module.css'

export const LierferungForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}: {
  showFilter: boolean
  id: string | undefined
  row: import('../../../../../dbModel.ts').Lieferung | null | undefined
  rawRow: Record<string, unknown> | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
}) => {
  const existsSammelLieferung = !!row?.sammel_lieferung_id

  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const errors = useAtomValue(errorsAtom)
  const lieferungFilter = useAtomValue(filterLieferungAtom)

  const [dataState, setDataState] = useState<{
    herkunft?: import('../../../../../dbModel.ts').Herkunft
    herkunftQuelle?: string
    userPersonOption?: import('../../../../../dbModel.ts').PersonOption
    sammelLieferung?: import('../../../../../dbModel.ts').SammelLieferung
  }>({
    herkunft: undefined,
    herkunftQuelle: undefined,
    userPersonOption: undefined,
    sammelLieferung: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../../dbModel.ts').PersonOption>(
            'person_option',
          )
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['li_show_sl_felder'])
      : $of({})
    const sLObservable = row?.sammel_lieferung
      ? row?.sammel_lieferung.observe()
      : $of({})
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      sLObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../../dbModel.ts').PersonOption[] | undefined,
          import('../../../../../dbModel.ts').SammelLieferung | undefined,
        ]
      >
    ).subscribe(async ([userPersonOptions, sammelLieferung]) => {
        let vonSammlung
        try {
          vonSammlung = await row?.sammlung.fetch()
        } catch {}
        let vonSammlungHerkunft
        try {
          vonSammlungHerkunft = await vonSammlung?.herkunft?.fetch()
        } catch {}

        if (vonSammlungHerkunft) {
          return setDataState({
            herkunft: vonSammlungHerkunft,
            herkunftQuelle: 'Sammlung',
            userPersonOption: userPersonOptions?.[0],
            sammelLieferung,
          })
        }

        if (row?.von_kultur_id) {
          let vonKultur
          try {
            vonKultur = await db
              ?.get<import('../../../../../dbModel.ts').Kultur>('kultur')
              .find(row?.von_kultur_id as string)
          } catch {}
          let herkunftByVonKultur
          try {
            herkunftByVonKultur = await vonKultur?.herkunft?.fetch()
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
          nachKultur = await db
            ?.get<import('../../../../../dbModel.ts').Kultur>('kultur')
            .find(row?.nach_kultur_id as string)
        } catch {}
        let herkunftByNachKultur
        try {
          herkunftByNachKultur = await nachKultur?.herkunft?.fetch()
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
    row?.nach_kultur_id,
    row?.sammel_lieferung,
    row?.sammlung,
    row?.von_kultur_id,
    row?.von_sammlung_id,
    user.uid,
  ])
  const { herkunft, herkunftQuelle, userPersonOption, sammelLieferung } =
    dataState

  const { li_show_sl_felder } = userPersonOption ?? {}

  const ifNeeded = (field: string) => {
    if (existsSammelLieferung && li_show_sl_felder) return true
    const sl = sammelLieferung as unknown as Record<string, unknown>
    const l = row as unknown as Record<string, unknown>
    if (!exists(sl?.[field]) || sl?.[field] === false) {
      return true
    } else if (sl?.[field] !== l?.[field]) {
      return true
    }
    return false
  }

  const ifSomeNeeded = (fields: string[]) =>
    fields.some((f) => ifNeeded(f))

  useEffect(() => {
    unsetError('lieferung')
  }, [id])

  const saveToDb = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    let value: string | number | null = ifIsNumericAsNumber(
      event.target.value as string | number,
    )
    if (event.target.value === undefined) value = null
    if (event.target.value === '') value = null

    if (showFilter) {
      return setFilterValue({ table: 'lieferung', key: field as string, value })
    }

    // only update if value has changed
    const previousValue = ifIsNumericAsNumber(row[field])
    if (value === previousValue) return
    row?.edit({ field, value })
  }

  const showDeleted = lieferungFilter._deleted !== false || row?._deleted

  // console.log('Lieferung, row:', row)

  return (
    <ErrorBoundary>
      <div className={artStyles.container}>
        {(activeConflict || showHistory) && (
          <h4 className={artStyles.caseConflictTitle}>
            Aktuelle Version<span className={artStyles.rev}>{row?._rev}</span>
          </h4>
        )}
        {showDeleted && (
          <>
            {showFilter ? (
              <JesNo
                key={`${row?.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row?._deleted}
                saveToDb={saveToDb}
                error={errors?.kultur?._deleted as string | undefined}
              />
            ) : (
              <Checkbox2States
                key={`${row?.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row?._deleted}
                saveToDb={saveToDb}
                error={errors?.kultur?._deleted as string | undefined}
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
      </div>
    </ErrorBoundary>
  )
}
