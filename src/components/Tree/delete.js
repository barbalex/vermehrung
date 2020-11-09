import tableFromTitleHash from '../../utils/tableFromTitleHash'

const deleteModule = async ({ node, store }) => {
  const {
    activeNodeArray,
    setActiveNodeArray,
    removeOpenNodeWithChildren,
  } = store.tree
  // get table and id from url
  const title = node.url.slice(-2)[0]
  const id = node.url.slice(-1)[0]
  const table = tableFromTitleHash[title]

  const me = store[`${table}s`].get(id)
  if (!me?.delete) throw new Error(`Kein Modell für Tabelle ${table} gefunden`)
  me.delete()
  setActiveNodeArray(activeNodeArray.slice(0, -1))
  // need to remove openNode from openNodes
  removeOpenNodeWithChildren(node.url)
}

export default deleteModule
