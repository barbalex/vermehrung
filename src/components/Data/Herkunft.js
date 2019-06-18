import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'

import storeContext from '../../storeContext'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import { herkunft as herkunftFragment } from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'
import Files from './Files'
import Coordinates from '../shared/Coordinates'

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

const Herkunft = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: herkunftFilter, refetch },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.herkunft : get(data, 'herkunft', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'herkunft', key: field, value })
      } else {
        try {
          const type = types.lieferung[field]
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

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Herkunft"
          table="herkunft"
          rowsLength={rowsUnfiltered.length}
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
          <Files parentId={row.id} parent="herkunft" />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
