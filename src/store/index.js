import { atom, createStore } from 'jotai'
import { sortBy, isEqual } from 'es-toolkit'
import localForage from 'localforage'
import { v1 as uuidv1 } from 'uuid'

import { initialFilterValues } from './Filter/initialValues.js'
import emptyValues from './Filter/emptyValues.js'
import { emptyHash } from './Filter/emptyHash.js'

import { activeFormFromActiveNodeArray } from '../utils/activeFormFromActiveNodeArray.js'
import { artIdInUrl } from '../utils/artIdInUrl.js'
import { herkunftIdInUrl } from '../utils/herkunftIdInUrl.js'
import { gartenIdInUrl } from '../utils/gartenIdInUrl.js'
import { kulturIdInUrl } from '../utils/kulturIdInUrl.js'
import { anLieferungIdInUrl } from '../utils/anLieferungIdInUrl.js'
import { eventIdInUrl } from '../utils/eventIdInUrl.js'
import { ausLieferungIdInUrl } from '../utils/ausLieferungIdInUrl.js'
import { lieferungIdInUrl } from '../utils/lieferungIdInUrl.js'
import { teilkulturIdInUrl } from '../utils/teilkulturIdInUrl.js'
import { personIdInUrl } from '../utils/personIdInUrl.js'
import { sammelLieferungIdInUrl } from '../utils/sammelLieferungIdInUrl.js'
import { sammlungIdInUrl } from '../utils/sammlungIdInUrl.js'
import { kulturIdOfAnLieferungInUrl } from '../utils/kulturIdOfAnLieferungInUrl.js'
import { kulturIdOfAusLieferungInUrl } from '../utils/kulturIdOfAusLieferungInUrl.js'
import { zaehlungIdInUrl } from '../utils/zaehlungIdInUrl.js'

// Plain atoms with async hydration from localforage, mirroring the former
// mst-persist behaviour: values are always readable synchronously (unlike
// atomWithStorage with async storage, whose value is a Promise until
// hydration completes), persisted state appears shortly after boot,
// changes are written back as they happen.
// Hydration is started once by initiateApp via hydratePersistedAtoms().
const persistedAtoms = []

const persistedAtom = (key, initialValue) => {
  const baseAtom = atom(initialValue)
  persistedAtoms.push({ key: `vermehrung:${key}`, baseAtom })
  return baseAtom
}

export const hydratePersistedAtoms = async () => {
  // hydrate in parallel and never let a slow/blocked storage
  // keep the app from booting
  await Promise.all(
    persistedAtoms.map(async ({ key, baseAtom }) => {
      try {
        const stored = await localForage.getItem(key)
        if (stored !== null && stored !== undefined) {
          store.set(baseAtom, stored)
        }
      } catch (error) {
        console.error(`hydratePersistedAtoms failed for ${key}:`, error)
      }
      // subscribe after hydration so the initial value is not written back
      store.sub(baseAtom, () => {
        localForage.setItem(key, store.get(baseAtom)).catch((error) => {
          console.error(`persisting ${key} failed:`, error)
        })
      })
    }),
  )
}

export const store = createStore()

// every table tracks when it was last updated, in seconds since 1.1.1970
// why? so data to be updated can be efficiently extracted
// from the live queries
export const tables = [
  'ae_art',
  'art',
  'art_file',
  'art_qk',
  'av',
  'event',
  'garten',
  'garten_file',
  'gv',
  'herkunft',
  'herkunft_file',
  'kultur',
  'kultur_file',
  'kultur_option',
  'kultur_qk',
  'lieferung',
  'lieferung_file',
  'person',
  'person_file',
  'person_option',
  'sammel_lieferung',
  'sammlung',
  'sammlung_file',
  'teilkultur',
  'teilzaehlung',
  'user_role',
  'zaehlung',
]

// === simple flags ===
export const apFilterAtom = persistedAtom('apFilter', true)
export const docFilterAtom = persistedAtom('docFilter', '')
export const docsCountAtom = persistedAtom('docsCount', null)
export const docsFilteredCountAtom = persistedAtom('docsFilteredCount', null)
export const isPrintAtom = persistedAtom('isPrint', false)
export const singleColumnViewAtom = persistedAtom('singleColumnView', false)
export const showTreeInSingleColumnViewAtom = persistedAtom(
  'showTreeInSingleColumnView',
  false,
)
export const diffConflictAtom = persistedAtom('diffConflict', true)
export const initiallyQueryingAtom = persistedAtom('initiallyQuerying', '')
export const wsReconnectCountAtom = persistedAtom('wsReconnectCount', 0)
// online state is deliberately not persisted: it is redetermined on boot
export const onlineAtom = atom(true)
export const shortTermOnlineAtom = atom(true)
// on startup need to wait with showing data
// until hasura claims have been added
// this is _after_ user is set so need another variable
export const gettingAuthUserAtom = atom(true)
export const authorizingAtom = atom(true)

