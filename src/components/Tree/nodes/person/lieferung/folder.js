export const buildPersonLieferungFolder = ({
  count,
  personIndex,
  personId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Lieferungen',
  id: `${personId}LieferungFolder`,
  label: `Lieferungen (${count})`,
  url: ['Personen', personId, 'Lieferungen'],
  sort: [11, personIndex, 3],
  hasChildren: true,
  childrenCount: count,
})
