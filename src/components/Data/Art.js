import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import filterNodes from '../../utils/filterNodes'

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
  query ArtQuery($id: Int!, $showFilter: Boolean!) {
    art(where: { id: { _eq: $id } }) {
      id
      ae_id
    }
    rows: art @include(if: $showFilter) {
      id
      ae_id
    }
    ae_art {
      id
      name
    }
  }
`

const Art = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { activeNodeArray, refetch } = store.tree
  const artId = last(activeNodeArray.filter(e => !isNaN(e)))
  const showFilter = filter.show

  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id: artId, showFilter },
  })

  const [errors, setErrors] = useState({})

  let row
  let rows = []
  let rowsFiltered = []
  if (showFilter) {
    row = filter.art
    // get filter values length
    rows = get(data, 'rows', [])
    rowsFiltered = memoizeOne(() =>
      filterNodes({ rows, filter, table: 'art' }),
    )()
  } else {
    row = get(data, 'art', [{}])[0]
  }

  useEffect(() => setErrors({}), [row])

  let artWerte = get(data, 'ae_art', [])
  artWerte = artWerte.map(el => ({
    value: el.id,
    label: el.name || '(kein Artname)',
  }))
  artWerte = sortBy(artWerte, 'label')

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'art', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_art($id: Int!, $ae_id: uuid) {
                update_art(
                  where: { id: { _eq: $id } }
                  _set: { ae_id: $ae_id }
                ) {
                  affected_rows
                  returning {
                    id
                    ae_id
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              ae_id: value,
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
        <FormTitle title="Art" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Art"
          table="art"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.ae_id}ae_id`}
            name="ae_id"
            value={row.ae_id}
            field="ae_id"
            label="Art"
            options={artWerte}
            saveToDb={saveToDb}
            error={errors.ae_id}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Art)
