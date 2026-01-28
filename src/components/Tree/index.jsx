import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { interval, combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'
import { throttle } from 'rxjs/operators'
import { useDebouncedCallback } from 'use-debounce'
import { AutoSizer } from 'react-virtualized-auto-sizer'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { TreeSettings as Settings } from './Settings.jsx'
import { ApFilterContainer } from './ApFilter.jsx'
import { TreeList as List } from './List.jsx'
import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { tableFilter } from '../../utils/tableFilter.js'
import { notDeletedQuery } from '../../utils/notDeletedQuery.js'
import { buildNodes } from './nodes/index.js'

import styles from './index.module.css'

export const Tree = observer(() => {
  const store = useContext(MobxStoreContext)
  const { db, user, apFilter } = store
  const {
    art: artFilter,
    herkunft: herkunftFilter,
    sammlung: sammlungFilter,
    garten: gartenFilter,
    kultur: kulturFilter,
    teilkultur: teilkulturFilter,
    zaehlung: zaehlungFilter,
    lieferung: lieferungFilter,
    // sammel_lieferung: sammelLieferungFilter,
    event: eventFilter,
    person: personFilter,
  } = store.filter
  const { activeNodeArray: aNAProxy, openNodes: openNodesProxy } = store.tree
  const aNA = getSnapshot(aNAProxy)
  const openNodes = getSnapshot(openNodesProxy)

  const [nodes, setNodes] = useState([])
  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
    userRole: undefined,
  })
  const { userPersonOption, userRole } = dataState

  const buildMyNodes = async () => {
    //console.log('buildNodes building tree nodes')
    const nodes = await buildNodes({
      store,
      userPersonOption,
      userRole,
    })
    setNodes(nodes)
  }

  // useEffect(() => {
  //   // when apFilter changes to true, remove all open ap nodes from openNodes
  //   const openArtNodes = openNodes.filter(
  //     (n) => n[0] === 'Arten' && n.length === 2,
  //   )
  // }, [apFilter, openNodes])

  const buildMyNodesDebounced = useDebouncedCallback(buildMyNodes, 100)

  useEffect(() => {
    // need to rebuild nodes when options change
    const userPersonOptionsObservable = db
      .get('person_option')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns([
        'tree_kultur',
        'tree_teilkultur',
        'tree_zaehlung',
        'tree_lieferung',
        'tree_event',
      ])
    const userRoleObservable = db
      .get('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    // need subscription to all tables that provokes treeBuild on next
    const artsObservable = db
      .get('art')
      .query(...tableFilter({ store, table: 'art' }))
      .observeWithColumns(['ae_id'])
    const herkunftsObservable = db
      .get('herkunft')
      .query(...tableFilter({ store, table: 'herkunft' }))
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const sammlungsObservable = db
      .get('sammlung')
      .query(...tableFilter({ store, table: 'sammlung' }))
      .observeWithColumns([
        'art_id',
        'person_id',
        'herkunft_id',
        'datum',
        'geplant',
      ])
    const gartensObservable = db
      .get('garten')
      .query(...tableFilter({ store, table: 'garten' }))
      .observeWithColumns(['name', 'person_id'])
    const kultursObservable = db
      .get('kultur')
      .query(...tableFilter({ store, table: 'kultur' }))
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const teilkultursObservable = db
      .get('teilkultur')
      .query(...tableFilter({ store, table: 'teilkultur' }))
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const zaehlungsObservable = db
      .get('zaehlung')
      .query(...tableFilter({ store, table: 'zaehlung' }))
      .observeWithColumns(['datum', 'prognose'])
    const lieferungsObservable = db
      .get('lieferung')
      .query(...tableFilter({ store, table: 'lieferung' }))
      .observeWithColumns([
        'datum',
        'anzahl_pflanzen',
        'anzahl_auspflanzbereit',
      ])
    // const sammelLieferungsObservable = db
    //   .get('sammel_lieferung')
    //   .query(...tableFilter({ store, table: 'sammel_lieferung' }))
    //   .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const eventsObservable = db
      .get('event')
      .query(...tableFilter({ store, table: 'event' }))
      .observeWithColumns(['datum', 'beschreibung'])
    const personsObservable = db
      .get('person')
      .query(...tableFilter({ store, table: 'person' }))
      .observeWithColumns(['vorname', 'name'])
    const kulturOptionsObservable = db
      .get('kultur_option')
      .query(notDeletedQuery)
      .observeWithColumns(['tk'])
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      userRoleObservable,
      artsObservable,
      eventsObservable,
      gartensObservable,
      herkunftsObservable,
      kultursObservable,
      lieferungsObservable,
      personsObservable,
      // sammelLieferungsObservable,
      sammlungsObservable,
      teilkultursObservable,
      zaehlungsObservable,
      kulturOptionsObservable,
    ]).pipe(throttle(() => interval(100)))
    const subscription = combinedObservables.subscribe(
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      ([[userPersonOption], [userRole], ...rest]) => {
        //console.log('Tree data-useEffect ordering rebuild')
        setDataState({ userPersonOption, userRole })
        buildMyNodesDebounced()
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [buildMyNodesDebounced, db, store, user.uid])

  useEffect(() => {
    //console.log('Tree second useEffect ordering nodes build')
    buildMyNodesDebounced()
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
    // ...Object.values(sammelLieferungFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(eventFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(personFilter),
    // need to rebuild tree on activeNodeArray changes
    aNA,
    // need to rebuild tree on openNodes changes
    openNodes,
    openNodes.length,
    user.uid,
    apFilter,
  ])

  //console.log('Tree rendering', { openNodes, nodes })

  return (
    <ErrorBoundary>
      <div className={`tree-root ${styles.container}`}>
        <ApFilterContainer />
        <Settings />
        <AutoSizer
          renderProp={({ height, width }) => (
            <List
              nodes={nodes}
              width={width}
              height={height}
              userRole={userRole}
            />
          )}
        />
      </div>
    </ErrorBoundary>
  )
})
