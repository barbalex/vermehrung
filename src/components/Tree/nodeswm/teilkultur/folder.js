const teilkulturFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showTeilkultur } = store.tree

  if (!showTeilkultur) return []

  const teilkulturen = store.teilkultursFiltered

  if (!teilkulturen.length) return []
  const nr =
    !initialDataQueried && !teilkulturen.length ? '...' : teilkulturen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: 'teilkulturFolder',
      label: `Teilkulturen (${nr})`,
      url: ['Teilkulturen'],
      sort: [6],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}

export default teilkulturFolder
