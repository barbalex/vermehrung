import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import StoreContext from '../../../../../storeContext'
import Select from '../../../../shared/Select'
import TextField from '../../../../shared/TextField'
import Files from '../../../Files'
import ConflictList from '../../../../shared/ConflictList'
import personLabelFromPerson from '../../../../../utils/personLabelFromPerson'
import personSort from '../../../../../utils/personSort'

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
  &:first-of-type {
    margin-top: -10px;
  }
`

const LieferungWer = ({
  showFilter,
  id,
  saveToDb,
  ifNeeded,
  activeConflict,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { errors, online, db, filter } = store

  const [dataState, setDataState] = useState({
    personWerte: [],
    row: undefined,
  })
  const { row, personWerte } = dataState

  useEffect(() => {
    const rowObservable = showFilter
      ? $of(filter.lieferung)
      : db.get('lieferung').findAndObserve(id)
    const personsObservable = db
      .get('person')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.person._deleted === false
              ? [false]
              : filter.person._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.person.aktiv === true
              ? [true]
              : filter.person.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
      )
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
          }))

        setDataState({ personWerte, row })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.lieferung,
    filter.person._deleted,
    filter.person.aktiv,
    id,
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
