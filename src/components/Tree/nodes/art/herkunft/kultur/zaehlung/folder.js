const artHerkunftKulturZaehlungFolder = ({
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Zählungen',
  id: `${artId}/${herkunft.id}/${kulturId}/ZaehlungFolder`,
  label: `Zählungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Zaehlungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 2],
  hasChildren: true,
  childrenCount: count,
})

export default artHerkunftKulturZaehlungFolder
