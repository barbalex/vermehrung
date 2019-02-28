import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
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
    n => n.id === `herkunft${herkunftId}Sammlung${sammlungId}`,
  )

  const herkuenfte = filterNodes({
    rows: get(data, 'herkunft', []),
    filter: store.filter,
    table: 'herkunft',
  })
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = filterNodes({
    rows: get(herkunft, 'sammlungsByherkunftId', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = filterNodes({
    rows: get(sammlung, 'lieferungsByvonSammlungId', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  // only return if parent exists
  if (
    !nodes.map(n => n.id).includes(`herkunft${herkunftId}Sammlung${sammlungId}`)
  )
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `herkunft${herkunftId}Sammlung${sammlungId}SammlungLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: [
        'Herkuenfte',
        herkunftId,
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
      ],
      sort: [3, herkunftIndex, 2, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
