import React, { useContext, useState, useEffect, useCallback } from 'react'
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
import TextFieldNonUpdatable from '../shared/TextFieldNonUpdatable'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import RadioButton from '../shared/RadioButton'
import FormTitle from '../shared/FormTitle'
import FilterTitle from '../shared/FilterTitle'
import ErrorBoundary from '../ErrorBoundary'
import queryFromTable from '../../utils/queryFromTable'
import {
  lieferung as lieferungFragment,
  art as artFragment,
} from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
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
const TitleRow = styled.div`
  background-color: rgba(74, 20, 140, 0.05);
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  margin-top: ${props => (props['data-first'] ? '-10px' : 'unset')};
  padding: 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
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
      herkunft_id
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
      herkunft_id
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
const herkunftQuery = gql`
  query herkunftQuery($id: bigint!) {
    herkunft(where: { id: { _eq: $id } }) {
      id
      nr
      lokalname
    }
  }
`

const Lieferung = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
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

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.lieferung
  } else {
    row = get(data, 'lieferung', [{}])[0]
  }

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

  // need to query herkunft separate from regular query
  // because herkunft was not updated when using value from that ??!!
  const { data: herkunftData, error: herkunftError } = useQuery(herkunftQuery, {
    variables: { id: row.herkunft_id || 0 },
  })
  const herkunft = get(herkunftData, 'herkunft', [])[0]
  const herkunftValue = herkunft
    ? `${herkunft.nr || '(keine Nr)'}: ${herkunft.lokalname ||
        'kein Lokalname'}`
    : ''

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

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value
      const type = types.lieferung[field]
      if (showFilter) {
        let valueToSet = value
        if (value === '') {
          valueToSet = null
        } else if (['number'].includes(type)) {
          valueToSet = +value
        }
        filter.setValue({ table: 'lieferung', key: field, value: valueToSet })
      } else {
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
        // if field was 'von_sammlung_id' or 'von_kultur_id'
        // need to set herkunft_id
        if (['von_sammlung_id', 'von_kultur_id'].includes(field)) {
          if (field === 'von_sammlung_id') {
            let herkunft_id = null
            if (valueToSet) {
              const res = await client.query({
                query: gql`
                  query getSammlung($id: bigint!) {
                    sammlung(where: { id: { _eq: $id } }) {
                      id
                      herkunft_id
                    }
                  }
                `,
                variables: {
                  id: valueToSet,
                },
              })
              herkunft_id = get(res, 'data.sammlung[0].herkunft_id') || null
            }
            await client.mutate({
              mutation: gql`
                mutation update_lieferung(
                  $id: bigint!
                ) {
                  update_lieferung(
                    where: { id: { _eq: $id } }
                    _set: {
                      herkunft_id: ${herkunft_id}
                      von_kultur_id: null
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
          }
          if (field === 'von_kultur_id') {
            let herkunft_id = null
            if (valueToSet) {
              const res = await client.query({
                query: gql`
                  query getKultur($id: bigint!) {
                    kultur(where: { id: { _eq: $id } }) {
                      id
                      herkunft_id
                    }
                  }
                `,
                variables: {
                  id: valueToSet,
                },
              })
              herkunft_id = get(res, 'data.kultur[0].herkunft_id') || null
            }
            await client.mutate({
              mutation: gql`
                mutation update_lieferung(
                  $id: bigint!
                ) {
                  update_lieferung(
                    where: { id: { _eq: $id } }
                    _set: {
                      herkunft_id: ${herkunft_id}
                      von_sammlung_id: null
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
          }
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
    artError ||
    herkunftError ||
    personError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
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
            title="Lieferung"
            table="lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <FormTitle
            title="Lieferung"
            table="lieferung"
            rowsLength={totalNr}
            rowsFilteredLength={filteredNr}
            filter={showFilter}
          />
        )}
        <FieldsContainer>
          <TitleRow data-first>
            <Title>was</Title>
          </TitleRow>
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
            key={`${row.id}von_anzahl_individuen`}
            name="von_anzahl_individuen"
            label="von Anzahl Individuen"
            value={row.von_anzahl_individuen}
            saveToDb={saveToDb}
            error={errors.von_anzahl_individuen}
            type="number"
          />
          <TextField
            key={`${row.id}anzahl_auspflanzbereit`}
            name="anzahl_auspflanzbereit"
            label="Anzahl auspflanzbereit"
            value={row.anzahl_auspflanzbereit}
            saveToDb={saveToDb}
            error={errors.anzahl_auspflanzbereit}
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
          <TitleRow>
            <Title>von</Title>
          </TitleRow>
          <DateFieldWithPicker
            key={`${row.id}von_datum`}
            name="von_datum"
            label="Datum"
            value={row.von_datum}
            saveToDb={saveToDb}
            error={errors.von_datum}
          />
          <Select
            key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
            name="von_sammlung_id"
            value={row.von_sammlung_id}
            field="von_sammlung_id"
            label="Sammlung"
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
            label="Kultur"
            options={kulturWerte}
            loading={kulturLoading}
            saveToDb={saveToDb}
            error={errors.von_kultur_id}
          />
          <TextFieldNonUpdatable
            key={`${row.id}herkunft_id`}
            name="herkunft_id"
            label="Herkunft"
            value={herkunftValue}
            saveToDb={saveToDb}
            error={errors.herkunft_id}
            message="Ändern Sie Sammlung oder Kultur, um die Herkunft zu ändern"
          />
          <TitleRow>
            <Title>nach</Title>
          </TitleRow>
          <DateFieldWithPicker
            key={`${row.id}nach_datum`}
            name="nach_datum"
            label="Datum"
            value={row.nach_datum}
            saveToDb={saveToDb}
            error={errors.nach_datum}
          />
          <Select
            key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
            name="nach_kultur_id"
            value={row.nach_kultur_id}
            field="nach_kultur_id"
            label="Kultur"
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
          <TitleRow>
            <Title>wer</Title>
          </TitleRow>
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
          {!showFilter && <Files parentId={row.id} parent="lieferung" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferung)
