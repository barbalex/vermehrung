const artHerkunftKulturAuslieferungFolder = ({
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${artId}/${herkunft.id}/${kulturId}/AusLieferungFolder`,
  label: `Aus-Lieferungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Aus-Lieferungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 4],
  hasChildren: true,
  childrenCount: count,
})

export default artHerkunftKulturAuslieferungFolder
