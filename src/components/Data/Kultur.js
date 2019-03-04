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
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import filterNodes from '../../utils/filterNodes'
import {
  kultur as kulturFragment,
  art as artFragment,
} from '../../utils/fragments'

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
  query KulturQuery($id: Int!, $isFiltered: Boolean!) {
    kultur(where: { id: { _eq: $id } }) {
      ...KulturFields
    }
    rows: kultur @include(if: $isFiltered) {
      ...KulturFields
    }
    art {
      ...ArtFields
    }
    garten {
      id
      personBypersonId {
        id
        name
      }
    }
  }
  ${kulturFragment}
  ${artFragment}
`

const Kultur = () => {
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

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.kultur : get(data, 'kultur', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'kultur' }),
  )()

  useEffect(() => setErrors({}), [row])

  let artWerte = get(data, 'art', [])
  artWerte = artWerte.map(el => ({
    value: el.id,
    label: get(el, 'art_ae_art.name') || '(keine Art)',
  }))
  artWerte = sortBy(artWerte, 'label')

  let gartenWerte = get(data, 'garten', [])
  gartenWerte = gartenWerte.map(el => ({
    value: el.id,
    label: get(el, 'personBypersonId.name') || '(kein Name)',
  }))
  gartenWerte = sortBy(gartenWerte, 'label')

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'kultur', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_kultur(
                $id: Int!
                $art_id: Int
                $garten_id: Int
                $bemerkungen: String
              ) {
                update_kultur(
                  where: { id: { _eq: $id } }
                  _set: {
                    art_id: $art_id
                    garten_id: $garten_id
                    bemerkungen: $bemerkungen
                  }
                ) {
                  affected_rows
                  returning {
                    id
                    art_id
                    garten_id
                    bemerkungen
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              art_id: field === 'art_id' ? value : row.art_id,
              garten_id: field === 'garten_id' ? value : row.garten_id,
              bemerkungen: field === 'bemerkungen' ? value : row.bemerkungen,
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
        <FormTitle title="Kultur" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Kultur" />
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
          title="Kultur"
          table="kultur"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.art_id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            saveToDb={saveToDb}
            error={errors.art_id}
          />
          <Select
            key={`${row.id}${row.garten_id}garten_id`}
            name="garten_id"
            value={row.garten_id}
            field="garten_id"
            label="Garten"
            options={gartenWerte}
            saveToDb={saveToDb}
            error={errors.garten_id}
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

export default observer(Kultur)
