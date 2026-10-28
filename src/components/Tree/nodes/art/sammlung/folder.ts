export const buildArtSammlungFolder = ({ count, artIndex, artId }: { count: number; artIndex: number; artId: string }) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${artId}SammlungFolder`,
  label: `Sammlungen (${count})`,
  url: ['Arten', artId, 'Sammlungen'],
  sort: [1, artIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