// === volatile singletons ===
export const userAtom = atom({})
export const firebaseAuthAtom = atom(null)
export const gqlWsClientAtom = atom(null)
export const dbAtom = atom(null)
export const gqlClientAtom = atom(null)
// navigate is never read reactively, so it is kept as a plain module value.
// Storing a function in a jotai primitive atom would make jotai call it
// (updater semantics, like React setState) when setting it
let navigateFn
export const setNavigate = (val) => {
  navigateFn = val
}
export const getNavigate = () => navigateFn

// === tree ===
export const activeNodeArrayAtom = persistedAtom('tree:activeNodeArray', [])
// lastActiveNodeArray is needed to keep the last clicked arrow known
// so it does not jump
export const lastActiveNodeArrayAtom = persistedAtom(
  'tree:lastActiveNodeArray',
  [],
)
export const openNodesAtom = persistedAtom('tree:openNodes', [])
export const widthInPercentOfScreenAtom = persistedAtom(
  'tree:widthInPercentOfScreen',
  33,
)

export const singleRowHeightAtom = atom((get) => {
  const isMobile =
    get(showTreeInSingleColumnViewAtom) && get(singleColumnViewAtom)
  return isMobile ? 30 : 23
})

export const addOpenNodes = (nodes) => {
  // need set to ensure contained arrays are unique
  const set = new Set(
    [...store.get(openNodesAtom), ...nodes].map(JSON.stringify),
  )
  store.set(openNodesAtom, Array.from(set).map(JSON.parse))
}

export const addOpenNode = (url) => {
  // add all parent nodes
  const addedOpenNodes = []
  for (let i = 1; i <= url.length; i++) {
    addedOpenNodes.push(url.slice(0, i))
  }
  addOpenNodes(addedOpenNodes)
}

export const setOpenNodes = (val) => {
  // need set to ensure contained arrays are unique
  const set = new Set(val.map(JSON.stringify))
  store.set(openNodesAtom, Array.from(set).map(JSON.parse))
}

export const removeOpenNode = (val) => {
  store.set(
    openNodesAtom,
    store.get(openNodesAtom).filter((n) => !isEqual(n, val)),
  )
}

export const removeOpenNodeWithChildren = (url) => {
  store.set(
    openNodesAtom,
    store.get(openNodesAtom).filter((n) => {
      const urlPartWithEqualLength = n.slice(0, url.length)
      return !isEqual(urlPartWithEqualLength, url)
    }),
  )
}

export const setActiveNodeArray = (val, nonavigate) => {
  store.set(activeNodeArrayAtom, val)
  if (!nonavigate) {
    getNavigate()?.(`/Vermehrung/${val.join('/')}`)
    addOpenNode(val)
  }
}

export const setLastActiveNodeArray = (val) => {
  store.set(lastActiveNodeArrayAtom, val)
}

export const setWidthInPercentOfScreen = (val) => {
  store.set(widthInPercentOfScreenAtom, val)
}

// === filter ===
const filterTableNames = [
  'art',
  'event',
  'garten',
  'herkunft',
  'kultur',
  'kultur_option',
  'lieferung',
  'sammel_lieferung',
  'person',
  'sammlung',
  'zaehlung',
  'teilkultur',
  'teilzaehlung',
]

export const filterShowAtom = persistedAtom('filter:show', false)

export const filterTableAtoms = Object.fromEntries(
  filterTableNames.map((table) => [
    table,
    persistedAtom(`filter:${table}`, initialFilterValues[table]),
  ]),
)
export const filterArtAtom = filterTableAtoms.art
export const filterEventAtom = filterTableAtoms.event
export const filterGartenAtom = filterTableAtoms.garten
export const filterHerkunftAtom = filterTableAtoms.herkunft
export const filterKulturAtom = filterTableAtoms.kultur
export const filterKulturOptionAtom = filterTableAtoms.kultur_option
export const filterLieferungAtom = filterTableAtoms.lieferung
export const filterSammelLieferungAtom = filterTableAtoms.sammel_lieferung
export const filterPersonAtom = filterTableAtoms.person
export const filterSammlungAtom = filterTableAtoms.sammlung
export const filterZaehlungAtom = filterTableAtoms.zaehlung
export const filterTeilkulturAtom = filterTableAtoms.teilkultur
export const filterTeilzaehlungAtom = filterTableAtoms.teilzaehlung

