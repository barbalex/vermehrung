import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kultur_inventars', [])

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    inventare
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}InventarFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'
        const kasten = get(el, 'kasten')
        const kastenLabel = kasten ? `Kasten: ${kasten}` : '(kein Kasten)'
        const beet = get(el, 'beet')
        const beetLabel = beet ? `Beet: ${beet}` : '(kein Beet)'
        const nr = get(el, 'nr')
        const nrLabel = nr ? `Nr: ${nr}` : '(keine Nr)'
        const label = `${datum}: ${kastenLabel}, ${beetLabel}, ${nrLabel}`

        return {
          nodeType: 'table',
          menuTitle: 'Inventar',
          table: 'inventar',
          id: `garten${gartenId}Kultur${kulturId}Inventar${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}InventarFolder`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Inventare', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [2, gartenIndex, 1, kulturIndex, 5, index]
        return el
      })
  )
}
