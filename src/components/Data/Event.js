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
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
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
  query EventQuery($id: Int!, $showFilter: Boolean!) {
    kultur_event(where: { id: { _eq: $id } }) {
      id
      kultur_id
      datum
      event
      kulturBykulturId {
        id
        art_id
      }
    }
    rows: kultur_event @include(if: $showFilter) {
      id
      kultur_id
      datum
      event
      kulturBykulturId {
        id
        art_id
      }
    }
    kultur {
      id
      art_id
      artByartId {
        id
        art_ae_art {
          id
          name
        }
      }
      gartenBygartenId {
        id
        personBypersonId {
          id
          name
          ort
        }
      }
    }
  }
`

const Event = () => {
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
    row = filter.event
    // get filter values length
    rows = get(data, 'rows', [])
    rowsFiltered = memoizeOne(() =>
      filterNodes({ rows, filter, table: 'event' }),
    )()
  } else {
    row = get(data, 'kultur_event', [{}])[0]
  }

  useEffect(() => setErrors({}), [row])

  let kulturWerte = get(data, 'kultur', []).filter(s => {
    // only show kulturen of same art
    const s_art = get(s, 'kulturBykulturId.art_id')
    if (row.art_id && s_art) {
      return s_art === row.art_id
    }
    return true
  })
  kulturWerte = sortBy(kulturWerte, s => [
    get(s, 'gartenBygartenId.personBypersonId.name'),
    get(s, 'gartenBygartenId.personBypersonId.ort'),
  ])
  kulturWerte = kulturWerte.map(el => {
    const personName =
      get(el, 'gartenBygartenId.personBypersonId.name') || '(kein Name)'
    const personOrt = get(el, 'gartenBygartenId.personBypersonId.ort') || null
    const artName = get(el, 'artByartId.art_ae_art.name') || '(keine Art)'
    const label = `${artName}; ${personName}${
      personOrt ? ` (${personOrt})` : ''
    }`

    return {
      value: el.id,
      label,
    }
  })

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'event', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_kultur_event(
                $id: Int!
                $kultur_id: Int
                $datum: date
                $event: String
              ) {
                update_kultur_event(
                  where: { id: { _eq: $id } }
                  _set: { kultur_id: $kultur_id, datum: $datum, event: $event }
                ) {
                  affected_rows
                  returning {
                    id
                    kultur_id
                    datum
                    event
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              kultur_id: field === 'kultur_id' ? value : row.kultur_id,
              datum: field === 'datum' ? value : row.datum,
              event: field === 'event' ? value : row.event,
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
        <FormTitle title="Event" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Event" />
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
          title="Event"
          table="event"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.kultur_id}kultur_id`}
            name="kultur_id"
            value={row.kultur_id}
            field="kultur_id"
            label="Kultur"
            options={kulturWerte}
            saveToDb={saveToDb}
            error={errors.kultur_id}
          />
          <DateFieldWithPicker
            key={`${row.id}datum`}
            name="datum"
            label="Datum"
            value={row.datum}
            saveToDb={saveToDb}
            error={errors.datum}
          />
          <TextField
            key={`${row.id}event`}
            name="event"
            label="Event"
            value={row.event}
            saveToDb={saveToDb}
            error={errors.event}
            multiline
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Event)
