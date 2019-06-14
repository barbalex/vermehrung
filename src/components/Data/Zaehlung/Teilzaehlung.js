import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'

import storeContext from '../../../storeContext'
import TextField from '../../shared/TextField'
import ErrorBoundary from '../../ErrorBoundary'
import { teilzaehlung as teilzaehlungFragment } from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'

const Container = styled.div`
  height: 100%;
  display: flex;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`

const query = gql`
  query TeilzaehlungQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: teilzaehlung_bool_exp!
  ) {
    teilzaehlung(where: { id: { _eq: $id } }) {
      ...TeilzaehlungFields
      kultur {
        id
        art_id
      }
    }
    rowsUnfiltered: teilzaehlung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: teilzaehlung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${teilzaehlungFragment}
`

const Teilzaehlung = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const teilzaehlungFilter = queryFromTable({ store, table: 'teilzaehlung' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: teilzaehlungFilter },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter
    ? filter.teilzaehlung
    : get(data, 'teilzaehlung', [{}])[0]

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'teilzaehlung', key: field, value })
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
              mutation update_teilzaehlung(
                $id: bigint!
              ) {
                update_teilzaehlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...TeilzaehlungFields
                  }
                }
              }
              ${teilzaehlungFragment}
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
    return <Container>Lade...</Container>
  }

  if (error) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <TextField
          key={`${row.id}ort`}
          name="ort"
          label="Nr."
          value={row.ort}
          saveToDb={saveToDb}
          error={errors.ort}
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
          key={`${row.id}anzahl_mutter_pflanzen`}
          name="anzahl_mutter_pflanzen"
          label="Anzahl Mutter-Pflanzen"
          value={row.anzahl_mutter_pflanzen}
          saveToDb={saveToDb}
          error={errors.anzahl_mutter_pflanzen}
          type="number"
        />
        <TextField
          key={`${row.id}anzahl_auspflanzbereit`}
          name="anzahl_auspflanzbereit"
          label="Anzahl auspflanz-bereit"
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
        <TextField
          key={`${row.id}erscheinung`}
          name="erscheinung"
          label="Erscheinung, z.B. Verpackung"
          value={row.erscheinung}
          saveToDb={saveToDb}
          error={errors.erscheinung}
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
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
