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
): Promise<QueuedQueryResult> => {
  const { name, variables } = query as unknown as {
    name: string
    variables: string
  }
  const match = name?.match?.(/^mutateInsert_(.+)_rev_one$/)
  if (!match) {
    throw new Error('keine Mutation gefunden für: ' + name)
  }
  const { object } = JSON.parse(variables as string)
  try {
    await store
      .get(apiClientAtom)
      ?.post(
        `/${match[1]}_rev`,
        object,
        'resolution=merge-duplicates,return=minimal',
      )
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
