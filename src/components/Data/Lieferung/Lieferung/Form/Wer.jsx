import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import Select from '../../../../shared/Select/index.jsx'
import TextField from '../../../../shared/TextField.jsx'
import Files from '../../../Files/index.jsx'
import ConflictList from '../../../../shared/ConflictList/index.jsx'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.js'
import personSort from '../../../../../utils/personSort.js'

const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleRow = styled.div`
  background-color: ${(props) =>
    props['data-filter'] ? '#ffe0b2' : 'rgba(248, 243, 254, 1)'};
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  user-select: none;
  z-index: 1;
`

const LieferungWer = ({
  showFilter,
  id,
  saveToDb,
  ifNeeded,
  activeConflict,
  setActiveConflict,
}) => {
  const store = useContext(MobxStoreContext)
  const { errors, online, db, filter, initialDataQueried } = store

  const [dataState, setDataState] = useState({
    personWerte: [],
    row: undefined,
  })
  const { row, personWerte } = dataState

  useEffect(() => {
    const rowObservable = showFilter
      ? $of(filter.lieferung)
      : initialDataQueried
      ? db.get('lieferung').findAndObserve(id)
      : $of({})
    const personDelQuery =
      filter.person._deleted === false
        ? Q.where('_deleted', false)
        : filter.person._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const personAktivQuery =
      filter.person.aktiv === false
        ? Q.where('aktiv', false)
        : filter.person.aktiv === true
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
          'id',
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
    filter.lieferung,
    filter.person._deleted,
    filter.person.aktiv,
    id,
    initialDataQueried,
    row,
    row?.person_id,
    showFilter,
  ])

  if (!row) return null

  return (
    <>
      <TitleRow data-filter={showFilter}>
        <Title>wer</Title>
      </TitleRow>
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

export default observer(LieferungWer)
