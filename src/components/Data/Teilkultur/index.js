import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  kulturFelder as kulturFelderFragment,
  teilkultur as teilkulturFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Settings from './Settings'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
`
const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleFilterNumbers = styled.div`
  padding-right: 8px;
  cursor: default;
  user-select: none;
  padding-right: 5px;
  margin-top: auto;
  margin-bottom: auto;
  min-width: 48px;
  text-align: center;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const teilkulturQuery = gql`
  query TeilkulturQuery(
    $id: bigint!
    $filter: teilkultur_bool_exp!
    $isFiltered: Boolean!
  ) {
    teilkultur(where: { id: { _eq: $id } }) {
      ...TeilkulturFields
      kultur {
        id
        art_id
        kultur_felder {
          ...KulturFelderFields
        }
      }
    }
    rowsUnfiltered: teilkultur @include(if: $isFiltered) {
      id
    }
    rowsFiltered: teilkultur(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${teilkulturFragment}
  ${kulturFelderFragment}
`
// garten.person.name
const kulturQuery = gql`
  query kulturQuery {
    kultur(
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
        { art: { art_ae_art: { name: asc_nulls_first } } }
      ]
    ) {
      id
      art_id
      art {
        id
        art_ae_art {
          id
          name
        }
      }
      garten {
        id
        name
        person {
          id
          name
          ort
        }
      }
    }
  }
  ${teilkulturFragment}
`

const Teilkultur = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const teilkulturFilter = queryFromTable({ store, table: 'teilkultur' })
  const teilkulturResult = useQuery(teilkulturQuery, {
    variables: { id, isFiltered, filter: teilkulturFilter },
  })
  const { data, error, loading } = teilkulturResult

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.teilkultur
  } else {
    row = get(data, 'teilkultur[0]') || {}
  }
  console.log('Teilkultur, row:', row)

  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery)
  console.log('Teilkultur, kulturData:', kulturData)

  const { tk_bemerkungen } = get(row, 'kultur.kultur_felder', {}) || {}
  console.log('Teilkultur, tk_bemerkungen:', tk_bemerkungen)

  useEffect(() => {
    setErrors({})
  }, [row.id])
  console.log('Teilkultur, after useEffect:')

  const kulturWerte = memoizeOne(() =>
    get(kulturData, 'kultur', []).map(el => {
      const personName = get(el, 'garten.person.name') || '(kein Name)'
      const personOrt = get(el, 'garten.person.ort') || null
      const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
      const gartenName = get(el, 'garten.name') || personLabel
      const artName = get(el, 'art.art_ae_art.name') || '(keine Art)'
      const label = `${gartenName}: ${artName}`

      return {
        value: el.id,
        label,
      }
    }),
  )()
  console.log('Teilkultur, kulturWerte:', kulturWerte)

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.teilkultur[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'teilkultur', key: field, value })
      } else {
        try {
          let valueToSet
          if (value === null) {
            valueToSet = null
          } else if (['number', 'boolean'].includes(type)) {
            valueToSet = value
          } else {
            valueToSet = `"${value}"`
          }
          await client.mutate({
            mutation: gql`
              mutation update_teilkultur($id: bigint!) {
                update_teilkultur(
                  where: { id: { _eq: $id } }
                  _set: { 
                    ${field}: ${valueToSet} }
                ) {
                  affected_rows
                  returning {
                    ...TeilkulturFields
                  }
                }
              }
              ${teilkulturFragment}
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
        <FormTitle title="Teilkultur" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Teilkultur" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (kulturError) {
    return (
      <Container>
        <FormTitle title="Teilkultur" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${kulturError.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Teilkultur"
            table="teilkultur"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Teilkultur</Title>
            <TitleSymbols>
              <Settings teilkulturResult={teilkulturResult} />
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
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
          <TextField
            key={`${row.id}name`}
            name="name"
            label="Name"
            value={row.name}
            saveToDb={saveToDb}
            error={errors.name}
          />
          {tk_bemerkungen && (
            <TextField
              key={`${row.id}bemerkungen`}
              name="bemerkungen"
              label="Bemerkungen"
              value={row.bemerkungen}
              saveToDb={saveToDb}
              error={errors.bemerkungen}
              multiline
            />
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilkultur)
