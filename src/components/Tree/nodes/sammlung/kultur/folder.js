import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ data, loading, url, nodes }) => {
  const sammlungId = url[1]
  const sammlungen = get(data, 'sammlung', [])
  const sammlung = sammlungen.find(p => p.id === sammlungId)
  const sammlungenInKultur = get(sammlung, 'sammlungInKultursBysammlungId', [])
  const nr =
    loading && !sammlungenInKultur.length ? '...' : sammlungenInKultur.length

  const sammlungNodes = nodes.filter(n => n.parentId === 'sammlungFolder')
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  return [
    {
      nodeType: 'folder',
      menuType: 'sammlungKulturFolder',
      id: `sammlung${sammlungId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Sammlungen', sammlungId, 'Kulturen'],
      sort: [6, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
