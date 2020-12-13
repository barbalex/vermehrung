const artSammlungFolder = ({ count, artIndex, artId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Sammlungen',
    id: `${artId}SammlungFolder`,
    label: `Sammlungen (${count})`,
    url: ['Arten', artId, 'Sammlungen'],
    sort: [1, artIndex, 1],
    hasChildren: true,
    childrenCount: count,
  },
]

export default artSammlungFolder
