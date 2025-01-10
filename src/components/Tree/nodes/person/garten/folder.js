export const buildPersonGartenFolder = ({ count, personIndex, personId }) => ({
  nodeType: 'folder',
  menuTitle: 'Gärten',
  id: `${personId}GartenFolder`,
  label: `Gärten (${count})`,
  url: ['Personen', personId, 'Gaerten'],
  sort: [11, personIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
