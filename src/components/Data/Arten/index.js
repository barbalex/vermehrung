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
import { art as artFragment } from '../../../utils/fragments'

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
  query AllDataQueryForArts(
    $artFilter: art_bool_exp!
    $totalCountFilter: art_bool_exp!
  ) {
    art(where: $artFilter) {
      ...ArtFields
    }
    art_total_count: art_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    art_filtered_count: art_aggregate(where: $artFilter) {
      aggregate {
        count
      }
    }
  }
  ${artFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Arten = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { filter, insertArtRev, artsFiltered, showDeleted } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  const artFilter = { ...store.artFilter, ...hierarchyFilter }

  const totalCountFilter = { ...hierarchyFilter }
  if (!showDeleted) {
    totalCountFilter._deleted = { _eq: false }
  }

  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      artFilter,
      totalCountFilter,
    },
  })

  const totalNr = data?.art_total_count?.aggregate?.count ?? ''
  const filteredNr = data?.art_filtered_count?.aggregate?.count ?? ''

  const add = useCallback(() => {
    insertArtRev()
  }, [insertArtRev])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  console.log('Arten', { totalCountFilter, hierarchyFilter, data, artFragment })

  if (loading && !artsFiltered.length) {
    return (
      <Container>
        <FormTitle title="Arten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Arten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
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
              <IconButton aria-label="neue Art" title="neue Art" onClick={add}>
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
            itemCount={artsFiltered.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
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
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Arten)
