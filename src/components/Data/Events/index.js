import React, { useContext, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { Q } from '@nozbe/watermelondb'
import { merge } from 'rxjs'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import notDeletedOrHasConflictQuery from '../../../utils/notDeletedOrHasConflictQuery'
import storeFilter from '../../../utils/storeFilter'
import eventSort from '../../../utils/eventSort'
import queryFromFilter from '../../../utils/queryFromFilter'

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
const initialEventState = { events: [], eventsFiltered: [] }

const Events = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const { insertEventRev, kulturIdInActiveNodeArray, db } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { event: eventFilter } = store.filter

  // use object with two keys to only render once on setting
  const [eventsState, setEventState] = useState(initialEventState)
  useEffect(() => {
    const collection = db.collections.get('event')
    const query = kulturIdInActiveNodeArray
      ? collection.query(
          Q.experimentalJoinTables(['kultur']),
          Q.and(
            notDeletedOrHasConflictQuery,
            Q.on('kultur', 'id', kulturIdInActiveNodeArray),
          ),
        )
      : collection.query(notDeletedOrHasConflictQuery)
    const subscription = query
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
      .subscribe((events) => {
        const eventsFiltered = events
          .filter((value) =>
            storeFilter({ value, filter: eventFilter, table: 'event' }),
          )
          .sort((a, b) => eventSort({ a, b }))
        setEventState({ events, eventsFiltered })
      })
    return () => subscription.unsubscribe()
    // need to rerender if any of the values of eventFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    db.collections,
    kulturIdInActiveNodeArray,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(eventFilter),
  ])

  const { events, eventsFiltered } = eventsState

  const totalNr = events.length
  const filteredNr = eventsFiltered.length

  const add = useCallback(() => {
    insertEventRev()
  }, [insertEventRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Events') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Kulturen') {
    upTitle = 'Zur Kultur'
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Event"
            table="event"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Events</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neuer Event"
                title="neuer Event"
                onClick={add}
              >
                <FaPlus />
              </IconButton>
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
                  itemCount={eventsFiltered.length}
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
                      row={eventsFiltered[index]}
                      last={index === eventsFiltered.length - 1}
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

export default withResizeDetector(observer(Events))
