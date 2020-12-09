const personSammlungFolder = ({ children, personIndex, personId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Sammlungen',
    id: `${personId}SammlungFolder`,
    label: `Sammlungen (${children.length})`,
    url: ['Personen', personId, 'Sammlungen'],
    sort: [11, personIndex, 1],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default personSammlungFolder
