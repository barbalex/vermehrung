import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'

export default ({ store }) => {
  const { showArt, openNodes } = store.tree
  if (!showArt) return []

  const nodes = store.artsFiltered
    // only show if parent node exists
    .filter(() => openNodes.some((node) => isEqual(['Arten'], node)))
    .map((n) => ({
      nodeType: 'table',
      menuTitle: 'Art',
      table: 'art',
      id: n.id,
      parentId: 'artFolder',
      label: n?.art_ae_art?.name ?? '(keine Art gewählt)',
      url: ['Arten', n.id],
      hasChildren: true,
    }))
    .map((n, index) => {
      n.sort = [1, index]
      return n
    })

  return sortBy(nodes, 'sort')
}
