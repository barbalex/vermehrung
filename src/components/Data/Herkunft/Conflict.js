import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import { useQuery } from '../../../models/reactUtils'
import ConflictExplainer from '../../shared/ConflictExplainer'
import ConflictData from '../../shared/ConflictData'

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
      rev_id
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
  //console.log('Conflict:', { id, rev })
  // TODO: this does not update without a key on the component!!!!!!
  const { data, error, loading } = useQuery(query, {
    variables: { rev, id },
  })

  const row = data?.herkunft_rev?.[0] || {}
  //console.log('Conflict:', { row, data })
  const dataArray = [
    { key: 'Nr', value: row.nr },
    { key: 'Lokalname', value: row.lokalname },
    { key: 'Gemeinde', value: row.gemeinde },
    { key: 'Kanton', value: row.kanton },
    { key: 'Land', value: row.land },
    { key: 'Geometrie', value: row.geom_point },
    { key: 'Bemerkungen', value: row.bemerkungen },
  ]

  if (error) {
    return <Container>{error.message}</Container>
  }

  return (
    <Container>
      <Title>
        Widersprüchliche Version<Rev>{rev}</Rev>
      </Title>
      <ConflictExplainer name="Herkunft" />
      {loading ? (
        'Lade...'
      ) : (
        <ConflictData dataArray={dataArray} loading={loading} />
      )}
    </Container>
  )
}

export default Conflict
