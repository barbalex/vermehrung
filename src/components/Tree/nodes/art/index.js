import isEqual from 'lodash/isEqual'

export default ({ store }) => {
  const { showArt, visibleOpenNodes } = store.tree
  if (!showArt) return []

  return (
    store.artsFiltered
      // only show if parent node exists
      .filter(() => visibleOpenNodes.some((node) => isEqual(['Arten'], node)))
      .map((n) => ({
        nodeType: 'table',
        menuTitle: 'Art',
        table: 'art',
        id: n.id,
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
