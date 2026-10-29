import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import {
  dbAtom,
  onlineAtom,
  errorsAtom,
  filterBedarfAtom,
  filterKulturAtom,
  filterPersonAtom,
  unsetError,
  setFilterValue,
} from '../../../../store/index.ts'
import { Select } from '../../../shared/Select/index.tsx'
import { TextField } from '../../../shared/TextField.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'
import { ConflictList } from '../../../shared/ConflictList/index.tsx'
import { kultursSortedFromKulturs } from '../../../../utils/kultursSortedFromKulturs.ts'
import { personLabelFromPerson } from '../../../../utils/personLabelFromPerson.ts'
import { personSort } from '../../../../utils/personSort.ts'

import artStyles from '../../Art/Form/index.module.css'

export const BedarfForm = ({
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
  row: import('../../../../dbModel.ts').Bedarf | null | undefined
  rawRow?: Record<string, unknown> | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const errors = useAtomValue(errorsAtom)
  const bedarfFilter = useAtomValue(filterBedarfAtom)
  const kulturFilter = useAtomValue(filterKulturAtom)
  const personFilter = useAtomValue(filterPersonAtom)

  useEffect(() => {
    unsetError('bedarf')
  }, [id])

  const [dataState, setDataState] = useState<{
    kulturWerte: {
      value: string
      label: string | undefined
      inaktiv?: boolean
      link?: string[]
    }[]
    personWerte: {
      value: string
      label: string | undefined
      inaktiv?: boolean
      link?: string[]
    }[]
  }>({ kulturWerte: [], personWerte: [] })
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
      .observeWithColumns([
        'garten_id',
        'art_id',
        'herkunft_id',
        'zwischenlager',
      ])
    const personDelQuery =
      personFilter._deleted === false
        ? Q.where('_deleted', false)
        : personFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const personAktivQuery =
      personFilter.aktiv === false
        ? Q.where('aktiv', false)
        : personFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const personsObservable = db
      ?.get<import('../../../../dbModel.ts').Person>('person')
      .query(personDelQuery, personAktivQuery)
      .observeWithColumns(['vorname', 'name'])
    const combinedObservables = combineLatest([
      kultursObservable,
      personsObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../dbModel.ts').Kultur[],
          import('../../../../dbModel.ts').Person[],
        ]
      >
    ).subscribe(
      async ([kulturs, persons]) => {
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
          kultursSorted.map(async (k) => {
            let label
            try {
              label = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: k.id,
              label,
              inaktiv: k.aktiv === false,
              link: ['Kulturen', k.id],
            }
          }),
        )
        // need to show a choosen person even if inactive but not if deleted
        let person
        try {
          person = await row?.person.fetch()
        } catch {}
        const personsIncludingChoosen = uniqBy(
          [...persons, ...(person && !showFilter ? [person] : [])],
          (e) => e.id,
        )
        const personWerte = personsIncludingChoosen
          .sort(personSort)
          .map((person) => ({
            value: person.id,
            label: personLabelFromPerson({ person }),
            inaktiv: person.aktiv === false,
            link: ['Personen', person.id],
          }))
        setDataState({
          kulturWerte,
          personWerte,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturFilter._deleted,
    kulturFilter.aktiv,
    personFilter._deleted,
    personFilter.aktiv,
    row,
    // TODO: this provokes indefinite loop

    // ...[Object.values(row)],
    // solution: rawRow
    rawRow,
    showFilter,
  ])
  const { kulturWerte, personWerte } = dataState

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
      return setFilterValue({ table: 'bedarf', key: field as string, value })
    }

    const previousValue = ifIsNumericAsNumber(
      (row as unknown as Record<string, unknown>)?.[field as string] as
        string | number,
    )
    // only update if value has changed
    if (value === previousValue) return
    row?.edit({ field, value })
  }

  const showDeleted = bedarfFilter._deleted !== false || row?._deleted

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
                error={errors?.bedarf?._deleted as string | undefined}
              />
            ) : (
              <Checkbox2States
                key={`${row?.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row?._deleted}
                saveToDb={saveToDb}
                error={errors?.bedarf?._deleted as string | undefined}
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
          saveToDb={saveToDb}
          error={errors?.bedarf?.kultur_id as string | undefined}
        />
        <TextField
          key={`${row?.id}jahr`}
          name="jahr"
          label="Jahr"
          value={row?.jahr ?? null}
          saveToDb={saveToDb}
          error={errors?.bedarf?.jahr as string | undefined}
          type="number"
        />
        <TextField
          key={`${row?.id}beschreibung`}
          name="beschreibung"
          label="Beschreibung"
          value={row?.beschreibung ?? null}
          saveToDb={saveToDb}
          error={errors?.bedarf?.beschreibung as string | undefined}
          multiLine
        />
        <TextField
          key={`${row?.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row?.bemerkungen ?? null}
          saveToDb={saveToDb}
          error={errors?.bedarf?.bemerkungen as string | undefined}
          multiLine
        />
        <TextField
          key={`${row?.id}neues_material`}
          name="neues_material"
          label="Neues Material"
          value={row?.neues_material ?? null}
          saveToDb={saveToDb}
          error={errors?.bedarf?.neues_material as string | undefined}
          multiLine
        />
        <Select
          key={`${row?.id}${row?.person_id}person_id`}
          name="person_id"
          value={row?.person_id ?? null}
          field="person_id"
          label="Wer"
          options={personWerte}
          saveToDb={saveToDb}
          error={errors?.bedarf?.person_id as string | undefined}
        />
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row?._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}
