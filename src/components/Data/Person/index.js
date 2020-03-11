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

import storeContext from '../../../storeContext'
import TextField from '../../shared/TextField'
import Select from '../../shared/Select'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Checkbox2States from '../../shared/Checkbox2States'
import { person as personFragment } from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Arten from './Arten'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'

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

const query = gql`
  query PersonQueryForPerson(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: person_bool_exp!
  ) {
    person(where: { id: { _eq: $id } }) {
      ...PersonFields
    }
    rowsUnfiltered: person @include(if: $isFiltered) {
      id
    }
    rowsFiltered: person(where: $filter) @include(if: $isFiltered) {
      id
    }
    user_role(order_by: { sort: asc }) {
      name
      comment
    }
  }
  ${personFragment}
`
const personQueryByAccountId = gql`
  query PersonQueryForPersonByAccoutId($accountId: String) {
    person(where: { account_id: { _eq: $accountId } }) {
      ...PersonFields
    }
  }
  ${personFragment}
`

const Person = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const { filter, user } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const personFilter = queryFromTable({ store, table: 'person' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: personFilter },
  })

  const userRoleWerte = useMemo(
    () =>
      get(data, 'user_role', []).map(el => ({
        value: el.name,
        label: `${el.name} (${el.comment})`,
      })),
    [data],
  )

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.person
  } else {
    row = get(data, 'person[0]') || {}
  }

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const personQueryByAccountIdResult = useQuery(personQueryByAccountId, {
    variables: { accountId: user.uid },
  })
  const { user_role } =
    get(personQueryByAccountIdResult.data, 'person[0]') || {}
  //console.log('Person, user_role:', user_role)

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.person[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'person', key: field, value })
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
              mutation update_person_for_person(
                $id: bigint!
              ) {
                update_person(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...PersonFields
                  }
                }
              }
              ${personFragment}
            `,
            variables: {
              id: row.id,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updatePerson: {
                id: row.id,
                __typename: 'Person',
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

  if (loading) {
    return (
      <Container>
        <FormTitle title="Person" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Person" />
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
            title="Person"
            table="person"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Person</Title>
            <TitleSymbols>
              {user_role === 'manager' && (
                <>
                  <AddButton />
                  <DeleteButton row={row} />
                </>
              )}
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          <Select
            key={`${row.id}${row.user_role}user_role`}
            name="user_role"
            value={row.user_role}
            field="user_role"
            label="Rolle"
            options={userRoleWerte}
            loading={loading}
            saveToDb={saveToDb}
            error={errors.user_role}
          />
          <TextField
            key={`${row.id}nr`}
            name="nr"
            label="Nr"
            value={row.nr}
            saveToDb={saveToDb}
            error={errors.nr}
          />
          <TextField
            key={`${row.id}name`}
            name="name"
            label="Name"
            value={row.name}
            saveToDb={saveToDb}
            error={errors.name}
          />
          <TextField
            key={`${row.id}adresszusatz`}
            name="adresszusatz"
            label="Adress-Zusatz"
            value={row.adresszusatz}
            saveToDb={saveToDb}
            error={errors.adresszusatz}
          />
          <TextField
            key={`${row.id}strasse`}
            name="strasse"
            label="Strasse"
            value={row.strasse}
            saveToDb={saveToDb}
            error={errors.strasse}
          />
          <TextField
            key={`${row.id}plz`}
            name="plz"
            label="PLZ"
            value={row.plz}
            saveToDb={saveToDb}
            error={errors.plz}
            type="number"
          />
          <TextField
            key={`${row.id}ort`}
            name="ort"
            label="Ort"
            value={row.ort}
            saveToDb={saveToDb}
            error={errors.ort}
          />
          <TextField
            key={`${row.id}telefon_privat`}
            name="telefon_privat"
            label="Telefon privat"
            value={row.telefon_privat}
            saveToDb={saveToDb}
            error={errors.telefon_privat}
          />
          <TextField
            key={`${row.id}telefon_geschaeft`}
            name="telefon_geschaeft"
            label="Telefon Geschäft"
            value={row.telefon_geschaeft}
            saveToDb={saveToDb}
            error={errors.telefon_geschaeft}
          />
          <TextField
            key={`${row.id}telefon_mobile`}
            name="telefon_mobile"
            label="Telefon mobile"
            value={row.telefon_mobile}
            saveToDb={saveToDb}
            error={errors.telefon_mobile}
          />
          <TextField
            key={`${row.id}email`}
            name="email"
            label="Email"
            value={row.email}
            saveToDb={saveToDb}
            error={errors.email}
          />
          <Checkbox2States
            key={`${row.id}kein_email`}
            label="Kein Email"
            name="kein_email"
            value={row.kein_email}
            saveToDb={saveToDb}
            error={errors.kein_email}
          />
          <Checkbox2States
            key={`${row.id}kommerziell`}
            label="Kommerziell"
            name="kommerziell"
            value={row.kommerziell}
            saveToDb={saveToDb}
            error={errors.kommerziell}
          />
          <Checkbox2States
            key={`${row.id}info`}
            label="Info"
            name="info"
            value={row.info}
            saveToDb={saveToDb}
            error={errors.info}
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
          {row.user_role === 'artverantwortlich' && <Arten personId={row.id} />}
          {!showFilter && <Files parentId={row.id} parent="person" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Person)
