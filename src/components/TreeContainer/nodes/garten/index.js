export default ({ nodes, store }) =>
  store.gartenFiltered
    // only show if parent node exists
    .filter(() => nodes.map((n) => n.id).includes('gartenFolder'))
    .map((el) => ({
      nodeType: 'table',
      menuTitle: 'Garten',
      table: 'garten',
      id: `garten${el.id}`,
      parentId: 'gartenFolder',
      label: el.name ?? `(${el?.person?.name ?? 'keine Person gewählt'})`,
      url: ['Gaerten', el.id],
      hasChildren: true,
    }))
    .map((el, index) => {
      el.sort = [4, index]
      return el
    })
