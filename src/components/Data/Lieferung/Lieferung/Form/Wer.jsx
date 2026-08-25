import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import {
  dbAtom,
  errorsAtom,
  onlineAtom,
  filterLieferungAtom,
  filterPersonAtom,
  initialDataQueriedAtom,
} from '../../../../../store/index.js'
import { Select } from '../../../../shared/Select/index.jsx'
import { TextField } from '../../../../shared/TextField.jsx'
import { Files } from '../../../Files/index.jsx'
import { ConflictList } from '../../../../shared/ConflictList/index.jsx'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.js'
import { personSort } from '../../../../../utils/personSort.js'

import wannStyles from './Wann.module.css'

export const LieferungWer = ({
  showFilter,
  id,
  saveToDb,
  ifNeeded,
  activeConflict,
  setActiveConflict,
}) => {
  const errors = useAtomValue(errorsAtom)
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const lieferungFilter = useAtomValue(filterLieferungAtom)
  const personFilter = useAtomValue(filterPersonAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  const [dataState, setDataState] = useState({
    personWerte: [],
    row: undefined,
  })
  const { row, personWerte } = dataState

  useEffect(() => {
    const rowObservable = showFilter
      ? $of(lieferungFilter)
      : initialDataQueried
        ? db.get('lieferung').findAndObserve(id)
        : $of({})
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
      .get('person')
      .query(personDelQuery, personAktivQuery)
      .observeWithColumns(['name', 'vorname'])
    const combinedObservables = combineLatest([
      personsObservable,
      rowObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([persons, row]) => {
        // need to show a choosen kultur even if inactive but not if deleted
        let person
        try {
          person = await row.person.fetch()
        } catch {}
        const personsIncludingChoosen = uniqBy(
          [...persons, ...(person && !showFilter ? [person] : [])],
          (e) => e.id,
        )
        const personWerte = personsIncludingChoosen
          .sort(personSort)
          .map((el) => ({
            value: el.id,
            label: personLabelFromPerson({ person: el }),
            inaktiv: el.aktiv === false,
            link: ['Personen', el.id],
          }))

        setDataState({ personWerte, row })
        // TODO:
        // reloading on http://localhost:5175/Vermehrung/Lieferungen/afd3e250-2e9f-11ed-af3a-51bb05f7b810 causes:
        // Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect,
        // but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render
        // only happens on (re-)load
        // and only in dev mode!!
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    lieferungFilter,
    personFilter,
    id,
    initialDataQueried,
    row,
    row?.person_id,
    showFilter,
  ])

  if (!row || !Object.keys(row ?? {})) return null

  return (
    <>
      <div
        className={wannStyles.titleRow}
        style={{
          backgroundColor: showFilter ? '#ffe0b2' : 'rgba(248, 243, 254, 1)',
        }}
      >
        <div className={wannStyles.title}>wer</div>
      </div>
      {ifNeeded('person_id') && (
        <Select
          key={`${row.id}person_id`}
          name="person_id"
          value={row.person_id}
          field="person_id"
          label="liefernde Person"
          options={personWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.person_id}
        />
      )}
      {ifNeeded('bemerkungen') && (
        <TextField
          key={`${row.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row.bemerkungen}
          saveToDb={saveToDb}
          error={errors?.lieferung?.bemerkungen}
          multiLine
        />
      )}
      {online && !showFilter && !!row?._conflicts?.map && (
        <ConflictList
          conflicts={row._conflicts}
          activeConflict={activeConflict}
          setActiveConflict={setActiveConflict}
        />
      )}
      {!showFilter && <Files parentTable="lieferung" parent={row} />}
    </>
  )
}
