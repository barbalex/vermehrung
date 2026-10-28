import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
//import { first as first$ } from 'rxjs/operators'
import { combineLatest, of as $of } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import {
  dbAtom,
  userAtom,
  errorsAtom,
  onlineAtom,
  filterPersonAtom,
  filterGartenAtom,
  unsetError,
  setFilterValue,
} from '../../../../store/index.ts'
import { insertGvRev } from '../../../../modules/insertRev.ts'
import { Select } from '../../../shared/Select/index.tsx'
import { TextField } from '../../../shared/TextField.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.ts'
import { personLabelFromPerson } from '../../../../utils/personLabelFromPerson.ts'
import { personSort } from '../../../../utils/personSort.ts'
import { Files } from '../../Files/index.tsx'
import { Coordinates } from '../../../shared/Coordinates.tsx'
import { GartenPersonen as Personen } from './Personen/index.tsx'
import { ConflictList } from '../../../shared/ConflictList/index.tsx'

import artStyles from '../../Art/Form/index.module.css'

export const GartenForm = ({
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
  row: import('../../../../dbModel.ts').Garten | null | undefined
  rawRow: Record<string, unknown> | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const errors = useAtomValue(errorsAtom)
  const online = useAtomValue(onlineAtom)
  const personFilter = useAtomValue(filterPersonAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)

  useEffect(() => {
    unsetError('garten')
  }, [id])

  const [dataState, setDataState] = useState({
    personWerte: [],
    userPersonOption: {},
    gvs: [],
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../dbModel.ts').PersonOption>('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns([
            'ga_strasse',
            'ga_plz',
            'ga_ort',
            'ga_geom_point',
            'ga_aktiv',
            'ga_bemerkungen',
          ])
      : $of({})
    const delQuery =
      personFilter._deleted === false
        ? Q.where('_deleted', false)
        : personFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const aktivQuery =
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
      .query(delQuery, aktivQuery)
      .observeWithColumns(['vorname', 'name'])
    const personObservable = row?.person ? row?.person.observe() : $of({})
    const gvsObservable = row?.gvs
      ? row?.gvs.extend(Q.where('_deleted', false)).observe()
      : $of([])
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      personsObservable,
      personObservable,
      gvsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, persons, person, gvs]: [
          import('../../../../dbModel.ts').PersonOption[],
          import('../../../../dbModel.ts').Person[],
          Record<string, unknown> | undefined,
          never[],
        ]) => {
        // need to show a choosen person even if inactive but not if deleted
        const personsIncludingChoosen = uniqBy(
          [...persons, ...(person?.id && !showFilter ? [person] : [])],
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
          personWerte,
          userPersonOption: userPersonOptions?.[0],
          gvs,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    personFilter._deleted,
    personFilter.aktiv,
    row?.gvs,
    row?.person,
    showFilter,
    user,
  ])
  const { personWerte, userPersonOption, gvs } = dataState
  const gvPersonIds = gvs.map((v) => v.person_id)

  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_aktiv,
    ga_bemerkungen,
  } = userPersonOption ?? {}

  // console.log('Garten, render, Form', { ga_aktiv })

  const saveToDb = async (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    let value = ifIsNumericAsNumber(event.target.value)
    if (event.target.value === undefined) value = null
    if (event.target.value === '') value = null

    if (showFilter) {
      return setFilterValue({ table: 'garten', key: field, value })
    }
    const previousValue = ifIsNumericAsNumber(row[field])
    // only update if value has changed
    if (value === previousValue) return
    //console.log('Garten, will edit row:', { field, value })
    row?.edit({ field, value })
    if (field === 'person_id') {
      // only if not yet exists
      // do this in garten.edit?
      if (!gvPersonIds.includes(value)) {
        // console.log('Garten, will insert into gvRev:', {
        //   garten_id: row.id,
        //   person_id: value,
        //   gvPersonIds,
        // })
        insertGvRev({ values: { garten_id: row?.id, person_id: value } })
      }
    }
  }

  const showDeleted = gartenFilter._deleted !== false || row?._deleted

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
              error={errors?.garten?._deleted as string | undefined}
            />
          ) : (
            <Checkbox2States
              key={`${row?.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row?._deleted}
              saveToDb={saveToDb}
              error={errors?.garten?._deleted as string | undefined}
            />
          )}
        </>
      )}
      <TextField
        key={`${row?.id}name`}
        name="name"
        label="Name"
        value={row?.name ?? null}
        saveToDb={saveToDb}
        error={errors?.garten?.name as string | undefined}
      />
      <Select
        key={`${row?.id}${row?.person_id}person_id`}
        name="person_id"
        value={row?.person_id ?? null}
        field="person_id"
        label="Person"
        options={personWerte}
        saveToDb={saveToDb}
        error={errors?.garten?.person_id as string | undefined}
      />
      {ga_strasse && (
        <TextField
          key={`${row?.id}strasse`}
          name="strasse"
          label="Strasse"
          value={row?.strasse ?? null}
          saveToDb={saveToDb}
          error={errors?.garten?.strasse as string | undefined}
        />
      )}
      {ga_plz && (
        <TextField
          key={`${row?.id}plz`}
          name="plz"
          label="PLZ"
          value={row?.plz ?? null}
          saveToDb={saveToDb}
          error={errors?.garten?.plz as string | undefined}
          type="number"
        />
      )}
      {ga_ort && (
        <TextField
          key={`${row?.id}ort`}
          name="ort"
          label="Ort"
          value={row?.ort ?? null}
          saveToDb={saveToDb}
          error={errors?.garten?.ort as string | undefined}
        />
      )}
      {!showFilter && ga_geom_point && (
        <Coordinates row={row} rawRow={rawRow} saveToDb={saveToDb} />
      )}
      {ga_aktiv && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row?.id}aktiv`}
              label="aktiv"
              name="aktiv"
              value={row?.aktiv}
              saveToDb={saveToDb}
              error={errors?.garten?.aktiv as string | undefined}
            />
          ) : (
            <Checkbox2States
              key={`${row?.id}aktiv`}
              label="aktiv"
              name="aktiv"
              value={row?.aktiv}
              saveToDb={saveToDb}
              error={errors?.garten?.aktiv as string | undefined}
            />
          )}
        </>
      )}
      {ga_bemerkungen && (
        <TextField
          key={`${row?.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row?.bemerkungen ?? null}
          saveToDb={saveToDb}
          error={errors?.garten?.bemerkungen as string | undefined}
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
        <>
          <Personen gartenId={row?.id} garten={row} />{' '}
          <Files parentTable="garten" parent={row} />
        </>
      )}
    </div>
  )
}
