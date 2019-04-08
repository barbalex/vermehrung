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
import { kulturEvent as kulturEventFragment } from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'

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
  query EventQuery(
    $id: Int!
    $filter: kultur_event_bool_exp!
    $isFiltered: Boolean!
  ) {
    kultur_event(where: { id: { _eq: $id } }) {
      ...KulturEventFields
      kulturBykulturId {
        id
        art_id
      }
    }
    rowsUnfiltered: kultur_event @include(if: $isFiltered) {
      id
    }
    rowsFiltered: kultur_event(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${kulturEventFragment}
`
const kulturQuery = gql`
  query kulturQuery {
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
  ${kulturEventFragment}
`

const Event = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const eventFilter = queryFromTable({ store, table: 'event' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: eventFilter },
  })

  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery)

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.event : get(data, 'kultur_event', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  useEffect(() => setErrors({}), [row])

  let kulturWerte = get(kulturData, 'kultur', []).filter(s => {
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
              mutation update_kultur_event($id: Int!) {
                update_kultur_event(
                  where: { id: { _eq: $id } }
                  _set: { 
                    ${field}: ${valueToSet} }
                ) {
                  affected_rows
                  returning {
                    ...KulturEventFields
                  }
                }
              }
              ${kulturEventFragment}
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
  if (kulturError) {
    return (
      <Container>
        <FormTitle title="Event" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          kulturError.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Event"
          table="event"
          rowsLength={rowsUnfiltered.length}
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
            loading={kulturLoading}
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
