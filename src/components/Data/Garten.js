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
import RadioButton from '../shared/RadioButton'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import { garten as gartenFragment } from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'
import Files from './Files'
import Coordinates from '../shared/Coordinates'

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
  query GartenQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: garten_bool_exp!
  ) {
    garten(where: { id: { _eq: $id } }) {
      ...GartenFields
    }
    rowsUnfiltered: garten @include(if: $isFiltered) {
      id
    }
    rowsFiltered: garten(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${gartenFragment}
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

const Garten = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const gartenFilter = queryFromTable({ store, table: 'garten' })
  const { data, error, loading, refetch: refetchForm } = useQuery(query, {
    variables: { id, isFiltered, filter: gartenFilter },
  })
  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery)

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.garten : get(data, 'garten', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  useEffect(() => setErrors({}), [row])

  const personWerte = memoizeOne(() =>
    get(personData, 'person', []).map(el => ({
      value: el.id,
      label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
    })),
  )()

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'garten', key: field, value })
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
              mutation update_garten($id: bigint!) {
                update_garten(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...GartenFields
                  }
                }
              }
              ${gartenFragment}
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
        <FormTitle title="Garten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Garten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (personError) {
    return (
      <Container>
        <FormTitle title="Garten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${personError.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Garten"
          table="garten"
          rowsLength={rowsUnfiltered.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            loading={personLoading}
            saveToDb={saveToDb}
            error={errors.person_id}
          />
          {!showFilter && (
            <Coordinates row={row} refetchForm={refetchForm} table="garten" />
          )}
          <RadioButton
            key={`${row.id}aktiv`}
            label="Aktiv"
            name="aktiv"
            value={row.aktiv}
            saveToDb={saveToDb}
            error={errors.aktiv}
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
          {!showFilter && <Files parentId={row.id} parent="garten" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Garten)
