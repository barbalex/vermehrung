import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import Row from './Row'
import StoreContext from '../../../storeContext.js'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
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
  overflow-y: auto;
`

const Root = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { user, db } = store
  const { activeNodeArray: activeNodeArrayRaw } = store.tree
  const activeNodeArray = activeNodeArrayRaw.toJSON()

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

  useEffect(
    () => {
      const userPersonOptionsObservable = user.uid
        ? db
            .get('person_option')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns([
              'tree_kultur',
              'tree_teilkultur',
              'tree_zaehlung',
              'tree_lieferung',
              'tree_event',
            ])
        : $of([])
      const userRoleObservable = user.uid
        ? db
            .get('user_role')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns(['name'])
        : $of([])
      const combinedObservables = combineLatest([
        userPersonOptionsObservable,
        userRoleObservable,
      ])
      const subscription = combinedObservables.subscribe(
        async ([[userPersonOption], [userRole]]) => {
          const sArt = getShowArt({ userRole, activeNodeArray })
          const sEvent = getShowEvent({ userPersonOption, activeNodeArray })
          const sGarten = getShowGarten()
          const sHerkunft = getShowHerkunft({ userRole, activeNodeArray })
          const sKultur = getShowKultur({ userPersonOption, activeNodeArray })
          const sLieferung = getShowLieferung({
            userPersonOption,
            activeNodeArray,
          })
          const sPerson = getShowPerson()
          const sSammelLieferung = getShowSammelLieferung({
            userPersonOption,
            activeNodeArray,
          })
          const sSammlung = getShowSammlung({ userRole, activeNodeArray })
          const sTeilkultur = getShowTeilkultur({
            userPersonOption,
            activeNodeArray,
          })
          const sZaehlung = getShowZaehlung({
            userPersonOption,
            activeNodeArray,
          })

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
        },
      )

      return () => subscription?.unsubscribe?.()
    },
    // DO NOT ADD activeNodeArray
    // causes maximum update depth exceeded error
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
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
      user?.uid,
    ],
  )

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
        <FieldsContainer>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Root)
