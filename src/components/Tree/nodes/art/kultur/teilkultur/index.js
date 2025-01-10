import { teilkulturLabelFromTeilkultur } from '../../../../../../utils/teilkulturLabelFromTeilkultur.js'

export const buildArtKulturTeilkultur = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${artId}${kulturId}${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen', teilkultur.id],
  sort: [1, artIndex, 3, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})
