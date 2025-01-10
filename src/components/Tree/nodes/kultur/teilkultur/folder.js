export const buildKulturTeilkulturFolder = ({
  count,
  kulturIndex,
  kulturId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Teilkulturen',
  id: `${kulturId}TeilkulturFolder`,
  label: `Teilkulturen (${count})`,
  url: ['Kulturen', kulturId, 'Teilkulturen'],
  sort: [5, kulturIndex, 1],
  hasChildren: true,
  childrenCount: count,
})
