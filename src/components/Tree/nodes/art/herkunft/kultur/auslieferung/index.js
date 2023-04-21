import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung'

const artHerkunftKulturAuslieferungNodes = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Auslieferung',
  table: 'lieferung',
  id: `${artId}/${herkunft.id}/${kulturId}/${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 4, lieferungIndex],
  hasChildren: false,
  mono: true,
})
export default artHerkunftKulturAuslieferungNodes
