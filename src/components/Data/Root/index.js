import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import gql from 'graphql-tag'

import Row from './Row'
import { getProfile } from '../../../utils/auth'
import storeContext from '../../../storeContext'
import queryFromTable from '../../../utils/queryFromTable'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
`

const FieldsContainer = styled.div`
  overflow: auto !important;
  height: 100%;
`

const query = gql`
  query TreeQueryForRoot(
    $artFilter: art_bool_exp!
    $eventFilter: event_bool_exp!
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
    $herkunftFilter: herkunft_bool_exp!
    $personFilter: person_bool_exp!
    $sammlungFilter: sammlung_bool_exp!
    $teilkulturFilter: teilkultur_bool_exp!
    $zaehlungFilter: zaehlung_bool_exp!
    $lieferungFilter: lieferung_bool_exp!
    $sammelLieferungFilter: sammel_lieferung_bool_exp!
  ) {
    garten(where: $gartenFilter) {
      id
    }
    art(where: $artFilter) {
      id
    }
    event(where: $eventFilter) {
      id
    }
    zaehlung(where: $zaehlungFilter) {
      id
    }
    teilkultur(where: $teilkulturFilter) {
      id
    }
    kultur(where: $kulturFilter) {
      id
    }
    herkunft(where: $herkunftFilter) {
      id
    }
    sammel_lieferung(where: $sammelLieferungFilter) {
      id
    }
    lieferung(where: $lieferungFilter) {
      id
    }
    person(where: $personFilter) {
      id
    }
    sammlung(where: $sammlungFilter) {
      id
    }
  }
`

const Root = ({ filter: showFilter }) => {
  const store = useContext(storeContext)
  const user = getProfile()
  const claims = user['https://hasura.io/jwt/claims'] || {}
  // eslint-disable-next-line no-unused-vars
  const role = claims['x-hasura-role']

  // TODO: filter according to roles
  // by adding each role name as key and true/false as value
  const rows = [
    { name: 'Arten', url: ['Arten'], table: 'art', sort: 1 },
    { name: 'Herkünfte', url: ['Herkuenfte'], table: 'herkunft', sort: 2 },
    { name: 'Sammlungen', url: ['Sammlungen'], table: 'sammlung', sort: 3 },
    { name: 'Gärten', url: ['Gaerten'], table: 'garten', sort: 4 },
    { name: 'Kulturen', url: ['Kulturen'], table: 'kultur', sort: 5 },
    {
      name: 'Teilkulturen',
      url: ['Teilkulturen'],
      table: 'teilkultur',
      sort: 6,
    },
    { name: 'Zählungen', url: ['Zaehlungen'], table: 'zaehlung', sort: 7 },
    { name: 'Lieferungen', url: ['Lieferungen'], table: 'lieferung', sort: 8 },
    {
      name: 'Sammel-Lieferungen',
      url: ['Sammel-Lieferungen'],
      table: 'sammel_lieferung',
      sort: 9,
    },
    { name: 'Events', url: ['Events'], table: 'event', sort: 10 },
    { name: 'Personen', url: ['Personen'], table: 'person', sort: 11 },
  ]

  const variables = {
    artFilter: queryFromTable({ store, table: 'art' }),
    eventFilter: queryFromTable({ store, table: 'event' }),
    gartenFilter: queryFromTable({ store, table: 'garten' }),
    kulturFilter: queryFromTable({ store, table: 'kultur' }),
    herkunftFilter: queryFromTable({ store, table: 'herkunft' }),
    personFilter: queryFromTable({ store, table: 'person' }),
    sammlungFilter: queryFromTable({ store, table: 'sammlung' }),
    lieferungFilter: queryFromTable({ store, table: 'lieferung' }),
    sammelLieferungFilter: queryFromTable({
      store,
      table: 'sammel_lieferung',
    }),
    teilkulturFilter: queryFromTable({ store, table: 'teilkultur' }),
    zaehlungFilter: queryFromTable({ store, table: 'zaehlung' }),
  }
  const { data, error, loading } = useQuery(query, {
    variables,
  })

  if (error) {
    return (
      <Container>
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FieldsContainer>
          {rows.map(row => (
            <Row
              key={row.name}
              row={row}
              length={loading ? '...' : data[row.table].length}
            />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Root)
