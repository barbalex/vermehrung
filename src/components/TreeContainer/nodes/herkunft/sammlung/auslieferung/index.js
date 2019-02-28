import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'

export default ({ nodes, data, url, store }) => {
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

  const herkuenfte = get(data, 'herkunft', [])
  const herkunft = herkuenfte.find(a => a.id === herkunftId)
  const sammlungen = get(herkunft, 'sammlungsByherkunftId', [])
  const sammlung = sammlungen.find(s => s.id === sammlungId)
  const lieferungen = get(sammlung, 'lieferungsByvonSammlungId', [])

  return lieferungen
    .map(el => {
      const label = `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
        el,
        'personBypersonId.name',
        '(kein Name)',
      )}; ${get(el, 'lieferungTypWerteBytyp.wert', '(kein Typ)')}; ${get(
        el,
        'lieferungStatusWerteBystatus.wert',
        '(kein Status)',
      )}`

      return {
        nodeType: 'table',
        menuTitle: 'Aus-Lieferung',
        table: 'lieferung',
        id: `herkunft${herkunftId}Sammlung${sammlungId}Lieferung${el.id}`,
        parentId: `herkunft${herkunftId}Sammlung${sammlungId}LieferungFolder`,
        label,
        url: [
          'Herkuenfte',
          herkunftId,
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
      }
    })
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [3, herkunftIndex, 2, sammlungIndex, 1, index]
      return el
    })
}
