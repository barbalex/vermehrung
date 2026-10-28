export const buildTeilkulturFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Teilkulturen',
    id: 'teilkulturFolder',
    label: `Teilkulturen (${count})`,
    url: ['Teilkulturen'],
    sort: [6],
    hasChildren: true,
    childrenCount: count,
  },
]
