import gql from 'graphql-tag'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'

export default async ({ node, store, client }) => {
  const { activeNodeArray, setActiveNodeArray } = store.tree
  // get table and id from url
  const title = node.url.slice(-2)[0]
  const id = node.url.slice(-1)[0]
  const table = tableFromTitleHash[title]

  const mutation = gql`
    mutation deleteDataset {
      delete_${table} (where: {id: {_eq: ${id}}}) {
        returning {
          id
        }
      }
    }
  `
  try {
    await client.mutate({
      mutation,
    })
  } catch (error) {
    console.log('Error deleting dataset', error.message)
  }

  setActiveNodeArray(activeNodeArray.slice(0, -1))
  store.tree.refetch()
}
