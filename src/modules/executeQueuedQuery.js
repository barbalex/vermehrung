import { store, apiClientAtom } from '../store/index.js'

// a queued query is always an insert into a <table>_rev table,
// named mutateInsert_<table>_rev_one, with the revision object and its
// upsert info as variables (the same shape the graphql mutation used).
// PostgREST upserts via Prefer: resolution=merge-duplicates, which makes
// replaying the identical mutation after a reconnect a no-op - exactly
// what the on_conflict clause expressed.
export const executeQueuedQuery = async (query) => {
  const { name, variables } = query
  const match = name?.match?.(/^mutateInsert_(.+)_rev_one$/)
  if (!match) {
    throw new Error('keine Mutation gefunden für: ' + name)
  }
  const { object } = JSON.parse(variables)
  try {
    await store
      .get(apiClientAtom)
      .post(`/${match[1]}_rev`, object, 'resolution=merge-duplicates,return=minimal')
    return {}
  } catch (error) {
    // normalize to the {error} shape the observer classifies.
    // network failures carry no status
    return {
      error: {
        message: error.message,
        status: error.status,
        code: error.code,
        isNetwork: !error.status,
      },
    }
  }
}
