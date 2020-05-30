export default ({ nodes, data }) =>
  (data?.art ?? [])
    // only show if parent node exists
    .filter(() => nodes.map((n) => n.id).includes('artFolder'))
    .map((n) => ({
      nodeType: 'table',
      menuTitle: 'Art',
      table: 'art',
      id: `art${n.id}`,
      parentId: 'artFolder',
      label: n?.art_ae_art?.name ?? '(keine Art gewählt)',
      url: ['Arten', n.id],
      hasChildren: true,
    }))
    .map((n, index) => {
      n.sort = [1, index]
      return n
    })
