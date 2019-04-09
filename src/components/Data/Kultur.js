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
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import queryFromTable from '../../utils/queryFromTable'
import {
  kultur as kulturFragment,
  art as artFragment,
  garten as gartenFragment,
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
  query KulturQuery(
    $id: Int!
    $isFiltered: Boolean!
    $filter: kultur_bool_exp!
  ) {
    kultur(where: { id: { _eq: $id } }) {
      ...KulturFields
      gartenBygartenId {
        ...GartenFields
        kultursBygartenId(
          where: { artByartId: { ae_id: { _is_null: false } } }
        ) {
          id
          art_id
        }
      }
    }
    rowsUnfiltered: kultur @include(if: $isFiltered) {
      id
    }
    rowsFiltered: kultur(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${kulturFragment}
  ${artFragment}
  ${gartenFragment}
`
const artQuery = gql`
  query artQuery($filter: art_bool_exp!) {
    art(where: $filter, order_by: { art_ae_art: { name: asc_nulls_first } }) {
      ...ArtFields
    }
  }
  ${artFragment}
`
const gartenQuery = gql`
  query gartenQuery($include: Boolean!) {
    garten(order_by: { personBypersonId: { name: asc_nulls_first } }) {
      id
      personBypersonId {
        id
        name
      }
      kultursBygartenId @include(if: $include) {
        ...KulturFields
      }
    }
  }
  ${kulturFragment}
  ${gartenFragment}
`

const Kultur = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const kulturFilter = queryFromTable({ store, table: 'kultur' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: kulturFilter },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.kultur : get(data, 'kultur', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  useEffect(() => setErrors({}), [row])

  // do not show other arten in this garten
  const otherArtenInThisGarten = get(
    row,
    'gartenBygartenId.kultursBygartenId',
    [],
  )
    .map(k => k.art_id)
    // do show own art
    .filter(k => k !== row.art_id)
  const artFilter = otherArtenInThisGarten.length
    ? { id: { _nin: otherArtenInThisGarten }, ae_id: { _is_null: false } }
    : { ae_id: { _is_null: false } }
  const { data: dataArt, error: errorArt, loading: loadingArt } = useQuery(
    artQuery,
    {
      variables: { filter: artFilter },
    },
  )

  const artId = row.art_id
  const {
    data: dataGarten,
    error: errorGarten,
    loading: loadingGarten,
  } = useQuery(gartenQuery, {
    variables: { include: !!artId },
  })

  const artWerte = memoizeOne(() =>
    get(dataArt, 'art', []).map(el => ({
      value: el.id,
      label: get(el, 'art_ae_art.name') || '(keine Art)',
    })),
  )()

  const gartenWerte = get(dataGarten, 'garten', [])
    // do not include garten of persons already culturing this art
    // TODO: move this to query
    .filter(a => {
      const kulturs = get(a, 'kultursBygartenId', []) || []
      const artIds = kulturs.map(k => k.art_id)
      // do show choosen garten
      return a.id === row.garten_id || !artIds.includes(row.art_id)
    })
    .map(el => ({
      value: el.id,
      label: get(el, 'personBypersonId.name') || '(kein Name)',
    }))

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'kultur', key: field, value })
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
              mutation update_kultur(
                $id: Int!
              ) {
                update_kultur(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...KulturFields
                  }
                }
              }
              ${kulturFragment}
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
        <FormTitle title="Kultur" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || errorArt || errorGarten
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Kultur" />
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
          title="Kultur"
          table="kultur"
          rowsLength={rowsUnfiltered.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.art_id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            loading={loadingArt}
            saveToDb={saveToDb}
            error={errors.art_id}
          />
          <Select
            key={`${row.id}${row.garten_id}garten_id`}
            name="garten_id"
            value={row.garten_id}
            field="garten_id"
            label="Garten"
            options={gartenWerte}
            loading={loadingGarten}
            saveToDb={saveToDb}
            error={errors.garten_id}
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

export default observer(Kultur)
