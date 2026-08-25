import { beforeEach, describe, expect, it, vi } from 'vitest'

// in-memory localforage; prefilled per test to simulate a previous session
const storageData = new Map()
vi.mock('localforage', () => ({
  default: {
    getItem: async (key) =>
      storageData.has(key) ? storageData.get(key) : null,
    setItem: async (key, value) => {
      storageData.set(key, value)
    },
    removeItem: async (key) => {
      storageData.delete(key)
    },
  },
}))

import { getAuthToken } from '../../utils/getAuthToken.js'
vi.mock('../../utils/getAuthToken.js', () => ({
  getAuthToken: vi.fn(async () => true),
}))

import {
  store,
  hydratePersistedAtoms,
  dbAtom,
  gqlClientAtom,
  shortTermOnlineAtom,
  queuedQueriesAtom,
  queueSizeAtom,
  notificationsAtom,
  activeNodeArrayAtom,
  addQueuedQuery,
} from '../index.js'
import { observeQueuedQueries } from '../../modules/observeQueuedQueries.js'
import { mutations } from '../../utils/mutations.js'

const dbMock = {
  get: () => ({ find: () => ({ fetch: () => null }) }),
  write: async (fn) => fn(),
}

const buildQuery = (overrides = {}) => ({
  name: 'mutateInsert_art_rev_one',
  variables: JSON.stringify({ object: { art_id: '1' } }),
  revertTable: 'art',
  revertId: '1',
  revertField: 'name',
  revertValue: 'old',
  ...overrides,
})

beforeEach(() => {
  vi.clearAllMocks()
  storageData.clear()
  store.set(queuedQueriesAtom, [])
  store.set(queueSizeAtom, 0)
  store.set(notificationsAtom, [])
  store.set(shortTermOnlineAtom, true)
  store.set(dbAtom, dbMock)
})

describe('persisted atoms', () => {
  it('hydrates atoms from storage', async () => {
    storageData.set('vermehrung:tree:activeNodeArray', ['Arten', 'x'])
    storageData.set('vermehrung:filter:show', true)

    await hydratePersistedAtoms()

    expect(store.get(activeNodeArrayAtom)).toEqual(['Arten', 'x'])
    expect(store.get(queuedQueriesAtom)).toEqual([])
  })

  it('writes changes back to storage after hydration', async () => {
    await hydratePersistedAtoms()

    store.set(activeNodeArrayAtom, ['Sammlungen'])
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(storageData.get('vermehrung:tree:activeNodeArray')).toEqual([
      'Sammlungen',
    ])
  })

  it('does not write values back that were not changed', async () => {
    await hydratePersistedAtoms()
    expect(storageData.has('vermehrung:filter:show')).toBe(false)
  })

  it('hydrated queued queries are drained', async () => {
    storageData.set('vermehrung:queuedQueries', [
      buildQuery({ id: 'hydrated-1', time: 100 }),
    ])
    const mutationMock = vi.fn(() => ({
      toPromise: async () => ({ data: {} }),
    }))
    store.set(gqlClientAtom, { mutation: mutationMock })

    await hydratePersistedAtoms()
    expect(store.get(queueSizeAtom)).toBe(1)

    const unobserve = observeQueuedQueries()
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    expect(mutationMock).toHaveBeenCalledTimes(1)
    expect(mutations.mutateInsert_art_rev_one).toBeDefined()
    unobserve()
  })

  it('new queries are persisted for the next session', async () => {
    await hydratePersistedAtoms()

    addQueuedQuery(buildQuery({ id: 'new-1' }))
    await new Promise((resolve) => setTimeout(resolve, 10))

    const persisted = storageData.get('vermehrung:queuedQueries')
    expect(persisted).toHaveLength(1)
    expect(persisted[0].id).toBe('new-1')
  })
})
