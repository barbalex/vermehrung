import teilkulturLabelFromTeilkultur from '../../../../../../utils/teilkulturLabelFromTeilkultur'

const artKulturTeilkulturNodes = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => {
  const label = teilkulturLabelFromTeilkultur({ teilkultur })

  return {
    nodeType: 'table',
    menuTitle: 'Teilkultur',
    table: 'teilkultur',
    id: `${artId}${kulturId}${teilkultur.id}`,
    label,
    url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen', teilkultur.id],
    sort: [1, artIndex, 2, kulturIndex, 1, teilkulturIndex],
    hasChildren: false,
  }
}

export default artKulturTeilkulturNodes
