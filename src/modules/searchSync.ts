import { isEqual } from 'es-toolkit'
import type { PrimitiveAtom } from 'jotai'

import {
  apFilterAtom,
  filterShowAtom,
  filterTabAtom,
  filterTableAtoms,
  filterTableNames,
  getNavigate,
  persistedAtomsHydrated,
  store,
} from '../store/index.ts'
import emptyValues from '../store/Filter/emptyValues.ts'
import { simpleTypes } from '../store/Filter/simpleTypes.ts'
import { openFormSectionsAtom, qkTabAtom } from './formSections.ts'

// Makes view state linkable via the url's query string:
//
//   f.<table>.<field>=<value>   per-entity filter values, diff-encoded:
//                               only fields differing from their default
//                               appear (the same diff tableIsFilteredAtom
//                               uses). Decoded via Filter/simpleTypes, so
//                               no field-type registry is needed here.
//   filter=1                    the filter pane is open
//   ap=0                        the tree's ap filter is off (default on)
//   ftab=<tab>                  the filter pane's active tab (written by
//                               Filter.tsx on tab clicks, removed when the
//                               pane closes)
//   open=<slug>[,<slug>]        collapsible form sections (QK, Timeline,
//                               ...) expanded, see modules/formSections.ts
//   qk=waehlen                  the QK section's auswählen tab (only
//                               while the qk section is expanded)
//
// Rules:
// - url -> atoms (on every location change, incl. boot): groups with
//   params in the url win over the atoms; groups without params are left
//   alone, so booting a clean url keeps the persisted values — except
//   groups whose params disappeared since the previous location
//   (back/forward), which revert their atoms to the defaults.
// - atoms -> url (user edits, armed only after the persisted atoms
//   hydrated — hydration itself must not write persisted values into a
//   clean url): each change rewrites its group's params into the current
//   query string. Filter values navigate with replace (typing must not
//   spam the history), toggles push (back undoes them). Foreign params
//   (devToken, ...) are never touched.
// - Re-render safety: SearchSyncController is the only router subscriber
//   for this. Components keep reading/writing atoms, so a param write
//   cannot fan re-renders out into the data components — beyond the few
//   null controllers that already re-render on every navigation. No
//   component may use useSearchParams for this state.

const FILTER_PREFIX = 'f.'

interface ParamGroup {
  /** keys whose presence/absence in the url drives url -> atoms */
  tracked: (key: string) => boolean
  /** url -> atoms; only called when a tracked key is present */
  apply: (params: URLSearchParams) => void
  /** the group's tracked keys disappeared since the last location */
  revert: () => void
  /**
   * atoms -> url param updates, [key, value]; value undefined removes
   * the key. Receives the current params so stale keys (fields that
   * returned to their default) can be dropped explicitly.
   */
  updates: (params: URLSearchParams) => [string, string | undefined][]
  /** navigate with replace: no history entry per keystroke */
  replace: boolean
  /** atom writes that rewrite this group's params */
  atoms: () => PrimitiveAtom<unknown>[]
}

const decodeValue = (
  raw: string,
  type: string,
): string | number | boolean | undefined => {
  // '' means "no value" (form inputs map '' to null)
  if (raw === '') return undefined
  switch (type) {
    case 'boolean':
      return raw === 'true'
    case 'number': {
      const n = Number(raw)
      return Number.isNaN(n) ? undefined : n
    }
    default:
      // 'string', 'uuid', 'date' all round-trip as strings
      if (type === 'string' || type === 'uuid' || type === 'date') return raw
      return undefined
  }
}

const encodeValue = (value: unknown): string => {
  if (value === true) return 'true'
  if (value === false) return 'false'
  return String(value)
}

/** the filter values a url's `f.<table>.*` params stand for */
export const decodeFilterValues = (
  table: string,
  params: URLSearchParams,
): Record<string, unknown> | undefined => {
  const prefix = `${FILTER_PREFIX}${table}.`
  const types = simpleTypes[table]
  if (!types) return undefined
  let hasParam = false
  const target: Record<string, unknown> = { ...emptyValues[table] }
  for (const [key, raw] of params.entries()) {
    if (!key.startsWith(prefix)) continue
    hasParam = true
    const field = key.slice(prefix.length)
    const type = types[field]
    if (!type) continue // unknown field: ignore, never crash on hand-edited urls
    const value = decodeValue(raw, type)
    if (value !== undefined) target[field] = value
  }
  return hasParam ? target : undefined
}

