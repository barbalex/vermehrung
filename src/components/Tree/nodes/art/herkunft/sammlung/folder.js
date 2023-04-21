const artHerkunftSammlungFolder = ({
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${artId}/${herkunft.id}/SammlungFolder`,
  label: `Sammlungen (${count})`,
  url: ['Arten', artId, 'Herkuenfte', herkunft.id, 'Sammlungen'],
  sort: [1, artIndex, 1, herkunftIndex, 1],
  hasChildren: true,
  childrenCount: count,
})

export default artHerkunftSammlungFolder
