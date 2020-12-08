const artKulturZaehlungFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  children,
}) => [
  {
    nodeType: 'folder',
    menuTitle: 'Zählungen',
    id: `${artId}${kulturId}ZaehlungFolder`,
    label: `Zählungen (${children.length})`,
    url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
    sort: [1, artIndex, 2, kulturIndex, 2],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default artKulturZaehlungFolder
