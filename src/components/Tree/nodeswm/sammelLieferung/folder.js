const sammelLieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showSammelLieferung } = store.tree

  if (!showSammelLieferung) return []

  const sammelLieferungen = store.sammelLieferungsFiltered
  const nr =
    !initialDataQueried && !sammelLieferungen.length
      ? '...'
      : sammelLieferungen.length

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammel-Lieferungen',
      id: 'sammelLieferungFolder',
      label: `Sammel-Lieferungen (${nr})`,
      url: ['Sammel-Lieferungen'],
      sort: [9],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}

export default sammelLieferungFolder
