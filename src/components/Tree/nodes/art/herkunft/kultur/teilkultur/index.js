import teilkulturLabelFromTeilkultur from '../../../../../../../utils/teilkulturLabelFromTeilkultur.js'

const artHerkunftKulturTeilkulturNodes = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${artId}/${herkunft.id}/${kulturId}/${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Teilkulturen',
    teilkultur.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})

export default artHerkunftKulturTeilkulturNodes
