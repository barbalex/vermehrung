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
import React, { useContext, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import { StoreContext, useQuery } from '../../models/reactUtils'
import query from './query'
import Tree from './Tree'
import buildNodes from './nodes'
import setHasuraClaims from '../../utils/setHasuraClaims'
import sortNodes from '../../utils/sortNodes'

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

const TreeContainer = () => {
  const store = useContext(StoreContext)
  const {
    user,
    userPerson,
    artFilter,
    eventFilter,
    gartenFilter,
    kulturFilter,
    herkunftFilter,
    personFilter,
    sammelLieferungFilter,
    sammlungFilter,
    lieferungFilter,
    teilkulturFilter,
    zaehlungFilter,
  } = store
  const { setRefetch, openNodes: openNodesRaw } = store.tree
  // need to extract pure openNodes
  // to force node building useEffect to run
  // when openNodes changes
  const openNodes = getSnapshot(openNodesRaw)

  const { user_role: role } = userPerson
  const isGardener = role === 'gaertner'

  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click
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
    isArt: openNodes.some((n) => n[0] === 'Arten'),
    //isEvent: openNodes.some((n) => n[0] === 'Events'),
    isArtKultur: openNodes.some((n) => n[0] === 'Arten' && n[2] === 'Kulturen'),
    isArtSammlung: openNodes.some(
      (n) => n[0] === 'Arten' && n[2] === 'Sammlungen',
    ),
    isGarten: openNodes.some((n) => n[0] === 'Gaerten'),
    isGartenKultur: openNodes.some(
      (n) => n[0] === 'Gaerten' && n[2] === 'Kulturen',
    ),
    isHerkunft: openNodes.some((n) => n[0] === 'Herkuenfte'),
    isHerkunftSammlung: openNodes.some(
      (n) => n[0] === 'Herkuenfte' && n[2] === 'Sammlungen',
    ),
    isLieferung: openNodes.some((n) => n[0] === 'Lieferungen'),
    isSammelLieferung: openNodes.some((n) => n[0] === 'Sammel-Lieferungen'),
    isPerson: openNodes.some((n) => n[0] === 'Personen'),
    isPersonGarten: openNodes.some(
      (n) => n[0] === 'Personen' && n[2] === 'Gaerten',
    ),
    isPersonGartenKultur: openNodes.some(
      (n) => n[0] === 'Personen' && n[2] === 'Gaerten' && n[4] === 'Kulturen',
    ),
    isPersonSammlung: openNodes.some(
      (n) => n[0] === 'Personen' && n[2] === 'Sammlungen',
    ),
    isPersonLieferung: openNodes.some(
      (n) => n[0] === 'Personen' && n[2] === 'Lieferungen',
    ),
    isSammlung: openNodes.some((n) => n[0] === 'Sammlungen'),
    isSammlungLieferung: openNodes.some(
      (n) => n[0] === 'Sammlungen' && n[2] === 'Aus-Lieferungen',
    ),
    isSammlungLieferungKultur: openNodes.some(
      (n) =>
        n[0] === 'Sammlungen' &&
        n[2] === 'Aus-Lieferungen' &&
        n[4] === 'Kulturen',
    ),
    //isTeilkultur: openNodes.some((n) => n[0] === 'Teilkulturen'),
    isKultur: openNodes.some((n) => n[0] === 'Kulturen'),
    //isKulturAnLieferung: openNodes.some(
    //  (n) => n[0] === 'Kulturen' && n[2] === 'An-Lieferungen',
    //),
    //isKulturAusLieferung: openNodes.some(
    //  (n) => n[0] === 'Kulturen' && n[2] === 'Aus-Lieferungen',
    //),
    //isWerteListe: openNodes.some((n) => n[0] === 'Werte-Listen'),
    isGardener,
  }
  const { error, loading, query: treeQuery } = useQuery(query, {
    variables,
  })

  useEffect(() => {
    setRefetch(treeQuery.refetch)
    // do not add treeQuery.refetch as it changes on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /*const [nodes, setNodes] = useState([])
  useEffect(() => {
    if (!data && loading) {
      // fetch on first load to show loading state
      setNodes(buildNodes({ store, loading, role }))
    }
    // do not set nodes when data is empty
    // which happens while query is loading again
    if (!loading && data && Object.keys(data).length > 0) {
      setNodes(
        buildNodes({ store, loading, role }).filter(
          (node) => node.id !== 'loadingNode',
        ),
      )
    }
  }, [data, loading, openNodes, role, store])*/
  const nodes = buildNodes({ store, loading, role })
  console.log('TreeContainer rendering', {
    loading,
    openNodes,
    nodes,
  })
  // 2020.06.02: not in use
  // because it prevented newly loaded nodes to appear
  /*useEffect(() => {
    if (nodesToAddRaw.length) {
      setNodes([...nodes, ...nodesToAddRaw])
      setNodesToAdd([])
    }
  }, [nodes, nodesToAddRaw, setNodesToAdd])*/

  const nodesSorted = useMemo(() => sortNodes(nodes), [nodes])

  if (error) {
    console.log(error)
    // if JWT expired, renew
    if (error.message.includes('JWTExpired')) {
      console.log('TreeContainer, JWT expired, will set hasura claims anew')
      setHasuraClaims({ store, user })
    }
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return <Tree nodes={nodesSorted} />
}

export default observer(TreeContainer)
