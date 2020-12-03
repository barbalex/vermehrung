import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../models/reactUtils'
import Row from './Row'
import Settings from './Settings'
import ErrorBoundary from '../shared/ErrorBoundary'
import notDeletedOrHasConflictQuery from '../../utils/notDeletedOrHasConflictQuery'
import buildNodes from './nodeswm'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const StyledList = styled(List)`
  margin-top: 5px;

  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 0;
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
  const { db } = store
  const { art: artFilter, herkunft: herkunftFilter } = store.filter
  const {
    singleRowHeight,
    activeNodeArray: aNAProxy,
    openNodes: openNodesProxy,
    //nodes: storeNodes,
  } = store.tree
  const aNA = getSnapshot(aNAProxy)
  const openNodes = getSnapshot(openNodesProxy)

  const listRef = useRef(null)

  useEffect(() => {
    const index = findIndex(nodes, (node) => isEqual(node.url, aNA))
    if (index > -1 && listRef.current) listRef.current.scrollToItem(index)
  }, [aNA, listRef, nodes])

  const [nodes, setNodes] = useState([])
  const buildMyNodes = useCallback(async () => {
    const nodes = await buildNodes({ store })
    setNodes(nodes)
  }, [store])

  useEffect(() => {
    // need subscription to all tables that provokes treeBuild on next
    let unsubscribe = {}
    unsubscribe.art = db.collections
      .get('art')
      .query(notDeletedOrHasConflictQuery)
      .observe()
      .subscribe(buildMyNodes)
    return () => {
      Object.keys(unsubscribe).forEach((key) => unsubscribe[key]())
    }
  }, [buildMyNodes, db.collections])

  useEffect(() => {
    buildMyNodes()
  }, [
    buildMyNodes,
    // need to rebuild tree if any filter value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(artFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(herkunftFilter),
  ])

  useEffect(() => {
    buildMyNodes()
    // need to rebuild tree on activeNodeArray changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aNA])

  useEffect(() => {
    buildMyNodes()
    // need to rebuild tree on openNodes changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNodes])

  // what else?

  console.log('Tree', { nodes, aNA, openNodes })

  return (
    <ErrorBoundary>
      <Container>
        <Settings />
        {!!width && (
          <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
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
