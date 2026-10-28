export const buildHerkunftSammlungAuslieferungFolder = ({
  sammlungId,
  sammlungIndex,
  herkunftId,
  herkunftIndex,
  children,
}: {
  sammlungId: string
  sammlungIndex: number
  herkunftId: string
  herkunftIndex: number
  children: unknown[]
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${herkunftId}${sammlungId}SammlungLieferungFolder`,
  label: `Aus-Lieferungen (${children.length})`,
  url: ['Herkuenfte', herkunftId, 'Sammlungen', sammlungId, 'Aus-Lieferungen'],
  sort: [2, herkunftIndex, 2, sammlungIndex, 1],
  hasChildren: true,
  childrenCount: children.length,
})
