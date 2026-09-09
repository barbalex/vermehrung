import tableFromTitleHash from '../../utils/tableFromTitleHash.json'

import {
  store,
  dbAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNodeWithChildren,
} from '../../store/index.js'

export const deleteDataset = async ({ node }) => {
  const db = store.get(dbAtom)
  const activeNodeArray = store.get(activeNodeArrayAtom)

  // get table and id from url
  const title = node.url.slice(-2)[0]
  const id = node.url.slice(-1)[0]
  if (!id) throw new Error(`Keine id gefunden`)
  const table = tableFromTitleHash[title]

  let me
  try {
    me = await db.get(table).find(id)
  } catch {}
  if (!me?.delete) throw new Error(`Kein Modell für Tabelle ${table} gefunden`)
  me.delete()
  setActiveNodeArray(activeNodeArray.slice(0, -1))
  // need to remove openNode from openNodes
  removeOpenNodeWithChildren(node.url)
}
