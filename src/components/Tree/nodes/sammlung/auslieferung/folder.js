export const buildSammlungAuslieferungFolder = ({
  count,
  sammlungIndex,
  sammlungId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${sammlungId}LieferungFolder`,
  label: `Aus-Lieferungen (${count})`,
  url: ['Sammlungen', sammlungId, 'Aus-Lieferungen'],
  sort: [3, sammlungIndex, 3],
  hasChildren: true,
  childrenCount: count,
})
