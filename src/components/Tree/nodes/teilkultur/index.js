import { teilkulturLabelFromTeilkultur } from '../../../../utils/teilkulturLabelFromTeilkultur.js'

export const buildTeilkultur = ({ teilkultur, index }) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: teilkultur.id,
  label: teilkulturLabelFromTeilkultur({ teilkultur: teilkultur }),
  url: ['Teilkulturen', teilkultur.id],
  sort: [6, index],
  hasChildren: false,
})
