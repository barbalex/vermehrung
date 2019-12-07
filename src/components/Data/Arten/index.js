import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import ErrorBoundary from 'react-error-boundary'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import storeContext from '../../../storeContext'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import artQuery from './artQuery'
import Row from './Row'
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

const Arten = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const artFilter = queryFromTable({ store, table: 'art' })
  const { data, error, loading } = useQuery(artQuery, {
    variables: { filter: artFilter },
  })

  const totalNr = get(data, 'rowsUnfiltered', []).length
  const rows = get(data, 'rowsFiltered', [])
  const filteredNr = rows.length

  const add = useCallback(() => {
    const node = { nodeType: 'folder', url: ['Arten'] }
    createNew({ node, store, client })
  }, [client, store])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Arten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Arten" />
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
          {rows.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Arten)
