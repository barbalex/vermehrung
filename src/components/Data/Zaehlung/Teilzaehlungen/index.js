import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'

import storeContext from '../../../../storeContext'
import ErrorBoundary from '../../../ErrorBoundary'
import { teilzaehlung as teilzaehlungFragment } from '../../../../utils/fragments'
import Teilzaehlung from './Teilzaehlung'

const Container = styled.div`
  height: 100%;
  display: flex;
`

const query = gql`
  query TeilzaehlungenQuery($zaehlId: Int) {
    teilzaehlung(where: { zaehlung_id: { _eq: $zaehlId } }) {
      ...TeilzaehlungFields
    }
  }
  ${teilzaehlungFragment}
`

const Teilzaehlungen = ({ zaehlId }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const { data, error, loading } = useQuery(query, {
    variables: { zaehlId },
  })

  const rows = get(data, 'teilzaehlung', [])

  if (loading) {
    return <Container>Lade...</Container>
  }

  if (error) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  if (rows.length === 0) return null

  // TODO: enable adding new row
  return (
    <ErrorBoundary>
      <Container>
        {rows.map(r => (
          <Teilzaehlung key={r.id} teilzaehlung={r} />
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
