import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../utils/getAuthToken.js', () => ({
  getAuthToken: vi.fn(async () => true),
}))

import { getAuthToken } from '../../utils/getAuthToken.ts'
import {
  store,
  shortTermOnlineAtom,
  retryTickAtom,
  queueSizeAtom,
  queuedQueriesAtom,
  errorsAtom,
  notificationsAtom,
  apiClientAtom,
  dbAtom,
  addQueuedQuery,
} from '../../store/index.ts'
import { observeQueuedQueries } from '../observeQueuedQueries.ts'

// minimal WatermelonDB stand-in: finds no rows, so reverts are no-ops
const dbMock = {
  get: () => ({ find: () => Promise.resolve(null) }),
  write: async (fn: () => unknown) => fn(),
}

const buildQuery = (overrides: Record<string, unknown> = {}) => ({
  name: 'mutateInsert_art_rev_one',
  variables: JSON.stringify({
    object: { art_id: '1', _rev: '1-abc' },
    on_conflict: { constraint: 'art_rev_pkey', update_columns: ['id'] },
  }),
  revertTable: 'art',
  revertId: '1',
  revertField: 'name',
  revertValue: 'old',
  ...overrides,
})

describe('observeQueuedQueries', () => {
  let unobserve: () => void
  let postMock: ReturnType<typeof vi.fn>
  let nextResponse: unknown

  beforeEach(() => {
    vi.clearAllMocks()
    store.set(queuedQueriesAtom, [])
    store.set(queueSizeAtom, 0)
    store.set(notificationsAtom, [])
    store.set(errorsAtom, { art: {} })
    store.set(shortTermOnlineAtom, true)
    store.set(dbAtom, dbMock as unknown as import('nitromelondb').Database)

    // executeQueuedQuery awaits apiClient.post and normalizes thrown
    // errors into { error: { message, status, code, isNetwork } }
    nextResponse = null
    postMock = vi.fn(async () => {
      if (nextResponse === null) return
      if (typeof nextResponse === 'function') return nextResponse()
      throw nextResponse
    })
    store.set(apiClientAtom, {
      post: postMock,
    } as unknown as import('../../utils/apiTypes.ts').ApiClient)

    unobserve?.()
    unobserve = observeQueuedQueries()
  })

  const tickle = () => store.set(retryTickAtom, Date.now())

  it('batches consecutive same-table queries into one bulk upsert', async () => {
    // queue while offline so the drain sees both queries at once
    store.set(shortTermOnlineAtom, false)
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))
    addQueuedQuery(buildQuery({ id: 'b', time: 50 }))
    store.set(shortTermOnlineAtom, true)

    await vi.waitFor(() => {
      expect(postMock).toHaveBeenCalled()
    })
    expect(postMock).toHaveBeenCalledTimes(1)
    expect(postMock).toHaveBeenCalledWith(
      '/art_rev',
      [
        { art_id: '1', _rev: '1-abc' },
        { art_id: '1', _rev: '1-abc' },
      ],
      'resolution=merge-duplicates,return=minimal',
    )
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    expect(postMock).toHaveBeenCalledTimes(1)
  })

  it('does not batch across tables', async () => {
    store.set(shortTermOnlineAtom, false)
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))
    addQueuedQuery(
      buildQuery({
        id: 'b',
        time: 50,
        name: 'mutateInsert_person_rev_one',
        revertTable: 'person',
      }),
    )
    store.set(shortTermOnlineAtom, true)

    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    const paths = postMock.mock.calls.map((call) => call[0])
    expect(paths).toEqual(['/person_rev', '/art_rev'])
  })

  it('falls back to single queries when the batch fails', async () => {
    const serverError = new Error('Unexpected server error')
    ;(serverError as import('../../utils/apiTypes.ts').ApiError).status = 500
    let calls = 0
    nextResponse = () => {
      calls++
      if (calls === 1) throw serverError
      return
    }
    store.set(shortTermOnlineAtom, false)
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))
    addQueuedQuery(buildQuery({ id: 'b', time: 50 }))
    store.set(shortTermOnlineAtom, true)

    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    // the failed batch is retried query by query: both succeed singly
    expect(calls).toBe(3)
    // every send posts an array body - the batch carries both objects,
    // the retries one each
    expect(postMock.mock.calls[0][1]).toHaveLength(2)
    expect(postMock.mock.calls[1][1]).toHaveLength(1)
    expect(postMock.mock.calls[2][1]).toHaveLength(1)
  })

  it('does nothing while shortTermOnline is false', async () => {
    store.set(shortTermOnlineAtom, false)
    addQueuedQuery(buildQuery())
    tickle()
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(postMock).not.toHaveBeenCalled()
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
  })

  it('keeps the query and refreshes the auth token on 401', async () => {
    const jwtError = new Error('Could not verify JWT: JWT expired')
    ;(jwtError as import('../../utils/apiTypes.ts').ApiError).status = 401
    nextResponse = jwtError
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(getAuthToken).toHaveBeenCalled()
    })
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
  })

  it('reverts and removes the query on identical-rev uniqueness violations', async () => {
    const uniqueRevError = new Error(
      'duplicate key value violates unique constraint "_rev_id__rev_key"',
    )
    ;(uniqueRevError as import('../../utils/apiTypes.ts').ApiError).code =
      '23505'
    nextResponse = uniqueRevError
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
  })

  it('reverts and removes the query on same-edit-too-soon (21000)', async () => {
    const cardinalityError = new Error(
      'more than one row returned by a subquery used as an expression',
    )
    ;(cardinalityError as import('../../utils/apiTypes.ts').ApiError).code =
      '21000'
    nextResponse = cardinalityError
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
  })

  it('sets a field error and removes the query on unique-constraint violations', async () => {
    const uniqueError = new Error(
      'duplicate key value violates unique constraint "art_pkey"',
    )
    ;(uniqueError as import('../../utils/apiTypes.ts').ApiError).code = '23505'
    nextResponse = uniqueError
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(errorsAtom).art.name).toBeDefined()
    })
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
    expect(store.get(errorsAtom).art.name).toBe(
      'duplicate key value violates unique constraint "art_pkey"',
    )
  })

  it('marks offline and keeps the query on fetch failures', async () => {
    nextResponse = new TypeError('Failed to fetch')
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(store.get(shortTermOnlineAtom)).toBe(false)
    })
    expect(store.get(queuedQueriesAtom)).toHaveLength(1)
  })

  it('defers unknown errors to the end of the queue and notifies', async () => {
    const serverError = new Error('Unexpected server error')
    ;(serverError as import('../../utils/apiTypes.ts').ApiError).status = 500
    nextResponse = serverError
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
    expect(postMock).toHaveBeenCalledTimes(1)
  })

  it('does not double-send while a query is in-flight', async () => {
    let resolveFirst: ((value?: unknown) => void) | undefined
    nextResponse = () =>
      new Promise((resolve) => {
        resolveFirst = resolve
      })
    addQueuedQuery(buildQuery({ id: 'a', time: 100 }))

    await vi.waitFor(() => {
      expect(postMock).toHaveBeenCalledTimes(1)
    })
    // re-trigger while the first send is still in-flight
    tickle()
    tickle()
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(postMock).toHaveBeenCalledTimes(1)

    resolveFirst?.()
    await vi.waitFor(() => {
      expect(store.get(queuedQueriesAtom)).toHaveLength(0)
    })
  })
})
