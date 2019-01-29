import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'

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
  query ArtQuery($id: UUID!) {
    art(where: { art_ae_art: { id: { _eq: $id } } }) {
      id
      ae_id
    }
    ae_art {
      id
      name
    }
  }
`

const Art = () => {
  const store = useContext(storeContext)
  const { activeNodeArray } = store.tree
  const aeId = activeNodeArray[1]
  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id: aeId },
  })

  const [errors, setErrors] = useState({})

  const row = get(data, 'art', [])[0]

  useEffect(() => setErrors({}), [row])

  let artWerte = get(data, 'ae_art')
  artWerte = sortBy(artWerte, 'name')
  artWerte = artWerte.map(el => ({
    value: el.id,
    label: el.name,
  }))

  if (loading) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <FormTitle aeId={aeId} title="Art" />
        <FieldsContainer>
          <Select
            key={`${row.id}ae_id`}
            name="ae_id"
            value={row.ae_id}
            field="ae_id"
            label="Art"
            options={artWerte}
            saveToDb={() => 'TODO'}
            error={errors.ae_id}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Art)
