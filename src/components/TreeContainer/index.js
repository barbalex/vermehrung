/**
 * This component only loads the data
 * Reason:
 * The query gets lots of variables to enable loading step by step
 * what data is needed while the user navigates the tree
 * Every time the query is re-run with different variables,
 * it returns empty data while loading.
 * This is bad for the tree. Very hard to build a good user experiences.
 * So the data is passed as props to the Tree component.
 * Which can decide not to update nodes if the query is loading
 * but rather use the previous value
 */
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/react-hooks'

import storeContext from '../../storeContext'
import query from './query'
import Tree from './Tree'
import buildNodes from './nodes'
import queryFromTable from '../../utils/queryFromTable'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  @media print {
    display: none !important;
  }
`

const TreeContainer = ({ dimensions }) => {
  const store = useContext(storeContext)
  const { setRefetch, openNodes, setNodes } = store.tree
  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click

  const { data, error, loading, refetch } = useQuery(query, {
    //notifyOnNetworkStatusChange: true,
    variables: {
      artFilter: queryFromTable({ store, table: 'art' }),
      aufgabeFilter: queryFromTable({ store, table: 'aufgabe' }),
      gartenFilter: queryFromTable({ store, table: 'garten' }),
      kulturFilter: queryFromTable({ store, table: 'kultur' }),
      eventFilter: queryFromTable({ store, table: 'event' }),
      herkunftFilter: queryFromTable({ store, table: 'herkunft' }),
      personFilter: queryFromTable({ store, table: 'person' }),
      sammlungFilter: queryFromTable({ store, table: 'sammlung' }),
      lieferungFilter: queryFromTable({ store, table: 'lieferung' }),
      teilkulturFilter: queryFromTable({ store, table: 'teilkultur' }),
      zaehlungFilter: queryFromTable({ store, table: 'zaehlung' }),
      isArt: openNodes.some(n => n[0] === 'Arten'),
      isAufgabe: openNodes.some(n => n[0] === 'Aufgaben'),
      isArtKultur: openNodes.some(n => n[0] === 'Arten' && n[2] === 'Kulturen'),
      isArtSammlung: openNodes.some(
        n => n[0] === 'Arten' && n[2] === 'Sammlungen',
      ),
      isGarten: openNodes.some(n => n[0] === 'Gaerten'),
      isGartenKultur: openNodes.some(
        n => n[0] === 'Gaerten' && n[2] === 'Kulturen',
      ),
      isHerkunft: openNodes.some(n => n[0] === 'Herkuenfte'),
      isHerkunftSammlung: openNodes.some(
        n => n[0] === 'Herkuenfte' && n[2] === 'Sammlungen',
      ),
      isLieferung: openNodes.some(n => n[0] === 'Lieferungen'),
      isPerson: openNodes.some(n => n[0] === 'Personen'),
      isPersonGarten: openNodes.some(
        n => n[0] === 'Personen' && n[2] === 'Gaerten',
      ),
      isPersonGartenKultur: openNodes.some(
        n => n[0] === 'Personen' && n[2] === 'Gaerten' && n[4] === 'Kulturen',
      ),
      isPersonSammlung: openNodes.some(
        n => n[0] === 'Personen' && n[2] === 'Sammlungen',
      ),
      isPersonLieferung: openNodes.some(
        n => n[0] === 'Personen' && n[2] === 'Lieferungen',
      ),
      isSammlung: openNodes.some(n => n[0] === 'Sammlungen'),
      isSammlungLieferung: openNodes.some(
        n => n[0] === 'Sammlungen' && n[2] === 'Aus-Lieferungen',
      ),
      isSammlungLieferungKultur: openNodes.some(
        n =>
          n[0] === 'Sammlungen' &&
          n[2] === 'Aus-Lieferungen' &&
          n[4] === 'Kulturen',
      ),
      isTeilkultur: openNodes.some(n => n[0] === 'Teilkulturen'),
      isKultur: openNodes.some(n => n[0] === 'Kulturen'),
      isKulturAnLieferung: openNodes.some(
        n => n[0] === 'Kulturen' && n[2] === 'An-Lieferungen',
      ),
      isKulturAusLieferung: openNodes.some(
        n => n[0] === 'Kulturen' && n[2] === 'Aus-Lieferungen',
      ),
      isWerteListe: openNodes.some(n => n[0] === 'Werte-Listen'),
    },
  })

  useEffect(() => {
    setRefetch(refetch)
    // fetch on first load to show loading state
    setNodes(buildNodes({ store, data, loading }))
  }, [])

  // do not set nodes when data is empty
  // which happens while query is loading again
  if (!loading && Object.keys(data).length > 0) {
    /**
     * WEIRDO
     * if the following console.log is not here,
     * url in nodes is undefined!!!!????
     */
    setNodes(buildNodes({ store, data, loading }))
  }

  if (error) {
    console.log(error)
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return <Tree dimensions={dimensions} />
}

export default observer(TreeContainer)
