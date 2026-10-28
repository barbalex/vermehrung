import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  dbAtom,
  errorsAtom,
  filterArtAtom,
  onlineAtom,
  setFilterValue,
  unsetError,
} from '../../../../store/index.ts'
import { TaxonSelect } from './TaxonSelect.tsx'
import { SelectCreatable } from '../../../shared/SelectCreatable.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { TextField } from '../../../shared/TextField.tsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.ts'
import { Files } from '../../Files/index.tsx'
import { Timeline } from './Timeline/index.tsx'
import { HerkunftTimeline } from './HerkunftTimeline/index.tsx'
import { QK } from './QK/index.tsx'
import { Personen } from './Personen/index.tsx'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'
import { ConflictList } from '../../../shared/ConflictList/index.tsx'
import { artsSortedFromArts } from '../../../../utils/artsSortedFromArts.ts'

import styles from './index.module.css'

export const ArtForm = ({
  activeConflict,
  id,
  row,
  setActiveConflict,
  showFilter,
  showHistory,
}: {
  activeConflict: string | null
  id: string | undefined
  row: import('../../../../dbModel.ts').Art | null | undefined
  setActiveConflict: (val: unknown) => void
  showFilter: boolean
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const errors = useAtomValue(errorsAtom)
  const artFilter = useAtomValue(filterArtAtom)

  const [dataState, setDataState] = useState({
    artsSorted: [],
    aeArts: [],
  })
  useEffect(() => {
    const aeArtObservable = db
      ?.get<import('../../../../dbModel.ts').AeArt>('ae_art')
      .query(Q.sortBy('taxonomy'), Q.sortBy('name'))
      .observe()
    const delQuery =
      artFilter?._deleted === false
        ? Q.where('_deleted', false)
        : artFilter?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const artsObservable = db?.get('art').query(delQuery).observe()
    const combinedObservables = combineLatest([aeArtObservable, artsObservable])
    const subscription = combinedObservables.subscribe(
      async ([aeArts, arts]) => {
        const artsSorted = await artsSortedFromArts(arts)

        setDataState({
          aeArts,
          artsSorted,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, artFilter])
  const { artsSorted, aeArts } = dataState

  useEffect(() => {
    unsetError('art')
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
      return setFilterValue({ table: 'art', key: field as string, value })
    }

    // only update if value has changed
    const previousValue = ifIsNumericAsNumber(row[field])
    if (value === previousValue) return
    row?.edit({ field, value })
  }

  const setsUngrouped = artsSorted
    .map((a) => a.set)
    .filter((s) => !!s)
    .sort()
  const sets = [...new Set(setsUngrouped)]
  const setValues = sets.map((s) => ({ value: s, label: s }))
  const onCreateSet = ({ name }) => {
    const event = { target: { name: 'set', value: name } }
    saveToDb(event)
  }

  const aeArtIdsNotToShow = artsSorted
    .map((a) => a.ae_id)
    .filter((ae_id) => ae_id !== row?.ae_id)

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

  const showDeleted = artFilter._deleted !== false || row?._deleted

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        {(activeConflict || showHistory) && (
          <h4 className={styles.caseConflictTitle}>
            Aktuelle Version<span className={styles.rev}>{row?._rev}</span>
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
                error={errors?.art?._deleted as string | undefined}
              />
            ) : (
              <Checkbox2States
                key={`${row?.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row?._deleted}
                saveToDb={saveToDb}
                error={errors?.art?._deleted as string | undefined}
              />
            )}
          </>
        )}
        <TaxonSelect
          key={`${row?.id}${row?.ae_id}ae_id`}
          art={row}
          saveToDb={saveToDb}
          error={errors?.art?.ae_id as string | undefined}
          modelFilter={aeArtsFilter}
        />
        <SelectCreatable
          key={`${row?.id}${row?.set}set`}
          row={row}
          showFilter={showFilter}
          table="art"
          field="set"
          label="Set"
          options={setValues}
          error={errors?.art?.set as string | undefined}
          onCreateNew={onCreateSet}
          formatCreateLabel={(val) => `"${val}" als neues Set aufnehmen`}
        />
        <TextField
          key={`${row?.id}apflora_av`}
          name="apflora_av"
          label="Artverantwortlich in AP Flora"
          value={row?.apflora_av ?? null}
          saveToDb={saveToDb}
          error={errors?.art?.apflora_av as string | undefined}
        />
        {showFilter ? (
          <JesNo
            key={`${row?.id}apflora_ap`}
            label="Aktionsplan"
            name="apflora_ap"
            value={row?.apflora_ap}
            saveToDb={saveToDb}
            error={errors?.art?.apflora_ap as string | undefined}
          />
        ) : (
          <Checkbox2States
            key={`${row?.id}apflora_ap`}
            label="Aktionsplan"
            name="apflora_ap"
            value={row?.apflora_ap}
            saveToDb={saveToDb}
            error={errors?.art?.apflora_ap as string | undefined}
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
          <>
            <Personen art={row} />
            <Timeline artId={id} />
            <HerkunftTimeline artId={id} />
            <QK artId={id} />
            <Files parent={row} parentTable="art" />
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}
