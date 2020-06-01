import findIndex from 'lodash/findIndex'

export default ({ nodes, store, url }) => {
  const personId = url[1]

  const gaerten = store.gartensFiltered.filter((s) => s.person_id === personId)

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )

  return (
    gaerten
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`person${personId}GartenFolder`),
      )
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Garten',
        table: 'garten',
        id: `person${personId}Garten${el.id}`,
        parentId: `person${personId}GartenFolder`,
        label: el.name || `(${el?.person?.name ?? 'kein Name'})`,
        url: ['Personen', personId, 'Gaerten', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [11, personIndex, 2, index]
        return el
      })
  )
}
