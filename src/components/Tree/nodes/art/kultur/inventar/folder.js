import findIndex from 'lodash/findIndex'

export default ({ url, nodes }) => {
  const artId = url[1]
  const kulturId = url[3]
  const artNodes = nodes.filter(n => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, n => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'artKulturInventarFolder',
      id: `kultur${kulturId}InventarFolder`,
      label: 'Inventare',
      url: ['Arten', artId, 'Kulturen', kulturId, 'Inventare'],
      sort: [1, artIndex, 1, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
