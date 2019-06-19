import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'

import storeContext from '../../storeContext'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import RadioButton from '../shared/RadioButton'
import ErrorBoundary from '../ErrorBoundary'
import { person as personFragment } from '../../utils/fragments'
import types from '../../store/Filter/simpleTypes'
import queryFromTable from '../../utils/queryFromTable'
import Files from './Files'

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
  query PersonQuery(
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
  }
  ${personFragment}
`

const Person = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree

  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const personFilter = queryFromTable({ store, table: 'person' })
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered, filter: personFilter },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.person : get(data, 'person', [{}])[0]
  const rowsUnfiltered = get(data, 'rowsUnfiltered', [])
  const rowsFiltered = get(data, 'rowsFiltered', [])

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'person', key: field, value })
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
              mutation update_person(
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

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Person"
          table="person"
          rowsLength={rowsUnfiltered.length}
          rowsFilteredLength={rowsFiltered.length}
          filter={showFilter}
        />
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
            key={`${row.id}fax_privat`}
            name="fax_privat"
            label="Fax privat"
            value={row.fax_privat}
            saveToDb={saveToDb}
            error={errors.fax_privat}
          />
          <TextField
            key={`${row.id}fax_geschaeft`}
            name="fax_geschaeft"
            label="Fax Geschäft"
            value={row.fax_geschaeft}
            saveToDb={saveToDb}
            error={errors.fax_geschaeft}
          />
          <TextField
            key={`${row.id}email`}
            name="email"
            label="Email"
            value={row.email}
            saveToDb={saveToDb}
            error={errors.email}
          />
          <RadioButton
            key={`${row.id}kein_email`}
            label="Kein Email"
            name="kein_email"
            value={row.kein_email}
            saveToDb={saveToDb}
            error={errors.kein_email}
          />
          <RadioButton
            key={`${row.id}kommerziell`}
            label="Kommerziell"
            name="kommerziell"
            value={row.kommerziell}
            saveToDb={saveToDb}
            error={errors.kommerziell}
          />
          <RadioButton
            key={`${row.id}info`}
            label="Info"
            name="info"
            value={row.info}
            saveToDb={saveToDb}
            error={errors.info}
          />
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
          {!showFilter && <Files parentId={row.id} parent="person" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Person)
