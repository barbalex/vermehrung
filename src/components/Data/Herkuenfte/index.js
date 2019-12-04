import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import ErrorBoundary from 'react-error-boundary'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import gql from 'graphql-tag'

import storeContext from '../../../storeContext'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import createNew from '../../TreeContainer/Tree/createNew'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
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
  padding-right: 8px;
  cursor: default;
  user-select: none;
  padding-right: 5px;
  margin-top: auto;
  margin-bottom: auto;
  min-width: 48px;
  text-align: center;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const query = gql`
  query HerkunftQuery($isFiltered: Boolean!, $filter: herkunft_bool_exp!) {
    rowsUnfiltered: herkunft @include(if: $isFiltered) {
      id
    }
    rowsFiltered: herkunft(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
`

const Herkuenfte = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  const { data, error, loading } = useQuery(query, {
    variables: { isFiltered, filter: herkunftFilter },
  })

  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length

  const add = useCallback(() => {
    const node = { nodeType: 'folder', url: ['Herkuenfte'] }
    createNew({ node, store, client })
  }, [client, store])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Herkünfte" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Herkünfte" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
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
            <Title>Herkünfte</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neue Herkunft"
                title="neue Herkunft"
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
        <FieldsContainer />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkuenfte)
