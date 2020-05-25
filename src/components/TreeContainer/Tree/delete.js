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

  const me = store[`${table}s`].get(id)
  console.log('tree delete, me:', me)
  me.delete()
  setActiveNodeArray(activeNodeArray.slice(0, -1))
}
