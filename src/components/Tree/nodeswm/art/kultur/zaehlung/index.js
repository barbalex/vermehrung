import zaehlungLabelFromZaehlung from '../../../../../../utils/zaehlungLabelFromZaehlung'

const artKulturZaehlungNodes = ({
  zaehlung,
  zaehlungIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => {
  // TODO: get label

  return {
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: `${artId}${kulturId}${zaehlung.id}`,
    label: 'TODO:',
    url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen', zaehlung.id],
    sort: [1, artIndex, 2, kulturIndex, 2, zaehlungIndex],
    hasChildren: false,
    mono: true,
  }
}

export default artKulturZaehlungNodes
