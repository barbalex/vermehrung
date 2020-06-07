import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import { garten as gartenFragment } from '../../../utils/fragments'

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

const allDataQuery = gql`
  query AllDataQueryForGarten(
    $gartenFilter: garten_bool_exp!
    $totalCountFilter: garten_bool_exp!
  ) {
    garten(where: $gartenFilter) {
      ...GartenFields
    }
    garten_total_count: garten_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    garten_filtered_count: garten_aggregate(where: $gartenFilter) {
      aggregate {
        count
      }
    }
  }
  ${gartenFragment}
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
    personIdInActiveNodeArray,
    gartensFiltered,
    hideInactive,
    showDeleted,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  if (personIdInActiveNodeArray) {
    hierarchyFilter.person_id = {
      _eq: personIdInActiveNodeArray,
    }
  }
  const gartenFilter = { ...store.gartenFilter, ...hierarchyFilter }

  const totalCountFilter = { ...hierarchyFilter }
  if (!showDeleted) {
    totalCountFilter._deleted = { _eq: false }
  }
  if (hideInactive) {
    totalCountFilter.aktiv = { _eq: true }
  }
  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      gartenFilter,
      totalCountFilter,
    },
  })

  const storeRowsFiltered = gartensFiltered.filter((g) => {
    if (personIdInActiveNodeArray) g.person_id === personIdInActiveNodeArray
    return true
  })

  const totalNr = data?.garten_total_count?.aggregate?.count
  const filteredNr = data?.garten_filtered_count?.aggregate?.count

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

  if (loading) {
    return (
      <Container>
        <FormTitle title="Gärten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Gärten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
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
