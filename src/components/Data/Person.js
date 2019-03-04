import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'

import storeContext from '../../storeContext'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import RadioButton from '../shared/RadioButton'
import ErrorBoundary from '../ErrorBoundary'
import filterNodes from '../../utils/filterNodes'
import { person as personFragment } from '../../utils/fragments'

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
  query PersonQuery($id: Int!, $isFiltered: Boolean!) {
    person(where: { id: { _eq: $id } }) {
      ...PersonFields
    }
    rows: person @include(if: $isFiltered) {
      ...PersonFields
    }
  }
  ${personFragment}
`

const Person = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const { data, error, loading } = useQuery(query, {
    variables: { id, isFiltered },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.person : get(data, 'person', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'person' }),
  )()

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'person', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_person(
                $id: Int!
                $nr: String
                $name: String
                $adresszusatz: String
                $strasse: String
                $plz: Int
                $ort: String
                $telefon_privat: String
                $telefon_geschaeft: String
                $telefon_mobile: String
                $fax_privat: String
                $fax_geschaeft: String
                $email: String
                $kein_email: Boolean
                $bemerkungen: String
              ) {
                update_person(
                  where: { id: { _eq: $id } }
                  _set: {
                    nr: $nr
                    name: $name
                    adresszusatz: $adresszusatz
                    strasse: $strasse
                    plz: $plz
                    ort: $ort
                    telefon_privat: $telefon_privat
                    telefon_geschaeft: $telefon_geschaeft
                    telefon_mobile: $telefon_mobile
                    fax_privat: $fax_privat
                    fax_geschaeft: $fax_geschaeft
                    email: $email
                    kein_email: $kein_email
                    bemerkungen: $bemerkungen
                  }
                ) {
                  affected_rows
                  returning {
                    id
                    nr
                    name
                    adresszusatz
                    strasse
                    plz
                    ort
                    telefon_privat
                    telefon_geschaeft
                    telefon_mobile
                    fax_privat
                    fax_geschaeft
                    email
                    kein_email
                    bemerkungen
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              nr: field === 'nr' ? value : row.nr,
              name: field === 'name' ? value : row.name,
              adresszusatz: field === 'adresszusatz' ? value : row.adresszusatz,
              strasse: field === 'strasse' ? value : row.strasse,
              plz: field === 'plz' ? value : row.plz,
              ort: field === 'ort' ? value : row.ort,
              telefon_privat:
                field === 'telefon_privat' ? value : row.telefon_privat,
              telefon_geschaeft:
                field === 'telefon_geschaeft' ? value : row.telefon_geschaeft,
              telefon_mobile:
                field === 'telefon_mobile' ? value : row.telefon_mobile,
              fax_privat: field === 'fax_privat' ? value : row.fax_privat,
              fax_geschaeft:
                field === 'fax_geschaeft' ? value : row.fax_geschaeft,
              email: field === 'email' ? value : row.email,
              kein_email: field === 'kein_email' ? value : row.kein_email,
              bemerkungen: field === 'bemerkungen' ? value : row.bemerkungen,
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
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
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
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
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

export default observer(Person)
