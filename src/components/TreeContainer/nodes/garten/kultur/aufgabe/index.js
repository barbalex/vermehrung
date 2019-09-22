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
  const aufgaben = get(kultur, 'aufgaben', [])

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
    aufgaben
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}AufgabeFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const label = `${datum}: ${get(el, 'aufgabe') || '(nicht beschrieben)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Aufgabe',
          table: 'aufgabe',
          id: `garten${gartenId}Kultur${kulturId}Aufgabe${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}AufgabeFolder`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Aufgaben', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 4, index]
        return el
      })
  )
}
