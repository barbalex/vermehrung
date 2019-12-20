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
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Checkbox2States from '../../shared/Checkbox2States'
import {
  sammlung as sammlungFragment,
  art as artFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'

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
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
  > div > button {
    margin-top: 8px;
  }
`

const query = gql`
  query SammlungQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: sammlung_bool_exp!
  ) {
    sammlung(where: { id: { _eq: $id } }) {
      ...SammlungFields
    }
    rowsUnfiltered: sammlung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: sammlung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${sammlungFragment}
`
const dataQuery = gql`
  query dataQuery {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      name
      ort
    }
    herkunft(
      order_by: [
        { nr: asc_nulls_first }
        { gemeinde: asc_nulls_first }
        { lokalname: asc_nulls_first }
      ]
    ) {
      id
      nr
      lokalname
      gemeinde
    }
    art(order_by: { art_ae_art: { name: asc } }) {
      ...ArtFields
    }
  }
  ${artFragment}
`

const Sammlung = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const sammlungFilter = queryFromTable({ store, table: 'sammlung' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: sammlungFilter },
  })
  const { data: dataData, error: dataError, loading: dataLoading } = useQuery(
    dataQuery,
  )

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.sammlung
  } else {
    row = get(data, 'sammlung[0]') || {}
  }

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const personWerte = useMemo(
    () =>
      get(dataData, 'person', []).map(el => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [dataData],
  )

  const herkunftWerte = useMemo(
    () =>
      get(dataData, 'herkunft', []).map(el => {
        // only show lokal if exist
        // does not exist if user does not have right to see it
        const lokal =
          el.gemeinde || el.lokalname
            ? `, ${el.gemeinde && `${el.gemeinde}, `}${el.lokalname &&
                el.lokalname}`
            : ''
        const nr = el.nr || '(keine Nr.)'
        const label = `${nr}${lokal}`

        return {
          value: el.id,
          label,
        }
      }),
    [dataData],
  )

  const artWerte = useMemo(
    () =>
      get(dataData, 'art', []).map(el => ({
        value: el.id,
        label: get(el, 'art_ae_art.name') || '(kein Artname)',
      })),
    [dataData],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.sammlung[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'sammlung', key: field, value })
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
              mutation update_sammlung(
                $id: bigint!
              ) {
                update_sammlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...SammlungFields
                  }
                }
              }
              ${sammlungFragment}
            `,
            variables: {
              id: row.id,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateSammlung: {
                id: row.id,
                __typename: 'Sammlung',
                content: { ...row, [field]: valueToSet },
              },
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
        if (['herkunft_id', 'person_id', 'art_id'].includes(field)) refetch()
      }
    },
    [client, filter, refetch, row, showFilter],
  )
  const openPlanenDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.apflora.ch/Dokumentation/Planen')
  }, [])
  const openGenVielfaldDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Genetische-Vielfalt',
      )
  }, [])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || dataError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
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
            title="Sammlung"
            table="sammlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammlung</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
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
            loading={dataLoading}
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
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            loading={dataLoading}
            saveToDb={saveToDb}
            error={errors.person_id}
          />
          <Date
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
          <FieldRow>
            <TextField
              key={`${row.id}gramm_samen`}
              name="gramm_samen"
              label="Gramm Samen"
              value={row.gramm_samen}
              saveToDb={saveToDb}
              error={errors.gramm_samen}
              type="number"
            />
            <TextField
              key={`${row.id}andere_menge`}
              name="andere_menge"
              label={`Andere Menge (z.B. "3 Zwiebeln")`}
              value={row.andere_menge}
              saveToDb={saveToDb}
              error={errors.andere_menge}
              type="text"
            />
          </FieldRow>
          <FieldRow>
            <TextField
              key={`${row.id}von_anzahl_individuen`}
              name="von_anzahl_individuen"
              label="von Anzahl Individuen"
              value={row.von_anzahl_individuen}
              saveToDb={saveToDb}
              error={errors.von_anzahl_individuen}
              type="number"
            />
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openGenVielfaldDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </FieldRow>
          <FieldRow>
            <Checkbox2States
              key={`${row.id}geplant`}
              label="Geplant"
              name="geplant"
              value={row.geplant}
              saveToDb={saveToDb}
              error={errors.geplant}
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
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors.bemerkungen}
            multiLine
          />
          {!showFilter && <Files parentId={row.id} parent="sammlung" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Sammlung)
