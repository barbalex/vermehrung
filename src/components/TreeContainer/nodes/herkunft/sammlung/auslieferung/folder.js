import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const herkunftId = url[1]
  const sammlungId = url[3]

  const herkunftNodes = nodes.filter((n) => n.parentId === 'herkunftFolder')
  const herkunftIndex = findIndex(
    herkunftNodes,
    (n) => n.id === `herkunft${herkunftId}`,
  )
  const sammlungNodes = nodes.filter(
    (n) => n.parentId === `herkunft${herkunftId}SammlungFolder`,
  )
  const sammlungIndex = findIndex(
    sammlungNodes,
    (n) => n.id === `herkunft${herkunftId}Sammlung${sammlungId}`,
  )

  const herkuenfte = data?.herkunft ?? []
  const herkunft = herkuenfte.find((a) => a.id === herkunftId)
  const sammlungen = herkunft?.sammlungs ?? []
  const sammlung = sammlungen.find((s) => s.id === sammlungId)
  const lieferungen = sammlung?.lieferungs ?? []
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  // only return if parent exists
  if (
    !nodes
      .map((n) => n.id)
      .includes(`herkunft${herkunftId}Sammlung${sammlungId}`)
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
      sort: [2, herkunftIndex, 2, sammlungIndex, 1],
      hasChildren: true,
    },
  ]
}
