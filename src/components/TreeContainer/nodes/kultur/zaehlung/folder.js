import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const kulturId = url[1]

  const zaehlungen = store.zaehlungsFiltered.filter(
    (z) => z.kultur_id === kulturId,
  )
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  const kulturNodes = nodes.filter((n) => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `kultur${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Kulturen', kulturId, 'Zaehlungen'],
      sort: [5, kulturIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    },
  ]
}
