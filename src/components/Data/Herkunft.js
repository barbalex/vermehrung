import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../storeContext'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import FilterTitle from '../shared/FilterTitle'
import { herkunft as herkunftFragment } from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'
import Files from './Files'
import Coordinates from '../shared/Coordinates'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const query = gql`
  query HerkunftQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: herkunft_bool_exp!
  ) {
    herkunft(where: { id: { _eq: $id } }) {
      ...HerkunftFields
    }
    rowsUnfiltered: herkunft @include(if: $isFiltered) {
      id
    }
    rowsFiltered: herkunft(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${herkunftFragment}
`

const Herkunft = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: herkunftFilter, refetch },
  })

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.herkunft
  } else {
    row = get(data, 'herkunft', [{}])[0]
  }

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      const type = types.herkunft[field]
      if (showFilter) {
        let valueToSet = value
        if (value === '') {
          valueToSet = null
        } else if (['number'].includes(type)) {
          valueToSet = +value
        }
        filter.setValue({ table: 'herkunft', key: field, value: valueToSet })
      } else {
        try {
          let valueToSet
          if (value === undefined || value === null) {
            valueToSet = null
          } else if (['number', 'boolean'].includes(type)) {
            valueToSet = value
          } else {
            valueToSet = `"${value}"`
          }
          await client.mutate({
            mutation: gql`
              mutation update_herkunft(
                $id: bigint!
              ) {
                update_herkunft(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...HerkunftFields
                  }
                }
              }
              ${herkunftFragment}
            `,
            variables: {
              id: row.id,
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
        refetch()
      }
    },
    [row],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <FormTitle
            title="Herkunft"
            table="herkunft"
            rowsLength={totalNr}
            rowsFilteredLength={filteredNr}
            filter={showFilter}
          />
        )}
        <FieldsContainer>
          <TextField
            key={`${row.id}nr`}
            name="nr"
            label="Nr"
            value={row.nr}
            saveToDb={saveToDb}
            error={errors.nr}
          />
          <TextField
            key={`${row.id}lokalname`}
            name="lokalname"
            label="Lokalname"
            value={row.lokalname}
            saveToDb={saveToDb}
            error={errors.lokalname}
          />
          <TextField
            key={`${row.id}gemeinde`}
            name="gemeinde"
            label="Gemeinde"
            value={row.gemeinde}
            saveToDb={saveToDb}
            error={errors.gemeinde}
          />
          <TextField
            key={`${row.id}kanton`}
            name="kanton"
            label="Kanton"
            value={row.kanton}
            saveToDb={saveToDb}
            error={errors.kanton}
          />
          <TextField
            key={`${row.id}land`}
            name="land"
            label="Land"
            value={row.land}
            saveToDb={saveToDb}
            error={errors.land}
          />
          {!showFilter && (
            <Coordinates row={row} refetchForm={refetch} table="herkunft" />
          )}
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors.bemerkungen}
            multiLine
          />
          {!showFilter && <Files parentId={row.id} parent="herkunft" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
