export const buildHerkunftSammlungAuslieferungFolder = ({
  sammlungId,
  sammlungIndex,
  herkunftId,
  herkunftIndex,
  children,
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
