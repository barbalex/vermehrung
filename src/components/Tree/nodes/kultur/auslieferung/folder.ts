export const buildKulturAuslieferungFolder = ({
  count,
  kulturIndex,
  kulturId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${kulturId}AusLieferungFolder`,
  label: `Aus-Lieferungen (${count})`,
  url: ['Kulturen', kulturId, 'Aus-Lieferungen'],
  sort: [5, kulturIndex, 4],
  hasChildren: true,
  childrenCount: count,
})
