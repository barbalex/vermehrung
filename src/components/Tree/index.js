import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../models/reactUtils'
import Row from './Row'
import Settings from './Settings'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const StyledList = styled(List)`
  margin-top: 5px;

  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    box-shadow: none;
  }

  @media print {
    display: none !important;
  }
`

const Tree = ({ width, height }) => {
  const store = useContext(StoreContext)
  const { singleRowHeight } = store.tree

  const { activeNodeArray: aNA, nodes } = store.tree

  const listRef = useRef(null)

  useEffect(() => {
    const index = findIndex(nodes, (node) => isEqual(node.url, aNA))
    if (index > -1 && listRef.current) listRef.current.scrollToItem(index)
  }, [aNA, listRef, nodes])

  return (
    <ErrorBoundary>
      <Container>
        <Settings />
        {!!width && (
          <SimpleBar style={{ maxHeight: height, height: '100%' }}>
            {({ scrollableNodeRef, contentNodeRef }) => (
              <StyledList
                height={height - 5}
                itemCount={nodes.length}
                itemSize={singleRowHeight}
                width={width}
                ref={listRef}
                innerRef={contentNodeRef}
                outerRef={scrollableNodeRef}
              >
                {({ index, style }) => (
                  <Row
                    key={index}
                    style={style}
                    index={index}
                    node={nodes[index]}
                    nodes={nodes}
                  />
                )}
              </StyledList>
            )}
          </SimpleBar>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Tree))