/** diff-encoded params for one table's filter values + removals for
 * stale params of fields that returned to their default */
export const filterUpdatesFor = (
  table: string,
  values: Record<string, unknown>,
  params: URLSearchParams,
): [string, string | undefined][] => {
  const prefix = `${FILTER_PREFIX}${table}.`
  const updates: [string, string | undefined][] = []
  const emitted = new Set<string>()
  for (const [field, value] of Object.entries(values)) {
    if (isEqual(value, emptyValues[table][field])) continue
    const key = `${prefix}${field}`
    emitted.add(key)
    updates.push([key, encodeValue(value)])
  }
  for (const key of params.keys()) {
    if (key.startsWith(prefix) && !emitted.has(key))
      updates.push([key, undefined])
  }
  return updates
}

const tableGroup = (table: string): ParamGroup => {
  const prefix = `${FILTER_PREFIX}${table}.`
  const atom = filterTableAtoms[table]
  return {
    tracked: (key) => key.startsWith(prefix),
    apply: (params) => {
      const target = decodeFilterValues(table, params)
      if (target === undefined) return
      if (!isEqual(store.get(atom), target)) store.set(atom, target)
    },
    revert: () => {
      if (!isEqual(store.get(atom), emptyValues[table]))
        store.set(atom, emptyValues[table])
    },
    updates: (params) =>
      filterUpdatesFor(
        table,
        store.get(atom) as Record<string, unknown>,
        params,
      ),
    replace: true,
    atoms: () => [atom as PrimitiveAtom<unknown>],
  }
}

const filterShowGroup: ParamGroup = {
  tracked: (key) => key === 'filter',
  apply: (params) => {
    if (!params.has('filter')) return
    const show = params.get('filter') === '1'
    if (store.get(filterShowAtom) !== show) store.set(filterShowAtom, show)
  },
  revert: () => {
    if (store.get(filterShowAtom) !== false) store.set(filterShowAtom, false)
  },
  updates: () =>
    store.get(filterShowAtom) ?
      // an open pane keeps ftab as-is (it belongs to the open pane)
      [['filter', '1']]
      // a closed pane has no tab: drop a stale ftab with it
    : ([
        ['filter', undefined],
        ['ftab', undefined],
      ] as [string, string | undefined][]),
  replace: false,
  atoms: () => [filterShowAtom as PrimitiveAtom<unknown>],
}

const apGroup: ParamGroup = {
  tracked: (key) => key === 'ap',
  apply: (params) => {
    if (!params.has('ap')) return
    const on = params.get('ap') !== '0'
    if (store.get(apFilterAtom) !== on) store.set(apFilterAtom, on)
  },
  revert: () => {
    if (store.get(apFilterAtom) !== true) store.set(apFilterAtom, true)
  },
  updates: () => [['ap', store.get(apFilterAtom) === false ? '0' : undefined]],
  replace: false,
  atoms: () => [apFilterAtom as PrimitiveAtom<unknown>],
}

// the filter pane's tab: written directly by Filter.tsx (setFtabParam)
// and removed with the pane by filterShowGroup - so this group only
// maps url -> atom (the pane follows the url, e.g. on back/forward)
const ftabGroup: ParamGroup = {
  tracked: (key) => key === 'ftab',
  apply: (params) => {
    if (!params.has('ftab')) return
    const tab = params.get('ftab')
    const value = tab === '' ? undefined : (tab ?? undefined)
    if (store.get(filterTabAtom) !== value) store.set(filterTabAtom, value)
  },
  revert: () => {
    if (store.get(filterTabAtom) !== undefined)
      store.set(filterTabAtom, undefined)
  },
  updates: () => [],
  replace: true,
  atoms: () => [],
}

// collapsible form sections (QK, Timeline, ...): ?open=<slug>[,<slug>],
// see modules/formSections.ts. Toggling a section is discrete: push.
const openGroup: ParamGroup = {
  tracked: (key) => key === 'open',
  apply: (params) => {
    const slugs = (params.get('open') ?? '')
      .split(',')
      .map((slug) => slug.trim())
      .filter((slug) => slug !== '')
    if (!isEqual(store.get(openFormSectionsAtom), slugs))
      store.set(openFormSectionsAtom, slugs)
  },
  revert: () => {
    if (store.get(openFormSectionsAtom).length > 0)
      store.set(openFormSectionsAtom, [])
  },
  updates: () => {
    const slugs = store.get(openFormSectionsAtom)
    return [['open', slugs.length > 0 ? slugs.join(',') : undefined]]
  },
  replace: false,
  atoms: () => [openFormSectionsAtom as PrimitiveAtom<unknown>],
}

