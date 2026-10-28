export const buildPersonSammlungFolder = ({
  count,
  personIndex,
  personId,
}: {
  count: number
  personIndex: number
  personId: string
}) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${personId}SammlungFolder`,
  label: `Sammlungen (${count})`,
  url: ['Personen', personId, 'Sammlungen'],
  sort: [11, personIndex, 1],
  hasChildren: true,
  childrenCount: count,
})
