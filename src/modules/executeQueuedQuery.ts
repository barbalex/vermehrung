import { store, apiClientAtom, type QueuedQuery } from '../store/index.ts'
import { ApiError } from '../utils/apiTypes.ts'

// a queued query is always an insert into a <table>_rev table,
// named mutateInsert_<table>_rev_one, with the revision object and its
// upsert info as variables (the same shape the graphql mutation used).
// PostgREST upserts via Prefer: resolution=merge-duplicates, which makes
// replaying the identical mutation after a reconnect a no-op - exactly
// what the on_conflict clause expressed.
export interface QueuedQueryResult {
  error?: {
    message: string
    status?: number
    code?: string
    isNetwork: boolean
  }
}

export const executeQueuedQuery = async (
  query: QueuedQuery,
): Promise<QueuedQueryResult> => executeQueuedQueries([query])

// the rev table a queued query writes to, e.g. 'art' for
// mutateInsert_art_rev_one - null when the name does not match
export const revTableOf = (query: QueuedQuery): string | null =>
  (query as unknown as { name?: string }).name?.match?.(
    /^mutateInsert_(.+)_rev_one$/,
  )?.[1] ?? null

// one bulk upsert for a group of queued revisions of the same table:
// draining a long offline queue replays one request per table instead
// of one per edit. PostgREST inserts the array in order, so
// parent-to-child revision chains stay intact.
export const executeQueuedQueries = async (
  queries: QueuedQuery[],
): Promise<QueuedQueryResult> => {
  const objects: unknown[] = []
  let path: string | null = null
  for (const query of queries) {
    const { variables } = query as unknown as {
      name: string
      variables: string
    }
    const table = revTableOf(query)
    if (!table) {
      throw new Error(
        'keine Mutation gefunden für: ' +
          (query as unknown as { name?: string }).name,
      )
    }
    const thisPath = `/${table}_rev`
    if (path && thisPath !== path) {
      throw new Error('a batch must only contain queries of one table')
    }
    path = thisPath
    const { object } = JSON.parse(variables as string)
    objects.push(object)
  }
  if (!path) {
    throw new Error('keine Queries zum Ausführen übergeben')
  }
  try {
    await store
      .get(apiClientAtom)
      ?.post(path, objects, 'resolution=merge-duplicates,return=minimal')
    return {}
  } catch (error) {
    const apiError = error as ApiError
    // normalize to the {error} shape the observer classifies.
    // network failures carry no status
    return {
      error: {
        message: apiError.message,
        status: apiError.status,
        code: apiError.code,
        isNetwork: !apiError.status,
      },
    }
  }
}
