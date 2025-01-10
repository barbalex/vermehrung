export const buildArtSammlungAuslieferungFolder = ({
  sammlungId,
  sammlungIndex,
  artId,
  artIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Lieferungen',
  id: `${artId}${sammlungId}LieferungFolder`,
  label: `Aus-Lieferungen (${children.length})`,
  url: ['Arten', artId, 'Sammlungen', sammlungId, 'Aus-Lieferungen'],
  sort: [1, artIndex, 2, sammlungIndex, 1],
  hasChildren: true,
  childrenCount: children.length,
})
