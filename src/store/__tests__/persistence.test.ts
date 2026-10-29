import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Database } from 'nitromelondb'

// in-memory localforage; prefilled per test to simulate a previous session
const storageData = new Map<string, unknown>()
vi.mock('localforage', () => ({
  default: {
    getItem: async (key: string) =>
      storageData.has(key) ? storageData.get(key) : null,
    setItem: async (key: string, value: unknown) => {
      storageData.set(key, value)
    },
    removeItem: async (key: string) => {
      storageData.delete(key)
    },
  },
}))

vi.mock('../../utils/getAuthToken.ts', () => ({
  getAuthToken: vi.fn(async () => true),
}))

import {
  store,
  hydratePersistedAtoms,
  dbAtom,
  apiClientAtom,
  shortTermOnlineAtom,
  queuedQueriesAtom,
  queueSizeAtom,
  notificationsAtom,
  activeNodeArrayAtom,
  addQueuedQuery,
} from '../index.ts'
import { observeQueuedQueries } from '../../modules/observeQueuedQueries.ts'

const dbMock = {
  get: () => ({ find: () => ({ fetch: () => null }) }),
  write: async (fn: () => unknown) => fn(),
}

const buildQuery = (overrides: Record<string, unknown> = {}) => ({
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
  store.set(dbAtom, dbMock as unknown as Database)
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
    const postMock = vi.fn(async () => null)
    store.set(apiClientAtom, {
      post: postMock,
    } as unknown as import('../../utils/apiTypes.ts').ApiClient)

    await hydratePersistedAtoms()
    expect(store.get(queueSizeAtom)).toBe(1)

    const unobserve = observeQueuedQueries()
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    expect(postMock).toHaveBeenCalledTimes(1)
    expect(postMock).toHaveBeenCalledWith(
      '/art_rev',
      { art_id: '1' },
      'resolution=merge-duplicates,return=minimal',
    )
    unobserve()
  })

  it('new queries are persisted for the next session', async () => {
    await hydratePersistedAtoms()

    addQueuedQuery(buildQuery({ id: 'new-1' }))
    await new Promise((resolve) => setTimeout(resolve, 10))

    const persisted = storageData.get('vermehrung:queuedQueries') as {
      id: string
    }[]
    expect(persisted).toHaveLength(1)
    expect(persisted[0].id).toBe('new-1')
  })
})
