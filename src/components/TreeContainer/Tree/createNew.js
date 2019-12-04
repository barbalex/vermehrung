import gql from 'graphql-tag'
import get from 'lodash/get'
import last from 'lodash/last'
//import { getSnapshot } from 'mobx-state-tree'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'
import {
  art,
  event,
  garten,
  herkunft,
  kultur,
  lieferung,
  sammelLieferung as sammelLieferungFragment,
  person,
  sammlung,
  zaehlung,
  teilkultur,
  teilzaehlung,
} from '../../../utils/fragments'
import exists from '../../../utils/exists'
import isString from '../../../utils/isString'

const fragments = {
  art: art,
  event: event,
  garten: garten,
  herkunft: herkunft,
  kultur: kultur,
  lieferung: lieferung,
  sammelLieferung: sammelLieferungFragment,
  person: person,
  sammlung: sammlung,
  zaehlung: zaehlung,
  teilkultur: teilkultur,
  teilzaehlung: teilzaehlung,
}
const fragmentFieldsNames = {
  art: 'ArtFields',
  event: 'EventFields',
  garten: 'GartenFields',
  herkunft: 'HerkunftFields',
  kultur: 'KulturFields',
  lieferung: 'LieferungFields',
  sammelLieferung: 'SammelLieferungFields',
  person: 'PersonFields',
  sammlung: 'SammlungFields',
  zaehlung: 'ZaehlungFields',
  teilkultur: 'TeilkulturFields',
  teilzaehlung: 'TeilzaehlungFields',
}

export default async ({ node, store, client }) => {
  // get parent table, parent table id and table from url
  const { enqueNotification } = store
  const { setActiveNodeArray, refetch, addOpenNodes } = store.tree
  const { nodeType, url } = node
  console.log('createNew', { nodeType, url: url.slice() })

  // get table and id from url
  let parentTableTitle = null
  let parentTable = null
  let parentId = null
  let tableTitle = null
  let table = null
  let fkExists = null
  let fkName = null
  let additionalValuesToSet = {}

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
    let responce
    try {
      responce = await client.query({
        query: gql`
          query getArt {
            kultur(where: { id: { _eq: ${parentId} } }) {
              id
              art_id
            }
          }
        `,
      })
    } catch (error) {
      return console.log('Error querying parent kultur', error.message)
    }
    additionalValuesToSet.art_id = get(responce, 'data.kultur[0].art_id')
  }
  if (table === 'lieferung' && parentTable === 'sammlung') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    // need to get art_id from sammlung and set it
    let responce
    try {
      responce = await client.query({
        query: gql`
          query getArt {
            sammlung(where: { id: { _eq: ${parentId} } }) {
              id
              art_id
            }
          }
        `,
      })
    } catch (error) {
      return console.log('Error querying parent kultur', error.message)
    }
    additionalValuesToSet.art_id = get(responce, 'data.sammlung[0].art_id')
  }
  if (table === 'lieferung' && parentTable === 'sammel_lieferung') {
    let responce
    try {
      responce = await client.query({
        query: gql`
          query getSammelLieferung {
            sammel_lieferung(where: { id: { _eq: ${parentId} } }) {
              ...SammelLieferungFields
            }
          }
          ${sammelLieferungFragment}
        `,
      })
    } catch (error) {
      return console.log(
        'Error querying parent sammel_lieferung',
        error.message,
      )
    }
    const sammelLieferung = get(responce, 'data.sammel_lieferung[0]')
    const entries = Object.entries(sammelLieferung)
      .filter(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => key !== '__typename',
      )
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => exists(value))
    for (const [key, value] of entries) {
      const keyToUse = key === 'id' ? 'sammel_lieferung_id' : key
      additionalValuesToSet[keyToUse] = value
    }
  }
  let mutation
  if (fkExists) additionalValuesToSet[fkName] = parentId
  if (Object.entries(additionalValuesToSet).length) {
    const objectString = Object.entries(additionalValuesToSet)
      .map(([key, value]) => {
        if (isString(value)) {
          return `${key}: "${value}"`
        }
        return `${key}: ${value}`
      })
      .join(', ')
    const returning = `{ ...${fragmentFieldsNames[table]} }`
    mutation = gql`
      mutation insertDataset {
        insert_${table} (objects: [
          {
            ${objectString}
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
    return enqueNotification({
      message: `Error inserting dataset: ${error.message}`,
      options: {
        variant: 'error',
      },
    })
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
    // add node.url just in case it was not yet open
    addOpenNodes([newActiveNodeArray, node.url])
    setTimeout(() => refetch())
  }
}
