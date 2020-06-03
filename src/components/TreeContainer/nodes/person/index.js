export default ({ nodes, store }) =>
  store.personsFiltered
    // only show if parent node exists
    .filter(() => nodes.map((n) => n.id).includes('personFolder'))
    .map((el) => ({
      nodeType: 'table',
      menuTitle: 'Person',
      table: 'person',
      id: `person${el.id}`,
      parentId: 'personFolder',
      label: el?.name ?? '(kein Name)',
      url: ['Personen', el.id],
      hasChildren: true,
    }))
    .map((el, index) => {
      el.sort = [11, index]
      return el
    })
