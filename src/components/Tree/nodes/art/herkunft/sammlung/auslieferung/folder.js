const artSammlungHerkunftAuslieferungFolder = ({
  sammlung,
  sammlungIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Lieferungen',
  id: `${artId}/${herkunft.id}/${sammlung.id}/LieferungFolder`,
  label: `Aus-Lieferungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Sammlungen',
    sammlung.id,
    'Aus-Lieferungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 1, sammlungIndex, 1],
  hasChildren: true,
  childrenCount: count,
})

export default artSammlungHerkunftAuslieferungFolder
