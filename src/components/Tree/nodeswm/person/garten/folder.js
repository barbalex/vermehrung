const personGartenFolder = ({ children, personIndex, personId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Gärten',
    id: `${personId}GartenFolder`,
    label: `Gärten (${children.length})`,
    url: ['Personen', personId, 'Gaerten'],
    sort: [11, personIndex, 2],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default personGartenFolder
