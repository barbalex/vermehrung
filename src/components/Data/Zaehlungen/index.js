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
import FilterNumbers from '../../shared/FilterNumbers'
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
const FieldsContainer = styled.div`
  overflow: auto !important;
  height: 100%;
`

const singleRowHeight = 48

const Zaehlungen = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertZaehlungRev,
    zaehlungsFiltered,
    zaehlungsSorted,
    kulturIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const isFiltered = runIsFiltered()

  const hierarchyFilter = (r) => {
    if (kulturIdInActiveNodeArray) {
      return r.kultur_id === kulturIdInActiveNodeArray
    }
    return true
  }

  const storeRowsFiltered = zaehlungsFiltered.filter((r) => {
    if (kulturIdInActiveNodeArray) {
      return r.kultur_id === kulturIdInActiveNodeArray
    }
    return true
  })

  const totalNr = zaehlungsSorted.filter(hierarchyFilter).length
  const filteredNr = zaehlungsFiltered.filter(hierarchyFilter).length

  const add = useCallback(() => {
    insertZaehlungRev()
  }, [insertZaehlungRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Zaehlungen') {
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
            title="Zählung"
            table="zaehlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Zählungen</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Zählung"
                title="neue Zählung"
                onClick={add}
              >
                <FaPlus />
              </IconButton>
              {(store.filter.show || isFiltered) && (
                <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
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

export default withResizeDetector(observer(Zaehlungen))
