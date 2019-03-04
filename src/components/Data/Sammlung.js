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
    art {
      ...ArtFields
    }
  }
  ${sammlungFragment}
  ${artFragment}
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

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.sammlung : get(data, 'sammlung', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'sammlung' }),
  )()

  useEffect(() => setErrors({}), [row])

  let personWerte = get(data, 'person', [])
  personWerte = personWerte.map(el => ({
    value: el.id,
    label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
  }))
  personWerte = sortBy(personWerte, 'label')

  let herkunftWerte = get(data, 'herkunft', [])
  herkunftWerte = herkunftWerte.map(el => ({
    value: el.id,
    label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
  }))
  herkunftWerte = sortBy(herkunftWerte, 'label')

  let artWerte = get(data, 'art', [])
  artWerte = artWerte.map(el => ({
    value: el.id,
    label: get(el, 'art_ae_art.name') || '(kein Artname)',
  }))
  artWerte = sortBy(artWerte, 'label')

  let zaehleinheitWerte = get(data, 'zaehleinheit_werte', [])
  zaehleinheitWerte = sortBy(zaehleinheitWerte, ['sort', 'wert'])
  zaehleinheitWerte = zaehleinheitWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  let masseinheitWerte = get(data, 'masseinheit_werte', [])
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
          await client.mutate({
            mutation: gql`
              mutation update_sammlung(
                $id: Int!
                $nr: String
                $art_id: Int
                $person_id: Int
                $herkunft_id: Int
                $datum: date
                $von_anzahl_individuen: Int
                $zaehleinheit: Int
                $menge: Int
                $masseinheit: Int
                $bemerkungen: String
              ) {
                update_sammlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    nr: $nr
                    art_id: $art_id
                    person_id: $person_id
                    herkunft_id: $herkunft_id
                    datum: $datum
                    von_anzahl_individuen: $von_anzahl_individuen
                    zaehleinheit: $zaehleinheit
                    menge: $menge
                    masseinheit: $masseinheit
                    bemerkungen: $bemerkungen
                  }
                ) {
                  affected_rows
                  returning {
                    id
                    nr
                    art_id
                    person_id
                    herkunft_id
                    datum
                    von_anzahl_individuen
                    zaehleinheit
                    menge
                    masseinheit
                    bemerkungen
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              nr: field === 'nr' ? value : row.nr,
              art_id: field === 'art_id' ? value : row.art_id,
              person_id: field === 'person_id' ? value : row.person_id,
              herkunft_id: field === 'herkunft_id' ? value : row.herkunft_id,
              datum: field === 'datum' ? value : row.datum,
              von_anzahl_individuen:
                field === 'von_anzahl_individuen'
                  ? value
                  : row.von_anzahl_individuen,
              zaehleinheit: field === 'zaehleinheit' ? value : row.zaehleinheit,
              menge: field === 'menge' ? value : row.menge,
              masseinheit: field === 'masseinheit' ? value : row.masseinheit,
              bemerkungen: field === 'bemerkungen' ? value : row.bemerkungen,
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

  if (error) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
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
