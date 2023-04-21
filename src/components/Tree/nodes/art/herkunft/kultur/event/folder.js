const artHerkunftKulturEventFolder = ({
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Events',
  id: `${artId}/${herkunft.id}/${kulturId}/EventFolder`,
  label: `Events (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Events',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 3, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})

export default artHerkunftKulturEventFolder
