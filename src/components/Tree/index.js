import React, { useContext, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { withResizeDetector } from 'react-resize-detector'
import SimpleBar from 'simplebar-react'
import { merge, interval } from 'rxjs'
import { throttle } from 'rxjs/operators'
import { useDebouncedCallback } from 'use-debounce'

import { StoreContext } from '../../models/reactUtils'
import Settings from './Settings'
import List from './List'
import ErrorBoundary from '../shared/ErrorBoundary'
import tableFilter from '../../utils/tableFilter'
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
  const { activeNodeArray: aNAProxy, openNodes: openNodesProxy } = store.tree
  const aNA = getSnapshot(aNAProxy)
  const openNodes = getSnapshot(openNodesProxy)

  const [nodes, setNodes] = useState([])

  const buildMyNodes = useCallback(async () => {
    console.log('buildNodes building tree nodes')
    const nodes = await buildNodes({ store })
    setNodes(nodes)
  }, [store])

  const buildMyNodesDebounced = useDebouncedCallback(buildMyNodes, 100)

  useEffect(() => {
    // need subscription to all tables that provokes treeBuild on next
    const artObservable = db.collections
      .get('art')
      .query(...tableFilter({ store, table: 'art' }))
      .observeWithColumns(['ae_id'])
    const herkunftObservable = db.collections
      .get('herkunft')
      .query(...tableFilter({ store, table: 'herkunft' }))
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const sammlungObservable = db.collections
      .get('sammlung')
      .query(...tableFilter({ store, table: 'sammlung' }))
      .observeWithColumns([
        'art_id',
        'person_id',
        'herkunft_id',
        'datum',
        'geplant',
      ])
    const gartenObservable = db.collections
      .get('garten')
      .query(...tableFilter({ store, table: 'garten' }))
      .observeWithColumns(['name', 'person_id'])
    const kulturObservable = db.collections
      .get('kultur')
      .query(...tableFilter({ store, table: 'kultur' }))
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const teilkulturObservable = db.collections
      .get('teilkultur')
      .query(...tableFilter({ store, table: 'teilkultur' }))
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const zaehlungObservable = db.collections
      .get('zaehlung')
      .query(...tableFilter({ store, table: 'zaehlung' }))
      .observeWithColumns([
        'datum',
        //'anzahl_pflanzen',
        //'anzahl_auspflanzbereit',
        //'anzahl_mutterpflanzen',
      ])
    const lieferungObservable = db.collections
      .get('lieferung')
      .query(...tableFilter({ store, table: 'lieferung' }))
      .observeWithColumns([
        'datum',
        'anzahl_pflanzen',
        'anzahl_auspflanzbereit',
      ])
    const sammel_lieferungObservable = db.collections
      .get('sammel_lieferung')
      .query(...tableFilter({ store, table: 'sammel_lieferung' }))
      .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const eventObservable = db.collections
      .get('event')
      .query(...tableFilter({ store, table: 'event' }))
      .observeWithColumns(['datum', 'beschreibung'])
    const personObservable = db.collections
      .get('person')
      .query(...tableFilter({ store, table: 'person' }))
      .observeWithColumns(['vorname', 'name'])
    const allCollectionsObservable = merge(
      ...[
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
      ],
    ).pipe(throttle(() => interval(100)))
    const subscription = allCollectionsObservable.subscribe(() => {
      console.log('Tree data-subscription ordering rebuild')
      buildMyNodesDebounced.callback()
    })

    return () => subscription.unsubscribe()
  }, [buildMyNodesDebounced, db.collections, store])

  useEffect(() => {
    console.log('Tree second useEffect ordering rebuild')
    buildMyNodesDebounced.callback()
  }, [
    buildMyNodesDebounced,
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
