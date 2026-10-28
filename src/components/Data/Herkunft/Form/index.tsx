import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  filterHerkunftAtom,
  onlineAtom,
  errorsAtom,
  setError,
  unsetError,
  dbAtom,
  userAtom,
  setFilterValue,
} from '../../../../store/index.ts'
import { TextField } from '../../../shared/TextField.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.ts'
import { exists } from '../../../../utils/exists.ts'
import { Files } from '../../Files/index.tsx'
import { Coordinates } from '../../../shared/Coordinates.tsx'
import { ConflictList } from '../../../shared/ConflictList/index.tsx'

import artStyles from '../../Art/Form/index.module.css'

export const HerkunftForm = ({
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
  row: import('../../../../dbModel.ts').Herkunft | null | undefined
  rawRow: Record<string, unknown> | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
}) => {
  const herkunftFilter = useAtomValue(filterHerkunftAtom)
  const online = useAtomValue(onlineAtom)
  const errors = useAtomValue(errorsAtom)
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../dbModel.ts').PersonOption>('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns([
            'hk_kanton',
            'hk_land',
            'hk_bemerkungen',
            'hk_geom_point',
          ])
      : $of({})
    const delQuery =
      herkunftFilter._deleted === false
        ? Q.where('_deleted', false)
        : herkunftFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const herkunftsNrCountObservable =
      showFilter || !exists(row?.nr)
        ? $of(0)
        : db
            ?.get<import('../../../../dbModel.ts').Herkunft>('herkunft')
            .query(delQuery, Q.where('nr', row.nr))
            .observeCount()
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      herkunftsNrCountObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, nrCount]) => {
        if (!showFilter && nrCount > 1) {
          setError({
            path: 'herkunft.nr',
            value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Herkünfte eindeutig sein`,
          })
        }
        setDataState({
          userPersonOption: userPersonOptions?.[0],
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, herkunftFilter, row?.nr, showFilter, user])
  const { userPersonOption } = dataState

  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point } =
    userPersonOption ?? {}

  useEffect(() => {
    unsetError('herkunft')
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
      return setFilterValue({ table: 'herkunft', key: field as string, value })
    }

    const previousValue = ifIsNumericAsNumber(row?._raw[field])
    // only update if value has changed
    if (value === previousValue) return
    await row?.edit({ field, value })
  }

  const showDeleted = herkunftFilter._deleted !== false || row?._deleted

  return (
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
              error={errors?.herkunft?._deleted as string | undefined}
            />
          ) : (
            <Checkbox2States
              key={`${row?.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row?._deleted}
              saveToDb={saveToDb}
              error={errors?.herkunft?._deleted as string | undefined}
            />
          )}
        </>
      )}
      <TextField
        key={`${row?.id}nr`}
        name="nr"
        label="Nr"
        value={row?.nr ?? null}
        saveToDb={saveToDb}
        error={errors?.herkunft?.nr as string | undefined}
      />
      <TextField
        key={`${row?.id}lokalname`}
        name="lokalname"
        label="Lokalname"
        value={row?.lokalname ?? null}
        saveToDb={saveToDb}
        error={errors?.herkunft?.lokalname as string | undefined}
      />
      <TextField
        key={`${row?.id}gemeinde`}
        name="gemeinde"
        label="Gemeinde"
        value={row?.gemeinde ?? null}
        saveToDb={saveToDb}
        error={errors?.herkunft?.gemeinde as string | undefined}
      />
      {hk_kanton && (
        <TextField
          key={`${row?.id}kanton`}
          name="kanton"
          label="Kanton"
          value={row?.kanton ?? null}
          saveToDb={saveToDb}
          error={errors?.herkunft?.kanton as string | undefined}
        />
      )}
      {hk_land && (
        <TextField
          key={`${row?.id}land`}
          name="land"
          label="Land"
          value={row?.land ?? null}
          saveToDb={saveToDb}
          error={errors?.herkunft?.land as string | undefined}
        />
      )}
      {!showFilter && hk_geom_point && (
        <Coordinates row={row} rawRow={rawRow} saveToDb={saveToDb} />
      )}
      {hk_bemerkungen && (
        <TextField
          key={`${row?.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row?.bemerkungen ?? null}
          saveToDb={saveToDb}
          error={errors?.herkunft?.bemerkungen as string | undefined}
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
      {!showFilter && row?.id && <Files parentTable="herkunft" parent={row} />}
    </div>
  )
}
