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
import memoizeOne from 'memoize-one'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import RadioButton from '../shared/RadioButton'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import queryFromTable from '../../utils/queryFromTable'
import {
  lieferung as lieferungFragment,
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
  query LieferungQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: lieferung_bool_exp!
  ) {
    lieferung(where: { id: { _eq: $id } }) {
      ...LieferungFields
    }
    rowsUnfiltered: lieferung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: lieferung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${lieferungFragment}
`
const sammlungQuery = gql`
  query sammlungQuery($filter: sammlung_bool_exp!) {
    sammlung(
      where: $filter
      order_by: [
        { datum: asc_nulls_first }
        { herkunft: { nr: asc_nulls_first } }
        { person: { name: asc_nulls_first } }
      ]
    ) {
      id
      art_id
      datum
      herkunft {
        id
        nr
      }
      person {
        id
        name
        ort
      }
    }
  }
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
const artQuery = gql`
  query artQuery {
    art(order_by: { art_ae_art: { name: asc } }) {
      ...ArtFields
    }
  }
  ${artFragment}
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
const dataQuery = gql`
  query dataQuery {
    herkunft(
      order_by: [{ nr: asc_nulls_first }, { lokalname: asc_nulls_first }]
    ) {
      id
      nr
      lokalname
    }
  }
`

const Lieferung = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const lieferungFilter = queryFromTable({ store, table: 'lieferung' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: lieferungFilter },
  })

  const { data: artData, error: artError, loading: artLoading } = useQuery(
    artQuery,
  )

  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery)

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.lieferung : get(data, 'lieferung', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  const sammlungFilter = row.art_id
    ? { art_id: { _eq: row.art_id } }
    : { id: { _is_null: false } }
  const {
    data: sammlungData,
    error: sammlungError,
    loading: sammlungLoading,
  } = useQuery(sammlungQuery, {
    variables: { filter: sammlungFilter },
  })

  // show only kulturen of row.art_id
  // beware: row.art_id can be null
  const kulturFilter = row.art_id
    ? { art_id: { _eq: row.art_id } }
    : { id: { _is_null: false } }
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery, {
    variables: { filter: kulturFilter },
  })

  const { data: dataData, error: dataError, loading: dataLoading } = useQuery(
    dataQuery,
  )

  useEffect(() => setErrors({}), [row])

  const kulturWerte = memoizeOne(() =>
    get(kulturData, 'kultur', []).map(el => {
      const name = get(el, 'garten.person.name') || '(kein Name)'
      const ort = get(el, 'garten.person.ort') || null
      const label = `${name}${ort ? ` (${ort})` : ''}`

      return {
        value: el.id,
        label,
      }
    }),
  )()

  const sammlungWerte = memoizeOne(() =>
    get(sammlungData, 'sammlung', []).map(el => {
      const datum = el.datum || '(kein Datum)'
      const nr = get(el, 'herkunft.nr') || '(keine Nr)'
      const person = get(el, 'person.name') || '(kein Name)'
      const label = `${datum}: Herkunft ${nr}; ${person}`

      return {
        value: el.id,
        label,
      }
    }),
  )()

  const personWerte = memoizeOne(() =>
    get(personData, 'person', []).map(el => ({
      value: el.id,
      label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
    })),
  )()

  const artWerte = memoizeOne(() =>
    get(artData, 'art', []).map(el => ({
      value: el.id,
      label: get(el, 'art_ae_art.name') || '(kein Artname)',
    })),
  )()

  const herkunftWerte = useMemo(
    () =>
      get(dataData, 'herkunft', []).map(el => ({
        value: el.id,
        label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
      })),
    [dataLoading],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value
      if (filter.show) {
        filter.setValue({ table: 'lieferung', key: field, value })
      } else {
        const type = types.lieferung[field]
        let valueToSet
        if (value === undefined || value === null) {
          valueToSet = null
        } else if (['number', 'boolean'].includes(type)) {
          valueToSet = value
        } else {
          valueToSet = `"${value}"`
        }
        try {
          await client.mutate({
            mutation: gql`
              mutation update_lieferung(
                $id: bigint!
              ) {
                update_lieferung(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...LieferungFields
                  }
                }
              }
              ${lieferungFragment}
            `,
            variables: {
              id: row.id,
            },
          })
        } catch (error) {
          console.log(error)
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
        <FormTitle title="Lieferung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow =
    error ||
    sammlungError ||
    kulturError ||
    dataError ||
    artError ||
    personError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Lieferung"
          table="lieferung"
          rowsLength={rowsUnfiltered.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            loading={artLoading}
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
            key={`${row.id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            loading={personLoading}
            saveToDb={saveToDb}
            error={errors.person_id}
          />
          <DateFieldWithPicker
            key={`${row.id}von_datum`}
            name="von_datum"
            label="von Datum"
            value={row.von_datum}
            saveToDb={saveToDb}
            error={errors.von_datum}
          />
          <Select
            key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
            name="von_sammlung_id"
            value={row.von_sammlung_id}
            field="von_sammlung_id"
            label="von Sammlung"
            options={sammlungWerte}
            loading={sammlungLoading}
            saveToDb={saveToDb}
            error={errors.von_sammlung_id}
          />
          <Select
            key={`${row.id}${row.von_kultur_id}von_kultur_id`}
            name="von_kultur_id"
            value={row.von_kultur_id}
            field="von_kultur_id"
            label="von Kultur"
            options={kulturWerte}
            loading={kulturLoading}
            saveToDb={saveToDb}
            error={errors.von_kultur_id}
          />
          <DateFieldWithPicker
            key={`${row.id}nach_datum`}
            name="nach_datum"
            label="nach Datum"
            value={row.nach_datum}
            saveToDb={saveToDb}
            error={errors.nach_datum}
          />
          <Select
            key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
            name="nach_kultur_id"
            value={row.nach_kultur_id}
            field="nach_kultur_id"
            label="nach Kultur"
            options={kulturWerte}
            loading={kulturLoading}
            saveToDb={saveToDb}
            error={errors.nach_kultur_id}
          />
          <RadioButton
            key={`${row.id}nach_ausgepflanzt`}
            label="Ausgepflanzt"
            name="nach_ausgepflanzt"
            value={row.nach_ausgepflanzt}
            saveToDb={saveToDb}
            error={errors.nach_ausgepflanzt}
          />
          <RadioButton
            key={`${row.id}ausgefuehrt`}
            label="Ausgeführt"
            name="ausgefuehrt"
            value={row.ausgefuehrt}
            saveToDb={saveToDb}
            error={errors.ausgefuehrt}
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

export default observer(Lieferung)