// the QK section's inner tab: ?qk=waehlen — diff-encoded (ausführen is
// the default, so the param only exists for auswählen) and only while
// the qk section is expanded; collapsing the section removes it
const qkTabGroup: ParamGroup = {
  tracked: (key) => key === 'qk',
  apply: (params) => {
    const tab = params.get('qk') === 'waehlen' ? 'waehlen' : 'qk'
    if (store.get(qkTabAtom) !== tab) store.set(qkTabAtom, tab)
  },
  revert: () => {
    if (store.get(qkTabAtom) !== 'qk') store.set(qkTabAtom, 'qk')
  },
  updates: () => [
    [
      'qk',
      (
        store.get(qkTabAtom) === 'waehlen' &&
        store.get(openFormSectionsAtom).includes('qk')
      ) ?
        'waehlen'
      : undefined,
    ],
  ],
  replace: false,
  atoms: () => [
    qkTabAtom as PrimitiveAtom<unknown>,
    openFormSectionsAtom as PrimitiveAtom<unknown>,
  ],
}

const groups: ParamGroup[] = [
  filterShowGroup,
  apGroup,
  ftabGroup,
  openGroup,
  qkTabGroup,
  ...filterTableNames.map(tableGroup),
]

// === url -> atoms ===

let lastSearch: string | undefined

/** tests only: forget the applied-search history (the boot state) */
export const resetSearchSyncForTests = () => {
  lastSearch = undefined
}

export const applySearchParams = (search: string) => {
  // no early return on search === lastSearch: history can bounce back to
  // the last applied search after atoms changed without an intermediate
  // apply (collapse click pushes the url synchronously, a fast back
  // restores the old entry before the push's location is applied). Every
  // group's apply/revert is idempotent, so re-applying is safe.
  const params = new URLSearchParams(search)
  const first = lastSearch === undefined
  const prev = first ? undefined : new URLSearchParams(lastSearch)
  for (const group of groups) {
    if ([...params.keys()].some((key) => group.tracked(key))) {
      group.apply(params)
    } else if (prev && [...prev.keys()].some((key) => group.tracked(key))) {
      group.revert()
    }
    // else: no params now, none before — keep the (possibly persisted)
    // values; a clean url must not clear anything on boot
  }
  lastSearch = search
}

// === atoms -> url ===

// one navigation per change burst: a single user action can touch
// several groups (collapsing the QK section rewrites open AND qk;
// "Alle Filter entfernen" empties all tables at once), and sequential
// navigations would push one history entry per group. Dirty groups are
// collected and flushed together in a microtask; push when any of them
// is discrete (replace-only bursts keep replacing, e.g. filter typing).
const dirtyGroups = new Set<ParamGroup>()
let flushScheduled = false

const scheduleWrite = (group: ParamGroup) => {
  dirtyGroups.add(group)
  if (flushScheduled) return
  flushScheduled = true
  queueMicrotask(() => {
    flushScheduled = false
    const navigate = getNavigate()
    if (!navigate) {
      dirtyGroups.clear()
      return
    }
    const { pathname, search } = window.location
    const params = new URLSearchParams(search)
    const before = params.toString()
    let push = false
    // groups in fixed order, so params serialize deterministically
    for (const group of groups) {
      if (!dirtyGroups.has(group)) continue
      if (!group.replace) push = true
      for (const [key, value] of group.updates(params)) {
        if (value === undefined) params.delete(key)
        else params.set(key, value)
      }
    }
    dirtyGroups.clear()
    const after = params.toString()
    // identical: our own write would re-trigger applySearchParams for
    // nothing (it no-ops on equal atoms, but skip the navigation anyway)
    if (after === before) return
    navigate(after ? `${pathname}?${after}` : pathname, { replace: !push })
  })
}

let armed = false

/** arms the atoms -> url direction; call once at app boot */
export const initSearchParamsSync = () => {
  if (armed) return
  armed = true
  void persistedAtomsHydrated.then(() => {
    for (const group of groups) {
      for (const atom of group.atoms())
        store.sub(atom, () => scheduleWrite(group))
    }
  })
}

// === filter pane tab ===

export const setFtabParam = (tab: string) => {
  const navigate = getNavigate()
  if (!navigate) return
  const { pathname, search } = window.location
  const params = new URLSearchParams(search)
  params.set('ftab', tab)
  navigate(`${pathname}?${params.toString()}`, { replace: true })
}
