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
import {
  sammlung as sammlungFragment,
  art as artFragment,
} from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'

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
  query SammlungQuery($id: Int!, $isFiltered: Boolean!) {
    sammlung(where: { id: { _eq: $id } }) {
      ...SammlungFields
    }
    rows: sammlung @include(if: $isFiltered) {
      ...SammlungFields
    }
  }
  ${sammlungFragment}
  ${artFragment}
`
const dataQuery = gql`
  query dataQuery {
    person {
      id
      name
      ort
    }
    herkunft {
      id
      nr
      lokalname
    }
    art {
      ...ArtFields
    }
  }
  ${sammlungFragment}
  ${artFragment}
`
const werteQuery = gql`
  query werteQuery {
    zaehleinheit_werte {
      id
      wert
      sort
    }
    masseinheit_werte {
      id
      wert
      sort
    }
  }
`

const Sammlung = () => {
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
  const { data: dataData, error: dataError, loading: dataLoading } = useQuery(
    dataQuery,
  )
  const {
    data: werteData,
    error: werteError,
    loading: werteLoading,
  } = useQuery(werteQuery)

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.sammlung : get(data, 'sammlung', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'sammlung' }),
  )()

  useEffect(() => setErrors({}), [row])

  let personWerte = get(dataData, 'person', [])
  personWerte = personWerte.map(el => ({
    value: el.id,
    label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
  }))
  personWerte = sortBy(personWerte, 'label')

  let herkunftWerte = get(dataData, 'herkunft', [])
  herkunftWerte = herkunftWerte.map(el => ({
    value: el.id,
    label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
  }))
  herkunftWerte = sortBy(herkunftWerte, 'label')

  let artWerte = get(dataData, 'art', [])
  artWerte = artWerte.map(el => ({
    value: el.id,
    label: get(el, 'art_ae_art.name') || '(kein Artname)',
  }))
  artWerte = sortBy(artWerte, 'label')

  let zaehleinheitWerte = get(werteData, 'zaehleinheit_werte', [])
  zaehleinheitWerte = sortBy(zaehleinheitWerte, ['sort', 'wert'])
  zaehleinheitWerte = zaehleinheitWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  let masseinheitWerte = get(werteData, 'masseinheit_werte', [])
  masseinheitWerte = sortBy(masseinheitWerte, ['sort', 'wert'])
  masseinheitWerte = masseinheitWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'sammlung', key: field, value })
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
              mutation update_sammlung(
                $id: Int!
              ) {
                update_sammlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...SammlungFields
                  }
                }
              }
              ${sammlungFragment}
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
        <FormTitle title="Sammlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || dataError || werteError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
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
          title="Sammlung"
          table="sammlung"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <TextField
            key={`${row.id}nr`}
            name="nr"
            label="Nr."
            value={row.nr}
            saveToDb={saveToDb}
            error={errors.nr}
            type="text"
          />
          <Select
            key={`${row.id}${row.art_id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            loading={dataLoading}
            saveToDb={saveToDb}
            error={errors.art_id}
          />
          <Select
            key={`${row.id}${row.herkunft_id}herkunft_id`}
            name="herkunft_id"
            value={row.herkunft_id}
            field="herkunft_id"
            label="Herkunft"
            options={herkunftWerte}
            loading={dataLoading}
            saveToDb={saveToDb}
            error={errors.herkunft_id}
          />
          <Select
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            loading={dataLoading}
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
          <TextField
            key={`${row.id}von_anzahl_individuen`}
            name="von_anzahl_individuen"
            label="von Anzahl Individuen"
            value={row.von_anzahl_individuen}
            saveToDb={saveToDb}
            error={errors.von_anzahl_individuen}
            type="number"
          />
          <Select
            key={`${row.id}${row.zaehleinheit}zaehleinheit`}
            name="zaehleinheit"
            value={row.zaehleinheit}
            field="zaehleinheit"
            label="Zähleinheit"
            options={zaehleinheitWerte}
            loading={werteLoading}
            saveToDb={saveToDb}
            error={errors.zaehleinheit}
          />
          <TextField
            key={`${row.id}menge`}
            name="menge"
            label="Menge"
            value={row.menge}
            saveToDb={saveToDb}
            error={errors.menge}
            type="number"
          />
          <Select
            key={`${row.id}${row.masseinheit}masseinheit`}
            name="masseinheit"
            value={row.masseinheit}
            field="masseinheit"
            label="Masseinheit"
            options={masseinheitWerte}
            loading={werteLoading}
            saveToDb={saveToDb}
            error={errors.masseinheit}
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

export default observer(Sammlung)
