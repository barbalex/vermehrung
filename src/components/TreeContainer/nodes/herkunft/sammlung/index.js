import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import filterNodes from '../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const herkunftId = url[1]

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

  const herkunftNodes = nodes.filter(n => n.parentId === 'herkunftFolder')
  const herkunftIndex =
    findIndex(herkunftNodes, n => n.id === `herkunft${herkunftId}`) || 0

  return (
    sammlungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`herkunft${herkunftId}SammlungFolder`),
      )
      .map(el => {
        const datum = get(el, 'datum', '(kein Datum)')
        const artName = get(el, 'artByartId.art_ae_art.name', '(keine Art)')
        const label = `${datum}: ${artName}`

        return {
          nodeType: 'table',
          menuTitle: 'Sammlung',
          table: 'sammlung',
          id: `herkunft${herkunftId}Sammlung${el.id}`,
          parentId: `herkunft${herkunftId}SammlungFolder`,
          label,
          url: ['Herkuenfte', herkunftId, 'Sammlungen', el.id],
          hasChildren: true,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [3, herkunftIndex, 2, index]
        return el
      })
  )
}
