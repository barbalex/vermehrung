const artKulturAnlieferungFolder = ({
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'An-Lieferungen',
  id: `${artId}/${herkunft.id}/${kulturId}/AnLieferungFolder`,
  label: `An-Lieferungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'An-Lieferungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 3, kulturIndex, 3],
  hasChildren: true,
  childrenCount: count,
})

export default artKulturAnlieferungFolder
