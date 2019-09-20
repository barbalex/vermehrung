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
import memoizeOne from 'memoize-one'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import {
  art as artFragment,
  garten as gartenFragment,
  kultur as kulturFragment,
  kulturFelder as kulturFelderFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import Files from '../Files'
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

const kulturQuery = gql`
  query KulturQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: kultur_bool_exp!
  ) {
    kultur(where: { id: { _eq: $id } }) {
      ...KulturFields
      garten {
        ...GartenFields
        kulturs(where: { art: { ae_id: { _is_null: false } } }) {
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
    garten(order_by: { person: { name: asc_nulls_first } }) {
      id
      person {
        id
        name
      }
      kulturs @include(if: $include) {
        ...KulturFields
      }
    }
  }
  ${kulturFragment}
  ${gartenFragment}
`
const dataQuery = gql`
  query dataQuery {
    herkunft(
      order_by: [{ nr: asc_nulls_first }, { lokalname: asc_nulls_first }]
    ) {
      id
      nr
      lokalname
    }
  }
`
const kulturFelderQuery = gql`
  query kulturFelderQuery($kulturId: Int) {
    kultur_felder(where: { kultur_id: { _eq: $kulturId } }) {
      ...KulturFelderFields
    }
  }
  ${kulturFelderFragment}
`

const Kultur = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const kulturFilter = queryFromTable({ store, table: 'kultur' })
  const { data, error, loading } = useQuery(kulturQuery, {
    variables: { id, isFiltered, filter: kulturFilter },
  })
  const { data: dataData, error: dataError, loading: dataLoading } = useQuery(
    dataQuery,
  )

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.kultur
  } else {
    row = get(data, 'kultur', [{}])[0]
  }

  const kulturFelderResult = useQuery(kulturFelderQuery, {
    variables: { kulturId: row.id },
  })
  const { tk } = get(kulturFelderResult.data, 'kultur_felder[0]', {}) || {}

  useEffect(() => {
    setErrors({})
  }, [row.id])

  // do not show other arten in this garten
  const otherArtenInThisGarten = get(row, 'garten.kulturs', [])
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
      const kulturs = get(a, 'kulturs', []) || []
      const artIds = kulturs.map(k => k.art_id)
      // do show choosen garten
      return a.id === row.garten_id || !artIds.includes(row.art_id)
    })
    .map(el => ({
      value: el.id,
      label: get(el, 'person.name') || '(kein Name)',
    }))

  const herkunftWerte = useMemo(
    () =>
      get(dataData, 'herkunft', []).map(el => ({
        value: el.id,
        label: `${el.nr || '(keine Nr)'}: ${el.lokalname || 'kein Lokalname'}`,
      })),
    [dataLoading],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.kultur[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'kultur', key: field, value })
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
              mutation update_kultur(
                $id: bigint!
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

  const errorToShow = error || errorArt || errorGarten || dataError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Kultur" />
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
            title="Kultur"
            table="kultur"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Kultur</Title>
            <TitleSymbols>
              <Settings
                kulturId={row.id}
                kulturFelderResult={kulturFelderResult}
              />
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
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
          <Checkbox2States
            key={`${row.id}zwischenlager`}
            label="Zwischenlager"
            name="zwischenlager"
            value={row.zwischenlager}
            saveToDb={saveToDb}
            error={errors.zwischenlager}
          />
          <Checkbox2States
            key={`${row.id}erhaltungskultur`}
            label="Erhaltungskultur"
            name="erhaltungskultur"
            value={row.erhaltungskultur}
            saveToDb={saveToDb}
            error={errors.erhaltungskultur}
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
          <Checkbox2States
            key={`${row.id}aktiv`}
            label="aktiv"
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
          {!showFilter && <Files parentId={row.id} parent="kultur" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Kultur)
