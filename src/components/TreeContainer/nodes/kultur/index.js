import get from 'lodash/get'

export default ({ nodes, data }) => {
  const kulturen = get(data, 'kultur', [])

  return (
    kulturen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('kulturFolder'))
      .map(el => {
        const garten =
          get(el, 'garten.name') ||
          `(${get(el, 'garten.person.name') || 'kein Name'})`
        const art = get(el, 'art.art_ae_art.name') || '(keine Art)'

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `kultur${el.id}`,
          parentId: 'kulturFolder',
          label: `${garten}: ${art}`,
          url: ['Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [5, index]
        return el
      })
  )
}