export const tableIsFilteredAtom = (table) =>
  atom((get) => {
    const empty = emptyHash[table]
    return Object.entries(get(filterTableAtoms[table])).some(
      ([key, value]) => value !== empty[key],
    )
  })

export const filterFilteredAtom = atom((get) =>
  filterTableNames.some((table) => get(tableIsFilteredAtom(table))),
)

export const setFilterValue = ({ table, key, value }) => {
  const tableAtom = filterTableAtoms[table]
  store.set(tableAtom, { ...store.get(tableAtom), [key]: value })
}

export const setFilterShow = (val) => {
  store.set(filterShowAtom, val)
}

export const emptyFilterTable = ({ table }) => {
  store.set(filterTableAtoms[table], emptyValues[table])
}

export const emptyFilter = () => {
  filterTableNames.forEach((table) => {
    store.set(filterTableAtoms[table], emptyValues[table])
  })
}

// === errors ===
// structure: error.table.field
// need this because operations work on top level
// so errors need to be managed there too
export const defaultErrors = Object.fromEntries(
  [
    'art',
    'event',
    'garten',
    'herkunft',
    'kultur',
    'lieferung',
    'person',
    'sammel_lieferung',
    'sammlung',
    'teilkultur',
    'teilzaehlung',
    'zaehlung',
  ].map((table) => [table, {}]),
)
export const errorsAtom = atom(defaultErrors)

export const setError = ({ path, value }) => {
  const [table, field] = path.split('.')
  const tableErrors = store.get(errorsAtom)[table] ?? {}
  store.set(errorsAtom, {
    ...store.get(errorsAtom),
    [table]: { ...tableErrors, [field]: value },
  })
}

export const unsetError = (path) => {
  const [table, field] = path.split('.')
  const errors = store.get(errorsAtom)
  const tableErrors = errors[table] ?? {}
  if (field) {
    const { [field]: _removed, ...rest } = tableErrors
    store.set(errorsAtom, { ...errors, [table]: rest })
  } else {
    store.set(errorsAtom, { ...errors, [table]: {} })
  }
}

// === notifications ===
export const notificationsAtom = atom([])

export const removeNotificationById = (id) => {
  store.set(
    notificationsAtom,
    store.get(notificationsAtom).filter((n) => n.id !== id),
  )
}

export const addNotification = (valPassed) => {
  // do not stack same messages
  const notificationsWithSameMessage = store
    .get(notificationsAtom)
    .filter((n) => n.message === valPassed.message)
  if (notificationsWithSameMessage.length > 0) return

  const val = {
    // set default values
    id: uuidv1(),
    time: Date.now(),
    duration: 10000, // standard value: 10000
    dismissable: true,
    allDismissable: true,
    type: 'error',
    // overwrite with passed in ones:
    ...valPassed,
  }
  store.set(notificationsAtom, [...store.get(notificationsAtom), val])
  // remove after duration
  setTimeout(() => {
    removeNotificationById(val.id)
  }, val.duration)
  return val.id
}

export const removeAllNotifications = () => {
  store.set(notificationsAtom, [])
}

// === queued queries ===
/**
 * This is a queue of all queries
 * When online they are immediately executed by the observer
 * When offline they remain queued until connectivity is back
 */
export const queuedQueriesAtom = persistedAtom('queuedQueries', [])
export const retryTickAtom = atom(0)
// the queue observer deliberately tracks only the SIZE of the queue
// (plus online state and the retry tick), not its contents:
// like the former MST reaction, deferring a failed query to the end
// must not re-trigger execution - it waits for the next tick instead
export const queueSizeAtom = atom(0)

export const queuedQueriesSortedAtom = atom((get) =>
  sortBy(get(queuedQueriesAtom), ['time']),
)

