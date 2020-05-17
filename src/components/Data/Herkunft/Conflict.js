import React, { useContext } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import ConflictExplainer from '../../shared/ConflictExplainer'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
`

const query = gql`
  query herkunftForConflictQuery($id: uuid!, $rev: String!) {
    herkunft_rev(where: { id: { _eq: $id }, _rev: { _eq: $rev } }) {
      _rev
      _deleted
      _depth
      _parent_rev
      _revisions
      bemerkungen
      changed
      changed_by
      gemeinde
      geom_point
      id
      kanton
      land
      lokalname
      nr
    }
  }
`

const Conflict = ({ id, rev }) => {
  const store = useContext(StoreContext)

  const { data, error, loading } = useQuery(query, {
    variables: { rev, id },
  })

  const row = data?.herkunft_rev?.[0]
  console.log('Conflict', { id, rev, data, row })

  return (
    <Container>
      <Title>
        Widersprüchliche Version<Rev>{rev}</Rev>
      </Title>
      <ConflictExplainer name="Herkunft" />
      <div>{`Konflikt ${rev}`}</div>
    </Container>
  )
}

export default Conflict
