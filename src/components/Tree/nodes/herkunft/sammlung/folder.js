import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const herkunftId = url[1]
  const herkunftNodes = nodes.filter(n => n.parentId === 'herkunftFolder')
  const herkunftIndex = findIndex(
    herkunftNodes,
    n => n.id === `herkunft${herkunftId}`,
  )

  const herkuenfte = get(data, 'herkunft', [])
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = get(herkunft, 'sammlungsByherkunftId', [])
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  return [
    {
      nodeType: 'folder',
      menuType: 'herkunftSammlungFolder',
      id: `herkunft${herkunftId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Herkuenfte', herkunftId, 'Sammlungen'],
      sort: [3, herkunftIndex, 2],
      hasChildren: true,
    },
  ]
}
