import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import queryFromTable from '../../utils/queryFromTable'
import { art as artFragment } from '../../utils/fragments'

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
  query ArtQuery($id: Int!, $filter: art_bool_exp!, $isFiltered: Boolean!) {
    art(where: { id: { _eq: $id } }) {
      ...ArtFields
    }
    rowsUnfiltered: art @include(if: $isFiltered) {
      id
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${artFragment}
`

const aeArtQuery = gql`
  query aeArtQuery($id: Int!) {
    ae_art(
      where: {
        _or: [
          { _not: { ae_art_art: { id: { _is_null: false } } } }
          { ae_art_art: { id: { _eq: $id } } }
        ]
      }
      order_by: { name: asc_nulls_first }
    ) {
      id
      name
    }
  }
`

const Art = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter, tree } = store
  const { show: showFilter, isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()
  const { activeNodeArray, refetch } = tree

  const artId = last(activeNodeArray.filter(e => !isNaN(e)))
  const artFilter = queryFromTable({ store, table: 'art' })
  const { data, error, loading } = useQuery(query, {
    variables: { id: artId, filter: artFilter, isFiltered },
  })
  const {
    data: aeArtData,
    error: aeArtError,
    loading: aeArtLoading,
  } = useQuery(aeArtQuery, { variables: { id: artId } })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.art : get(data, 'art', [{}])[0]
  const rows = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  useEffect(() => setErrors({}), [row])

  const artWerte = memoizeOne(() =>
    get(aeArtData, 'ae_art', []).map(el => ({
      value: el.id,
      label: el.name || '(kein Artname)',
    })),
  )()

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
                    ...ArtFields
                  }
                }
              }
              ${artFragment}
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

  const errorToShow = error || aeArtError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          errorToShow.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

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
            loading={aeArtLoading}
            saveToDb={saveToDb}
            error={errors.ae_id}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Art)
