export const buildGartenKulturAnlieferungFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'An-Lieferungen',
  id: `${gartenId}${kulturId}AnLieferungFolder`,
  label: `An-Lieferungen (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'An-Lieferungen'],
  sort: [4, gartenIndex, 1, kulturIndex, 3],
  hasChildren: true,
  childrenCount: children.length,
})
