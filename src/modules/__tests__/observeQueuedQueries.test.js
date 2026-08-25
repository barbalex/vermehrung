import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../utils/getAuthToken.js', () => ({
  getAuthToken: vi.fn(async () => true),
}))

import { getAuthToken } from '../../utils/getAuthToken.js'
import {
  store,
  shortTermOnlineAtom,
  retryTickAtom,
  queueSizeAtom,
  queuedQueriesAtom,
  errorsAtom,
  notificationsAtom,
  gqlClientAtom,
  dbAtom,
  addQueuedQuery,
} from '../../store/index.js'
import { observeQueuedQueries } from '../observeQueuedQueries.js'

// minimal WatermelonDB stand-in: finds no rows, so reverts are no-ops
const dbMock = {
  get: () => ({ find: () => ({ fetch: () => null }) }),
  write: async (fn) => fn(),
}

const buildQuery = (overrides = {}) => ({
  name: 'mutateInsert_art_rev_one',
  variables: JSON.stringify({ object: { art_id: '1', _rev: '1-abc' } }),
  revertTable: 'art',
  revertId: '1',
  revertField: 'name',
  revertValue: 'old',
  ...overrides,
})

describe('observeQueuedQueries', () => {
  let unobserve
  let mutationMock
  let nextResponse

  beforeEach(() => {
    vi.clearAllMocks()
    store.set(queuedQueriesAtom, [])
    store.set(queueSizeAtom, 0)
    store.set(notificationsAtom, [])
    store.set(errorsAtom, { art: {} })
    store.set(shortTermOnlineAtom, true)
    store.set(dbAtom, dbMock)

    nextResponse = { data: {} }
    mutationMock = vi.fn(() => ({
      toPromise: () =>
        typeof nextResponse === 'function' ? nextResponse() : nextResponse,
    }))
    store.set(gqlClientAtom, { mutation: mutationMock })

    unobserve?.()
    unobserve = observeQueuedQueries()
  })

  const tickle = () => store.set(retryTickAtom, Date.now())

  it('executes the oldest query first and removes it on success', async () => {
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))
    addQueuedQuery(buildQuery({ id: 'b', time: 50 }))

    await vi.waitFor(() => {
      expect(mutationMock).toHaveBeenCalled()
    })
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    expect(store.get(queuedQueriesAtom)).toEqual([])
    expect(mutationMock).toHaveBeenCalledTimes(2)
  })

  it('does nothing while shortTermOnline is false', async () => {
    store.set(shortTermOnlineAtom, false)
    addQueuedQuery(buildQuery())
    tickle()
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(mutationMock).not.toHaveBeenCalled()
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
  })

  it('keeps the query and refreshes the auth token on JWT errors', async () => {
    nextResponse = { error: { message: 'JWT expired' } }
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(getAuthToken).toHaveBeenCalled()
    })
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
  })

  it('reverts and removes the query on identical-rev uniqueness violations', async () => {
    nextResponse = {
      error: {
        message:
          'uniqueness violation _rev_id__rev_key constraint on table art_rev',
      },
    }
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
  })

  it('reverts and removes the query on same-edit-too-soon (21000)', async () => {
    nextResponse = {
      error: {
        message: 'some error',
        graphQLErrors: [
          { extensions: { internal: { error: { status_code: '21000' } } } },
        ],
      },
    }
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
  })

  it('sets a field error and removes the query on unique-constraint violations', async () => {
    nextResponse = {
      error: { message: 'unique-constraint violation on art' },
    }
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(errorsAtom).art.name).toBeDefined()
    })
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    expect(store.get(errorsAtom).art.name).toBe(
      'unique-constraint violation on art',
    )
  })

  it('marks offline and keeps the query on fetch failures', async () => {
    nextResponse = { error: { message: 'Failed to fetch' } }
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(shortTermOnlineAtom)).toBe(false)
    })
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
  })

  it('defers unknown errors to the end of the queue and notifies', async () => {
    nextResponse = { error: { message: 'Unexpected server error' } }
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(notificationsAtom).length).toBeGreaterThan(0)
    })
    const queue = store.get(queuedQueriesAtom)
    // failed query is kept, not removed...
    expect(queue).toHaveLength(1)
    // ...and its time was bumped so it sorts last (deferred)
    expect(queue[0].time).toBeGreaterThan(100)
    expect(store.get(errorsAtom).art.name).toBe('Unexpected server error')
    expect(mutationMock).toHaveBeenCalledTimes(1)
  })

  it('does not double-send while a query is in-flight', async () => {
    let resolveFirst
    nextResponse = () =>
      new Promise((resolve) => {
        resolveFirst = resolve
      })
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(mutationMock).toHaveBeenCalledTimes(1)
    })
    // re-trigger while the first send is still in-flight
    tickle()
    tickle()
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(mutationMock).toHaveBeenCalledTimes(1)

    resolveFirst({ data: {} })
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
  })
})