export const addQueuedQuery = (valPassed) => {
  const val = {
    // set default values
    id: uuidv1(),
    time: Date.now(),
    // overwrite with passed in ones:
    ...valPassed,
  }
  const queue = [...store.get(queuedQueriesAtom), val]
  store.set(queuedQueriesAtom, queue)
  store.set(queueSizeAtom, queue.length)
}

export const removeQueuedQueryById = (id) => {
  const queue = store.get(queuedQueriesAtom).filter((q) => q.id !== id)
  store.set(queuedQueriesAtom, queue)
  store.set(queueSizeAtom, queue.length)
}

export const deferQueuedQueryById = (id) => {
  store.set(
    queuedQueriesAtom,
    store
      .get(queuedQueriesAtom)
      .map((q) => (q.id === id ? { ...q, time: Date.now() } : q)),
  )
}

// === watermarks ===
export const lastUpdatedAtom = persistedAtom(
  'lastUpdated',
  Object.fromEntries(tables.map((table) => [table, 0])),
)

export const setLastUpdated = ({ table, val: valPassed }) => {
  // 1. enable not having to pass val
  //    thus set standard value
  // 2. substract some time to account for:
  //    - server inserting winner
  //    - live query fetching the data
  //    too small value is bad (some data is never updated)
  //    too large value not so (too much data is checked for update)
  // 3. server sets seconds since 1.1.1970
  //    Date.now is MILLIseconds since 1.1.1970
  //    thus need to correct!
  const standardVal = Date.now() / 1000 - 50
  const val = valPassed ?? standardVal
  store.set(lastUpdatedAtom, { ...store.get(lastUpdatedAtom), [table]: val })
}

export const tableLastUpdated = (table) => store.get(lastUpdatedAtom)[table]

// initially_queried flags are deliberately not persisted:
// initial queries are re-run on every boot
export const initiallyQueriedAtom = atom(
  Object.fromEntries(tables.map((table) => [table, false])),
)

export const setInitiallyQueried = ({ table }) => {
  store.set(initiallyQueriedAtom, {
    ...store.get(initiallyQueriedAtom),
    [table]: true,
  })
}

export const tableInitiallyQueried = (table) =>
  store.get(initiallyQueriedAtom)[table]

export const initialDataQueriedAtom = atom((get) => {
  const initiallyQueried = get(initiallyQueriedAtom)
  return tables.every((table) => initiallyQueried[table])
})

// === setters for flags and volatiles ===
export const setApFilter = (val) => store.set(apFilterAtom, val)
export const setDocFilter = (val) => store.set(docFilterAtom, val)
export const setDocsCount = (val) => store.set(docsCountAtom, val)
export const setDocsFilteredCount = (val) =>
  store.set(docsFilteredCountAtom, val)
export const setIsPrint = (val) => store.set(isPrintAtom, val)
export const setSingleColumnView = (val) => store.set(singleColumnViewAtom, val)
export const setShowTreeInSingleColumnView = (val) =>
  store.set(showTreeInSingleColumnViewAtom, val)
export const setDiffConflict = (val) => store.set(diffConflictAtom, val)
export const setInitiallyQuerying = (val) =>
  store.set(initiallyQueryingAtom, val)
export const incrementWsReconnectCount = () =>
  store.set(wsReconnectCountAtom, (store.get(wsReconnectCountAtom) ?? 0) + 1)
export const setOnline = (val) => store.set(onlineAtom, val)
export const setShortTermOnline = (val) => store.set(shortTermOnlineAtom, val)
export const setGettingAuthUser = (val) => store.set(gettingAuthUserAtom, val)
export const setAuthorizing = (val) => store.set(authorizingAtom, val)
export const setUser = (val) => store.set(userAtom, val || {})
export const setFirebaseAuth = (val) => {
  if (!store.get(firebaseAuthAtom)) {
    store.set(firebaseAuthAtom, val)
  }
}
export const setGqlClient = (val) => store.set(gqlClientAtom, val)
export const setGqlWsClient = (val) => store.set(gqlWsClientAtom, val)
export const setDb = (val) => store.set(dbAtom, val)

// === revert helpers ===
// used to revert offline operations if they fail
export const updateModelValue = async ({ table, id, field, value }) => {
  const db = store.get(dbAtom)
  // find model = row
  let row
  try {
    row = db.get(table).find(id).fetch()
  } catch {}
  if (row) {
    await db.write(async () => {
      await row.update((row) => {
        row[field] = value
      })
    })
  }
}

