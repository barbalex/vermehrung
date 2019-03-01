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
  query GartenQuery($id: Int!, $showFilter: Boolean!) {
    garten(where: { id: { _eq: $id } }) {
      id
      person_id
      x
      y
      bemerkungen
    }
    rows: garten @include(if: $showFilter) {
      id
      person_id
      x
      y
      bemerkungen
    }
    person {
      id
      name
      ort
    }
  }
`

const Garten = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const showFilter = filter.show
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id, showFilter },
  })

  const [errors, setErrors] = useState({})

  let row
  let rows = []
  let rowsFiltered = []
  if (showFilter) {
    row = filter.garten
    // get filter values length
    rows = get(data, 'rows', [])
    rowsFiltered = memoizeOne(() =>
      filterNodes({ rows, filter, table: 'garten' }),
    )()
  } else {
    row = get(data, 'garten', [{}])[0]
  }

  useEffect(() => setErrors({}), [row])

  let personWerte = get(data, 'person', [])
  personWerte = personWerte.map(el => ({
    value: el.id,
    label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
  }))
  personWerte = sortBy(personWerte, 'label')

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'garten', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_garten(
                $id: Int!
                $person_id: Int
                $x: Int
                $y: Int
                $bemerkungen: String
              ) {
                update_garten(
                  where: { id: { _eq: $id } }
                  _set: {
                    person_id: $person_id
                    x: $x
                    y: $y
                    bemerkungen: $bemerkungen
                  }
                ) {
                  affected_rows
                  returning {
                    id
                    person_id
                    x
                    y
                    bemerkungen
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              person_id: field === 'person_id' ? value : row.person_id,
              x: field === 'x' ? value : row.x,
              y: field === 'y' ? value : row.y,
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
        <FormTitle title="Garten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Garten" />
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
          title="Garten"
          table="garten"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            saveToDb={saveToDb}
            error={errors.person_id}
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

export default observer(Garten)
