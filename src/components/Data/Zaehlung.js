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
import { zaehlung as zaehlungFragment } from '../../utils/fragments'

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
  query ZaehlungQuery($id: Int!, $isFiltered: Boolean!) {
    zaehlung(where: { id: { _eq: $id } }) {
      ...ZaehlungFields
      kulturBykulturId {
        id
        art_id
      }
    }
    rows: zaehlung @include(if: $isFiltered) {
      ...ZaehlungFields
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
  ${zaehlungFragment}
`

const Zaehlung = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id, isFiltered: isFiltered() },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.zaehlung : get(data, 'zaehlung', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'zaehlung' }),
  )()

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
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'zaehlung', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_zaehlung(
                $id: Int!
                $kultur_id: Int
                $datum: date
                $anzahl_pflanzen: Int
                $anz_mutter_pflanzen: Int
                $anz_nicht_auspflanzbereit: Int
                $anz_auspflanzbereit: Int
                $anz_bluehend: Int
                $bluehdatum: String
                $instruktion: String
                $bemerkungen: String
              ) {
                update_zaehlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    kultur_id: $kultur_id
                    datum: $datum
                    anzahl_pflanzen: $anzahl_pflanzen
                    anz_mutter_pflanzen: $anz_mutter_pflanzen
                    anz_nicht_auspflanzbereit: $anz_nicht_auspflanzbereit
                    anz_auspflanzbereit: $anz_auspflanzbereit
                    anz_bluehend: $anz_bluehend
                    bluehdatum: $bluehdatum
                    instruktion: $instruktion
                    bemerkungen: $bemerkungen
                  }
                ) {
                  affected_rows
                  returning {
                    id
                    kultur_id
                    datum
                    anzahl_pflanzen
                    anz_mutter_pflanzen
                    anz_nicht_auspflanzbereit
                    anz_auspflanzbereit
                    anz_bluehend
                    bluehdatum
                    instruktion
                    bemerkungen
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              kultur_id: field === 'kultur_id' ? value : row.kultur_id,
              datum: field === 'datum' ? value : row.datum,
              anzahl_pflanzen:
                field === 'anzahl_pflanzen' ? value : row.anzahl_pflanzen,
              anz_mutter_pflanzen:
                field === 'anz_mutter_pflanzen'
                  ? value
                  : row.anz_mutter_pflanzen,
              anz_nicht_auspflanzbereit:
                field === 'anz_nicht_auspflanzbereit'
                  ? value
                  : row.anz_nicht_auspflanzbereit,
              anz_auspflanzbereit:
                field === 'anz_auspflanzbereit'
                  ? value
                  : row.anz_auspflanzbereit,
              anz_bluehend: field === 'anz_bluehend' ? value : row.anz_bluehend,
              bluehdatum: field === 'bluehdatum' ? value : row.bluehdatum,
              instruktion: field === 'instruktion' ? value : row.instruktion,
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
        <FormTitle title="Zaehlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Zaehlung"
          table="zaehlung"
          rowsLength={rows.length}
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
