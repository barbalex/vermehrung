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
import UpSvg from '../../../svg/to_up.inline.svg'

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

const Kulturen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertKulturRev,
    kultursSorted,
    kultursFiltered,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const isFiltered = runIsFiltered()

  const hierarchyFilter = (e) => {
    if (gartenIdInActiveNodeArray) {
      return e.garten_id === gartenIdInActiveNodeArray
    }
    if (artIdInActiveNodeArray) {
      return e.art_id === artIdInActiveNodeArray
    }
    return true
  }

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )

  const storeRowsFiltered = kultursFiltered.filter(hierarchyFilter)

  const totalNr = kultursSorted.filter(hierarchyFilter).length
  const filteredNr = storeRowsFiltered.length

  const add = useCallback(() => {
    insertKulturRev()
  }, [insertKulturRev])

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Kultur"
            table="kultur"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Kulturen</Title>
            <TitleSymbols>
              <IconButton title="Zu allen Listen" onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Kultur"
                title="neue Kultur"
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

export default withResizeDetector(observer(Kulturen))
