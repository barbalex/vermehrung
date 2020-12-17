import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import { StoreContext } from '../../../../../models/reactUtils'
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
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  user-select: none;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`

const LieferungWer = ({
  showFilter,
  row,
  saveToDb,
  ifNeeded,
  activeConflict,
  setActiveConflict,
}) => {
  const store = useContext(StoreContext)
  const { errors, online, db } = store

  const [personWerte, setPersonWerte] = useState([])
  useEffect(() => {
    const personsObservable = db.collections
      .get('person')
      .query(Q.where('_deleted', false), Q.where('aktiv', true))
      .observe()
    const combinedObservables = combineLatest([personsObservable])
    const allSubscription = combinedObservables.subscribe(async ([persons]) => {
      // need to show a choosen person even if inactive but not if deleted
      const person = await row.person?.fetch()
      const personsIncludingInactiveChoosen = uniqBy(
        [...persons, ...(person && !person?._deleted ? [person] : [])],
        'id',
      )
      const personWerte = personsIncludingInactiveChoosen
        .sort((a, b) => personSort({ a, b }))
        .map((el) => ({
          value: el.id,
          label: personLabelFromPerson({ person: el }),
        }))

      setPersonWerte(personWerte)
    })

    return () => allSubscription.unsubscribe()
  }, [db.collections, row.person])

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  return (
    <>
      <TitleRow
        data-filter={showFilter}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
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
