import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import gql from 'graphql-tag'

import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import { useQuery, StoreContext } from '../../../models/reactUtils'
import { person as personFragment } from '../../../utils/fragments'

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
  query AllDataQueryForPersons(
    $personFilter: person_bool_exp!
    $totalCountFilter: person_bool_exp!
  ) {
    person(where: $personFilter) {
      ...PersonFields
    }
    person_total_count: person_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    person_filtered_count: person_aggregate(where: $personFilter) {
      aggregate {
        count
      }
    }
  }
  ${personFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Personen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    userPerson,
    personsFiltered,
    personFilter,
    deletedFilter,
    inactiveFilter,
  } = store

  const { filter, insertPersonRev } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  const totalCountFilter = {
    ...hierarchyFilter,
    ...deletedFilter,
    ...inactiveFilter,
  }
  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      personFilter,
      totalCountFilter,
    },
  })

  const storeRowsFiltered = personsFiltered

  const totalNr = data?.person_total_count?.aggregate?.count ?? ''
  const filteredNr = data?.person_filtered_count?.aggregate?.count ?? ''

  const { user_role } = userPerson

  const add = useCallback(() => {
    insertPersonRev()
  }, [insertPersonRev])

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
        <FormTitle title="Personen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error && !error.message.includes('Failed to fetch')) {
    return (
      <Container>
        <FormTitle title="Personen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Person"
            table="person"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Personen</Title>
            <TitleSymbols>
              {user_role === 'manager' && (
                <IconButton
                  aria-label="neue Person"
                  title="neue Person"
                  onClick={add}
                >
                  <FaPlus />
                </IconButton>
              )}
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

export default observer(Personen)
