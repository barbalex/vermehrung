import { upperFirst, camelCase } from 'es-toolkit'
import isUuid from 'is-uuid'

import tableFromTitleHash from '../../utils/tableFromTitleHash.json'
import { exists } from '../../utils/exists.js'

export const createNew = async ({ node, store }) => {
  // get parent table, parent table id and table from url
  const { nodeType, url } = node
  const { db } = store
  const { setActiveNodeArray } = store.tree

  // get table and id from url
  let parentTableTitle = null
  let parentTable = null
  let parentId = null
  let tableTitle = null
  let table = null
  let fkExists = null
  let fkName = null
  const additionalValuesToSet = {}

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
      parentTable =
        parentTableTitle ? tableFromTitleHash[parentTableTitle] : null
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
      parentTable =
        parentTableTitle ? tableFromTitleHash[parentTableTitle] : null
    }
  }
  // foreign key to parent should exist if parentTable and it's id exist
  fkExists = !!parentId && !!parentTable
  // edge case of kultur under sammlung > aus-lieferung where kultur is 1:side of lieferung
  if (table === 'kultur' && parentTable === 'lieferung') fkExists = false
  if (fkExists) fkName = `${parentTable}_id`
  if (table === 'lieferung' && parentTable === 'kultur') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    if (tableTitle === 'An-Lieferungen') fkName = `nach_${parentTable}_id`
    // need to get art_id from kultur and set it
    let kultur
    try {
      kultur = await db.get('kultur').find(parentId)
    } catch {}
    additionalValuesToSet.art_id = kultur?.art_id
  }
  if (table === 'lieferung' && parentTable === 'sammlung') {
    // need to choose von_kultur_id or nach_kultur_id
    if (tableTitle === 'Aus-Lieferungen') fkName = `von_${parentTable}_id`
    // need to get art_id from sammlung and set itconst kultur = parentId
    let sammlung
    try {
      sammlung = await db.get('sammlung').find(parentId)
    } catch {}
    additionalValuesToSet.art_id = sammlung?.art_id
  }
  if (table === 'lieferung' && parentTable === 'sammel_lieferung') {
    let sammelLieferung
    try {
      sammelLieferung = await db.get('sammel_lieferung').find(parentId)
    } catch {}
    if (!sammelLieferung) return console.log('no sammelLieferung found!')
    const entries = Object.entries(sammelLieferung)
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, value]) =>
          !key.startsWith('_') &&
          ![
            'lieferungs',
            'kulturByNachKulturId',
            'kulturByVonKulturId',
            'person',
            'sammlung',
          ].includes(key),
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, value]) => exists(value))
    for (const [key, value] of entries) {
      const keyToUse = key === 'id' ? 'sammel_lieferung_id' : key
      additionalValuesToSet[keyToUse] = value
    }
  }
  if (fkExists) additionalValuesToSet[fkName] = parentId

  console.log('tree createNew', {
    additionalValuesToSet,
    table,
    parentTable,
    parentId,
    fkExists,
  })

  // need to navigate to url
  // as insertTableRev assumes that either parent or sibling url is active
  setActiveNodeArray([...url])

  // delay insert to enable activeNodeArray to catch up
  setTimeout(() =>
    store[`insert${upperFirst(camelCase(table))}Rev`]({
      values: additionalValuesToSet,
    }),
  )
}
