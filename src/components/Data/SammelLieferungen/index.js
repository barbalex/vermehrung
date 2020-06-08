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
import { sammelLieferung as sammelLieferungFragment } from '../../../utils/fragments'

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
  query AllDataQueryForSammelLieferungs(
    $sammelLieferungFilter: sammel_lieferung_bool_exp!
    $totalCountFilter: sammel_lieferung_bool_exp!
  ) {
    sammel_lieferung(where: $sammelLieferungFilter) {
      ...SammelLieferungFields
      person {
        id
        __typename
        name
      }
      kulturByVonKulturId {
        id
        __typename
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
    }
    sammel_lieferung_total_count: sammel_lieferung_aggregate(
      where: $totalCountFilter
    ) {
      aggregate {
        count
      }
    }
    sammel_lieferung_filtered_count: sammel_lieferung_aggregate(
      where: $sammelLieferungFilter
    ) {
      aggregate {
        count
      }
    }
  }
  ${sammelLieferungFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const SammelLieferungen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertSammelLieferungRev,
    sammelLieferungsFiltered,
    sammelLieferungFilter,
    deletedFilter,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  const totalCountFilter = {
    ...hierarchyFilter,
    ...deletedFilter,
  }
  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      sammelLieferungFilter,
      totalCountFilter,
    },
  })

  const totalNr = data?.sammel_lieferung_total_count?.aggregate?.count ?? ''
  const filteredNr =
    data?.sammel_lieferung_filtered_count?.aggregate?.count ?? ''

  const add = useCallback(() => {
    insertSammelLieferungRev()
  }, [insertSammelLieferungRev])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  if (loading && !sammelLieferungsFiltered.length) {
    return (
      <Container>
        <FormTitle title="Sammel-Lieferungen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error && !error.message.includes('Failed to fetch')) {
    return (
      <Container>
        <FormTitle title="Sammel-Lieferungen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammel-Lieferungen</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neue Sammel-Lieferung"
                title="neue Sammel-Lieferung"
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
            itemCount={sammelLieferungsFiltered.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
          >
            {({ index, style }) => (
              <Row
                key={index}
                style={style}
                index={index}
                row={sammelLieferungsFiltered[index]}
                last={index === sammelLieferungsFiltered.length - 1}
              />
            )}
          </FixedSizeList>
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferungen)
