import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../models/reactUtils'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'

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
const TitleFilterNumbers = styled.div`
  cursor: default;
  user-select: none;
  padding: 0 5px;
  margin-top: auto;
  margin-bottom: auto;
  min-width: 48px;
  text-align: center;
`
const FieldsContainer = styled.div`
  overflow: auto !important;
  height: 100%;
`

const singleRowHeight = 48

const Events = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertEventRev,
    eventsSorted,
    eventsFiltered,
    kulturIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray)
      return e.kultur_id === kulturIdInActiveNodeArray
    return true
  }

  const storeRowsFiltered = eventsFiltered.filter((e) => {
    if (kulturIdInActiveNodeArray) {
      return e.kultur_id === kulturIdInActiveNodeArray
    }
    return true
  })
  const totalNr = eventsSorted.filter(hierarchyFilter).length
  const filteredNr = eventsFiltered.filter(hierarchyFilter).length

  const add = useCallback(() => {
    insertEventRev()
  }, [insertEventRev])

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
              <IconButton
                aria-label="neuer Event"
                title="neuer Event"
                onClick={add}
              >
                <FaPlus />
              </IconButton>
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          {!!width && (
            <FixedSizeList
              height={height - 48}
              itemCount={storeRowsFiltered.length}
              itemSize={singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={storeRowsFiltered[index]}
                  last={index === storeRowsFiltered.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Events))
