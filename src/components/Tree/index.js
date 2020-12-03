import React, { useContext, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../models/reactUtils'
import Settings from './Settings'
import List from './List'
import ErrorBoundary from '../shared/ErrorBoundary'
import notDeletedOrHasConflictQuery from '../../utils/notDeletedOrHasConflictQuery'
import buildNodes from './nodeswm'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Tree = ({ width, height }) => {
  const store = useContext(StoreContext)
  const { db } = store
  const {
    art: artFilter,
    herkunft: herkunftFilter,
    sammlung: sammlungFilter,
    garten: gartenFilter,
  } = store.filter
  const {
    activeNodeArray: aNAProxy,
    openNodes: openNodesProxy,
    //nodes: storeNodes,
  } = store.tree
  const aNA = getSnapshot(aNAProxy)
  const openNodes = getSnapshot(openNodesProxy)

  const [nodes, setNodes] = useState([])

  const buildMyNodes = useCallback(async () => {
    const nodes = await buildNodes({ store })
    setNodes(nodes)
  }, [store])

  useEffect(() => {
    // need subscription to all tables that provokes treeBuild on next
    let subscriptions = {}
    subscriptions.art = db.collections
      .get('art')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['name'])
      .subscribe(buildMyNodes)
    subscriptions.herkunft = db.collections
      .get('herkunft')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
      .subscribe(buildMyNodes)
    subscriptions.sammlung = db.collections
      .get('sammlung')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns([
        'art_id',
        'person_id',
        'herkunft_id',
        'datum',
        'geplant',
      ])
      .subscribe(buildMyNodes)
    subscriptions.garten = db.collections
      .get('garten')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['name', 'person_id'])
      .subscribe(buildMyNodes)

    return () => {
      //console.log('Tree, useEffect, subscriptions:', subscriptions)
      Object.values(subscriptions).forEach((subscription) => {
        //console.log('Tree, useEffect, unsubscribe, subscription:', subscription)
        subscription.unsubscribe()
      })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammlungFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(gartenFilter),
    // need to rebuild tree on activeNodeArray changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    aNA,
    // need to rebuild tree on openNodes changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    openNodes,
  ])

  // what else to rerender on?

  console.log('Tree rendering')

  return (
    <ErrorBoundary>
      <Container>
        <Settings />
        {!!width && (
          <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
            {({ scrollableNodeRef, contentNodeRef }) => (
              <List
                nodes={nodes}
                scrollableNodeRef={scrollableNodeRef}
                contentNodeRef={contentNodeRef}
                width={width}
                height={height}
              />
            )}
          </SimpleBar>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Tree))
