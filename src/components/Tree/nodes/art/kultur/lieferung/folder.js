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
      menuType: 'artKulturLieferungFolder',
      id: `kultur${kulturId}LieferungFolder`,
      label: 'Lieferungen',
      url: ['Arten', artId, 'Kulturen', kulturId, 'Lieferungen'],
      sort: [1, artIndex, 1, kulturIndex, 2],
      hasChildren: true,
    },
  ]
}
