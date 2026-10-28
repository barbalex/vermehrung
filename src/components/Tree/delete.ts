import type { TreeNode } from './nodes/index.ts'

import tableFromTitleHash from '../../utils/tableFromTitleHash.json'

import {
  store,
  dbAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNodeWithChildren,
} from '../../store/index.ts'

export const deleteDataset = async ({ node }: { node: TreeNode }) => {
  const db = store.get(dbAtom)
  const activeNodeArray = store.get(activeNodeArrayAtom)

  // get table and id from url
  const title = node.url.slice(-2)[0]
  const id = node.url.slice(-1)[0]
  if (!id) throw new Error(`Keine id gefunden`)
  const table = tableFromTitleHash[title as keyof typeof tableFromTitleHash]

  let me
  try {
    me = (await db?.get(table).find(id as string)) as unknown as
      { delete?: () => Promise<void> } | undefined
  } catch {}
  if (!me?.delete) throw new Error(`Kein Modell für Tabelle ${table} gefunden`)
  me.delete()
  setActiveNodeArray(activeNodeArray.slice(0, -1))
  // need to remove openNode from openNodes
  removeOpenNodeWithChildren(node.url)
}
