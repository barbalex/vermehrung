import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Row from './Row'
import { StoreContext, useQuery } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
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
      __typename
    }
    art(where: $artFilter) {
      id
      __typename
    }
    event(where: $eventFilter) {
      id
      __typename
    }
    zaehlung(where: $zaehlungFilter) {
      id
      __typename
    }
    teilkultur(where: $teilkulturFilter) {
      id
      __typename
    }
    kultur(where: $kulturFilter) {
      id
      __typename
    }
    herkunft(where: $herkunftFilter) {
      id
      __typename
    }
    sammel_lieferung(where: $sammelLieferungFilter) {
      id
      __typename
    }
    lieferung(where: $lieferungFilter) {
      id
      __typename
    }
    person(where: $personFilter) {
      id
      __typename
    }
    sammlung(where: $sammlungFilter) {
      id
      __typename
    }
  }
`

const Root = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    userPerson,
    artFilter,
    eventFilter,
    gartenFilter,
    kulturFilter,
    herkunftFilter,
    personFilter,
    sammlungFilter,
    lieferungFilter,
    sammelLieferungFilter,
    teilkulturFilter,
    zaehlungFilter,
  } = store

  // eslint-disable-next-line no-unused-vars
  const { user_role } = userPerson

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
    artFilter,
    eventFilter,
    gartenFilter,
    kulturFilter,
    herkunftFilter,
    personFilter,
    sammlungFilter,
    lieferungFilter,
    sammelLieferungFilter,
    teilkulturFilter,
    zaehlungFilter,
  }
  const { error, loading } = useQuery(query, {
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
          {rows.map((row) => (
            <Row
              key={row.name}
              row={row}
              length={loading ? '...' : store[`${row.table}s`].size}
            />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Root)