export const updateModelValues = async ({ table, id, values }) => {
  const db = store.get(dbAtom)
  // find model = row
  let row
  try {
    row = db.get(table).find(id).fetch()
  } catch {}
  await db.write(async () => {
    await row.update((row) => {
      Object.entries(values).forEach(([key, value]) => {
        row[key] = value
      })
    })
  })
}

// === derived from activeNodeArray ===
export const activeFormAtom = atom((get) =>
  activeFormFromActiveNodeArray(get(activeNodeArrayAtom)),
)
export const artIdInActiveNodeArrayAtom = atom((get) =>
  artIdInUrl(get(activeNodeArrayAtom)),
)
export const herkunftIdInActiveNodeArrayAtom = atom((get) =>
  herkunftIdInUrl(get(activeNodeArrayAtom)),
)
export const gartenIdInActiveNodeArrayAtom = atom((get) =>
  gartenIdInUrl(get(activeNodeArrayAtom)),
)
export const kulturIdInActiveNodeArrayAtom = atom((get) =>
  kulturIdInUrl(get(activeNodeArrayAtom)),
)
export const anLieferungIdInActiveNodeArrayAtom = atom((get) =>
  anLieferungIdInUrl(get(activeNodeArrayAtom)),
)
export const ausLieferungIdInActiveNodeArrayAtom = atom((get) =>
  ausLieferungIdInUrl(get(activeNodeArrayAtom)),
)
export const lieferungIdInActiveNodeArrayAtom = atom((get) =>
  lieferungIdInUrl(get(activeNodeArrayAtom)),
)
export const eventIdInActiveNodeArrayAtom = atom((get) =>
  eventIdInUrl(get(activeNodeArrayAtom)),
)
export const teilkulturIdInActiveNodeArrayAtom = atom((get) =>
  teilkulturIdInUrl(get(activeNodeArrayAtom)),
)
export const personIdInActiveNodeArrayAtom = atom((get) =>
  personIdInUrl(get(activeNodeArrayAtom)),
)
export const sammelLieferungIdInActiveNodeArrayAtom = atom((get) =>
  sammelLieferungIdInUrl(get(activeNodeArrayAtom)),
)
export const sammlungIdInActiveNodeArrayAtom = atom((get) =>
  sammlungIdInUrl(get(activeNodeArrayAtom)),
)
export const kulturIdOfAnLieferungInActiveNodeArrayAtom = atom((get) =>
  kulturIdOfAnLieferungInUrl(get(activeNodeArrayAtom)),
)
export const kulturIdOfAusLieferungInActiveNodeArrayAtom = atom((get) =>
  kulturIdOfAusLieferungInUrl(get(activeNodeArrayAtom)),
)
export const zaehlungIdInActiveNodeArrayAtom = atom((get) =>
  zaehlungIdInUrl(get(activeNodeArrayAtom)),
)

export const xxxIdInActiveNodeArrayAtoms = {
  artIdInActiveNodeArray: artIdInActiveNodeArrayAtom,
  herkunftIdInActiveNodeArray: herkunftIdInActiveNodeArrayAtom,
  gartenIdInActiveNodeArray: gartenIdInActiveNodeArrayAtom,
  kulturIdInActiveNodeArray: kulturIdInActiveNodeArrayAtom,
  anLieferungIdInActiveNodeArray: anLieferungIdInActiveNodeArrayAtom,
  ausLieferungIdInActiveNodeArray: ausLieferungIdInActiveNodeArrayAtom,
  lieferungIdInActiveNodeArray: lieferungIdInActiveNodeArrayAtom,
  eventIdInActiveNodeArray: eventIdInActiveNodeArrayAtom,
  teilkulturIdInActiveNodeArray: teilkulturIdInActiveNodeArrayAtom,
  personIdInActiveNodeArray: personIdInActiveNodeArrayAtom,
  sammelLieferungIdInActiveNodeArray: sammelLieferungIdInActiveNodeArrayAtom,
  sammlungIdInActiveNodeArray: sammlungIdInActiveNodeArrayAtom,
  kulturIdOfAnLieferungInActiveNodeArray:
    kulturIdOfAnLieferungInActiveNodeArrayAtom,
  kulturIdOfAusLieferungInActiveNodeArray:
    kulturIdOfAusLieferungInActiveNodeArrayAtom,
  zaehlungIdInActiveNodeArray: zaehlungIdInActiveNodeArrayAtom,
}
