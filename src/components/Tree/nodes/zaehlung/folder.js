const zaehlungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showZaehlung } = store.tree

  if (!showZaehlung) return []

  const zaehlungen = store.zaehlungsFiltered
  const nr =
    !initialDataQueried && !zaehlungen.length ? '...' : zaehlungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: 'zaehlungFolder',
      label: `Zählungen (${nr})`,
      url: ['Zaehlungen'],
      sort: [7],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}

export default zaehlungFolder
