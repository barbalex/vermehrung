import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = data?.kultur ?? []
  const kultur = kulturen.find((k) => k.id === kulturId)
  const tk = kultur?.kultur_option?.tk
  if (!tk) return []

  const teilkulturs = kultur?.teilkulturs ?? []
  const nr = loading && !teilkulturs.length ? '...' : teilkulturs.length

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
      menuTitle: 'Teilkulturen',
      id: `kultur${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: ['Kulturen', kulturId, 'Teilkulturen'],
      sort: [5, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
