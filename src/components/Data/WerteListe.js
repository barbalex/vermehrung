import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../storeContext'
import TextField from '../shared/TextField'
import FormTitle from '../shared/FormTitle'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const WerteListe = ({ table }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const { data, error, loading } = useQuery(
    gql`query EventQuery($id: bigint!) {
      ${table}(where: { id: { _eq: $id } }) {
        id
        wert
        sort
      }
    }
  `,
    {
      variables: { id },
    },
  )

  const [errors, setErrors] = useState({})

  const row = get(data, table, [{}])[0]
  let title = ''
  switch (table) {
    case 'lieferung_status_werte':
      title = 'Lieferung: Status'
      break
    case 'lieferung_typ_werte':
      title = 'Lieferung: Typ'
      break
    case 'lieferung_zwischenlager_werte':
      title = 'Lieferung: Zwischenlager'
      break
    case 'masseinheit_werte':
      title = 'Masseinheiten'
      break
    case 'zaehleinheit_werte':
      title = 'Zähleinheiten'
      break
    default:
    //
  }

  useEffect(() => setErrors({}), [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      try {
        let valueToSet
        if (value === undefined || value === null) {
          valueToSet = null
        } else if (['id', 'sort'].includes(field)) {
          valueToSet = value
        } else {
          valueToSet = `"${value}"`
        }
        await client.mutate({
          mutation: gql`
            mutation update_${table}(
              $id: bigint!
            ) {
              update_${table}(
                where: { id: { _eq: $id } }
                _set: {
                  ${field}: ${valueToSet}
                }
              ) {
                affected_rows
                returning {
                  id
                  wert
                  sort
                }
              }
            }
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
    },
    [row],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title={title} />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title={title} />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <Container>
        <FormTitle title={title} />
        <FieldsContainer>
          <TextField
            key={`${row.id}wert`}
            name="wert"
            label="Wert"
            value={row.wert}
            saveToDb={saveToDb}
            error={errors.wert}
            type="text"
          />
          <TextField
            key={`${row.id}sort`}
            name="sort"
            label="Sortierung"
            value={row.sort}
            saveToDb={saveToDb}
            error={errors.sort}
            type="number"
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(WerteListe)
