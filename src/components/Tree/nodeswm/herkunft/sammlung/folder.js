const herkunftSammlungFolder = ({ children, herkunftIndex, herkunftId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Sammlungen',
    id: `${herkunftId}SammlungFolder`,
    label: `Sammlungen (${children.length})`,
    url: ['Herkuenfte', herkunftId, 'Sammlungen'],
    sort: [2, herkunftIndex, 2],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default herkunftSammlungFolder
