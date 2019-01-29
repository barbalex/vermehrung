import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import ifIsNumericAsNumber from '../../utils/ifIsNumericAsNumber'

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
  query HerkunftQuery($id: Int!) {
    herkunft(where: { id: { _eq: $id } }) {
      id
      nr
      lokalname
      gemeinde
      kanton
      land
      x
      y
      bemerkungen
    }
  }
`

const Herkunft = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { activeNodeArray, refetch } = store.tree
  const id = activeNodeArray[activeNodeArray.length - 1]
  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id },
  })

  const [errors, setErrors] = useState({})

  const row = get(data, 'herkunft', [{}])[0]

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value) || null
      try {
        await client.mutate({
          mutation: gql`
            mutation update_herkunft(
              $id: Int!
              $nr: string
              $lokalname: string
              $gemeinde: string
              $kanton: string
              $land: string
              $x: Int
              $y: Int
              $bemerkungen: String
            ) {
              update_herkunft(
                where: { id: { _eq: $id } }
                _set: {
                  nr: $nr
                  lokalname: $lokalname
                  gemeinde: $gemeinde
                  kanton: $kanton
                  land: $land
                  x: $x
                  y: $y
                  bemerkungen: $bemerkungen
                }
              ) {
                affected_rows
                returning {
                  id
                  nr
                  lokalname
                  gemeinde
                  kanton
                  land
                  x
                  y
                  bemerkungen
                }
              }
            }
          `,
          variables: {
            id: row.id,
            nr: field === 'nr' ? value : row.nr,
            lokalname: field === 'lokalname' ? value : row.lokalname,
            gemeinde: field === 'gemeinde' ? value : row.gemeinde,
            kanton: field === 'kanton' ? value : row.kanton,
            land: field === 'land' ? value : row.land,
            x: field === 'x' ? value : row.x,
            y: field === 'y' ? value : row.y,
            bemerkungen: field === 'bemerkungen' ? value : row.bemerkungen,
          },
        })
      } catch (error) {
        return setErrors({ [field]: error.message })
      }
      setErrors({})
      refetch()
    },
    [row],
  )

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
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <FormTitle title="Herkunft" />
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
          <TextField
            key={`${row.id}kanton`}
            name="kanton"
            label="Kanton"
            value={row.kanton}
            saveToDb={saveToDb}
            error={errors.kanton}
          />
          <TextField
            key={`${row.id}land`}
            name="land"
            label="Land"
            value={row.land}
            saveToDb={saveToDb}
            error={errors.land}
          />
          <TextField
            key={`${row.id}x`}
            name="x"
            label="X-Koordinate"
            value={row.x}
            saveToDb={saveToDb}
            error={errors.x}
            type="number"
          />
          <TextField
            key={`${row.id}y`}
            name="y"
            label="Y-Koordinate"
            value={row.y}
            saveToDb={saveToDb}
            error={errors.y}
            type="number"
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

export default observer(Herkunft)
