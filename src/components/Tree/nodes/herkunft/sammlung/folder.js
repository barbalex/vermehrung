export const buildHerkunftSammlungFolder = ({
  count,
  herkunftIndex,
  herkunftId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${herkunftId}SammlungFolder`,
  label: `Sammlungen (${count})`,
  url: ['Herkuenfte', herkunftId, 'Sammlungen'],
  sort: [2, herkunftIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
