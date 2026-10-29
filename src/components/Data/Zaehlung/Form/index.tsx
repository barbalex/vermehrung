import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import {
  dbAtom,
  errorsAtom,
  filterKulturAtom,
  filterZaehlungAtom,
  onlineAtom,
  setFilterValue,
  unsetError,
} from '../../../../store/index.ts'
import { Select } from '../../../shared/Select/index.tsx'
import { TextField } from '../../../shared/TextField.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { DateField as Date } from '../../../shared/Date.tsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.ts'
import { Teilzaehlungen } from './Teilzaehlungen/index.tsx'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'
import { ConflictList } from '../../../shared/ConflictList/index.tsx'
import { kultursSortedFromKulturs } from '../../../../utils/kultursSortedFromKulturs.ts'

import artStyles from '../../Art/Form/index.module.css'

export const ZaehlungForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}: {
  showFilter: boolean
  id?: string | undefined
  row: import('../../../../dbModel.ts').Zaehlung | null | undefined
  rawRow: Record<string, unknown> | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const errors = useAtomValue(errorsAtom)
  const kulturFilter = useAtomValue(filterKulturAtom)
  const zaehlungFilter = useAtomValue(filterZaehlungAtom)

  const [dataState, setDataState] = useState<{
    kulturWerte: {
      value: string
      label: string | undefined
      inaktiv: boolean
      link: string[]
    }[]
    kulturOption: import('../../../../dbModel.ts').KulturOption | undefined
  }>({ kulturWerte: [], kulturOption: undefined })
  useEffect(() => {
    const kulturDelQuery =
      kulturFilter._deleted === false
        ? Q.where('_deleted', false)
        : kulturFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const kulturAktivQuery =
      kulturFilter.aktiv === false
        ? Q.where('aktiv', false)
        : kulturFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const kultursObservable = db
      ?.get<import('../../../../dbModel.ts').Kultur>('kultur')
      .query(kulturDelQuery, kulturAktivQuery)
      .observe()
    const combinedObservables = combineLatest([kultursObservable])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [import('../../../../dbModel.ts').Kultur[]]
      >
    ).subscribe(async ([kulturs]) => {
      // need to show a choosen kultur even if inactive but not if deleted
      let kultur
      try {
        kultur = await row?.kultur.fetch()
      } catch {}
      const kultursIncludingChoosen = uniqBy(
        [...kulturs, ...(kultur && !showFilter ? [kultur] : [])],
        (e) => e.id,
      )
      const kultursSorted = await kultursSortedFromKulturs(
        kultursIncludingChoosen,
      )
      const kulturWerte = await Promise.all(
        kultursSorted
          .filter((k) => {
            const rowArtId = (row as unknown as Record<string, unknown>)
              ?.art_id
            if (rowArtId) return k.art_id === rowArtId
            return true
          })
          .map(async (el) => {
            let label = ''
            try {
              label = (await el.label.pipe(first$()).toPromise()) ?? ''
            } catch {}

            return {
              value: el.id,
              label,
              inaktiv: el.aktiv === false,
              link: ['Kulturen', el.id],
            }
          }),
      )
      let kulturOption
      try {
        kulturOption = await row?.kultur_option.fetch()
      } catch {}

      setDataState({ kulturWerte, kulturOption })
    })

    return () => subscription?.unsubscribe?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    db,
    kulturFilter,
    row?.art_id,
    row?.kultur,
    row?.kultur_option,
    showFilter,
  ])
  const { kulturWerte, kulturOption } = dataState

  const z_bemerkungen = kulturOption?.z_bemerkungen ?? true

  useEffect(() => {
    unsetError('zaehlung')
  }, [id])

  const saveToDb = async (event: {
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
      return setFilterValue({ table: 'zaehlung', key: field as string, value })
    }

    const previousValue = ifIsNumericAsNumber(
      (row as unknown as Record<string, unknown>)[field as string] as string | number,
    )
    // only update if value has changed
    if (value === previousValue) return
    row?.edit({ field, value })
  }

  const showDeleted = zaehlungFilter._deleted !== false || row?._deleted

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
                error={errors?.zaehlung?._deleted as string | undefined}
              />
            ) : (
              <Checkbox2States
                key={`${row?.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row?._deleted}
                saveToDb={saveToDb}
                error={errors?.zaehlung?._deleted as string | undefined}
              />
            )}
          </>
        )}
        <Select
          key={`${row?.id}${row?.kultur_id}kultur_id`}
          name="kultur_id"
          value={row?.kultur_id ?? null}
          field="kultur_id"
          label="Kultur"
          options={kulturWerte}
          loading={false}
          saveToDb={saveToDb}
          error={errors?.zaehlung?.kultur_id as string | undefined}
        />
        <Date
          key={`${row?.id}datum`}
          name="datum"
          label="Datum"
          value={row?.datum ?? null}
          saveToDb={saveToDb}
          error={errors?.zaehlung?.datum as string | undefined}
        />
        {(z_bemerkungen || showFilter) && (
          <TextField
            key={`${row?.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row?.bemerkungen ?? null}
            saveToDb={saveToDb}
            error={errors?.zaehlung?.bemerkungen as string | undefined}
            multiLine
          />
        )}
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row?._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && (
          <Teilzaehlungen zaehlungId={id} zaehlung={row} rawRow={rawRow} />
        )}
      </div>
    </ErrorBoundary>
  )
}
