import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

import compareLabel from '../../../compareLabel'
import filterNodes from '../../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = filterNodes({
    rows: get(data, 'art', []),
    filter: store.filter,
    table: 'art',
  })
  const art = arten.find(a => a.id === artId)
  const kulturen = filterNodes({
    rows: get(art, 'kultursByartId', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = filterNodes({
    rows: get(kultur, 'kulturInventarsBykulturId', []),
    filter: store.filter,
    table: 'inventar',
  })

  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `art${artId}Kultur${kulturId}`,
  )

  return (
    inventare
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}InventarFolder`),
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
          id: `art${artId}Kultur${kulturId}Inventar${el.id}`,
          parentId: `art${artId}Kultur${kulturId}InventarFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Inventare', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [1, artIndex, 1, kulturIndex, 5, index]
        return el
      })
  )
}
