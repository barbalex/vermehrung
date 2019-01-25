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
      menuType: 'artKulturZaehlungFolder',
      id: `kultur${kulturId}ZaehlungFolder`,
      label: 'Zählungen',
      url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [1, artIndex, 1, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
