import gql from 'graphql-tag'
import { navigate } from 'gatsby'
import get from 'lodash/get'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'

export default async ({ node, store, client }) => {
  console.log('createNew', node)
  // get parent table, parent table id and table from url
  const { activeNodeArray, setActiveNodeArray, refetch } = store.tree

  // get table and id from url
  let parentTableTitle = null
  let parentTable = null
  let parentId = null
  let tableTitle = null
  let table = null
  let fkExists = null
  let fkName = null

  if (node.nodeType === 'table') {
    tableTitle = node.url.slice(-2)[0]
    table = tableFromTitleHash[tableTitle]
    // need to check for Werte-Listen and top level tables
    if (node.url.length > 2 && !isNaN(node.url[2])) {
      parentId = node.url.slice(-3)[0]
    }
    if (parentId && node.url.length > 3) {
      parentTableTitle = node.url.slice(-4)[0]
      parentTable = parentTableTitle
        ? tableFromTitleHash[parentTableTitle]
        : null
    }
  } else if (node.nodeType === 'folder') {
    tableTitle = node.url.slice(-1)[0]
    table = tableFromTitleHash[tableTitle]
    // need to check for Werte-Listen and top level tables
    if (node.url.length > 1 && !isNaN(node.url[1])) {
      parentId = node.url.slice(-2)[0]
    }
    if (parentId && node.url.length > 2) {
      parentTableTitle = node.url.slice(-3)[0]
      parentTable = parentTableTitle
        ? tableFromTitleHash[parentTableTitle]
        : null
    }
  }
  // foreign key to parent should exist if parentTable and it's id exist
  fkExists = !!parentId && !!parentTable
  if (fkExists) fkName = `${parentTable}_id`
  let object = `{}`
  if (fkExists) object = `{ ${fkName}: ${parentId} }`
  let returning = '{ id }'
  if (fkExists) returning = `{ id, ${fkName} }`
  // TODO:
  // add new dataset to table
  const mutation = gql`
    mutation insertDataset {
      insert_${table} (objects: [${object}]) {
        returning ${returning}
      }
    }
  `
  let responce
  try {
    responce = await client.mutate({
      mutation,
    })
  } catch (error) {
    return console.log('Error deleting dataset', error.message)
  }
  const newObject = get(responce, `data.insert_${table}.returning`, [])[0]
  if (newObject && newObject.id) {
    const newActiveNodeArray = [...activeNodeArray, newObject.id]
    navigate(`/Vermehrung/${newActiveNodeArray.join('/')}`)
    setActiveNodeArray(newActiveNodeArray)
    refetch()
  }
}
