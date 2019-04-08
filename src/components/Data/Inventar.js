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
import { kulturInventar as kulturInventarFragment } from '../../utils/fragments'
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
  query InventarQuery($id: Int!, $isFiltered: Boolean!) {
    kultur_inventar(where: { id: { _eq: $id } }) {
      ...KulturInventarFields
      kulturBykulturId {
        id
        art_id
      }
    }
    rows: kultur_inventar @include(if: $isFiltered) {
      ...KulturInventarFields
      kulturBykulturId {
        id
        art_id
      }
    }
  }
  ${kulturInventarFragment}
`
const kulturQuery = gql`
  query kulturQuery {
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

const Inventar = () => {
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
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery)

  const [errors, setErrors] = useState({})

  const row = showFilter
    ? filter.inventar
    : get(data, 'kultur_inventar', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'inventar' }),
  )()

  useEffect(() => setErrors({}), [row])

  let kulturWerte = get(kulturData, 'kultur', []).filter(s => {
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
        filter.setValue({ table: 'inventar', key: field, value })
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
              mutation update_kultur_inventar(
                $id: Int!
              ) {
                update_kultur_inventar(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...KulturInventarFields
                  }
                }
              }
              ${kulturInventarFragment}
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
        <FormTitle title="Inventar" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Inventar" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
      </Container>
    )
  }
  if (kulturError) {
    return (
      <Container>
        <FormTitle title="Inventar" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          kulturError.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Inventar"
          table="inventar"
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
            key={`${row.id}kasten`}
            name="kasten"
            label="Kasten"
            value={row.kasten}
            saveToDb={saveToDb}
            error={errors.kasten}
            type="text"
          />
          <TextField
            key={`${row.id}beet`}
            name="beet"
            label="Beet"
            value={row.beet}
            saveToDb={saveToDb}
            error={errors.beet}
            type="text"
          />
          <TextField
            key={`${row.id}nr`}
            name="nr"
            label="Nr."
            value={row.nr}
            saveToDb={saveToDb}
            error={errors.nr}
            type="text"
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

export default observer(Inventar)
