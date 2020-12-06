import React, { useContext, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { forkJoin } from 'rxjs'

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
    kultur: kulturFilter,
    teilkultur: teilkulturFilter,
    zaehlung: zaehlungFilter,
    lieferung: lieferungFilter,
    sammel_lieferung: sammelLieferungFilter,
    event: eventFilter,
    person: personFilter,
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
    const artObservable = db.collections
      .get('art')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['name'])
    const herkunftObservable = db.collections
      .get('herkunft')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const sammlungObservable = db.collections
      .get('sammlung')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns([
        'art_id',
        'person_id',
        'herkunft_id',
        'datum',
        'geplant',
      ])
    const gartenObservable = db.collections
      .get('garten')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['name', 'person_id'])
    const kulturObservable = db.collections
      .get('kultur')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const teilkulturObservable = db.collections
      .get('teilkultur')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const zaehlungObservable = db.collections
      .get('zaehlung')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const lieferungObservable = db.collections
      .get('lieferung')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const sammel_lieferungObservable = db.collections
      .get('sammel_lieferung')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const eventObservable = db.collections
      .get('event')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['datum', 'beschreibung'])
    const personObservable = db.collections
      .get('person')
      .query(notDeletedOrHasConflictQuery)
      .observeWithColumns(['vorname', 'name'])
    const allCollectionsObservable = forkJoin([
      artObservable,
      herkunftObservable,
      sammlungObservable,
      gartenObservable,
      kulturObservable,
      teilkulturObservable,
      zaehlungObservable,
      lieferungObservable,
      sammel_lieferungObservable,
      eventObservable,
      personObservable,
    ])
    const subscription = allCollectionsObservable.subscribe(buildMyNodes)

    return () => subscription.unsubscribe()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(kulturFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(teilkulturFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(zaehlungFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(lieferungFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammelLieferungFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(eventFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(personFilter),
    // need to rebuild tree on activeNodeArray changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    aNA,
    // need to rebuild tree on openNodes changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    openNodes,
  ])

  // what else to rerender on?

  //console.log('Tree rendering, nodes:', nodes)

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
