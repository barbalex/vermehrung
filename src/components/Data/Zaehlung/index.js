import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import storeContext from '../../../storeContext'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import Date from '../../shared/Date'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  zaehlung as zaehlungFragment,
  kulturFelder as kulturFelderFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Teilzaehlungen from './Teilzaehlungen'
import Settings from './Settings'
import AddButton from './AddButton'
import DelteButton from './DeleteButton'

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
  cursor: default;
  user-select: none;
  padding: 0 5px;
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
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div > button {
    margin-top: 8px;
  }
`

const zaehlungQuery = gql`
  query ZaehlungQueryForZaehlung(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: zaehlung_bool_exp!
  ) {
    zaehlung(where: { id: { _eq: $id } }) {
      ...ZaehlungFields
      kultur {
        id
        art_id
        kultur_felder {
          ...KulturFelderFields
        }
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
  ${kulturFelderFragment}
`
const kulturQuery = gql`
  query kulturQueryForZaehlung($filter: kultur_bool_exp!) {
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
        name
        person {
          id
          name
          ort
        }
      }
    }
  }
  ${kulturFelderFragment}
`

const Zaehlung = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree
  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))

  const isFiltered = runIsFiltered()
  const zaehlungFilter = queryFromTable({ store, table: 'zaehlung' })
  const zaehlungResult = useQuery(zaehlungQuery, {
    variables: { id, isFiltered, filter: zaehlungFilter },
  })
  const { data, error, loading } = zaehlungResult

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.zaehlung
  } else {
    row = get(data, 'zaehlung[0]') || {}
  }

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

  const { z_bemerkungen } = get(row, 'kultur.kultur_felder') || {}

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const kulturWerte = useMemo(
    () =>
      get(kulturData, 'kultur', []).map(el => {
        const personName = get(el, 'garten.person.name') || '(kein Name)'
        const personOrt = get(el, 'garten.person.ort') || null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const label = get(el, 'garten.name') || personLabel

        return {
          value: el.id,
          label,
        }
      }),
    [kulturData],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.zaehlung[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'zaehlung', key: field, value })
      } else {
        try {
          let valueToSet
          if (value === null) {
            valueToSet = null
          } else if (['number', 'boolean'].includes(type)) {
            valueToSet = value
          } else {
            valueToSet = `"${value.split('"').join('\\"')}"`
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
            optimisticResponse: {
              __typename: 'Mutation',
              updateZaehlung: {
                id: row.id,
                __typename: 'Zaehlung',
                content: { ...row, [field]: valueToSet },
              },
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
      }
    },
    [client, filter, row, showFilter],
  )
  const openPlanenDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.apflora.ch/Dokumentation/Planen')
  }, [])
  const openZaehlungDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.apflora.ch/Dokumentation/Zaehlungen')
  }, [])

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
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <>
        <Container showfilter={showFilter}>
          {showFilter ? (
            <FilterTitle
              title="Zählung"
              table="zaehlung"
              totalNr={totalNr}
              filteredNr={filteredNr}
            />
          ) : (
            <TitleContainer>
              <Title>Zählung</Title>
              <TitleSymbols>
                <AddButton />
                <DelteButton row={row} />
                {row.kultur_id && (
                  <Settings
                    kulturId={row.kultur_id}
                    zaehlungResult={zaehlungResult}
                  />
                )}
                <IconButton
                  aria-label="Anleitung öffnen"
                  title="Anleitung öffnen"
                  onClick={openZaehlungDocs}
                >
                  <IoMdInformationCircleOutline />
                </IconButton>
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
            <Date
              key={`${row.id}datum`}
              name="datum"
              label="Datum"
              value={row.datum}
              saveToDb={saveToDb}
              error={errors.datum}
            />
            <FieldRow>
              <Checkbox2States
                key={`${row.id}prognose`}
                label="Prognose"
                name="prognose"
                value={row.prognose}
                saveToDb={saveToDb}
                error={errors.prognose}
              />
              <div>
                <IconButton
                  aria-label="Anleitung öffnen"
                  title="Anleitung öffnen"
                  onClick={openPlanenDocs}
                >
                  <IoMdInformationCircleOutline />
                </IconButton>
              </div>
            </FieldRow>
            <FieldRow>
              <Checkbox2States
                key={`${row.id}ziel`}
                label="Ziel"
                name="ziel"
                value={row.ziel}
                saveToDb={saveToDb}
                error={errors.ziel}
              />
              <div>
                <IconButton
                  aria-label="Anleitung öffnen"
                  title="Anleitung öffnen"
                  onClick={openPlanenDocs}
                >
                  <IoMdInformationCircleOutline />
                </IconButton>
              </div>
            </FieldRow>
            {(z_bemerkungen || showFilter) && (
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors.bemerkungen}
                multiLine
              />
            )}
            {!showFilter && <Teilzaehlungen zaehlungResult={zaehlungResult} />}
          </FieldsContainer>
        </Container>
      </>
    </ErrorBoundary>
  )
}

export default observer(Zaehlung)
