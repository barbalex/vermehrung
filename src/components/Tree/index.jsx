import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { interval, combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'
import { throttle } from 'rxjs/operators'
import { useDebouncedCallback } from 'use-debounce'
import { AutoSizer } from 'react-virtualized-auto-sizer'

import {
  dbAtom,
  userAtom,
  apFilterAtom,
  activeNodeArrayAtom,
  openNodesAtom,
  filterArtAtom,
  filterHerkunftAtom,
  filterSammlungAtom,
  filterGartenAtom,
  filterKulturAtom,
  filterTeilkulturAtom,
  filterZaehlungAtom,
  filterLieferungAtom,
  filterEventAtom,
  filterPersonAtom,
} from '../../store/index.js'
import { TreeSettings as Settings } from './Settings.jsx'
import { ApFilterContainer } from './ApFilter.jsx'
import { TreeList as List } from './List.jsx'
import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { tableFilter } from '../../utils/tableFilter.js'
import { notDeletedQuery } from '../../utils/notDeletedQuery.js'
import { buildNodes } from './nodes/index.js'

import styles from './index.module.css'

export const Tree = () => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const apFilter = useAtomValue(apFilterAtom)
  const aNA = useAtomValue(activeNodeArrayAtom)
  const openNodes = useAtomValue(openNodesAtom)
  const artFilter = useAtomValue(filterArtAtom)
  const herkunftFilter = useAtomValue(filterHerkunftAtom)
  const sammlungFilter = useAtomValue(filterSammlungAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)
  const kulturFilter = useAtomValue(filterKulturAtom)
  const teilkulturFilter = useAtomValue(filterTeilkulturAtom)
  const zaehlungFilter = useAtomValue(filterZaehlungAtom)
  const lieferungFilter = useAtomValue(filterLieferungAtom)
  const eventFilter = useAtomValue(filterEventAtom)
  const personFilter = useAtomValue(filterPersonAtom)

  const [nodes, setNodes] = useState([])
  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
    userRole: undefined,
  })
  const { userPersonOption, userRole } = dataState

  const buildMyNodes = async () => {
    //console.log('buildNodes building tree nodes')
    const nodes = await buildNodes({
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
      .query(...tableFilter({ table: 'art' }))
      .observeWithColumns(['ae_id'])
    const herkunftsObservable = db
      .get('herkunft')
      .query(...tableFilter({ table: 'herkunft' }))
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const sammlungsObservable = db
      .get('sammlung')
      .query(...tableFilter({ table: 'sammlung' }))
      .observeWithColumns([
        'art_id',
        'person_id',
        'herkunft_id',
        'datum',
        'geplant',
      ])
    const gartensObservable = db
      .get('garten')
      .query(...tableFilter({ table: 'garten' }))
      .observeWithColumns(['name', 'person_id'])
    const kultursObservable = db
      .get('kultur')
      .query(...tableFilter({ table: 'kultur' }))
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const teilkultursObservable = db
      .get('teilkultur')
      .query(...tableFilter({ table: 'teilkultur' }))
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const zaehlungsObservable = db
      .get('zaehlung')
      .query(...tableFilter({ table: 'zaehlung' }))
      .observeWithColumns(['datum', 'prognose'])
    const lieferungsObservable = db
      .get('lieferung')
      .query(...tableFilter({ table: 'lieferung' }))
      .observeWithColumns([
        'datum',
        'anzahl_pflanzen',
        'anzahl_auspflanzbereit',
      ])
    // const sammelLieferungsObservable = db
    //   .get('sammel_lieferung')
    //   .query(...tableFilter({ table: 'sammel_lieferung' }))
    //   .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const eventsObservable = db
      .get('event')
      .query(...tableFilter({ table: 'event' }))
      .observeWithColumns(['datum', 'beschreibung'])
    const personsObservable = db
      .get('person')
      .query(...tableFilter({ table: 'person' }))
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
  }, [buildMyNodesDebounced, db, user.uid])

  useEffect(() => {
    //console.log('Tree second useEffect ordering nodes build')
    buildMyNodesDebounced()
  }, [
    buildMyNodesDebounced,
    // need to rebuild tree if any filter value changes
    artFilter,
    herkunftFilter,
    sammlungFilter,
    gartenFilter,
    kulturFilter,
    teilkulturFilter,
    zaehlungFilter,
    lieferungFilter,
    eventFilter,
    personFilter,
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
}
