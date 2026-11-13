import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { interval, combineLatest } from 'rxjs'
import { Q } from 'nitromelondb'
import { throttle } from 'rxjs/operators'

import { useDebouncedCallback } from '../../utils/useDebouncedCallback.ts'

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
  filterPersonAtom,
  artIdInActiveNodeArrayAtom,
  herkunftIdInActiveNodeArrayAtom,
  gartenIdInActiveNodeArrayAtom,
  kulturIdInActiveNodeArrayAtom,
  teilkulturIdInActiveNodeArrayAtom,
  zaehlungIdInActiveNodeArrayAtom,
  lieferungIdInActiveNodeArrayAtom,
  personIdInActiveNodeArrayAtom,
  sammlungIdInActiveNodeArrayAtom,
} from '../../store/index.ts'
import { TreeSettings as Settings } from './Settings.tsx'
import { ApFilterContainer } from './ApFilter.tsx'
import { TreeList as List } from './List.tsx'
import { TreeContextMenu } from './TreeContextMenu.tsx'
import { ApFilterWarning } from './ApFilterWarning.tsx'
import { ErrorBoundary } from '../shared/ErrorBoundary.tsx'
import { tableFilter } from '../../utils/tableFilter.ts'
import { notDeletedQuery } from '../../utils/notDeletedQuery.ts'
import { exists } from '../../utils/exists.ts'
import { buildNodes } from './nodes/index.ts'

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
  const personFilter = useAtomValue(filterPersonAtom)
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)
  const herkunftIdInActiveNodeArray = useAtomValue(
    herkunftIdInActiveNodeArrayAtom,
  )
  const gartenIdInActiveNodeArray = useAtomValue(gartenIdInActiveNodeArrayAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const teilkulturIdInActiveNodeArray = useAtomValue(
    teilkulturIdInActiveNodeArrayAtom,
  )
  const zaehlungIdInActiveNodeArray = useAtomValue(
    zaehlungIdInActiveNodeArrayAtom,
  )
  const lieferungIdInActiveNodeArray = useAtomValue(
    lieferungIdInActiveNodeArrayAtom,
  )
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)
  const sammlungIdInActiveNodeArray = useAtomValue(
    sammlungIdInActiveNodeArrayAtom,
  )

  const [nodes, setNodes] = useState<import('./nodes/index.ts').TreeNode[]>([])
  const [dataState, setDataState] = useState<{
    userPersonOption: import('../../dbModel.ts').PersonOption | undefined
    userRole: import('../../dbModel.ts').UserRole | undefined
  }>({
    userPersonOption: undefined,
    userRole: undefined,
  })
  const { userPersonOption, userRole } = dataState

  const buildMyNodes = async () => {
    //console.log('buildNodes building tree nodes')
    const nodes = await buildNodes({
      userPersonOption,
      userRole: (userRole as { name?: string } | undefined)?.name,
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
      ?.get('person_option')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns([
        'tree_kultur',
        'tree_teilkultur',
        'tree_zaehlung',
        'tree_lieferung',
      ])
    const userRoleObservable = db
      ?.get('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    // need subscription to all tables that provokes treeBuild on next
    const artsObservable = db
      ?.get('art')
      .query(...tableFilter({ table: 'art' }))
      .observeWithColumns(['ae_id'])
    // zaehlung labels sum their teilzaehlungs' numbers - observe those too
    const teilzaehlungsObservable = db
      ?.get('teilzaehlung')
      .query(...tableFilter({ table: 'teilzaehlung' }))
      .observeWithColumns([
        'anzahl_pflanzen',
        'anzahl_auspflanzbereit',
        'anzahl_mutterpflanzen',
      ])
    const herkunftsObservable = db
      ?.get('herkunft')
      .query(...tableFilter({ table: 'herkunft' }))
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const sammlungsObservable = db
      ?.get('sammlung')
      .query(...tableFilter({ table: 'sammlung' }))
      .observeWithColumns([
        'art_id',
        'person_id',
        'herkunft_id',
        'datum',
        'geplant',
      ])
    const gartensObservable = db
      ?.get('garten')
      .query(...tableFilter({ table: 'garten' }))
      .observeWithColumns(['name', 'person_id'])
    const kultursObservable = db
      ?.get('kultur')
      .query(...tableFilter({ table: 'kultur' }))
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const teilkultursObservable = db
      ?.get('teilkultur')
      .query(...tableFilter({ table: 'teilkultur' }))
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const zaehlungsObservable = db
      ?.get('zaehlung')
      .query(...tableFilter({ table: 'zaehlung' }))
      .observeWithColumns(['datum', 'prognose'])
    const bedarfsObservable = db
      ?.get('bedarf')
      .query(...tableFilter({ table: 'bedarf' }))
      .observeWithColumns(['jahr', 'beschreibung'])
    const lieferungsObservable = db
      ?.get('lieferung')
      .query(...tableFilter({ table: 'lieferung' }))
      .observeWithColumns([
        'datum',
        'anzahl_pflanzen',
        'anzahl_auspflanzbereit',
        'geplant',
      ])
    // const sammelLieferungsObservable = db
    //   .get('sammel_lieferung')
    //   .query(...tableFilter({ table: 'sammel_lieferung' }))
    //   .observeWithColumns(['datum', 'anzahl_pflanzen'])
    const personsObservable = db
      ?.get('person')
      .query(...tableFilter({ table: 'person' }))
      .observeWithColumns(['vorname', 'name'])
    const kulturOptionsObservable = db
      ?.get('kultur_option')
      .query(notDeletedQuery)
      .observeWithColumns(['tk'])
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      userRoleObservable,
      artsObservable,
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
      bedarfsObservable,
      teilzaehlungsObservable,
    ]).pipe(throttle(() => interval(100)))
    type Observed = [
      import('../../dbModel.ts').PersonOption[],
      import('../../dbModel.ts').UserRole[],
      import('../../dbModel.ts').Art[],
      import('../../dbModel.ts').Garten[],
      import('../../dbModel.ts').Herkunft[],
      import('../../dbModel.ts').Kultur[],
      import('../../dbModel.ts').Lieferung[],
      import('../../dbModel.ts').Person[],
      import('../../dbModel.ts').Sammlung[],
      import('../../dbModel.ts').Teilkultur[],
      import('../../dbModel.ts').Zaehlung[],
      import('../../dbModel.ts').KulturOption[],
      import('../../dbModel.ts').Bedarf[],
      import('../../dbModel.ts').Teilzaehlung[],
    ]
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<Observed>
    ).subscribe(([[userPersonOption], [userRole]]) => {
      //console.log('Tree data-useEffect ordering rebuild')
      setDataState({ userPersonOption, userRole })
      buildMyNodesDebounced()
    })

    return () => subscription?.unsubscribe?.()
  }, [buildMyNodesDebounced, db, user.uid])

  // buildNodes reads the active node only for folder visibility (the
  // top url segment) and - when a filter is set - to force-include the
  // active row id in the filtered queries (tableFilter). Both are
  // collapsed into two derived deps so navigating within a folder does
  // NOT rebuild the whole tree.
  const filterIsActive = (filter: Record<string, unknown>) =>
    Object.values(filter).some((value) => exists(value))
  const activeFolder = aNA[0]
  const activeIdsWhenFiltered = JSON.stringify({
    art: filterIsActive(artFilter) ? artIdInActiveNodeArray : null,
    herkunft:
      filterIsActive(herkunftFilter) ? herkunftIdInActiveNodeArray : null,
    garten: filterIsActive(gartenFilter) ? gartenIdInActiveNodeArray : null,
    kultur: filterIsActive(kulturFilter) ? kulturIdInActiveNodeArray : null,
    teilkultur:
      filterIsActive(teilkulturFilter) ? teilkulturIdInActiveNodeArray : null,
    zaehlung:
      filterIsActive(zaehlungFilter) ? zaehlungIdInActiveNodeArray : null,
    lieferung:
      filterIsActive(lieferungFilter) ? lieferungIdInActiveNodeArray : null,
    person: filterIsActive(personFilter) ? personIdInActiveNodeArray : null,
    sammlung:
      filterIsActive(sammlungFilter) ? sammlungIdInActiveNodeArray : null,
  })

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
    personFilter,
    // folder visibility + force-included active ids (see above)
    activeFolder,
    activeIdsWhenFiltered,
    // need to rebuild tree on openNodes changes
    openNodes,
    user.uid,
    apFilter,
  ])

  //console.log('Tree rendering', { openNodes, nodes })

  return (
    <ErrorBoundary>
      <div className={`tree-root ${styles.container}`}>
        <ApFilterContainer />
        <Settings />
        <ApFilterWarning />
        <div className={styles.listContainer}>
          <List
            nodes={nodes}
            userRole={(userRole as { name?: string } | undefined)?.name}
          />
        </div>
        <TreeContextMenu />
      </div>
    </ErrorBoundary>
  )
}
