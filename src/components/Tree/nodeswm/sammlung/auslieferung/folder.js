const sammlungAuslieferungFolder = ({
  children,
  sammlungIndex,
  sammlungId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${sammlungId}LieferungFolder`,
  label: `Aus-Lieferungen (${children.length})`,
  url: ['Sammlungen', sammlungId, 'Aus-Lieferungen'],
  sort: [3, sammlungIndex, 3],
  hasChildren: true,
  childrenCount: children.length,
})

export default sammlungAuslieferungFolder
