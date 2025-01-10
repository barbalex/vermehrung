export const buildKulturAnlieferungFolder = ({
  count,
  kulturIndex,
  kulturId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'An-Lieferungen',
  id: `${kulturId}AnLieferungFolder`,
  label: `An-Lieferungen (${count})`,
  url: ['Kulturen', kulturId, 'An-Lieferungen'],
  sort: [5, kulturIndex, 3],
  hasChildren: true,
  childrenCount: count,
})
