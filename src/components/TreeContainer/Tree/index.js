import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'

import ErrorBoundary from '../../ErrorBoundary'
import storeContext from '../../../storeContext'
import Row from './Row'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
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
  const { activeNodeArray: aNA, nodesSorted: nodes } = store.tree

  //console.log('Tree, nodesSorted:', nodes)

  const listRef = React.createRef()

  useEffect(() => {
    const index = findIndex(nodes, node => isEqual(node.url, aNA))
    if (index > -1) listRef.current.scrollToItem(index)
  }, [aNA, nodes])

  let height = 250
  if (dimensions && dimensions.height) {
    height = dimensions.height
  }
  let width = 250
  if (dimensions && dimensions.width) {
    width = dimensions.width
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
