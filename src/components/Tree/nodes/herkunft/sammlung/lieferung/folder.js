import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const herkunftId = url[1]
  const sammlungId = url[3]

  const herkunftNodes = nodes.filter(n => n.parentId === 'herkunftFolder')
  const herkunftIndex = findIndex(
    herkunftNodes,
    n => n.id === `herkunft${herkunftId}`,
  )
  const sammlungNodes = nodes.filter(
    n => n.parentId === `herkunft${herkunftId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    n => n.id === `sammlung${sammlungId}`,
  )

  const herkuenfte = get(data, 'herkunft', [])
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = get(herkunft, 'sammlungsByherkunftId', [])
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])
  const nr = loading ? '...' : lieferungen.length

  return [
    {
      nodeType: 'folder',
      menuType: 'herkunftSammlungLieferungFolder',
      id: `herkunft${herkunftId}SammlungLieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Herkuenfte', herkunftId, 'Sammlungen', sammlungId, 'Lieferungen'],
      sort: [3, herkunftIndex, 2, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
