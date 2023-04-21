const artHerkunftKulturTeilkulturFolder = ({
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Teilkulturen',
  id: `${artId}/${herkunft.id}/${kulturId}/TeilkulturFolder`,
  label: `Teilkulturen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Teilkulturen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 1],
  hasChildren: true,
  childrenCount: count,
})

export default artHerkunftKulturTeilkulturFolder
