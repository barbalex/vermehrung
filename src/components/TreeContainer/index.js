/**
 * This component only loads the data
 * Reason: apollo used to return no data while refreshing
 * This was bad for the tree. Very hard to build a good user experience.
 * So the data was passed as props to the Tree component.
 * Which can decide not to update nodes if the query is loading
 * but rather use the previous value
 */
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext, useQuery } from '../../models/reactUtils'
import query from './query'
import Tree from './Tree'
import setHasuraClaims from '../../utils/setHasuraClaims'

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
  const { user } = store
  const { setRefetch, setLoading, queryVariables } = store.tree

  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click
  const { error, loading, query: treeQuery } = useQuery(query, {
    variables: queryVariables,
  })

  useEffect(() => {
    setRefetch(treeQuery.refetch)
    // do not add treeQuery.refetch as it changes on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  // 2020.06.02: not in use
  // because it prevented newly loaded nodes to appear
  /*useEffect(() => {
    if (nodesToAddRaw.length) {
      setNodes([...nodes, ...nodesToAddRaw])
      setNodesToAdd([])
    }
  }, [nodes, nodesToAddRaw, setNodesToAdd])*/

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

  return <Tree />
}

export default observer(TreeContainer)
