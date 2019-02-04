import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const artId = url[1]
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)

  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const sammlungen = get(art, 'sammlungsByartId', [])
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`art${artId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'artSammlungFolder',
      id: `art${artId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Arten', artId, 'Sammlungen'],
      sort: [1, artIndex, 2],
      hasChildren: true,
    },
  ]
}
