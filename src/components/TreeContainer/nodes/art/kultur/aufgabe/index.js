import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const artId = url[1]
  const kulturId = url[3]
  const arten = get(data, 'art', [])
  const art = arten.find(a => a.id === artId)
  const kulturen = get(art, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const aufgaben = get(kultur, 'aufgaben', [])
  console.log('nodes art kultur aufgaben aufgabe', { data, kultur, aufgaben })

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
    aufgaben
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`art${artId}Kultur${kulturId}AufgabeFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'
        const label = `${datum}: ${get(el, 'aufgabe') || '(nicht beschrieben)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Aufgabe',
          table: 'aufgabe',
          id: `art${artId}Kultur${kulturId}Aufgabe${el.id}`,
          parentId: `art${artId}Kultur${kulturId}AufgabeFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Aufgaben', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 1, kulturIndex, 4, index]
        return el
      })
  )
}
