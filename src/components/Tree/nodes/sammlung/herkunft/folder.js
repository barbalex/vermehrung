const sammlungHerkunftFolder = ({ count, sammlungIndex, sammlungId }) => ({
  nodeType: 'folder_no_menu',
  menuTitle: 'Herkünfte',
  id: `${sammlungId}HerkunftFolder`,
  label: `Herkünfte (${count})`,
  url: ['Sammlungen', sammlungId, 'Herkuenfte'],
  sort: [3, sammlungIndex, 1],
  hasChildren: true,
})

export default sammlungHerkunftFolder
