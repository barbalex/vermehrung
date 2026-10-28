export const buildGartenKulturZaehlungFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  children,
}: {
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
  children: unknown[]
}) => ({
  nodeType: 'folder',
  menuTitle: 'Zählungen',
  id: `${gartenId}${kulturId}ZaehlungFolder`,
  label: `Zählungen (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen'],
  sort: [4, gartenIndex, 1, kulturIndex, 2],
  hasChildren: true,
  childrenCount: children.length,
})
