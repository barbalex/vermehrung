import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import Row from './Row'
import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'
import getShowArt from '../../../utils/showArt'
import getShowEvent from '../../../utils/showEvent'
import getShowGarten from '../../../utils/showGarten'
import getShowHerkunft from '../../../utils/showHerkunft'
import getShowKultur from '../../../utils/showKultur'
import getShowLieferung from '../../../utils/showLieferung'
import getShowPerson from '../../../utils/showPerson'
import getShowSammelLieferung from '../../../utils/showSammelLieferung'
import getShowSammlung from '../../../utils/showSammlung'
import getShowTeilkultur from '../../../utils/showTeilkultur'
import getShowZaehlung from '../../../utils/showZaehlung'

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
  const { user, db } = store

  const [dataState, setDataState] = useState({
    showArt: false,
    showEvent: false,
    showGarten: false,
    showHerkunft: false,
    showKultur: false,
    showLieferung: false,
    showPerson: false,
    showSammelLieferung: false,
    showSammlung: false,
    showTeilkultur: false,
    showZaehlung: false,
  })
  useEffect(() => {
    const run = async () => {
      const sArt = await getShowArt({ user, db })
      const sEvent = await getShowEvent({ user, db })
      const sGarten = await getShowGarten({ user, db })
      const sHerkunft = await getShowHerkunft({ user, db })
      const sKultur = await getShowKultur({ user, db })
      const sLieferung = await getShowLieferung({ user, db })
      const sPerson = await getShowPerson({ user, db })
      const sSammelLieferung = await getShowSammelLieferung({ user, db })
      const sSammlung = await getShowSammlung({ user, db })
      const sTeilkultur = await getShowTeilkultur({ user, db })
      const sZaehlung = await getShowZaehlung({ user, db })

      setDataState({
        showArt: sArt,
        showEvent: sEvent,
        showGarten: sGarten,
        showHerkunft: sHerkunft,
        showKultur: sKultur,
        showLieferung: sLieferung,
        showPerson: sPerson,
        showSammelLieferung: sSammelLieferung,
        showSammlung: sSammlung,
        showTeilkultur: sTeilkultur,
        showZaehlung: sZaehlung,
      })
    }
    run()
  }, [
    db,
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
    user,
  ])
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
  } = dataState

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
              <Row key={row.name} row={row} />
            ))}
          </FieldsContainer>
        </SimpleBar>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Root)
