export const buildGartenKulturAuslieferungFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${gartenId}${kulturId}AusLieferungFolder`,
  label: `Aus-Lieferungen (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Aus-Lieferungen'],
  sort: [4, gartenIndex, 1, kulturIndex, 4],
  hasChildren: true,
  childrenCount: children.length,
})
