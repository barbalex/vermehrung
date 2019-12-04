import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten') || []
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs') || []
  const kultur = kulturen.find(k => k.id === kulturId)
  const teilkulturen = get(kultur, 'teilkulturs') || []

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
    teilkulturen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}TeilkulturFolder`),
      )
      .map(el => {
        const label = el.name || '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `garten${gartenId}Kultur${kulturId}Teilkultur${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}TeilkulturFolder`,
          label,
          url: [
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Teilkulturen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 1, index]
        return el
      })
  )
}
