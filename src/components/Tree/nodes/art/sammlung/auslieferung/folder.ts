export const buildArtSammlungAuslieferungFolder = ({
  sammlungId,
  sammlungIndex,
  artId,
  artIndex,
  children,
}: {
  sammlungId: string
  sammlungIndex: number
  artId: string
  artIndex: number
  children: unknown[]
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
