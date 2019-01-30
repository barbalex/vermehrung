import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import ifIsNumericAsNumber from '../../utils/ifIsNumericAsNumber'

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
  query EventQuery($id: Int!) {
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
    kultur {
      id
      art_id
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
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id },
  })

  const [errors, setErrors] = useState({})

  const row = get(data, 'kultur_event', [{}])[0]

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
    const name =
      get(el, 'gartenBygartenId.personBypersonId.name') || '(kein Name)'
    const ort = get(el, 'gartenBygartenId.personBypersonId.ort') || null
    const label = `${name}${ort ? ` (${ort})` : ''}`

    return {
      value: el.id,
      label,
    }
  })

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value) || null
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
      <Container>
        <FormTitle title="Event" />
        <FieldsContainer>
          <Select
            key={`${row.id}kultur_id`}
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
