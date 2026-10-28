export const buildHerkunftFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Herkünfte',
    id: 'herkunftFolder',
    label: `Herkünfte (${count})`,
    url: ['Herkuenfte'],
    sort: [2],
    hasChildren: true,
    childrenCount: count,
  },
]
