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
import { useQuery } from 'react-apollo-hooks'

import storeContext from '../../storeContext'
import query from './query'
import isNodeOpen from './isNodeOpen'
import Tree from './Tree'
import buildNodes from './nodes'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right-color: rgb(46, 125, 50);
  border-right-width: 1px;
  border-right-style: solid;
  border-left-color: rgb(46, 125, 50);
  border-left-width: 1px;
  border-left-style: solid;
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
    suspend: false,
    notifyOnNetworkStatusChange: true,
    variables: {
      isArt: openNodes.some(n => n[0] === 'Arten'),
      isArtKultur: openNodes.some(n => n[0] === 'Arten' && n[2] === 'Kulturen'),
      isGarten: isNodeOpen(openNodes, ['Gaerten']),
      isHerkunft: isNodeOpen(openNodes, ['Herkuenfte']),
      isLieferung: isNodeOpen(openNodes, ['Lieferungen']),
      isPerson: isNodeOpen(openNodes, ['Personen']),
      isSammlung: isNodeOpen(openNodes, ['Sammlungen']),
      isKultur: isNodeOpen(openNodes, ['Kulturen']),
      isWerteListe: isNodeOpen(openNodes, ['Werte-Listen']),
    },
  })

  useEffect(() => {
    setRefetch(refetch)
    // fetch on first load to show loading state
    setNodes(buildNodes({ store, data, loading }))
  }, [])

  // do not set nodes when data is empty
  // which happens while query is loading again
  if (Object.keys(data).length > 0) {
    setNodes(buildNodes({ store, data, loading }))
  }

  if (error) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return <Tree dimensions={dimensions} />
}

export default observer(TreeContainer)
