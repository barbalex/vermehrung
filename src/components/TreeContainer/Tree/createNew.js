import upperFirst from 'lodash/upperFirst'
import isUuid from 'is-uuid'

import tableFromTitleHash from '../../../utils/tableFromTitleHash'
import exists from '../../../utils/exists'

export default async ({ node, store, client }) => {
  // get parent table, parent table id and table from url
  const { nodeType, url } = node

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
    if (url.length > 1 && isUuid.v1(url[1])) {
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
      responce = await store.queryKultur(
        { where: { id: { _eq: parentId } } },
        (k) => k.id.art_id,
      )
    } catch (error) {
      return console.log('Error querying parent kultur', error.message)
    }
    additionalValuesToSet.art_id = responce?.data?.kultur?.[0]?.art_id
  }
  if (table === 'lieferung' && parentTable === 'sammlung') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    // need to get art_id from sammlung and set it
    let responce
    try {
      responce = await store.querySammlung(
        { where: { id: { _eq: parentId } } },
        (s) => s.id.art_id,
      )
    } catch (error) {
      return console.log('Error querying parent kultur', error.message)
    }
    additionalValuesToSet.art_id = responce?.data?.sammlung?.[0]?.art_id
  }
  if (table === 'lieferung' && parentTable === 'sammel_lieferung') {
    let responce
    try {
      responce = await store.querySammel_lieferung({
        where: { id: { _eq: parentId } },
      })
    } catch (error) {
      return console.log(
        'Error querying parent sammel_lieferung',
        error.message,
      )
    }
    const sammelLieferung = responce?.data?.sammel_lieferung?.[0]
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
  if (fkExists) additionalValuesToSet[fkName] = parentId

  store[`insert${upperFirst(table)}Rev`](additionalValuesToSet)
}
