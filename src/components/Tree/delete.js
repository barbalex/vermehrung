import tableFromTitleHash from '../../utils/tableFromTitleHash.json'

const deleteModule = async ({ node, store }) => {
  const { db } = store
  const {
    activeNodeArray,
    setActiveNodeArray,
    removeOpenNodeWithChildren,
  } = store.tree

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
  me.delete({ store })
  setActiveNodeArray(activeNodeArray.slice(0, -1))
  // need to remove openNode from openNodes
  removeOpenNodeWithChildren(node.url)
}

export default deleteModule
