import isEqual from 'lodash/isEqual'

export default ({ store }) => {
  if (!store.tree.showArt) return []

  return (
    store.artsFiltered
      // only show if parent node exists
      .filter(() =>
        store.tree.openNodes.some((node) => isEqual(['Arten'], node)),
      )
      .map((n) => ({
        nodeType: 'table',
        menuTitle: 'Art',
        table: 'art',
        id: `art${n.id}`,
        parentId: 'artFolder',
        label: n?.art_ae_art?.name ?? '(keine Art gewählt)',
        url: ['Arten', n.id],
        hasChildren: true,
      }))
      .map((n, index) => {
        n.sort = [1, index]
        return n
      })
  )
}
