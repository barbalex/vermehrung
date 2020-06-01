import findIndex from 'lodash/findIndex'

export default ({ nodes, store, url }) => {
  const kulturId = url[1]

  const teilkulturs = store.teilkulturFiltered.filter(
    (z) => z.kultur_id === kulturId,
  )

  const kulturNodes = nodes.filter((n) => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `kultur${kulturId}`,
  )

  return (
    teilkulturs
      // only show if parent node exists
      .filter(() =>
        nodes.map((n) => n.id).includes(`kultur${kulturId}TeilkulturFolder`),
      )
      .map((el) => {
        const label = el.name ?? '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `kultur${kulturId}Teilkultur${el.id}`,
          parentId: `kultur${kulturId}TeilkulturFolder`,
          label,
          url: ['Kulturen', kulturId, 'Teilkulturen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 1, index]
        return el
      })
  )
}
