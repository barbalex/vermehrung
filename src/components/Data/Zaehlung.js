import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import { zaehlung as zaehlungFragment } from '../../utils/fragments'
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
  query ZaehlungQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: zaehlung_bool_exp!
  ) {
    zaehlung(where: { id: { _eq: $id } }) {
      ...ZaehlungFields
      kultur {
        id
        art_id
      }
    }
    rowsUnfiltered: zaehlung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: zaehlung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${zaehlungFragment}
`
const kulturQuery = gql`
  query kulturQuery($filter: kultur_bool_exp!) {
    kultur(
      where: $filter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
      ]
    ) {
      id
      art_id
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
`

const Zaehlung = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))

  const isFiltered = runIsFiltered()
  const zaehlungFilter = queryFromTable({ store, table: 'zaehlung' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: zaehlungFilter },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.zaehlung : get(data, 'zaehlung', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  const artId = get(row, 'kultur.art_id')
  const kulturFilter = artId
    ? { art_id: { _eq: artId } }
    : { id: { _is_null: false } }
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery, {
    variables: {
      filter: kulturFilter,
    },
  })

  useEffect(() => setErrors({}), [row])

  const kulturWerte = useMemo(
    () =>
      get(kulturData, 'kultur', []).map(el => {
        const name = get(el, 'garten.person.name') || '(kein Name)'
        const ort = get(el, 'garten.person.ort') || null
        const label = `${name}${ort ? ` (${ort})` : ''}`

        return {
          value: el.id,
          label,
        }
      }),
    [kulturLoading],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'zaehlung', key: field, value })
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
              mutation update_zaehlung(
                $id: bigint!
              ) {
                update_zaehlung(
                  where: { id: { _eq: $id } }
                  _set: {
                  ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...ZaehlungFields
                  }
                }
              }
              ${zaehlungFragment}
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
        <FormTitle title="Zaehlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || kulturError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
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
          title="Zaehlung"
          table="zaehlung"
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
            key={`${row.id}anzahl_pflanzen`}
            name="anzahl_pflanzen"
            label="Anzahl Pflanzen"
            value={row.anzahl_pflanzen}
            saveToDb={saveToDb}
            error={errors.anzahl_pflanzen}
            type="number"
          />
          <TextField
            key={`${row.id}anz_mutter_pflanzen`}
            name="anz_mutter_pflanzen"
            label="Anzahl Mutter-Pflanzen"
            value={row.anz_mutter_pflanzen}
            saveToDb={saveToDb}
            error={errors.anz_mutter_pflanzen}
            type="number"
          />
          <TextField
            key={`${row.id}anz_nicht_auspflanzbereit`}
            name="anz_nicht_auspflanzbereit"
            label="Anzahl nicht auspflanz-bereit"
            value={row.anz_nicht_auspflanzbereit}
            saveToDb={saveToDb}
            error={errors.anz_nicht_auspflanzbereit}
            type="number"
          />
          <TextField
            key={`${row.id}anz_auspflanzbereit`}
            name="anz_auspflanzbereit"
            label="Anzahl auspflanz-bereit"
            value={row.anz_auspflanzbereit}
            saveToDb={saveToDb}
            error={errors.anz_auspflanzbereit}
            type="number"
          />
          <TextField
            key={`${row.id}anz_bluehend`}
            name="anz_bluehend"
            label="Anzahl blühend"
            value={row.anz_bluehend}
            saveToDb={saveToDb}
            error={errors.anz_bluehend}
            type="number"
          />
          <TextField
            key={`${row.id}bluehdatum`}
            name="bluehdatum"
            label="Blüh-Datum"
            value={row.bluehdatum}
            saveToDb={saveToDb}
            error={errors.bluehdatum}
            type="text"
          />
          <TextField
            key={`${row.id}instruktion`}
            name="instruktion"
            label="Instruktion"
            value={row.instruktion}
            saveToDb={saveToDb}
            error={errors.instruktion}
            multiline
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

export default observer(Zaehlung)
