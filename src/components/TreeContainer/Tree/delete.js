import gql from 'graphql-tag'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'

export default async ({ node, store, client }) => {
  const { activeNodeArray, setActiveNodeArray } = store.tree
  // get table and id from url
  const title = node.url.slice(-2)[0]
  const id = node.url.slice(-1)[0]
  const table = tableFromTitleHash[title]

  const refetchQueries = ['TreeQueryForTreeContainer']
  // ensure list form's query is refetched
  const tableExtract = upperFirst(camelCase(table))
  const listQueryName = `${tableExtract}QueryFor${tableExtract}s`
  refetchQueries.push(listQueryName)

  const mutation = gql`
    mutation deleteDatasetInTree {
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
      refetchQueries,
    })
  } catch (error) {
    return console.log('Error deleting dataset', error.message)
  }
  setActiveNodeArray(activeNodeArray.slice(0, -1))
}
