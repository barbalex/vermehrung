import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
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

const Gaerten = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertGartenRev,
    gartenFiltered,
    personIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const gartenFilter = { ...store.gartenFilter }
  if (personIdInActiveNodeArray) {
    gartenFilter.person_id = {
      _eq: personIdInActiveNodeArray,
    }
  }
  const { error: errorFiltered, loading: loadingFiltered } = useQuery(
    (store) =>
      store.queryGarten({
        where: gartenFilter,
        order_by: [
          { name: 'asc_nulls_first' },
          { person: { name: 'asc_nulls_first' } },
        ],
      }),
    (g) => g.id.name.person((p) => p.id.name),
  )

  const { data: dataGartenAggregate } = useQuery((store) =>
    store.queryGarten_aggregate(undefined, (d) => d.aggregate((d) => d.count)),
  )
  const totalNr = dataGartenAggregate?.garten_aggregate?.aggregate?.count ?? 0

  const storeRowsFiltered = gartenFiltered.filter((g) => {
    if (personIdInActiveNodeArray) {
      return g.person_id === personIdInActiveNodeArray
    }
    return true
  })
  const filteredNr = storeRowsFiltered.length

  const add = useCallback(() => {
    insertGartenRev()
  }, [insertGartenRev])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  if (loadingFiltered) {
    return (
      <Container>
        <FormTitle title="Gärten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = errorFiltered
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Gärten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Garten"
            table="garten"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Gärten</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neuer Garten"
                title="neuer Garten"
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

export default observer(Gaerten)
