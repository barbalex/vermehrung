import teilkulturLabelFromTeilkultur from '../../../../../../utils/teilkulturLabelFromTeilkultur.js'

const gartenKulturTeilkulturNodes = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${gartenId}${kulturId}${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: [
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Teilkulturen',
    teilkultur.id,
  ],
  sort: [4, gartenIndex, 1, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})

export default gartenKulturTeilkulturNodes
