import gql from 'graphql-tag'
import { navigate } from 'gatsby'
import get from 'lodash/get'
import last from 'lodash/last'
//import { getSnapshot } from 'mobx-state-tree'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'
import {
  art,
  garten,
  herkunft,
  kultur,
  kulturEvent,
  kulturInventar,
  lieferung,
  person,
  sammlung,
  zaehlung,
} from '../../../utils/fragments'

const fragments = {
  art: art,
  garten: garten,
  herkunft: herkunft,
  kultur: kultur,
  kultur_event: kulturEvent,
  kultur_inventar: kulturInventar,
  lieferung: lieferung,
  person: person,
  sammlung: sammlung,
  zaehlung: zaehlung,
}
const fragmentFieldsNames = {
  art: 'ArtFields',
  garten: 'GartenFields',
  herkunft: 'HerkunftFields',
  kultur: 'KulturFields',
  kultur_event: 'KulturEventFields',
  kultur_inventar: 'KulturInventarFields',
  lieferung: 'LieferungFields',
  person: 'PersonFields',
  sammlung: 'SammlungFields',
  zaehlung: 'ZaehlungFields',
}

export default async ({ node, store, client }) => {
  // get parent table, parent table id and table from url
  const { setActiveNodeArray, refetch, addOpenNodes } = store.tree
  const { nodeType, url } = node

  // get table and id from url
  let parentTableTitle = null
  let parentTable = null
  let parentId = null
  let tableTitle = null
  let table = null
  let fkExists = null
  let fkName = null
  let artId = null

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
    // need to get art_id from kultur and set it
    const query = gql`
      query getArt {
        kultur(where: { id: { _eq: ${parentId} } }) {
          id
          art_id
        }
      }
    `
    let responce
    try {
      responce = await client.query({
        query,
      })
    } catch (error) {
      return console.log('Error querying parent kultur', error.message)
    }
    artId = get(responce, 'data.kultur[0].art_id')
    //console.log({ responce, artId })
  }
  if (table === 'lieferung' && parentTable === 'sammlung') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    // need to get art_id from sammlung and set it
    const query = gql`
      query getArt {
        sammlung(where: { id: { _eq: ${parentId} } }) {
          id
          art_id
        }
      }
    `
    let responce
    try {
      responce = await client.query({
        query,
      })
    } catch (error) {
      return console.log('Error querying parent kultur', error.message)
    }
    artId = get(responce, 'data.sammlung[0].art_id')
    //console.log({ responce, artId, parentId })
  }
  let mutation
  if (fkExists) {
    const returning = `{ ...${fragmentFieldsNames[table]} }`
    mutation = gql`
      mutation insertDataset {
        insert_${table} (objects: [
          {
            ${fkName}: ${parentId}${artId ? `, art_id: ${artId}` : ''}
          }
        ]) {
          returning ${returning}
        }
      }
      ${fragments[table]}
    `
  } else {
    mutation = gql`
      mutation insertDataset {
        insert_${table} (objects: [{}]) {
          returning { id }
        }
      }
    `
  }
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
    if (isNaN(last(node.url))) {
      newActiveNodeArray = [...node.url, newObject.id]
    } else {
      newActiveNodeArray = [...node.url.slice(0, -1), newObject.id]
    }
    setActiveNodeArray(newActiveNodeArray)
    /*console.log({
      responce,
      nodeUrl: node.url.slice(),
      newActiveNodeArray,
      activeNodeArray: activeNodeArray.slice(),
      newObject,
      openNodes: getSnapshot(openNodes),
    })*/
    // add node.url just in case it was not yet open
    addOpenNodes([newActiveNodeArray, node.url])
    navigate(`/Vermehrung/${newActiveNodeArray.join('/')}`)
    setTimeout(() => refetch())
    //refetch()
  }
}
