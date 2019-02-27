import gql from 'graphql-tag'
import { navigate } from 'gatsby'
import get from 'lodash/get'
import last from 'lodash/last'
import { getSnapshot } from 'mobx-state-tree'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'

export default async ({ node, store, client }) => {
  // get parent table, parent table id and table from url
  const { activeNodeArray, setActiveNodeArray, refetch } = store.tree
  const { nodeType, url } = node

  // get table and id from url
  let parentTableTitle = null
  let parentTable = null
  let parentId = null
  let tableTitle = null
  let table = null
  let fkExists = null
  let fkName = null

  if (nodeType === 'table') {
    tableTitle = url.slice(-2)[0]
    table = tableFromTitleHash[tableTitle]
    // need to check for top level tables
    if (url.length > 2) {
      parentId = url.slice(-3)[0]
      // need to check for Werte-Listen
      if (isNaN(parentId)) parentId = null
    }
    if (parentId && url.length > 3) {
      parentTableTitle = url.slice(-4)[0]
      parentTable = parentTableTitle
        ? tableFromTitleHash[parentTableTitle]
        : null
    }
  } else if (nodeType === 'folder') {
    tableTitle = url.slice(-1)[0]
    table = tableFromTitleHash[tableTitle]
    // need to check for Werte-Listen and top level tables
    if (url.length > 1 && !isNaN(url[1])) {
      parentId = url.slice(-2)[0]
    }
    if (parentId && url.length > 2) {
      parentTableTitle = url.slice(-3)[0]
      parentTable = parentTableTitle
        ? tableFromTitleHash[parentTableTitle]
        : null
    }
  }
  // foreign key to parent should exist if parentTable and it's id exist
  fkExists = !!parentId && !!parentTable
  if (fkExists) fkName = `${parentTable}_id`
  if (table === 'lieferung' && parentTable === 'kultur') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    if (tableTitle === 'An-Lieferungen') fkName = `nach_${parentTable}_id`
    // TODO: need to get art_id from kultur and set it
  }
  if (table === 'lieferung' && parentTable === 'sammlung') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    // TODO: need to get art_id from sammlung and set it
  }
  let object = `{}`
  if (fkExists) object = `{ ${fkName}: ${parentId} }`
  let returning = '{ id }'
  if (fkExists) returning = `{ id, ${fkName} }`
  /*console.log('createNew', {
    fkExists,
    fkName,
    parentId,
    object,
    parentTable,
    node,
    nodeUrl: getSnapshot(url),
    activeNodeArray: activeNodeArray.slice(),
  })*/
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
    return console.log('Error inserting dataset', error.message)
  }
  const newObject = get(responce, `data.insert_${table}.returning`, [])[0]
  if (newObject && newObject.id) {
    let newActiveNodeArray
    // slice if last is number
    if (isNaN(last(activeNodeArray.slice()))) {
      newActiveNodeArray = [...activeNodeArray, newObject.id]
    } else {
      newActiveNodeArray = [...activeNodeArray.slice(0, -1), newObject.id]
    }
    navigate(`/Vermehrung/${newActiveNodeArray.join('/')}`)
    setActiveNodeArray(newActiveNodeArray)
    refetch()
  }
}
