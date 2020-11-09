const gartenFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showGarten } = store.tree
  const gaerten = store.gartensFiltered
  const nr = !initialDataQueried && !gaerten.length ? '...' : gaerten.length

  if (!showGarten) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Gärten',
      id: 'gartenFolder',
      label: `Gärten (${nr})`,
      url: ['Gaerten'],
      sort: [4],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}

export default gartenFolder
