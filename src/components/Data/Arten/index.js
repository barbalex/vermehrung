import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import UpSvg from '../../../svg/to_up.inline.svg'

import { StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import FilterNumbers from '../../shared/FilterNumbers'

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

const Arten = ({ filter: showFilter, width, height }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertArtRev,
    artsFiltered,
    artsSorted,
    loadingInitialData,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const totalNr = artsSorted.length
  const filteredNr = artsFiltered.length

  const add = useCallback(() => {
    insertArtRev()
  }, [insertArtRev])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Arten') {
    upTitle = 'Zu allen Listen'
  }

  if (loadingInitialData && !artsFiltered.length) {
    return (
      <Container>
        <FormTitle title="Arten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Art"
            table="art"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Arten</Title>
            <TitleSymbols>
              <IconButton title={upTitle} onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton aria-label="neue Art" title="neue Art" onClick={add}>
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
              itemCount={artsFiltered.length}
              itemSize={singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={artsFiltered[index]}
                  last={index === artsFiltered.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Arten))
