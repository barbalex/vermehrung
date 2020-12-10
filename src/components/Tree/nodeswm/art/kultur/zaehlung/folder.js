const artKulturZaehlungFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  count,
}) => [
  {
    nodeType: 'folder',
    menuTitle: 'Zählungen',
    id: `${artId}${kulturId}ZaehlungFolder`,
    label: `Zählungen (${count})`,
    url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
    sort: [1, artIndex, 2, kulturIndex, 2],
    hasChildren: true,
    childrenCount: count,
  },
]

export default artKulturZaehlungFolder
