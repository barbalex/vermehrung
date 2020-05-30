import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const herkunftId = url[1]

  const herkunftNodes = nodes.filter((n) => n.parentId === 'herkunftFolder')
  const herkunftIndex = findIndex(
    herkunftNodes,
    (n) => n.id === `herkunft${herkunftId}`,
  )

  const herkuenfte = data?.herkunft ?? []
  const herkunft = herkuenfte.find((a) => a.id === herkunftId)
  const sammlungen = herkunft?.sammlungs ?? []
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`herkunft${herkunftId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: `herkunft${herkunftId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Herkuenfte', herkunftId, 'Sammlungen'],
      sort: [2, herkunftIndex, 2],
      hasChildren: true,
    },
  ]
}
