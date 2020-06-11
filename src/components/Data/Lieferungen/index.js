import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'

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
function sizeReducer(state, action) {
  return action.payload
}

const Lieferungen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertLieferungRev,
    lieferungsSorted,
    lieferungsFiltered,
    kulturIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree
  const isFiltered = runIsFiltered()

  const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray) {
      if (activeNodeArray.includes('Aus-Lieferungen')) {
        return (e.von_kultur_id = kulturIdInActiveNodeArray)
      }
      if (activeNodeArray.includes('An-Lieferungen')) {
        return (e.nach_kultur_id = kulturIdInActiveNodeArray)
      }
    }
    if (sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return (e.sammel_lieferung_id = sammelLieferungIdInActiveNodeArray)
    }
    if (personIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return (e.person_id = personIdInActiveNodeArray)
    }
    if (sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return (e.von_sammlung_id = sammlungIdInActiveNodeArray)
    }
    return true
  }

  const storeRowsFiltered = lieferungsFiltered.filter(hierarchyFilter)

  const totalNr = lieferungsSorted.filter(hierarchyFilter).length
  const filteredNr = lieferungsFiltered.filter(hierarchyFilter).length

  const add = useCallback(() => {
    insertLieferungRev()
  }, [insertLieferungRev])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferungen</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neue Lieferung"
                title="neue Lieferung"
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
          <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
          <FixedSizeList
            height={sizeState.height}
            itemCount={storeRowsFiltered.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
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
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferungen)
