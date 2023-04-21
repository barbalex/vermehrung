const artHerkunftKulturFolder = ({
  count,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Kulturen',
  id: `${artId}/${herkunft.id}/KulturFolder`,
  label: `Kulturen (${count})`,
  url: ['Arten', artId, 'Herkuenfte', herkunft.id, 'Kulturen'],
  sort: [1, artIndex, 1, herkunftIndex, 3],
  hasChildren: true,
  childrenCount: count,
})

export default artHerkunftKulturFolder
