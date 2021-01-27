const personSammlungFolder = ({ count, personIndex, personId }) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${personId}SammlungFolder`,
  label: `Sammlungen (${count})`,
  url: ['Personen', personId, 'Sammlungen'],
  sort: [11, personIndex, 1],
  hasChildren: true,
  childrenCount: count,
})

export default personSammlungFolder
