import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import gql from 'graphql-tag'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import { v1 as uuidv1 } from 'uuid'

import storeContext from '../../../storeContext'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import createNew from '../../TreeContainer/Tree/createNew'
import { person as personFragment } from '../../../utils/fragments'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import { useQuery } from '../../../models/reactUtils'

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

const query = gql`
  query PersonQueryForPersons($filter: person_bool_exp!) {
    rowsUnfiltered: person {
      id
    }
    rowsFiltered: person(where: $filter, order_by: { name: asc_nulls_first }) {
      ...PersonFields
    }
  }
  ${personFragment}
`
const personQueryByAccountId = gql`
  query PersonQueryForPersonsByAccoutId($accountId: String) {
    person(where: { account_id: { _eq: $accountId } }) {
      ...PersonFields
    }
  }
  ${personFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Personen = ({ filter: showFilter }) => {
  const store = useContext(storeContext)

  const { filter, user } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree
  const isFiltered = runIsFiltered()

  const personFilter = queryFromTable({ store, table: 'person' })
  const { store: dataStore, data, error, loading } = useQuery(query, {
    variables: { filter: personFilter },
  })
  const { data: data2, error: error2, refetch } = useQuery((st) =>
    st.queryPerson(),
  )
  console.log('Personen:', {
    dataStore,
    data2,
    dataStorePersons: dataStore.persons,
  })
  //dataStore.log()
  console.log('Personen, store.persons:', dataStore.persons)

  const totalNr = get(data, 'rowsUnfiltered', []).length
  const rows = get(data, 'rowsFiltered', [])
  const filteredNr = rows.length

  const add = useCallback(() => {
    //const node = { nodeType: 'folder', url: activeNodeArray }
    const id = uuidv1()
    dataStore.mutateInsert_person(
      {
        objects: [{ id, name: 'test4' }],
        onConflict: { constraint: 'person_pkey', update_columns: [] },
      },
      undefined,
      /*(m) => {
        dataStore.persons.push(m)
      },*/
    )
    //refetch()
    //createNew({ node, store, client })
  }, [dataStore])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  const personOptionResult = useQuery(personQueryByAccountId, {
    variables: { accountId: user.uid },
  })
  const { user_role } = get(personOptionResult.data, 'person[0]') || {}

  if (loading) {
    return (
      <Container>
        <FormTitle title="Personen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Personen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
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
            itemCount={rows.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
          >
            {({ index, style }) => (
              <Row
                key={index}
                style={style}
                index={index}
                row={rows[index]}
                last={index === rows.length - 1}
              />
            )}
          </FixedSizeList>
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Personen)
