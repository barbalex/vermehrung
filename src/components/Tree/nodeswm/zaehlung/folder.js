const zaehlungFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Zählungen',
    id: 'zaehlungFolder',
    label: `Zählungen (${count})`,
    url: ['Zaehlungen'],
    sort: [7],
    hasChildren: true,
    childrenCount: count,
  },
]

export default zaehlungFolder
