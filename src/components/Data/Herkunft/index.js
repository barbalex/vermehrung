import React, { useContext, useState, useEffect, useCallback } from 'react'
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
import firebaseContext from '../../../firebaseContext'
import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  herkunft as herkunftFragment,
  personOption as personOptionFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Coordinates from '../../shared/Coordinates'
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

const herkunftQuery = gql`
  query HerkunftQueryForHerkunft(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: herkunft_bool_exp!
  ) {
    herkunft(where: { id: { _eq: $id } }) {
      ...HerkunftFields
    }
    rowsUnfiltered: herkunft @include(if: $isFiltered) {
      id
    }
    rowsFiltered: herkunft(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${herkunftFragment}
`
const personOptionQuery = gql`
  query PersonOptionQueryForHerkunft($account_id: string) {
    person_option(where: { person: { account_id: { _eq: $account_id } } }) {
      ...PersonOptionFields
    }
  }
  ${personOptionFragment}
`

const Herkunft = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const firebase = useContext(firebaseContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  const { data, error, loading, refetch } = useQuery(herkunftQuery, {
    variables: { id, isFiltered, filter: herkunftFilter },
  })

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.herkunft
  } else {
    row = get(data, 'herkunft[0]') || {}
  }

  const personOptionResult = useQuery(personOptionQuery, {
    variables: { accountId: firebase.auth().currentUser.uid },
  })
  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point, person_id } =
    get(personOptionResult.data, 'person_option[0]') || {}

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.herkunft[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'herkunft', key: field, value })
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
              mutation update_herkunft(
                $id: bigint!
              ) {
                update_herkunft(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...HerkunftFields
                  }
                }
              }
              ${herkunftFragment}
            `,
            variables: {
              id: row.id,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateHerkunft: {
                id: row.id,
                __typename: 'Herkunft',
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
  const openHerkunftDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.ch/Dokumentation/Herkuenfte')
  }, [])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Herkunft</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openHerkunftDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <Settings
                personId={person_id}
                personOptionResult={personOptionResult}
              />
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
            label="Nr"
            value={row.nr}
            saveToDb={saveToDb}
            error={errors.nr}
          />
          <TextField
            key={`${row.id}lokalname`}
            name="lokalname"
            label="Lokalname"
            value={row.lokalname}
            saveToDb={saveToDb}
            error={errors.lokalname}
          />
          <TextField
            key={`${row.id}gemeinde`}
            name="gemeinde"
            label="Gemeinde"
            value={row.gemeinde}
            saveToDb={saveToDb}
            error={errors.gemeinde}
          />
          {hk_kanton && (
            <TextField
              key={`${row.id}kanton`}
              name="kanton"
              label="Kanton"
              value={row.kanton}
              saveToDb={saveToDb}
              error={errors.kanton}
            />
          )}
          {hk_land && (
            <TextField
              key={`${row.id}land`}
              name="land"
              label="Land"
              value={row.land}
              saveToDb={saveToDb}
              error={errors.land}
            />
          )}
          {!showFilter && hk_geom_point && (
            <Coordinates row={row} refetchForm={refetch} table="herkunft" />
          )}
          {hk_bemerkungen && (
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
          {!showFilter && <Files parentId={row.id} parent="herkunft" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
