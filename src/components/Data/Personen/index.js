import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { useDatabase } from '@nozbe/watermelondb/hooks'
import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import { StoreContext } from '../../../models/reactUtils'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedOrHasConflictQuery from '../../../utils/notDeletedOrHasConflictQuery'
import storeFilter from '../../../utils/storeFilter'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const FieldsContainer = styled.div`
  height: 100%;
`
const StyledList = styled(FixedSizeList)`
  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    box-shadow: none;
  }
`

const singleRowHeight = 48
const initialPersonState = { persons: [], personsFiltered: [] }

const Personen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertPersonRev, userPerson } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { person: personFilter } = store.filter

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [personsState, setPersonState] = useState(initialPersonState)
  useEffect(() => {
    const subscription = db.collections
      .get('person')
      .query(notDeletedOrHasConflictQuery)
      .observe()
      .subscribe(async (persons) => {
        const personsFiltered = persons.filter((value) =>
          storeFilter({ value, filter: personFilter, table: 'person' }),
        )
        const personSorters = await Promise.all(
          personsFiltered.map(async (person) => {
            const fullname = await person.fullname.pipe(first$()).toPromise()
            const sort = fullname

            return { id: person.id, sort }
          }),
        )
        const personsSorted = sortBy(
          personsFiltered,
          (person) => personSorters.find((s) => s.id === person.id).sort,
        )
        setPersonState({ persons, personsFiltered: personsSorted })
      })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of personFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, ...Object.values(personFilter)])

  const { persons, personsFiltered } = personsState
  const totalNr = persons.length
  const filteredNr = personsFiltered.length

  const { user_role } = userPerson

  const add = useCallback(() => {
    insertPersonRev()
  }, [insertPersonRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Personen') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Person"
            table="person"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Personen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              {user_role === 'manager' && (
                <IconButton
                  aria-label="neue Person"
                  title="neue Person"
                  onClick={add}
                >
                  <FaPlus />
                </IconButton>
              )}
              <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          {!!width && (
            <SimpleBar style={{ maxHeight: height, height: height - 48 }}>
              {({ scrollableNodeRef, contentNodeRef }) => (
                <StyledList
                  height={height - 48}
                  itemCount={personsFiltered.length}
                  itemSize={singleRowHeight}
                  width={width}
                  innerRef={contentNodeRef}
                  outerRef={scrollableNodeRef}
                >
                  {({ index, style }) => (
                    <Row
                      key={index}
                      style={style}
                      index={index}
                      row={personsFiltered[index]}
                      last={index === personsFiltered.length - 1}
                    />
                  )}
                </StyledList>
              )}
            </SimpleBar>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Personen))
