import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung.js'

const artHerkunftKulturAnlieferungNodes = ({
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
  menuTitle: 'Anlieferung',
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
    'An-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default artHerkunftKulturAnlieferungNodes
