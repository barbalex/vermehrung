import { store, gqlClientAtom } from '../store/index.js'
import { mutations } from '../utils/mutations.js'

export const executeQueuedQuery = async (query) => {
  const { name, variables } = query
  const mutation = mutations[name]
  if (!mutation) throw new Error('keine Mutation gefunden für: ' + name)

  const gqlClient = store.get(gqlClientAtom)
  // see: https://formidable.com/open-source/urql/docs/concepts/core-package/#one-off-queries-and-mutations
  if (variables) {
    return gqlClient.mutation(mutation, JSON.parse(variables)).toPromise()
  }
  return gqlClient.mutation(mutation).toPromise()
}
