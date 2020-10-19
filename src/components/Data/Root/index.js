import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import camelCase from 'lodash/camelCase'
import SimpleBar from 'simplebar-react'

import Row from './Row'
import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`

const FieldsContainer = styled.div`
  height: 100%;
`

const Root = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { userPerson, initialDataQueried } = store
  const {
    showArt,
    showEvent,
    showGarten,
    showHerkunft,
    showKultur,
    showLieferung,
    showPerson,
    showSammelLieferung,
    showSammlung,
    showTeilkultur,
    showZaehlung,
  } = store.tree

  // eslint-disable-next-line no-unused-vars
  const { user_role } = userPerson

  // TODO: filter according to roles
  // by adding each role name as key and true/false as value
  const rows = [
    ...(showArt
      ? [{ name: 'Arten', url: ['Arten'], table: 'art', sort: 1 }]
      : []),
    ...(showHerkunft
      ? [{ name: 'Herkünfte', url: ['Herkuenfte'], table: 'herkunft', sort: 2 }]
      : []),
    ...(showSammlung
      ? [
          {
            name: 'Sammlungen',
            url: ['Sammlungen'],
            table: 'sammlung',
            sort: 3,
          },
        ]
      : []),
    ...(showGarten
      ? [{ name: 'Gärten', url: ['Gaerten'], table: 'garten', sort: 4 }]
      : []),
    ...(showKultur
      ? [{ name: 'Kulturen', url: ['Kulturen'], table: 'kultur', sort: 5 }]
      : []),
    ...(showTeilkultur
      ? [
          {
            name: 'Teilkulturen',
            url: ['Teilkulturen'],
            table: 'teilkultur',
            sort: 6,
          },
        ]
      : []),
    ...(showZaehlung
      ? [{ name: 'Zählungen', url: ['Zaehlungen'], table: 'zaehlung', sort: 7 }]
      : []),
    ...(showLieferung
      ? [
          {
            name: 'Lieferungen',
            url: ['Lieferungen'],
            table: 'lieferung',
            sort: 8,
          },
        ]
      : []),
    ...(showSammelLieferung
      ? [
          {
            name: 'Sammel-Lieferungen',
            url: ['Sammel-Lieferungen'],
            table: 'sammel_lieferung',
            sort: 9,
          },
        ]
      : []),
    ...(showEvent
      ? [{ name: 'Events', url: ['Events'], table: 'event', sort: 10 }]
      : []),
    ...(showPerson
      ? [{ name: 'Personen', url: ['Personen'], table: 'person', sort: 11 }]
      : []),
  ]

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
          <FieldsContainer>
            {rows.map((row) => (
              <Row
                key={row.name}
                row={row}
                length={
                  !initialDataQueried
                    ? '...'
                    : store[`${camelCase(row.table)}sFiltered`].length
                }
              />
            ))}
          </FieldsContainer>
        </SimpleBar>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Root)
