import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import Checkbox2States from '../shared/Checkbox2States'
import FormTitle from '../shared/FormTitle'
import FilterTitle from '../shared/FilterTitle'
import {
  aufgabe as aufgabeFragment,
  teilkultur as teilkulturFragment,
} from '../../utils/fragments'
import ifIsNumericAsNumber from '../../utils/ifIsNumericAsNumber'
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
  query kulturQuery {
    kultur(
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
        name
        person {
          id
          name
          ort
        }
      }
      teilkulturs(order_by: { name: asc_nulls_last }) {
        ...TeilkulturFields
      }
    }
  }
  ${aufgabeFragment}
  ${teilkulturFragment}
`
const personQuery = gql`
  query personQuery {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      name
      ort
    }
  }
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

  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery)
  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery)

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const kulturs = get(kulturData, 'kultur', []) || []
  const kulturWerte = useMemo(
    () =>
      kulturs.map(el => {
        const personName = get(el, 'garten.person.name') || '(kein Name)'
        const personOrt = get(el, 'garten.person.ort') || null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const gartenName = el.garten.name || personLabel
        const artName = get(el, 'art.art_ae_art.name') || '(keine Art)'
        const label = `${gartenName}: ${artName}`

        return {
          value: el.id,
          label,
        }
      }),
    [kulturs],
  )
  const teilkulturWerte = useMemo(() => {
    const kultur = kulturs.find(k => k.id === row.kultur_id)
    const tks = get(kultur, 'teilkulturs', []) || []
    return tks.map(t => ({
      value: t.id,
      label: t.name || '(kein Name)',
    }))
  }, [kulturs, row.id])

  const personWerte = useMemo(
    () =>
      get(personData, 'person', []).map(el => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personData],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.aufgabe[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'aufgabe', key: field, value })
      } else {
        try {
          let valueToSet
          if (value === null) {
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
    [row],
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
  if (personError) {
    return (
      <Container>
        <FormTitle title="Aufgabe" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${personError.message}`}</FieldsContainer>
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
          <Select
            key={`${row.id}${row.teilkultur_id}teilkultur_id`}
            name="teilkultur_id"
            value={row.teilkultur_id}
            field="teilkultur_id"
            label="Teilkultur"
            options={teilkulturWerte}
            loading={kulturLoading}
            saveToDb={saveToDb}
            error={errors.teilkultur_id}
          />
          <TextField
            key={`${row.id}aufgabe`}
            name="aufgabe"
            label="Aufgabe"
            value={row.aufgabe}
            saveToDb={saveToDb}
            error={errors.aufgabe}
            multiline
          />
          <Select
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Wer"
            options={personWerte}
            loading={personLoading}
            saveToDb={saveToDb}
            error={errors.person_id}
          />
          <DateFieldWithPicker
            key={`${row.id}datum`}
            name="datum"
            label="Datum"
            value={row.datum}
            saveToDb={saveToDb}
            error={errors.datum}
          />
          <Checkbox2States
            key={`${row.id}geplant`}
            label="geplant"
            name="geplant"
            value={row.geplant}
            saveToDb={saveToDb}
            error={errors.geplant}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Aufgabe)
