import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'
import { useQuery } from 'react-apollo-hooks'

import ErrorBoundary from '../ErrorBoundary'
import storeContext from '../../storeContext'
import Row from './Row'
import buildNodes from './nodes'
import query from './query'

const Container = styled.div`
  height: 100%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
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
const StyledList = styled(List)`
  overflow-x: hidden !important;
`

const singleRowHeight = 23

const Tree = ({ dimensions }) => {
  const store = useContext(storeContext)
  const { activeNodeArray, setRefetch /*, setNodes*/ } = store.tree
  // 1. build list depending on path using react-window
  // 2. every node uses navigate to set url on click

  const { data, error: dataError, loading, refetch } = useQuery(query, {
    suspend: false,
  })
  useEffect(() => {
    setRefetch(refetch)
  }, [])

  const nodes = buildNodes({ store, data, loading })
  //setNodes(nodes)

  const listRef = React.createRef()

  useEffect(() => {
    const index = findIndex(nodes, node => isEqual(node.url, activeNodeArray))
    if (index > -1) listRef.current.scrollToItem(index)
  }, [activeNodeArray, nodes])

  let height = 250
  if (dimensions && dimensions.height && !isNaN(dimensions.height)) {
    height = dimensions.height
  }
  let width = 250
  if (dimensions && dimensions.width && !isNaN(dimensions.width)) {
    width = dimensions.width
  }

  if (dataError) {
    return `Fehler beim Laden der Daten: ${dataError.message}`
  }

  return (
    <ErrorBoundary>
      <Container>
        <StyledList
          height={height}
          itemCount={nodes.length}
          itemSize={singleRowHeight}
          width={width}
          ref={listRef}
        >
          {({ index, style }) => (
            <Row key={index} style={style} index={index} node={nodes[index]} />
          )}
        </StyledList>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Tree)
