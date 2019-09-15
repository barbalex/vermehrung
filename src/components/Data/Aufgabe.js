import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import FormTitle from '../shared/FormTitle'
import FilterTitle from '../shared/FilterTitle'
import { aufgabe as aufgabeFragment } from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'

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
  query AufgabeQuery(
    $id: bigint!
    $filter: aufgabe_bool_exp!
    $isFiltered: Boolean!
  ) {
    aufgabe(where: { id: { _eq: $id } }) {
      ...AufgabeFields
      kultur {
        id
        art_id
      }
    }
    rowsUnfiltered: aufgabe @include(if: $isFiltered) {
      id
    }
    rowsFiltered: aufgabe(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${aufgabeFragment}
`
// garten.person.name
const kulturQuery = gql`
  query kulturQuery($filter: kultur_bool_exp!) {
    kultur(
      where: $filter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
        { art: { art_ae_art: { name: asc_nulls_first } } }
      ]
    ) {
      id
      art_id
      art {
        id
        art_ae_art {
          id
          name
        }
      }
      garten {
        id
        person {
          id
          name
          ort
        }
      }
    }
  }
  ${aufgabeFragment}
`

const Aufgabe = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const aufgabeFilter = queryFromTable({ store, table: 'aufgabe' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: aufgabeFilter },
  })

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.aufgabe
  } else {
    row = get(data, 'aufgabe', [{}])[0]
  }

  // only show kulturen of same art
  const artId = get(row, 'kultur.art_id')
  const kulturFilter = artId
    ? { art_id: { _eq: artId } }
    : { id: { _is_null: true } }
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery, {
    variables: { filter: kulturFilter },
  })

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const kulturWerte = memoizeOne(() =>
    get(kulturData, 'kultur', []).map(el => {
      const personName = get(el, 'garten.person.name') || '(kein Name)'
      const personOrt = get(el, 'garten.person.ort') || null
      const artName = get(el, 'art.art_ae_art.name') || '(keine Art)'
      const label = `${personName}${
        personOrt ? ` (${personOrt})` : ''
      }: ${artName}`

      return {
        value: el.id,
        label,
      }
    }),
  )()

  const saveToDb = useCallback(
    async aufgabe => {
      const field = aufgabe.target.name
      let value = aufgabe.target.value || null
      if (aufgabe.target.value === false) value = false
      if (aufgabe.target.value === 0) value = 0
      const type = types.aufgabe[field]
      if (showFilter) {
        let valueToSet = value
        if (value === '') {
          valueToSet = null
        } else if (['number'].includes(type)) {
          valueToSet = +value
        }
        filter.setValue({ table: 'aufgabe', key: field, value: valueToSet })
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
              mutation update_aufgabe($id: bigint!) {
                update_aufgabe(
                  where: { id: { _eq: $id } }
                  _set: { 
                    ${field}: ${valueToSet} }
                ) {
                  affected_rows
                  returning {
                    ...AufgabeFields
                  }
                }
              }
              ${aufgabeFragment}
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
    [row.id],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Aufgabe" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Aufgabe" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (kulturError) {
    return (
      <Container>
        <FormTitle title="Aufgabe" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${kulturError.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Aufgabe"
            table="aufgabe"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <FormTitle
            title="Aufgabe"
            table="aufgabe"
            rowsLength={totalNr}
            rowsFilteredLength={filteredNr}
            filter={showFilter}
          />
        )}
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

export default observer(Aufgabe)
