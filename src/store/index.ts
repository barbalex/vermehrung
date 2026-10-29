import { atom, createStore, type Atom, type PrimitiveAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { sortBy, isEqual } from 'es-toolkit'
import localForage from 'localforage'
import { v7 as uuidv7 } from 'uuid'
import type { Database, Model } from '@nozbe/watermelondb'
import type { Auth } from 'firebase/auth'

import { initialFilterValues } from './Filter/initialValues.ts'
import emptyValues from './Filter/emptyValues.ts'
import { emptyHash } from './Filter/emptyHash.ts'

import { activeFormFromActiveNodeArray } from '../utils/activeFormFromActiveNodeArray.ts'
import { artIdInUrl } from '../utils/artIdInUrl.ts'
import { herkunftIdInUrl } from '../utils/herkunftIdInUrl.ts'
import { gartenIdInUrl } from '../utils/gartenIdInUrl.ts'
import { kulturIdInUrl } from '../utils/kulturIdInUrl.ts'
import { anLieferungIdInUrl } from '../utils/anLieferungIdInUrl.ts'
import { bedarfIdInUrl } from '../utils/bedarfIdInUrl.ts'
import { eventIdInUrl } from '../utils/eventIdInUrl.ts'
import { ausLieferungIdInUrl } from '../utils/ausLieferungIdInUrl.ts'
import { lieferungIdInUrl } from '../utils/lieferungIdInUrl.ts'
import { teilkulturIdInUrl } from '../utils/teilkulturIdInUrl.ts'
import { personIdInUrl } from '../utils/personIdInUrl.ts'
import { sammelLieferungIdInUrl } from '../utils/sammelLieferungIdInUrl.ts'
import { sammlungIdInUrl } from '../utils/sammlungIdInUrl.ts'
import { kulturIdOfAnLieferungInUrl } from '../utils/kulturIdOfAnLieferungInUrl.ts'
import { kulturIdOfAusLieferungInUrl } from '../utils/kulturIdOfAusLieferungInUrl.ts'
import { zaehlungIdInUrl } from '../utils/zaehlungIdInUrl.ts'
import { splitObjectNameFromActiveNodeArray } from '../utils/splitObjectNameFromActiveNodeArray.ts'
import { breadcrumbsEnabled } from '../utils/breadcrumbsEnabled.ts'
import type { ApiClient } from '../utils/apiTypes.ts'

/** the user as the app uses it: the firebase auth user, loosely */
export interface User {
  uid?: string | null
  email?: string | null
  /** the firebase auth user object is stored as-is */
  getIdToken?: (forceRefresh?: boolean) => Promise<string>
  [key: string]: unknown
}

export interface Notification {
  id: string
  message: string
  title?: string
  info?: string
  actionLabel?: string
  actionName?: string
  actionArgument?: string
  time: number
  /** ms until auto-removal */
  duration: number
  dismissable: boolean
  allDismissable: boolean
  type: 'error' | 'info' | 'success' | 'warning'
}

/** a mutation waiting to be sent to the api, see observeQueuedQueries */
export interface QueuedQuery {
  id: string
  time: number
  [key: string]: unknown
}

// Plain atoms with async hydration from localforage, mirroring the former
// mst-persist behaviour: values are always readable synchronously (unlike
// atomWithStorage with async storage, whose value is a Promise until
// hydration completes), persisted state appears shortly after boot,
// changes are written back as they happen.
// Hydration is started once by initiateApp via hydratePersistedAtoms().
const persistedAtoms: {
  key: string
  baseAtom: PrimitiveAtom<unknown>
  hydrated: boolean
  dirty: boolean
}[] = []

const persistedAtom = <T>(key: string, initialValue: T): PrimitiveAtom<T> => {
  const baseAtom = atom<T>(initialValue)
  const entry = {
    key: `vermehrung:${key}`,
    baseAtom: baseAtom as PrimitiveAtom<unknown>,
    hydrated: false,
    dirty: false,
  }
  // writes that happen before hydration completes must win over the
  // persisted value: e.g. activeNodeArray is set from the url during boot
  // and must not be clobbered by the older persisted value arriving late
  store.sub(baseAtom, () => {
    if (!entry.hydrated) entry.dirty = true
  })
  persistedAtoms.push(entry)
  return baseAtom
}

export const hydratePersistedAtoms = async () => {
  // hydrate in parallel and never let a slow/blocked storage
  // keep the app from booting
  await Promise.all(
    persistedAtoms.map(async (entry) => {
      const { key, baseAtom } = entry
      try {
        const stored = await localForage.getItem(key)
        if (!entry.dirty && stored !== null && stored !== undefined) {
          store.set(baseAtom, stored)
        }
      } catch (error) {
        console.error(`hydratePersistedAtoms failed for ${key}:`, error)
      }
      // hydration is done for this atom: from now on writes are normal
      // state changes (persisted by the subscription below), no longer
      // reasons to skip hydration
      entry.hydrated = true
      entry.dirty = false
      // subscribe after hydration so the initial value is not written back
      store.sub(baseAtom, () => {
        localForage.setItem(key, store.get(baseAtom)).catch((error) => {
          console.error(`persisting ${key} failed:`, error)
        })
      })
    }),
  )
  // let the queue observer know about hydrated queries immediately
  // (instead of waiting for the first retry tick)
  store.set(queueSizeAtom, store.get(queuedQueriesAtom).length)
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
  'bedarf',
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
] as const

export type TableName = (typeof tables)[number]

// === simple flags ===
export const apFilterAtom = persistedAtom('apFilter', true)
export const docFilterAtom = persistedAtom('docFilter', '')
export const docsCountAtom = persistedAtom<number | null>('docsCount', null)
export const docsFilteredCountAtom = persistedAtom<number | null>(
  'docsFilteredCount',
  null,
)
export const isPrintAtom = persistedAtom('isPrint', false)
export const singleColumnViewAtom = persistedAtom('singleColumnView', false)
export const showTreeInSingleColumnViewAtom = persistedAtom(
  'showTreeInSingleColumnView',
  false,
)
export const diffConflictAtom = persistedAtom('diffConflict', true)
export const initiallyQueryingAtom = persistedAtom('initiallyQuerying', '')
// online state is deliberately not persisted: it is redetermined on boot
export const onlineAtom = atom(true)
export const shortTermOnlineAtom = atom(true)
// theme mode: 'system' follows the OS prefers-color-scheme preference
// (the default), 'light' and 'dark' force a mode. atomWithStorage reads
// synchronously on init; index.html resolves the same storage key
// before first paint so dark mode does not flash
export const themeModeAtom = atomWithStorage(
  'vermehrung:theme-mode',
  'system',
  undefined,
  { getOnInit: true },
)
// on startup need to wait with showing data
// until the api token with its claims has arrived
// this is _after_ user is set so need another variable
export const gettingAuthUserAtom = atom(true)
export const authorizingAtom = atom(true)

// === volatile singletons ===
export const userAtom = atom<User>({})
export const firebaseAuthAtom = atom<Auth | null>(null)
export const dbAtom = atom<Database | null>(null)
export const apiClientAtom = atom<ApiClient | null>(null)
// navigate is never read reactively, so it is kept as a plain module value.
// Storing a function in a jotai primitive atom would make jotai call it
// (updater semantics, like React setState) when setting it
let navigateFn: ((to: string, options?: unknown) => void) | undefined
export const setNavigate = (val: (to: string, options?: unknown) => void) => {
  navigateFn = val
}
export const getNavigate = () => navigateFn

// === tree ===
export const activeNodeArrayAtom = persistedAtom<string[]>(
  'tree:activeNodeArray',
  [],
)
// lastActiveNodeArray is needed to keep the last clicked arrow known
// so it does not jump
export const lastActiveNodeArrayAtom = persistedAtom<string[]>(
  'tree:lastActiveNodeArray',
  [],
)
export const openNodesAtom = persistedAtom<string[][]>('tree:openNodes', [])
export const widthInPercentOfScreenAtom = persistedAtom(
  'tree:widthInPercentOfScreen',
  33,
)

export const singleRowHeightAtom = atom((get) => {
  const isMobile =
    get(showTreeInSingleColumnViewAtom) && get(singleColumnViewAtom)
  return isMobile ? 30 : 23
})

export const addOpenNodes = (nodes: string[][]) => {
  // need set to ensure contained arrays are unique
  const set = new Set(
    [...store.get(openNodesAtom), ...nodes].map((n) => JSON.stringify(n)),
  )
  store.set(
    openNodesAtom,
    Array.from(set).map((n) => JSON.parse(n) as string[]),
  )
}

export const addOpenNode = (url: string[]) => {
  // add all parent nodes
  const addedOpenNodes = []
  for (let i = 1; i <= url.length; i++) {
    addedOpenNodes.push(url.slice(0, i))
  }
  addOpenNodes(addedOpenNodes)
}

export const setOpenNodes = (val: string[][]) => {
  // need set to ensure contained arrays are unique
  const set = new Set(val.map((n) => JSON.stringify(n)))
  store.set(
    openNodesAtom,
    Array.from(set).map((n) => JSON.parse(n) as string[]),
  )
}

export const removeOpenNode = (val: string[]) => {
  store.set(
    openNodesAtom,
    store.get(openNodesAtom).filter((n) => !isEqual(n, val)),
  )
}

export const removeOpenNodeWithChildren = (url: string[]) => {
  store.set(
    openNodesAtom,
    store.get(openNodesAtom).filter((n) => {
      const urlPartWithEqualLength = n.slice(0, url.length)
      return !isEqual(urlPartWithEqualLength, url)
    }),
  )
}

// === object name in url ===
// with breadcrumbs enabled, an object's form url ends with its name
// ('/Arten/{artId}/Art'). like the histories suffix it is kept out of
// activeNodeArray. undefined: no object name in url (list or folder url)
export const activeObjectNameAtom = atom<string | undefined>(undefined)
export const setObjectName = (val: string | undefined) =>
  store.set(activeObjectNameAtom, val)

export const setActiveNodeArray = (val: string[], nonavigate?: boolean) => {
  // with breadcrumbs enabled, an object's form url ends with its name
  // ('/Arten/{artId}/Art'). like the histories suffix it is deliberately
  // NOT part of activeNodeArray (read positionally in many places) but
  // kept in the url
  let activeNodeArray = val
  if (breadcrumbsEnabled) {
    const split = splitObjectNameFromActiveNodeArray(val)
    activeNodeArray = split.activeNodeArray
    setObjectName(split.objectName)
  }
  store.set(activeNodeArrayAtom, activeNodeArray)
  if (!nonavigate) {
    getNavigate()?.(`/Vermehrung/${val.join('/')}`)
    addOpenNode(activeNodeArray)
  }
}

export const setLastActiveNodeArray = (val: string[]) => {
  store.set(lastActiveNodeArrayAtom, val)
}

// === history in url ===
// rev of the history revision in the url suffix '/histories/<rev>'
// of the active form's url
// the suffix is deliberately NOT part of activeNodeArray
// because that is read positionally in many places
// undefined: no history in url
// true: '/histories' without rev
export const historyRevAtom = atom<string | true | undefined>(undefined)
export const setHistoryRev = (val: string | true | undefined) =>
  store.set(historyRevAtom, val)

export const setWidthInPercentOfScreen = (val: number) => {
  store.set(widthInPercentOfScreenAtom, val)
}

// === filter ===
const filterTableNames = [
  'art',
  'bedarf',
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
] as const

export const filterShowAtom = persistedAtom('filter:show', false)

export const filterTableAtoms: Record<
  string,
  PrimitiveAtom<Record<string, unknown>>
> = Object.fromEntries(
  filterTableNames.map((table) => [
    table,
    persistedAtom(`filter:${table}`, initialFilterValues[table]),
  ]),
)
export const filterArtAtom = filterTableAtoms.art
export const filterBedarfAtom = filterTableAtoms.bedarf
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

export const tableIsFilteredAtom = (table: string) =>
  atom((get) => {
    const empty = emptyHash[table]
    return Object.entries(get(filterTableAtoms[table])).some(
      ([key, value]) => value !== empty[key],
    )
  })

export const filterFilteredAtom = atom((get) =>
  filterTableNames.some((table) => get(tableIsFilteredAtom(table))),
)

export const setFilterValue = ({
  table,
  key,
  value,
}: {
  table: string
  key: string
  value: unknown
}) => {
  const tableAtom = filterTableAtoms[table]
  store.set(tableAtom, { ...store.get(tableAtom), [key]: value })
}

export const setFilterShow = (val: boolean) => {
  store.set(filterShowAtom, val)
}

export const emptyFilterTable = ({ table }: { table: string }) => {
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
    'bedarf',
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
) as Record<string, Record<string, unknown>>
export const errorsAtom = atom(defaultErrors)

export const setError = ({ path, value }: { path: string; value: unknown }) => {
  const [table, field] = path.split('.')
  const tableErrors = store.get(errorsAtom)[table] ?? {}
  store.set(errorsAtom, {
    ...store.get(errorsAtom),
    [table]: { ...tableErrors, [field]: value },
  })
}

export const unsetError = (path: string) => {
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
export const notificationsAtom = atom<Notification[]>([])

export const removeNotificationById = (id: string) => {
  store.set(
    notificationsAtom,
    store.get(notificationsAtom).filter((n) => n.id !== id),
  )
}

export const addNotification = (
  valPassed: Partial<Notification> & { message: string },
) => {
  // do not stack same messages
  const notificationsWithSameMessage = store
    .get(notificationsAtom)
    .filter((n) => n.message === valPassed.message)
  if (notificationsWithSameMessage.length > 0) return

  const val: Notification = {
    // set default values
    id: uuidv7(),
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
export const queuedQueriesAtom = persistedAtom<QueuedQuery[]>(
  'queuedQueries',
  [],
)
export const retryTickAtom = atom(0)
// the queue observer deliberately tracks only the SIZE of the queue
// (plus online state and the retry tick), not its contents:
// like the former MST reaction, deferring a failed query to the end
// must not re-trigger execution - it waits for the next tick instead
export const queueSizeAtom = atom(0)

export const queuedQueriesSortedAtom = atom((get) =>
  sortBy(get(queuedQueriesAtom), ['time']),
)

export const addQueuedQuery = (valPassed: Partial<QueuedQuery>) => {
  const val: QueuedQuery = {
    // set default values
    id: uuidv7(),
    time: Date.now(),
    // overwrite with passed in ones:
    ...valPassed,
  }
  const queue = [...store.get(queuedQueriesAtom), val]
  store.set(queuedQueriesAtom, queue)
  store.set(queueSizeAtom, queue.length)
}

export const removeQueuedQueryById = (id: string) => {
  const queue = store.get(queuedQueriesAtom).filter((q) => q.id !== id)
  store.set(queuedQueriesAtom, queue)
  store.set(queueSizeAtom, queue.length)
}

export const deferQueuedQueryById = (id: string) => {
  store.set(
    queuedQueriesAtom,
    store
      .get(queuedQueriesAtom)
      .map((q) => (q.id === id ? { ...q, time: Date.now() } : q)),
  )
}

// === watermarks ===
const initialLastUpdated = () =>
  Object.fromEntries(tables.map((table) => [table, 0])) as Record<
    TableName,
    number
  >

export const lastUpdatedAtom = persistedAtom<Record<TableName, number>>(
  'lastUpdated',
  initialLastUpdated(),
)

export const setLastUpdated = ({
  table,
  val: valPassed,
}: {
  table: TableName
  val?: number
}) => {
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
  store.set(lastUpdatedAtom, {
    ...store.get(lastUpdatedAtom),
    [table]: val,
  } as Record<TableName, number>)
}

export const tableLastUpdated = (table: TableName) =>
  store.get(lastUpdatedAtom)[table]

// reset the sync cursors and the initially-queried flags, e.g. when the
// local database is wiped: the in-memory cursors would otherwise
// survive the wipe and the next sync would deliver nothing
export const resetSyncState = () => {
  store.set(lastUpdatedAtom, initialLastUpdated())
  store.set(
    initiallyQueriedAtom,
    Object.fromEntries(tables.map((table) => [table, false])) as Record<
      TableName,
      boolean
    >,
  )
}

// initially_queried flags are deliberately not persisted:
// initial queries are re-run on every boot
export const initiallyQueriedAtom = atom<Record<TableName, boolean>>(
  Object.fromEntries(tables.map((table) => [table, false])) as Record<
    TableName,
    boolean
  >,
)

export const setInitiallyQueried = ({ table }: { table: TableName }) => {
  store.set(initiallyQueriedAtom, {
    ...store.get(initiallyQueriedAtom),
    [table]: true,
  })
}

export const tableInitiallyQueried = (table: TableName) =>
  store.get(initiallyQueriedAtom)[table]

export const initialDataQueriedAtom = atom((get) => {
  const initiallyQueried = get(initiallyQueriedAtom)
  return tables.every((table) => initiallyQueried[table])
})

// === setters for flags and volatiles ===
export const setApFilter = (val: boolean) => store.set(apFilterAtom, val)
export const setDocFilter = (val: string) => store.set(docFilterAtom, val)
export const setDocsCount = (val: number | null) =>
  store.set(docsCountAtom, val)
export const setDocsFilteredCount = (val: number | null) =>
  store.set(docsFilteredCountAtom, val)
export const setIsPrint = (val: boolean) => store.set(isPrintAtom, val)
export const setSingleColumnView = (val: boolean) =>
  store.set(singleColumnViewAtom, val)
export const setShowTreeInSingleColumnView = (val: boolean) =>
  store.set(showTreeInSingleColumnViewAtom, val)
export const setDiffConflict = (val: boolean) =>
  store.set(diffConflictAtom, val)
export const setInitiallyQuerying = (val: string) =>
  store.set(initiallyQueryingAtom, val)
export const setOnline = (val: boolean) => store.set(onlineAtom, val)
export const setShortTermOnline = (val: boolean) =>
  store.set(shortTermOnlineAtom, val)
export const setGettingAuthUser = (val: boolean) =>
  store.set(gettingAuthUserAtom, val)
export const setAuthorizing = (val: boolean) => store.set(authorizingAtom, val)
export const setUser = (val: User | null) => store.set(userAtom, val || {})
export const setFirebaseAuth = (val: Auth | null) => {
  if (!store.get(firebaseAuthAtom)) {
    store.set(firebaseAuthAtom, val)
  }
}
export const setApiClient = (val: ApiClient | null) =>
  store.set(apiClientAtom, val)
export const setDb = (val: Database | null) => store.set(dbAtom, val)

// === revert helpers ===
// used to revert offline operations if they fail
export const updateModelValue = async ({
  table,
  id,
  field,
  value,
}: {
  table: TableName
  id: string
  field: string
  value: unknown
}) => {
  const db = store.get(dbAtom)
  if (!db) return
  // find model = row
  // (find returns a promise - .fetch() on it always threw, which made
  // the queue's revert path a silent no-op until now)
  let row
  try {
    row = await db.get(table).find(id)
  } catch {}
  if (row) {
    await db.write(async () => {
      await row.update((rowToSet: Model) => {
        ;(rowToSet as unknown as Record<string, unknown>)[field] = value
      })
    })
  }
}

export const updateModelValues = async ({
  table,
  id,
  values,
}: {
  table: TableName
  id: string
  values: Record<string, unknown>
}) => {
  const db = store.get(dbAtom)
  if (!db) return
  // find model = row (find returns a promise)
  let row
  try {
    row = await db.get(table).find(id)
  } catch {}
  if (row) {
    await db.write(async () => {
      await row.update((rowToSet: Model) => {
        Object.entries(values).forEach(([key, value]) => {
          ;(rowToSet as unknown as Record<string, unknown>)[key] = value
        })
      })
    })
  }
}

// === derived from activeNodeArray ===
export const activeFormAtom = atom((get) =>
  activeFormFromActiveNodeArray(get(activeNodeArrayAtom)),
)
// the nav tree pane is hidden: in single-column view whenever a form or the
// filter takes the full width (unless the tree is pinned) and while printing.
// Single source of truth for everything drawn next to the tree pane: the
// allotment separator and the breadcrumbs' bottom border
export const treePaneHiddenAtom = atom(
  (get) =>
    get(isPrintAtom) ||
    (get(singleColumnViewAtom) &&
      ((!get(showTreeInSingleColumnViewAtom) && get(activeFormAtom)) ||
        get(filterShowAtom))),
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
export const bedarfIdInActiveNodeArrayAtom = atom((get) =>
  bedarfIdInUrl(get(activeNodeArrayAtom)),
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

export const xxxIdInActiveNodeArrayAtoms: Record<
  string,
  Atom<string | undefined>
> = {
  artIdInActiveNodeArray: artIdInActiveNodeArrayAtom,
  herkunftIdInActiveNodeArray: herkunftIdInActiveNodeArrayAtom,
  gartenIdInActiveNodeArray: gartenIdInActiveNodeArrayAtom,
  kulturIdInActiveNodeArray: kulturIdInActiveNodeArrayAtom,
  anLieferungIdInActiveNodeArray: anLieferungIdInActiveNodeArrayAtom,
  ausLieferungIdInActiveNodeArray: ausLieferungIdInActiveNodeArrayAtom,
  lieferungIdInActiveNodeArray: lieferungIdInActiveNodeArrayAtom,
  bedarfIdInActiveNodeArray: bedarfIdInActiveNodeArrayAtom,
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
