const artSammlungHerkunftAuslieferungFolder = ({
  sammlung,
  sammlungIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Lieferungen',
  id: `${artId}/${herkunft.id}/${sammlung.id}/LieferungFolder`,
  label: `Aus-Lieferungen (${children.length})`,
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
  childrenCount: children.length,
})

export default artSammlungHerkunftAuslieferungFolder
