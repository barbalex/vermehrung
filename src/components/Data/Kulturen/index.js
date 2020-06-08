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
import { kultur as kulturFragment } from '../../../utils/fragments'

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
  query AllDataQueryForKulturs(
    $kulturFilter: kultur_bool_exp!
    $totalCountFilter: kultur_bool_exp!
  ) {
    kultur(where: $kulturFilter) {
      ...KulturFields
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
      herkunft {
        id
        __typename
        nr
      }
      garten {
        id
        __typename
        name
        person {
          id
          __typename
          name
        }
      }
    }
    kultur_total_count: kultur_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    kultur_filtered_count: kultur_aggregate(where: $kulturFilter) {
      aggregate {
        count
      }
    }
  }
  ${kulturFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Kulturen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertKulturRev,
    kultursFiltered,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    deletedFilter,
    inactiveFilter,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  if (gartenIdInActiveNodeArray) {
    hierarchyFilter.garten_id = {
      _eq: gartenIdInActiveNodeArray,
    }
  }
  if (artIdInActiveNodeArray) {
    hierarchyFilter.art_id = {
      _eq: artIdInActiveNodeArray,
    }
  }
  const kulturFilter = { ...store.kulturFilter, ...hierarchyFilter }
  const totalCountFilter = {
    ...hierarchyFilter,
    ...deletedFilter,
    ...inactiveFilter,
  }
  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      kulturFilter,
      totalCountFilter,
    },
  })

  const storeRowsFiltered = kultursFiltered.filter((r) => {
    if (gartenIdInActiveNodeArray) {
      return r.garten_id === gartenIdInActiveNodeArray
    }
    if (artIdInActiveNodeArray) {
      return r.art_id === artIdInActiveNodeArray
    }
    return true
  })

  const totalNr = data?.kultur_total_count?.aggregate?.count ?? ''
  const filteredNr = data?.kultur_filtered_count?.aggregate?.count ?? ''

  const add = useCallback(() => {
    insertKulturRev()
  }, [insertKulturRev])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  if (loading && !storeRowsFiltered.length) {
    return (
      <Container>
        <FormTitle title="Kulturen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error && !error.message.includes('Failed to fetch')) {
    return (
      <Container>
        <FormTitle title="Kulturen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

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

export default observer(Kulturen)
