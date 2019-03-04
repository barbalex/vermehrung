import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'

import storeContext from '../../storeContext'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import filterNodes from '../../utils/filterNodes'
import { herkunft as herkunftFragment } from '../../utils/fragments'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const query = gql`
  query HerkunftQuery($id: Int!, $isFiltered: Boolean!) {
    herkunft(where: { id: { _eq: $id } }) {
      ...HerkunftFields
    }
    rows: herkunft @include(if: $isFiltered) {
      ...HerkunftFields
    }
  }
  ${herkunftFragment}
`

const Herkunft = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered },
  })
  //console.log('Herkunft')

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.herkunft : get(data, 'herkunft', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'herkunft' }),
  )()

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'herkunft', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_herkunft(
                $id: Int!
              ) {
                update_herkunft(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${!isNaN(value) ? value : `"${value}"`}
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
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Herkunft"
          table="herkunft"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
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
          <TextField
            key={`${row.id}x`}
            name="x"
            label="X-Koordinate"
            value={row.x}
            saveToDb={saveToDb}
            error={errors.x}
            type="number"
          />
          <TextField
            key={`${row.id}y`}
            name="y"
            label="Y-Koordinate"
            value={row.y}
            saveToDb={saveToDb}
            error={errors.y}
            type="number"
          />
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors.bemerkungen}
            multiLine
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
