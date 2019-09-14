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
import FormTitle from '../shared/FormTitle'
import FilterTitle from '../shared/FilterTitle'
import {
  sammlung as sammlungFragment,
  art as artFragment,
} from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'
import Files from './Files'

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
  query SammlungQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: sammlung_bool_exp!
  ) {
    sammlung(where: { id: { _eq: $id } }) {
      ...SammlungFields
    }
    rowsUnfiltered: sammlung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: sammlung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${sammlungFragment}
`
const dataQuery = gql`
  query dataQuery {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      name
      ort
    }
    herkunft(
      order_by: [{ nr: asc_nulls_first }, { lokalname: asc_nulls_first }]
    ) {
      id
      nr
      lokalname
    }
    art(order_by: { art_ae_art: { name: asc } }) {
      ...ArtFields
    }
  }
  ${sammlungFragment}
  ${artFragment}
`

const Sammlung = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const sammlungFilter = queryFromTable({ store, table: 'sammlung' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: sammlungFilter },
  })
  const { data: dataData, error: dataError, loading: dataLoading } = useQuery(
    dataQuery,
  )

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.sammlung
  } else {
    row = get(data, 'sammlung', [{}])[0]
  }

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const personWerte = useMemo(
    () =>
      get(dataData, 'person', []).map(el => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [dataLoading],
  )

  const herkunftWerte = useMemo(
    () =>
      get(dataData, 'herkunft', []).map(el => ({
        value: el.id,
        label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
      })),
    [dataLoading],
  )

  const artWerte = useMemo(
    () =>
      get(dataData, 'art', []).map(el => ({
        value: el.id,
        label: get(el, 'art_ae_art.name') || '(kein Artname)',
      })),
    [dataLoading],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = event.target.value || null
      if (event.target.value === false) value = false
      if (event.target.value === 0) value = 0
      const type = types.sammlung[field]
      if (showFilter) {
        let valueToSet = value
        if (value === '') {
          valueToSet = null
        } else if (['number'].includes(type)) {
          valueToSet = +value
        }
        filter.setValue({ table: 'sammlung', key: field, value: valueToSet })
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
              mutation update_sammlung(
                $id: bigint!
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
    [row.id],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || dataError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <FormTitle
            title="Sammlung"
            table="sammlung"
            rowsLength={totalNr}
            rowsFilteredLength={filteredNr}
            filter={showFilter}
          />
        )}
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
          <TextField
            key={`${row.id}anzahl_pflanzen`}
            name="anzahl_pflanzen"
            label="Anzahl Pflanzen"
            value={row.anzahl_pflanzen}
            saveToDb={saveToDb}
            error={errors.anzahl_pflanzen}
            type="number"
          />
          <TextField
            key={`${row.id}menge_beschrieben`}
            name="menge_beschrieben"
            label="Menge textlich beschrieben"
            value={row.menge_beschrieben}
            saveToDb={saveToDb}
            error={errors.menge_beschrieben}
            type="text"
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
          {!showFilter && <Files parentId={row.id} parent="sammlung" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Sammlung)
