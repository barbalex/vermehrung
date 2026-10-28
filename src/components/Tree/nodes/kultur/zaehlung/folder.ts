export const buildKulturZaehlungFolder = ({
  count,
  kulturIndex,
  kulturId,
}: {
  count: number
  kulturIndex: number
  kulturId: string
}) => ({
  nodeType: 'folder',
  menuTitle: 'Zählungen',
  id: `${kulturId}ZaehlungFolder`,
  label: `Zählungen (${count})`,
  url: ['Kulturen', kulturId, 'Zaehlungen'],
  sort: [5, kulturIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
